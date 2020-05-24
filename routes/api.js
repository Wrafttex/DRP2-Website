const fs = require('fs');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const databaseSettings = require('../database_settings');

//Defining the mysql connection settings
const con = mysql.createPool({
    user: databaseSettings.username,
    password: databaseSettings.password,
    database: databaseSettings.databaseName,
    connectionLimit: 10
});

const errorMessage = { status: "error" };
const successMessage = { status: "success" };
const secretKey = "aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ==";

//Extracts the headers, method, url and body from the request
module.exports = {
    handleApiRequest: function(request, response) {
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

//Routes data to specified job and checks for cookie if needed
function jobHandler(body, data, response) {
    if (body.job === "getData") {
        getData(body, data, response);
    } else if (body.job === "login") {
        login(body, data, response);
    } else if (typeof data.headers.cookie != "undefined") {
        jwt.verify(getCookie(data.headers.cookie, "token"), secretKey, (err, decoded) => {
            if (err) {
                data.body = errorMessage;
                sendResponse(data, response);
            } else if (body.job === "imageUpload") {
                saveImage(body, data, response);
            } else if (body.job === "insertData") {
                insertData(body, data, response);
            } else if (body.job === "updateData") {
                updateData(body, data, response);
            } else {
                data.body = errorMessage;
                sendResponse(data, response);
            }
        });
    } else {
        data.body = errorMessage;
        sendResponse(data, response);
    }
}

//Determines the value of a cookie given the cookie string and name
function getCookie(cookieStr, cookieName) {
    try {
        return cookieStr.split(cookieName + '=')[1].split(';')[0];
    } catch (error) {
        return "";
    }
}

//Saves image data as a file in /images
function saveImage(body, data, response) {
    fs.writeFile('./public/images/' + body.imageName + '.jpg', body.imageData, 'base64', (err) => {
        if (err) {
            data.body = errorMessage;
        } else {
            data.body = successMessage;
        }
        sendResponse(data, response);
    });
}

//Inserts given data into the images table
function insertData(body, data, response) {
    con.query("INSERT into Images values (?,?)", [body.albumName, JSON.stringify(body.imageArray)], (err, result) => {
        if (err) {
            data.body = errorMessage;
        } else {
            data.body = successMessage;
        }
        sendResponse(data, response);
    })
}

//Updates given data in the images table
function updateData(body, data, response) {
    con.query("UPDATE Images SET Array = ? where AlbumName = ?", [JSON.stringify(body.imageArray), body.albumName], (err, result) => {
        if (err) {
            data.body = errorMessage;
        } else {
            data.body = successMessage;
        }
        sendResponse(data, response);
    })
}

//Get data from the images table
function getData(body, data, response) {
    con.query("select Array from Images where AlbumName = ?", [body.albumName], (err, result) => {
        if (typeof result[0] != "undefined" && typeof result[0].Array != "undefined") {
            data.body = {
                status: "success",
                data: result[0].Array
            };
        } else {
            data.body = errorMessage;
        }
        sendResponse(data, response);
    })
}


//Checks given login data with the database and returns jsonwebtoken if true
function login(body, data, response) {
    con.query("select Password from Login where Username = ?", [body.username], (err, result) => {
        if (typeof result[0] != "undefined" && typeof result[0].Password != "undefined") {
            bcrypt.compare(body.password, result[0].Password, (err, result) => {
                if (result) {
                    data.body = successMessage;
                    response.setHeader('Set-Cookie', 'token=' + jwt.sign({ username: body.username }, secretKey, { expiresIn: "4h" }, { algorithm: 'RS256' }) + '; HttpOnly');
                } else {
                    data.body = errorMessage;
                }
                sendResponse(data, response);
            })
        } else {
            data.body = errorMessage;
            sendResponse(data, response);
        }
    })
}

//Sends a response to the client
function sendResponse(data, response) {
    response.on('error', (err) => {
        console.error(err);
        response.writeHead(404);
        response.write('File not found!');
        response.end();
    });
    response.end(JSON.stringify(data))
}