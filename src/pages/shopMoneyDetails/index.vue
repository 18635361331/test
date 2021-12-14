<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="shopMoneyBox">
			<view class="everyRow" v-for="item,index in goldInfo.records" :key='item.memberId'>
				<view class="moneyDec">
					<view class="moneyDecTitle">{{item.detailDesc}}</view>
					<view class="moneyDate">
						获取时间：{{$utils.formatDate(item.gainGoldTime,"yyyy-MM-dd hh:mm:ss")}}
					</view>
					<view class="moneyDate">
						过期时间：{{$utils.formatDate(item.invalidTime,"yyyy-MM-dd hh:mm:ss")}}
					</view>
				</view>
				<view class="money">{{item.goldValue>0?("+"+item.goldValue):item.goldValue}}</view>
			</view>
		</view>
		<view class="noGold" v-if="!goldInfo.records || !goldInfo.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/inNUll.png" mode=""></image>
			<view>
				暂无库豆明细记录！
			</view>
		</view>
	</view>
</template>

<script>
	import goldApi from '@/api/gold/index.js'
	
	export default {
		data() {
			return {
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				goldInfo: {},
				defaultTitleDto:{
                    title:'库豆明细',
                }
			}
		},
		methods: {
			getGoldDetailInfo(flag) { //库豆明细
				goldApi.getGoldDetailInfo(this.pageInfo).then(res => {
					if (res.data.code == 200) {
						if (flag) {
							this.goldInfo.records = this.goldInfo.records.concat(res.data.data.records);
							this.goldInfo.totalPage = res.data.data.totalPage;
						} else {
							this.goldInfo = res.data.data
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
		onReachBottom() { //页面滚动到底部
			if (this.pageInfo.pageNo < this.goldInfo.totalPage) {
				this.pageInfo.pageNo++;
				this.getGoldDetailInfo(true)
			}
		},
		onLoad() {
			this.getGoldDetailInfo()
		},
		onShow() {
			this.zhuge.track("库豆明细-落地页")
		},
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		background-color: #F5F5F5;
		min-height: 100vh;
	}

	.collectTitle {
		background-color: #F5F5F5;
	}

	.noGold {
		text-align: center;
		padding-top: 300rpx;
	}

	.noGold image {
		width: 220rpx;
		height: 220rpx;
	}

	.shopMoneyBox {
		width: 100%;
		padding: 0 24rpx;
		background-color: #F5F5F5;
		border-radius: 36rpx;
		overflow: hidden;
	}

	.everyRow {
		width: 100%;
		padding: 24rpx 12rpx 24rpx 24rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		justify-content: space-between;
	}

	.money {
		font-size: 34rpx;
	}

	.moneyDecTitle {
		font-size: 30rpx;
	}
	.moneyDate{
		font-size: 26rpx;
		color: #888;
		margin-top: 8rpx;
	}
</style>
