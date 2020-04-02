// Creating image elements
function loadImage(albumName) {
    for (let index = 0; index < albumName.length; index++) {
        let image = new Image();
        image.id = "image";
        image.classList.add("LoadedImage");
        image.src = albumName[index];
        image.alt = 'Failed to load ' + albumName[index];
        image.addEventListener("click", function() {
                imagePopup(image);
        }); 
        image.height = "200";
        image.width = "300";
        image.style.marginLeft = "20px";
        image.style.marginTop = "20px";
        document.getElementById('body').appendChild(image);
    }
}

function setUpAlbum(albumName) {
    document.body.style.backgroundColor = "grey";
    document.body.style.display = "block";
    document.title = albumName;
}

function imagePopup(image) {
    // let img = document.getElementById("image");
    let modal = document.getElementById("myModal");
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = image.src;
    captionText.innerHTML = image.alt;
}

function closePopup() {
    let modal = document.getElementById("myModal");
    // let span = document.getElementsByClassName("close")[0];
    modal.style.display = "none";
}

// Get the modal
// let modal = document.getElementById("myModal");
  
// Get the image and insert it inside the modal - use its "alt" text as a caption
// let img = document.getElementById("image");
// let modalImg = document.getElementById("img01");
// let captionText = document.getElementById("caption");
// img.onclick = function(){
//   modal.style.display = "block";
//   modalImg.src = this.src;
//   captionText.innerHTML = this.alt;
// }

// Get the <span> element that closes the modal
// let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
// span.onclick = function()