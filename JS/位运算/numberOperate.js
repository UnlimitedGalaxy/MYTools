/*
* Number.prototype.toFixed
* @param {Number} length //可以是小数，但应该是只取整数位
* @return {String} res 四舍五入
* @error RangeError range is between 0 and 100
* @detail
*  1. 银行家舍入：所谓银行家舍入法，其实质是一种四舍六入五取偶（又称四舍六入五留双）法
*  2. 四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一
*  3. 对于五的处理方法有异常
*  4. 它是定义在prototype上的方法
* */
let testNum = 0.215;
let result = testNum.toFixed(2);
// console.log('result: ', typeof result, result);
/*
解决方案 scheme
* */
Number.prototype.toFixed = function(length) {
  let carry = 0; //存放进位标志
  let num,multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
  let str = this + ''; //将调用该方法的数字转为字符串
  let dot = str.indexOf("."); //找到小数点的位置
  if(str.substr(dot+length+1,1)>=5) carry=1; //找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
  multiple = Math.pow(10,length); //设置浮点数要扩大的倍数
  num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
  let result = num/multiple + ''; //将进位后的整数再缩小为原浮点数
  /*
  * 处理进位后无小数
  */
  dot = result.indexOf(".");
  if(dot < 0){
    result += '.';
    dot = result.indexOf(".");
  }
  /*
  * 处理多次进位
  */
  let len = result.length - (dot+1);
  if(len < length){
    for(let i = 0; i < length - len; i++){
      result += 0;
    }
  }
  return result;
}

/*
* Number.round
* @param {Number} number //可以是小数，但应该是只取整数位
* @return {Number} res 四舍五入
* @detail
*  1. 不能精确位数，进行四舍五入
* */
let testRound = 0.5;
let resultRound = Math.round(testRound);
console.log('result: ', typeof resultRound, resultRound);
