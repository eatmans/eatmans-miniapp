import Vue from 'vue';
let vm = new Vue();

export function getList(params) {
	return vm.$u.get('/activity/list', params)
}

export function getOne(params) {
	return vm.$u.get('/activity', params)
}

export function add(params) {
	return vm.$u.post('/activity', params)
}

export function remove(params) {
	return vm.$u.post('/activity', params)
}


export function update(params) {
	return vm.$u.post('/activity/update', params)
}
export function postSiguUp(params) {
	return vm.$u.post('/activity/siguUp', params)
}
