<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="rowList" v-if="blanceInfo.list && blanceInfo.list.length">
			<view v-for="item,index in blanceInfo.list" :key='index'>
				<view class="everyRow" v-for="v,i in item.showList" :key='i'>
					<view class="everyTitle">
						{{v.operateDesc}}
					</view>
					<view class="everyTime">
						{{$utils.formatDate(v.createdTime,"yyyy-MM-dd hh:mm")}}
					</view>
					<view class="everyPrice">
						{{v.balanceChange}}
					</view>
				</view>
			</view>
		</view>
		<view class="orderNoMsg" v-else>
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/notorder.png" mode="widthFix"></image>
			<view class="orderNoMsgText">
				暂无数据！
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default {
		data() {
			return {
				blanceInfo: {

				},
				defaultTitleDto:{
					title:'账户流水',
				}
			}
		},
		methods: {
			getBalanceHistory(flag) { //获取收入流水
				memberApi.getBalanceHistory({
					lastLogId: this.blanceInfo.lastLogId ? this.blanceInfo.lastLogId : ""
				}).then(res => {
					if (res.data.code == 200) {
						if (res.data.data) {
							if (flag) {
								this.blanceInfo.list = this.blanceInfo.list.concat(res.data.data.list);
							} else {
								this.blanceInfo = res.data.data
							}
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			}
		},
		onReachBottom() {
			if (this.blanceInfo.lastLogId) {
				this.getBalanceHistory(true)
			}
		},
		mounted() {
			this.getBalanceHistory()
		},
		onShow() {
			this.zhuge.track("账户流水")
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		background: #F5F5F5;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		height: 100vh;
	}

	.everyRow {
		width: calc(100% - 36rpx);
		margin-left: 36rpx;
		height: 120rpx;
		position: relative;
		border-bottom: 1rpx solid #E4E4E4;
	}

	.rowList {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
	}

	.everyTitle {
		width: 100%;
		height: 42rpx;
		line-height: 42rpx;
		color: #333333;
		font-size: 30rpx;
		padding-top: 20rpx;
	}

	.everyTime {
		margin-top: 20rpx;
		line-height: 40rpx;
		color: #888888;
		font-size: 28rpx;
	}

	.everyPrice {
		position: absolute;
		top: 40rpx;
		right: 20rpx;
	}

	.orderNoMsg {
		padding-top: 262rpx;
		width: 360rpx;
		margin: 0 auto;
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
