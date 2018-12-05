function colorRGB2Hex(color) {
  // if (!~color.indexOf('rgb(')) {
  //   return new Error('color must be a agb format');
  // }
  
  let rgb = color.split(',');
  // let r = parseInt(rgb[0].split('(')[1]);
  let r = 'f';
  console.log((parseInt(r)).toString(2))
  let g = parseInt(rgb[1]);
  let b = parseInt(rgb[2].split(')')[0]);
  
  // let hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16);
  let hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}

function clearEmptyElements(str) {
  const reg = /<(span|a|p)[^>]*?><\/(span|a|p)>/;
  debugger;
  if (reg.test(str)) {
    str = str.replace(reg, '');
    return clearEmptyElements(str);
  } else {
    return str;
  }
}

  `<a href="http://www.baidu.com" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(38, 150, 255);">联系客服&gt;</a>`.replace(/<a[^>]+? \bcolor\b: (rgb.*?\)).*?<\/a/, function(match, p1) {
    debugger;
  })
// const testStr = `<p><span><a herf="http://www.baidu.com"></a></span></p>I am happy`;
// console.log(clearEmptyElements(testStr));
// console.log(colorRGB2Hex('rgb(255, 255, 255)'));

/*
* https://g.alicdn.com/UGC/ugc-admin-plat-web/1.9.4/1.1.js
* https://g-assets.daily.taobao.net/UGC/ugc-admin-plat-web/1.9.4/1.1.js
* */
