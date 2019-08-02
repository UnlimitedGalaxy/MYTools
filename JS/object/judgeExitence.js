const compositeInherit = require('../class/exploreInherit').compositeInherit;

/*
* hasOwnProperty
* 1. 是否拥有自己的属性
* 2. 不包括原型链
* */
function InheritClass() {

}
InheritClass.prototype.test1 = '1';

function CurrentFun() {
  this.test = 'test';
}

compositeInherit(CurrentFun, InheritClass);

let currentObj = new CurrentFun();

console.log('judge hasOwnProperty', currentObj.hasOwnProperty('test1'));


/*
* in
* 1. judge property in specified properties
* 2. or in prototype chain
* */
console.log('judge in', 'hasOwnProperty' in currentObj);

/*
* for in
* 1. judge property in specified properties
* 2. or in prototype chain
* 3. and must can iterate
* */
for (let i in currentObj) {
  console.log('for in: ', i); // 在这里hasOwnProperty不可iterate
}


