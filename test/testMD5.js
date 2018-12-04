const crypto = require('crypto');
const test1 = crypto.createHash('md5').update('test').digest('hex');
const test2 = crypto.createHash('md5').update('test').digest('hex');

console.log('after md5 test1', test1);
console.log('after md5 test1', test1.length);
console.log('after md5 test2', test2);
console.log('after md5 test2', test2.length);
console.log('after md5 compare', test2 === test1);
