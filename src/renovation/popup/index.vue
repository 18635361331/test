<template>
	<view class="page">
		<uni-popup ref="proupBox" type="center">
			<view class="proupImage" @click="renovationGoTo(popup)">
				<image :src="imgBaseUrls+popup.image" mode=""></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default {
		props: ['popup'],
		mixins:[mixin],
		data() {
			return {
				imgBaseUrls: "",
			}
		},
		methods: {

		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.$refs.proupBox.open()
		}
	}
</script>

<style scoped>
	.proupImage {
		width: 580rpx;
		height: 760rpx;
	}
</style>>
