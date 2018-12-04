/*
  guess
* @description
* @demand
*  1. 可以层层包裹
*  2. 输入的是一个数组
* @param {array} arr [数组里面的function应该是有要求的]
* @return {function} fun
* @guess function(insert) {return function(){insert()}}
* */

function applyMiddleWare(arr) {
 return arr.reduce((iterator, item ) => {
  return item(iterator);
 }, function(){console.log('middle 1');});
}

const arr = [
	function(insert) {return function(){console.log('second before'); insert(); console.log('second after');}},
	function(insert) {return function(){console.log('third before'); insert(); console.log('third after');}},
	function(insert) {return function(){console.log('forth before'); insert(); console.log('forth after');}},
	function(insert) {return function(){console.log('fifth before'); insert(); console.log('fifth after');}},
]

applyMiddleWare(arr)();

/*
* @reality
* @param {function} func [可以随意增加param数量] [最终也会合成一个数组] [function(...arr){}]
* @return {object} res [store的对象] [它有getState、dispatch、subscribe等]
* @param的function
*  function({ dispatch, getState }){}
*  example:
*  ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
* */

/*
* @procedure
* 1. 在createStore的阶段这行了中间件，封印了{ dispatch, getState } 得到
*   next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  }
  2. 在compose的阶段，封印了下一个中间件
   action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  }
  3. 在用户dispatch的依次执行中间件
* */