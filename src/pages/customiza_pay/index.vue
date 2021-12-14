<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="payMoney">
			应付款金额：1111
		</view>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js'
	export default {
		data(){
			return{
				defaultTitleDto:{
					title:'收银台',
				},
			}
		},
		methods:{
			submitPay(){
				tradeApi.submitPay(this.submitParams).then(res => {
					if (res.data.code == 200) {
						uni.showLoading({
							title: '正在前往微信支付',
							mask: false
						});
						uni.login({
							success: (data) => {
								this.buildMiniPrepPaySign(data.code, res.data.data)
							}
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			buildMiniPrepPaySign(code, payId) { //获取小程序支付相关信息
				payMentApi.buildMiniPrepPaySign({
					code: code,
					orderPayId: payId,
					orderType: "good"
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
					success: function(res) {
						_this.payCallBack(true)
					},
					fail: function(res) {
						_this.payCallBack(false)
			
					}
				})
			},
			payCallBack(flag){	 //支付成功或失败的回调
				if(flag){
					uni.showToast({
						title: "支付成功",
						icon: "none"
					})
					this.$Router.replace({
						path: "/pages/payment/index",
						query:{
							payId:this.$Route.query.payId
						}
					})
				}else{
					uni.showToast({
						title: "已取消支付,正在前往订单页",
						icon: "none"
					})
					setTimeout(() => {
						this.$Router.replace({
							path: "/pages/order/index",
						})
					}, 500)
				}
			},
		},
		onShow() {
			
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
		background-color: #FFFFFF;
	}
	.payMoney{
		width: 100%;
		height: 100rpx;
		background-color: black;
		text-align: center;
		line-height: 100rpx;
	}
</style>
