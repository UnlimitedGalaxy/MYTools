'use strict';
const assert = require('assert')
/*
* add or delete property
* */
const testObj = {
  a: 'a', b: 'b', c: 'c'
};
delete testObj.a;
// console.log('testObj', testObj); // => { b: 'b', c: 'c' }


/*
* defineProperty
* */

/*
* Grammar
* Object.defineProperty(obj, property, descriptor)
* */
/*
* 认识函数
* 1. descriptor
* configure: Boolean. effect: 描述能否被改变 default: false
* writable: Boolean. effect: judge if it can be written. default: false
* enumerable: Boolean. effect: 能否被迭代 default: false
* value: value. effect: 属性值 default: undefined
* set: function default: undefined
* get: function default: undefined
* */

/*
* explore writable
* value: boolean
* */

let obj = {};
Object.defineProperty(obj, 'a', {
  value: 27,
  writable: false,
});
try {
  // console.log(obj.a);
  obj.a = 37;
} catch (e) {
  // console.log('error appear: ', e);
}

/*
explore enumberable
* */

var o = {};
Object.defineProperty(o, "a", { value : 1, enumerable:true });
Object.defineProperty(o, "b", { value : 2, enumerable:false });
Object.defineProperty(o, "c", { value : 3 }); // enumerable defaults to false
o.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true

for (var i in o) {
  console.log(i);
}
// 打印 'a' 和 'd' (in undefined order)

Object.keys(o); // ["a", "d"]

assert.deepEqual(o.propertyIsEnumerable('a'), true); // true
assert.deepEqual(o.propertyIsEnumerable('b'), false); // false
assert.deepEqual(o.propertyIsEnumerable('c'), false); // false
debugger;

