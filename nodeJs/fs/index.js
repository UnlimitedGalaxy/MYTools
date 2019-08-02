const fs = require('fs')
/*
* Resource:
* . https://blog.csdn.net/seaalan/article/details/89100839
* */
/*
* fs.realpathSync(path[, options])
@param
path <string> | <Buffer> | <URL>
options <string> | <Object>
  encoding <string> Default: 'utf8'
@Returns: <string> | <Buffer>

analysis:
1. 如果不是真实的路径会出现异常
* */
// console.log('current parent dir: ', process.cwd());
// const appDirectory = fs.realpathSync('../file');
// console.log('appDirectory: ', appDirectory);

/*
* fs.realpath(path[, options], callback)
path <string> | <Buffer> | <URL>
options <string> | <Object>
  encoding <string> Default: 'utf8'
callback <Function>
  err <Error>
  resolvedPath <string> | <Buffer>
@result: null

analysis:
1. 用起来的感觉跟path.resolve差不多
2. 没有result，也不需要result
* */
// fs.realpath('../3', function (err, resolvedPath) {
//   console.log('err', err);
//   console.log('resolvedPath', resolvedPath);
// })


/*
* . readFileSync({string}path)

    - @param path {string}

    - @param options {object}

    - @return string[]
* */
const result = fs.readdirSync('../file');
console.log('readFileSync result', result); // [ 'index.js' ]

function writeFile() {
  console.log("写入开始。");
  // 同步读取
  var data = fs.writeFileSync('write1.txt', '我是被写入的内容1！');
  var writeData1 = fs.readFileSync('write1.txt', 'utf-8');
  console.log("同步读取写入的内容1: " + writeData1.toString());
  // 异步读取
  fs.writeFile('write2.txt', '我是被写入的内容2！', function (err) {
    if (err) {
      return console.error(err);
    }
    var writeData2 = fs.readFileSync('write2.txt', 'utf-8');
    console.log("同步读取写入的内容2: " + writeData2.toString());
  });
  console.log("写入结束。");
}
