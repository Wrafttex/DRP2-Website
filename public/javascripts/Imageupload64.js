let base64ForUploadedImages = [];
let fileNames = [];
let extraSpace = [];
var amountOfUplaoedImages;

function uploadedImagesToArray() {
    let filesSelected = document.getElementById("inputFileToLoad").files;
    amountOfUplaoedImages = filesSelected.length;
    for (let index = 0; index < filesSelected.length; index++) {
        fileNames.push(filesSelected[index].name);
        let fileToLoad = filesSelected[index];
        let fileReader = new FileReader();
        extraSpace.push("");

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

// Note for base64ToArray function
// "Uses uploadedImagesToArray function, stores in array, sets attributes 
// and in the end, resets imageID to 0" 
function base64ToArray(base64, index, maxImages) {
    let combinedArrays;
    // console.log("Max length: " + maxImages);
    base64ForUploadedImages[index] = base64;
    // console.log("Array length: " + base64ForUploadedImages.length);
    //console.log(base64ForUploadedImages[index]);
    if (base64ForUploadedImages.length >= maxImages) {
        //combinedArrays = base64ForUploadedImages.concat(TestAlbumImages);
        // console.log("running");
        document.getElementById("uploadText").style.display = "block";
        createDiv(base64ForUploadedImages, "uploadedImages");
        createImage(base64ForUploadedImages, "uploadedImages");
        newImageDivs();
        createNewImageDivs(extraSpace);
        localStorage.setItem('imageID', "0");
        extraSpace = [];
        createModalDiv(base64ForUploadedImages, "popUpcontent")
        createModalImage(base64ForUploadedImages);
        localStorage.setItem('modalImageID', "0");
    }
}