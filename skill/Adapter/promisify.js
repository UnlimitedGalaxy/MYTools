/*
* analyze
* 1. 需要异步函数，以函数以参数在前，回调在后
* */

const promisify = (func) => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => err ? reject(err) : resolve(result)));

let delay = promisify((delay, cb) => setTimeout(cb, delay));
console.log('start');
delay(500).then(() => console.log('hello'));

function test(...args) {
  // return function(...args, 500) { 声明的时候，不能绑定一个值在里面，但是调用的时候可以
  //   console.log('arguments', arguments);
  // }
}
test('a', 'b');
