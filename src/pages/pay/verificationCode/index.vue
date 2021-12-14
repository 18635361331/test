<template>
	<view class="page">
		<uni-popup ref="verificationCode" type="bottom">
			<view class="payPopup">
				<view class="payPopupTitle">
					输入支付验证码
					<view class="closePopup" @click="closeVerificationCode"></view>
				</view>
				<view class="codeHint">
					<image src='http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/warning@2x.png' mode=""></image>
					为了保护您的账号安全，本次支付使用手机验证码的方式支付
				</view>
				<view class="codeTitle" v-if="payInfo.mobile">
					{{countdown.count?"验证码已经发送":"发送验证码"}}到{{payInfo.mobile.slice(0,3)+"****"+payInfo.mobile.slice(payInfo.mobile.length-4,payInfo.mobile.length)}}
				</view>
				<view class="setPW-info getCode">
					<input type="text" v-model="params.captcha" placeholder-style="color:#ccc" placeholder="请输入验证码" />
					<text v-if="!countdown.count" @click="sendOrderSms">获取验证码</text>
					<text v-if="countdown.count">{{countdown.count}}秒后重新获取</text>
				</view>
				<view class="sureBtn" @tap="sure">
					确定
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js'
	export default {
		props: ["payInfo","isSendSMS"],
		data() {
			return {
				params: {
					captcha: "",
				},
				countdown: {
					count: 0,
					inter:""
				}
			}
		},
		methods: {
			openVerificationCode() { //打开支付验证码弹窗
				if(!this.countdown.count){
					this.sendOrderSms()
				}
				this.$refs.verificationCode.open()
			},
			closeVerificationCode() { //关闭支付验证码弹窗
				this.$refs.verificationCode.close()
			},
			sendOrderSms() { //获取验证码
				this.countDownTime();
				if(this.isSendSMS){
					tradeApi.sendSMS(this.$Route.query.payId).then(res => {
						if (res.data.code == 200) {} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							})
						}
					})
				}else{
					tradeApi.sendOrderSms().then(res => {
						if (res.data.code == 200) {} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							})
						}
					})
				}
				
			},
			countDownTime() { //倒计时
				this.countdown.count = 60
				this.countdown.inter = setInterval(() => {
					this.countdown.count--;
					if (!this.countdown.count) {
						clearInterval(this.countdown.inter)
					}
				}, 1000)
			},
			sure(){
				if(!this.params.captcha){
					uni.showToast({
						title:"请输入验证码",
						icon:"none"
					})
					return
				}
				this.$emit("codeSubmit",this.params.captcha)
			},
		}
	}
</script>

<style scoped>
	.payPopup {
		width: 100%;
		height: 778rpx;
		background-color: #FFFFFF;
	}

	.payPopupTitle {
		width: 100%;
		height: 100rpx;
		position: relative;
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
	}

	.closePopup {
		width: 88rpx;
		height: 88rpx;
		position: absolute;
		top: 12rpx;
		left: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_1@2x.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
	}

	.codeHint {
		width: 100%;
		line-height: 40rpx;
		background-color: #fff6e1;
		color: #ff7e18;
		padding: 22rpx 32rpx;
		font-size: 24rpx;
	}

	.codeHint image {
		width: 20rpx;
		height: 20rpx;
		margin-right: 12px;
	}

	.codeTitle {
		width: 100%;
		line-height: 40rpx;
		color: #333333;
		text-align: center;
		font-size: 26rpx;
		margin-top: 57rpx;
	}

	.setPW-info {
		width: 100%;
		text-align: center;
		line-height: 88rpx;
		height: 88rpx;
		font-size: 34rpx;
		color: #2D2D2D;
		margin-bottom: 24rpx;
		margin-top: 74rpx;
	}

	.getCode {
		width: 620rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		color: rgb(51, 51, 51);
		justify-content: space-between;
		padding: 12rpx;
		border: 1rpx solid #E4E4E4;
		border-radius: 8rpx;
		margin-top: 74rpx;
	}

	.getCode input {
		flex: 1;
		height: 88rpx;
		text-align: left;
		padding-left: 20rpx;
	}
	.sureBtn{
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		margin-top: 240rpx;
	}
</style>
