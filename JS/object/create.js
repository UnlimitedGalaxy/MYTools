const base = {
  a: 'a',
  b: 'b',
};

let tmp = Object.create(base);
tmp = Object.create(null); // 生成了一个没有原型方法的对象
debugger;



/*
* Draw a conclusion
* 1. get object which has a prototype from the param
* */