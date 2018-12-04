let mandatory = ( ) => {
	throw new Error('Missing parameter!');
}
let foo = (bar = mandatory(), a = mandatory()) => {            // 这里如果不传入参数，就会执行manadatory函数报出错误
	return bar;
}
foo('a');
