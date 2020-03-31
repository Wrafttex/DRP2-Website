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

function updateDropdown(albums) {
    for (let index = 0; index < albums.length; index++) {
        let album = document.getElementById("dropdown");
        let list = document.createElement("li");
        list.id = "list" + index;
        album.appendChild(list);
    }
}

function addAnchor(albums) {
    for (let index = 0; index < albums.length; index++) {
        let list = document.getElementById("list" + index);
        let anchor = document.createElement("a");
        let pathName = albums[index].replace(/\s/g, '');
        anchor.setAttribute("href", pathName + ".HTML");
        anchor.textContent = albums[index];
        list.appendChild(anchor);
    }
}