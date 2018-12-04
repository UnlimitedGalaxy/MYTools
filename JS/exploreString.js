/*
*
*
* */

const test = `I Love (hsfjfs)\n\rJoker🃏`;

/*
attention:
1. m param will result in appear 多个行首行尾的情况
* */
// console.log('result', test.match(/^./gm));

/*
  execute sum
* I guess
* val1 是bracket match到的content g的时候是一个数组，otherwise it's val
* val2 可能是另外一个bracket得到的结果
* THe fact
* 1. 标志位g 只是会导致后面的函数是执行多次还是一次的问题而已
* 2. 参数第一位为整个正则匹配的结果
* 3. 参数第二位为bracket得到的结果
* 4. 参数第三位为第二个bracket得到的结果
* 5. 如此类推
* 6. 知道倒数第二位为匹配起始位
* 7. 知道倒数第一位为匹配的字符串
* */
// let result = test.replace(/(o)/g, function(val1, val2, val3, val4) {
//   console.log('arguments', arguments);
// });

/*
* implement
* */
function tranWildcard(wildcard) {
  if (typeof wildcard !== 'string') {
    return '';
  }
  let regExp = /\s|\(|\)/g;
  let result = wildcard;
  if (regExp.test(wildcard)) {
    result = wildcard.replace(regExp, function(match) {
      if (/\(|\)/.test(match)) {
        return `\\${match}`;
      } else {
        return '*';
      }
    });
  }
  return result;
}

console.log(tranWildcard(test));
