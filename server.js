const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3333;

const server = http.createServer((req, res) => {
  const file = __dirname + (req.url === '/' ? '/index.html' : req.url);
  fs.readFile(file, (err,data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
