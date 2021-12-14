<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="giftCardRecords" v-if="cardInfo.records && cardInfo.records.length">
			<view class="cardTitle">
				<text>卡号</text>
				<text>支出（元）</text>
			</view>
			<view class="cardRow" v-for="item,index in cardInfo.records" :key='index'>
				<view class="cardNo">
					{{item.cardNo}}
				</view>
				<view class="cardInfo">
					<view class="cardPrice">
						{{item.amount<0?item.amount:"+"+item.amount}}
					</view>
					<view class="cardTime">
						{{$utils.formatDate(item.createdTime,"yyyy-MM-dd hh:mm:ss")}}
					</view>
				</view>
			</view>
		</view>
		<view class="dataNo" v-else>
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_record_none@2x.png" mode="widthFix"></image>
			<view>
				暂无礼卡消费记录
			</view>
		</view>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js'
	export default {
		data() {
			return {
				cardInfo: {},
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				defaultTitleDto:{
					title:'礼卡消费记录',
				}
			}
		},
		methods: {
			consumeLog(flag) { //消费记录
				appApi.consumeLog(this.pageInfo).then(res => {
					if (res.data.code == 200) {
						if (flag) {
							this.cardInfo.records = this.cardInfo.records.concat(res.data.data.records);
							this.cardInfo.totalPage = res.data.data.totalPage;
						} else {
							this.cardInfo = res.data.data
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
			if (this.pageInfo.pageNo < this.cardInfo.totalPage) {
				this.pageInfo.pageNo++;
				this.consumeLog(true)
			}
		},
		onShow() {
			this.zhuge.track("礼卡消费记录页面")
			this.consumeLog()
		}
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

	.giftCardRecords {
		width: 100%;
	}

	.cardTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		background-color: #FFFFFF;
		padding: 0 24rpx;
	}

	.cardRow {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 150rpx;
		background-color: #FFFFFF;
		border-top: 1rpx solid #E4E4E4;
		padding: 0 24rpx;
	}

	.cardNo {
		color: #333333;
	}

	.cardInfo {
		height: 100%;
	}

	.cardPrice {
		color: #FF1558;
		margin-top: 30rpx;
		font-size: 42rpx;
		text-align: right;
	}

	.cardTime {
		color: #999999;
		margin-top: 6rpx;
	}
	.dataNo{
		width: 360rpx;
		margin: 0 auto;
		padding-top: 262rpx;
	}
	.dataNo view{
		text-align: center;
		color: #999999;
		margin-top: 55rpx;
	}
</style>
