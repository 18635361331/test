<template>
	<!-- 单行文本框 -->
	<view class="slingleLine page" :style="textStyle">
		{{datas.text}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas: {
					backgroundColor: "red",
					fontSize: 26,
					fontColor: "black",
					typeSet: "center",
					text: "地方睡个好觉看来很过分的话就考虑换个房间看了韩国发货刚刚交话费杜鹃花科观看"
				}
			}
		},
		computed: {
			textStyle() {
				let bg = this.datas.backgroundColor
				let size = this.datas.fontSize * 2
				let color = this.datas.fontColor
				let align = this.datas.typeSet
				return `background-color: ${bg}; font-size: ${size}rpx; 
		        color: ${color}; text-align: ${align};`
			}
		},
	}
</script>

<style>
	.slingleLine {
		width: 100%;
		line-height: 88rpx;
		height: 88rpx;
		font-size: 26rpx;
		overflow: hidden;
	}
</style>
