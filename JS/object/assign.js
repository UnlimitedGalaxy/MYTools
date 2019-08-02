const assert = require('assert');
/*
* assign [像target对象增加属性]
* @grammar
* Object.assign(target, ...sources)
* @params
  {object} target [The target object. It can be written. Otherwise it'll throw TypeError ]
  {objects} sources [The source object. 多个对象， 浅复制，它的get方法会被调用]
  @return
  {Object} target 对象的引用
* */

const testObj = {
  a: 'a'
};
assert.equal(Object.assign(testObj, {b: 'b'}), testObj); // 验证正确，target对象的索引被返回了
// console.log(testObj)

