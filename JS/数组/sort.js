/**
 * sort [列表排序]
 * @param {Function} compareFunc [比较函数]
 * @return {Array} arr [no copy]
 *
 * compareFunc [used to compare 两个数值]
 * @param {any} a 在数组前面的值 []
 * @param {any} b 在数组后面的值 []
 * @return {number} result [
    1. result is less than 0, a come first
		2. result is equal to 0, position is the same
	  3. result is more than 0, b come first
 * ]
 *
 * feature:
 *  1. if no compareFunc, element be change into string. According to Unicode code, 正序排列
 *  2. if compareFunc, follow the rule
 *  3. all undefined element are put on the end of array
 */

function sort(compareFunc) {

}

const test1 = ['ac', 'ab', 'ae'];

const test2 = [{}, 'ab', ['a'], undefined];

const test3 = [6, 10, 4, 3, 8, undefined];

// test2.forEach(i => {
// 	// debugger;
// 	// let a = new String(i);
// 	// let sum = 0;
// 	// a = Array.prototype.slice.call(a);
// 	// sum = a.reduce((i, item) => {
// 	// 	return i + item.charCodeAt();
// 	// }, 0);
// 	// console.log(sum);
// });

test1.sort((a, b) => {
	// console.log('a b', a, b);
});

console.log('result', test3.sort((a, b) => { return - (a - b) }));
