const Rx = require('rxjs/Rx');
const Observable = Rx.Observable;
const subscriber = {
  next: (value) => { console.log(value); },
  error: (err) => { console.log('Error: ' + err); },
  complete: () => { console.log('complete'); }
};
/*
* map
* @comprehension
* - 转发订阅，再加工
* - 它其实是在拼接事件
* */
let people = Rx.Observable.of('Jane', 'gavin');

function map(observable, cb) {
  return Rx.Observable.create(observer => {
    observable.subscribe({
      // next: (val) => observer.next(cb(val)),
      next: (val) => {
        try {
          observer.next(cb(val));
        } catch (e) {
          observer.error(e);
        }
      },
      error: (err) => observer.error(err),
      complete: () => observer.complete(),
    });
  });
}

// let receptionist = map(people, (person) => '您好！' + person + '. What can I do for you');
// receptionist.subscribe(console.log);

/*
take
* */
var source = Rx.Observable.interval(500);
var example = source.take(3);

// example.subscribe({
//   next: (value) => { console.log(value); },
//   error: (err) => { console.log('Error: ' + err); },
//   complete: () => { console.log('complete'); }
// });

/*
* Marble Diagrams
* source: ---0---1---2---3--...
* operator: take(3)
* example: ---0---1---2|
* */

/*
* concatAll
* @comprehension
* - 如果不concat的话，会同时输出，有点像flatten
* - 行為永遠都是先處理第一個 observable，等到當前處理的結束後才會再處理下一個
* - 摊平的结果是得到一个类似单线程的序列
* */
var obs1 = Rx.Observable.interval(1000).take(5);
var obs2 = Rx.Observable.interval(500).take(2);
var obs3 = Rx.Observable.interval(2000).take(1);

var source = Rx.Observable.of(obs1, obs2, obs3);

var example = source.concatAll();

// example.subscribe({
//   next: (value) => { console.log(value); },
//   error: (err) => { console.log('Error: ' + err); },
//   complete: () => { console.log('complete'); }
// });

/*
* concat
* @param {Observable} param: 可以多个
* @return {Observable} result: 串联起来的Observable
* */
var example1 = Observable.of('jane', 'gavin');
var example2 = Observable.interval(100).take(4);
var example3 = Observable.from('hello');

// example3.concat(example2, example1)
//   .subscribe(subscriber);

/* *
* ----- 不同时序的observable 如何组合输出 ------
1. combineLatest
  - 谁先谁就可以拿到别人的最新值，进行计算
2. zip
  - 一一对应
3. combineLatestFrom
  - 已main为主，inferior没有authority去拿到main值进行计算
  - 输出的是main combines with inferior's latest value to output new value
  - pay attention to the fact that just getting the latest value of the inferior
* */

/*
* zip
* . Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each of its input Observables.
* . the keywords is in order
* . Actually, it uses for the reason that combine two Observable together in a particular way
* */
var source = Rx.Observable.from('hello');
var source2 = Rx.Observable.interval(100);

var example = source.zip(source2);
example.subscribe(subscriber);