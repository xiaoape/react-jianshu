import * as constants from './constants';
import { fromJS } from 'immutable';

// 将普通对象变成immutable对象
const defaultState = fromJS({
	focused: false,
	// 这是控制推荐信息的标志位
	mouseIn: false,
	list: [],
	page: 1,
	totalPage: 1
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SEARCH_FOCUS:
			// immutable对象的set方法，会结合之前immutable对象的值
			// 和设置的值，返回一个全新的对象
			return state.set('focused', true);
		case constants.SEARCH_BLUR:
			return state.set('focused', false);
		case constants.CHANGE_LIST:
			// merge方法可以同时改变多个数据，避免一次要改变很多数据要使用很多个set
			return state.merge({
				list: action.data,
				totalPage: action.totalPage
			});
		case constants.MOUSE_ENTER:
			return state.set('mouseIn', true);
		case constants.MOUSE_LEAVE:
			return state.set('mouseIn', false);
		case constants.CHANGE_PAGE:
			return state.set('page', action.page);
		default:
			return state;
	}
}