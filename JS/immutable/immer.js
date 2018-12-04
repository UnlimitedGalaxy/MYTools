const immer = require('immer');
const createData = require('../../tools/utils').createData;
const assert = require('assert');
const equal = assert.equal;
const notEqual = assert.notEqual;

const baseState = [
  {
    todo: "Learn typescript",
    done: true
  },
  {
    todo: "Try immer",
    done: false
  }
]

const nextState = immer.produce(baseState, draftState => {
  // 直接去修改，不用解构，不用assign，amazing
  draftState.push({todo: "Tweet about it"})
  draftState[1].done = true
});

//
const testFun = immer.produce(draftState => {
  // 直接去修改，不用解构，不用assign，amazing
  draftState.push({todo: "Tweet about it"})
  draftState[1].done = true
})

nextState[0] = {};
debugger;
// the new item is only added to the next state,
// base state is unmodified
equal(baseState.length, 2)
equal(nextState.length, 3)

// same for the changed 'done' prop
equal(baseState[1].done, false)
equal(nextState[1].done, true)

// unchanged data is structurally shared
equal(nextState[0], baseState[0])
notEqual(nextState, baseState)
// changed data not (dûh)
notEqual(nextState[1], baseState[1]);

/*
* conclusion
* 1. draft是需要被调整，而不是被赋值
* 2. 思想就是只调整该调整的，并且返回一个新的对象
* 3. 主要思想就是先在currentState基础上生成一个代理draftState，之后的所有修改都会在draftState上进行，避免直接修改currentState，而当修改结束后，再从draftState基础上生成nextState。所以整个过程只涉及三个State：currentState（输入状态），draftState（中间状态），nextState（输出状态）；关键是draftState是如何生成，如何应用修改，如何生成最终的nextState。
*   - 在这produce告诉应该如果修改
* */
