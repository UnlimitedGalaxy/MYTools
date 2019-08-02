const Rx = require('rxjs/Rx');
var subject = new Rx.Subject();
console.log('start');
/*
* basic usage
* . feature
*   - 批量将事件按时序分发给subscriber
*   - 居然Subject 繼承了 Observable 的原型
* */
// var observerA = {
//   next: value => console.log('A next: ' + value),
//   error: error => console.log('A error: ' + error),
//   complete: () => console.log('A complete!')
// }
//
// var observerB = {
//   next: value => console.log('B next: ' + value),
//   error: error => console.log('B error: ' + error),
//   complete: () => console.log('B complete!')
// }
//
// subject.subscribe(observerA);
//
// Rx.Observable.interval(100).subscribe(subject);
// // subject.next(1);
// // // "A next: 1"
// // subject.next(2);
// // // "A next: 2"
// // subject.next(3);
// // "A next: 3"
//
// setTimeout(() => {
//   subject.subscribe(observerB); // 3 秒後才訂閱，observerB 不會收到任何值。
// },3000)

/*
* behaviorSubject
* . will save the current subject status value
* . need initial value
* */
// var subject = new Rx.BehaviorSubject(0); // 0 為起始值
// var observerA = {
//   next: value => console.log('A next: ' + value),
//   error: error => console.log('A error: ' + error),
//   complete: () => console.log('A complete!')
// }
//
// var observerB = {
//   next: value => console.log('B next: ' + value),
//   error: error => console.log('B error: ' + error),
//   complete: () => console.log('B complete!')
// }
//
// subject.subscribe(observerA);
// // "A next: 0"
// subject.next(1);
// // "A next: 1"
// subject.next(2);
// // "A next: 2"
// subject.next(3);
// // "A next: 3"
//
// setTimeout(() => {
//   subject.subscribe(observerB);
//   // "B next: 3"
// },3000)

/*
* ReplaySubject
* . replay the several last values
* */

/*
* AsyncSubject
* . when the process complete, it will send the last value and trigger complete
* */

/*
* refCount
* */
var source = Rx.Observable.interval(1000)
.do(x => console.log('send: ' + x))
.multicast(new Rx.Subject())
.refCount();

var observerA = {
  next: value => console.log('A next: ' + value),
  error: error => console.log('A error: ' + error),
  complete: () => console.log('A complete!')
}

var observerB = {
  next: value => console.log('B next: ' + value),
  error: error => console.log('B error: ' + error),
  complete: () => console.log('B complete!')
}

var subscriptionA = source.subscribe(observerA);
// 訂閱數 0 => 1

var subscriptionB;
setTimeout(() => {
  subscriptionB = source.subscribe(observerB);
  // 訂閱數 0 => 2
}, 1000);

setTimeout(() => {
  subscriptionA.unsubscribe(); // 訂閱數 2 => 1
  subscriptionB.unsubscribe(); // 訂閱數 1 => 0，source 停止發送元素
}, 5000);