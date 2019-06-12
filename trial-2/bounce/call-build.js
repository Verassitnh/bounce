const { buildApp } = require('./build/index');
const fs = require('fs');

buildApp();
fs.watch('./bounce', recompile());
fs.watch('./src', recompile());

function recompile() {
	console.log("\n\nApp updated.  Recompiling...")
	buildApp();
}