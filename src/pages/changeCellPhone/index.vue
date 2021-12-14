<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="settingCont">
			<view class="msg">
				点击获取验证码，更换手机号码
			</view>
			<view class="oldPhone">
				{{telephone}}
			</view>
			<view class="telCode">
				<view class="emIcon"></view>
				<input type="text" v-model="params.captcha" placeholder="请输入验证码" placeholder-style="color:#ccc">
				<text v-if="!countdown.count" class="getCode" @click="captcha">获取验证码</text>
				<text v-if="countdown.count" class="getCode countDown">{{countdown.count}}秒后重新获取</text>
			</view>
		</view>
		<view class="nextBtn" @click="verifyCaptcha">
			下一步
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default {
		data() {
			return {
				countdown: {
					inter: "",
					count: 0
				},
				params: {
					captcha: "",
					type:"8"
				},
				telephone:"",
				defaultTitleDto:{
					title:'更换手机',
					bottomColor:'#e6e6e6'
				}
			}
		},
		methods: {
			captcha() { //获取验证码
				this.countDownTime();
				memberApi.captcha({
					telephone: this.$Route.query.tel,
					type: "8"
				}).then(res => {
					if (res.data.code == 200) {} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			countDownTime() {
				this.countdown.count = 60
				this.countdown.inter = setInterval(() => {
					this.countdown.count--;
					if (!this.countdown.count) {
						clearInterval(this.countdown.inter)
					}
				}, 1000)
			},
			verifyCaptcha(){	//校验验证码
				if(!this.params.captcha){
					uni.showToast({
						title:"验证码不能为空!",
						icon:"none"
					})
					return
				}
				memberApi.verifyCaptcha({telephone:this.$Route.query.tel,captcha:this.params.captcha,type:"8"}).then(res=>{
					if(res.data.code==200){
						this.$Router.push({
							path:"/pages/phoneCheck/index",
							query:{
								operateCode:res.data.data
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
		},
		onShow() {
			this.telephone = this.$Route.query.tel
			this.zhuge.track("更换手机")
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.nextBtn {
		width: 690rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		margin: 0 auto;
		line-height: 100rpx;
		padding-right: 32rpx;
		color: #FFFFFF;
		background-color: #FF1558;
		border-radius: 100rpx;
	}

	.settingCont {
		width: 100%;
		margin-bottom: 80rpx;
	}

	.msg {
		text-align: center;
		color: #A8A8A8;
		padding-top: 60rpx;
	}

	.oldPhone {
		font-size: 44rpx;
		color: #686868;
		text-align: center;
	}

	.telCode {
		width: 690rpx;
		height: 100rpx;
		margin: 0 auto;
		margin-top: 36rpx;
		border-radius: 84rpx;
		display: flex;
		position: relative;
		border: 1rpx solid #DDDDDD;
	}

	.emIcon {
		width: 40rpx;
		height: 100rpx;
		margin-left: 40rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/telcode@2x.png) no-repeat 50%;
		background-size: 38rpx;
	}

	.telCode input {
		flex: 1;
		height: 100rpx;
		margin-right: 22rpx;
		margin-left: 22rpx;
	}

	.getCode {
		color: rgb(51, 51, 51);
		width: 190rpx;
		font-size: 30rpx;
		line-height: 88rpx;
		text-align: center;
	}

	.countDown {
		font-size: 28rpx;
		width: 226rpx;
	}
</style>
