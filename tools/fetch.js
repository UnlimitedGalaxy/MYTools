'use strict';
const rp = require('request-promise');

/*
	fetch 默认参数配置，可在这里统一配置代理服务器请求格式
*/
const defaultOpts = {
  json: true,
  // transform(body, response) {
  //   // console.log('body, response, resolveWithFullResponse', body, response, resolveWithFullResponse);
		// console.log('typeof body', typeof body);
		// console.log('typeof response', typeof response);
  //   // return {a: 'a'};
		// throw new Error('error');
		// return body;
  // },
};

function handleError(res) {
  if (Object.prototype.toString.call(res) !== '[object Object]') {
    throw new Error('返回结果不是json结构');
  }
  // if (res.errorCode) {
  //   const message = kuaiyuErrorCode[res.errorCode] || '';
  //   throw new Error(message);
  // }
  return res;
}

/*
 * GET [get 请求]
 * @param url { String } 请求URL
 * @param qs { Object } qs
 * @param options { Object } request请e求的配置
 * @return { Promise Object }
 */
function GET({uri, qs, options}) {
  let innerOptions = Object.assign({
    uri: uri,
    qs: qs || {},
  }, defaultOpts);
  if (options && Object.prototype.toString.call(options) === '[object Object]') {
    innerOptions = Object.assign({}, innerOptions, options);
  }
  // console.log('final options', innerOptions);
  
  return rp(innerOptions)
	
}

/*
 * POST [POST 请求]
 * @param uri { String } 请求URL
 * @param qs { Object } qs
 * @param body { Object } body
 * @param options { Object } request请e求的配置
 * @return { Promise Object }
 */
function POST({uri, qs, body, options}) {
  let innerOptions = Object.assign({
    uri: uri,
    qs: qs || {},
    body: body || {},
    method: 'POST',
  }, defaultOpts);
  
  if (options && Object.prototype.toString.call(options) === '[object Object]') {
    innerOptions = Object.assign({}, innerOptions, options);
  }
  
  return rp(innerOptions);
}

/*
 * PATCH [PATCH 请求]
 * @param uri { String } 请求URL
 * @param qs { Object } qs
 * @param body { Object } body
 * @param options { Object } request请e求的配置
 * @return { Promise Object }
 */
function PATCH(uri, qs, body, options) {
  let innerOptions = Object.assign({
    uri: uri,
    qs: qs || {},
    body: body || {},
    method: 'PATCH',
  }, defaultOpts);
  
  if (options && Object.prototype.toString.call(options) === '[object Object]') {
    innerOptions = Object.assign({}, innerOptions, options);
  }
  
  return rp(innerOptions);
}

/*
 * PUT [PUT 请求]
 * @param uri { String } 请求URL
 * @param qs { Object } qs
 * @param body { Object } body
 * @param options { Object } request请e求的配置
 * @return { Promise Object }
 */
function PUT(uri, qs, body, options) {
  let innerOptions = Object.assign({
    uri: uri,
    qs: qs || {},
    body: body || {},
    method: 'PUT',
  }, defaultOpts);
  
  if (options && Object.prototype.toString.call(options) === '[object Object]') {
    innerOptions = Object.assign({}, innerOptions, options);
  }
  
  return rp(innerOptions);
}

/*
 * DELETE [DELETE 请求]
 * @param uri { String } 请求URL
 * @param qs { Object } qs
 * @param body { Object } body
 * @param options { Object } request请e求的配置
 * @return { Promise Object }
 */
function DELETE(uri, qs, body, options) {
  let innerOptions = Object.assign({
    uri: uri,
    qs: qs || {},
    body: body || {},
    method: 'DELETE',
  }, defaultOpts);
  
  if (options && Object.prototype.toString.call(options) === '[object Object]') {
    innerOptions = Object.assign({}, innerOptions, options);
  }
  
  return rp(innerOptions);
}
/*
73a39bd6828e403299d6f9c8c754e506a3914b00
44f2f337e4594ed49cb45352fe6877000e70ca00
* */

// GET({
//     uri: `https://zhidao.baidu.com/question/689091852871911364.html`,
//     // qs: param,
//     qs: { biz_id: 1014, data_permission: 'material_management' },
//     options: {
//       headers: {},
//     },
//   })
//   .then(res => {
//     console.log('res', res);
//     return [];
//   })
//   .catch((e) => {
//     console.log('error', e.message);
//     return [];
//   });

/*
错误信息模板
{
  "name": "StatusCodeError",
  "statusCode": 404,
  "message": "404 - undefined",
  "options": {
    "uri": "http://image.uc.cn/o/uop/1Ht08/;;0,uop/g/uop/avatar/18111017506f60e8bb13dd1c01a4ca49c914da308fx50x50x2.jpg;3,160",
    "qs": {},
    "json": true,
    "simple": true,
    "resolveWithFullResponse": false,
    "transform2xxOnly": false
  },
  "response": {
    "statusCode": 404,
    "headers": {
      "server": "Tengine",
      "content-type": "text/plain",
      "content-length": "0",
      "connection": "close",
      "date": "Wed, 21 Nov 2018 03:56:24 GMT",
      "vary": "Accept-Encoding, Accept-Encoding",
      "via": "cache10.l2cm9[50,404-1280,M], cache16.l2cm9[51,0], cache6.cn201[66,404-1280,M], cache2.cn201[67,0]",
      "x-swift-error": "orig response 4XX error, orig response 4XX error",
      "ali-swift-global-savetime": "1542772584",
      "x-cache": "MISS TCP_MISS dirn:-2:-2",
      "x-swift-savetime": "Wed, 21 Nov 2018 03:56:24 GMT",
      "x-swift-cachetime": "1",
      "age": "66",
      "timing-allow-origin": "*",
      "eagleid": "2a786b0215427725845121874e"
    },
    "request": {
      "uri": {
        "protocol": "http:",
        "slashes": true,
        "auth": null,
        "host": "image.uc.cn",
        "port": 80,
        "hostname": "image.uc.cn",
        "hash": null,
        "search": null,
        "qs": null,
        "pathname": "/o/uop/1Ht08/;;0,uop/g/uop/avatar/18111017506f60e8bb13dd1c01a4ca49c914da308fx50x50x2.jpg;3,160",
        "path": "/o/uop/1Ht08/;;0,uop/g/uop/avatar/18111017506f60e8bb13dd1c01a4ca49c914da308fx50x50x2.jpg;3,160",
        "href": "http://image.uc.cn/o/uop/1Ht08/;;0,uop/g/uop/avatar/18111017506f60e8bb13dd1c01a4ca49c914da308fx50x50x2.jpg;3,160"
      },
      "method": "GET",
      "headers": {
        "accept": "application/json"
      }
    }
  }
}
* */

module.exports = {
  POST,
  GET,
  PATCH,
  PUT,
  DELETE,
};

