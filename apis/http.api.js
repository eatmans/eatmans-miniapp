// common/http.api.js

import * as user from './modules/user.js';
import * as activity from './modules/activity.js';
// api 接口管理
const install = (Vue, vm) => {

	Vue.prototype.$api  = {
		// test get api
		getSearch: (params = {}) => vm.$u.get('/http/search', params),
		// test get loading
		getReqLoading: (params = {}) => vm.$u.get('/http/reqloading', params),
		// modules import
		user,
		activity
		
	};
}

export default {
	install
}
