<template>
	<view class="headBox">
		<view v-if="head && String(head).indexOf('http')!='-1'" :style="{backgroundImage:'url('+head+')'}" class="userInfoTitleImage"></view>
		<view v-else-if="head" :style="{backgroundImage:'url('+imgBaseUrls+head+')'}" class="userInfoTitleImage"></view>
		<view v-else class="userInfoTitleImage" :style="{backgroundImage:'url('+imgBaseUrls+'appletsImages/default_phone.png)'}"></view>
	</view>
</template>

<script>
	export default{
		props:['head','width'],
		data(){
			return{
				imgBaseUrls:''
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.headBox{
		width: 100%;
		height: 100%;
	}
	.userInfoTitleImage{
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
		background-position: 50%;
		background-size: cover;
		background-repeat: no-repeat;
		z-index: 10;
	}
</style>
