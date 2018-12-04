
const bifurcate = (arr, conditions) => arr.reduce((group, item, index) => (group[conditions[index] ? 0 : 1].push(item), group), [[], []]);

console.log(bifurcate([1, 2, 3], [true, true, false]));
// => [[1, 2], [3]]
