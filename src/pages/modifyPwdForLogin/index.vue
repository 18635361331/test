<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view>
			<view class="warnMsg">
				<image src='http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/warning@2x.png' mode=""></image>
				系统检测到您的账户存在安全隐患，为了保护您的账户安全，请设置新的登录密码。
			</view>
			<view class="contain">
				<view class="containTitle">
					手机验证
				</view>
				<view class="tips">
					本次操作需要短信确认
				</view>
				<view class="verifyTel" v-if="$Route.query.verifyTel">
					验证码将发送至手机{{$Route.query.telephone.substring(0,3)+"****"+$Route.query.telephone.substring(7,11)}}
				</view>
				<view class="containInput telInput">
					<view class="containBox">
						<input type="text" v-model="params.captcha" placeholder="请输入验证码" placeholder-style="color:#ccc" />
					</view>
					<text v-if="!countdown.count" class="getCode" @click="captcha">获取验证码</text>
					<text v-if="countdown.count" class="getCode countDown">{{countdown.count}}秒后重新获取</text>
				</view>
				<view class="submitBtn" @click="verifyCaptcha">
					下一步
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default {
		data() {
			return {
				params:{
					captcha:"",
					telephone:"",
					type:5
				},
				countdown:{
					inter:"",
					count:0
				},
				defaultTitleDto:{
				}
			}
		},
		methods: {
			captcha(){	//获取验证码
				if(!(/^\d{11}$/.test(this.params.telephone))){
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"none"
					})
					return;
				}
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
			verifyCaptcha() { //校验验证码
				if (!this.params.captcha) {
					uni.showToast({
						title: "验证码不能为空!",
						icon: "none"
					})
					return
				}
				memberApi.verifyCaptcha(this.params).then(res => {
					if (res.data.code == 200) {
						this.$Router.replace({
							path:"/pages/modifyPwdLogin/index",
							query:{
								telephone:this.params.telephone,
								operateCode:res.data.data
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
			this.params.telephone = this.$Route.query.telephone
		},
		onShow() {
			this.zhuge.track("登录后修改密码")
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.warnMsg {
		width: 100%;
		height: 116rpx;
		background-color: #fff6e1;
		font-size: 24rpx;
		color: #ff7e18;
		padding: 24rpx 32rpx;
		line-height: 33rpx;
	}

	.warnMsg image {
		width: 20rpx;
		height: 20rpx;
		margin-right: 17rpx;
		vertical-align: middle;
	}

	.contain {
		padding: 24rpx 64rpx 0;
	}

	.containTitle {
		font-size: 60rpx;
		color: #000000;
		font-weight: 700;
		line-height: 84rpx;
		padding-bottom: 24rpx;
	}

	.tips {
		line-height: 40rpx;
	}

	.containInput {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #EEEEEE;
		display: flex;
		margin-bottom: 22rpx;
		position: relative;
	}

	.containBox {
		height: 90rpx;
		line-height: 90rpx;
		margin-right: 22rpx;
		flex: 1;
	}

	.containBox input {
		margin: 22rpx 0;
		height: 42rpx;
		line-height: 42rpx;
		color: #333333;
	}

	.telInput {
		margin-top: 42rpx;
	}

	.sendCode {
		width: 160rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 30rpx;
		text-align: right;
	}
	
	.getCode{
		color: rgb(51,51,51);
		width: 175rpx;
		font-size: 30rpx;
		text-align: right;
		line-height: 88rpx;
	}
	.submitBtn{
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		margin-top: 72rpx;
		background-color: #FF1558;
		border-radius: 100rpx;
		color: #FFFFFF;
		font-size: 32rpx;
	}
	.countDown{
		font-size: 28rpx;
		width: 226rpx;
	}
</style>
