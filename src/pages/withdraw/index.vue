<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="head">
			<view class="top">
				<text>可提现金额（元）</text>
				<view @click="$Router.push({path:'/pages/withdraw/records'})">提现记录 <text class="arrow-right"></text></view>
			</view>
			<view class="money">¥{{withdraw.balance||0}}</view>
		</view>
		<view class="card">
			<text class="title">提现金额</text>
			<view class="center">
				<text>¥</text>
				<input type="number" v-model="money" placeholder="请输入提现金额" placeholder-class="placeholder" placeholder-style="font-size: 28rpx;color: #999999;"/>
			</view>
			<view class="btn" :class="money>0?'active':''" @click="verifyPopOpen()">申请提现</view>
			<text class="tips">提现金额至少20.00元起</text>
		</view>

		<uni-popup ref="verifyPop" type="bottom">
			<view class="phoneModal">
				<view class="title">提现安全校验</view>
				<view class="everyInfo">
					<view class="fixedInfo">
						手机号码<text>*</text>
					</view>
					<text class="placeType">{{telephone}}</text>
				</view>
				<view class="everyInfo">
					<view class="fixedInfo">
						验证码<text>*</text>
					</view>
					<input type="number" v-model="captcha" class="placeType" placeholder-class="placeholder" placeholder="输入有效验证码" />
					<text v-if="!countdown.count" class="getCode" @click="sendCaptcha">获取验证码</text>
					<text v-else class="getCode countDown">{{countdown.count}}秒后重新获取</text>
				</view>
				<view class="sureBtn" @click="apply">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import cashApi from '@/api/cash/index.js';
	
	export default {
		data() {
			return {
				defaultTitleDto: {
					title: '提现',
				},
				telephone: '',
				money: '',
				captcha:'',
				countdown: { //倒计时
					inter: "",
					count: 0
				},
				withdraw:'',//提现
			}
		},
		methods: {
			withdrawInfo(){ // 用户提现信息
				cashApi.withdrawInfo().then(res=>{
					if(res.data.code==200){
						this.withdraw = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			sendCaptcha() { //获取验证码
				if(this.countdown.count>0){
					return false
				}
				this.countDownTime();
				cashApi.sendCaptcha().then(res => {
					if (res.data.code == 200) {
						
					} else {
						clearInterval(this.countdown.inter)
						this.countdown.count = 0
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			countDownTime() { //倒计时开始
				this.countdown.count = 60
				this.countdown.inter = setInterval(() => {
					this.countdown.count--;
					if (!this.countdown.count) {
						clearInterval(this.countdown.inter)
					}
				}, 1000)
			},
			apply(){
				if(!this.captcha){
					uni.showToast({
						title: "请先完善信息",
						icon: "none"
					})
					return;
				}
				// 发起请求 
				cashApi.apply({withdrawAmount:this.money,captcha:this.captcha}).then(res => {
					if (res.data.code == 200) {
						this.$refs.verifyPop.close()
						uni.showToast({
							title: "提现成功",
							icon: "none"
						})
						// 清除
						this.withdrawInfo()
						this.money = ''
						this.captcha = ''
						if(this.countdown.count>0){
							clearInterval(this.countdown.inter)
							this.countdown.count = 0
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			verifyPopOpen(){
				if(this.money>(this.withdraw.balance||0)){
					uni.showToast({
						title: "提现金额不能超过可提现金额",
						icon: "none"
					})
					return false;
				}
				this.$refs.verifyPop.open()
			}
		},
		onLoad() {
			this.telephone = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).telephone:''
			this.withdrawInfo()
		},
		
	}
</script>

<style scoped lang="scss">
	.commonPageTitle {
		background: #F5F5F5;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		height: 100vh;
	}

	.head {
		width: 100%;
		height: 310rpx;
		background-image: url($img-oss+'withdrawBg.png');
		background-size: 100%;
		padding: 30rpx;

		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30rpx;
			font-weight: 600;
			color: #FFFFFF;

			&>view {
				font-size: 24rpx;
				font-weight: 400;
				color: #D5902E;
			}
		}

		.money {
			font-size: 40rpx;
			font-weight: 600;
			color: #FFFFFF;
			margin-top: 54rpx;
		}
	}

	.arrow-right {
		display: inline-block;
		width: 16rpx;
		height: 16rpx;
		transform: rotate(45deg);
		border-top: 2px solid #D5902E;
		border-right: 2px solid #D5902E;
		margin-left: 10rpx;
	}

	.card {
		width: calc(100% - 60rpx);
		background: #FFFFFF;
		box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
		margin: 0 auto;
		margin-top: -66rpx;
		padding: 20rpx 30rpx;

		.title {
			font-size: 30rpx;
			font-weight: 600;
			color: #333333;
			margin-top: 10rpx;
		}
	}

	.center {
		margin-top: 40rpx;
		border-bottom: 1px solid #F4F5F6;
		display: flex;
		height: 120rpx;
		align-items: center;
		font-size: 54rpx;
		font-weight: 600;
		color: #333333;
		padding-bottom: 40rpx;
		input {
			width: 80%;
			height: 120rpx;
			line-height: 120rpx;
			font-size: 54rpx;
			margin-left: 20rpx;
		}
	}

	.btn {
		width: 100%;
		height: 86rpx;
		background: #F4F5F6;
		border-radius: 40rpx;
		text-align: center;
		line-height: 86rpx;
		font-size: 32rpx;
		font-weight: 400;
		color: #666666;
		margin: 30rpx 0 20rpx;

		&.active {
			color: #7A4730;
			background: linear-gradient(235deg, #F8DFC0 0%, #DAB493 100%);
		}
	}

	.tips {
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
	}

	.placeholder {
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
	}

	.phoneModal {
		width: 100%;
		height: 500rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0 0;
		padding: 30rpx;

		.title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
		}
	}

	.everyInfo {
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #D8D8D8;
		padding-bottom: 20rpx;
		margin-top: 30rpx;
	}

	.fixedInfo {
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;

		text {
			color: red;
			margin-left: 6rpx;
		}
	}

	.placeType {
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
		margin-left: 30rpx;
		width: 280rpx;
	}

	.getCode {
		margin-left: auto;
		text-align: center;
		line-height: 60rpx;
		height: 60rpx;
		background: #333333;
		border-radius: 40rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: #FFFFFF;
		width: 180rpx;
	}

	.countDown {
		font-size: 20rpx;
		width: 206rpx;
		color: #CCCCCC;
	}

	.sureBtn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: #FE325C;
		border-radius: 44rpx;
		text-align: center;
		margin-top: 80rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
