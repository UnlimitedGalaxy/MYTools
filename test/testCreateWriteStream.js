let fs = require('fs');
console.log('dirname', __dirname);
let logger = fs.createWriteStream(__dirname + '/test.txt', {flags: 'a', encoding: 'utf-8'});
console.log('logger', logger);
logger.write('first');
setTimeout(() => {
	logger.write('hello world', () => {
		console.log('write successfully');
	});
}, 5000);