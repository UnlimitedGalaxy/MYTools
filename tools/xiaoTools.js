const validate = require('validate.js');

const debounceFun = function (fun, delay) {
  var symbol = '';
  var context = '';
  var args = '';
  return function () {
    if (symbol) {
      clearTimeout(symbol);
    }
    context = this;
    args = arguments;
    
    symbol = setTimeout(function () {
      fun.apply(context, args);
    }, delay);
  }
};

/*
* .limit words
* changeWords
* @param {String} words
* @param {Number} limit
* @param {function} process [process the words further]
* @return {String} words
* */
function changeWords(words, limit, process) {
  var temp = words;
  if (temp.length > limit) {
    temp = temp.slice(0, limit) + '...';
  }
  temp = process && typeof process === 'function' ? process(temp): temp;
  return temp;
}
// var test = 'sffajjfajfasjjsf';
// console.log(changeWords(test, 4, function (str) {
//   return str.replace(/f(a)/, function (match, $1) {
//     console.log(arguments);
//     return '<span>' + $1 + '</span>';
//   });
// }));

/**
 * isEmptyDeep [check if it empty deeply]
 * @param {}  [description]
 * @return {boolean} []
 */
function isEmptyDeep() {

}

/**
 *  [description ]
 * @param obj{Object}  []
 * @param path{String}  [path]
 * @return result{Boolean}  [true为存在，false为不存在]
 */
/*
* .reduce((ac, key, index) => {
      ac.push((ac[index - 1] || '') + key);
      return ac;
    }, [])
* */
function isHasProperty(obj, path) {
  try {
    return path.split('.').reduce((acInfo, key) => {
      if (acInfo.judge) {
        acInfo.judge = acInfo.refer.hasOwnProperty(key);
        acInfo.refer = acInfo.refer[key];
      } else {
        acInfo.judge = false;
      }
      return acInfo
    }, { refer: obj, judge: true}).judge;
  } catch (e) {
    return false;
  }
}

