const deepFlatten = (arr) => [].concat(...arr.map(i => Array.isArray(i) ? deepFlatten(i) : i));

/*
* concat feature
* 1. Arrays and/or values
* 2. 可以无限添加
* 3. 它是放在数组的原型链上的
* */
const myConcat = function() {
  let newArr = [];
  for (let i = 0; this[i]; i++){ // 自己本身就是数组，需要把自身的数据push进去
    newArr.push(i);
  }
  for (let i = 0; arguments[i]; i++){
    if (Array.isArray(arguments[i])) {
      for (let ii = 0; arguments[i][ii]; ii++){
        newArr.push(arguments[i][ii])
      }
    } else {
      newArr.push(arguments[i]);
    }
  }
  return newArr;
}

// const test = [];
// console.log('result: ', myConcat.call(test, '1', [1, 3]));

function flatten(arr) {
  while(arr.some(item=>Array.isArray(item))) {
    arr = [].concat(...arr); // concat 本身就具有解构一层的能力
  }
  return arr;
}

let givenArr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

// flatten(givenArr);
let test = [[1, 2, 3]]
console.log(...test);
