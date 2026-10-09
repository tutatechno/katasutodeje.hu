/* Kata Sütődéje – kategóriák kirajzolása és elérhetőségek kitöltése */

function kartyak(kat) {
  if (!kat.receptek.length) {
    return Array.from({ length: 3 }, () => `
      <article class="recipe recipe--soon">
        <div class="recipe__img">${kat.emoji}</div>
        <div class="recipe__body"><h4>Hamarosan</h4><p>Ide kerülnek majd a receptek.</p></div>
      </article>`).join("");
  }
  return kat.receptek.map(r => `
    <article class="recipe">
      <div class="recipe__img">${r.kep ? `<img src="${r.kep}" alt="${r.nev}" loading="lazy">` : kat.emoji}</div>
      <div class="recipe__body"><h4>${r.nev}</h4><p>${r.leiras || ""}</p></div>
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
