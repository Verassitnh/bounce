const http = require('http');
const fs = require('fs');
const chalk = require('chalk');

let server;

module.exports.createServer = () => {
	server = http.createServer((req, res) => {
		try {
			const file = fs.readFileSync(req.url == '/' ? './dist/index.html' : `./dist${req.url}`, 'utf-8');
			res.write(file);
			res.statusCode = 200;
			res.end();
		}
		catch (error) {
			if (error.code == 'ENOENT') {
				res.statusCode = 404;
				res.write("Could not find the requested file.");
				res.end();
			}
			else {
				res.write("Serve failed.  See terminal output for details.");
				res.statusCode = 200;
				res.end();
				console.log(chalk.red.bold("x Serve has an error"))
				console.log(error.message);
				return;
			}
		}
	});

	server.listen(3000);
	console.log(chalk.bold.blue("Listening on http://localhost:3000"));
}

module.exports.stopServer = () => {
	if (server) server.close();
}