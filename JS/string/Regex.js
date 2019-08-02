/*
* Grammar:
* /pattern/flags
  new RegExp(pattern[, flags])
  RegExp(pattern[, flags])
  @param {string} pattern [the str without using '/']
* */

/*
* application
* */
/*
* .not include
* */
var test1 = 'I want you, I want you"';
console.log(test1.match(/you(?!")/g));
console.log(test1.match(/you/g));