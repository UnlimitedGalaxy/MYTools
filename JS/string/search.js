/*
* @param reg{string | RegExp} string will be change into RegExp Object
* @return res{number} -1 | index of the first match character
* */

var paragraph = 'The quick brown fox jumped over the lazy dog. If the dog barked, was it really lazy?';

// any character that is not a word character or whitespace
var regex = /[^\w\s]/g;

console.log(paragraph.search(regex)); // 44
console.log(paragraph.search('a')); // 37