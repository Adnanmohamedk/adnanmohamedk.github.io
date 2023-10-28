<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];

    if ($file['error'] === 0 && strpos($file['type'], 'image/') === 0) {
        $uploadDir = 'files/';
        $uploadPath = $uploadDir . basename($file['name']);

        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            echo 'File uploaded successfully.';
        } else {
            echo 'Error uploading file.';
        }
    } else {
        echo 'Invalid file format.';
    }
}
?>
