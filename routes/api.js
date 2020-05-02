const fs = require('fs');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const con = mysql.createPool({
    user: "webalbum",
    password: "password",
    database: "webAlbum",
    connectionLimit: 10
});
const errorMassage = { status: "error" };
const successMassage = { status: "success" };
const secretKey = "aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ==";

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
//jwt.verify(token, secretKey)
function jobHandler(body, data, response) {
    if (body.job === "getData") {
        getData(body, data, response);
    } else if (body.job === "Login") {
        login(body, data, response);
    } else if (typeof data.headers.cookie != "undefined") {
        jwt.verify(getCookie(data.headers.cookie, "token"), secretKey, (err, decoded) => {
            if (err) {
                data.body = errorMassage;
                sendResponse(data, response);
            } else if (body.job === "imageUploade") {
                saveImage(body, data, response);
            } else if (body.job === "insertData") {
                insertData(body, data, response);
            } else if (body.job === "updateData") {
                updateData(body, data, response);
            } else {
                data.body = errorMassage;
                sendResponse(data, response);
            }
        });
    } else {
        data.body = errorMassage;
        sendResponse(data, response);
    }
}

function getCookie(cookieStr, cookieName) {
    try {
        return cookieStr.split(cookieName + '=')[1].split(';')[0];
    } catch (error) {
        return "";
    }
}

function saveImage(body, data, response) {
    fs.writeFile('./public/images/' + body.imageName + '.jpg', body.imageData, 'base64', (err) => {
        if (err) {
            data.body = errorMassage;
        } else {
            data.body = successMassage;
        }
        sendResponse(data, response);
    });
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
function getData(body, data, response) {
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
function login(body, data, response) {
    con.query("select Password from Login where Username = ?", [body.username], (err, result) => {
        if (typeof result[0] != "undefined" && typeof result[0].Password != "undefined") {
            bcrypt.compare(body.password, result[0].Password, (err, result) => {
                if (result) {
                    data.body = successMassage;
                    response.setHeader('Set-Cookie', 'token=' + jwt.sign({ username: body.username }, secretKey, { expiresIn: "4h" }, { algorithm: 'RS256' }) + '; HttpOnly');
                } else {
                    data.body = errorMassage;
                }
                sendResponse(data, response);
            })
        } else {
            data.body = errorMassage;
            sendResponse(data, response);
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