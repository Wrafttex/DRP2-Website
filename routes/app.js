var url = require('url');
var fs = require('fs');

function renderHTML(path, response) {
	fs.readFile(path, null, function (error, data) {
		if (error) {
			response.writeHead(404);
			response.write('File not found!');
		} else {
			response.write(data);
		}
		response.end();
	});
}

module.exports = {
	handleRequest: function (request, response) {
		var path = url.parse(request.url).pathname;
		if (path.includes('/stylesheets')) {
			response.writeHead(200, { 'Content-Type': 'text/css' });
			renderHTML('./public' + path, response);

		} else if (path.includes('/javascripts')) {
			response.writeHead(200, { 'Content-Type': 'text/javascript' });
			renderHTML('./public' + path, response);

		} else if (path.includes('/images')) {
			response.writeHead(200, { 'Content-Type': 'image/jpg' });
			renderHTML('./public' + path, response);

		} else if (path === '/') {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			renderHTML('./views/Index.html', response);

		} else {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			renderHTML('./views' + path + '.html', response);
		}
	}
};

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