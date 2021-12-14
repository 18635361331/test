<template>
	<!-- 双列图片 -->
	<view class="biserial">
		<image mode='widthFix' v-for="item,index in biserialImg.imageLinkVOS" @click="renovationGoTo(item)" :key='index' :src="imgBaseUrls+item.image"></image>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default {
		props:['biserialImg'],
		mixins:[mixin],
		data() {
			return {
				imgBaseUrls: "",
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style>
	.biserial {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: space-between;
	}

	.biserial image {
		width: 50%;
		height: auto;
	}
</style>
