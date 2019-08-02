// 产生一个最大数的index
const test = [10, 2, 8, 4, 5];
function findMaxIndex(arr) {
  return arr.reduce((maxIndex, item, index) => arr[maxIndex] > item ? maxIndex: index, 0);
}
console.log('maxIndex: ', findMaxIndex(test));
