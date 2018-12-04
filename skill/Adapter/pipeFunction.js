// 返回的是叠加之后的是reduce叠加之后的function
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const time5 = (x) => x * 5;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
/*
转换成普通形式就是这样
* */
function large(multiply, add5, moreFun) {
  function test(...args) {
    return add5(multiply(...args));
  }
  return function(...args) {
    return moreFun(test(...args));
  }
}
// const multiplyAndAdd5 = large(multiply, add5);

const myPipeFunctions = (...fns) => fns.reduce((l, i) => (...args) => i(l(...args)));
const myMultiply = myPipeFunctions(multiply, add5, time5);

console.log('function result: ', myMultiply(5, 2)); // 15
