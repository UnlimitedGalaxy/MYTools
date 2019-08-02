/*
* 使用from
* . 用对象
* . 用数组: 可以直接复制
* */
let test1 = Array.from({length: 3});
test1 = Array.from([1, 2]);
console.log('test1: ', test1);

/*
* 使用slice
* */
test1 = test1.slice();
console.log('test1: ', test1);

/*
* 使用New Array
* 1. 用number初始化的话，不能iterate
* 2. 用item来初始化的话，可以迭代
* 3. 用new 根本没有什么用
* */
test1 = new Array(7);
console.log('test1: ', test1);

/*
* 使用of
* . 不同点在于对于数字，它会生成一个只包含一个数字的数组
* . 用多个item来初始化
* */
test1 = Array.of(7);
console.log('test1: ', test1);

