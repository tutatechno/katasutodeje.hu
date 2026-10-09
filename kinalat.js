/* =========================================================
   KATA SÜTŐDÉJE – BEÁLLÍTÁSOK ÉS KÍNÁLAT
   Csak ezt a fájlt kell szerkeszteni a tartalom frissítéséhez.
   ========================================================= */

const KAPCSOLAT = {
  telefon: "+36 30 123 4567",   // így jelenik meg az oldalon
  whatsapp: "36301234567",      // nemzetközi formátum, + és szóköz nélkül
  hely: "Zánka környéke"
};

/* ---------------------------------------------------------
   KATEGÓRIÁK
   - tipus: "edes", "sos" vagy "kamra" (lekvárok, befőttek)
   - termekek: ide kerülnek a termékek rövid leírással és a mentességekkel.
     Amíg üres, "Hamarosan" kártyák látszanak. Egy termék így néz ki:
     { nev: "Meggyes pite", leiras: "Tagyon hegyi meggyel, omlós tésztában.",
       mentes: ["glutén", "tej", "tojás"], kep: "img/meggyes-pite.jpg" },
     - mentes: bármelyik szó, az oldalon "…mentes" címkeként jelenik meg
       (pl. "glutén" → gluténmentes, "cukor" → cukormentes)
     - kep: elhagyható, ilyenkor az emoji jelenik meg
   --------------------------------------------------------- */
const KATEGORIAK = [
  {
    id: "torta", tipus: "edes", nev: "Torták", emoji: "🎂",
    leiras: "Ünnepi torták saját termesztésű gyümölccsel, egyeztetés alapján.",
    termekek: []
  },
  {
    id: "piskotamentes", tipus: "edes", nev: "Piskótamentes sütemények", emoji: "🍮",
    leiras: "Szuperkrémes finomságok, amikben alig van tészta vagy piskóta – szinte csak krém és gyümölcs.",
    termekek: []
  },
  {
    id: "suti", tipus: "edes", nev: "Alap sütik", emoji: "🍪",
    leiras: "Egyszerű, házias sütemények a mindennapokra.",
    termekek: []
  },
  {
    id: "pogacsa", tipus: "sos", nev: "Pogácsák", emoji: "🥐",
    leiras: "Puha, sós pogácsák vendégvárónak vagy útravalónak.",
    termekek: []
  },
  {
    id: "lekvar", tipus: "kamra", nev: "Lekvárok, befőttek", emoji: "🫙",
    leiras: "A Tagyon hegyen termett gyümölcsökből, kis üvegekben eltéve.",
    termekek: []
  }
];

/* ---------------------------------------------------------
   GALÉRIA
   Tedd a képeket az img/galeria/ mappába, és írd ide őket.
   Amíg kevés a kép, a maradék helyen üres képhely látszik.
   Példa:
     { kep: "img/galeria/torta1.jpg", felirat: "Születésnapi torta" },
   --------------------------------------------------------- */
const GALERIA = [
];
