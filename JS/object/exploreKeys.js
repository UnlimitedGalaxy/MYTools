
/*
* 基础方法
* */
/* logic
Assert: Type(O) is Object.
Let ownKeys be ? O.[[OwnPropertyKeys]]().
Let properties be a new empty List.
For each element key of ownKeys in List order, do
If Type(key) is String, then
Let desc be ? O.[[GetOwnProperty]](key).
If desc is not undefined and desc.[[Enumerable]] is true, then
If kind is "key", append key to properties.
Else,
Let value be ? Get(O, key).
If kind is "value", append value to properties.
Else,
Assert: kind is "key+value".
Let entry be CreateArrayFromList(« key, value »).
Append entry to properties.
Order the elements of properties so they are in the same relative order as would be produced by the Iterator that would be returned if the EnumerateObjectProperties internal method were invoked with O.
Return properties.
* */
// kind 有可能是key、value、key+value
function EnumerableOwnPropertyNames (O, kind ) {
  // Assert is Obj
  const judgeObj = Type(O);
  let OwnKeys = '';
  const properties = [];
  if (judgeObj) {
    // 获取全部属性, 在这里完成排序
    OwnKeys = O[[OwnPropertyKeys]]();
  }
  for (let i = 0, key; key = OwnKeys[i]; i++) {
    if (Type(key) === 'string') {
      // 对象的值, 错误，应该是属性的描述
      let desc = O[[GetOwnProperty]](key);
      // 可迭代
      if (typeof desc !== 'undefined' && desc[[Enumerable]]) {
        if (kind === 'key') {
          properties.push(key);
        }
        if (kind === 'value') {
          properties.push(O[key]);
        }
        if (kend === 'key+value') {
          properties.push([key, O[key]]);
        }
      }
    }
  }
}

/*
* O[[OwnPropertyKeys]]() 会调用此方法
* */
/*
Let keys be a new empty List.
1. For each own property key P of O that is an integer index, in ascending numeric index order, do
Add P as the last element of keys.
2. For each own property key P of O that is a String but is not an integer index, in ascending chronological order of property creation, do
Add P as the last element of keys.
3. For each own property key P of O that is a Symbol, in ascending chronological order of property creation, do
Add P as the last element of keys.
Return keys.
* */
function OrdinaryOwnPropertyKeys(O) {

}

/*
* explore values api
* */
// console.log(Object.values(a));

/*
* explore keys api
* 1. transfer params into obj
* 2. get can rend
* Conclusion:
* 1. 不会迭代prototype的变量
* */
const testObj = {
  5: 5,
  1: 1,
};
// console.log('keys: ', Object.keys(testObj));
// console.log('values: ', Object.values(testObj));
// console.log('entries: ', Object.entries(testObj));

// const a = {a: 'a', b: 'b'};
// const b = Object.create(a);
// b.c = 'c';
// console.log('result: ', Object.keys(b)); // 不会迭代prototype的变量

/*
* iterate object's prototype
* */
// let c = Object.create(b);
// let temp = c;

// while (temp) {
//   temp = Object.getPrototypeOf(temp);
//   // debugger;
//   if (temp === Object.prototype) {
//     break;
//   }
// }

/*
* for ... in ...
* Question:
* . if it will iterate the object's prototype
*   Answer：yes, it will
* */
// const prototypeObj = {
//   a: 'a',
// }
// const b = Object.create(prototypeObj);
// b.b = 'b';
//
// for (let key in b) {
//   console.log(key);
// }

