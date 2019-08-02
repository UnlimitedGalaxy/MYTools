/*
* 要点
* . 一订阅实例的时候，就执行传入的function
* . 实例化的observable instead of observer
* . A observer is the person who observes the observable object.
* */
function create(trigger) {
  var observable = {
    subscribe(observer) {
      trigger(observer);
    },
  };
  return observable;
}

var observable = create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
})

observable.subscribe({
  next(value) { console.log(value) }
});
