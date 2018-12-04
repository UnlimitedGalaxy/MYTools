/*
* set:
* - set是类数组的数据结构
* - a group of sth that belong together in some way
* - 所包含的值都是唯一，不会重复
* - 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值)
* - iterate 的时候value和index居然是同一个值
* */

// application
// 1. create / add
let testSet = new Set(['1', 1, '2']);
// console.log(testSet);
testSet.add('1');
testSet.add(3);
// console.log(testSet);

// 2. eliminate verbose element
let verboseArr = [1, 1, 1];
let filterArr = [... new Set(verboseArr)];
// console.log('filterArr', filterArr);
function dedupe(array) {
  return Array.from(new Set(array));
}
// 3. api
/*
* add [添加元素进set]
* @param {any} param [不能多添加]
* @return {Set} [set的引用]
* */
let testSetApi = new Set();
testSetApi.add('1');
// console.log('testSetApi', testSetApi.add('1'));
// console.log('testSetApi', testSetApi.add('1', '2')); // [不能多添加]
// console.log('testSetApi', testSetApi.add.apply(testSetApi, ['1', '2'])); // [不能多添加]
// console.log('testSetApi', testSetApi.add('1').add('2'));

/*
* has[是否拥有element]
* */
/*
* delete[删除elements]
* */
/*
* clear()[清空elements]
* */
/*
获取元素
* */
// console.log('testApi', testSetApi['1']); // 居然是获取不到，可见和数组还是很大不同的

// 4. iterate
/*
* values, keys, entries
* for of
* forEach
* */
let iterateArr = new Set(['red', 'blue', 'green']);
// value 和 key 是一样的
iterateArr.forEach((value, key) => {
  // console.log('value: ', value, ', key: ', key);
});
for (let value of iterateArr.keys()) {
  // console.log('iterateArr', value);
}
for (let value of iterateArr.values()) {
  // console.log(value);
}
for (let value of iterateArr.entries()) {
  // console.log(value);
}

/*
* map:
* - javascript 的对象
* - 本质上是键值对的集合
* - 特点，键值不再限制为字符类型
* - Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应
* */

/*
1. create / add
* */
// 本质上所有迭代的数据都可以用作Map的初始化
const map = new Map([
  [{a: 'a'}, '张三'],
  ['title', 'Author']
]);

// console.log('map', map);

/*
本质上
const items = data
const map = new Map();
items.foreach(([key, value])=> map.set(key, value));
* */

// 2. claim back value
/*
* 注意：
* Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
* */
const testObj = { a: 'a'};
const testGetMap = new Map([[testObj, 'a']]);
// console.log('testGetMap', testGetMap.get(testObj));

/*
* conclusion:
* . 只有当key是全等的时候，才可以get到map里面的值,
* */

// 3. iterate
/*
keys()：返回键名的遍历器。
values()：返回键值的遍历器。
entries()：返回所有成员的遍历器。
forEach()：遍历 Map 的所有成员。
返回的是迭代器，不会是数组，所以只能用for of 来遍历
**/
const testIterateMap = new Map([
  ['a', '张三'],
  ['title', 'Author']
])
// console.log(testIterateMap.entries());
for (let [key, value] of testIterateMap.entries()) {
  // console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of testIterateMap) {
  // console.log(key, value);
}


// 4. transform into a array
const testTransformMap = new Map([
  ['a', '张三'],
  ['title', 'Author']
]);
// console.log('array', [...testTransformMap]);

const testTransformMap2 = new Map([
  ['a', '张三'],
  ['title', 'Author']
]);

// Map与对象互转
function changIntoObj(map) {
  const obj = Object.create(null);
  for (let [key, value] of map) {
    if (typeof key.toString() === 'string') {
      obj[key] = value;
    }
  }
  return obj;
}

function changIntoObj(obj) {
  return new Map(Object.entries(obj));
};

const testChangeObj = {a: 'a'};
// console.log('changIntoObj', changIntoObj(testChangeObj));

