
/*
数组转换对象
**/
let arr = ['a', 'b'];
let arrIntoObj = Object.assign({}, arr);

/*
* explore JSON.stringify
* */
let test = {a: 'a', b: 'b'};
JSON.stringify(test, function(key, value) {
  console.log('key: ', key, ',value: ', value);
})
function replacer(key, value) {
  // Filtering out properties
  console.log('key: ', key, ',value: ', value);
  if (typeof value === 'string') {
    return undefined;
  }
  return value;
}

var foo = {foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7};
JSON.stringify(foo, replacer);
