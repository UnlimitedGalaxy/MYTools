var Obj = {
  a: 'a',
  b: 'b',
  c: {
    f: 'f',
    c: {
      j: 'j'
    }
  },
  f: [{a: 'a'}, {b: 'b'}, {c: 'c'}]
};

// var temp = Object.create(Obj);
// temp.c = 'c';

/*
* it'll iterate the properties of prototype
* */
// function method1(obj) {
//   for (let key in obj) {
//     console.log(key);
//   }
// }

function isPainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/*
* it'll iterate nothing but its own properties
* */
function method1(obj) {
  Object.keys(obj).forEach((i) => {
    if (isPainObject(obj[i])) {
      method1(obj[i]);
    } else {
      console.log(obj[i]);
    }
  });
}

// method1(Obj);

function method2(obj) {
  const stack = [obj];
  while (stack.length) {
    let temp = stack.pop();
    Object.keys(temp).forEach((i) => {
      if (isPainObject(temp[i]) || Array.isArray(temp[i])) {
        stack.push(temp[i]);
      } else {
        console.log(temp[i]);
      }
    });
  }
}

method2(Obj);