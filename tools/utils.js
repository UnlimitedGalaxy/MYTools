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

exports.createData = createData;
exports.produceData = produceData;
exports.splitArr = splitArr;
exports.sleep = sleep;
