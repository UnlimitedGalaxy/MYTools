function checkNull(val) {
  let innerVal = val;
  if (typeof val === 'string') {
    innerVal = innerVal.trim();
  }
  if (!innerVal && innerVal !== 0 && innerVal !== false) {
    return true;
  }
  
  if (typeof innerVal === 'object' &&
    Object.prototype.toString.call(innerVal) !== '[object Date]') {
    
    const keys = Object.keys(innerVal);
    if (keys.length > 0) {
      let result = true;
      for (let key of keys) {
        let judge = checkNull(innerVal[key]);
        if (judge === false) {
          result = false;
          break;
        }
      }
      return result;
      // if (keys.every(item => checkNull(innerVal[item]))) {
      //   // 如果对象里面没有任何内容则判断为空
      //   return true;
      // } else {
      //   return false;
      // }
      
    } else {
      return true;
    }
  }
  return false;
}

/*
* description：所有的参数都是为了构造temp的function
* usage: 可以用于判断，也可以用于加工对象
* @param {array} rules []
* @return {boolean} result [用于判断最终结果]
* @error [如果有一项检测有问会抛出异常，在后台显示出来，并且返回结果位false]
* @example
*  validate(
*  [
*  {
*     valueName: '', // valueName为必传
*     validator: func || 'string',// 可选string为用于校验字符串
*     message: '', // 可选
*   },
*  ]
*  )(values)
* */

function validateData(rules = []) {
  // console.log('before', rules);
  rules = rules.map((item, index) => {
    /*
    * @param {object} data [为一个对象： { valueName: item.valueName, message: item.message }]
    * @param { function/ string } validate [ function 可以自己根据传进来的obj定义返回判断，string 可以是一个条件判断写成字符的形式：'a == b']
    * @param {object} values [外面传进来的需要加工判断的对象]
    * @return {null} result []
    * */
    const temp = function(data, validate, values) {
      let judge = false;
      if (typeof validate === 'function') {
        judge = validate(values);
      } else if (typeof validate === 'string') {
        judge = eval(validate);
      } else {
        judge = checkNull(produceData(data.valueName)(values));
      }
      // 如果为true 抛出异常
      if (judge) {
        throw new Error(data.message || '缺少' + data.valueName);
      }
    };
    return {
      validator:
        checkNull(item) ? function() {
          } :
          (typeof item.validator === 'string' || typeof item.validator === 'function') ?
            temp.bind(this, {
              valueName: item.valueName,
              message: item.message
            }, item.validator) :
            temp.bind(this, { valueName: item.valueName, message: item.message }, null),
    };
  });
  
  // console.log('final rules', rules);
  
  return function(values) {
    return rules.reduce((iterator, item) => {
        return iterator
          .then(() => {
            return item.validator(values);
          });
      }, Promise.resolve())
      .then(() => {
        return true;
      });
    // .catch((e) => {
    //   openNotificationWithIcon('error', '验证失败', '失败原因: ' + e.message);
    //   return false;
    // });
  };
}


/*
* description: compare object not only
* @param {any} x [可以是一个数组、对象、基本数据类型]
* @param {any} y [可以是一个数组、对象、基本数据类型]
* @return {Boolean} result
* */

function isEqual(x, y) {
  if (x === y) {
    return true;
  }
  // likely one of them is not object
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }
  if (x.constructor !== y.constructor) {
    return false;
  }
  // x 有的属性
  for (let p in x) {
    if (x.hasOwnProperty(p)) {
      if (!y.hasOwnProperty(p)) {
        return false;
      }
      if (x[p] === y[p]) {
        continue;
      }
      // Numbers, Strings, Functions, Booleans must be strictly equal
      if (typeof(x[p]) !== 'object' || typeof (y[p]) !== 'object') {
        return false;
      }
      if (!isEqual(x[p], y[p])) {
        return false;
      }
    }
  }
  // 如果来到这里，则需要判断y有的属性但x没有的情况
  for (let p in y) {
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false;
    }
  }
  
  return true;
}

/**
 * produceData [就算所给路径不在对象上，也不会造成报错]
 * @param {String} path [对象的路径]
 * @param {Object} obj [所需要方位的对象]
 * @return {Any || String} any [所访问到的资源]
 */
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

/*
* example:
* origin： {a: {b: 'c', f: 'c'}, b: {d: 'c'}}
* result: [
*  ['a', 'b', 'c'非对象的值]
*  ['a', 'f', 'c'非对象的值]
*  ['b', 'd', 'c'非对象的值]
* ]
* Description:
* 1. 它读取非对象的值，在对象上的访问路径
* */

const convertObjToPath = function(Obj) {
  let total = {};
  const final = [];
  const innerfunc = function(obj, floor, keys) {
    // keys 保证唯一性
    total[floor + keys.join('')] = [];
    for (let key in obj) {
      total[floor + keys.join('')].push(key);
      if (Object.prototype.toString.call(obj[key]) === '[object Object]' && obj[key] !== null) {
        // 进行递归回调的时候floor被改变了
        let temp = floor;
        innerfunc(obj[key], (++temp), [...keys, key]);
      }
    }
  };
  innerfunc(Obj, 1, []);
  
  const innerCompose = function(floor, Oarr, LObj) {
    total[floor + Oarr.join('')].forEach((item, index) => {
      if (Object.prototype.toString.call(LObj[item]) === '[object Object]' && LObj[item] !== null) {
        let temp = floor;
        innerCompose(++temp, [...Oarr, item], LObj[item]);
      } else {
        // 一旦完成拼接才加进去final里面
        final.push([...Oarr, item, LObj[item]]);
      }
    });
  };
  innerCompose(1, [], Obj);
  
  return final;
};

