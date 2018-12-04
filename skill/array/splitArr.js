const splitArr = function(arr, size) {
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
}

const chunk = function(arr, size) {
  return Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size));
}
/*
* conclusion：
* 1. core code：arr.slice
* */
