"use strict";
/* Kata Sütődéje – a tartalom felépítése biztonságosan (innerHTML nélkül) */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const KEP_MINTA = /^img\/[a-z0-9_\-\/]+\.(jpe?g|png|webp|avif)$/i;
  const biztonsagosKep = src => (typeof src === "string" && KEP_MINTA.test(src) && !src.includes("..")) ? src : "";

  /* ---------- Fotóhely, ha a kép még nincs feltöltve ---------- */
  function fotohely(img) {
    const csere = () => {
      if (!img.isConnected) return;
      const ph = document.createElement("div");
      ph.className = img.className + " ph";
      ph.setAttribute("role", "img");
      ph.setAttribute("aria-label", "Fotó helye");
      const cim = document.createElement("span");
      cim.className = "ph__label";
      cim.textContent = "Fotó helye";
      const fajl = document.createElement("small");
      fajl.textContent = img.getAttribute("src") || "";
      ph.append(cim, fajl);
      img.replaceWith(ph);
    };
    if (!img.getAttribute("src") || (img.complete && img.naturalWidth === 0)) csere();
    else img.addEventListener("error", csere, { once: true });
  }

  /* ---------- Készítmények ---------- */
  const lista = $("#keszitmeny-lista");
  const tpl = $("#tpl-keszitmeny");
  if (lista && tpl && typeof KESZITMENYEK !== "undefined" && Array.isArray(KESZITMENYEK)) {
    KESZITMENYEK.forEach(k => {
      const kartya = tpl.content.firstElementChild.cloneNode(true);
      const img = $(".card__img", kartya);
      img.src = biztonsagosKep(k.kep);
      img.alt = String(k.nev || "");
      $(".card__cat", kartya).textContent = String(k.kategoria || "");
      $(".card__title", kartya).textContent = String(k.nev || "");
      $(".card__text", kartya).textContent = String(k.leiras || "");
      const tags = $(".tags", kartya);
      (Array.isArray(k.mentes) ? k.mentes : []).forEach(m => {
        const li = document.createElement("li");
        li.textContent = String(m) + "mentes";
        tags.append(li);
      });
      if (!tags.children.length) tags.remove();
      lista.append(kartya);
    });
  }

  /* ---------- Galéria ---------- */
  const racs = $("#galeria-racs");
  const doboz = $("#lightbox");
  if (racs && typeof GALERIA !== "undefined" && Array.isArray(GALERIA)) {
    GALERIA.forEach(g => {
      const gomb = document.createElement("button");
      gomb.type = "button";
      gomb.className = "gal__item";
      gomb.setAttribute("aria-label", g.felirat ? "Nagyítás: " + g.felirat : "Kép nagyítása");
      const img = document.createElement("img");
      img.className = "photo gal__img";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = biztonsagosKep(g.kep);
      img.alt = String(g.felirat || "Kata Sütődéje");
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

  /* ---------- Fotóhelyek mindenhol ---------- */
  document.querySelectorAll("img.photo").forEach(fotohely);

  /* ---------- Elérhetőségek ---------- */
  const tel = String(KAPCSOLAT.telefon || "");
  const telLink = "tel:" + tel.replace(/[^\d+]/g, "");
  const wa = "https://wa.me/" + String(KAPCSOLAT.whatsapp || "").replace(/\D/g, "");
  document.querySelectorAll("[data-telefon]").forEach(el => { el.textContent = tel; });
  document.querySelectorAll("[data-hely]").forEach(el => { el.textContent = String(KAPCSOLAT.hely || ""); });
  document.querySelectorAll("a[data-tel]").forEach(el => { el.href = telLink; });
  document.querySelectorAll("a[data-wa]").forEach(el => { el.href = wa; });
  document.querySelectorAll("[data-ev]").forEach(el => { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Mobil menü bezárása kattintáskor ---------- */
  const menu = $("#mobilmenu");
  if (menu && typeof menu.hidePopover === "function") {
    menu.addEventListener("click", e => { if (e.target.closest("a")) menu.hidePopover(); });
  }
})();
