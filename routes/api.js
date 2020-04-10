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
        //body = jobHandler(JSON.parse(body));
    }
};

function jobHandler(data){
    if (data.job === "test"){
        return ({
            status: "successful test"
        });
    } else {
        console.log("somthing bad happend");
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