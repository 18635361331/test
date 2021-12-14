<template>
	<view class="pages">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="part">
			<view class="totalAward">
				<text>应付款金额</text>
				<view>
					<text class="tag">¥</text>{{payInfo.payPrice?payInfo.payPrice:0}}
				</view>
			</view>
			<text class="title">费用信息</text>
			<view class="list">
				<text class="type">商品金额：</text>
				<text class="money"><text class="tag">¥</text>{{payInfo.goodsTotal?payInfo.goodsTotal:0}}</text>
			</view>
			<view class="list">
				<text class="type">运费：</text>
				<text class="money"><text class="tag">¥</text>{{payInfo.freightTotal?payInfo.freightTotal:0}}</text>
			</view>
		</view>
		<view class="part pay">
			<text class="title">线上支付</text>
			<view class="list wchat">
				<view class="type"><text class="inco"></text>微信支付</view>
				<view class="incos" @click="changeType('wx')" :class="payType=='wx'?'active':''"></view>
			</view>		
			<text class="title">其他支付方式</text>
			<view class="list outline">
				<view class="type"><text class="inco"></text>线下转账/汇款</view>
				<view class="incos" @click="changeType('outline')" :class="payType=='outline'?'active':''"></view>
			</view>	
		</view>
		<view class="savePart">
			<view @click="pay()">
				<block v-if="payType=='outline'"><text class="light">使用线下转账</text></block>
				<block v-else><text class="lightText">微信支付</text> <text class="tag">¥</text>{{payInfo.payPrice}}</block>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
			<view v-if="(hideFMCanvas != undefined) && !hideFMCanvas">
				<canvas canvas-id='tdcanvas' style='margin-top:200rpx'></canvas>
			</view>
		<!-- #endif  -->
	</view>
</template>

<script>
	import payMentApi from '@/api/payment/index.js'
	import tradeApi from '@/api/trade/index.js'
	// #ifdef MP-WEIXIN
	import fmagent from '@/common/js/fmagent.js'
	// #endif
	export default {
		//  #ifdef MP-WEIXIN
		mixins:[fmagent],
		// #endif
		data() {
			return {
				defaultTitleDto:{
					title:'收银台',
				},
				payInfo:{	//展示的支付信息
					
				},
				payType:'wx',	//支付类型
			}
		},
		methods: {
			changeType(type){
				this.payType = type
			},
			submitPayOrder(){	//线下支付
				tradeApi.submitPayOrder({payId:this.payInfo.payId,payType:2}).then(res=>{
					if(res.data.code==200){
						this.$Router.replace({
							path:"/pages/customizationOrder/paySuccess",
							query:{
								payType:2,
								type:1,
								orderId:this.$Route.query.orderId,
								qiyuKefuGroupId:this.$Route.query.qiyuKefuGroupId
							}
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			pay(){
				if(this.payType == 'wx'){ // 微信支付
					uni.login({
						success:(data)=>{
							this.buildMiniPrepPaySign(data.code);
						}
					})
				}else{ //线下支付
					this.submitPayOrder()
					
				}
			},
			buildMiniPrepPaySign(code) { //获取小程序支付相关信息
				payMentApi.buildMiniPrepPaySign({
					code: code,
					orderPayId: this.payInfo.payId,
					orderType: "customize"
				}).then(res => {
					if (res.data.code == 200) {
						this.requestpayment(res.data.data)
					} else {
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			requestpayment(params) { //小程序支付
				let _this = this;
				uni.requestPayment({
					provider: "payment",
					timeStamp: params.timeStamp,
					nonceStr: params.nonceStr,
					package: params.package,
					paySign: params.paySign,
					signType: params.signType,
					success: (res)=>{
						uni.showToast({
							title: "支付成功",
							icon: "none"
						})
						this.$Router.replace({
							path:"/pages/customizationOrder/paySuccess",
							query:{
								payType:1,
								type:2,
								orderId:this.$Route.query.orderId,
								qiyuKefuGroupId:this.$Route.query.qiyuKefuGroupId
							}
						})
					},
					fail: (res)=> {
						uni.showToast({
							title: "已取消支付,正在前往订单页",
							icon: "none"
						})
						setTimeout(() => {
							this.goBack(1)
						}, 500)
					}
				})
			},
			buildPayOrder(){	//构建支付订单
				tradeApi.buildPayOrder({orderIdList:[this.$Route.query.orderId],invoiceType:this.$Route.query.invoiceType}).then(res=>{
					if(res.data.code==200){
						this.payInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		mounted() {
			this.buildPayOrder()
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			this.fmagentInit()
			//#endif
		}
		
	}
</script>

<style scoped lang="scss">
	@import './index.scss';
	.pages{
		/* #ifdef MP-WEIXIN */
		padding-top: 2rpx;
		/* #endif */
	}
	
	.part{
		@extend .whitePart;
		.totalAward{
			text-align: center;
			height: 186rpx;
			background: linear-gradient(225deg, #C999FF 0%, #9B3FFF 100%);
			border-radius: 20rpx;
			margin-bottom: 45rpx;
			&>text{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.7;
				display: inline-block;
				margin: 24rpx 0 30rpx;
			}
			&>view{
				font-size: 56rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 1;
				color: #FFFFFF;
			}
			.tag{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
	
	.title{
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 42rpx;
		color: #323232;
		margin-bottom: 24rpx;
		display: block;
	}
	.list{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;
		.inco{
			width: 40rpx;
			height: 40rpx;
			background-size: 100%;
			margin-right: 10rpx;
			display: inline-block;
			vertical-align: middle;
		}
		&.wchat .inco{
			background-image: url($img-oss+'customization_wx.png');
		}
		&.outline .inco{
			margin-top: -4rpx;
			background-image: url($img-oss+'customization_xx.png');
		}
		
		.type{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 36rpx;
			color: #323232;
		}
		.tag{
			font-size: 24rpx;
		}
		.money{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 42rpx;
			color: #1F0D33;
		}
	}
	.incos{
		width: 32rpx;
		height: 32rpx;
		border: 1px solid #707070;
		border-radius: 50%;
		&.active{
			background-image: url($img-oss+'customization_select.png');
			background-size: 100% 100%;
			border: none;
		}
	}
	.pay{
		margin-top: 34rpx;
	}
	.wchat{
		margin-bottom: 48rpx;
	}
	
	.savePart{
		view{
			font-size: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.light{
			font-size: 26rpx;
		}
		.lightText{
			font-size: 26rpx;
			opacity: 0.7;
			margin-right: 10rpx;
		}
		.tag{
			font-size: 28rpx;
		}
	}
	
</style>
