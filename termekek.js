/* =========================================================
   KATA SÜTŐDÉJE – TERMÉKLISTA
   Itt tudod szerkeszteni a termékeket, árakat, leírásokat.
   - kep: ha van fotó, tedd az img/ mappába és írd ide a nevét
          (pl. "img/csokitorta.jpg"). Ha üres, emoji + színes háttér jelenik meg.
   - rendelheto: false → csak bemutatjuk, nem lehet kosárba tenni
   - mentes: glutén, tej, tojás, cukor, dió, szója (bármelyik)
   ========================================================= */

const KATEGORIAK = [
  { id: "torta",    nev: "Torták" },
  { id: "sutemeny", nev: "Sütemények" },
  { id: "keksz",    nev: "Kekszek & aprósütik" },
  { id: "etel",     nev: "Egyéb ételek" }
];

const TERMEKEK = [
  // ---------- TORTÁK ----------
  { id: "t1", kategoria: "torta", nev: "Étcsokis mousse torta",
    leiras: "Selymes étcsokoládé krém mandulás-kakaós piskótán, friss málnával.",
    ar: 14900, egyseg: "egész torta (12 szelet)", emoji: "🍫", szin: "#6b3f2a",
    mentes: ["glutén", "tej", "tojás"], kep: "", rendelheto: true, kiemelt: true },

  { id: "t2", kategoria: "torta", nev: "Erdei gyümölcsös sajttorta",
    leiras: "Kesudió-alapú „sajtkrém”, datolyás-zabos alap, erdei gyümölcs tükör.",
    ar: 15900, egyseg: "egész torta (12 szelet)", emoji: "🫐", szin: "#7a4b8c",
    mentes: ["glutén", "tej", "tojás", "cukor"], kep: "", rendelheto: true, kiemelt: true },

  { id: "t3", kategoria: "torta", nev: "Répatorta",
    leiras: "Fűszeres, szaftos répás tészta, citromos kókuszkrémmel és pirított dióval.",
    ar: 13900, egyseg: "egész torta (12 szelet)", emoji: "🥕", szin: "#d9822b",
    mentes: ["glutén", "tej", "tojás"], kep: "", rendelheto: true },

  // ---------- SÜTEMÉNYEK ----------
  { id: "s1", kategoria: "sutemeny", nev: "Brownie",
    leiras: "Tömör, nedves csokis brownie fekete babból – senki nem találja ki!",
    ar: 790, egyseg: "szelet", emoji: "🟫", szin: "#4a2c1d",
    mentes: ["glutén", "tej", "tojás"], kep: "", rendelheto: true, kiemelt: true },

  { id: "s2", kategoria: "sutemeny", nev: "Almás pite",
    leiras: "Omlós tészta, fahéjas alma, ahogy nagyi sütötte – csak mindenmentesen.",
    ar: 690, egyseg: "szelet", emoji: "🍎", szin: "#b8452f",
    mentes: ["glutén", "tej", "tojás", "cukor"], kep: "", rendelheto: true },

  { id: "s3", kategoria: "sutemeny", nev: "Kókuszgolyó",
    leiras: "Kakaós-zabos golyó kókuszreszelékben, datolyával édesítve.",
    ar: 1990, egyseg: "doboz (10 db)", emoji: "🥥", szin: "#a68a64",
    mentes: ["glutén", "tej", "tojás", "cukor"], kep: "", rendelheto: true },

  { id: "s4", kategoria: "sutemeny", nev: "Mákos guba szelet",
    leiras: "Vaníliás növényi krém, mákos piskóta, egy kis karácsonyi hangulat egész évben.",
    ar: 750, egyseg: "szelet", emoji: "🍮", szin: "#5c6b73",
    mentes: ["glutén", "tej", "tojás"], kep: "", rendelheto: true },

  // ---------- KEKSZEK ----------
  { id: "k1", kategoria: "keksz", nev: "Zabpelyhes-csokis keksz",
    leiras: "Ropogós széle, puha közepe, sok-sok étcsokidarabbal.",
    ar: 2490, egyseg: "doboz (12 db)", emoji: "🍪", szin: "#c08a4a",
    mentes: ["glutén", "tej", "tojás"], kep: "", rendelheto: true },

  { id: "k2", kategoria: "keksz", nev: "Linzer karika",
    leiras: "Omlós linzer házi, cukormentes baracklekvárral töltve.",
    ar: 2690, egyseg: "doboz (10 db)", emoji: "🍑", szin: "#e0a458",
    mentes: ["glutén", "tej", "tojás", "cukor"], kep: "", rendelheto: true },

  { id: "k3", kategoria: "keksz", nev: "Mézeskalács",
    leiras: "Fűszeres, puha mézeskalács – egyedi díszítéssel is kérhető.",
    ar: 2990, egyseg: "doboz (8 db)", emoji: "⭐", szin: "#8c5a2b",
    mentes: ["glutén", "tej", "tojás"], kep: "", rendelheto: true },

  // ---------- EGYÉB ÉTELEK (bemutató, nem rendelhető online) ----------
  { id: "e1", kategoria: "etel", nev: "Sült zöldséges quiche",
    leiras: "Hajdinás tészta, csicseriborsó-krém, szezonális sült zöldségek.",
    ar: 0, egyseg: "", emoji: "🥧", szin: "#7d8f4e",
    mentes: ["glutén", "tej", "tojás"], kep: "", rendelheto: false },

  { id: "e2", kategoria: "etel", nev: "Vöröslencse-krémleves",
    leiras: "Kókusztejes, gyömbéres, melegítő leves – rendezvényekre is.",
    ar: 0, egyseg: "", emoji: "🥣", szin: "#c4552d",
    mentes: ["glutén", "tej", "tojás", "cukor"], kep: "", rendelheto: false },

  { id: "e3", kategoria: "etel", nev: "Pogácsa",
    leiras: "Puha, „sajtos” ízű pogácsa élesztőpehellyel – vendégváróként tökéletes.",
    ar: 0, egyseg: "", emoji: "🥐", szin: "#d1a24a",
    mentes: ["glutén", "tej", "tojás"], kep: "", rendelheto: false },

  { id: "e4", kategoria: "etel", nev: "Hummuszos szendvicsfalatok",
    leiras: "Mindenmentes kenyér, házi hummusz, friss zöldségek – party tálakhoz.",
    ar: 0, egyseg: "", emoji: "🥪", szin: "#6f8f72",
    mentes: ["glutén", "tej", "tojás", "cukor"], kep: "", rendelheto: false }
];
