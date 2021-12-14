<template>
	<view class="page commonPageTitle">
		<!-- #ifndef MP-WEIXIN -->
		<view class="collectTitle">
			<view class="goBackBtn" @click="goBack(1)" v-if="!nextFlag"></view>
			<view class="cancel" v-if="nextFlag" @click="goBack(1)">取消</view>
			<view class="title">
				忘记支付密码
			</view>
		</view>
		<!-- #endif  -->
		<!-- 第一步 -->
		<view class="editBox" v-if="!nextFlag">
			<view>
				本次操作需要短信确认
			</view>
			<view>
				验证码将发送至手机{{userInfo.hiddenTelephone}}
			</view>
			<view class="setPwdCde">
				<input type="text" placeholderClass="placeholder" v-model="params.captcha" placeholder="请输入验证码">
				<view class="sendCode" v-if="!countdown.count" @click="captcha">
					获取验证码
				</view>
				<view class="countDown" v-if="countdown.count">
					{{countdown.count}}秒后重新获取
				</view>
			</view>
			<view class="nextBtn" @click="verifyCaptcha">
				下一步
			</view>
		</view>
		<!-- 第二步 -->
		<view class="surePswBox" v-if="nextFlag==1">
			<view class="verification">设置支付密码，用于提现验证</view>
			<view class="passwordBox">
				<view class="everyPswBox" v-for="item,index in 6" :key='index'>
					<text v-if="index<=(payPwd.length?payPwd.length-1:-1)">*</text>
				</view>
				<input type="number" v-model="payPwd" @input='valPayPwd' maxlength="6" >
			</view>
			<view class="pswHint">
				为了保护您的账号安全，支付密码和支付密码尽量不要相同
			</view>
		</view>
		<view class="surePswBox" v-if="nextFlag==2">
			<view class="verification">请再次确认支付密码</view>
			<view class="passwordBox">
				<view class="everyPswBox" v-for="item,index in 6" :key='index'>
					<text v-if="index<=(aginPayPwd.length?aginPayPwd.length-1:-1)">*</text>
				</view>
				<input type="number" unselectable="on" v-model="aginPayPwd" @input='aginPayPwdChange' maxlength="6" >
			</view>
			<view class="submitBtn" @click='resetPayPwd' :class="aginPayPwd.length<6?'disabled':''">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js';
	import passwordJudge from '@/utils/password.js'
	export default{
		data(){
			return{
				userInfo:{},
				countdown:{	//倒计时
					inter:"",
					count:0
				},
				params:{	//下一步校验参数
					captcha:"",
					telephone:"",
					type:6,
				},
				nextFlag:0,
				operateCode:"",	
				payPwd:"",	//原始密码
				aginPayPwd:"",	//再次确认密码
			}
		},
		onShow(){
			this.zhuge.track("忘记支付密码-落地页")
			this.account()
		},
		methods:{
			account(){	//账号绑定情况
				memberApi.account().then(res=>{
					if(res.data.code==200){
						this.userInfo = res.data.data;
						this.params.telephone = res.data.data.telephone
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			captcha(){	//获取验证码
				this.countDownTime();
				memberApi.captcha({telephone:this.params.telephone,type:this.params.type}).then(res=>{
					if(res.data.code==200){}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			countDownTime(){	//倒计时
				this.countdown.count = 60
				this.countdown.inter = setInterval(()=>{
					this.countdown.count--;
					if(!this.countdown.count){
						clearInterval(this.countdown.inter)
					}
				},1000)
			},
			verifyCaptcha(){	//校验验证码
				if(!this.params.captcha){
					uni.showToast({
						title:"验证码不能为空!",
						icon:"none"
					})
					return
				}
				memberApi.verifyCaptcha(this.params).then(res=>{
					if(res.data.code==200){
						this.nextFlag = 1;
						this.operateCode = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			valPayPwd(){	//验证支付密码（修改支付密码使用）
				if(this.payPwd.length>=6){
					this.nextFlag = 2;
				}
			},
			aginPayPwdChange(){	//再次输入密码完成后
				if(this.aginPayPwd.length>=6 && this.aginPayPwd!=this.payPwd){
					this.nextFlag = 1;
					uni.showToast({
						title: '两次密码输入不一致，请重新设置',
						icon:"none"
					});
					this.payPwd = "";
					this.aginPayPwd = "";
				}
			},
			resetPayPwd(){	//重置支付密码
				memberApi.resetPayPwd({operateCode:this.operateCode,payPassword:this.payPwd}).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"密码重置成功",
							icon:"none"
						})
						this.goBack(1)
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
	.commonPageTitle{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.collectTitle{
		border-bottom: 1rpx solid #E6E6E6;
	}
	.cancel{
		width: 88rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
	}
	.editBox{
		width: 100%;
		padding: 112rpx 64rpx 0;
		color: #333;
	}
	.setPwdCde{
		width: 100%;
		height: 90rpx;
		border-bottom: 1rpx solid #EEEEEE;
		display: flex;
		margin-top: 48rpx;
	}
	.setPwdCde input{
		flex: 1;
		height: 100%;
		margin-right: 22rpx;
		line-height: 90rpx;
	}
	.sendCode{
		width: 160rpx;
		text-align: right;
		font-size: 30rpx;
		line-height: 88rpx;
	}
	.nextBtn,.complete{
		width: 100%;
		height: 88rpx;
		background: #FF1558;
		line-height: 88rpx;
		color: #FFFFFF;
		border-radius: 100rpx;
		margin-top: 112rpx;
		font-size: 32rpx;
		text-align: center;
	}
	.countDown{
		width: 210rpx;
		font-size: 28rpx;
		line-height: 88rpx;
	}
	.surePswBox{
		padding: 100rpx 50rpx;
	}
	.verification{
		width: 100%;
		font-size: 36rpx;
		color: #333333;
		text-align: center;
		margin-bottom: 94rpx;
	}
	.passwordBox{
		width: 100%;
		height: 100rpx;
		display: flex;
		line-height: 100rpx;
		position: relative;
	}
	.everyPswBox{
		width: 16%;
		margin-right: 10rpx;
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		border: 1rpx solid #DBDBDB;
		color: #333333;
		border-radius: 16rpx;
	}
	.passwordBox input{
		position: absolute;
		width: 100%;
		height: 100rpx;
		opacity: 0.01;
		color: #FFFFFF;
		left: 0;
		font-size: 0;
	}
	.pswHint{
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		color: #787878;
		margin-top: 31rpx;
	}
	.submitBtn{
		width: 100%;
		height: 88rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		border-radius: 100rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		margin-top: 170rpx;
	}
	.submitBtn.disabled{
		background-color: rgb(216,216,216);
	}
</style>
