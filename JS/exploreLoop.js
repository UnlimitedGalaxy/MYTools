const testArray = [true, false, false];
const obj = {'a': '', length: ''};

/*
* for of 循环
* */
let obj2 = {
  count: 0,
  [Symbol.iterator]: function() {
    return {
      next: () => {
        this.count++;
        return {
          value: this.count,
          done: this.count > 10
        }
      }
    }
  }
}

for (let value of obj) {
  console.log('value', value);
}

/*
* for in 循环
* */


/*
while 循环
**/
// const arr = [1, 2, 3];
// let iterate = arr.length;
// // 完成了两步：1. 判断iterate是否为0 2. 将iterate减1
// while (iterate--) {
//   console.log('while', arr[iterate]);
// }
