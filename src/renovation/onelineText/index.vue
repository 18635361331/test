<template>
	<view class="page">
		<!-- 单行文本 -->
		<view class="onelineText" :style="{color:onelineText.fontColor,backgroundColor:onelineText.backgroundColor,textAlign:onelineText.typeSet}">
			{{onelineText.text}}
		</view>
	</view>
</template>

<script>
	export default {
		props:['onelineText'],
		data() {
			return {

			}
		},
		methods:{
			
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.onelineText{
		text-align: center;
		height: 88rpx;
		line-height: 88rpx;
	}
</style>
