const Rx = require('rxjs/Rx');
/*
* create
* @comprehension
* - 给一个叫observer的人给你
* - 它有next、error、complete的方法
* - 看你怎们去用它而已
* */

var observable = Rx.Observable
.create(function(observer) {
  observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
  observer.next('Anna');
  observer.error('Error');
  observer.complete(); // 不能传递值，它能中断，无论是next还是error的值传递
})

var observer = {
  next: function (val) {
    console.log('next: %j', val);
  },
  complete: function (val) {
    console.log('complete: %j', val); // 没有值传递
  },
  error: function (val) {
    console.log('error: %j', val);
  }
}
// 訂閱這個 observable
// observable.subscribe(observer);

/*
* of
* . 同步时使用
* */
var source = Rx.Observable.of('Jerry', 'Anna');

// source.subscribe({
//   next: function(value) {
//     console.log(value)
//   },
//   complete: function() {
//     console.log('complete!');
//   },
//   error: function(error) {
//     console.log(error)
//   }
// });

/*
* from
* @param: {any} param 从一个数组、类数组对象、Promise、迭代器对象或者类 Observable 对象创建一个 Observable.
* @return {Observable} observer 可以被订阅
* */
Rx.Observable.from([]);
Rx.Observable.from('string');
Rx.Observable.from(Promise.resolve());

function myFrom(promise) {
  if (promise instanceof Promise) {
    return Rx.Observable.create((observer => {
      promise
        .then(observer.next)
        .catch(observer.error);
    }));
  }
}

/*
* interval / timer
* */
// Rx.Observable.timer(1000).subscribe(console.log, console.error.bind(null, 'error'), console.warn.bind(null, 'complete'));
/*
* interval
* @param {Number}number [时间间隔]
* - 第一个数值显示的时间是在$number之后
* - 随后每一个值的显示时间间隔$number
* @return Observable 对象
* */
// Rx.Observable.interval(1000)
//   .subscribe(console.log.bind(null, 'interval'));

/*
* timer
* @param: {Number} startTime [开始时间]
* @param：{Number} gapTime [时间间隔]
* - 第一个数值显示的时间是在$startTime之后
* - 随后每一个值的显示时间间隔$gapTime
* @return Observable 对象
* */
// Rx.Observable.timer(0, 1000)
//   .subscribe(console.log.bind(null, 'timer'))

/*
* unsubscribe
* */
// var source = Rx.Observable.timer(1000, 1000);

// 取得 subscription
// var subscription = source.subscribe({
//   next: function(value) {
//     console.log(value)
//   },
//   complete: function() {
//     console.log('complete!');
//   },
//   error: function(error) {
//     console.log('Throw Error: ' + error)
//   }
// });
//
// setTimeout(() => {
//   console.log('unsubsribe');
//   subscription.unsubscribe() // 停止訂閱(退訂)， RxJS 4.x 以前的版本用 dispose()
// }, 5000);

/*
* empty
* */
Rx.Observable.empty()
  .startWith(0)
  .subscribe(observer)