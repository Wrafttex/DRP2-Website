const fs = require('fs');
const mysql = require('mysql');

const con = mysql.createPool({
    user: "webalbum",
    password: "password",
    database: "webAlbum",
    connectionLimit: 10
});
const errorMassage = { status: "error" };
const successMassage = { status: "success" };

module.exports = {
    handleApiRequest: async function (request, response) {
        const { headers, method, url } = request;
        let body = [];
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            jobHandler(JSON.parse(body)).then(body => {
                sendResponse({ headers, method, url, body }, response);
            })
        });
    }
};

async function jobHandler(data) {
    let result;
    if (data.job === "test") {
        return successMassage;

    } else if (data.job === "imageUploade") {
        return saveImage(data);

    } else if (data.job === "mysqlCreate") {
        return createTwoTables();

    } else if (data.job === "mysqlDelete") {
        return deleteTables();

    } else if (data.job === "mysqlInsert") {
        return insertData(data.albumName, data.imageArray);

    } else if (data.job === "mysqlUpdate") {
        return updateData(data.albumName, data.imageArray);

    } else if (data.job === "mysqlQuery") {
        return displayQuery(data.albumName);

    } else if (data.job === "mysqlLogin") {
        result = await searchForElement(data);
        return result;
    } else {
        console.log("somthing bad happend");
        return errorMassage;
    }
}

function saveImage(data) {
    fs.writeFile('./public/images/' + data.imageName + '.jpg', data.imageData, 'base64', (err) => {
        if (err) {
            data.body = errorMassage;
        } else {
            data.body = successMassage;
        }
        sendResponse(data, response);
    });
}

//Create tables in database (debug only)
function createTwoTables() {
    con.query("CREATE TABLE Images (AlbumName varchar(20), Array varchar(255))", (err, result) => {
        if (err) {
            console.log(err);
            return errorMassage;
        }
    })
    con.query("CREATE TABLE Login (Username varchar(20), Password varchar(20))", (err, result) => {
        if (err) {
            console.log(err);
            return errorMassage;
        }
    })
    con.query("INSERT into Login values ('Admin','Admin')", (err, result) => {
        if (err) {
            console.log(err);
            return errorMassage;
        } else {
            return successMassage
        }
    });
}

//Delete tables in database (debug only)
function deleteTables() {
    con.query("DROP TABLE Images", (err, result) => {
        if (err) {
            console.log(err);
            return errorMassage;
        }
    })

    con.query("DROP TABLE Login", (err, result) => {
        if (err) {
            console.log(err);
            return errorMassage;
        } else {
            return successMassage;
        }
    })
}


//Insert data into the table
function insertData(data1, data2) {
    con.query("INSERT into Images values (?,?)", [data1, JSON.stringify(data2)], (err, result) => {
        if (err) {
            console.log(err);
            return errorMassage;
        } else {
            return successMassage;
        }
    })
}

//Update data in the table
function updateData(data1, data2) {
    con.query("UPDATE Images SET Array = ? where AlbumName = ?", [JSON.stringify(data2), data1], (err, result) => {
        if (err) {
            console.log(err);
            return errorMassage;
        } else {
            return successMassage;
        }
    })
}

//Print data from table
function displayQuery(albumName) {
    con.query("select Array from Images where AlbumName = ?", [albumName], (err, result) => {
        if (err) {
            console.log(err);
            return errorMassage;
        } else {
            return successMassage;
        }
    })
}


//Til alle de mængder af data hvor id = ?
async function searchForElement(data) {
    con.query("select Password from Login where Username = ?", [data.userName], (err, result) => {
        if (err) {
            console.log(err);
            return errorMassage;
        } else if (result[0].Password === data.password) {
            return successMassage;
        } else {
            return errorMassage;
        }
    })
}


function sendResponse(data, response) {
    response.on('error', (err) => {
        console.error(err);
        response.writeHead(404);
        response.write('File not found!');
        response.end();
    });

    response.end(JSON.stringify(data))
}