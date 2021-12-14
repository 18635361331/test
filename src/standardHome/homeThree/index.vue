<template>
	<view class="page ">
		<view class="homeThreePage" v-if="homeThreeInfo.content && homeThreeInfo.content.showBanner">
			<view class="homeMain" @click="renovationGoTo(homeThreeInfo.content.images[0])">
				<view class="homeText" :style="{color:homeThreeInfo.content.images[0].titleColor}">{{homeThreeInfo.content.images[0].title}}</view>
				<view class="homeSubText" :style="{color:homeThreeInfo.content.images[0].subTitleColor}">{{homeThreeInfo.content.images[0].subTitle}}</view>
				<image :src="imgBaseUrls+homeThreeInfo.content.images[0].image" mode="widthFix"></image>
			</view>
			<view class="homeMain homeRight">
				<view class="homeSubBox" @click="renovationGoTo(homeThreeInfo.content.images[1])">
					<view class="homeText" :style="{color:homeThreeInfo.content.images[1].titleColor}">{{homeThreeInfo.content.images[1].title}}</view>
					<view class="homeSubText" :style="{color:homeThreeInfo.content.images[1].subTitleColor}">{{homeThreeInfo.content.images[1].subTitle}}</view>
					<image :src="imgBaseUrls+homeThreeInfo.content.images[1].image" mode="widthFix"></image>
				</view>
				<view class="homeSubBox" @click="renovationGoTo(homeThreeInfo.content.images[2])">
					<view class="homeText" :style="{color:homeThreeInfo.content.images[2].titleColor}">{{homeThreeInfo.content.images[2].title}}</view>
					<view class="homeSubText" :style="{color:homeThreeInfo.content.images[2].subTitleColor}">{{homeThreeInfo.content.images[2].subTitle}}</view>
					<image :src="imgBaseUrls+homeThreeInfo.content.images[2].image" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import mixin from '@/common/js/homeMixin.js'
	import decorateApi from '@/api/decorate/index.js'
	export default{
		mixins:[mixin],
		data(){
			return{
				imgBaseUrls: "",
				homeThreeInfo:{
					
				}
			}
		},
		methods:{
			searchComponent(){
				decorateApi.searchComponent(90003).then(res=>{
					if(res.data.code==200){
						if(res.data.data.content && res.data.data.content!="NaN"){
							res.data.data.content = JSON.parse(res.data.data.content);
						}
						this.homeThreeInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.homeThreePage{
		width: 100%;
		display: flex;
		border-radius: 8rpx;
		justify-content: space-between;
	}
	.homeMain{
		position: relative;
		width: 340rpx;
		height: 100%;
	}
	.homeRight{
		width: 340rpx;
		height: 100%;
		position: relative;
	}
	.homeText{
		position: absolute;
		left: 20rpx;
		top: 20rpx;
		font-size: 30rpx;
		z-index: 1;
	}
	.homeSubText{
		position: absolute;
		left: 20rpx;
		top: 68rpx;
		font-size: 22rpx;
		z-index: 1;
	}
	.homeSubBox{
		width: 100%;
		height: 50%;
		position: relative;
	}
</style>
