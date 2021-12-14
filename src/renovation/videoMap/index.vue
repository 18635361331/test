<template>
	<view class="video" v-if="shortVideo&&shortVideo.videoSrc" :style="{height:shortVideo.height}">
		<video class="myVideo" object-fit='fill' :style="{height:shortVideo.height}" :src="imgBaseUrls+shortVideo.videoSrc" :poster="shortVideo.posterSrc?(imgBaseUrls+shortVideo.posterSrc):''"	@error="videoErrorCallback" controls :autoplay="shortVideo.autoplay" :loop="shortVideo.loop" :muted="true" :show-mute-btn="true"></video>
	</view>
</template>

<script>
	export default{
		props: ['shortVideo'],
		data() {
			return {
				imgBaseUrls: "",
			}
		},
		mounted() {
			if(this.shortVideo.height){
				this.shortVideo.height = this.shortVideo.height*2 + "rpx"
			}
			this.imgBaseUrls = this.$config.imgBaseUrl
		},
		methods:{
			videoErrorCallback(e) {
				
			},
		}
	}
</script>

<style scoped>
	.myVideo,.video,video{
		width: 100%;
	}
	.video{
		height: auto;
	}
</style>
