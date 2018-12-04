/*
* Arrary.prototype.reverse
* 逆转数组
* */

/*
* application
* */
// 1. 回文字符串 即从左往右跟从右往左都一样
function run(input) {
  if (typeof input !== 'string') return false;
  return input.split('').reverse().join('') === input;
}
