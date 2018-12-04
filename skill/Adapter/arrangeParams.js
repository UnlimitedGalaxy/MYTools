/*
* 1. 根据indexs来调整arguments
* */
const rearg = function(func, indexs) {
  return function(...args) {
    return func(...indexs.map(i => args[i]));
  }
}

const test = rearg((...args) => {console.log(args)}, [2, 0, 1]);
test('a', 'b', 'c');
