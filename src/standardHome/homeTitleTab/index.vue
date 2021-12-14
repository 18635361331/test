<template>
	<view class="page">
		<view class="homeTabParent"   :class="{'active':scrollNum>=1,'isHome':isIndexHome,'absolute':scrollNum==0}" v-if="titleNav && titleNav.labels">
			<scroll-view class="homeTab" scroll-x="true">
				<view class="everyTabRow" :style="{color:checkTitle==item.title?titleNav.labelSelectedColor:titleNav.labelDefaultColor}" :class="{'active':checkTitle==item.title}" @click="setDetails(item)" v-for="item,index in titleNav.labels" :key='index'>
					{{item.title}}
				</view>
			</scroll-view>
			<view class="homeTabShadow"></view>
			<view class="homeTabIcon" v-if="titleConfig" :class="{'active':(scrollNum>=1 && titleConfig.title.type==0)}" @click="goCategory"></view>
			<view class="homeTabIcon" v-else :class="{'active':scrollNum>=1}" @click="goCategory"></view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/homeTitleMixin.js'
	import decorateApi from '@/api/decorate/index.js';
	export default {
		props:['scrollNum',"titleNav","isIndexHome","titleConfig"],
		mixins:[mixin],
		data() {
			return {
				checkTitle:"首页",
			}
		},
		methods: {
			setDetails(item){
				this.checkTitle = item.title
				this.$emit("setWebView",item);
			},
			goCategory(){
				uni.switchTab({
					url:"/pages/category/index"
				})
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.homeTabParent {
		width: 100%;
		height: 88rpx;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 88rpx;
		padding-right: 8rpx;
		z-index: 2;
	}
	
	.homeTab {
		padding-left: 36rpx;
		white-space: nowrap;
		width: calc(100% - 96rpx);
		height: 88rpx;
		line-height: 88rpx;
	}
	.homeTabParent.active{
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
	}
	.homeTabParent.isHome{
		top: 88rpx;
	}
	.absolute.homeTabParent{
		position: absolute;
	}
	.everyTabRow {
		font-size: 30rpx;
		margin-right: 46rpx;
		color: #FFFFFF;
		display: inline-block;
	}
	
	.everyTabRow.active{
		font-weight: 700;
		font-size: 40rpx;
	}
	
	.homeTabShadow {
		width: 16rpx;
		height: 50rpx;
		background: linear-gradient(90deg, transparent, #000);
		opacity: .08;
		position: absolute;
		right: 96rpx;
		top: 18rpx;
	}

	.homeTabIcon {
		width: 88rpx;
		height: 88rpx;
		padding: 30rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/homebanner_tab.png) no-repeat 50%;
		background-size: 28rpx 28rpx;
		position: absolute;
		right: 0;
		top: 0;
	}
	.homeTabIcon.active{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/homebanner_tab_active.png) no-repeat 50%;
		background-size: 28rpx 28rpx;
	}
</style>
