"use strict";
/* =========================================================
   KATA SÜTŐDÉJE – TARTALOM
   Csak ezt a fájlt kell szerkeszteni.

   FOTÓK: elég a megadott néven feltölteni a képet az img/ mappába
   (pl. img/keszitmeny-1.jpg). Amíg nincs ott kép, az oldal
   automatikusan egy "Fotó helye" jelölést mutat.
   Ajánlott: JPG vagy WEBP, max. 1600 px széles, 300 KB alatt.
   ========================================================= */

const KAPCSOLAT = {
  telefon: "+36 30 123 4567",   // így jelenik meg az oldalon
  whatsapp: "36301234567",      // nemzetközi formátum, + és szóköz nélkül
  hely: "Zánka és környéke"
};

/* ---------------------------------------------------------
   KÉSZÍTMÉNYEK – csak néhány kiemelt darab (4–6 a legszebb)
   - kategoria: "Édes", "Sós" vagy "Kamra"
   - mentes: pl. ["glutén", "tej", "tojás", "cukor"]
     → az oldalon "gluténmentes", "tejmentes" … címkeként jelenik meg.
     Csak azt írd ide, ami az adott termékre biztosan igaz!
   --------------------------------------------------------- */
const KESZITMENYEK = [
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
  },
  {
    nev: "Lekvárok, befőttek",
    kategoria: "Kamra",
    leiras: "Saját termésből, kis üvegekben eltéve – ahogy a szezon engedi.",
    mentes: [],
    kep: "img/keszitmeny-4.jpg"
  },
  {
    nev: "Házi aprósütemény",
    kategoria: "Édes",
    leiras: "Egyszerű, házias süti a mindennapokra.",
    mentes: [],
    kep: "img/keszitmeny-5.jpg"
  }
];

/* ---------------------------------------------------------
   GALÉRIA – pár hangulatkép (6 a legszebb)
   --------------------------------------------------------- */
const GALERIA = [
  { kep: "img/galeria/1.jpg", felirat: "" },
  { kep: "img/galeria/2.jpg", felirat: "" },
  { kep: "img/galeria/3.jpg", felirat: "" },
  { kep: "img/galeria/4.jpg", felirat: "" },
  { kep: "img/galeria/5.jpg", felirat: "" },
  { kep: "img/galeria/6.jpg", felirat: "" }
];
