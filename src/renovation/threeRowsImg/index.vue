<template>
	<!-- 三列图片 -->
	<view class="threeRowsImg">
		<image mode='widthFix' v-for="item,index in threeRowsImg.imageLinkVOS" @click="renovationGoTo(item)" :key='index' :src="imgBaseUrls+item.image"></image>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default {
		props: ['threeRowsImg'],
		mixins: [mixin],
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
<style scoped>
	.threeRowsImg {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
	}

	.threeRowsImg image {
		width: 33.33%;
		height: auto;
	}
</style>
