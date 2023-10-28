const fileInput = document.getElementById('file-input');
const previewBox = document.getElementById('preview-box');
const previewImage = document.getElementById('preview-image');
const downloadButton = document.getElementById('download-button');

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];

    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewBox.style.display = 'block';
                downloadButton.disabled = false;
            };
            reader.readAsDataURL(file);
        }
    }
});

fileInput.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

fileInput.addEventListener('dragenter', function () {
    previewBox.style.border = '2px dashed #0073e6';
});

fileInput.addEventListener('dragleave', function () {
    previewBox.style.border = '2px dashed #999';
});

fileInput.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    previewBox.style.border = '2px dashed #999';

    const file = e.dataTransfer.files[0];

    if (file) {
        fileInput.files = e.dataTransfer.files;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewBox.style.display = 'block';
                downloadButton.disabled = false;
            };
            reader.readAsDataURL(file);
        }
    }
});

downloadButton.addEventListener('click', function () {
    const downloadLink = document.createElement('a');
    downloadLink.href = previewImage.src;
    downloadLink.download = 'uploaded_image.jpg';
    downloadLink.click();
});
