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
* merge
* . suppose
*   -- 传出的两个observable，他们的时序平行的，
*   -- 他们的地位是平等的，没有谁先谁后
* . exact thought
*   -- It flatten all the values from different Observer
*   -- Eventually, they became one observer.
* */
const interval100 = Observable.interval(100);
const interval1000 = Observable.interval(1000);
Observable.merge(interval100, interval1000)
  .subscribe(subscriber);