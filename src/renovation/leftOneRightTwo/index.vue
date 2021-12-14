<template>
	<!-- 左一右二图片 -->
	<view class="bigbox">
		<view class="bigboxImg" @click="renovationGoTo(leftOneRightTwo.imageLinkVOS[0])">
			<image :src="imgBaseUrls+leftOneRightTwo.imageLinkVOS[0].image" mode="widthFix"></image>
		</view>
		<view class="littleBoxImg">
			<view @click="renovationGoTo(leftOneRightTwo.imageLinkVOS[1])">
				<image :src="imgBaseUrls+leftOneRightTwo.imageLinkVOS[1].image" mode="widthFix"></image>
			</view>
			<view @click="renovationGoTo(leftOneRightTwo.imageLinkVOS[2])">
				<image :src="imgBaseUrls+leftOneRightTwo.imageLinkVOS[2].image" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default {
		props:["leftOneRightTwo"],
		mixins:[mixin],
		data(){
			return{
				imgBaseUrls: "",
			}
		},
		methods:{
			
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.bigbox {
		width: 100%;
		height: auto;
		display: flex;
	}

	.bigboxImg {
		width: 50%;
		height: 100%;
	}

	.littleBoxImg {
		width: 50%;
		height: 100%;
	}

	.littleBoxImg view {
		height: 50%;
		width: 100%;
	}
	.littleBoxImg view  image{
		display: block;
	}
</style>
