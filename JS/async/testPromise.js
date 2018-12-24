/*
* 如果promise.all([])
* 传一个空数组还会执行吗?
* 答：还会执行
* */
Promise.all([])
.then(res => {
  console.log('res', res);
})
