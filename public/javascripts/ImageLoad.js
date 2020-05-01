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

let retrunValue;

async function getApiTable(tableAlbumName) {
    let result;
    result = await apiCall({
        job: "getData",
        albumName: tableAlbumName
    });
    retrunValue = JSON.parse(result.data);
    console.log(retrunValue);


    createDiv(retrunValue, "albumImages");
    createImage(retrunValue, "albumImages");
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
            imagePopup(image);
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


// Enable the popup windown and adding the images + info
function imagePopup(image) {
    let modal = document.getElementById("myModal");
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");
    let name = image.src.replace(/^.*[\\\/]/, '');
    modal.style.display = "block";
    modalImg.src = image.src;
    captionText.innerHTML = name.split('.')[0];
}

// Closing the popup
function closePopup() {
    let popup = document.getElementById("myModal");
    popup.style.display = "none";
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
    if (!retrunValue.includes(name)) {
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