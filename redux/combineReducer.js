/*
* @demand
* 1. 输入一个对象
* 2. 产出一个reduce方法
* @param {obj} obj [{a: func}] func(info, action)
* @return {function} reducer [要得到也是func(info, action)]
* */

function combineReducer(reducersObj) {
	return function(state, action) {
		const { type, payload } = action;
		return reducersObj.keys.reduce((iterator, key) => {
			iterator[key] = reducersObj[key](state[key]);
		}, {});;
	}
}