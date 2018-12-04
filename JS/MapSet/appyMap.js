const testMap = new Map([
  [ {a: 'a', b: 'b'}, 1 ]
]);

/*
* conclusion
* 1.不要把map想象成一个对象
* */
let result = [...testMap].filter(([key, value]) => {
  return key.a === 'a' && key.b === 'b';
});
let value = result ? result[0][1] : null;
console.log('result', value);

/*
* 条件判断
* 来源：https://juejin.im/post/5bdfef86e51d453bf8051bf8?utm_source=gold_browser_extension
* */
const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  const functionC = ()=>{/*send log*/}
  return new Map([
    [/^guest_[1-4]$/,functionA],
    [/^guest_5$/,functionB],
    [/^guest_.*$/,functionC],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
  action.forEach(([key,value])=>value.call(this))
}
