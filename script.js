/* Kata Sütődéje – kategóriák kirajzolása és elérhetőségek kitöltése */

function kartyak(kat) {
  if (!kat.termekek.length) {
    return Array.from({ length: 3 }, () => `
      <article class="recipe recipe--soon">
        <div class="recipe__img">${kat.emoji}</div>
        <div class="recipe__body"><h4>Hamarosan</h4><p>Ide kerül majd a termék rövid leírása és mentességei.</p></div>
      </article>`).join("");
  }
  return kat.termekek.map(t => `
    <article class="recipe">
      <div class="recipe__img">${t.kep ? `<img src="${t.kep}" alt="${t.nev}" loading="lazy">` : kat.emoji}</div>
      <div class="recipe__body">
        <h4>${t.nev}</h4>
        <p>${t.leiras || ""}</p>
        ${(t.mentes || []).length ? `<div class="tags">${t.mentes.map(m => `<span>${m}mentes</span>`).join("")}</div>` : ""}
      </div>
    </article>`).join("");
}

function kategoriak(tipus) {
  return KATEGORIAK.filter(k => k.tipus === tipus).map(k => `
    <div class="category" id="${k.id}">
      <div class="category__head">
        <span class="category__icon">${k.emoji}</span>
        <div><h3>${k.nev}</h3><p>${k.leiras}</p></div>
      </div>
      <div class="recipes">${kartyak(k)}</div>
    </div>`).join("");
}

document.getElementById("kat-edes").innerHTML = kategoriak("edes");
document.getElementById("kat-sos").innerHTML = kategoriak("sos");
document.getElementById("kat-kamra").innerHTML = kategoriak("kamra");

document.querySelectorAll("[data-telefon]").forEach(el => el.textContent = KAPCSOLAT.telefon);
document.querySelectorAll("[data-hely]").forEach(el => el.textContent = KAPCSOLAT.hely);
document.querySelectorAll("[data-tel]").forEach(el => el.href = "tel:" + KAPCSOLAT.telefon.replace(/\s/g, ""));
document.querySelectorAll("[data-wa]").forEach(el => el.href = "https://wa.me/" + KAPCSOLAT.whatsapp);
document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn"), nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => { nav.classList.toggle("open"); menuBtn.classList.toggle("open"); });
nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("open"); menuBtn.classList.remove("open"); } });

/* ---------- Galéria ---------- */
const GALERIA_HELYEK = 10; // ennyi hely látszik összesen (képek + üres helyek)
const racs = document.getElementById("galeria-racs");
const kepek = GALERIA.map((g, i) => `
  <figure class="gallery__item" data-i="${i}">
    <img src="${g.kep}" alt="${g.felirat || "Kata Sütődéje"}" loading="lazy">
    ${g.felirat ? `<figcaption>${g.felirat}</figcaption>` : ""}
  </figure>`);
for (let i = kepek.length; i < GALERIA_HELYEK; i++) {
  kepek.push(`<figure class="gallery__item gallery__item--empty"><span>📷</span><figcaption>Képhely</figcaption></figure>`);
}
racs.innerHTML = kepek.join("");

const lightbox = document.getElementById("lightbox");
racs.addEventListener("click", e => {
  const f = e.target.closest(".gallery__item[data-i]");
  if (!f) return;
  const g = GALERIA[f.dataset.i];
  lightbox.querySelector("img").src = g.kep;
  lightbox.querySelector("img").alt = g.felirat || "";
  lightbox.querySelector("p").textContent = g.felirat || "";
  lightbox.hidden = false;
});
lightbox.addEventListener("click", () => { lightbox.hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") lightbox.hidden = true; });
