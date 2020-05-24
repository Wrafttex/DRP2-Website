const http = require('http');
let app = require('./routes/app');
const hostname = 'localhost';
const port = 3000;

http.createServer(app.handleRequest).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});