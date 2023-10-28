<?php
$uploadDirectory = "files/"; // Directory to save uploaded files

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["file"])) {
    $file = $_FILES["file"];

    if ($file["error"] === UPLOAD_ERR_OK) {
        $targetPath = $uploadDirectory . basename($file["name"]);

        if (move_uploaded_file($file["tmp_name"], $targetPath)) {
            echo json_encode(["success" => true, "fileURL" => $targetPath]);
        } else {
            echo json_encode(["success" => false]);
        }
    } else {
        echo json_encode(["success" => false]);
    }
}
?>
