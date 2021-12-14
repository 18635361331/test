<template>
	<view class="page">
		<uni-popup ref="pswPopup" type="bottom">
			<view class="payPopup">
				<view class="payPopupTitle">
					输入支付密码
					<view class="closePopup" @click="closePswPopup"></view>
					<view class="sureBtn" @click="submitPay">
						确定
					</view>
				</view>
				<view class="single">
					<view class="forgetPassword" @click="openForgetPopup">
						忘记密码?
					</view>
					<view class="passwordInput">
						<input type="text" v-model="submitParams.password" unselectable="on" maxlength="6" />
						<view class="everyPwd" v-for="item,index in 6" :key='index'>
							<text v-if="index<=(submitParams.password?submitParams.password.length-1:-1)">*</text>
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
	export default {
		data() {
			return {
				submitParams:{
					password:""
				}
			}
		},
		methods:{
			openPswPopup(){	//打开支付密码弹窗
				this.$refs.pswPopup.open();
			},
			closePswPopup(){	//关闭支付密码弹窗
				this.$refs.pswPopup.close()
			},
			openForgetPopup(){	//打开忘记密码弹窗
				this.closePswPopup()
				this.$emit("openForgetPopup");
			},
			submitPay(){	//提交订单
				if(this.submitParams.password){
					this.$emit("submitPay",this.submitParams.password)
				}else{
					uni.showToast({
						title:"请输入支付密码",
						icon:"none"
					})
				}
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
	
	.sureBtn {
		position: absolute;
		right: 24rpx;
		line-height: 100rpx;
		top: 0;
	}
	
	.single {
		width: 100%;
		height: 650rpx;
		padding-top: 57rpx;
		padding-bottom: 20rpx;
	}
	.forgetPassword {
		text-align: right;
		padding: 0 30rpx;
		color: #787878;
		margin-bottom: 20rpx;
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
		left: 30rpx;
		opacity: 0.01;
		color:transparent;
		z-index: 1;
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
