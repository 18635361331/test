<template>
	<view class="page goodsInfoBtn">
		<view v-if="goodsInfo.refundState==1||goodsInfo.refundState==2||goodsInfo.refundState==4|| ((orderInfo.orderState==30||orderInfo.orderState==40)&&goodsInfo.refundState==0 && !orderInfo.freeOrder)">
			<text class="active" v-if="(orderInfo.orderState==30||orderInfo.orderState==40)&&goodsInfo.refundState==0 && !orderInfo.freeOrder"  @click="$Router.push({path:'/pages/applyAfterSale/index',query:{orderId:orderInfo.id,orderDetailIds:goodsInfo.id}})">申请售后</text>
			<text class="active" v-if="goodsInfo.refundId && goodsInfo.refundState==1" @click="$Router.push({path:'/pages/refundDetails/index',query:{returnOrderId:goodsInfo.refundId}})">售后中</text>
			<text class="active" v-if="goodsInfo.refundId && goodsInfo.refundState==2" @click="$Router.push({path:'/pages/refundDetails/index',query:{returnOrderId:goodsInfo.refundId}})">已退款</text>
			<text class="active" v-if="goodsInfo.refundId && goodsInfo.refundState==4" @click="$Router.push({path:'/pages/refundDetails/index',query:{returnOrderId:goodsInfo.refundId}})">平台已拒绝</text>
			<text v-if="!goodsInfo.refundId && goodsInfo.refundState==1" @click="$Router.push({path:'/pages/refundDetails/index',query:{returnOrderId:goodsInfo.refundId}})">售后中</text>
			<text v-if="!goodsInfo.refundId && goodsInfo.refundState==2" @click="$Router.push({path:'/pages/refundDetails/index',query:{returnOrderId:goodsInfo.refundId}})">已退款</text>
			<text v-if="!goodsInfo.refundId && goodsInfo.refundState==4" @click="$Router.push({path:'/pages/refundDetails/index',query:{returnOrderId:goodsInfo.refundId}})">平台已拒绝</text>
		</view>

	</view>
</template>

<script>
	export default {
		props:["goodsInfo","orderInfo"],
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	.goodsInfoBtn{
		width: 100%;
		height: 98rpx;
		padding-right: 24rpx;
		padding-bottom: 30rpx;
		text-align: right;
	}
	.goodsInfoBtn text{
		width: 136rpx;
		display: inline-block;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		font-size: 26rpx;
		margin-top: 18rpx;
		margin-left: 24rpx;
		color: #666666;
		border: 1rpx solid #999;
		border-radius: 10rpx;
	}
	.goodsInfoBtn text.active{
		background-color: #FF1558;
		color: #FFFFFF;
		border-color: #FF1558;
	}
</style>
