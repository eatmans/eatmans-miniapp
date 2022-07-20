<template>
	<view class="c-container">
		<view class="c-userinfo" v-if="!emx_hasLogin">
			<button class="c-login-button" @tap="userAuthorized()">授权登录</button>
		</view>
		<view class="c-userinfo" v-else>
			<image class="c-avator" :src="emx_userInfo.avatarUrl" mode=""></image>
			<view class="c-user-info-more">
				<text class="c-nick-name">{{emx_userInfo.nickName}}</text>
				<!-- <view class="c-user-status" @click="showVerify = true">状态：{{ Verify  ? '已认证' : '未认证'}}</view> -->
			</view>
		</view>

		<view class="c-tools-box">
			<view class="c-tools-item" @click="gotoPage('../myJielong/myJielong')">
				<view class="">
					{{userIndex.jielongNum}}
				</view>
				<view class="c-tools-text">
					我的接龙
				</view>
			</view>

			<view class="c-tools-item" @click="gotoPage('../myCollection/myCollection')">
				<view class="">
					{{userIndex.shoujianNum}}
				</view>
				<view class="c-tools-text">
					我的收件
				</view>
			</view>
			<view class="c-tools-item" @click="gotoPage('../notice/notice')">
				<view class="">
					{{userIndex.notieNum}}
				</view>
				<view class="c-tools-text">
					我的通知
				</view>
			</view>
		</view>

		<view class="c-button-list">

			<view class="c-button-item">
				<view class="c-button" @click="gotoPage('../roster/roster')">
					<u-icon name="order" :size="46"></u-icon> <span class="c-button-text">名单管理</span>
				</view>
			</view>
			<!-- 			<view class="c-button-item">
				<view class="c-button" @click="gotoPage('../myTemplate/myTemplate')">
					<u-icon name="order" :size="46"></u-icon> <span class="c-button-text">模板管理</span>
				</view>
			</view> -->
			<view class="c-button-item">
				<view class="c-button" @click="gotoPage('../guide/guide')">
					<u-icon name="eye" :size="46"></u-icon> <span class="c-button-text">使用说明</span>
				</view>
			</view>
			<view class="c-button-item">
				<view class="c-button" @click="gotoFaceback()">
					<u-icon name="question-circle" :size="46"></u-icon> <span class="c-button-text">反馈问题</span>
				</view>
			</view>
			<view class="c-button-item">
				<view class="c-button" @click="gotoAbout()">
					<u-icon name="thumb-up" :size="46"></u-icon> <span class="c-button-text">关于</span>
				</view>
			</view>
		</view>
		<view class="c-box" v-if="emx_hasLogin">
			<view class="c-button-item">
				<button class="c-button-logout" @click="logout()" v-if="emx_hasLogin">
					<u-icon name="minus-circle" :size="46"></u-icon> <span class="c-button-text">退出登录</span>
				</button>
			</view>
		</view>
		<view class="c-version">
			<text>
				版本v0.0.1bate
			</text>
		</view>

	</view>
</template>

