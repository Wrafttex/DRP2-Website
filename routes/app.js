const url = require('url');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const api = require('./api');
const secretKey = "aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ==";

module.exports = {
    handleRequest: function(request, response) {
        let path = url.parse(request.url).pathname;
        if (path.includes('/stylesheets')) {
            response.writeHead(200, {
                'Content-Type': 'text/css'
            });
            renderHTML('./public' + path, response);

        } else if (path.includes('/javascripts')) {
            response.writeHead(200, {
                'Content-Type': 'text/javascript'
            });
            renderHTML('./public' + path, response);

        } else if (path.includes('/images')) {
            response.writeHead(200, {
                'Content-Type': 'image/jpg'
            });
            renderHTML('./public' + path, response);

        } else if (path.includes('/api')) {
            api.handleApiRequest(request, response);

        } else if (path === '/') {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            renderHTML('./views/Index.html', response);

        } else if (path === '/Editserver') {
            jwt.verify(getCookie(request.headers.cookie, "token"), secretKey, (err, decoded) => {
                if (err) {
                    response.writeHead(404);
                    response.write('404: Site not found!');
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    renderHTML('./views' + path + '.html', response);
                }
            });

        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            renderHTML('./views' + path + '.html', response);
        }
    }
};

function renderHTML(path, response) {
    fs.readFile(path, null, function(err, data) {
        if (err) {
            response.writeHead(404);
            response.write('404: Site not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

function getCookie(cookieStr, cookieName) {
    try {
        return cookieStr.split(cookieName + '=')[1].split(';')[0];
    } catch (error) {
        return "";
    }
}

function makeData() {
    //TODO.
    //TODO.
    //TODO TODO TODO TODO TODOOOOOOO
    //DO DO DO DO DOOO
    //	.--.            .--.
    //	( (`\\."--``--".//`) )
    //	 '-.   __   __    .-'
    //	  /   /__\ /__\   \
    //	 |    \ 0/ \ 0/    |
    //	 \     `/   \`     /
    //	  `-.  /-"""-\  .-`
    //		/  '.___.'  \
    //		\     I     /
    //		 `;--'`'--;`
    //         '.___.'
}