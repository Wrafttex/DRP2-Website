// Creating image elements
function createDiv(albumName) {
    let amount = 0;
    let rowID = "row" + amount;

    for (let index = 0; index < albumName.length; index++) {
        let imageDiv = document.createElement("div");

        if (index % 4 == 0 || index == 0) {
            rowID = "row" + amount;
            newRow(rowID);
            amount++;
        }

        imageDiv.id = "imageDiv" + index;
        imageDiv.style.height = "400px";
        imageDiv.style.width = "425px";
        imageDiv.style.display = "block";
        imageDiv.style.overflow = "hidden";
        imageDiv.style.marginLeft = "1%";
        imageDiv.classList.add("LoadedImage");
        appendDiv(imageDiv, rowID);
    }
}

// Creating image elements
function createImage(albumName) {
    for (let index = 0; index < albumName.length; index++) {
        let image = new Image();
        image.id = index;
        //image.classList.add("LoadedImage");
        image.src = albumName[index];
        image.alt = "Failed to load " + albumName[index];
        // imgae.style.objectFit = "cover";
        console.log("Image created");
        image.addEventListener("click", function() {
            imagePopup(image);
        });
        console.log("Sending image");
        appendImage(image, index);
    }
}

// Create rows for images
function newRow(rowID) {
    let row = document.createElement("div");
    row.id = rowID;
    row.style.display = "flex";
    row.classList.add("rows");
    row.style.paddingLeft = "10px";
    row.style.paddingRight = "10px";
    row.style.paddingBottom = "10px";
    appendDiv(row, "albumImages");
}

// Append div
function appendDiv(div, rowID) {
    console.log(rowID);
    let destinationDiv = document.getElementById(rowID);
    destinationDiv.appendChild(div);
}

//Append Image
function appendImage(image, index) {
    let destinationImg = document.getElementById("imageDiv" + index);
    destinationImg.appendChild(image);
    console.log("Image appened");
}

// Changeing background color, title and the way images are displayed
function setUpAlbum(albumName) {
    document.body.style.backgroundColor = "rgb(100, 100, 100)";
    document.body.style.display = "block";
    document.title = albumName;
    document.getElementById("welcome").innerHTML = albumName;
    console.log("Album setup")
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

function editWindow() {
    let window = document.getElementById("editWondow");
    let windowContent = document.getElementById("editWindownContent");
    let row = document.getElementById("row0");
    window.style.display = "flex";
    windowContent.innerHTML = "row";
}

// Closing the popup
function closePopup(id) {
    let popup = document.getElementById(id);
    popup.style.display = "none";
}