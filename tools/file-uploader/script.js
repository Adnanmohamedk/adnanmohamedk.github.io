document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const imagePreview = document.getElementById("image-preview");
    const uploadButton = document.getElementById("upload-button");
    const downloadLink = document.getElementById("download-link");

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    uploadButton.addEventListener("click", function () {
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            fetch("upload.php", {
                method: "POST",
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        downloadLink.href = data.fileURL;
                        downloadLink.style.display = "block";
                        alert("File uploaded successfully!");
                    } else {
                        alert("File upload failed!");
                    }
                });
        }
    });
});
