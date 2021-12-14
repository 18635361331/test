<template>
	<!-- 水平间距 -->
	<view :style="'border-bottom:' + borderStyle"></view>
</template>

<script>
	export default {
		props:["styleSet"],
		data() {
			return {
			}
		},
		computed: {
			borderStyle() {
				let h = this.styleSet.height
				let s = this.styleSet.lineType
				let c = this.styleSet.color
				if (h === 1) return `${h}px ${s} ${c}`
				return `${h*2 }rpx ${s} ${c}`
			}
		}
	}
</script>

<style>
</style>