<script>
	import config from '@/common/config.js';
	import loginLogic from "../../apis/modules/loginLogic.js";

	export default {
		data() {
			return {
				userProfile: null,
				userStatus: "正常",
				isEatmans: false,
				Verify: false,
				showVerify: false,
				verifyInfo: {
					realName: '',
					phone: '',
				},
				userIndex: {
					jielongNum: 0,
					shoujianNum: 0,
					notieNum: 0
				},
				userInfo: [],
				studentInfo: {
					"classCode": "",
					"className": "",
					"orgName": "",
					"phone": "",
					"stuName": "",
					"stuNo": "",
				},
			}
		},
		onLoad: function() {
			this.enableShareMenu();
		},
		onShow() {
			// this.judgeLoginStatus()
		},
		methods: {
			enableShareMenu() {
				wx.showShareMenu({
					withShareTicket: true,
					menus: ['shareAppMessage', 'shareTimeline']
				})
			},

			// 判断登录状态
			judgeLoginStatus() {
				// this.$api.user.getIndex({}).then(res => {
				// 	this.userIndex = res;
				// })
				let userInfo = uni.getStorageSync('userInfo');
				if (userInfo != null && userInfo != "") {
					this.$u.vuex("emx_hasLogin", true);
					this.$u.vuex("emx_userInfo", userInfo);
					this.$u.vuex("emx_uid", userInfo.id);
					this.userInfo = userInfo;
					if (userInfo.nickName == "EATMANS") {
						this.isEatmans = true;
					}
				}
			},
			gotoPage(pageUrl) {
				uni.navigateTo({
					url: pageUrl,
					success: res => {},
				});
			},

			// 退出登录
			logout() {
				this.$u.vuex("emx_hasLogin", false);
				this.$u.vuex("emx_userInfo", []);
				this.$u.vuex("emx_token", "");
				uni.removeStorageSync('userInfo');
			},

			userAuthorized() {
				loginLogic.loginFun();
				this.judgeLoginStatus();
			},
			submitVerify() {

			},
			gotoFaceback() {
				uni.navigateTo({
					url: '../faceback/faceback',
					success: res => {},
				});
			},
			gotoInternshipSchedul() {
				uni.navigateTo({
					url: '../internshipSchedul/internshipSchedul',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			gotoGuide() {
				uni.navigateTo({
					url: '../guide/guide',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			gotoAbout: function() {
				uni.navigateTo({
					url: '../about/about',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style coped lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.c-container {
		margin-left: 2%;
		margin-right: 2%;
	}

	.c-box {
		background-color: #F8F8F8;
		padding: 20rpx 0;
		margin: 10rpx 20rpx;
		border-radius: 25rpx;
	}

	.c-login-button {
		width: 80%;
		background-color: #2979ff;
		color: #F1F1F1;
		border-radius: 45rpx;
	}

	.c-userinfo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 20rpx;
		padding: 20rpx;
		height: 300rpx;
		border-radius: 45rpx;
		background-color: #FFFFFF;
		color: #000000;
		font-size: 1.5em;
	}

	.c-user-info-more {
		margin: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.c-nick-name {
			font-size: 35rpx;
			font-weight: bold;
		}

		.c-user-status {
			display: inline-block;
			border-radius: 20rpx;
			padding: 10rpx;
			font-size: 25rpx;
			margin: 10rpx 10rpx;
			background-color: #2979ff;
			color: #FFF;
		}
	}



	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.c-avator {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
	}

	.c-list {
		margin: 20rpx;
	}

	.c-button-list {
		margin: 20rpx;
		padding: 10rpx 0;
		border-radius: 20rpx;
		background-color: #F8F8F8;
	}

	.c-button-item {
		margin: 10rpx;
	}


	.c-button {
		display: flex;
		border-radius: 45rpx;
		align-items: center;
		font-size: 35rpx;
		height: 80rpx;
		padding: 0;
		color: #393B44;
		background-color: #FFFFFF;
		border: 2rpx solid #FFFFFF;
		padding-left: 20rpx;
	}

	.c-button-code {
		display: flex;
		align-items: center;
		font-size: 35rpx;
		height: 80rpx;
		padding: 0;
		background-color: #FFFFFF;
		border: 2rpx solid #FFFFFF;
		border-radius: 45rpx;
		padding-left: 20rpx;
	}

	.c-button-login {
		color: #FFF;
		background-color: #2979ff;
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		font-size: 35rpx;
		height: 80rpx;
		border: 1rpx;
		padding: 0;
		padding-left: 20rpx;
	}

	.c-button-logout {
		color: #FFF;
		background-color: #fa3534;
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		font-size: 35rpx;
		height: 80rpx;
		border: 1rpx;
		padding: 0;
		padding-left: 20rpx;
	}

	.c-xiushi {
		display: block;
		width: 10rpx;
		height: 100%;
		background-color: #F8F8F8;
		margin-right: 10rpx;
	}


	.c-button-text {
		margin-left: 10rpx;
		// color: #393B44;
	}

	.c-tools-box {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 20rpx;
		border-radius: 20rpx;
		background-color: #F8F8F8;

		.c-tools-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 10rpx;
			height: 125rpx;
			width: 280rpx;
			margin: 10rpx;
			border-radius: 20rpx;
			background-color: #FFFFFF;
		}

		.c-tools-text {
			display: flex;
		}

	}


	.c-version {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #c8c9cc;
	}

	.c-popup-box {
		padding: 30rpx 20rpx;

		.c-header {
			font-size: 35rpx;
			color: #393E46;
		}

		.c-item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin: 10rpx 0;
			padding: 10rpx;
			border-radius: 10rpx;
		}

		.c-title {
			font-size: 30rpx;
			width: 30%;
		}

		.c-unsubimt {
			color: #606266;
		}

		.c-input {
			width: 70%;
			font-size: 30rpx;
			border-radius: 10rpx;
			padding: 0 10rpx;
		}

	}




	.c-submit-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 20rpx;

		.c-submit {
			color: #FFFFFF;
			background-color: #2979ff;
			margin: 30rpx 0;
			width: 50%;
			border-radius: 50rpx;
		}
	}
</style>
