async function apiCall(data) {
    let respons = await fetch('/api', {
        method: 'POST',
        head: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    respons = await respons.json();
    return respons.body;
}

let returnValue;

async function getApiTable(tableAlbumName, calledFrom) {
    let result;
    result = await apiCall({
        job: "getData",
        albumName: tableAlbumName
    });
    console.log(result.status);
    if (result.status === "success") {
        returnValue = JSON.parse(result.data);
    } else if (result.status === "error" && calledFrom === "edit") {
        console.log("No table found, creating a new one with the name: " + tableAlbumName);
        resultNewtable = await apiCall({
            job: "insertData",
            albumName: tableAlbumName,
            imageArray: []
        });
        getApiTable(tableAlbumName, "edit");
        console.log(resultNewtable.status);
    }


    createDiv(returnValue, "albumImages");
    createImage(returnValue, "albumImages");
    createModalDiv(returnValue, "popUpcontent");
    createModalImage(returnValue);
}



// Note for createDiv function:
// "Creating div's for each image that is being uploaded
// so that each image will be put in a frame"
function createDiv(arrayName, destination) {
    let amount = 0;
    let rowID = "row" + amount;

    for (let index = 0; index < arrayName.length; index++) {
        let imageDiv = document.createElement("div");
        // "if more than 5 pictures in the row, push to new row"
        if (index % 5 == 0 || index == 0) {
            rowID = "row" + amount;
            newRow(rowID, destination);
            amount++;
        }

        imageDiv.id = "imageDiv" + destination + index;
        imageDiv.className = "loadedImages";
        imageDiv.style.height = "300px";
        imageDiv.style.width = "325px";
        imageDiv.style.display = "block";
        imageDiv.style.marginLeft = "1%";
        imageDiv.style.position = "relative"
        appendDiv(imageDiv, rowID + destination);
    }
}

// Note for createImage function:
// "Creating image elements, by looping through each image
// selected, and appending attributes such as ID, classname
// and and the modal popup function"
function createImage(arrayName, destination) {
    let imageID = 0;

    if (localStorage.getItem('imageID') != undefined) {
        imageID = localStorage.getItem('imageID');
    }
    for (let index = 0; index < arrayName.length; index++) {
        let image = new Image();
        image.id = imageID;
        image.className = "dragme";
        image.draggable = "true";

        if (typeof fileNames !== 'undefined' && fileNames.length > 0) {
            image.name = fileNames[index];
            image.src = arrayName[index];
        } else {
            image.name = arrayName[index];
            image.src = "/images/" + arrayName[index];
        }

        //image.alt = "Failed to load " + arrayName[index];
        //console.log("Image created");
        image.addEventListener("click", function() {
            openModal();
            currentSlides(parseInt(image.id, 10));
        });
        //console.log("Sending image");
        appendImage(image, destination, index);
        imageID++;
    }
    localStorage.setItem('imageID', imageID);
}

// function updateNames() {
//     let imageDivToUpdate;

//     for (let index = 0; index < amountOfImages + amountOfUplaoedImages; index++) {
//         imageDivToUpdate = document.getElementById("imageDivalbumImages" + index).firstElementChild;
//         imageDivToUpdate.name = imageDivToUpdate.src.split('/')[0];
//     }
// }

// Note for newRow function:
// "Create rows for images with styling and placement"
function newRow(rowID, destination) {
    let row = document.createElement("div");
    row.id = rowID + destination;
    row.style.display = "flex";
    row.className = "rows";
    row.style.paddingLeft = "10px";
    row.style.paddingRight = "10px";
    row.style.paddingBottom = "10px";
    appendDiv(row, destination);
}

// Append div
function appendDiv(div, rowID) {
    //console.log(rowID);
    let destinationDiv = document.getElementById(rowID);
    destinationDiv.appendChild(div);
}

//Append Image
function appendImage(image, destination, index) {
    let destinationImg = document.getElementById("imageDiv" + destination + index);
    destinationImg.appendChild(image);
    //console.log("Image appened");
}

// Changing background color, title and the way images are displayed
function setUpAlbum(albumName) {
    document.body.style.backgroundColor = "rgb(100, 100, 100)";
    document.body.style.display = "block";
    document.title = albumName;
    document.getElementById("welcome").innerHTML = albumName;
    localStorage.setItem("imageID", 0);
    localStorage.setItem("modalImageID", 0);
    //console.log("Album setup")
}

let amountOfImages = 0;
let albumArray = [];

async function stitching() {
    let grabID;
    let imageGrab;
    let loopamount;
    albumArray = [];
    let updateSuccess;
    let stitchSucess = 0;
    if (typeof amountOfUplaoedImages !== "undefined") {
        loopamount = amountOfImages + amountOfUplaoedImages;
    } else {
        newImageDivs();
        loopamount = amountOfImages;
    }

    for (let index = 0; index < loopamount; index++) {
        grabID = "imageDiv" + "albumImages" + index;
        imageGrab = document.getElementById(grabID).firstElementChild;
        updateSuccess = await sendToServer(imageGrab.name, imageGrab.src);
        albumArray[index] = imageGrab.name;
        console.log("Status: " + updateSuccess);

        if (returnValue.includes(imageGrab.name)) {
            albumArray[index] = imageGrab.name;
            stitchSucess++;
            console.log("Updated album: " + albumArray);
        } else if (!returnValue.includes(imageGrab.name) && updateSuccess === "success") {
            albumArray[index] = imageGrab.name;
            stitchSucess++;
            console.log("Updated album: " + albumArray);
        }
    }

    if (stitchSucess === loopamount) {
        document.getElementById("albumText").innerHTML =
            "Album updated and is ready to share";
        document.getElementById("uploadText").style.display = "none";
        document.getElementById("uploadedImages").innerHTML = "";
    }

    sendUpdatedAlbum(albumArray);
}


async function sendToServer(name, base64) {
    if (!returnValue.includes(name)) {
        let result = await apiCall({
            job: "imageUpload",
            imageName: name.split('.')[0],
            imageData: base64.substring(23)
        });
        return result.status;
    } else {
        return "success";
    }
}

function sendUpdatedAlbum(data) {
    console.log("The data being send: " + data);
    apiCall({ job: "updateData", albumName: "testAlbum", imageArray: data })
        .then(result => { console.log(result); });
}

let rowToGrabID;
let whereToPlaceNewDivs;

function newImageDivs() {
    let rowToGrab;
    let amountToGrab = document.getElementById("albumImages").childElementCount;

    for (let index = 0; index < amountToGrab; index++) {
        rowToGrabID = "row" + index + "albumImages";
        rowToGrab = document.getElementById(rowToGrabID).childElementCount;
        amountOfImages += rowToGrab;
    }

    whereToPlaceNewDivs = amountOfImages % 5;
    // console.log(rowToGrabID);
    // console.log(rowToGrabID.replace(/^\D+/g, '').split('a')[0]);
    // console.log(whereToPlaceNewDivs);
}

function createNewImageDivs(extraSpcareArray) {
    let amount = 0;
    let idIndex = amountOfImages;

    if (typeof rowToGrabID !== "undefined") {
        amount = rowToGrabID.replace(/^\D+/g, '').split('a')[0];
    } else {
        amount = 0;
    }

    let rowID = "row" + amount;

    for (let index = whereToPlaceNewDivs; index < extraSpcareArray.length + whereToPlaceNewDivs; index++) {
        let imageDiv = document.createElement("div");
        // "if more than 5 pictures in the row, push to new row"
        if (index % 5 == 0 || index == 0) {
            rowID = "row" + amount + 1;
            newRow(rowID, "albumImages");
            amount++;
        }

        imageDiv.id = "imageDiv" + "albumImages" + idIndex;
        imageDiv.className = "loadedImages";
        imageDiv.style.height = "300px";
        imageDiv.style.width = "325px";
        imageDiv.style.display = "block";
        imageDiv.style.marginLeft = "1%";
        imageDiv.style.position = "relative"
        appendDiv(imageDiv, rowID + "albumImages");
        idIndex++;
    }
}

// Creating div for modal/pop up
function createModalDiv(arrayname, destination) {
    let imageModalID = 0
    console.log(arrayname)
    if (localStorage.getItem('modalImageID') != undefined) {
        imageModalID = localStorage.getItem('modalImageID');
    }

    for (let index = 0; index < arrayname.length; index++) {
        let modalImageDiv = document.createElement("div");
        modalImageDiv.id = "modalImage" + imageModalID;
        modalImageDiv.className = "modalSlide";
        modalImageDiv.style.display = "none";
        appendModalDiv(modalImageDiv, destination);
        imageModalID++;
    }
}

// delete a string from image.src as we don't need that
function createModalImage(arrayName) {
    let modalImageID = 0;
    console.log(arrayName)

    if (localStorage.getItem('modalImageID') != undefined) {
        modalImageID = localStorage.getItem('modalImageID');
    }

    for (let index = 0; index < arrayName.length; index++) {
        let image = new Image();
        image.id = "modal" + modalImageID;
        image.src = "/images/" + arrayName[index];
        if (fileNames != undefined) {
            image.name = fileNames[index];
            console.log(image.name);
        }
        image.style.width = "auto";
        appendModalImage(image, modalImageID, "modalImage");
        modalCaption(image, modalImageID)
        modalImageID++;

    }
    localStorage.setItem('modalImageID', modalImageID);
}

// broke this function up to two as that was the best way to get the dataurl to work
function modalCaption(image, modalImageID) {
    let divwrapper = document.createElement("div")
    let buttonedit = document.createElement("button")
    let buttonSave = document.createElement("button")
    divwrapper.id = "divModalWrapper" + modalImageID;
    divwrapper.className = "captionTable";
    appendModalImage(divwrapper, modalImageID, "modalImage")

    buttonedit.textContent = "Edit metadata"
    buttonedit.className = "editcaption"
    buttonedit.addEventListener("click", function() {
        editableElement(divwrapper.id)
    });

    buttonSave.textContent = "Save metadata"
    buttonSave.className = "editcaption"
    buttonSave.addEventListener("click", function() {
        saveMetadata(divwrapper.id, modalImageID)
    });

    appendModalImage(buttonedit, modalImageID, "divModalWrapper")
    appendModalImage(buttonSave, modalImageID, "divModalWrapper")
    if (image.src.match('data:image/jpeg*')) {
        modalCaptionShow(image.src, modalImageID, image.name)
    } else {
        toDataURL(image.src, function(Base64string) {
            modalCaptionShow(Base64string, modalImageID, image.name)
        })
    }
}

function clickedOnEnter(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            this.blur();
            return false
        }
    }
}

