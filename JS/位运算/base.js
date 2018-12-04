let assert = require('assert');
/*
* 二进制
* */
let test = 0b11;
// console.log('test binary result: ', test);

/*
* 八进制 octonary
* */
let testO = 0o11;
// console.log('test octonary result: ', testO);

/*
 十进制 Decimal
* */
let testD = 18;

/*
* 二进制转十进制 decimal
* */
let changeDeciaml = Number(testO);
// console.log('binary -> Deciaml: ', Number.parseInt('11', 2)); //这个方法是以什么进制解析成十进制
// console.log('binary -> Deciaml: ', test.toString())
/*
* 十进制转二进制
* */
// console.log('Decimal -> binary: ', testD.toString(2));
// console.log('float Decimal -> binary: ', 3.3.toString(2));

/*
examinate value
1. Number.isFinite
2. Number.isNaN
3. Number.isInteger
* */
assert.equal(Number.isNaN(NaN), true);
// console.log(Number.isInteger(3.0000000000000002)) // true 因为精确度是53位

// min value
// console.log('min value：', Number.MIN_VALUE)
// console.log('less than min value: ', 5E-325); // 过于小被转成0了

/*
* 小数转转二进制
* */
// console.log('decimal: ', (0.1.toString(2) + '').length) // 长度57

/*
* 负数表示
* 1. 用符号位来表示负数
* 2. 用正数的补码来表示负数
* 3. 原码即符号位为-1，其余位依次取反加一
* */
let temp9 = 9;
console.log('9 to binary: ', temp9.toString(2));
console.log('-9 to binary: ', (-temp9).toString(2));
/*
* 结果是-1001，但是深层数据形式是正数的补数即11110110 + 1 => 11110111
* */

/*
* 科学计数法
* */
let scienceNum = 1.34E3;
// console.log('scienceNum： ', scienceNum);

/*
计算机里面的减法是用被减数求补相加得到的
求补：求反加1

求补运算的正确性是如何得到保障的：将运算符当成负号处理了。A-(B)变为A+(-B)，问题是如何用B表示-B，而补码编码刚好能正确地实现这种表达方式。求补运算的正确性是由补码码制的正确性来保障的。
* */
/*
3 - 2
-> 00000011 - 00000010
-> 00000011 + (-00000010) 3 + (-2)
-> 00000011 + 11111110
-> 1 00000001 去掉最高位为 00000001
* */

