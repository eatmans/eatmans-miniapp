import Vue from 'vue';
import config from '@/common/config.js';
let vm = new Vue();

export default {
	loginFun() {
		wx.getUserProfile({
			desc: '用于完善会员资料',
			success: userPro => {
				wx.login({
					success: function(login_res) {
						wx.request({
							url: config.baseUrl + '/user/login',
							method: 'POST',
							data: {
								code: login_res.code, //临时登录凭证
								rawData: userPro.rawData, //用户非敏感信息
								signature: userPro.signature, //签名
								encrypteData: userPro.encryptedData, //用户敏感信息
								iv: userPro.iv //解密算法的向量
							},
							success: function(res) {
								if (res.statusCode == 200) {
									uni.setStorageSync('userInfo', res.data);
									vm.$u.vuex("emx_userInfo", res.data);
									vm.$u.vuex("emx_uid", res.data.id);
									uni.setStorageSync('token', res.header
										.Authorization);
									vm.$u.vuex("emx_token", res.header
										.Authorization);
									uni.setStorageSync('skey', res.data.skey);
									vm.$u.vuex("emx_hasLogin", true)
									uni.showToast({
										title: '登录成功'
									});
								} else if (res.statusCode == 500) {
									vm.$u.vuex("emx_hasLogin", false);
									uni.showToast({
										title: '服务器异常！',
										icon: "none",
										duration: 5000
									});
								} else {
									vm.$u.vuex("emx_hasLogin", false);
									uni.showToast({
										title: '服务器异常',
										icon: "none",
										duration: 3000
									});
								}
							},
							fail: function(error) {
								vm.$u.vuex("emx_hasLogin", false);
								uni.showToast({
									title: '网络错误',
									icon: "none",
									duration: 3000
								});
							}
						})
					}
				});
			}
		})
	}

}
