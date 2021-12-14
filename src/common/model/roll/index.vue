<template>
	<view class="rollBox">
		<swiper class="swiper" :indicator-dots="false" :autoplay="true" :vertical='true' :circular='true' :interval="1500" :duration="1500">
			<swiper-item v-for='item,index in list' :key='index'>
				<view class="swiper-item">
					<view v-if="item.smallIcon && String(item.smallIcon).indexOf('http')!='-1'" :style="{backgroundImage:'url('+item.smallIcon+')'}" class="userInfoTitleImage"></view>
					<view v-else-if="item.smallIcon" :style="{backgroundImage:'url('+imgBaseUrls+item.smallIcon+')'}" class="userInfoTitleImage"></view>
					<view v-else class="userInfoTitleImage" :style="{backgroundImage:'url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/default_phone.png)'}"></view>
					<view class="swiperText ellipsis-one">
						{{item.tips}}
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
	export default {
		props:["list"],
		data(){
			return{
				imgBaseUrls:""
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.rollBox,.swiper{
		width:100%;
		height: 100%;
	}
	.swiper-item{
		display: flex;
		align-items: center;
	}
	.swiperText{
		width: calc(100% - 60rpx);
		color: #FFFFFF;
		font-size: 24rpx;
	}
	.userInfoTitleImage{
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-position: 50%;
		border: 1rpx solid #FFFFFF;
		background-size: cover;
		margin-right: 10rpx;
		background-repeat: no-repeat;
		z-index: 10;
	}
</style>
