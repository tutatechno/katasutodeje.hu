# katasutodeje.hu

Kata Sütődéje – kézműves, mindenmentes finomságok honlapja (statikus oldal, GitHub Pages).

## Szerkesztés
- `kinalat.js` – **csak ezt kell szerkeszteni**: elérhetőség, kiemelt készítmények (2–4 db), galéria (4 kép)
- Fotók az `img/` mappába, ezeken a neveken:
  `img/hero-1.jpg` (nyitókép), `img/keszitmeny-1.jpg` … `keszitmeny-3.jpg`, `img/tagyon.jpg`,
  `img/rolunk.jpg`, `img/galeria/1.jpg` … `4.jpg`. Amíg nincs kép, „Fotó hamarosan” jelölés látszik.
- `jogi.html` – impresszum, adatkezelés, szerzői jog, allergének (a [szögletes zárójeles] részeket ki kell tölteni)

## Biztonság
- Nincs szerveroldali kód, adatbázis, űrlap, süti, külső betöltés (betűtípus, analitika sem)
- Szigorú CSP minden oldalon: csak saját fájlok, Trusted Types (DOM-XSS ellen), `base-uri`/`form-action`/`object-src` tiltva
- Nincs `innerHTML`, inline szkript vagy inline stílus; a képútvonalak szűrve
- Beágyazás (clickjacking) elleni védelem, `no-referrer`
- `/.well-known/security.txt` a hibabejelentéshez
