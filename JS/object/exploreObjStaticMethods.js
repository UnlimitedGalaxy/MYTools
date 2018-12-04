/* 对象静态变量
Object.assign
Object.create
Object.definePoperty
Object.definePoperties
Object.entries
Object.freeze
Object.fromEntries
Object.getOwnPropertyDescriptor ?
Object.getOwnPropertyDescriptors ?
Object.getOwnPropertyNames ?
Object.getOwnPropertySymbols ?
Object.getPrototypeOf

Object.is
Object.isExtensible
Object.isFrozen
Object.isSealed

Object.keys
Object.preventExtensions
Object.seal
Object.setPrototypeOf
Object.values
*/

/*
* Object.getPrototypeOf
* @param {Object} obj
* @return {Object} the value of param[[prototype]]
* */
const a = {a: 'a', b: 'b'};
const b = Object.create(a);

let c = Object.getPrototypeOf(b);
let d = b.__proto__;
debugger
console.log('result: ', a === c);
console.log('result: ', a === d);
// console.log('result: ', Object.keys());
