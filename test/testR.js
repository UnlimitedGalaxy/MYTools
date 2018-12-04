const R = require('ramda');
const evolve = R.evolve;
const authorName = '作者名';

const temp = [
  [{label: '作者名'}, {b: 'b'}, {c: 'c'}]
];

let authorObj = R.compose(
  function({ x, y }) {
		return temp[x]? temp[x][y] : {};
  },
  function(authorName) {
  	const result = {
  		x: '',
			y: '',
		};
  
		temp.forEach((i, index) => {
			result.y = i.findIndex(innerItem => {
				return innerItem.label === authorName;
			});
      if (result.y !== -1) {
				result.x = index;
      }
		});
		
		return result;
  }
)(authorName);

console.log(authorObj === temp[0][0]);
