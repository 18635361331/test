<template>
	<view class="page">
		<web-view :src="webViewSrc"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				webViewSrc:""
			}
		},
		onLoad() {
			this.webViewSrc = this.$Route.query.url+uni.getStorageSync("webViewQuery");
			uni.removeStorageSync("webViewQuery")
		}
	}
</script>

<style scoped>
</style>
