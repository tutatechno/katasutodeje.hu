<?php
/* =========================================================
   KATA SÜTŐDÉJE – rendelés fogadása és e-mail küldése
   Állítsd be a saját e-mail címeidet!
   ========================================================= */
$KATA_EMAIL   = "rendeles@katasutodeje.hu";   // ide érkeznek a rendelések
$FELADO_EMAIL = "noreply@katasutodeje.hu";    // a tárhely domainjén lévő cím legyen

header("Content-Type: application/json; charset=utf-8");

function valasz($ok, $hiba = "") {
  if (!$ok) http_response_code(400);
  echo json_encode(["ok" => $ok, "hiba" => $hiba], JSON_UNESCAPED_UNICODE);
  exit;
}
function tiszta($s, $max = 500) {
  $s = trim(strip_tags((string)$s));
  $s = str_replace(["\r", "\n"], " ", $s);
  return mb_substr($s, 0, $max);
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") valasz(false, "Csak POST kérés engedélyezett.");

$d = json_decode(file_get_contents("php://input"), true);
if (!is_array($d)) valasz(false, "Hibás adat.");
if (!empty($d["weboldal"])) valasz(true); // spam-csapda: csendben elnyeljük

$nev     = tiszta($d["nev"] ?? "", 100);
$telefon = tiszta($d["telefon"] ?? "", 40);
$email   = filter_var(trim($d["email"] ?? ""), FILTER_VALIDATE_EMAIL);
$datum   = preg_match('/^\d{4}-\d{2}-\d{2}$/', $d["datum"] ?? "") ? $d["datum"] : "";
$atvetel = tiszta($d["atvetel"] ?? "", 40);
$cim     = tiszta($d["cim"] ?? "", 200);
$megj    = trim(strip_tags(mb_substr((string)($d["megjegyzes"] ?? ""), 0, 2000)));
$tetelek = is_array($d["tetelek"] ?? null) ? array_slice($d["tetelek"], 0, 50) : [];

if (!$nev || !$telefon || !$email || !$datum || !$tetelek) valasz(false, "Hiányzó kötelező mező.");

$sorok = ""; $osszeg = 0;
foreach ($tetelek as $t) {
  $db = max(1, min(99, (int)($t["db"] ?? 1)));
  $ar = max(0, (int)($t["ar"] ?? 0));
  $osszeg += $db * $ar;
  $sorok .= "- " . tiszta($t["nev"] ?? "", 100) . " (" . tiszta($t["egyseg"] ?? "", 60) . ") × $db = "
          . number_format($db * $ar, 0, ",", " ") . " Ft\n";
}
$osszegStr = number_format($osszeg, 0, ",", " ") . " Ft";

$szoveg = "Új rendelés érkezett a katasutodeje.hu oldalról!\n\n"
        . "Név: $nev\nTelefon: $telefon\nE-mail: $email\n"
        . "Átvétel: $datum – $atvetel" . ($cim ? " ($cim)" : "") . "\n\n"
        . "Tételek:\n$sorok\nÖsszesen: $osszegStr\n\n"
        . "Megjegyzés:\n" . ($megj ?: "-") . "\n";

$fejlec = "From: Kata Sütődéje <$FELADO_EMAIL>\r\n"
        . "Reply-To: $email\r\n"
        . "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n";
$targy = "=?UTF-8?B?" . base64_encode("Új rendelés – $nev ($datum)") . "?=";

if (!mail($KATA_EMAIL, $targy, $szoveg, $fejlec)) valasz(false, "Az e-mail küldése nem sikerült.");

// Visszaigazolás a vevőnek
$vevoSzoveg = "Kedves $nev!\n\nKöszönöm a rendelésed! Hamarosan jelentkezem a részletekkel.\n\n"
            . "A rendelésed:\n$sorok\nÖsszesen: $osszegStr\nÁtvétel: $datum – $atvetel\n\n"
            . "Szeretettel:\nKata\nkatasutodeje.hu\n";
$vevoFejlec = "From: Kata Sütődéje <$FELADO_EMAIL>\r\nReply-To: $KATA_EMAIL\r\n"
            . "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n";
@mail($email, "=?UTF-8?B?" . base64_encode("Rendelésed megérkezett – Kata Sütődéje") . "?=", $vevoSzoveg, $vevoFejlec);

valasz(true);
