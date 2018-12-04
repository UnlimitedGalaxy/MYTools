/*
* 这些简直是线程有空才计时
* */
/*
* 同步异步链式调用 需求：new Hero.act().sleep().kill()
* */

/*
* 探索怎么让程序sleep
* 1. 直接循环
* 2. 用promise回调
* */
let scriptBegin = Date.now();
// fun1();
// fun2();

// 需要执行20ms的工作单元
function act(functionName) {
	console.log(functionName, Date.now() - scriptBegin);
	let begin = Date.now();
	while(Date.now() - begin < 20);
}
function fun1() {
	let fun3 = () => act("fun3");
	setTimeout(fun3, 0);
	act("fun1");
}
function fun2() {
	act("fun2 - 1");
	var fun4 = () => act("fun4");
	setInterval(fun4, 20);
	act("fun2 - 2");
}

function fun3() {
	// act("fun2 - 1");
	var fun4 = () => act("fun4");
	setInterval(fun4, 20);
	// act("fun2 - 2");
}

// fun3()

function sleep(delayTime) {
	// return Promise.resolve()
	// 	.then(() => {
	// 		setTimeout(() => {}, delayTime);
	// 	});
	/*
		1.为什么需要new Promise？ 因为本身的那个function或者sth不是promise
		2.用链式的时候，是建立在大家都是promise的情况下
	* */
	return new Promise((resolve, reject) => {
		// setTimeout(() => { resolve 本身就是function
		// 	resolve()
		// }, delayTime);
		setTimeout(resolve, delayTime)
	});
}
/*
* explore setTimeout
* 有三种调用方式
* 1. 直接callback
* 2. cb + time
* 3. cb + time + params
* */
setTimeout(function() {
	console.log(arguments);
}, 0, 'a', 'b');


/*、
* 测试连续两个setTimeout的时候，是在同一事件循环里面，还是在下一个事件循环里面
* 结果：1、2、3、4
* 实验证明：
* 它们是在同一个事件循环里面
* */
setTimeout(function() {
  console.log('1');
  process.nextTick(() => {
    console.log('3');
  });
})
setTimeout(function() {
  console.log('2');
  process.nextTick(() => {
    console.log('4');
  });
})
/*
* explore process.nextTick
* */

// process.nextTick(() => {
// 	console.log('3');
// });
// process.nextTick(() => {
// 	console.log('4');
// });

