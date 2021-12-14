<template>
	<view class="page commonPageTitle">
		<!-- #ifndef MP-WEIXIN -->
		<view class="collectTitle">
			<view class="goBackBtn" @click="goBack(1)" v-if="!nextFlag"></view>
			<view class="cancel" v-if="nextFlag" @click="goBack(1)">取消</view>
			<view class="title">
				修改登录密码
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
		<view class="surePswBox" v-else>
			<view class="everRow oldPsw">
				<input type="text" v-model="password.memberPwd" v-if="pswFlag.first" placeholder="请输入旧密码" placeholderClass="placeholder" />
				<input type="password" v-model="password.memberPwd" v-else placeholder="请输入旧密码" placeholderClass="placeholder" />
				<view class="pswIcon" @click="pswFlag.first=!pswFlag.first" :class="pswFlag.first?'active':''"></view>
			</view>
			<view class="everRow">
				<input type="text" v-model="password.password" @input='pswJudge' v-if="pswFlag.second" placeholder="请输入新密码"
				 placeholderClass="placeholder" />
				<input type="password" v-model="password.password" @input='pswJudge' v-else placeholder="请输入新密码" placeholderClass="placeholder" />
				<view class="pswIcon" @click="pswFlag.second=!pswFlag.second" :class="pswFlag.second?'active':''"></view>
			</view>
			<view class="passwordProgress">
				<view class="everyEm" :class="pswStrength>0?'active1':''"><text>弱</text></view>
				<view class="everyEm" :class="pswStrength>1?'active2':''"><text>中</text></view>
				<view class="everyEm" :class="pswStrength>2?'active3':''"><text>强</text></view>
			</view>
			<view class="everRow aginPsw">
				<input type="text" v-if="pswFlag.third" v-model="password.aginPsw" placeholder="请再次确认新密码" placeholderClass="placeholder" />
				<input type="password" v-else v-model="password.aginPsw" placeholder="请再次确认新密码" placeholderClass="placeholder" />
				<view class="pswIcon" @click="pswFlag.third=!pswFlag.third" :class="pswFlag.third?'active':''"></view>
			</view>
			<view class="pswHint">8-20位，由字母（需同时包含大小写）、数字组成</view>
			<view class="complete" @click="complete">完成</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js';
	import passwordJudge from '@/utils/password.js'
	export default {
		data() {
			return {
				userInfo: {},
				countdown: { //倒计时
					inter: "",
					count: 0
				},
				params: { //下一步校验参数
					captcha: "",
					telephone: "",
					type: 5,
				},
				nextFlag: false,
				pswFlag: {
					first: false,
					second: false,
					third: false
				},
				pswStrength: 0, //密码强度
				password: {
					memberPwd: "", //原始密码
					password: "", //新密码
					aginPsw: "", //二次密码
					operateCode: ""
				}
			}
		},
		onShow() {
			this.zhuge.track("修改登录密码")
			this.account()
		},
		methods: {
			account() { //账号绑定情况
				memberApi.account().then(res => {
					if (res.data.code == 200) {
						this.userInfo = res.data.data;
						this.params.telephone = res.data.data.telephone
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			captcha() { //获取验证码
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
						this.password.operateCode = res.data.data;
						this.nextFlag = true;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			pswJudge() { //强度校验
				this.pswStrength = passwordJudge.checkPwdIntensity(this.password.password)
			},
			complete() { //完成触发
				if (!passwordJudge.isDiffStr(this.password.password)) {
					uni.showToast({
						title: "数字和大小写字母以外仅支持@#!$*_~-几种特殊符号，请修改重试",
						icon: "none"
					})
					return;
				}
				if (this.password.password != this.password.aginPsw) {
					uni.showToast({
						title: "两次密码输入不一致，请重新输入",
						icon: "none"
					})
					return;
				}
				if (!(passwordJudge.checkPassword(this.password.password, true)) || !(passwordJudge.checkPassword(this.password.aginPsw,
						true))) {
					uni.showToast({
						title: "密码由8-20位，字母（需同时包含大小写）、数字组成",
						icon: "none"
					})
					return;
				}
				if (this.password.memberPwd == this.password.password) {
					uni.showToast({
						title: "新密码与旧密码一样，请重新新输入",
						icon: "none"
					})
					return;
				}
				this.valMemberPwd()
			},
			valMemberPwd() { //验证登录密码
				memberApi.valMemberPwd({
					operateCode: this.password.operateCode,
					memberPwd: this.password.memberPwd,
					type: "5"
				}).then(res => {
					if (res.data.code == 200) {
						this.password.operateCode = res.data.data;
						this.resetMemberPwd()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			resetMemberPwd() { //重置密码
				memberApi.resetMemberPwd({
					operateCode: this.password.operateCode,
					password: this.password.password,
					type: "5"
				}).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "修改密码成功",
							icon: "none"
						})
						this.goBack(1)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.collectTitle {
		border-bottom: 1rpx solid #E6E6E6;
	}
	.cancel {
		width: 88rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
	}

	.editBox {
		width: 100%;
		padding: 112rpx 64rpx 0;
		color: #333;
	}

	.setPwdCde {
		width: 100%;
		height: 90rpx;
		border-bottom: 1rpx solid #EEEEEE;
		display: flex;
		margin-top: 48rpx;
	}

	.setPwdCde input {
		flex: 1;
		height: 100%;
		margin-right: 22rpx;
		line-height: 90rpx;
	}

	.sendCode {
		width: 160rpx;
		text-align: right;
		font-size: 30rpx;
		line-height: 88rpx;
	}

	.nextBtn,
	.complete {
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

	.countDown {
		width: 210rpx;
		font-size: 28rpx;
		line-height: 88rpx;
	}

	.surePswBox {
		padding: 24rpx 64rpx;
	}

	.everRow {
		width: 100%;
		height: 90rpx;
		position: relative;
		border-bottom: 1rpx solid #E6E6E6;
		display: flex;
	}

	.everRow input {
		flex: 1;
		margin-right: 22rpx;
		height: 90rpx;
		line-height: 90rpx;
	}

	.pswIcon {
		width: 80rpx;
		height: 90rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/shape@2x.png) no-repeat 50%;
		background-size: 40rpx 40rpx;
	}

	.pswIcon.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/eyes@2x.png) no-repeat 50%;
		background-size: 40rpx 40rpx;
	}

	.pswHint {
		margin-top: 24rpx;
		color: #666666;
		font-size: 24rpx;
		text-align: center;
	}

	.passwordProgress {
		height: 6rpx;
		width: 100%;
		display: flex;
		border-radius: 6rpx;
		margin-top: 24rpx;
	}

	.everyEm {
		position: relative;
		width: 33%;
		margin-right: 4rpx;
		background: #EEEEEE;
	}

	.everyEm text {
		position: absolute;
		bottom: -30rpx;
		font-size: 20rpx;
		color: #666666;
		left: 0;
		right: 0;
		margin: auto;
		line-height: 30rpx;
		text-align: center;
	}

	.everyEm.active1 {
		background-color: #ff7e18;
	}

	.everyEm.active2 {
		background-color: #ff5d46;
	}

	.everyEm.active3 {
		background-color: #FF1558;
	}

	.aginPsw,
	.oldPsw {
		margin-top: 72rpx;
	}
</style>
