/*
* debounce 防抖：将多个同时触发的信号，只取最后一个信号来触发
* 节流throttle： 让之前高频的操作变成 只能在间隔一定时候后才能触发
*   -- 前一个触发后，等一段时间后，再触发后一个
*
* */


function debounce(func, delay) {
  var timeout;
  return function (e) {
    console.log("清除", timeout, e.target.value)
    clearTimeout(timeout);
    var context = this, args = arguments
    console.log("新的", timeout, e.target.value)
    timeout = setTimeout(function () {
      console.log("----")
      func.apply(context, args);
    }, delay)
  };
}

function throttle(fn, threshold) {
  var timeout
  var start = new Date;
  var threshhold = threshhold || 160
  return function () {
    
    var context = this, args = arguments, curr = new Date() - 0
    
    clearTimeout(timeout)//总是干掉事件回调
    if(curr - start >= threshhold){
      console.log("now", curr, curr - start)//注意这里相减的结果，都差不多是160左右
      fn.apply(context, args) //只执行一部分方法，这些方法是在某个时间段内执行一次
      start = curr
    }else{
      //让方法在脱离事件后也能执行一次
      timeout = setTimeout(function(){
        fn.apply(context, args)
      }, threshhold);
    }
  }
}

/*
* in a nutshell
* 1. the trigger time：
*   - debounce： this fn have to wait for a period of time and there isn't another trigger, then it can trigger
*   - throttle: the last one or the one of the all triggers
*
* */
