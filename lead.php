<?php
/**
 * lead.php — Formulaire lead magnet "Quand tu te choisis"
 *
 * Reçoit les soumissions du formulaire ebook depuis :
 *   - index.html (section lead-magnet)
 *   - contact.html (section lead-magnet)
 *
 * Actions :
 *   1. Valide les champs obligatoires + honeypot
 *   2. Envoie l'ebook PDF par email à la cliente
 *   3. Envoie une notif à Sandra en CCI
 *   4. Logge la soumission dans leads.log (fallback si pas de BDD)
 *   5. Redirige vers /merci-ebook.html
 *
 * Prérequis OVH : PHP 7.4+ avec fonction mail() activée.
 * Pour migration Supabase : remplacer le bloc "log + mail" par un INSERT SQL.
 */

declare(strict_types=1);

// ── CONFIG ───────────────────────────────────────────────
const ADMIN_EMAIL    = 'sandra.soissublime@gmail.com';
const FROM_EMAIL     = 'noreply@sois-sublime.fr';
const FROM_NAME      = 'Sois Sublime';
const EBOOK_FILE     = __DIR__ . '/ebook-quand-tu-te-choisis.pdf';
const LOG_FILE       = __DIR__ . '/leads.log';
const REDIRECT_OK    = '/merci-ebook.html';
const REDIRECT_KO    = '/contact.html?error=1';

// ── ROUTAGE ──────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Méthode non autorisée');
}

// Honeypot anti-spam
if (!empty($_POST['website'] ?? '')) {
    header('Location: ' . REDIRECT_OK);
    exit;
}

// ── VALIDATION ───────────────────────────────────────────
$required = ['prenom', 'nom', 'email', 'objectif', 'duree', 'regimes', 'rgpd'];
foreach ($required as $f) {
    if (empty($_POST[$f] ?? '')) {
        header('Location: ' . REDIRECT_KO);
        exit;
    }
}

$prenom   = trim(strip_tags($_POST['prenom']));
$nom      = trim(strip_tags($_POST['nom']));
$email    = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$tel      = trim(strip_tags($_POST['telephone'] ?? ''));
$objectif = trim(strip_tags($_POST['objectif']));
$duree    = trim(strip_tags($_POST['duree']));
$regimes  = trim(strip_tags($_POST['regimes']));

if (!$email) {
    header('Location: ' . REDIRECT_KO);
    exit;
}

// ── LOG ──────────────────────────────────────────────────
$line = sprintf(
    "[%s] %s %s <%s> | tel=%s | objectif=%s | duree=%s | regimes=%s\n",
    date('Y-m-d H:i:s'),
    $prenom, $nom, $email, $tel, $objectif, $duree, $regimes
);
@file_put_contents(LOG_FILE, $line, FILE_APPEND | LOCK_EX);

// ── EMAIL À LA CLIENTE (avec PDF en pièce jointe) ────────
$boundary = '----=_Part_' . md5((string) time());
$headers  = "From: " . FROM_NAME . " <" . FROM_EMAIL . ">\r\n";
$headers .= "Bcc: " . ADMIN_EMAIL . "\r\n";
$headers .= "Reply-To: " . ADMIN_EMAIL . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$bodyText  = "Bonjour $prenom,\r\n\r\n";
$bodyText .= "Merci d'avoir téléchargé \"Quand tu te choisis\" ! 🌸\r\n\r\n";
$bodyText .= "Tu trouveras l'ebook en pièce jointe de cet email. Prends le temps de le lire, et n'hésite pas à m'écrire pour échanger dessus.\r\n\r\n";
$bodyText .= "Je t'invite aussi à me suivre sur Instagram @sois_sublime pour ne rien rater de mes contenus.\r\n\r\n";
$bodyText .= "À très vite,\r\n";
$bodyText .= "Sandra\r\n\r\n";
$bodyText .= "---\r\n";
$bodyText .= "Sois Sublime — https://sois-sublime.fr\r\n";
$bodyText .= "WhatsApp : 06 12 45 29 60\r\n";

$body  = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $bodyText . "\r\n";

if (is_file(EBOOK_FILE)) {
    $pdf = base64_encode((string) file_get_contents(EBOOK_FILE));
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/pdf; name=\"ebook-quand-tu-te-choisis.pdf\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"ebook-quand-tu-te-choisis.pdf\"\r\n\r\n";
    $body .= chunk_split($pdf) . "\r\n";
}
$body .= "--$boundary--";

$subject = '=?UTF-8?B?' . base64_encode('🌸 Ton ebook "Quand tu te choisis" est arrivé') . '?=';

@mail($email, $subject, $body, $headers, '-f' . FROM_EMAIL);

// ── REDIRECTION ──────────────────────────────────────────
header('Location: ' . REDIRECT_OK);
exit;
