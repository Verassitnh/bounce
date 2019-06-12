const chalk = require('chalk');
const fs = require('fs');
const ora = require('ora');

errors = [ ];
warnings = [ ];
const spinner = ora('Building you app...').start();

function buildApp() {
	
	let startup = JSON.parse(readFile('./src/bounce-startup.json'));
	let bootstrap = readFile(startup.bootstrap);
	let bounceClass = readFile('./bounce/class.js');
	let styles = readFile('./bounce/styles.css');
	let html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="X-UA-Compatible" content="ie=edge">
			<meta name="description" content="${startup.description}">
			<title>${startup.title}</title>
			<style>
				${styles}
			</style>
		</head>
		<body>
			<canvas id="bounce-canvas"></canvas>
			<script>
				${bounceClass}
			</script>
			<script>
				${bootstrap}
			</script>
		</body>
		</html>
	`;
	writeFile('./dist/index.html', html);


	log(warnings, errors);
}

function readFile(path) {
	try {return fs.readFileSync(path, 'utf-8')}
	catch (error) {
		if (error.code == "ENOENT") errors.push(`Expected '${path}' to be a file.`);
		else errors.push(error.message);
	}
}
function writeFile(path, data) {
	try {fs.writeFileSync(path, data)}
	catch (error) {
		errors.push(error.message);
	}
}

function log(warnings, errors) {
	if (errors.length) {
		spinner.fail(chalk.bold.red("Build failed"))
		for (x in errors) console.error(errors[x]);
	}
	else if (warnings.length) {
		spinner.warn(chalk.bold.yellow(`Build exited with ${warnings.length} warning(s)`));
		for (x in warnings) console.warn(errors[x]);
	}
	else spinner.succeed(chalk.green.bold('Build was successfull'))
}

module.exports.buildApp = buildApp;