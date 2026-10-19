# katasutodeje.hu

Kata Sütődéje – kézműves, mindenmentes finomságok honlapja (statikus oldal, GitHub Pages).

## Szerkesztés
- `kinalat.js` – **csak ezt kell szerkeszteni**: elérhetőség, kiemelt készítmények, galéria
- Fotók: az `img/` mappába a `kinalat.js`-ben és az `index.html`-ben megadott néven
  (`img/hero-1.jpg`, `img/hero-2.jpg`, `img/tagyon.jpg`, `img/rolunk.jpg`,
  `img/keszitmeny-1…5.jpg`, `img/galeria/1…6.jpg`). Amíg nincs kép, „Fotó helye” látszik.
- `jogi.html` – impresszum, adatkezelés, szerzői jog, allergének (a [szögletes zárójeles] részeket ki kell tölteni)

## Biztonság
- Nincs szerveroldali kód, adatbázis, űrlap, süti, külső betöltés
- Szigorú Content-Security-Policy minden oldalon, `innerHTML` nincs használva
- `/.well-known/security.txt` a hibabejelentéshez
