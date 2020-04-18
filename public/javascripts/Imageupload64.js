function encodeImageFileAsURL() {
    let filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];
        let fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result; // <--- data: base64
            let newImage = document.createElement('img');
            newImage.src = srcData;
            newImage.height = 400;
            newImage.width = 425;
            document.getElementById("imgTest").innerHTML = newImage.outerHTML;
            alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
            console.log("Converted Base64 version is " + srcData);
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}



function uploadedImagesToArray() {
    let filesSelected = document.getElementById("inputFileToLoad").files;
    for (let index = 0; index < filesSelected.length; index++) {
        let fileToLoad = filesSelected[index];
        let fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result;
            //console.log(index + ". Converted Base64 version is " + srcData);
            let newImage = new Image();
            newImage.src = srcData;
            base64ToArray(newImage.src, index, filesSelected.length);
        }
        fileReader.readAsDataURL(fileToLoad);
    }

}
let base64ForUploadedImages = [];

function base64ToArray(base64, index, maxImages) {
    console.log("Max length: " + maxImages);
    base64ForUploadedImages[index] = base64;
    console.log("Array length: " + base64ForUploadedImages.length);
    console.log(base64ForUploadedImages[index]);
    if (base64ForUploadedImages.length >= maxImages) {
        console.log("running");
        createDiv(base64ForUploadedImages, "uploadedImages");
        createImage(base64ForUploadedImages);
    }
    
}