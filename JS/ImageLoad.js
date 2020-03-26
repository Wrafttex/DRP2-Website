// Input path 
const images = ["../Source-Material/TestAlbum/Test1.jpeg",
    "../Source-Material/TestAlbum/Test2.jpeg",
    "../Source-Material/TestAlbum/Test3.jpeg",
    "../Source-Material/TestAlbum/Test4.jpeg",
    "../Source-Material/TestAlbum/Test5.jpeg",
];

const albums = ["Test Album", "Brasilien Tur", "Sydpolen Tur", "USA tur"];

// Imput links
// const images = [
//     "https://cdn.pixabay.com/photo/2014/03/03/16/12/cinque-terre-279013_960_720.jpg",
//     "https://cdn.pixabay.com/photo/2020/03/19/16/49/genoa-4948029_960_720.jpg",
//     "https://cdn.pixabay.com/photo/2020/03/22/10/26/namibia-4956610_960_720.jpg",
//     "https://cdn.pixabay.com/photo/2015/05/31/12/14/iphone-791450_960_720.jpg",
//     "https://cdn.pixabay.com/photo/2020/03/21/19/27/sea-4955005_960_720.jpg",
// ];

// Creating image elements
function loadImage() {
    for (let index = 0; index < images.length; index++) {
        let image = new Image();
        image.id = "image" + index;
        image.src = images[index];
        image.alt = 'Failed to load ' + images[index];
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

function updateDropdown() {
    for (let index = 0; index < albums.length; index++) {
        let album = document.getElementById("dropdown");
        let list = document.createElement("li");
        list.id = "list" + index;
        album.appendChild(list);
    }
}

function addAnchor() {
    for (let index = 0; index < albums.length; index++) {
        let list = document.getElementById("list" + index);
        let anchor = document.createElement("a");
        let pathName = albums[index].replace(/\s/g, '');
        anchor.setAttribute("href", pathName + ".HTML");
        anchor.textContent = albums[index];
        list.appendChild(anchor);
    }
}

setUpAlbum(albums[0]);
updateDropdown();
addAnchor();
loadImage();