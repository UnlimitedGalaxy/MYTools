/*
* cookie example:
*
* _UP_L_=zh; _UP_A4A_11_=wb70e17b175b4045b4a26879827b8ecb; Hm_lvt_c337010bc5a1154d2fb6741a4d77d226=1531202152; __utma=228792728.365707046.1531202153.1531202153.1531202153.1; __utmc=228792728; __utmz=228792728.1531202153.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); Hm_lpvt_c337010bc5a1154d2fb6741a4d77d226=1531202654; token=0a4ecdd6f2b44e9bb5390cb0f31e20000e70ca00; token.sig=KG1FpN-3Cr8Z-uq33GK__Ubz1V0fYoIpfKx8JANYO-0; ugcVersion=V1.7.7
* */


/**
 * getCookie [获取写入的token]
 * @param {string} keyName [cookie所对应得key名]
 * @return {String} value [写入的value]
 * TODO 多个同样值得情况可以优化一下
 */
function getCookie(keyName) {
  const reg = new RegExp(`(?:^| )${keyName}=([^;]+)(?:$|;)`);
  const str = document.cookie;
  
  let value = str.match(reg);
  if (value) {
    value = value[1];
  }
  return value;
}

/*
* 前面为单位标示，后面为数值
* 返回秒数
* @param {string|number} 数值[如：d12,12等]
* */
function getSec(str) {
  if ((typeof str === 'string' && str.length > 0) || typeof str === 'number') {
    // 如果直接是一个数值以月为单位返回
    if (!isNaN(new Number(str))) {
      return str * 24 * 60 * 60 * 1000 * 30;
    }
    let str1 = str.substring(1, str.length) * 1;
    let str2 = str.substring(0, 1);
    // 如果是空值返回为空
    if (isNaN(new Number(str1))) {
      return 0;
    }
    // second
    if (str2 === 's') {
      return str1 * 1000;
      // hour
    } else if (str2 === 'h') {
      return str1 * 60 * 60 * 1000;
      // day
    } else if (str2 === 'd') {
      return str1 * 24 * 60 * 60 * 1000;
      // month
    } else if (str2 === 'm') {
      return str1 * 24 * 60 * 60 * 1000 * 30;
      // year
    } else if (str2 === 'y') {
      return str1 * 24 * 60 * 60 * 1000 * 30 * 365;
      // 什么都不是，返回0
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

/**
 * setCookie [添加cookie]
 * @param {string} keyName [键值名]
 * @param {string/number} value [键值]
 * @param {string} path []
 * @return {string} keyName [description]
 */
function setCookie(keyName, value, path, time) {
  let str = `${keyName}=${value};path=${path || '/'}`;
  if (time) {
    let finalTime = new Date(Date.now() + getSec(time));
    // 转换为格林治时
    str += `;expires=${finalTime.toGMTString()}`;
  }
  document.cookie = str;
}

/**
 * deleteCooke [eliminate cookie]
 * @param {string} keyName [所要删除的键值名]
 * @param {string} path [要删除的cookie的路径, 如果要删除的cookie有路径信息，需要指定相关路径]
 * @return {}  [description]
 */
function deleteCookie(keyName, path) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(keyName);
  if (cval) {
    document.cookie = `${keyName}=${cval};path=${path || '/'};expires=${exp.toGMTString()}`;
  }
}

export default {
  getCookie,
  setCookie,
  deleteCookie,
};
