/*
* define buffer
1. 它是Uint8Array的抽象
2. 意思是缓存区，暂时存放输入输出的一段内存
3. 它存储的是二进制信息
function:
1. enable interaction with stream
feature：
1. 一旦定义后，大小固定
* */

/*
* 形式1
Buffer.from(string[, encoding])
string <string> A string to encode.
encoding <string> The encoding of string. Default: 'utf8'.
* */
let str = 'af';
let result = Buffer.from(str, '');
console.log('result: ', result);
