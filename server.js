const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3333;

const mimeTypes = {
  js: 'application/javascript',
  png: 'image/png',
  css: 'text/css',
};

const server = http.createServer((req, res) => {
  const file = __dirname + (req.url === '/' ? '/index.html' : req.url);

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }

    const fileType = req.url.replace(/.*\./, '');
    const mime = mimeTypes[fileType];
    if (mime) {
      res.setHeader('Content-type', mime);
    }

    res.writeHead(200);
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
