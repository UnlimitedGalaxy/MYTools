const sleep = require('../../tools/utils').sleep;
/*
* thenable Obj
* */
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(() => resolve(Date.now() - startTime),
      this.timeout);
  }
}

const testObj = {
  then() {
    console.log('hello')
  }
};

// (async () => {
//   const actualTime = await testObj;
//   console.log(actualTime);
// })();

/*
 try to use any value
 返回任意值
* */

// (async () => {
//   const actualTime = await {};
//   console.log('anyValue: ', actualTime);
// })();

/* *
* try to put the asynchronous function into the high level function
* result:
* . 是可以执行的，但是其实
* */
let test = [1, 2, 3];

test.forEach(async function(i) {
  await sleep(1000 * i);
  let result = await i;
  console.log('result item: ', i);
});

/*
* 循环与异步
* */

