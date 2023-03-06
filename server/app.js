const http = require('http');
const fs = require('fs');

const ROOT_DIR = "../";
const ROOT_FILE = "index.html";
const FILES = {
	".js": "text/javascript",
	".html": "text/html",
	".css": "text/css",
	".png": "image/png"
};

const server = http.createServer((req, res) => {
	let fname = req.url.slice(1);
	if(req.url === '/') fname = ROOT_FILE;
	fname = ROOT_DIR + fname;
	fs.readFile(fname, (err, data) => {
		if(err) {
			res.end("404: Page not found");
			return;
		}
		try {
			res.writeHead(200, {"Content-Type": FILES[fname.slice(fname.lastIndexOf('.'))]});
		} catch {}
		res.write(data);
		res.end();
	})
});
server.listen(12345);