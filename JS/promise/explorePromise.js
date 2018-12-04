/*
* 错误 bubble
* */
let promiseOne = Promise.resolve()
	.then(() => {
		console.log('promiseOne');
	});

let promiseTwo = Promise.resolve()
	.then(() => {
		console.log('promiseTwo');
		throw new Error('promiseTwo throw error');
	});

let promiseAll = Promise.all([
	promiseOne,
	promiseTwo,
])
	.then(res => {
		console.log('Promise.all', res);
	})
	// .catch(e => {
	// 	debugger;
	// 	console.log('Promise.all error', e);
	// })

Promise.resolve()
	.then(() => {
		return promiseAll;
	})
	.then(() => {
		console.log('promise next');
	})
	.catch(e => {
		console.log('promise catch error from promiseTwo')
	});

