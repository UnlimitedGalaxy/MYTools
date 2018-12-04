
/*
* 计算
* */
let arr = [1,2,3];
let max = arr.reduce(function(a, b) {
  return Math.max(a, b);
});

/*、
结构转换
* */
let test = [['a', 'a']];
const fromEntries = (arr) => arr.reduce((o, i) => (o[i[0]] = i[1], o), {});
// console.log(fromEntries(test));

/*
* 聚集函数
* */
const myPipeFunctions = (...fns) => fns.reduce((l, i) => (...args) => i(l(...args)));
