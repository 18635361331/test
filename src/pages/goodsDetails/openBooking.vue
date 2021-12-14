<template>
	<view class="preSale">
		<view class="preSale_list">
			<view class="start">
				<text class="dot"></text>
				<text class="name">商品预售</text>
				<view class="time">
					<text class="day">{{goodsInfo.presaleInfo.presaleStart.month}}月{{goodsInfo.presaleInfo.presaleStart.day}}日</text>
					<text class="minute">{{goodsInfo.presaleInfo.presaleStart.hours}}</text>
					<text class="year">{{goodsInfo.presaleInfo.presaleStart.year}}年</text>
				</view>
				<view class="line"></view>
				<view class="time">
					<text class="day">{{goodsInfo.presaleInfo.presaleEnd.month}}月{{goodsInfo.presaleInfo.presaleEnd.day}}日</text>
					<text class="minute">{{goodsInfo.presaleInfo.presaleEnd.hours}}</text>
					<text class="year">{{goodsInfo.presaleInfo.presaleEnd.year}}年</text>
				</view>
			</view>
			<text class="shu"></text>
			<view class="end">
				<text class="dot"></text>
				<text class="name">商家发货</text>
				<view class="time">
					<text class="day">{{goodsInfo.presaleInfo.deliveryStart.month}}月{{goodsInfo.presaleInfo.deliveryStart.day}}日</text>
					<text class="minute">{{goodsInfo.presaleInfo.deliveryStart.hours}}</text>
					<text class="year">{{goodsInfo.presaleInfo.deliveryStart.year}}年</text>
				</view>
				<view class="line"></view>
				<view class="time">
					<text class="day">{{goodsInfo.presaleInfo.deliveryEnd.month}}月{{goodsInfo.presaleInfo.deliveryEnd.day}}日</text>
					<text class="minute">{{goodsInfo.presaleInfo.deliveryEnd.hours}}</text>
					<text class="year">{{goodsInfo.presaleInfo.deliveryEnd.year}}年</text>
				</view>
			</view>
			<view class="explain" @click="openPopup()" v-if="goodsInfo.presaleInfo && goodsInfo.presaleInfo.presaleInfo">
				<text>预售说明</text>
				<text class="icon"></text>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popupBox">
				<view class="popupTitle">
					<text>请仔细阅读预售说明</text>
				</view>
				<scroll-view scroll-y="true" class="content">
					<view>
						{{goodsInfo.presaleInfo.presaleInfo}}
					</view>
				</scroll-view>
				<view class="opoupBtn" @click="closePopup()">
					我知道了
				</view>
			</view>
			<view class="popupClose" @click="closePopup()"></view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props:["goodsInfo"],
		data() {
			return {
				
			}
		},
		methods: {
			openPopup(){
				this.$refs.popup.open()
			},
			closePopup(){
				this.$refs.popup.close()
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.popupBox{
		width: 600rpx;
		min-height: 200rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;
		.popupTitle{
			width: 100%;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			position: relative;
			margin-bottom: 30rpx;
			text{
				position: relative;
				z-index: 2;
			}
			&::after{
				content: '';
				position: absolute;
				bottom: -8rpx;
				left: 50%;
				z-index: 1;
				transform: translateX(-50%);
				width: 128rpx;
				height: 20rpx;
				background: linear-gradient(270deg, rgba(240, 34, 71, 0.1) 0%, #F83D64 50%, #FD6458 100%);
				border-radius: 10rpx;
			}
		}
		.content{
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			line-height: 1.3;
			letter-spacing: 1px;
			max-height: 400rpx;
		}
		.opoupBtn{
			width: 100%;
			padding: 20rpx 0;
			background: #FE325C;
			border-radius: 50rpx;
			text-align: center;
			margin: 60rpx auto 30rpx;
			font-size: 32rpx;
			font-weight: 500;
			line-height: 1;
			color: #FFFFFF;
		}
	}
	.popupClose{
		width: 60rpx;
		height: 60rpx;
		background:url($img-oss+'closeInWhite.png');
		background-size: cover;
		margin: 80rpx auto 0;
	}
	
	
	.preSale_list{
		width: 100%;
		padding: 30rpx 24rpx;
		background: #FFFFFF;
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
		position: relative;
		.start,.end{
			display: flex;
			align-items: baseline;
		}
		.dot{
			width: 20rpx;
			height: 20rpx;
			background: #FE325C;
			border-radius: 50%;
		}
		.shu{
			width: 1px;
			height: 50rpx;
			background: #D8D8D8;
			margin-left: 10rpx;
			display: block;
			margin-top: -16rpx;
		}
		.end{
			margin-top: 20rpx;
			.dot{
				background: #D8D8D8;
			}
			.name{
				color: #666666;
			}
		}
		.name{
			margin: 0 30rpx 0 20rpx;
		}
		
		.minute{
			font-size: 24rpx;
			font-weight: 400;
			color: #666666;
			margin-left: 10rpx;
		}
		.year{
			display: block;
			font-size: 24rpx;
			color: #666666;
			margin-top: 14rpx;
		}
		.line{
			width: 40rpx;
			font-size: 0;
			height: 1px;
			background: #D8D8D8;
			margin: 20rpx 30rpx;
			align-self: flex-start;
		}
		.explain{
			width: 40rpx;
			padding: 20rpx 6rpx;
			text-align: center;
			background: linear-gradient(180deg, #FE5D88 0%, #F32233 100%);
			border-radius: 18rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 1.3;
			position: absolute;
			right: 24rpx;
			top: 30rpx;
			.icon{
				width: 20rpx;
				height: 20rpx;
				display: inline-block;
				background:url($img-oss+'preSaleExplain.png');
				background-size: cover;
			}
		}
	}
</style>
