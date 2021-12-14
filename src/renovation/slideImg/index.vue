<template>
	<!-- 横向滑动图片 -->
	<view>
		<scroll-view class="slide_view" scroll-x="true" show-scrollbar="false">
			<image class="slideImage" v-for="item,index in slideImg.imageLinkVOS" :style="{width:iamgeSize.width,height:iamgeSize.height}" @click="renovationGoTo(item)" :key='index' mode="widthFix" @load='imgHeight' :src="imgBaseUrls+item.image"></image>
		</scroll-view>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default {
		props:['slideImg'],
		mixins:[mixin],
		data() {
			return {
				imgBaseUrls: "",
				iamgeSize:{
					width:"",
					height:""
				}
			}
		},
		methods:{
			imgHeight(e){
				let view = uni.createSelectorQuery().in(this).select(".slideImage");
				view.boundingClientRect(data=>{
					this.iamgeSize.width = e.detail.width+"px"
					this.iamgeSize.height = e.detail.height+"px"
				}).exec();
			},
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style>
	.slide_view {
		width: 100%;
		/* height: 236rpx; */
		white-space: nowrap;
	}

	.slide_view image {
		height: 100%;
		width: auto;
	}
</style>
