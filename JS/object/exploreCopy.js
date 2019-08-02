/*
* 根据深度和广度来创建一个对象
* 心得：
* 1. 我认为用对象对一个变量进行赋值，是一个建立联系的过程，而不是传统意义上的赋值
* 2. 只要对象还有被索引，这个对象就不会消失
*
* Resource：
* 1. https://segmentfault.com/a/1190000016672263
* 2. https://juejin.im/post/5c45112e6fb9a04a027aa8fe?utm_source=gold_browser_extension
* */
function createData(deep = 0, breadth = 0) {
  const data = {}; // origin obj
  let temp = data;
  for (let i = 0; i < deep; i++){
    // 变量存储的只是索引，对索引进行任何操作都和对象块没有关系
    temp = temp['data'] = {}; // => 先对origin obj进行赋值操作 => 再拿到值得索引，进行下一步操作
    for (let j = 0; j < breadth; j++){
      temp[j] = j;
    }
  }
  return data;
}

/*
* primitive deepClone
* */
function clone(source) {
  let target = {};
  for(let i in source) {
    if (source.hasOwnProperty(i)) {
      if (typeof source[i] === 'object') {
        target[i] = clone(source[i]); // 注意这里
      } else {
        target[i] = source[i];
      }
    }
  }
  
  return target;
}
/*
problem：
1. 没有参数的检验
2. 对象判断有问题
3. 异常情况没有处理，如数组和null
big problem：
1. Maximum call stack size exceeded 超过最大允许栈的范围
2. circular call循环调用问题
*/

// Maximum call stack size exceeded, 数量过一万就爆栈了
// console.log('data', clone(createData(1000, 0)));

/*
* methods for Maximum call stack size exceeded
* Thought
* 1. 消除尾递归
* 2. 不采用递归，改为用循环，即对整个对象树进行遍历
* */
function isObj(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

function cloneLoop(x) {
  if (!isObj(x)) {
    return x;
  }
  
  const root = {};
  const stack = [
    {
      parent: root, // 从下往上的意思就是，按照key值往parent塞一个value值
      key: undefined,
      value: x, // 相当于child
    }
  ];
  
  while (stack.length) {
    let node = stack.pop();
    const key = node.key;
    const value = node.value;
    let temp = node.parent;
    if (key !== undefined) {
      temp = node.parent[key] = {};
    }
    
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        if (isObj(value[key])) {
          stack.push({
            parent: temp,
            key: key,
            value: value[key],
          });
        } else {
          temp[key] = value[key];
        }
      }
    }
  }
  
  return root
}
// const testObj = createData(10000, 0);
// const res = cloneLoop(testObj);
// console.log('cloneLoop res: ', res);


// 保持引用关系
// methods for circular call
function cloneForce(x) {
  // =============
  const uniqueList = []; // 用来去重
  // =============
  
  let root = {};
  
  // 循环数组
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    }
  ];
  
  while(loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;
    
    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }
    
    // =============
    // 数据已经存在
    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      break; // 中断本次循环
    }
    
    // 数据不存在
    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res,
    });
    // =============
    
    for(let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }
  
  return root;
}

function find(arr, item) {
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }
  
  return null;
}

const a = {
  b: '',
};
a.b = a;

// console.log('circle result: ', cloneLoop(a));

/*
* 测试性能
* */
function runTime(fn, time) {
  let stime = Date.now();
  let count = 0;
  while(Date.now() - stime < time) {
    fn();
    count++;
  }
  
  return count;
}

// console.log('test', cloneLoop(createData(1000, 1000)));
console.log('count: ', runTime(function(){cloneLoop(createData(500, 0))}, 2000));


`method=POST`url=/api/content/comment/post?biz_id=1014&item_id=250329298722892800&scene_id=muggle&SSO_TICKET=c486ea412cb54e7ca6e31e37097e18000e70ca00&sign=d6286aa4c014e242f2bde52ce15d4b76&ts=1539592849437&client_id=vugc_admin&biz_id=1014`body={"content":"眼睛挺好看的","user_name":"小韩韩","user_avatar":"http://image.uc.cn/o/uop/1Ht08/;;0,uop/g/uop/avatar/1807031601014836cc2791a7205e8ea090c3759c7bx200x200x12.jpg;3,160","user_id":"1151571532"}`time=[2018-10-15 16:40:49]
