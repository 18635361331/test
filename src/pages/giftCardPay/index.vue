<template>
	<view class="page">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="pay-cont">
			<view class="order-price">订单金额 <text class="tag">￥</text><text class="payNum">{{payNum}}</text></view>
			 <!-- #ifndef MP-WEIXIN -->
			<view class="my-wallet-info zfb" v-if="!isWxFlag" @click="walletChange('zfb')">
				<view class="wallet-icon"></view>
				<view class="wallet-text">支付宝支付</view>
				<text class="select" :class="{cur:typeFlag==2}"></text>
			</view>
			<!-- #endif -->
			<view class="my-wallet-info wx" v-if="isWxFlag" @click="walletChange('wx')">
				<view class="wallet-icon"></view>
				<view class="wallet-text">微信支付</view>
				<text class="select" :class="{cur:typeFlag==1}"></text>
			</view>
			<view class="submit-pay" @click="submitPayChange">提交支付</view>
		</view>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js';
	import payMentApi from '@/api/payment/index.js'
	export default {
		data() {
			return {
				defaultTitleDto: {
					title: '支付方式'
				},
				typeFlag: 1, // 1 微信 2 支付宝
				payNum: 0,
				isWxFlag: true, //是否在微信浏览器中  1为小程序   true公众号  false 普通浏览器
				submitBol:true,//防重复提交
			}
		},
		onLoad() {
		// #ifdef H5
			let ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				this.isWxFlag = true //在微信浏览器中
			} else {
				this.isWxFlag = false //不在微信浏览器中
				this.typeFlag = 2
			}
		//#endif
		/*微信小程序*/
		//#ifdef MP-WEIXIN
			this.isWxFlag = true
			this.typeFlag = 1
		// #endif
		},
		onShow() {
			this.giftcardAmount();
		},
		methods: {
			walletChange(type) { 
				this.typeFlag = type;
			},
			closeAuthorize() { //关闭授权
				this.$refs.authorize.close()
			},
			submitPayChange(){
				if(!this.submitBol){
					return false
				};
				this.submitBol = false
				uni.showLoading({
				  title: "加载中..."
				});
				uni.login({
					success:(data)=>{
						this.buildMiniPrepPaySign(data.code)
					}
				})
				this.submitBol = true
				uni.hideLoading()
				
			},
			giftcardAmount(){	//获取支付信息
				appApi.giftcardAmount(this.$Route.query.payId).then(res=>{
					if(res.data.code==200){
						this.payNum = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			buildMiniPrepPaySign(code){	//获取微信支付信息
				payMentApi.buildMiniPrepPaySign({
					code: code,
					orderPayId:this.$Route.query.payId,
					orderType: "card"
				}).then(res=>{
					if(res.data.code==200){
						this.requestpayment(res.data.data)
					}else{
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
							type:"giftCard"
						}
					})
				}else{
					uni.showToast({
						title: "已取消支付,正在前往订单页",
						icon: "none"
					})
					setTimeout(() => {
						this.$Router.replace({
							path: "/pages/myGiftCardOrderList/index",
						})
					}, 500)
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #f5f5f5;
	}

	.pay-cont {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}

	.order-price {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #686868;
		letter-spacing: 0;
		background: #FFFFFF;
		display: flex;

		text {
			font-size: 36rpx;
			line-height: 100rpx;
			color: #ff1558;
		}

		.tag {
			margin-left: auto;
			font-size: 24rpx;
			line-height: 108rpx;
		}
	}

	.my-wallet-info {
		display: block;
		width: 100%;
		height: 120rpx;
		padding: 0 26rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #EEEEEE;
		display: flex;
		align-items: center;
	}

	.wallet-icon {
		width: 110rpx;
		height: 110rpx;

		.zfb & {
			background:url(#{$img-oss}icon_zhi.png) no-repeat 50%;
			background-size: 50rpx 50rpx;
		}

		.wx & {
			background:url(#{$img-oss}icon_weixin.png) no-repeat 50%;
			background-size: 50rpx 50rpx;
		}
	}

	.select {
		$height1: 36rpx;
		display: block;
		width: $height1;
		height: $height1;
		background:url(#{$img-oss}oval_3copy4@2x.png) no-repeat 50%;
		background-size: $height1 $height1;
		margin-left: auto;

		&.cur {
			background:url(#{$img-oss}subr.png) no-repeat 50%;
			background-size: $height1 $height1;
		}
	}

	.submit-pay {
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		background-color: #ff1558;
		position: fixed;
		bottom: 0;
		margin: 0 auto;
		z-index: 9999;
	}
	.authorizeView {
		width: 500rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		padding: 30rpx;
	}
	.authorizaImage {
		width: 200rpx;
		height: 200rpx;
		margin: 0 auto;
		text-align: center;
		padding: 20rpx 0;
		position: relative;
	}
	
	.authorBtnImage {
		width: 100%;
		height: 100%;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/headBg2.png) no-repeat 50%;
		background-size: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}
	
	.authorTopImage {
		width: 100%;
		height: 100%;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/headBg1.png) no-repeat 50%;
		background-size: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 20;
	}
	.noApplyInfoBtn {
		background-color:#fff ;
		border: 1px solid #ccc;
		margin: 20rpx auto 0 ;
	}
	
	.authorizaBtnBox {
		width: 85%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 36rpx;
		border-radius: 40rpx;
		text-align: center;
	}
	.authUserImage {
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		top: 38rpx;
		left: 40rpx;
		z-index: 10;
		border-radius: 50%;
		overflow: hidden;
	}
</style>
