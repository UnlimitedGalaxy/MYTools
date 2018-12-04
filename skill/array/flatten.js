const deepFlatten = (arr) => [].concat(...arr.map(i => Array.isArray(i) ? deepFlatten(i) : i));

/*
* concat feature
* 1. Arrays and/or values
* 2. 可以无限添加
* 3. 它是放在数组的原型链上的
* */
const myConcat = function() {
  let newArr = [];
  for (let i = 0; this[i]; i++){
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

const test = [];
console.log('result: ', myConcat.call(test, '1', [1, 3]));
