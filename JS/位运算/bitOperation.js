const assert = require('assert');
/*
* resource:
* 1. good application: https://blog.csdn.net/qq_39207948/article/details/80507613
* 2. w3c http://www.w3school.com.cn/js/pro_js_operators_bitwise.asp
* */
/*
* & 与运算
* 1. 只要有0就为0
* */
let a1 = 0b10;
let a2 = 0b11
// console.log('& result: ', (a2 & a1).toString(2));
// application
// console.log('a1 & 1', a1 & 1); // 1 为奇数，0为偶数
const andScope = {
  test1: 27384739,
  test2: 6,
};
assert.strictEqual(andScope.test1 & 1, 1, `期望${andScope.test1}是奇数`);
assert.strictEqual(andScope.test2 & 1, 0, `期望${andScope.test2}是偶数`);
/*
* application
* 1. 去掉最高位
* -> 有一个数字它的前几位被当作A用途，而后几位被用当B用途，为了去掉前几位对B用途的影响，就可以这样与一下
* 2. 使用按位与&进行标志位判断
* -> 权限的值与用户所拥有的权限值&一下，如果是0即为没有权限，如果不为0即为有权限
* 3. 任何与0，都得到0，可以用于去掉无效位的数据
* */
// assert.strictEqual(andScope.test1 | 1, 0, `期望${andScope.test1}是偶数`); //或不能用来做奇数偶数判断
/*
* | 或运算
* 1. 只要有1就为1
* */
let b1 = 0b10;
let b2 = 0b11;
// console.log('| result: ', (b1 | b2).toString(2));
const orScope = {
  test1: 27384739,
  test2: 6,
};
/*
* application：
* 1. 需要做边界判断，总共有3种超出情况：右、上、左，并且可能会叠加，如鼠标在左上角的时候会导致左边和上面同时超出。需要记录超出的情况进行调整，用001表示右边超出，010表示上方超出，100表示左边超出，如下代码计算：
* */

/*
let postFlag = 0;
//右边超出
if(pos.right < maxLen) posFlag |= 1;
//上面超出
if(pos.top < maxLen) posFlag |= 2;
//左边超出
if(pos.left < maxLeftLen) posFlag |= 4;
//对超出的情况进行处理，代码略
switch(posFlag) {
  case 1: //右
  case 2: //上
  case 3: //右上
  case 4: //左
  case 6: //左上
}
* */

/*
* ^ 按位异或
* 1. ^运算符跟|类似，但有一点不同的是 如果两个操作位都为1的话，结果产生0
*    异或的运算过程可以当作把两个数加起来，然后进位去掉，0 + 0 = 0，1 + 0 = 1，1 + 1 = 0。
* 2. 异为1，同为0
* 3. 任何数异或0后，都是它本身
* 4. 任何数异或任何数，都等于0
* */
let c1 = 0b100;
let c2 = 0b110;
// console.log('^ result: ', c1 ^ 0 );
assert.strictEqual(c1 ^ 0, c1); // 任何数异或0后，都是它本身

/*
* 应用数值互换
* 利用三四规律
* */
c1 = c1 ^ c2;
c2 = c1 ^ c2;
c1 = c1 ^ c2
assert.strictEqual(c2, 4);
assert.strictEqual(c1, 6);


/*
* ~ 非运算
* 1. 对所在位取反
* 2. 注意最高位为标志位，正取反会变negative
* 3. 理论上是符号相反，再减一，但为什么呢？
*
~的本质运算为（假设是8位）：1=》00000001那么~1=>11111110=-2.(-2的表示为100000010=》11111101+1=11111110)，我们知道x和~x相加等于-1.因为相加后等于11111111（10000001=》11111110+1=11111111），也就是-1。
原文：https://blog.csdn.net/theanarkh/article/details/52768337

11111110=-2 这句的理解：11111110是2的补数即(-2)
* */
let d1 = 0b100;
let d2 = 0 // -1 为0，其他情况都是true
// console.log('~ result: ', (~ d1).toString(2)); // -101 为什么会是这个结果呢？
// console.log('~ result: ', (~ d2).toString()); // -101 为什么会是这个结果呢？
const nonScope = {
  test1: 2.23123,
  test2: 6.123,
};
assert.strictEqual(~~nonScope.test1, 2, `断言${andScope.test1}取整为2`);

