const assert = require('assert');
const testArr = ['a', 'b', 'c', 'd'];

/*
* define
* 1. convey a serial of words between begin value and end value
* 2. create new Array
* 3. 原来的数组是不会变的
* */

/*
* problem:
* . if the sliced words includes the end or not
*   - expectation
*     not includes
*   - fact
*     you're right
* */
// console.log(testArr.slice(0, 3));

/*
situation 1
. 0 ~ arr.length 范围内
**/
assert.deepEqual(testArr.slice(1), ['b', 'c', 'd']);
// console.log('testArr', testArr); // 证明不会改变原来的数组

// assert.deepEqual(testArr.slice(1, 2), ['b', 'c']); // 错误包含开始点，但不包含结束点
assert.deepEqual(testArr.slice(1, 2), ['b']); // 这样才对
assert.deepEqual(testArr.slice(1, 4), ['b', 'c', 'd']);
// assert.deepEqual(testArr.slice(1, 0), ['a']); // end小于begin时，返回的是空数组
// assert.deepEqual(testArr.slice(0, 0), ['a']); // begin等于end时，返回的是空数组

/*
situation 2
. 0 ~ negative value
. negative value 指代的是从最后一个元素开始倒数
. 有点像循环数组
* */

// assert.deepEqual(testArr.slice(0, -1), ['a']); // 错误，在这里-1指代的是最后一个元素
// assert.deepEqual(testArr.slice(2, -1), ['a']);
