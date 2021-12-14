<template>
	<view class="page">
		<uni-popup ref="activePopup" type="center" :mask-click='false'>
			<view class="activeHint">
				<view class="hintText">
					<view>
						活动状态发生变化
					</view>
					<text>{{countdown.count}}s</text>后将为您返回首页！
				</view>
				<view class="homeIndexBtn" @click="goHome">
					立即进入首页
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				countdown: {	//倒计时
					inter: "",
					count: 10
				},
			}
		},
		methods:{
			goHome(){	//进入首页
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			interDown(){
				this.$refs.activePopup.open();
				this.countdown.count = 10
				this.countdown.inter = setInterval(()=>{
					this.countdown.count--;
					if (!this.countdown.count) {
						clearInterval(this.countdown.inter);
						this.goHome()
					}
				},1000)
			}
		},
		beforeDestroy() {
			if(this.countdown.inter){
				clearInterval(this.countdown.inter);
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.activeHint{
		width: 690rpx;
		height: 358rpx;
		background-color: #FFFFFF;
		border-radius: 20px;
		text-align: center;
		font-size: 32rpx;
	}
	.hintText{
		padding-top:60rpx;
		color: #333333;
		font-weight: 700;
	}
	.hintText text{
		color: #fe325c;
	}
	.homeIndexBtn{
		width: 630rpx;
		height: 88rpx;
		line-height: 88rpx;
		background-color: #fe325c;
		color: #FFFFFF;
		border-radius: 44px;
		margin: 0 auto;
		margin-top: 60rpx;
	}
</style>
