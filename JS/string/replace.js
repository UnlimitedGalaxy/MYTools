const assert = require('assert');
/*
* question1: will the pattern ,str.replace(target, replacement), replace all the matched words ?
* - Guess: it will
* - fact: it doesn't
* - correct: use regex to match globally
* */
var str = 'a,jf,sfj,a';
// console.log(str.replace(new RegExp('/'+ 'a' + '/g'), 'b'))
assert.deepEqual(str.replace(/a/g, 'b'), 'b,jf,sfj,b');

/*
* 问题：
* 1.构造RegExp的时候，没有转义元字符
* Resource：
* .https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
* */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
//test
// var test1 = '破晓​计划 | 晓';
// var reg = '破晓​计划 |';
// console.log(escapeRegExp(reg));
// console.log(test1.match(new RegExp(escapeRegExp(reg), 'g')))
// // console.log(test1.replace(new RegExp('破晓​计划 |', 'g'), 'a'));

/*
* Specifying a string as a parameter
$$	Inserts a "$".
$&	Inserts the matched substring. // 这里指的是匹配的字符串，不用特指某一个，因为每次也只能是针对一个匹配结果进行替换
$` Inserts the portion of the string that precedes the matched substring. // 这里指的是前面的所有字符
$' Inserts the portion of the string that follows the matched substring.
$n Where n is a positive integer less than 100, inserts the nth parenthesized submatch string, provided the first argument was a RegExp object. Note that this is 1-indexed.
* */

var testStrParam = 'abcdefg';
console.log(testStrParam.replace(/d|e/g, '[$]'));

/*
* test
* */
