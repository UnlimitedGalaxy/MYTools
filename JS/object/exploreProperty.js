/*
* add or delete property
* */
const testObj = {
  a: 'a', b: 'b', c: 'c'
};
delete testObj.a;
console.log('testObj', testObj); // => { b: 'b', c: 'c' }
