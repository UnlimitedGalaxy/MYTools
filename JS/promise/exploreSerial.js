const createPromise = require('./temp').createPromise;
const tempPromises = [createPromise,
  createPromise,
  createPromise,];

/*
* 1. 既然是同步当然能一开就是promise了，是需要一个生产函数
* */
const promiseSerialOne = (promiseFuns) => promiseFuns.reduce((totalPromise, itemPromiseFun) => totalPromise.then(() => itemPromiseFun()), Promise.resolve());

// test -> expect console.log one time after 500ms
// promiseSyncOne(
//   [createPromise,
//   createPromise,
//   createPromise,]
// )

/*
* 利用async / generate
* */

async function runPromiseByAsync(myPromises) {
  debugger
  for (let value of myPromises) {
    await value();
  }
}
// runPromiseByAsync(tempPromises)

function* runPromiseByGenerate(myPromises) {
  // debugger;
  for (let value of myPromises) {
     yield value();
  }
}
/*
let iterateIndex  = runPromiseByGenerate(tempPromises);
iterateIndex.next(); // generator 需要next()生产指针
* */


/*、
according to above knowledge, draw a conclusion
1. 这个思路与 reduce 思路不同之处在于，利用 reduce 的函数整体是个同步函数，自己先执行完毕构造 Promise 队列，然后在内存异步执行；
2. 而利用 async/await 的函数是利用将自己改造为一个异步函数，等待每一个 Promise 执行完毕。
* */

/*
* Resource:
* 1. https://juejin.im/post/5bd65b98f265da0a91458ee6?utm_source=gold_browser_extension
* */
