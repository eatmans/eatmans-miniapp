// common/http.interceptor.js

import config from '@/common/config.js';

const codeMessage = {
	404: '您所请求的资源无法找到',
	500: '服务器内部错误，无法完成请求',
};

const install = (Vue, vm) => {

	// 这个配置是一次配置，全局通用的，具体参数见 https://www.uviewui.com/js/http.html
	Vue.prototype.$u.http.setConfig({
		baseUrl: config.baseUrl, // 请求的本域名
		method: '',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: '',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '正在加载', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: true, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {},
	});

	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;

		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		const token = uni.getStorageSync('token');
		config.header.Authorization = token;
		// config.header.Token = 'xxxxxx';

		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if (config.url == '/user/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}

	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {

		// if 状态码是否正常
		if (res.statusCode == 200) {
			let result = res.data;
			// if 与后台规定的成功码是否正常
			if (result.code == 200) {
				return result.result || result.data;
			} else if (result.code == 300) {
				vm.$u.toast('未登录!');
			} else {
				vm.$u.toast(result.desc);
			}
		} else {
			let errorMessage = codeMessage[res.statusCode] ? codeMessage[res.statusCode] : res.statusCode;
			vm.$u.toast(errorMessage);
		}
		return false;
	}
}

export default {
	install
}
