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


var __extends = (this && this.__extends) || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};