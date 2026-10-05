/* =========================================================
   KATA SÜTŐDÉJE – működés (kosár, szűrés, rendelés)
   ========================================================= */
const RENDELES_EMAIL = "rendeles@katasutodeje.hu"; // tartalék, ha a PHP nem elérhető
const MIN_NAP = 2;        // legkorábbi átvétel (nap) sütiknél
const MIN_NAP_TORTA = 4;  // legkorábbi átvétel (nap) tortáknál

const $ = (s, el = document) => el.querySelector(s);
const ft = n => n.toLocaleString("hu-HU") + " Ft";
const byId = id => TERMEKEK.find(t => t.id === id);

/* ---------- Kosár állapot ---------- */
let kosar = {};
try { kosar = JSON.parse(localStorage.getItem("kata_kosar")) || {}; } catch (e) { kosar = {}; }
for (const id in kosar) if (!byId(id)) delete kosar[id];

function mentes() { try { localStorage.setItem("kata_kosar", JSON.stringify(kosar)); } catch (e) {} }
function osszeg() { return Object.entries(kosar).reduce((s, [id, db]) => s + byId(id).ar * db, 0); }
function darab() { return Object.values(kosar).reduce((s, db) => s + db, 0); }

function hozzaad(id) {
  kosar[id] = (kosar[id] || 0) + 1;
  frissit();
  toast(`🧁 ${byId(id).nev} a kosárban`);
  const b = $("#cartBtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
}
function valtoztat(id, d) {
  kosar[id] = (kosar[id] || 0) + d;
  if (kosar[id] <= 0) delete kosar[id];
  frissit();
}

/* ---------- Termékkép ---------- */
function kepHTML(t, kicsi = false) {
  if (t.kep) return `<img src="${t.kep}" alt="${t.nev}" loading="lazy">`;
  return kicsi ? t.emoji : `<span class="product__emoji">${t.emoji}</span>`;
}
function hatter(t) { return `background: radial-gradient(circle at 30% 25%, ${t.szin}55, ${t.szin}22 70%), var(--cream);`; }

/* ---------- Szűrők és termékek ---------- */
let aktivKat = "osszes";
function szurok() {
  const kat = [{ id: "osszes", nev: "Összes" }, ...KATEGORIAK];
  $("#filters").innerHTML = kat.map(k =>
    `<button class="filter ${k.id === aktivKat ? "active" : ""}" data-kat="${k.id}" role="tab">${k.nev}</button>`).join("");
}
function termekek() {
  const lista = TERMEKEK.filter(t => aktivKat === "osszes" || t.kategoria === aktivKat);
  $("#products").innerHTML = lista.map((t, i) => `
    <article class="product" style="animation-delay:${i * 50}ms">
      <div class="product__img" style="${hatter(t)}">
        ${kepHTML(t)}
        ${t.kiemelt ? '<span class="product__tag">Kedvenc</span>' : ""}
      </div>
      <div class="product__body">
        <h3>${t.nev}</h3>
        <p class="product__desc">${t.leiras}</p>
        <div class="allergens">${t.mentes.map(m => `<span>${m}mentes</span>`).join("")}</div>
        <div class="product__foot">
          ${t.rendelheto
            ? `<div class="price">${ft(t.ar)}<small>/ ${t.egyseg}</small></div>
               <button class="add-btn" data-add="${t.id}">Kosárba +</button>`
            : `<div class="price"><small>Rendezvényre, egyedi ajánlattal</small></div>
               <a class="add-btn add-btn--outline" href="#kapcsolat">Érdeklődöm</a>`}
        </div>
      </div>
    </article>`).join("");
}

/* ---------- Kosár sorok (fiók + rendelés panel) ---------- */
function sorokHTML() {
  const e = Object.entries(kosar);
  if (!e.length) return `<div class="order__empty">Még üres a kosarad.<br><a href="#kinalat" data-close>Nézz körül a kínálatban →</a></div>`;
  return e.map(([id, db]) => {
    const t = byId(id);
    return `<div class="line">
      <div class="line__thumb" style="${hatter(t)}">${kepHTML(t, true)}</div>
      <div class="line__info"><strong>${t.nev}</strong><small>${ft(t.ar)} / ${t.egyseg}</small></div>
      <div class="qty"><button data-dec="${id}" aria-label="Kevesebb">−</button><span>${db}</span><button data-inc="${id}" aria-label="Több">+</button></div>
      <div class="line__price">${ft(t.ar * db)}</div>
    </div>`;
  }).join("");
}

function frissit() {
  mentes();
  const html = sorokHTML(), sum = ft(osszeg()), n = darab();
  $("#drawerItems").innerHTML = html;
  $("#orderItems").innerHTML = html;
  $("#drawerTotal").textContent = sum;
  $("#orderTotal").textContent = sum;
  const c = $("#cartCount"); c.textContent = n; c.classList.toggle("show", n > 0);
  datumMin();
}

/* ---------- Dátum: legkorábbi átvétel ---------- */
function datumMin() {
  const vanTorta = Object.keys(kosar).some(id => byId(id).kategoria === "torta");
  const d = new Date(); d.setDate(d.getDate() + (vanTorta ? MIN_NAP_TORTA : MIN_NAP));
  const iso = d.toISOString().slice(0, 10);
  const inp = $("#datum"); inp.min = iso;
  if (inp.value && inp.value < iso) inp.value = "";
}

/* ---------- Fiók ---------- */
function fiok(nyit) {
  $("#drawer").classList.toggle("open", nyit);
  $("#backdrop").classList.toggle("open", nyit);
}

/* ---------- Toast ---------- */
let toastT;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Rendelés beküldése ---------- */
async function bekuld(e) {
  e.preventDefault();
  const f = e.target, msg = $("#formMsg");
  msg.className = "form-msg"; msg.textContent = "";
  f.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));

  if (!darab()) { msg.className = "form-msg err"; msg.textContent = "A kosarad üres – előbb válassz valami finomat!"; return; }

  const cimKell = f.atvetel.value === "Házhozszállítás";
  f.cim.required = cimKell;
  let hibas = [...f.elements].filter(el => el.required && (el.type === "checkbox" ? !el.checked : !el.checkValidity() || !el.value.trim()));
  if (hibas.length) {
    hibas.forEach(el => el.classList.add("invalid"));
    hibas[0].focus();
    msg.className = "form-msg err"; msg.textContent = "Kérlek, töltsd ki helyesen a csillaggal jelölt mezőket.";
    return;
  }

  const adat = {
    nev: f.nev.value.trim(), telefon: f.telefon.value.trim(), email: f.email.value.trim(),
    datum: f.datum.value, atvetel: f.atvetel.value, cim: f.cim.value.trim(),
    megjegyzes: f.megjegyzes.value.trim(), weboldal: f.weboldal.value,
    tetelek: Object.entries(kosar).map(([id, db]) => ({ id, nev: byId(id).nev, egyseg: byId(id).egyseg, ar: byId(id).ar, db })),
    osszeg: osszeg()
  };

  const btn = $("#submitBtn"); btn.disabled = true; btn.textContent = "Küldés…";
  try {
    const r = await fetch("rendeles.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(adat) });
    const j = await r.json();
    if (!r.ok || !j.ok) throw new Error(j.hiba || "hiba");
    siker(f);
  } catch (err) {
    // Tartalék: e-mail kliens megnyitása előre kitöltött levéllel
    const sorok = adat.tetelek.map(t => `- ${t.nev} (${t.egyseg}) × ${t.db} = ${ft(t.ar * t.db)}`).join("\n");
    const body = `Név: ${adat.nev}\nTelefon: ${adat.telefon}\nE-mail: ${adat.email}\nÁtvétel: ${adat.datum}, ${adat.atvetel}${adat.cim ? " – " + adat.cim : ""}\n\nTételek:\n${sorok}\n\nÖsszesen: ${ft(adat.osszeg)}\n\nMegjegyzés: ${adat.megjegyzes || "-"}`;
    location.href = `mailto:${RENDELES_EMAIL}?subject=${encodeURIComponent("Rendelés – " + adat.nev)}&body=${encodeURIComponent(body)}`;
    msg.className = "form-msg"; msg.textContent = "Megnyitottuk a levelezőprogramodat – csak küldd el a levelet!";
  } finally {
    btn.disabled = false; btn.textContent = "Rendelés elküldése";
  }
}
function siker(f) {
  kosar = {}; frissit(); f.reset(); $("#cimField").hidden = true;
  const msg = $("#formMsg");
  msg.className = "form-msg ok";
  msg.textContent = "Köszönöm a rendelést! 💛 Hamarosan visszaigazolom e-mailben.";
  toast("✅ Rendelés elküldve!");
}

