const curry = require('ramda').curry;
function createData(deep = 0, breadth = 0) {
  const data = {};
  let temp = data;
  for (let i = 0; i < deep; i++){
    temp = temp['data'] = {};
    for (let j = 0; j < breadth; j++){
      temp[j] = j;
    }
  }
  return data;
}

const produceData = curry(function(path, obj) {
  if (typeof path !== 'string') {
    path = '';
  }
  try {
    let temp = eval('obj.' + path);
    if (typeof temp === 'undefined' || typeof temp === 'null') {
      return '';
    } else {
      return temp;
    }
  } catch (e) {
    return '';
  }
});

const splitArr = (arr, size) => {
  const finalSize = Math.abs(Math.floor(size * 1) || 1);
  const length = arr.length;
  if (!length) {
    return [];
  }
  const finalArr = [];
  for (let i = 0; i < length;) {
    finalArr.push(arr.slice(i, i += finalSize));
  }
  return finalArr;
};

const sleep = (delay) => new Promise((resolve, reject) => setTimeout(resolve, delay));
/*
* @resource
*  - https://www.cnblogs.com/fsjohnhuang/p/4147810.html
* */
const debounceFun = function (fun, delay) {
  return function () {
    if (throttleFun.throttleSymbol) {
      clearTimeout(throttleFun.throttleSymbol);
    }
    throttleFun.throttleSymbol = setTimeout(fun.bind(this, arguments), delay);
  }
}

var debounce = function(func, wait, immediate) {
  // immediate默认为false
  var timeout, args, context, timestamp, result;
  
  var later = function() {
    // 当wait指定的时间间隔期间多次调用Date.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    var last = Date.now() - timestamp;
    
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  
  return function() {
    debugger;
    context = this;
    args = arguments;
    timestamp = Date.now();
    // 第一次调用该方法时，且immediate为true，则调用func函数
    var callNow = immediate && !timeout;
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    
    return result;
  };
};

exports.createData = createData;
exports.produceData = produceData;
exports.splitArr = splitArr;
exports.sleep = sleep;
