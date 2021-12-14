<template>
	<view>
		<view class="orderPart" v-for="v,i in list" :key='i'>
			<view class="orderId">订单编号：{{v.orderType==999?'暂无':v.orderId}}</view>
			
			<view class="part_center">
				<view v-if="v.orderType==999" class="goodImg text">货款定金</view>
				<image v-else :src="imgBaseUrls+v.goodsImage" class="goodImg"></image>
				<view class='goodsDetails'>
					<view class="goodsName ellipsis-two">{{v.orderType==999?'首批合作货款定金':v.goodsName||''}}</view>
					<view class="goodsprice" v-if="v.orderType!=999">
						<text class="price"><text>¥</text>{{v.goodsPrice||''}}</text>
						<text class="goodsNum">x{{v.goodsNum||''}}</text>
					</view>
				</view>
			</view>
			<view class="performance" v-if="type==10||type==12">
				<text>本单商品计有效业绩</text>
				<text>¥{{v.performanceAmount }}</text>
			</view>
			<view class="part_bottom">
				<view class="price">
					<text class="paidIn">实付金额：¥{{v.payGoodsAmount}}</text>
					<text class="preReturn" v-if="v.settledStatus==1">已返奖励 ：¥{{v.rewardAmount}}</text>
					<text class="preReturn" v-else>预返奖励 ：¥{{v.rewardAmount}}</text>
				</view>
				<view class="times">
					<!-- 结算状态：0-未结算、1-已结算、2-已关闭 -->
					<text>{{$utils.formatDate(v.orderTime,'yyyy-MM-dd hh:mm:ss')}} 创建</text>
					<text class="status">
						<block v-if="v.settledStatus==0">未结算</block>
						<block v-else-if="v.settledStatus==1">{{$utils.formatDate(v.settledTime,'yyyy-MM-dd hh:mm:ss')}} 结算</block>
						<block v-else-if="v.settledStatus==2">已关闭</block>
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['list','type'],
		data() {
			return{
				imgBaseUrls:''
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		methods:{
		},
		
	}
</script>

<style scoped lang="scss">
	
	.orderPart{
		background-color: #FFFFFF;
		margin: 0 auto ;
		margin-bottom: 20rpx;
		width: calc(100% - 60rpx);
		border-radius: 20rpx;
		&>view{
			padding: 20rpx;
		}
		.orderId{
			font-size: 28rpx;
			padding-bottom: 10rpx;
			font-weight: 400;
			color: #333333;
		}
		.part_center{
			display: flex;
			border-top: 1px solid #F4F5F6;
			border-bottom: 1px solid #F4F5F6;
		}
		.goodImg{
			width: 180rpx;
			height: 180rpx;
			background: #F4F5F6;
			border-radius: 20rpx;
		}
		.goodImg.text{
			text-align: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #999999;
			line-height: 180rpx;
		}
		.goodsDetails{
			margin-left: 20rpx;
			// 20+180
			width: calc(100% - 200rpx);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		.goodsName{
			font-size: 28rpx;
			font-weight: 700;
			color: #333333;
			line-height: 1.4;
		}
		.goodsprice{
			font-size: 32rpx;
			font-weight: 300;
			color: #DE3150;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goodsNum{
				font-size: 28rpx;
				font-weight: 400;
				color: #000000;
			}
		}
	}
	.part_bottom{
		.price,.times{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.price{
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
		}
		.times{
			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
		}
	}
	.performance{
		font-size: 28rpx;
		font-weight: 400;
		color: #663F0A;
		line-height: 1.4;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #F4F5F6;
	}
	
		
</style>

