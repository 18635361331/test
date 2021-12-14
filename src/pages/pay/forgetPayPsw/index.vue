<template>
	<view class="page">
		<uni-popup ref="forgetPopup" type="bottom">
			<view class="payPopup">
				<view class="payPopupTitle">
					设置钱包支付密码
					<view class="closePopup" @click="closeForgetPopup"></view>
					<view class="sureBtn" @click="verifyCaptcha">
						下一步
					</view>
				</view>
				<view class="single">
					<view class="setPW-tit">
						请验证手机号
					</view>
					<view class="setPW-info">
						{{payInfo.mobile}}
					</view>
					<view class="setPW-info getCode">
						<input type="text" v-model="params.captcha" placeholder-style="color:#ccc" placeholder="请输入验证码" />
						<text v-if="!countdown.count" @click="captcha">获取验证码</text>
						<text v-if="countdown.count">{{countdown.count}}秒后重新获取</text>
					</view>
					<view class="setPwdText">
						钱包支付密码用于积分、礼卡、账户支付时使用
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="setPswPopup" type="bottom">
			<view class="payPopup">
				<view class="payPopupTitle">
					重置支付密码
					<view class="closePopup" @click="closeSetPswPopup"></view>
					<view class="sureBtn" @click="resetPayPwd">
						确定
					</view>
				</view>
				<view class="single">
					<view class="setPW-tit">
						重置密码并支付
					</view>
					<view class="passwordInput">
						<input type="text" v-model="params.password" maxlength="6" />
						<view class="everyPwd" v-for="item,index in 6"  unselectable="on" :key='index'>
							<text v-if="index<=(params.password?params.password.length-1:-1)">*</text>
						</view>
					</view>
					<view class="setPwdText">
						支付密码用于积分、礼卡、账户支付时使用
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default {
		props:['payInfo'],
		data() {
			return {
				params:{
					password:""
				},
				countdown:{
					count:"",
					inter:""
				}
			}
		},
		methods:{
			openForgetPopup(){	//打开忘记密码验证手机号弹窗
				this.$refs.forgetPopup.open()
			},
			closeForgetPopup(){	//关闭忘记密码验证手机号弹窗  并打开输入密码弹窗
				this.$refs.forgetPopup.close();
				this.$emit("openPswPopup")
			},
			openSetPswPopup(){		//打开重置密码弹窗并关闭手机验证弹窗
				this.$refs.forgetPopup.close();
				this.$refs.setPswPopup.open()
			},
			closeSetPswPopup(){	//关闭重置密码 并打开验证手机号弹窗
				this.$refs.setPswPopup.close();
				this.$refs.forgetPopup.open()
			},
			captcha() { //获取验证码
				this.countDownTime();
				memberApi.captcha({
					telephone: this.payInfo.mobile,
					type: 6
				}).then(res => {
					if (res.data.code == 200) {} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
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
			verifyCaptcha() { //校验验证码
				if (!this.params.captcha) {
					uni.showToast({
						title: "验证码不能为空!",
						icon: "none"
					})
					return
				}
				memberApi.verifyCaptcha({captcha:this.params.captcha,type:6}).then(res => {
					if (res.data.code == 200) {
						this.params.operateCode = res.data.data
						this.openSetPswPopup()	//打开设置密码弹窗
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			resetPayPwd(){	//重置密码
				memberApi.resetPayPwd({operateCode:this.params.operateCode,payPassword:this.params.password}).then(res=>{
					if(res.data.code==200){
						this.$refs.setPswPopup.close()
						this.$emit("submitPay",this.params.password)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.payPopup {
		width: 100%;
		height: 578rpx;
		background-color: #FFFFFF;
	}

	.payPopupTitle {
		width: 100%;
		height: 100rpx;
		position: relative;
		text-align: center;
		line-height: 100rpx;
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
	.setPW-tit {
		width: 100%;
		text-align: center;
		line-height: 48rpx;
		font-size: 32rpx;
		color: #2d2d2d;
		margin-bottom: 40rpx;
	}
	.setPW-info{
		width: 100%;
		text-align: center;
		line-height: 88rpx;
		height: 88rpx;
		font-size: 34rpx;
		color: #2D2D2D;
		margin-bottom: 24rpx;
	}
	.getCode{
		width: 620rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		color: rgb(51,51,51);
		justify-content: space-between;
		padding: 12rpx;
		border: 1rpx solid #E4E4E4;
		border-radius: 8rpx;
	}
	.getCode input{
		flex: 1;
		height: 88rpx;
		text-align: left;
		padding-left: 20rpx;
	}
	.setPwdText {
		margin-top: 80rpx;
		text-align: center;
		color: #787878;
	}
	
	.sureBtn {
		position: absolute;
		right: 24rpx;
		line-height: 100rpx;
		top: 0;
	}
	.passwordInput {
		width: 100%;
		height: 100rpx;
		padding-left: 30rpx;
		position: relative;
		line-height: 100rpx;
		display: flex;
	}
	
	.passwordInput input {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		color: #FFFFFF;
		font-size: 0;
		opacity: 0.01;
		z-index: 10;
	}
	
	.everyPwd {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border: 1rpx solid #DBDBDB;
		border-radius: 16rpx;
		margin-right: 20rpx;
		font-size: 36rpx;
		color: #333333;
	}
	.single {
		width: 100%;
		height: 650rpx;
		padding-top: 57rpx;
		padding-bottom: 20rpx;
	}
</style>
