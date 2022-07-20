<template>
	<view class="c-container">
		<view class="c-box">
			<u-swiper height="400" :list="list" mode="rect" title="ture"></u-swiper>
		</view>
		<view class="c-box">
			<view class="c-tab-list">
				<view class="c-tab-item" @click="gotoPage('../recommender/recommender')">
					<view class="c-tab-icon-box">
						<image class="c-tab-icon" src="../../static/tab/kyxm.png" mode=""></image>
					</view>
					<view class="c-tab-text">
						开源项目
					</view>
				</view>
				<view class="c-tab-item" @click="gotoPage('../activityPlan/activityPlan')">
					<view class="c-tab-icon-box">
						<image class="c-tab-icon" src="../../static/tab/hdap.png" mode=""></image>
					</view>
					<view class="c-tab-text">
						活动安排
					</view>
				</view>
				<view class="c-tab-item" @click="gotoPage('../activityRecord/activityRecord')">
					<view class="c-tab-icon-box">
						<image class="c-tab-icon" src="../../static/tab/hdjl.png" mode=""></image>
					</view>
					<view class="c-tab-text">
						活动记录
					</view>
				</view>
				<view class="c-tab-item" @click="gotoPage('../excellentWorks/excellentWorks')">
					<view class="c-tab-icon-box">
						<image class="c-tab-icon" src="../../static/tab/yxzp.png" mode=""></image>
					</view>
					<view class="c-tab-text">
						优秀作品
					</view>
				</view>
			</view>
		</view>

		<view class="c-title">
			技术资讯
		</view>

		<view class="c-box" v-for="item in news" :key="item.id" @click="gotoPage('../news/news')">
			<view class="c-news-title">
				{{item.title}}
			</view>
			<u-gap height="2" bg-color="#FFFFFF"></u-gap>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				activity: [],
				banners: [{
					image: 'https://transfer.rjxh.cloud/transfer/kfj.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				}],
				list: [
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				news: []
			}
		},
		onLoad() {
			this.getNew()
		},
		onShow() {
			// this.getActivityList();
		},
		methods: {
			gotoPage(pageUrl) {
				uni.navigateTo({
					url: pageUrl,
					success: res => {},
				});
			},
			getNew() {
				uni.request({
					url: 'https://segmentfault.com/gateway/news?query=news&page=1&size=30&mode=scrollLoad',
					method: 'GET',
					data: {},
					success: res => {
						this.news = res.data.rows;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getActivityList() {
				this.$api.activity.getList({}).then(res => {
					// this.$u.toast('获取数据成功');
					this.banners = res;
					console.log('getList::', res);
				});
			},

		}
	}
</script>

<style lang="scss" coped>
	page {
		background-color: #F8F8F8;
	}

	.c-container {}

	.c-box {
		background-color: #FFFFFF;
		padding: 30rpx;
		margin: 10rpx 20rpx;
		border-radius: 25rpx;
	}

	.c-tab-list {
		display: flex;
		flex-direction: row;
	}

	.c-tab-item {
		display: flex;
		width: 25%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.c-tab-icon {
		width: 85rpx;
		height: 85rpx;
	}

	.c-title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		margin: 10rpx;
		color: #666666;
	}

	.c-news-box {
		margin: 5rpx;
		background-color: #FFFFFF;
	}
</style>
