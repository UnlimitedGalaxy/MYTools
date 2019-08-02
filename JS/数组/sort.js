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

const test3 = [6, 10, 4, 3, 8, 4, 9, 22];

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

// console.log('result', test3.sort((a, b) => { return - (a - b) }));

function mySort(arr, compareFun) {

}
// 以第一位为分割点，分割数组
// 以第一个数为基数，左边是小于基数的数，右边是大于基数的数
function myDivideByBase(arr) {
  let temp = arr.slice();
  let result = temp.splice(0, 1);
  let compareVal = result[0];
  temp.forEach(val => {
    if (val > compareVal) {
      result.push(val);
    } else {
      result.unshift(val);
    }
  });
  return result;
}
function exchange(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
// 如何证明成立呢

function ofDivideByBase(arr) {
  let baseVal = arr[0];
  let i = 1;
  let j = arr.length - 1;
  function seek() {
    function seekFromRight() {
      if (j === i) {
        return j;
      }
      if (arr[j] > baseVal) {
        j --;
        return seekFromRight()
      } else {
        return j;
      }
    }
    function seekFromLeft() {
      if (j == i) {
        return i;
      }
      if (arr[i] < baseVal) {
        i ++;
        return seekFromLeft()
      } else {
        return i;
      }
    }
    let rightIndex = seekFromRight();
    let leftIndex = seekFromLeft();
    if (rightIndex === leftIndex) {
      exchange(arr, 0, leftIndex);
    } else {
      exchange(arr, rightIndex, leftIndex)
      seek()
    }
  }
  seek();
  return arr;
}

// quickSort
function quickSort(arr, i, j) {
  let baseVal = arr[i];
  function seek() {
    function seekFromRight() {
      if (j === i) {
        return j;
      }
      if (arr[j] > baseVal) {
        j --;
        return seekFromRight()
      } else {
        return j;
      }
    }
    function seekFromLeft() {
      if (j == i) {
        return i;
      }
      if (arr[i] < baseVal) {
        i ++;
        return seekFromLeft()
      } else {
        return i;
      }
    }
    let rightIndex = seekFromRight();
    let leftIndex = seekFromLeft();
    if (rightIndex === leftIndex) {
      exchange(arr, 0, leftIndex);
    } else {
      exchange(arr, rightIndex, leftIndex)
      seek()
    }
  }
  seek();
  return arr;
}

console.log('result: ', ofDivideByBase(test3));
