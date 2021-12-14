<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="{}"></defaultTitle>
		
		<view class="forgetBox">
			<view class="contain">
				手机验证
			</view>
			<view class="forgetHint">本次操作需要短信确认</view>
			<view class="forgeInput">
				<view class="input">
					<input type="text" v-model="params.telephone" placeholder="请输入手机号" placeholderClass="placeholder" />
				</view>
			</view>
			<view class="forgeInput">
				<view class="input">
					<input type="text" v-model="params.captcha" placeholder="请输入验证码" placeholderClass="placeholder" />
				</view>
				<view class="sendCode" v-if="!countdown.count" @click="captcha">
					获取验证码
				</view>
				<view class="countDown" v-if="countdown.count">
					{{countdown.count}}秒后重新获取
				</view>
			</view>
			<view class="nextBtn" @click="verifyCaptcha">下一步</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default {
		data() {
			return {
				countdown: { //倒计时
					inter: "",
					count: 0
				},
				params: {
					telephone: "",
					captcha: "",
					type: 3
				},
			}
		},
		methods: {
			captcha() { //获取验证码
				if (!(/^\d{11}$/.test(this.params.telephone))) {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					})
					return
				}
				this.countDownTime();
				memberApi.captcha({
					telephone: this.params.telephone,
					type: this.params.type
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
				memberApi.verifyCaptcha(this.params).then(res => {
					if (res.data.code == 200) {
						this.$Router.replace({
							path:"/pages/resetPassword/index",
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
		},
		onShow() {
			this.zhuge.track("忘记密码页面")
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
	}

	.goBackBtn {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_1@2x.png) no-repeat 50%;
		background-size: 16rpx 30rpx;
	}

	.forgetBox {
		width: 100%;
		height: auto;
		padding: 24rpx 64rpx 0;
	}

	.contain {
		font-size: 60rpx;
		color: #000000;
		font-weight: 700;
		line-height: 84rpx;
		padding-bottom: 24rpx;
	}

	.forgetHint {
		color: #333333;
	}

	.forgeInput {
		width: 100%;
		height: 90rpx;
		position: relative;
		display: flex;
		margin-bottom: 22rpx;
		border-bottom: 1rpx solid #EEEEEE;
		margin-top: 42rpx;
	}

	.forgeInput .input {
		flex: 1;
		height: 90rpx;
		line-height: 90rpx;
		margin-right: 22rpx;
	}

	.forgeInput .input input {
		width: 100%;
		height: 100%;
	}

	.sendCode {
		width: 160rpx;
		text-align: right;
		font-size: 30rpx;
		line-height: 88rpx;
	}

	.countDown {
		width: 210rpx;
		font-size: 28rpx;
		line-height: 88rpx;
	}

	.nextBtn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		margin-top: 120rpx;
		font-size: 36rpx;
		color: #FFFFFF;
		background-color: #FF1558;
		text-align: center;
		border-radius: 71rpx;
	}
</style>
