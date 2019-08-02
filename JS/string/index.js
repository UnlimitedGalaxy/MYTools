const assert = require('assert');
/*
* String.prototype.substr(start[, length])
*
* @return
*
* */
const test1 = 'abcdefg';
assert.deepEqual(test1.substr(0, 1), 'a')
// assert.deepEqual(test1.substr(0, test1.length - 1), test1)
// 错误：test1.length -1 得不到一个新的string 而是少了最后一个字符
