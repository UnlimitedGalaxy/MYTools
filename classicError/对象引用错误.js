function setName(obj) {
  obj.name = 'Nicholas';
  obj = new Object();
  obj.name = 'Greg';
}
var obj = new Object();
setName(obj);
alert(obj.name); // 'Nicholas'

/*
* 按我理解
* 1. var obj = new Object();
*    这里是在内存创建了一个对象，并且把对象的引用给了obj, 可以说obj存的是引用，而不是对象
* 2. 当调用方法的时候，将引用传进去了fun里面
*    fun里面的obj和外面的obj是两个不同的变量，但存储了同一个引用
* */
