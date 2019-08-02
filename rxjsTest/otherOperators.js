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
* count
* . count how many are values outputed
* */
// Observable.interval(100).take(3)
//   .count()
//   .subscribe(subscriber);

/*
* window
* . make the ordinary Observer become a 2D Observer
* */

/*
* groupBy
* . according to the function, make the ordinary Observer become a 2D Observer
* . 注意要输出就要变为一维
* */
var people = [
  {name: 'Anna', score: 100, subject: 'English'},
  {name: 'Anna', score: 90, subject: 'Math'},
  {name: 'Anna', score: 96, subject: 'Chinese' },
  {name: 'Jerry', score: 80, subject: 'English'},
  {name: 'Jerry', score: 100, subject: 'Math'},
  {name: 'Jerry', score: 90, subject: 'Chinese' },
];
var source = Rx.Observable.from(people)
.zip(
  Rx.Observable.interval(300),
  (x, y) => x);

var example = source
.groupBy(person => person.name)
.map(group => group.reduce((acc, curr) => ({
  name: curr.name,
  score: curr.score + acc.score
})))
.mergeAll();

example.subscribe(console.log);