function judgeObj(o) {
  return typeof o === 'object' && o !== null;
}

/*
* 深复制
* description: copy a obj deeply
* @param {Object} o []
* @param {Object} c [初始对象，可以忽略]
* @return {Object} result
* */
function deepCopy(o, c) {
  if (!judgeObj(o)) {
    return o;
  }
  var c = c || (Array.isArray(o) ? [] : {});
  for (var i in o) {
    if (judgeObj(o[i])) {
      // 要考虑深复制问题了
      if (o[i].constructor === Array) {
        // 这是数组
        c[i] = [];
      } else {
        // 这是对象
        c[i] = {};
      }
      deepCopy(o[i], c[i]);
    } else {
      c[i] = o[i];
    }
  }
  return c;
}

/*
* 精确位数 四舍五入
* @param {number} floatvar [will convert into ]
* @param {number} n
* @return {number} res
* @history
* 1. 10 * n -> Math.pow(10, n)
* */
const changeNDecimal = function(floatvar, n = 1) {
  let f_x = parseFloat(floatvar);
  if (isNaN(f_x)) {
    console.log('function:changeNDecimal->parameter error');
    return 0;
  }
  const basicParam = Math.pow(10, n);
  f_x = Math.round(floatvar * basicParam) / basicParam;
  return f_x;
};

/**
 *  [按给定大小分割数组]
 * @param {Array|String} arr [分割对象]
 * @param {Number} size [分割大小，即一行有多少个数据]
 * @return {Array}  finalArr [返回分割后的数组]
 */
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

/*
* logic judge
* @param {number} status [need to init number]
* @param {any} status [need to init number]
* @return {boolean} judge result
* @test
* -> assert.strictEqual(judgeNumStatus(0)(''), false)
* */
const judgeNumStatus = curry(function(status, input) {
  let innerInput = input;
  const type = typeof innerInput;
  if (type === 'string' || type === 'number') {
    if (checkNull(innerInput)) {
      return false;
    }
    if (type === 'string') {
      innerInput = (+innerInput);
    }
    return innerInput === status;
  } else {
    return false;
  }
});


/*
* eliminate Duplicate 得到一个干净没有重复内容的数组
* @param {array} array [need to be processed]
* @return {array} 清除干净后的数组
* */
function eDuplicate(array) {
  let r = [];
  for (let i = 0, l = array.length; i < l; i++) {
    // 它在后面有一样的数值就跳过它
    for (let j = i + 1; j < l; j++) if (array[i] === array[j]) j = ++i;
    r.push(array[i]);
  }
  return r;
}

/*
* @description
* 用于激活modal时去掉滚动
* */
function stopScroll() {
  if (!window.global.slideBarWidth) {
    let H = $('html');
    let w1 = $(window).width();
    H.addClass('fancybox-lock-test');
    let w2 = $(window).width();
    H.removeClass('fancybox-lock-test');
    window.global.slideBarWidth = w2 - w1;
  }
  $('body').css({ paddingRight: window.global.slideBarWidth, overflowY: 'hidden' });
}

function scrollAgain() {
  $('body').css({ paddingRight: 0, overflowY: 'auto' });
}

/**
 * [ 将entries转换回去 ]
 * @param {array} arr [ [key, value] ]
 * @return {object} obj [转换回去的对象]
 */
const fromEntries = (arr) => arr.reduce((o, i) => (o[i[0]] = i[1], o), {});

/**
 * memorize [ cache promise 的 结果 ]
 * @param {function} fn [生成promise的function]
 * @return {number} maxAge [缓存时间]
 * @test
 * 1. 期待过来了特定时间之后自动过期
 * 2. 出现异常的时候，也会退出cache
 * 3.
 */
function memorizePromise(fn, maxAge) {
  const opts = {
    cachePromise: null,
    maxAge: maxAge || 1000,
  };
  
  function inner(...arr) {
    if (inner.timer) {
      clearTimeout(inner.timer);
    }
    inner.timer = setTimeout(() => {
      opts.cachePromise = null;
    }, opts.maxAge);
    
    if (!opts.cachePromise) {
      opts.cachePromise = fn(...arr)
        .catch((e) => {
          opts.cachePromise = null;
          return new Error(e.message || '');
        });
    }
    return opts.cachePromise;
  }
  
  return inner;
}

/**
 * 获取cookie
 */
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + '=');
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
}
/**
 * biArrByCondition [将数组按条件分组]
 * @param {Array} arr [数组]
 * @param {function} condition [返回true or false]
 * @return [[], []] [返回分组好的数组]
 */
const biArrByCondition = (arr, condition) => arr.reduce((group, item, index) => (group[condition(item) ? 0 : 1].push(item), group), [[], []]);
