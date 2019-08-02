var Rx = require('rxjs/Rx');

var observe = Rx.Observable.of(1,2,3); // 等等
observe.map(i => x + '!!!');