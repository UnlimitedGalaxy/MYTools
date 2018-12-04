
const props = {
  target: 0,
  speed: 500,
}
const inner = {
  speedUp: 200,
}
const state = {
  percent: 0,
  speed: props.speed
};

const test = function() {
  return setTimeout(() => {
    if (state.percent >= 100) {
      return null;
    }
    if (state.percent >= props.target) {
      state.speed = props.speed;
    } else {
      state.speed = inner.speedUp;
    }
    state.percent += 20;
    console.log('hello speed', state.speed);
    console.log('hello percent %s \n', state.percent);
    test();
  }, state.speed);
}

setTimeout(() => {
  props.target = 50;
}, 800);

setTimeout(() => {
  props.target = 50;
}, 1600)

test();
