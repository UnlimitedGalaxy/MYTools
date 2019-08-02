const Rx = require('rxjs/Rx');
const Observable = Rx.Observable;
const Operators = Rx.operators;
const subscriber = {
  next: (value) => { console.log(value); },
  error: (err) => { console.log('Error: ' + err); },
  complete: () => { console.log('complete'); }
};

/*
* scan
* - I draw a analogy between 'scan' and 'reduce'
* */
let stringSequence = Observable.from('galaxy');
// let intervalSequence = Observable.interval(100);
//
// stringSequence.zip(intervalSequence, (x, y) => x)
//   .scan((iterate, item) => iterate + item, '')
//   .subscribe(subscriber);

/*
* distinct
* distinctUntil
* */

/*
* catch
* . 捕获错误
* . 可以利用第二参数重新执行，原来的Observable
* retry
* retryWhen
* . 错误收集
* repeat
* . 重复上一步操作
* */
// from 可以是promise、iterable、ArrayLike、subscriber
// concat 就是连接的意思
// map 主要是用于映射，可以用于返回一个Observable ？
// let newStringSource = Observable.from(['a', 'b', 'c', 2])
//   .zip(Observable.interval(100), (x, y) => x)
//   .map(x => x.toUpperCase()); // 这里为啥，不用map不行呢？
//
// newStringSource.catch((e, oObservable) => Observable.empty()
//       .startWith('after 5s retart')
//       .delay(500)
//       .concat(oObservable)
//   )
//   .subscribe(subscriber);
// newStringSource
//   .subscribe(subscriber);

// var source = Rx.Observable.from(['a','b','c','d',2])
// .zip(Rx.Observable.interval(500), (x,y) => x)
// .map(x => x.toUpperCase());
// // 通常 source 會是建立即時同步的連線，像是 web socket
//
// var example = source.catch(
//   (error, obs) => Rx.Observable.empty()
//   .startWith('連線發生錯誤： 5秒後重連')
//   .concat(obs.delay(5000))
// );
//
// example.subscribe({
//   next: (value) => { console.log(value) },
//   error: (err) => { console.log('Error: ' + err); },
//   complete: () => { console.log('complete'); }
// });

/*
* pipe
* . suppose
*   - it used to connect different operators
* */
// debugger;
stringSequence.pipe(
  Operators.map(i => 'hello')
)
  .subscribe(subscriber);