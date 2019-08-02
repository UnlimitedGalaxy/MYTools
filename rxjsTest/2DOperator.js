const Rx = require('rxjs/Rx');
const Observable = Rx.Observable
var subscriber = {
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

/*
* concatAll
* .将2D展开成1D的
* .Only when the last complete, the next will begin
* Explore
* . if don't expanding it, we just can get the Observable obj instead of the final value
* .
* */
// var click = Rx.Observable.from('click');
// var source = click.map(e => Rx.Observable.interval(100).take(3));
//
// var example = source.concatAll();
// source.subscribe(subscriber);

/*
* switch
* 在新的 observable 送出後直接處理新的 observable 不管前一個 observable 是否完成，每當有新的 observable 送出就會直接把舊的 observable 退訂(unsubscribe)，永遠只處理最新的 observable!
* Problem
* . 什么时候算结束
*   - thought 只要有一个结束就是结束
* .
* */
// Observable.interval(100).take(3)
//   .map((val, index) => {
//     if (index === 2) {
//       return Observable.empty().delay(index * 1000).concat(Observable.interval(100));
//     }
//     return Observable.empty().delay(index * 1000).concat(Observable.interval(100))
//   })
//   .switch()
//   .subscribe(subscriber);

// Observable.empty().delay(1000).concat(Observable.interval(100).take(3))
//   .subscribe(subscriber);

var click = Observable.interval(1000).take(3);
var source = click.map(e => Rx.Observable.interval(10));

var example = source.switch();
example.subscribe({
  next: (value) => { console.log(value); },
  error: (err) => { console.log('Error: ' + err); },
  complete: () => { console.log('complete'); }
});
/*
* mergeAll
* . handle different Observable Obj at the same time
* */
// Observable.from([Observable.interval(1000),Observable.interval(1000)])
//   .mergeAll()
//   .subscribe(subscriber);
