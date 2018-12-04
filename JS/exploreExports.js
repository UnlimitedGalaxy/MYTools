/*
original code
* */

function require(moduleName, yourCode) {
  const module = {
    exports: {}
  };
  
  (function (module, exports) {
    yourCode(module, exports);
  })(module, module.exports);
  
  return module; // 最终导出的是module
}

// doesn't point at module.exports any more
function test1(module, exports) {
  exports = {
    a: 'a'
  };
};

function test2(module, exports) {
  exports.a = 'a';
}

function test3(module, exports) {
  module.exports = {
    a: 'a'
  };
}

console.log(require('', test1));
console.log(require('', test2));
console.log(require('', test3));


/*
* draw a conclusion
* 1. exports 是用于打游击战的时候用
* 2. module.exports 是用在打游击战或者最后赋值都可以
*
* */
