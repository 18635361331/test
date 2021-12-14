<template>
	<view class="page">
		<view class="vipPart" v-for="v,i in info" :key='i'>
			<view class="part_head">
				<view class="bg" :style="{backgroundImage:'url('+imgBaseUrls+v.pictureName+')'}"></view>
				<view class="info">
					<text class="name">{{v.itemName}}</text>
					<text class="shop">所属店铺：{{v.belongStoreName}}</text>
					<text class="order">原订单ID：{{v.orderId}}</text>
				</view>
			</view>
			<view class="part_center">
					<text class="left">
						<text>{{v.estimateIncome>=0?'+':''}}</text>
						<text>{{v.estimateIncome}}</text>
					</text>
					<text class="right">
						<block v-if="v.orderState==1">已支付</block>
						<block v-else-if="v.orderState==3">已售后</block>
						<block v-else-if="v.orderState==4">已退款</block>
						<block v-else-if="v.orderState==2">已结算</block>
					</text>
				<view class="tag">
					预估收入
				</view>
			</view>
			<view class="part_bottom">
				<view class="left">
					<text class="type">付款金额</text>
					<text class="des">¥{{v.payAmount}}</text>
				</view>
				<view>
					<text class="type">订单编号</text>
					<text class="des">{{v.estimateLogId}}</text>
					<text class="copy" @click="copy(v.estimateLogId)">复制</text>
				</view>
				<view  class="left">
					<text class="type">订单类型</text>
					<text class="des">商品推广返现</text>
				</view>
				<view>
					<text class="type">生成时间</text>
					<text class="des">{{$utils.formatDate(v.createdTime,'yyyy-MM-dd hh:mm')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/setCopy.js'
	
	export default {
		props:['info','type'],
		mixins:[mixin],
		data() {
			return{
				imgBaseUrls:this.$config.imgBaseUrl
			}
		},
		methods:{
			
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	@import "index";
	
	.vipPart{
		padding: 24rpx 20rpx;
		.part_head{
			.bg{
				width: 100rpx;
				height: 100rpx;
				border-radius: 4rpx;
				margin-right: 24rpx;
				background-size: 100% 100%;
				background-color: #CCCCCC;
			}
			&>*{
				display: inline-block;
				vertical-align: middle;
			}
			.info{
				font-size: 24rpx;
				font-weight: 400;
				line-height: 1.4;
				color: #666666;
				text{
					display: block;
					
				}	
			}
		}
		
	}
	
		
</style>

