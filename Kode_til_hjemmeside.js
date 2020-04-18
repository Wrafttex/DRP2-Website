const fs = require('fs');
const path = require('path');
let mysql = require('mysql');

// maby this helps... "sudo /etc/init.d/mysql start"

let con = mysql.createConnection({
    user: "webalbum",
    password: "password",
    connectionLimit: 10
});

let pathfileDirectory = "./public/javascripts/pathfile_test.js";
let imageDirectory = "./public/images";
let fileBuff = '';

let thething = {job: "mysqlInsert", albumName: "testAlbum", imageArray: ["ing1.jpg", "image2.jpg"]};

console.log(thething.imageArray);
console.log(JSON.stringify(thething.imageArray));

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE webAlbum", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});*/


//pathFinder();
//makeFile(pathfileDirectory, fileBuff);
//fileSync("TestAlbumImages", "text/javascript");

function pathFinder() {
    let albumContent = [];
    let albums = fs.readdirSync(imageDirectory);

    albums = extensionCheck(albums, false, '.');

    makeArr('Album', albums);

    for (let i = 0; i < albums.length; i++) {
        let albumDirectory = imageDirectory + '/' + albums[i];
        albumContent[i] = fs.readdirSync(albumDirectory);
    }

    for (let i = 0; i < albums.length; i++) {
        for (let j = 0; j < albumContent[i].length; j++) {
            albumContent[i][j] = '/images/' + albums[i] + '/' + albumContent[i][j];
        }
        albumContent[i] = extensionCheck(albumContent[i], true, '.jpg');
        makeArr(albums[i], albumContent[i]);
    }
}

function makeFile(pathfileDirectory, buff) {
    fs.writeFile(pathfileDirectory, buff, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function extensionCheck(tempArr, bool, ext) {
    let j = 0;
    let arr = [];
    for (let i = 0; i < tempArr.length; i++) {
        if (!bool && !path.extname(tempArr[i]).includes(ext)) {
            arr[j] = tempArr[i];
            j++;
        } else if (bool && path.extname(tempArr[i]).includes(ext)) {
            arr[j] = tempArr[i];
            j++;
        }

    }
    return arr;
}

function makeArr(arrName, arr) {
    fileBuff += 'let ' + arrName.replace(/\s+/g, '') + ' = [';
    for (let i = 0; i < arr.length; i++) {
        fileBuff += '\"' + arr[i] + '\",';
    }
    if (arr.length > 0) { fileBuff = fileBuff.slice(0, -1); }
    fileBuff += '];\n';
}

function fileSync(albumName, albumIndex) {
    fs.readFile('skabelon!!.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let result = data.replace('Album[0]', 'Album[' + albumIndex + ']');
        result = result.replace('TestAlbum', 'albumIndex');

        fs.writeFile(albumName + '.html', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
        console.log(result);
    });
}