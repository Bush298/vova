<?php
$to = "maxon298@yandex.ru"; // Кому отправлять
$subject = "Письмо с файлом";
$from = "bushnev.max@gmail.com"; // Твой email
$file = "uploads/test.png"; // Путь к файлу

// Заголовки письма
$boundary = md5(time());
$headers = "From: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Читаем файл
$file_content = chunk_split(base64_encode(file_get_contents($file)));
$filename = basename($file);

// Формируем тело письма
$message = "--$boundary\r\n";
$message .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$message .= "Привет! Вот твой файл.\r\n\r\n";
$message .= "--$boundary\r\n";
$message .= "Content-Type: application/octet-stream; name=\"$filename\"\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n";
$message .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
$message .= $file_content . "\r\n";
$message .= "--$boundary--";

// Отправляем письмо
if (mail($to, $subject, $message, $headers)) {
    echo "Письмо с файлом отправлено!";
} else {
    echo "Ошибка при отправке письма.";
}
?>
