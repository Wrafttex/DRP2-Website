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
    handleApiRequest: function (request, response) {
        const { headers, method, url } = request;
        let body = [];
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let data = { headers, method, url, body };
            jobHandler(JSON.parse(body), data, response)
        });
    }
};

async function jobHandler(body, data, response) {
    if (body.job === "test") {
        data.body = successMassage;
        sendResponse(data, response);

    } else if (body.job === "imageUploade") {
        saveImage(body, data, response);

    } else if (body.job === "mysqlCreate") {
        createTwoTables(body, data, response);

    } else if (body.job === "mysqlDelete") {
        deleteTables(body, data, response);

    } else if (body.job === "mysqlInsert") {
        insertData(body, data, response);

    } else if (body.job === "mysqlUpdate") {
        updateData(body, data, response);

    } else if (body.job === "mysqlQuery") {
        displayQuery(body, data, response);

    } else if (body.job === "mysqlLogin") {
        searchForElement(body, data, response);
    } else {
        console.log("somthing bad happend");
        data.body = errorMassage;
        sendResponse(data, response);
    }
}

function saveImage(body, data, response) {
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
function createTwoTables(body, data, response) {
    con.query("CREATE TABLE Images (AlbumName varchar(20), Array varchar(255))", (err, result) => {
        if (err) {
            data.body = errorMassage;
        } else {
            con.query("CREATE TABLE Login (Username varchar(20), Password varchar(20))", (err, result) => {
                if (err) {
                    data.body = errorMassage;
                } else {
                    con.query("INSERT into Login values ('Admin','Admin')", (err, result) => {
                        if (err) {
                            data.body = errorMassage;
                        } else {
                            data.body = successMassage;
                        }
                        sendResponse(data, response);
                    });
                }
            })
        }
    })
}

//Delete tables in database (debug only)
function deleteTables(body, data, response) {
    con.query("DROP TABLE Images", (err, result) => {
        if (err) {
            data.body = errorMassage;
        } else {
            con.query("DROP TABLE Login", (err, result) => {
                if (err) {
                    data.body = errorMassage;
                } else {
                    data.body = successMassage;
                }
                sendResponse(data, response);
            })
        }
    })


}


//Insert data into the table
function insertData(body, data, response) {
    con.query("INSERT into Images values (?,?)", [body.albumName, JSON.stringify(body.imageArray)], (err, result) => {
        if (err) {
            data.body = errorMassage;
        } else {
            data.body = successMassage;
        }
        sendResponse(data, response);
    })
}

//Update data in the table
function updateData(body, data, response) {
    con.query("UPDATE Images SET Array = ? where AlbumName = ?", [JSON.stringify(body.imageArray), body.albumName], (err, result) => {
        if (err) {
            data.body = errorMassage;
        } else {
            data.body = successMassage;
        }
        sendResponse(data, response);
    })
}

//Print data from table
function displayQuery(body, data, response) {
    con.query("select Array from Images where AlbumName = ?", [body.albumName], (err, result) => {
        if (err) {
            data.body = errorMassage;
        } else {
            data.body = {
                status: "success",
                data: result[0].Array
            };
        }
        sendResponse(data, response);
    })
}


//Til alle de mængder af data hvor id = ?
function searchForElement(body, data, response) {
    con.query("select Password from Login where Username = ?", [body.userName], (err, result) => {
        if (err) {
            console.log(err);
            data.body = errorMassage;
        } else if (result[0].Password === body.password) {
            data.body = successMassage;
        } else {
            data.body = errorMassage;
        }
        sendResponse(data, response);
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