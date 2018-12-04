/*
* composite inherit
* */

function compositeInherit(targetClass, inheritClass) {
  const temp = new inheritClass();
  targetClass.prototype = temp.__proto__;
}


function InheritClass() {

}
InheritClass.prototype.test1 = '1';

function CurrentFun() {
  this.test = 'test';
}

compositeInherit(CurrentFun, InheritClass);

let currenTobj = new CurrentFun();
debugger;

exports.compositeInherit = compositeInherit;
