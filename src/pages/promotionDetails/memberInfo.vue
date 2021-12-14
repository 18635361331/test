<template>
	<view class="page">
		<view class="vipPart" v-for="v,i in info" :key='i'>
			<view class="part_head">
				<text class="icon" :class="orderType==1?'iconCompany':''"></text>
				<text class="text">{{orderType==0?'文器库个人会员开户':'文器库企业会员开户'}}</text>
			</view>
			<!-- 推广订单状态 1、已支付 2、已结算 3、已售后 4、已退款 -->
			<view class="part_center">
					<text class="left">
						<text>{{v.estimateIncome>=0?'+':''}}</text>
						<text>{{v.estimateIncome}}</text>
					</text>
					<text class="right">
						<block v-if="orderType==1">
							<block v-if="v.orderState==1">已支付</block>
							<block v-else-if="v.orderState==3">已售后</block>
							<block v-else-if="v.orderState==4">已退款</block>
							<block v-else-if="v.orderState==2">已结算</block>
						</block>
						<block v-else>
							<block v-if="v.estimateIncome>=0">已支付</block>
							<block v-else>已退款</block>
						</block>
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
					<text class="des orderNum"> <text class="ellipsis-one">{{v.estimateLogId}}</text></text>
					<text class="copy" @click="copy(v.estimateLogId)">复制</text>
				</view>
				<view  class="left">
					<text class="type">订单类型</text>
					<text class="des">{{orderType==0?'个人会员开户':'企业会员开户'}}</text>
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
		props:['info','orderType'],
		mixins:[mixin],
		data() {
			return{
				
			}
		},
		methods:{
			
		},
		mounted() {}
	}
</script>

<style scoped lang="scss">
	@import "index";
	.vipPart{
		padding: 24rpx 14rpx;
		.part_head{
			
			border-radius: 12rpx;
			&>*{
				display: inline-block;
				vertical-align: middle;
			}
			.text{
				font-size: 28rpx;
				font-weight: 500;
				line-height: 1.4;
				color: #333333;
			}
			.icon{
				background-image: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/signIcon.jpg) ;
				background-size: 100% 100%;
				width: 70rpx;
				height: 26rpx;
				margin-right: 8rpx;
			}
				
			.icon.iconCompany{
				background-image: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/signIcon.jpg) ;
			}
		}
		
		
	}
	
</style>

