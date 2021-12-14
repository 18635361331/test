<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="title">累计消费金额：<text>{{totalTsaAmount}}元</text></view>
		<view class="rowList" v-if="blanceInfo.records && blanceInfo.records.length">
			<view v-for="item,index in blanceInfo.records" :key='index' class="everyRow">
				<view class="everyTitle">
					<text>{{$utils.formatDate(item.createdTime,"yyyy-MM-dd hh:mm")}}</text>
					<view @click="goDetail(item.orderId)"><text>详情</text> <text class="arrow-right"></text></view>
				</view>
				<view class="everyTime">
					订单：{{item.orderId}}
				</view>
				<view class="everyPrice">
					{{item.orderTotal}}元
				</view>
			</view>
			<view class="noContent">没有其他内容咯～</view>
		</view>
		<view class="hasNothingMsg" v-else>
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/notorder.png" mode="widthFix"></image>
			<view class="hasNothingMsgText">
				暂无数据！
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	import customerApi from '@/api/customer/index.js';
	
	export default {
		data() {
			return {
				blanceInfo: {
					records:[]
				},
				page:{
					pageNo:1,
					pageSize:15
				},
				defaultTitleDto:{
					title:'消费记录',
				},
				totalTsaAmount:""
			}
		},
		methods: {
			orderDuring(flag) { //获取收入流水
				customerApi.orderDuring(this.page).then(res => {
					if (res.data.code == 200) {
						if (res.data.data) {
							if (flag) {
								this.blanceInfo.records = this.blanceInfo.records.concat(res.data.data.records);
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
			},
			goDetail(id){ // 订单详情
				this.$Router.push({
					path:'/pages/orderDetails/index',
					query:{
						orderId:id
					}
				})
			}
		},
		onReachBottom() {
			if (this.blanceInfo.totalCount>this.blanceInfo.records.length) {
				this.page.pageNo++
				this.orderDuring(true)
			}
		},
		mounted() {
			this.orderDuring()
			this.totalTsaAmount = this.$Route.query.totalTsaAmount
		},
		
	}
</script>

<style scoped lang="scss">
	.commonPageTitle {
		background: #fff;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		height: 100vh;
	}
	.title{
		font-size: 32rpx;
		font-weight: 600;
		color: #333333;
		margin: 30rpx;
		text{
			color: #DE3150;
		}
	}
	.rowList {
		margin: 30rpx;
		height: auto;
	}
	.everyRow {
		width: 100%;
		padding-bottom: 20rpx;
		position: relative;
		border-bottom: 1rpx solid #E4E4E4;
	}

	.arrow-right {
	    width: 14rpx;
	    height: 14rpx;
	    border-top: 1px solid #999999;
	    border-right: 1px solid #999999;
	    transform: rotate(45deg);
		
	}

	.everyTitle {
		width: 100%;
		color: #666666;
		font-size: 28rpx;
		padding-top: 20rpx;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		view text{
			font-size: 24rpx;
			display: inline-block;
			vertical-align: middle;
		}
	}
	

	.everyTime {
		margin-top: 16rpx;
		line-height: 1;
		color: #999999;
		font-size: 24rpx;
	}

	.everyPrice {
		position: absolute;
		bottom: 12rpx;
		right: 0;
		color: #333333;
		font-size: 28rpx;
	}
	.noContent{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #D3D3D3;
		margin: 40rpx 0;
		text-align: center;
	}

	
</style>
