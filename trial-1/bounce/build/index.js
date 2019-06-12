const fs = require('fs');
const minify = require('minify');
const tryToCatch = require('try-to-catch');
const chalk = require('chalk');

module.exports = async () => {
	console.log(chalk.blue.bold("Reading Files..."));

	await transferFile('index.html');

	console.log(chalk.green.bold("• App built"));
}

async function transferFile(path) {
	const [error, data] = await tryToCatch(minify, `./src/${path}`);
	
	if (error) {
		console.log(chalk.red(error.message));
		if (error.code == 'ENOENT') console.log(chalk.red(`Expected a './src/${path}' file.`));
		console.log(chalk.red("Build aborted."));
		return false;
	}

	try {fs.writeFileSync(`./dist/${path}`, data)}
	catch (error) {
		console.log(chalk.red.bold('x Build failed (see below)'));
		if (error.code == 'ENOENT') console.log(chalk.red(`Expected a './dist' directory in this project.`));
		else console.log(chalk.red(error.message));
		return false;
	}

	return true;
}