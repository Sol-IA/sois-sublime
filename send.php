<?php
/**
 * send.php — Formulaire de contact
 *
 * Reçoit les soumissions depuis contact.html (#contact-form).
 * Envoie un email à Sandra avec le message de la cliente.
 */

declare(strict_types=1);

const ADMIN_EMAIL  = 'sandra.soissublime@gmail.com';
const FROM_EMAIL   = 'noreply@sois-sublime.fr';
const FROM_NAME    = 'Sois Sublime — Formulaire contact';
const LOG_FILE     = __DIR__ . '/contact.log';
const REDIRECT_OK  = '/merci-contact.html';
const REDIRECT_KO  = '/contact.html?error=1';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Méthode non autorisée');
}

// Honeypot
if (!empty($_POST['website'] ?? '')) {
    header('Location: ' . REDIRECT_OK);
    exit;
}

$required = ['nom', 'email', 'message', 'rgpd'];
foreach ($required as $f) {
    if (empty($_POST[$f] ?? '')) {
        header('Location: ' . REDIRECT_KO);
        exit;
    }
}

$nom     = trim(strip_tags($_POST['nom']));
$email   = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$message = trim(strip_tags($_POST['message']));

if (!$email) {
    header('Location: ' . REDIRECT_KO);
    exit;
}

// Log
$line = sprintf(
    "[%s] %s <%s> | message=%s\n",
    date('Y-m-d H:i:s'),
    $nom, $email, str_replace(["\r", "\n"], ' ', $message)
);
@file_put_contents(LOG_FILE, $line, FILE_APPEND | LOCK_EX);

// Email à Sandra
$subject = '=?UTF-8?B?' . base64_encode("📩 Nouveau message de $nom — Sois Sublime") . '?=';

$body  = "Nouveau message reçu depuis le formulaire de contact.\r\n\r\n";
$body .= "De    : $nom\r\n";
$body .= "Email : $email\r\n\r\n";
$body .= "Message :\r\n";
$body .= str_repeat('─', 50) . "\r\n";
$body .= $message . "\r\n";
$body .= str_repeat('─', 50) . "\r\n\r\n";
$body .= "Tu peux répondre directement à cet email (Reply-To configuré).\r\n";

$headers  = "From: " . FROM_NAME . " <" . FROM_EMAIL . ">\r\n";
$headers .= "Reply-To: $nom <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

@mail(ADMIN_EMAIL, $subject, $body, $headers, '-f' . FROM_EMAIL);

header('Location: ' . REDIRECT_OK);
exit;
