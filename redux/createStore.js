/*
* @description:
* 1. 提供dispatch方法来用来管理state的
* 2. 提供subscribe 来监听state的变化
* 3.
*
* @param {function} reducer [用于生成新的state]
* @return {obj} [包含subscribe和dispatch]
* */

function createStore(reducer) {
	const listeners = [];
	let state = {};
	
	const dispatch = function(action) {
		state = reducer(state, action);
		listeners.forEach(l=>l());
	};
	
	const getState = () => state;
	
	const subscribe = function(listen) {
		listeners.push(listen);
		return () => {
			listeners.filter(item => item !== listen);
		};
	};
	
	dispatch({});
	
	return {
		dispatch,
		subscribe,
		getState,
	};
}

