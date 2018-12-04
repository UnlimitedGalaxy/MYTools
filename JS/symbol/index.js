const assert = require('assert');
/*
* symbol.for
* 1. 会在全局搜索是否存在这个symbol，如果没有返回一个新的
* 2. symbol() 这个方法只会返回一个新的
* */
let a1 = Symbol.for('test');
let b1 = Symbol.for('test');

assert.equal(a1, b1);
