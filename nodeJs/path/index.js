let path = require('path');
/*
* join
* @param {String} path
* @return {String} dirpath
* 1. then use the platform-specific separator as a delimiler to combine them, so don't need the '/'
* 2. 符号如'/', '\' 会被用'\'替代掉 the key symbol like '/', '\' will be replaced by '/'
* 3. 层级symbol will be executed to compose a new path
* */
console.log(path.join('a', '/b', 'c')); //'/' is replaced
console.log(path.join('a', '/b', './c')); // './' is replaced
console.log(path.join('a', '/b', '../c')); // '层级symbol' is replaced
console.log(path.join('a', '/b', '**/c')); // './' is replaced