<template>
	<view class="page">
		<uni-popup ref="noPswPopup" type="bottom">
			<view class="payPopup">
				<view class="payPopupTitle">
					设置钱包支付密码
					<view class="closePopup" @click="closeNoPswPopup"></view>
					<view class="sureBtn closeBtn" @click="closeNoPswPopup"></view>
				</view>
				<view class="single">
					<view class="placeSetPsw">
						请先设置钱包支付密码
					</view>
					<view class="setPwdText">
						钱包支付密码用于积分、礼卡、账户支付时使用
					</view>
					<view class="setPswBox" @click="openSetPswPopup">
						设定支付密码
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="setPswPopup" type="bottom">
			<view class="payPopup">
				<view class="payPopupTitle">
					设置钱包支付密码
					<view class="closePopup" @click="closeSetPswPopup"></view>
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
						<input type="text" v-model="params.captcha" unselectable="on" placeholder-style="color:#ccc" placeholder="请输入验证码" />
						<text v-if="!countdown.count" @click="captcha">获取验证码</text>
						<text v-if="countdown.count">{{countdown.count}}秒后重新获取</text>
					</view>
					<view class="setPwdText">
						钱包支付密码用于积分、礼卡、账户支付时使用
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="setPassword" type="bottom">
			<view class="payPopup">
				<view class="payPopupTitle">
					设置支付密码
					<view class="closePopup" @click="closePassword"></view>
					<view class="sureBtn" @click="setPayPwd">
						确定
					</view>
				</view>
				<view class="single">
					<view class="setPW-tit">
						设置6位数支付密码支付
					</view>
					<view class="passwordInput">
						<input type="text" unselectable="on" v-model="params.password" maxlength="6" />
						<view class="everyPwd" v-for="item,index in 6" :key='index'>
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
			openNoPswPopup(){	//打开暂无支付密码弹窗
				this.$refs.noPswPopup.open()
			},
			closeNoPswPopup(){	//关闭暂无支付密码弹窗
				this.$refs.noPswPopup.close()
			},
			closeSetPswPopup(){	//关闭设置密码弹窗 打开输入密码弹窗
				this.$refs.setPswPopup.close();
				this.openNoPswPopup()
			},
			openSetPswPopup(){	//打开设置密码弹窗第一步 验证手机号
				this.$refs.setPswPopup.open();
				this.closeNoPswPopup()
			},
			openSetPassword(){	//打开设置密码弹窗第二步  设置密码
				this.$refs.setPswPopup.close();
				this.$refs.setPassword.open();
			},
			closePassword(){	//关闭设置密码弹窗第二步  返回第一步
				this.$refs.setPswPopup.open();
				this.$refs.setPassword.close();
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
						this.openSetPassword()	//打开设置密码弹窗
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			setPayPwd(){	//忘记密码走到最后一步点击确定 设置支付密码
				if(!this.params.password){
					uni.showToast({
						title:"请输入支付密码",
						icon:"none"
					})
					return
				}
				memberApi.setPayPwd({operateCode:this.params.operateCode,payPassword:this.params.password}).then(res=>{
					if(res.data.code==200){
						this.$refs.setPassword.close()
						this.$emit("submitPay",this.params.password)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
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
	.setPW-tit {
		width: 100%;
		text-align: center;
		line-height: 48rpx;
		font-size: 32rpx;
		color: #2d2d2d;
		margin-bottom: 40rpx;
	}
	.placeSetPsw{
		width: 100%;
		height: auto;
		text-align: center;
		margin-top: 30rpx;
		line-height: 48rpx;
		color: #FF1558;
		font-size: 34rpx;
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
	.sureBtn,.closeBtn {
		position: absolute;
		right: 24rpx;
		line-height: 100rpx;
		top: 0;
		font-size: 28rpx;
	}
	.closeBtn{
		width: 60rpx;
		height: 60rpx;
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png") no-repeat 50%;
		background-size: 28rpx;
		top: 20rpx;
	}
	.single {
		width: 100%;
		height: 650rpx;
		padding-top: 57rpx;
		padding-bottom: 20rpx;
	}

	

	.passwordInput {
		width: 100%;
		height: 100rpx;
		padding-left: 30rpx;
		position: relative;
		line-height: 100rpx;
		display: flex;
	}
	.setPswBox{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #FF1558;
		margin-top: 136rpx;
	}
	.passwordInput input {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.01;
		color: #FFFFFF;
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

	.setPwdText {
		margin-top: 80rpx;
		text-align: center;
		color: #787878;
	}

</style>
