// Adding items to the list
function updateDropdown(albums) {
    for (let index = 0; index < albums.length; index++) {
        let album = document.getElementById("dropdown");
        let list = document.createElement("li");
        list.id = "list" + index;
        album.appendChild(list);
    }
}

// Adding anchors to the created list items
function addAnchor(albums) {
    for (let index = 0; index < albums.length; index++) {
        let list = document.getElementById("list" + index);
        let anchor = document.createElement("a");
        let pathName = albums[index].replace(/\s/g, '');
        anchor.setAttribute("href", pathName);
        anchor.textContent = albums[index];
        list.appendChild(anchor);
    }
}