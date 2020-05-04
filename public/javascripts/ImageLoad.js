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

async function getApiTable(tableAlbumName) {
    let result;
    result = await apiCall({
        job: "getData",
        albumName: tableAlbumName
    });
    returnValue = JSON.parse(result.data);
    console.log(returnValue);


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
    //console.log("Album setup")
}

let amountOfImages = 0;


function savePlacement() {
    let grabID;
    let imageGrab;
    let updatedAlbum = [];
    let loopamount;
    if (typeof amountOfUplaoedImages !== "undefined") {
        loopamount = amountOfImages + amountOfUplaoedImages;
    } else {
        newImageDivs();
        loopamount = amountOfImages;
    }

    for (let index = 0; index < loopamount; index++) {
        grabID = "imageDiv" + "albumImages" + index;
        imageGrab = document.getElementById(grabID).firstElementChild;
        sendToServer(imageGrab.name, imageGrab.src);
        updatedAlbum[index] = imageGrab.name;
    }

    sendUpdatedAlbum(updatedAlbum);
}

function sendToServer(name, base64) {
    if (!returnValue.includes(name)) {
        console.log("Sending images to server");
        apiCall({
                job: "imageUploade",
                imageName: name.split('.')[0],
                imageData: base64.substring(23)
            })
            .then(result => { console.log(result); });
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
    let amount = rowToGrabID.replace(/^\D+/g, '').split('a')[0];
    let idIndex = amountOfImages;
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


function createModalImage(arrayName) {
    let modalImageID = 0;

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
        //image.alt = "Failed to load " + arrayName[index];
        image.style.width = "auto";
        //console.log("Image created");
        //console.log("Sending image");
        appendModalImage(image, modalImageID, "modalImage");
        modalCaption(image, modalImageID)

        modalImageID++;

    }
    localStorage.setItem('modalImageID', modalImageID);
}

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
    buttonSave.textContent = "Save Button"
    buttonSave.className = "editcaption"
    buttonSave.addEventListener("click", function() {
        saveMetadata(divwrapper.id, modalImageID)
    });

    appendModalImage(buttonedit, modalImageID, "divModalWrapper")
    appendModalImage(buttonSave, modalImageID, "divModalWrapper")

    let exifdata
    if (image.src.match('data:image/jpeg*')) {
        exifdata = piexif.load(image.src);
        // console.log(exifdata);
    }


    let metadataIntake = [269, 270, 315, 37510]
    let metaplace = ["0th", "0th", "0th", "Exif"]
    var ifds = ["0th", "Exif", "GPS", "Interop", "1st"];

    if (image.src.match('data:image/jpeg*')) {
        // console.log(exifdata["0th"][269])
        // console.log(exifdata["0th"][270])
        // console.log(exifdata["0th"][315])
        // console.log(exifdata["Exif"][37510])

        for (index = 0; index < metadataIntake.length; index++) {
            let divmetadata = document.createElement("div")
            let headmetadata = document.createElement("h3")
            let pmetadata = document.createElement("p")
            pmetadata.textContent = " "
            divmetadata.class = "metadata";
            divmetadata.id = piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"] + modalImageID
                // console.log(piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"])
            appendModalImage(divmetadata, modalImageID, "divModalWrapper");

            headmetadata.textContent = piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"]
            headmetadata.className = "headmetadata"
            appendModalImage(headmetadata, modalImageID, piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"]);

            pmetadata.className = "pmetadata"
            pmetadata.contentEditable = false
            if (piexif.TAGS[metaplace[index]][metadataIntake[index]]["name"] == "DocumentName" && exifdata[metaplace[index]][metadataIntake[index]] === undefined) {
                pmetadata.textContent = image.name.substr(0, image.name.lastIndexOf('.'));
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
        // if((captionedit[index].contentEditable) === "true"){
        //     captionedit[index].contentEditable = false
        //     console.log("test")
        // }
        // else {
        //     captionedit[index].contentEditable = true
        // }

    }

    //document.getElementById("caption").contentEditable = true;

}

function saveMetadata(divID, numberID) {




    let captionhead = document.getElementById(divID).getElementsByClassName("headmetadata") //meh
    let captionedit = document.getElementById(divID).getElementsByClassName("pmetadata")
    let imageModal = document.getElementById("modal" + numberID)
    let imageNormal = document.getElementById(numberID)


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
    let newBase64JPG = piexif.insert(exifBinary, imageModal.src)
    imageModal.src = newBase64JPG
    imageNormal.src = newBase64JPG





}


function appendModalDiv(div, ID) {
    let destinationDiv = document.getElementById(ID);
    destinationDiv.appendChild(div);
}


function appendModalImage(image, index, divplace) {
    let destinationImg = document.getElementById(divplace + index);
    destinationImg.appendChild(image);
    //  console.log("Image appened");

}

function openModal() {

    document.getElementById("flexPopup").style.display = "block";
}

function closeModal() {
    document.getElementById("flexPopup").style.display = "none";
}

function currentSlides(ID) {
    showSlides(slideIndex = ID);

}


function plusSlides(n) {
    showSlides(slideIndex += n);
}

// remember that slide lenght is one number higher than our index, as index starts at zero and lenght starts at one
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("modalSlide");
    // console.log(n);
    // console.log(slides.length);



    if (n > slides.length - 1) {
        slideIndex = 0
    }

    if (n < 0) {
        slideIndex = slides.length - 1
    }
    // console.log(slideIndex);

    ;
    // console.log(document.getElementById(slideIndex).name);
    let captionText = document.getElementById("caption");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";

    }
    slides[slideIndex].style.display = "block";



}