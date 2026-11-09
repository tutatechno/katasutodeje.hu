"use strict";
/* =========================================================
   KATA SÜTŐDÉJE – TARTALOM (csak ezt a fájlt kell szerkeszteni)

   FOTÓK: töltsd fel a képet az img/ mappába a lent megadott néven.
   Amíg nincs ott kép, az oldal "Fotó hamarosan" jelölést mutat.
   Ajánlott: JPG vagy WEBP, legfeljebb 1600 px széles, 300 KB alatt.
   Fix fotóhelyek: img/hero-1.jpg (nyitókép), img/tagyon.jpg, img/rolunk.jpg
   ========================================================= */

const KAPCSOLAT = Object.freeze({
  telefon: "+36 30 123 4567",   // így jelenik meg az oldalon
  whatsapp: "36301234567",      // nemzetközi formátum, + és szóköz nélkül
  hely: "Zánka és környéke"
});

/* ---------------------------------------------------------
   KÍNÁLAT – csak néhány kiemelt készítmény (2–4 a legszebb)
   - kategoria: pl. "Édes", "Sós", "Kamra"
   - mentes: pl. ["glutén", "tej", "tojás", "cukor"]
     → az oldalon "gluténmentes", "tejmentes" … címke lesz belőle.
     Csak azt írd ide, ami az adott termékre biztosan igaz!
   --------------------------------------------------------- */
const KESZITMENYEK = Object.freeze([
  {
    nev: "Piskótamentes krémes",
    kategoria: "Édes",
    leiras: "Szuperkrémes sütemény, amiben alig van tészta – szinte csak krém és gyümölcs.",
    mentes: [],
    kep: "img/keszitmeny-1.jpg"
  },
  {
    nev: "Gyümölcstorta",
    kategoria: "Édes",
    leiras: "Ünnepi torta a Tagyon hegyen termett gyümölcsökből, előzetes egyeztetéssel.",
    mentes: [],
    kep: "img/keszitmeny-2.jpg"
  },
  {
    nev: "Pogácsa",
    kategoria: "Sós",
    leiras: "Puha, sós pogácsa vendégvárónak vagy útravalónak.",
    mentes: [],
    kep: "img/keszitmeny-3.jpg"
  }
]);

/* ---------------------------------------------------------
   GALÉRIA – pár hangulatkép (4 a legszebb)
   --------------------------------------------------------- */
const GALERIA = Object.freeze([
  { kep: "img/galeria/1.jpg", felirat: "" },
  { kep: "img/galeria/2.jpg", felirat: "" },
  { kep: "img/galeria/3.jpg", felirat: "" },
  { kep: "img/galeria/4.jpg", felirat: "" }
]);
