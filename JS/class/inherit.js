/*
function Person(name){
	this.name = name;
}

Person.prototype.Sleep = function(){
	console.log('Sleep!');
}

function classInherit(subClass, parentClass){
	var fn = function(){};
	fn.prototype = parentClass.prototype;
	subClass.prototype = new fn(); // 如果不用原型链，而是直接用parentClass的prototype的话会导致，缺少原型链，一旦父类方法被重新，就再也不能调用父类的方法了
	subClass.prototype.constructor = subClass;
}

function E_Student(){}; //小学生
function C_Student(){}; //大学生
classInherit(E_Student, Person);
classInherit(C_Student, Person);
//重写 Sleep 方法

E_Student.prototype.Sleep = function(){
	debugger;
	// this._supper(); //supper 方法，这里这么写不能被调用
	console.log('Sleep at 9 clock');
}
C_Student.prototype.Sleep = function(){
	// this._supper(); //supper 方法
	console.log('Sleep at 12 clock');
}

let elementaryStudent = new E_Student('xiaomi');

elementaryStudent.Sleep();
*/

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
	// initializing 开关很巧妙的来实现调用原型而不构造，还有回掉
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	// 全局，this 指向 window，最大的父类
	this.Class = function(){};
	
	// Create a new Class that inherits from this class
	// 继承的入口
	Class.extend = function(prop) {
		//保留当前类，一般是父类的原型
		var _super = this.prototype;
		
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		//开关 用来使原型赋值时不调用真正的构成流程
		initializing = true;
		var prototype = new this();
		initializing = false;
		
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			//对函数判断，将属性套到子类上
			prototype[name] = typeof prop[name] == "function" &&
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn){
					//用闭包来存储
					return function() {
						var tmp = this._super;
						
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];
						
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						//实现同名调用
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		
		// 要返回的子类
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}
		//前面介绍过的，继承
		Class.prototype = prototype;
		
		Class.prototype.constructor = Class;
		
		Class.extend = arguments.callee;
		
		return Class;
	};
})();
