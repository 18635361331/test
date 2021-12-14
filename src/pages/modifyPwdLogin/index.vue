<template>
	<view class="page commonPageTitle">
		<view class="collectTitle">
			<view class="goBackText" @click="goBack(1)">取消</view>
			<view class="title">
				设置新登录密码
			</view>
		</view>
		<view class="forgetBox">
			<view class="everRow">
				<input type="text" v-model="params.password" @input='pswJudge' v-if="pswFlag.first" placeholder="请输入新密码"
				 placeholderClass="placeholder" />
				<input type="password" v-model="params.password" @input='pswJudge' v-else placeholder="请输入新密码" placeholderClass="placeholder" />
				<view class="pswIcon" @click="pswFlag.first=!pswFlag.first" :class="pswFlag.first?'active':''"></view>
			</view>
			<view class="passwordProgress">
				<view class="everyEm" :class="pswStrength>0?'active1':''"><text>弱</text></view>
				<view class="everyEm" :class="pswStrength>1?'active2':''"><text>中</text></view>
				<view class="everyEm" :class="pswStrength>2?'active3':''"><text>强</text></view>
			</view>
			<view class="everRow aginPsw">
				<input type="text" v-if="pswFlag.second" v-model="aginPsw" placeholder="请再次确认新密码" placeholderClass="placeholder" />
				<input type="password" v-else v-model="aginPsw" placeholder="请再次确认新密码" placeholderClass="placeholder" />
				<view class="pswIcon" @click="pswFlag.second=!pswFlag.second" :class="pswFlag.second?'active':''"></view>
			</view>
			<view class="pswHint">8-20位，由字母（需同时包含大小写）、数字组成</view>
			<view class="complete" @click="complete">确定</view>
		</view>
	</view>
</template>

<script>
	import passwordJudge from '@/utils/password.js';
	import memberApi from '@/api/member/index.js';
	export default {
		data() {
			return {
				params: {
					operateCode: "",
					password: "",
					telephone: "",
					type: 5
				},
				aginPsw: "",
				pswFlag: {
					first: false,
					second: false
				},
				pswStrength: 0 //密码强度
			}
		},
		onShow() {
			this.zhuge.track("登录设置新的密码")
			this.params.telephone = this.$Route.query.telephone;
			this.params.operateCode = this.$Route.query.operateCode
		},
		methods: {
			complete() { //完成触发
				if (!passwordJudge.isDiffStr(this.params.password)) {
					uni.showToast({
						title: "数字和大小写字母以外仅支持@#!$*_~-几种特殊符号，请修改重试",
						icon: "none"
					})
					return;
				}
				if (this.params.password != this.aginPsw) {
					uni.showToast({
						title: "两次密码输入不一致，请重新输入",
						icon: "none"
					})
					return;
				}
				if (!(passwordJudge.checkPassword(this.params.password, true)) || !(passwordJudge.checkPassword(this.aginPsw,
						true))) {
					uni.showToast({
						title: "密码由8-20位，字母（需同时包含大小写）、数字组成",
						icon: "none"
					})
					return;
				}
				this.resetMemberPwd()	//重置密码
			},
			pswJudge() { //强度校验
				this.pswStrength = passwordJudge.checkPwdIntensity(this.params.password)
			},
			resetMemberPwd() { //重置密码
				memberApi.resetMemberPwd(this.params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "重置密码成功",
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
		border-bottom: 1rpx solid #EEEEEE;
	}
	.goBackText {
		width: 100rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #666666;
	}
	
	.forgetBox {
		width: 100%;
		height: auto;
		padding: 112rpx 64rpx 0;
	}

	.contain {
		font-size: 60rpx;
		color: #000000;
		font-weight: 700;
		line-height: 84rpx;
		padding-bottom: 24rpx;
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
	.aginPsw{
		margin-top: 72rpx;
	}
</style>