/* ---------- Események ---------- */
document.addEventListener("click", e => {
  const t = e.target;
  if (t.matches(".filter")) { aktivKat = t.dataset.kat; szurok(); termekek(); }
  if (t.dataset.add) hozzaad(t.dataset.add);
  if (t.dataset.inc) valtoztat(t.dataset.inc, 1);
  if (t.dataset.dec) valtoztat(t.dataset.dec, -1);
  if (t.hasAttribute("data-close") || t.id === "toOrder") fiok(false);
  if (t.closest(".nav a")) { $("#nav").classList.remove("open"); $("#menuBtn").classList.remove("open"); }
});
$("#cartBtn").addEventListener("click", () => fiok(true));
$("#drawerClose").addEventListener("click", () => fiok(false));
$("#backdrop").addEventListener("click", () => fiok(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") fiok(false); });
$("#menuBtn").addEventListener("click", () => { $("#nav").classList.toggle("open"); $("#menuBtn").classList.toggle("open"); });
$("#atvetel").addEventListener("change", e => { $("#cimField").hidden = e.target.value !== "Házhozszállítás"; });
$("#orderForm").addEventListener("submit", bekuld);
$("#orderForm").addEventListener("input", e => e.target.classList.remove("invalid"));
window.addEventListener("scroll", () => $(".header").classList.toggle("scrolled", scrollY > 10), { passive: true });

/* ---------- Görgetéses megjelenés ---------- */
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("visible"); io.unobserve(x.target); } }), { threshold: .12 });
document.querySelectorAll(".feature, .steps li, .about__inner > *, details, .contact__inner > *").forEach(el => { el.classList.add("reveal"); io.observe(el); });

/* ---------- Indítás ---------- */
$("#year").textContent = new Date().getFullYear();
szurok(); termekek(); frissit();
