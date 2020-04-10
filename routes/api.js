const mysql = require('mysql');

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
            body = jobHandler(JSON.parse(body));
            sendResponse({ headers, method, url, body }, response);
        });
    }
};

function jobHandler(data){
    if (data.job === "test"){
        return ({
            status: "successful test"
        });
    } else if (data.job === "mysql_uypdate"){
        updateMtsqlDb(databse, data, index);
    } else {
        console.log("somthing bad happend");
        return ({
            status: "error"
        });
    }
    
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