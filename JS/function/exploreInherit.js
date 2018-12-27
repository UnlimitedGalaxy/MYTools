// es5 inherit
/**
 * inherit [description ]
 * @param {function} Parent [description]
 * @param {function} Child [description]
 // * @return {function} Child [Child who has prototype ] 不用return
 @policy
 1. 原型链保持干净
 2. 在子类中，调用父类的构造方法，来添加父类的变量到实例上
 */
function inherit(Parent, Child) {
  // Child.prototype = new Parent(); //result: Child.prototype.__proto__ = Parent.prototype;
  // 这里有问题，如果直接这么赋值的话，已经定义在Child上的原型方法就会没有
  // 改为：
  Child.prototype.__proto__ = new Parent(); // 如果是这样的话，__proto__链接的就是对象那个而不是Parent的prototype
  // Child.constructor = Child; //如果不写这个的话，就不会有constructor属性在__proto__上面
  // 上述错误，写不写都默认有constructor
}

/*
*
* 目标：
* 1. 清除掉父类的无用实例变量
* 2. Child.prototype.__proto__从Object.prototype改为Parent.prototype
* 3. 保留Child.prototype.constructor 为Child
* 方案：
* 1. 用一个不含有变量的temp的函数来实例话对象
* 2. 同时将temp的prototype指向Parent.prototype
* result：
* 1. 这样会丢失parent信息
* 2. 丢失虽然是丢失了，但是没有关系
* 3. 最终结果是没有丢失，因为实例化的对象有__proto__，上传结论错误
* */
function inherit1(Parent, Child) {
  function temp() {}
  temp.prototype = Parent.prototype;
  Child.prototype = new temp();
  Child.prototype.constructor = Child;
}
// 清除
function inherit2(Parent, Child) {
  Child.prototype = Object.create(Parent.prototype); // 就是上面的封装
  Child.prototype.constructor = Child;
}

/*
* 没有继承之前的原型链
* ParentEs5.prototype.__proto__ -> Object.prototype
* */
function ParentEs5() {
  this.a = 'niu bi';
}


function ChildEs5() {
  ParentEs5.call(this);
  this.b = 'niu bi';
}

ChildEs5.prototype.iphone = function() {

}

inherit2(ParentEs5, ChildEs5);

const instance = new ChildEs5();

/*
* expect instance.__Proto__ === ChildEs5.prototype -> .__proto__ ===  ParentEs5.prototype  -> Object.prototype -> .__proto -> null
  result:
  正确
* */

function ParentEs6() {
  this.a = 'niu bi';
}

ParentEs6.prototype.iphone8 = function() {
  console.log('parent iphone8');
}

class ChildEs6 extends ParentEs6 {
  constructor(props) {
    super(props); // ParentEs5.call(this);
    this.b = 'niu bi';
  }
  
  iphone8() {
    super.iphone8();
    debugger;
    console.log('child iphone');
  }
}

const instance2 = new ChildEs6()
instance2.iphone8();
debugger;


/*
* 新的发展空间
* */
