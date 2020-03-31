// Creating image elements
function loadImage(albumName) {
    for (let index = 0; index < albumName.length; index++) {
        let image = new Image();
        image.id = "image" + index;
        image.src = albumName[index];
        image.alt = 'Failed to load ' + albumName[index];
        image.height = "200";
        image.width = "400";
        image.style.padding = "5px";
        document.getElementById('body').appendChild(image);
    }
}

function setUpAlbum(albumName) {
    document.body.style.backgroundColor = "grey";
    document.body.style.display = "block";
    document.title = albumName;
}