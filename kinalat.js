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
   - receptek: ide kerülnek a sütik. Amíg üres, "Hamarosan" kártyák látszanak.
     Egy recept így néz ki:
     { nev: "Meggyes pite", leiras: "Tagyon hegyi meggyel, omlós tésztában.", kep: "img/meggyes-pite.jpg" }
     (a kep elhagyható – ilyenkor az emoji jelenik meg)
   --------------------------------------------------------- */
const KATEGORIAK = [
  {
    id: "torta", tipus: "edes", nev: "Torták", emoji: "🎂",
    leiras: "Ünnepi torták saját termesztésű gyümölccsel, egyeztetés alapján.",
    receptek: []
  },
  {
    id: "piskotamentes", tipus: "edes", nev: "Piskótamentes sütemények", emoji: "🍮",
    leiras: "Szuperkrémes finomságok, amikben alig van tészta vagy piskóta – szinte csak krém és gyümölcs.",
    receptek: []
  },
  {
    id: "suti", tipus: "edes", nev: "Alap sütik", emoji: "🍪",
    leiras: "Egyszerű, házias sütemények a mindennapokra.",
    receptek: []
  },
  {
    id: "pogacsa", tipus: "sos", nev: "Pogácsák", emoji: "🥐",
    leiras: "Puha, sós pogácsák vendégvárónak vagy útravalónak.",
    receptek: []
  },
  {
    id: "lekvar", tipus: "kamra", nev: "Lekvárok, befőttek", emoji: "🫙",
    leiras: "A Tagyon hegyen termett gyümölcsökből, kis üvegekben eltéve.",
    receptek: []
  }
];
