<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// Настраиваем почту




if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    $files = [];
    
    // Обрабатываем файлы
    if (!empty($_FILES['file']['name'][0])) {
        foreach ($_FILES['file']['tmp_name'] as $key => $tmpName) {
            $fileName = basename($_FILES['file']['name'][$key]);
            $targetFile = $uploadDir . $fileName;
            
            if (move_uploaded_file($tmpName, $targetFile)) {
                $files[] = $targetFile;
            }
        }
    }
    
    // Настраиваем почту
    try {
        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // SMTP-сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'bushnev.max@gmail.com'; 
        $mail->Password = 'aaha dnki jrct fbqq'; 
        $mail->SMTPSecure = 'tls'; 
        $mail->Port = 587;
       


        $mail->setFrom('bushnev.max@gmail.com', 'Joker Tattoo Inc.');
        $mail->addAddress('maxon298@yandex.ru'); // Кому отправляем
        //jokertattooincorp@gmail.com
        // Прикрепляем файлы
        foreach ($files as $file) {
            $mail->addAttachment($file);
        }

        // Тема и тело письма
        $mail->Subject = 'Новая заявка на татуху';
        $mail->Body = "Имя: " . $_POST['name'] . "\nEmail: " . $_POST['email'] . "\nОписание: " . $_POST['description'];

        $mail->send();
        echo "Сообщение отправлено!";
    } catch (Exception $e) {
        echo "Ошибка отправки: {$mail->ErrorInfo}";
    }
}
?>
