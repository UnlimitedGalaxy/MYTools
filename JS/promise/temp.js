let counter = 1;
const createPromise = function(time = 500) {
  console.log('promise counter: ', counter ++);
  return new Promise((resolve)=> setTimeout(resolve, time));
};

exports.createPromise = createPromise;

// createPromise()
//   .then(() => {
//     console.log('hello');
//   });
