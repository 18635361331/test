<template>
	<view>
		<view class="backTop" v-if="isShow && backToTop" @click="goTop" :style="{backgroundImage:'url('+imgBaseUrls+backToTop.iconUrl+')'}">
			
		</view>
		<view class="backTop" v-if="isShow && !backToTop" @click="goTop">
			
		</view>
	</view>
</template>

<script>
	export default {
		props:['scrollNum','backToTop'],
		data() {
			return {
				isShow:false,
				imgBaseUrls: "",
			}
		},
		methods:{
			goTop(){
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
			}
		},
		watch:{
			scrollNum(){
				if(this.scrollNum>1200){
					this.isShow = true
				}else{
					this.isShow = false
				}
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.backTop{
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/backTop@2x.png) no-repeat 50%;
		background-size: 88rpx 88rpx;
		position: fixed;
		bottom: 80rpx;
		right: 20rpx;
		z-index: 20;
		/* #ifndef MP-WEIXIN */
		bottom: 160rpx;
		/* #endif */
		
	}
</style>
