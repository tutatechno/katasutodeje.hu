"use strict";
/* Kata Sütődéje – biztonságos felépítés: nincs innerHTML, nincs inline kód */

/* ---------- Kattintáseltérítés (clickjacking) elleni védelem ---------- */
if (window.top !== window.self) {
  document.documentElement.replaceChildren();
  try { window.top.location.replace(window.self.location.href); } catch (e) { /* a böngésző tiltja – a tartalom már nem látható */ }
}

(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const KEP_MINTA = /^img\/[a-z0-9_\-\/]+\.(jpe?g|png|webp|avif)$/i;
  const kepUt = src => (typeof src === "string" && KEP_MINTA.test(src) && !src.includes("..")) ? src : "";
  const szoveg = v => String(v == null ? "" : v).slice(0, 400);

  /* ---------- Fotóhely, amíg a kép nincs feltöltve ---------- */
  function fotohely(img) {
    const csere = () => {
      if (!img.isConnected) return;
      const ph = document.createElement("div");
      ph.className = img.className + " ph";
      ph.setAttribute("role", "img");
      ph.setAttribute("aria-label", "Fotó hamarosan");
      const ikon = $("#tpl-ph-ikon");
      if (ikon) ph.append(ikon.content.firstElementChild.cloneNode(true));
      const cim = document.createElement("span");
      cim.className = "ph__label";
      cim.textContent = "Fotó hamarosan";
      const fajl = document.createElement("small");
      fajl.textContent = img.getAttribute("src") || "";
      ph.append(cim, fajl);
      img.replaceWith(ph);
    };
    if (!img.getAttribute("src") || (img.complete && img.naturalWidth === 0)) csere();
    else img.addEventListener("error", csere, { once: true });
  }

  /* ---------- Kínálat ---------- */
  const lista = $("#termek-lista");
  const tpl = $("#tpl-termek");
  if (lista && tpl && typeof KESZITMENYEK !== "undefined" && Array.isArray(KESZITMENYEK)) {
    KESZITMENYEK.slice(0, 8).forEach(k => {
      const elem = tpl.content.firstElementChild.cloneNode(true);
      const img = $(".product__img", elem);
      img.src = kepUt(k.kep);
      img.alt = szoveg(k.nev);
      $(".product__cat", elem).textContent = szoveg(k.kategoria);
      $(".product__title", elem).textContent = szoveg(k.nev);
      $(".product__text", elem).textContent = szoveg(k.leiras);
      const tags = $(".tags", elem);
      (Array.isArray(k.mentes) ? k.mentes : []).slice(0, 6).forEach(m => {
        const li = document.createElement("li");
        li.textContent = szoveg(m) + "mentes";
        tags.append(li);
      });
      if (!tags.children.length) tags.remove();
      lista.append(elem);
    });
  }

  /* ---------- Galéria ---------- */
  const racs = $("#galeria-racs");
  const doboz = $("#lightbox");
  if (racs && typeof GALERIA !== "undefined" && Array.isArray(GALERIA)) {
    GALERIA.slice(0, 12).forEach(g => {
      const gomb = document.createElement("button");
      gomb.type = "button";
      gomb.className = "gal__item reveal";
      gomb.setAttribute("aria-label", g.felirat ? "Nagyítás: " + szoveg(g.felirat) : "Kép nagyítása");
      const img = document.createElement("img");
      img.className = "photo gal__img";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = kepUt(g.kep);
      img.alt = szoveg(g.felirat) || "Kata Sütődéje";
      gomb.append(img);
      racs.append(gomb);
    });
    racs.addEventListener("click", e => {
      const gomb = e.target.closest(".gal__item");
      const img = gomb && $("img", gomb);
      if (!img || !doboz || typeof doboz.showModal !== "function") return;
      $("img", doboz).src = img.src;
      $("img", doboz).alt = img.alt;
      $("p", doboz).textContent = img.alt === "Kata Sütődéje" ? "" : img.alt;
      doboz.showModal();
    });
  }
  if (doboz) {
    doboz.addEventListener("click", e => { if (e.target === doboz || e.target.closest(".lightbox__close")) doboz.close(); });
  }

  /* ---------- Fotóhelyek ---------- */
  document.querySelectorAll("img.photo").forEach(fotohely);

  /* ---------- Elérhetőségek ---------- */
  const tel = szoveg(KAPCSOLAT.telefon);
  const telLink = "tel:" + tel.replace(/[^\d+]/g, "");
  const wa = "https://wa.me/" + szoveg(KAPCSOLAT.whatsapp).replace(/\D/g, "");
  document.querySelectorAll("[data-telefon]").forEach(el => { el.textContent = tel; });
  document.querySelectorAll("[data-hely]").forEach(el => { el.textContent = szoveg(KAPCSOLAT.hely); });
  document.querySelectorAll("a[data-tel]").forEach(el => { el.href = telLink; });
  document.querySelectorAll("a[data-wa]").forEach(el => { el.href = wa; });
  document.querySelectorAll("[data-ev]").forEach(el => { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Mobil menü: bezárás link kattintásra ---------- */
  const menu = $("#mobilmenu");
  if (menu && typeof menu.hidePopover === "function") {
    menu.addEventListener("click", e => { if (e.target.closest("a")) menu.hidePopover(); });
  }
})();
