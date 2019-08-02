const iterableObj = {
  index: 0,
  next() { // this indicate the object that is returned by [Symbol.iterator]
    return {
      value: iterableObj.index,
      done: ++ iterableObj.index > 2
    };
  },
  [Symbol.iterator]: function () {
    debugger;
    return {
      next: this.next
    };
  }
};

for (let val of iterableObj) {
  console.log('val', val);
}

/*
* String
* */
var someString = 'hi';
var iterator = someString[Symbol.iterator]();
iterator + '';                               // "[object String Iterator]"

console.log(iterator.next()); // { value: "h", done: false }
console.log(iterator.next()); // { value: "i", done: false }
console.log(iterator.next()); // { value: undefined, done: true }

for (let val of someString) {
  console.log('val', val);
}

/*
* 使用迭代器构造
* */
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
console.log([...myIterable]); // [1, 2, 3]

/*
* 取值
* */
let [a, b, c, d, e] = myIterable;
console.log('a: %j, b: %j, c: %j', a, b, c, d, e);