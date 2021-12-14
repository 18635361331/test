<template>
	<view class="multiLine" v-html="textDecorate(multiLine.text)" :style="textStyle">

	</view>
</template>

<script>
	export default {
		props:['multiLine'],
		data() {
			return {
			}
		},
		methods: {
			textDecorate(val) {
				return val.replace(/\n/g, '<br/>')
			}
		},
		computed: {
			textStyle() {
				let bg = this.multiLine.backgroundColor
				let size = this.multiLine.fontSize
				let color = this.multiLine.fontColor
				let align = this.multiLine.typeSet
				return `background-color: ${bg}; font-size: ${size * 2}rpx; 
				color: ${color}; text-align: ${align};`
			}
		},
	}
</script>

<style>
	.multiLine {
		font-size: 26rpx;
		width: 100%;
		word-break: break-all;
		padding: 0 24rpx;
	}
</style>
