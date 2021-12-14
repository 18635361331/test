<template>
	<view class="slide_Box page">
		<view class="slide_view" scroll-x="true" v-if="navInfo.content && navInfo.content.showBanner" show-scrollbar="false">
			<view v-for="item,index in navInfo.content.images" @click="slideClick(item,index)" class="scroll_view_every" :key='index'>
				<image :class="index>4?'active':''" :src="imgBaseUrls+item.image"
				 mode=""></image>
				<view class="slide_text" :class="index>4?'active':''">
					{{item.words}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/homeMixin.js'
	import decorateApi from "@/api/decorate/index.js"
	export default {
		mixins:[mixin],
		data() {
			return {
				navInfo:{},
				imgBaseUrls:""
			}
		},
		methods: {
			slideClick(item,index){
				this.homeGoto(item);
				this.zhuge.track("首页-金刚区-"+(index+1)+"-"+item.words)
			},
			searchComponent(){
				decorateApi.searchComponent(100001).then(res=>{
					if(res.data.code==200){
						res.data.data.content = JSON.parse(res.data.data.content);
						this.navInfo = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			homeGoto(item){
				this.renovationGoTo(item)
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style>
	.slide_Box {
		width: 100%;
	}

	.slide_view {
		width: 100%;
		height: 324rpx;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		margin: 0 auto;
		padding-top: 12rpx;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		border-radius: 8rpx;
	}

	.scroll_view_every {
		width: 20%;
		min-width: 20%;
		height:134rpx;
		text-align: center;
		display: inline-block;
		margin-bottom: 26rpx;
	}

	.scroll_view_every image {
		width: 98rpx;
		height: 98rpx;
	}
	.scroll_view_every image.active{
		width: 126rpx;
		height: 100rpx;
	}
	.slide_text {
		font-size: 24rpx;
		color: #666;
	}
	.slide_text.active{
		margin-top: -4rpx;
	}
</style>
