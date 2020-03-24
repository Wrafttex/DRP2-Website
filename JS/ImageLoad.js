// Input path 
// const images = ["../Source-Material/Test#6.jpg",
//     "../Source-Material/TestAlbum/Test#2.jpeg",
//     "../Source-Material/TestAlbum/Test#3.jpeg",
//     "../Source-Material/TestAlbum/Test#4.jpeg",
//     "../Source-Material/TestAlbum/Test#5.jpeg",
// ];

// Imput links
const images = [
    "https://cdn.pixabay.com/photo/2014/03/03/16/12/cinque-terre-279013_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/03/19/16/49/genoa-4948029_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/03/22/10/26/namibia-4956610_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/05/31/12/14/iphone-791450_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/03/21/19/27/sea-4955005_960_720.jpg",
];

// Creating image elements
function loadImage() {
    for (let index = 0; index < images.length; index++) {
        var image = new Image();
        image.id = "image" + index;
        image.src = images[index];
        image.alt = 'Failed to load ' + images[index];
        image.heigth = "200px";
        image.width = "400";
        image.style.padding = "5px";
        document.body.style.display = "block";
        document.getElementById('body').appendChild(image);
    }
}

function createPara() {
    var para = document.createElement("P");
    para.innerText = "This is a paragraph.";
    document.body.appendChild(para);
}

function setUpBackground() {

}

loadImage();