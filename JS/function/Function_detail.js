// explore arrow function
/*
* 1. don't have arguments
* 2. have this, but it can't mutate
* */
var arrowFun = (a) => {
	console.log('this', this);
	// console.log('arguments', arguments);
};

function test() {
	console.log('test this', this);
	// console.log('test arguments', arguments);
}

const testObject = {
	a: 'a'
};

arrowFun.call(testObject);
test.call(testObject);
