
<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="{}"></defaultTitle>
		<view class="warnMsg">
			<image src='http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/warning@2x.png' mode=""></image>
			系统检测到您的账户未绑定手机号，请先绑定手机号。
		</view>
		<view class="contain">
			<view class="containTitle">
				手机验证
			</view>
			<view class="tips">
				本次操作需要短信确认
			</view>
			<view class="containInput telInput">
				<view class="containBox">
					<input type="text" v-model="params.newTelephone" placeholder="请输入手机号" placeholder-style="color:#ccc" />
				</view>
			</view>
			<view class="containInput telInput">
				<view class="containBox">
					<input type="text" v-model="params.captcha" placeholder="请输入验证码" placeholder-style="color:#ccc" />
				</view>
				<text v-if="!countdown.count" class="getCode" @click="captcha">获取验证码</text>
				<text v-if="countdown.count" class="getCode countDown">{{countdown.count}}秒后重新获取</text>
			</view>
			<view class="sureBtn" @click="checkTel">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default{
		data(){
			return{
				countdown:{
					inter:"",
					count:0
				},
				params:{
					loginName:"",
					operateCode:"",
					newTelephone:"",
					captcha:""
				},
			}
		},
		methods:{
			checkTel(){	//完成触发
				if(!(/^\d{11}$/.test(this.params.newTelephone))){
					uni.showToast({
						title:"手机格式错误或为空",
						icon:"none"
					})
					return;
				}
				if(!(/^\d{6}$/.test(this.params.captcha))){
					uni.showToast({
						title:"验证码输入有误",
						icon:"none"
					})
					return;
				}
				this.bindTelephone()
			},
			bindTelephone(){	//绑定手机号
				memberApi.bindTelephone(this.params).then(res=>{
					if(res.data.code==200){
						if(this.$Route.query.isLogin){
							if(res.data.data.hasSetPwd){
								this.goBack(2);
								uni.setStorageSync("sessionId",res.data.data.sessionId)
							}else{
								this.$Router.replace({
									path: "/pages/registerSetPassword/index",
									query: {
										telephone: res.data.data.telephone,
										operateCode: res.data.data.setPwdCode
									}
								})
							}
						}else{
							this.goBack(2);
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			captcha(){	//获取验证码
				if(!(/^\d{11}$/.test(this.params.newTelephone))){
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"none"
					})
					return;
				}
				this.countDownTime();
				memberApi.captcha({telephone:this.params.newTelephone,type:this.$Route.query.isLogin?8:4}).then(res=>{
					if(res.data.code==200){}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			countDownTime(){
				this.countdown.count = 60
				this.countdown.inter = setInterval(()=>{
					this.countdown.count--;
					if(!this.countdown.count){
						clearInterval(this.countdown.inter)
					}
				},1000)
			},
		},
		mounted() {
			this.params.loginName = this.$Route.query.loginName
		},
		onShow() {
			this.params.operateCode = this.$Route.query.operateCode
			this.zhuge.track("登录后未绑定手机-绑定手机-落地页")
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.warnMsg{
		width: 100%;
		height: 88rpx;
		background-color: #fff6e1;
		font-size: 24rpx;
		color: #ff7e18;
		line-height: 88rpx;
		padding: 0 32rpx;
	}
	
	.warnMsg image{
		width: 20rpx;
		height: 20rpx;
		margin-right: 17rpx;
		vertical-align: middle;	
	}
	
	.contain{
		padding: 24rpx 64rpx 0;
	}
	
	.containTitle{
		font-size: 60rpx;
		color: #000000;
		font-weight: 700;
		line-height: 84rpx;
		padding-bottom: 24rpx;
	}
	
	.tips{
		line-height: 40rpx;
	}
	
	.containInput{
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #EEEEEE;
		display: flex;
		margin-bottom: 22rpx;
		position: relative;
	}
	
	.containBox{
		height: 90rpx;
		line-height: 90rpx;
		margin-right: 22rpx;
		flex: 1;
	}
	
	.containBox input{
		margin: 22rpx 0;
		height: 42rpx;
		line-height: 42rpx;
		color: #333333;
	}
	.telInput{
		margin-top: 42rpx;
	}
	
	.sendCode{
		width: 160rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 30rpx;
		text-align: right;
	}
	
	.sureBtn{
		margin-top: 72rpx;
		width: 100%;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		color: #fff;
		background-color: #FF1558;
		border-radius: 71rpx;
		font-size: 36rpx;
	}
	.getCode{
		color: rgb(51,51,51);
		width: 175rpx;
		font-size: 30rpx;
		text-align: right;
		line-height: 88rpx;
	}
	.countDown{
		font-size: 28rpx;
		width: 226rpx;
	}
</style>
