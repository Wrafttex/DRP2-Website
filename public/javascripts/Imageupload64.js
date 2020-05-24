let base64ForUploadedImages = [];
let fileNames = [];
let extraSpace = [];
var amountOfUplaoedImages;

function uploadedImagesToArray() {
    let filesSelected = document.getElementById("inputFileToLoad").files;
    amountOfUplaoedImages = filesSelected.length;
    let resize_width = 500;
    for (let index = 0; index < filesSelected.length; index++) {
        if (filesSelected[index].name.split('.').pop() !== "jpg") {
            document.getElementById("uploadText").innerHTML = "You tried to upload a non-jpg file, only jpg files are accepted.";
            document.getElementById("uploadText").style.display = "block";
            continue;
        }

        fileNames.push(filesSelected[index].name);

        let fileToLoad = filesSelected[index];
        let fileReader = new FileReader();
        extraSpace.push("");

        fileReader.onload = function(fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result;
            let newImage = new Image();
            newImage.src = srcData;
            let exifObj = piexif.load(srcData)
            exifObj["0th"][274] = 1
            let stringsWithExif = piexif.dump(exifObj)
            newImage.onload = function(el) {
                let elem = document.createElement('canvas');
                let scaleFactor = resize_width / el.target.width
                elem.width = resize_width
                elem.height = el.target.height * scaleFactor

                let ctx = elem.getContext('2d')
                ctx.drawImage(el.target, 0, 0, elem.width, elem.height)


                let newSrc = ctx.canvas.toDataURL("image/jpeg", el.target, 0)
                let skk = piexif.insert(stringsWithExif, newSrc)
                base64ToArray(skk, index, filesSelected.length);
            }
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}


// Note for base64ToArray function
// "Uses uploadedImagesToArray function, stores in array, sets attributes 
// and in the end, resets imageID to 0" 
function base64ToArray(base64, index, maxImages) {
    console.log("Max length: " + maxImages);
    base64ForUploadedImages[index] = base64;
    console.log("Array length: " + base64ForUploadedImages.length);
    console.log(base64ForUploadedImages[index]);
    if (base64ForUploadedImages.length >= maxImages) {
        console.log("running");
        document.getElementById("uploadText").style.display = "block";
        createDiv(base64ForUploadedImages, "uploadedImages");
        createImage(base64ForUploadedImages, "uploadedImages");
        newImageDivs();
        createNewImageDivs(extraSpace);
        localStorage.setItem('imageID', "0");
        extraSpace = [];
        localStorage.setItem('modalImageID', "0");
    }
}