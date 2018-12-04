const curry1 = function(fn) {
  const innerParams = [];
  return function temp(...params) {
    innerParams.apply(innerParams, params);
    if (innerParams.length != fn.length) {
      return temp;
    } else {
      return fn(...innerParams);
    }
  }
}

/*
* The thing is 如何累加参数
* */
const curry = function(fn) {
  return function temp(...params) {
    if (params.length != fn.length) {
      return temp;
    } else {
      return fn(...params);
    }
  }
}

function add(a, b, c) {
  return a + b + c;
}

let temp = curry(add);
console.log(temp(1)(2)(3));
