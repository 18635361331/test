<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="rowList" v-if="blanceInfo.records && blanceInfo.records.length">
			<view v-for="item,index in blanceInfo.records" :key='index' class="everyRow">
				<view class="title">
					<text>订单：{{item.orderId}}</text>
					<view @click="goDetail(item.orderId)"><text>查看</text> <text class="arrow-right"></text></view>
				</view>
				<view class="center">
					<view class="bg"></view>
					<view class="right">
						<view class="everyTitle">{{item.couponName}}</view>
						<view class="everyTime">
							{{$utils.formatDate(item.orderCreatedTime,"yyyy-MM-dd hh:mm")}}
						</view>
					</view>
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
					title:'省钱记录',
				}
			}
		},
		methods: {
			getUsedCoupon(flag) { //获取收入流水
				customerApi.getUsedCoupon(this.page).then(res => {
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
				this.getUsedCoupon(true)
			}
		},
		mounted() {
			this.getUsedCoupon()
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
	
	.rowList {
		margin: 30rpx;
		height: auto;
	}
	.everyRow {
		width: 100%;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #F4F5F6;
		.title{
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			view text{
				font-size: 24rpx;
				display: inline-block;
				vertical-align: middle;
			}			
		}
		.center{
			display: flex;
			
		}
		.bg{
			width: 100rpx;
			height: 48rpx;
			background-image: url($img-oss+'card_pay_couponbg.png');
			background-size: 100% 100%;
			margin-right: 20rpx;
		}
	}

	.arrow-right {
	    width: 14rpx;
	    height: 14rpx;
	    border-top: 1px solid #666666;
	    border-right: 1px solid #666666;
	    transform: rotate(45deg);
		
	}

	.everyTitle {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 1.3;
		
	}
	

	.everyTime {
		margin-top: 12rpx;
		line-height: 1;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
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
