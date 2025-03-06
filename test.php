<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require '/home/jokeyfoa/public_html/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $mail = new PHPMailer(true);
    echo "PHPMailer работает!";
} catch (Exception $e) {
    echo "Ошибка: " . $e->getMessage();
}
?>
