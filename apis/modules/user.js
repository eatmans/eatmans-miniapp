import Vue from 'vue';
let vm = new Vue();


export function getUserInfo(params){
	return vm.$u.get('/user/getUserInfo', params)
}


export function postGoodsInfo(params){
	return vm.$u.post('/user/goodInfos', params)
}