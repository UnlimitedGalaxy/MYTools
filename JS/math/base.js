const assert = require('assert');
/*
* parseInt(num, radix)
* define: 以radix来转换num为十进制的数
* 1. 不为string，自动调用toString()，转换成string
* 2. string存空格也可以转
* */

assert.strictEqual(parseInt(`
1`), 1);
assert.strictEqual(parseInt(`    1`), 1);

