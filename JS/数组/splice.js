/*
* Array.prototype.splice
* shape:
*  array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
*define:
* @return {Array} array [deleted array 有可能是空的]
* */

//test insert an element
let testArr = ['a', 'b', 'c'];
testArr.splice(1, 0, 'undefined');
console.log('result', testArr);
/*
* expect the one inserted is behind the new one
* result: [ 'a', 'undefined', 'b', 'c' ]
* conclusion:
*  the result is correct;
* */
