const build = require('./build/index');
const serve = require('./serve/index');
const openBrowser = require('@includable/open-browser');
const chalk = require('chalk');
const fs = require('fs');

async function runDevServer() {
	console.log('Starting dev...');

	await build();
	serve.createServer();
	openBrowser('http://localhost:3000');

	fs.watch('./src', 'utf-8', (eventType, fileName) => {
		console.log(chalk.inverse("App updated.  Recompiling..."))
		serve.stopServer();
		runDevServer();
	})
}
runDevServer();