/*、
compare efficiency between '~' and '>'
conclusion
1. '~' is more efficient than '>'
-> 上述结论错误，应该是 compare symbols are more efficient than '~' 才对
* */

// 下面是比较的过程
/*

var str = "hutaoer go go go!!!!! My lucky number is 33!!";
var query = 33;
var timeStart1 = new Date() - 0;
for(var i = 0; i < 100000000; i++) {
  ~str.indexOf(query)
}
var timeEnd1 = new Date() - 0;
console.log('~ cost time:' + (timeEnd1 - timeStart1));
// ~ cost time:9954  循环次数：10000000
// ~ cost time:104  循环次数： 100000
var timeStart2 = new Date() - 0;
for(var j = 0; j < 100000000; j++) {
  str.indexOf(query) >= 0
}
var timeEnd2 = new Date() - 0;
console.log('>= cost time:' + (timeEnd2 - timeStart2));

// ~ cost time:6114  >= cost time:5276
 */

/*
var str = "hutaoer go go go!!!!! My lucky number is 33!!";
var query = 33;
var timeStart1 = new Date() - 0;
for(var i = 0; i < 1000000; i++) {
  ~str.indexOf(query)
}
var timeEnd1 = new Date() - 0;
console.log('~ cost time:' + (timeEnd1 - timeStart1));
//  循环1000000次  127ms
var timeStart2 = new Date() - 0;
for(var j = 0; j < 1000000; j++) {
  str.indexOf(query) >= 0
}
var timeEnd2 = new Date() - 0;
console.log('>= cost time:' + (timeEnd2 - timeStart2));
// 循环1000000次 101ms
var timeStart3 = new Date() - 0;
for(var k = 0; k < 1000000; k++) {
  Boolean(~str.indexOf(query))
}
var timeEnd3 = new Date() - 0;
console.log('add Boolean cost time:' + (timeEnd3 - timeStart3));
// 循环1000000次 129ms
var timeStart4 = new Date() - 0;
for(var k = 0; k < 1000000; k++) {
  !!(~str.indexOf(query))
}
var timeEnd4 = new Date() - 0;
console.log('add !! cost time:' + (timeEnd4 - timeStart4));
// 循环10000000次 103ms
* */

/*
 右移运算符 >>
 Resource: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#%3E%3E_(Sign-propagating_right_shift)
 Rule:
 1. 最低位被移出的部分，舍弃掉
 2. 最高位，对于正数补0，对于负数补1
* */
var temp = -9
console.log('-9 to binary: ', (temp.toString(2)));
console.log((temp >> 2).toString(2));

/*
左移运算符 <<
 Rule:
 1. 最高位被移出的部分，舍弃掉
 2. 最低位，对于正数补0，对于负数补1 （错❎）
 3. 高位移出，地位补0
 conclusion:
 1. 就是2n次方
* */
// console.log('temp <<: ', temp << 2);

/*
* 无符号右移运算 >>>
* 整体移动不考虑符号位
* */

/*
* 应用
* */
/*
* 加法用位运算来实现
* 原理：
* 1. ^ 可得不进为的数值
* 2. & 可得进位数值
* */
function plus(a, b) {
  let temp1 = a ^ b;
  let temp2 = a & b;
  
  temp1 = temp1 ^ temp2;
  temp2 = temp1 & temp2;
  if (temp2 !== 0) {
    plus(temp1, temp2);
  } else {
    return temp1;
  }
}
// assert.strictEqual(plus(3, 7), 10);
/*
* 数值比较
* */
assert.strictEqual(Boolean(3 ^ 7), true);
assert.strictEqual(Boolean(3 ^ 3), false);
/*
*
* */
