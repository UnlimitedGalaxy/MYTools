/*
* explore context
* 最初，这个全局上下文由这二位组成：一个全局对象和一个this变量。this引用的是全局对象，如果在浏览器中运行Javascript，那么这个全局对象就是window对象，如果在Node环境中运行，这个全局对象就是global对象。
*
* */
console.log('this', this);
debugger;
