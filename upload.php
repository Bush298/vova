<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_FILES['file'])) {
        $uploadDir = 'uploads/';

        foreach ($_FILES['file']['tmp_name'] as $key => $tmpName) {
            $fileName = basename($_FILES['file']['name'][$key]);
            $targetFile = $uploadDir . $fileName;

            if (move_uploaded_file($tmpName, $targetFile)) {
                echo "Файл $fileName загружен успешно!<br>";
            } else {
                echo "Ошибка при загрузке файла $fileName!<br>";
            }
        }
    } else {
        echo "Файлы не получены!";
    }
} else {
    echo "Неверный метод запроса!";
}


var_dump($_POST);

?>