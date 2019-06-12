const serve = require('./serve/index');
const openBrowser = require('@includable/open-browser');

console.log('Starting serve...');
serve.createServer();
openBrowser('http://localhost:3000');