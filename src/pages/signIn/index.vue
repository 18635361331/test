<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="integralHead">
			<view class="alreadyBtn" v-if="!alreadyFlag" @click='checkin'></view>
			<image v-if="!alreadyFlag" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/signBgImage.gif?1" mode=""></image>
			<image v-if="alreadyFlag" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/isSignBgImage.png" mode=""></image>
		</view>
		<view class="signInTitle">
			签到记录
		</view>
		<view class="signInBox">
			<view class="everySignIn" v-for="item,index in checkinMsg.list" :key='item.id'>
				<text>{{item.checkinDate}}</text>
				<text class="point">+{{item.point}}</text>
			</view>
		</view>
		<view class="orderNoMsg" v-if="!checkinMsg.list || !checkinMsg.list.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/inNUll.png" mode="widthFix"></image>
			<view class="orderNoMsgText">
				暂无记录！
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default {
		data() {
			return {
				alreadyFlag: false, //是否已签到
				checkinMsg: {
					lastLogId: 0,
					list: []
				},
				defaultTitleDto:{
					title:'签到',
				}
			}
		},
		methods: {
			validateCheckin() { //判断是否已签到
				memberApi.validateCheckin().then(res => {
					if (res.data.code == 200) {
						this.alreadyFlag = false
					} else {
						this.alreadyFlag = true
					}
				})
			},
			checkinLog(params) { //签到记录列表
				uni.showLoading({
					title: "加载中..."
				})
				memberApi.checkinLog(params).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						if (!params) {
							this.checkinMsg = res.data.data
						} else {
							this.checkinMsg.lastLogId = res.data.data.lastLogId;
							if (res.data.data.list) {
								this.checkinMsg.list = this.checkinMsg.list.concat(res.data.data.list)
							}
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			checkin() { //签到
				memberApi.checkin().then(res => {
					if (res.data.code == 200) {
						this.alreadyFlag = true;
						this.checkinMsg.lastLogId = 0;
						this.checkinLog(0)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			}
		},
		onReachBottom() { //页面滚动到底部
			if (String(this.checkinMsg.lastLogId) > 0) {
				this.checkinLog(this.checkinMsg.lastLogId)
			}
		},
		onShow() {
			this.zhuge.track("签到-落地页")
			this.validateCheckin()
			this.checkinLog(0)
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}

	.integralHead {
		width: 100%;
		height: 1066rpx;
		position: relative;
	}
	
	.alreadyBtn{
		position: absolute;
		width: 250rpx;
		height: 100rpx;
		left: 0;
		right: 0;
		margin: auto;
		top: 450rpx;
		z-index: 10;
	}

	.integraImg {
		width: 256rpx;
		height: 256rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		display: block;
	}

	.signInTitle {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 32rpx;
		color: #333333;
		text-align: center;
		margin-top: 20rpx;
	}

	.signInBox {
		width: 100%;
		height: auto;
	}

	.everySignIn {
		display: flex;
		padding: 0 24rpx;
		color: #999999;
		height: 92rpx;
		line-height: 92rpx;
		font-size: 30rpx;
		justify-content: space-between;
	}

	.point {
		color: #FF1558;
	}

	.orderNoMsg {
		padding-top: 100rpx;
		width: 360rpx;
		margin: 0 auto;
		margin-bottom: 100rpx;
	}

	.orderNoMsg image {
		width: 100%;
	}

	.orderNoMsgText {
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		margin-top: 55rpx;
	}
	
</style>
