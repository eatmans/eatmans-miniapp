const install = (Vue, vm) => {
	
	Vue.prototype.$t = {
		// 测试方法
		toUpperCase(msg){
			return msg && msg.toUpperCase();
		}
	}
	
}

export default {
	install
}