// new function to be able to convert pathfile to base64
function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

// second part of modalcaption which needs the info from todataurl
function modalCaptionShow(imagesrc, modalImageID, imagename) {
    let metadataIntake = [269, 270, 315, 37510]
    let metaplace = ["0th", "0th", "0th", "Exif"]
    var ifds = ["0th", "Exif", "GPS", "Interop", "1st"];

    if (imagesrc.match('data:image/jpg*')) {
        exifdata = piexif.load(imagesrc);
        for (index = 0; index < metadataIntake.length; index++) {
            let divmetadata = document.createElement("div")
            let headmetadata = document.createElement("h3")
            let pmetadata = document.createElement("p")
            pmetadata.textContent = " "
            divmetadata.class = "metadata";
            divmetadata.id = piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"] + modalImageID

            appendModalImage(divmetadata, modalImageID, "divModalWrapper");

            headmetadata.textContent = piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"]
            headmetadata.className = "headmetadata"
            appendModalImage(headmetadata, modalImageID, piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"]);

            pmetadata.className = "pmetadata"
            pmetadata.contentEditable = false
            pmetadata.addEventListener("keypress", clickedOnEnter);
            pmetadata.addEventListener('blur', clickedOnEnter);
            if (piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"] == "DocumentName" && exifdata[metaplace[index]][metadataIntake[index]] === undefined) {
                pmetadata.textContent = imagename.substr(0, imagename.lastIndexOf('.'));
            } else {
                pmetadata.textContent = exifdata[metaplace[index]][metadataIntake[index]];
            }
            appendModalImage(pmetadata, modalImageID, piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"])
        }
    }
}

function editableElement(divID) {
    let captionedit = document.getElementById(divID).getElementsByClassName("pmetadata")
    console.log(captionedit[0].textContent)
    console.log(captionedit)
    console.log(captionedit[0])
    for (let index = 0; index < captionedit.length; index++) {
        captionedit[index].contentEditable = (captionedit[index].contentEditable === "false") ? true : false;
    }
}

// added function sendtoserver, think i did it correctly 
function saveMetadata(divID, imageID, Base64string) {
    let captionedit = document.getElementById(divID).getElementsByClassName("pmetadata")
    let imageModal = document.getElementById("modal" + imageID)
    let imageNormal = document.getElementById(imageID)
    let metadataIntake = [269, 270, 315, 37510]
    let metaplace = ["0th", "0th", "0th", "Exif"]
    let zerothIfd = {};
    let exifIfd = {};

    for (let index = 0; index < captionedit.length; index++) {
        if (piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"] == "DocumentName") {
            zerothIfd[piexif.ImageIFD.DocumentName] = captionedit[index].textContent
        } else if (piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"] == "ImageDescription") {
            zerothIfd[piexif.ImageIFD.ImageDescription] = captionedit[index].textContent
        } else if (piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"] == "Artist") {
            zerothIfd[piexif.ImageIFD.Artist] = captionedit[index].textContent
        } else if (piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"] == "UserComment") {
            exifIfd[piexif.ExifIFD.UserComment] = captionedit[index].textContent
        }
    }
    let exifArray = { "0th": zerothIfd, "Exif": exifIfd };
    let exifBinary = piexif.dump(exifArray)
    if (imageNormal.src.match('data:image/jpg*')) {
        let newBase64JPG = piexif.insert(exifBinary, imageNormal.src)
        imageModal.src = newBase64JPG
        imageNormal.src = newBase64JPG
        sendToServer(imageNormal.name, newBase64JPG)
    } else {
        toDataURL(imageNormal.src, function(Base64string) {
            let newBase64JPG = piexif.insert(exifBinary, Base64string)
            imageModal.src = newBase64JPG
            imageNormal.src = newBase64JPG
            sendMetaDataToServer(imageNormal.name, newBase64JPG)
        })
    }
}

async function sendMetaDataToServer(name, base64) {
    //console.log(name)
    //console.log(base64)
    console.log(returnValue)
    let result = await apiCall({
        job: "imageUpload",
        imageName: name.split('.')[0],
        imageData: base64.substring(23)
    });
    console.log(result.status);
    return result.status;
}

function appendModalDiv(div, ID) {
    let destinationDiv = document.getElementById(ID);
    destinationDiv.appendChild(div);
}


function appendModalImage(image, imageID, divplace) {
    let destinationImg = document.getElementById(divplace + imageID);
    destinationImg.appendChild(image);
    //  console.log("Image appened");

}

function openModal() {

    document.getElementById("flexPopup").style.display = "block";
}

function closeModal() {
    document.getElementById("flexPopup").style.display = "none";
}

function currentSlides(ImageID) {
    showSlides(slideIndex = ImageID);

}


function nextSlides(imageID) {
    showSlides(slideIndex += imageID);
}

// remember that slide lenght is one number higher than our index, as index starts at zero and lenght starts at one
function showSlides(imageID) {
    let i;
    let slides = document.getElementsByClassName("modalSlide");

    if (imageID > slides.length - 1) {
        slideIndex = 0
    }

    if (imageID < 0) {
        slideIndex = slides.length - 1
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";

    }
    slides[slideIndex].style.display = "block";

}