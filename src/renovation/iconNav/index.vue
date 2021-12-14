<template>
	<!-- 图标导航 -->
	<view class="iconNav" :style="{background:getIconConfig(),height:iconfigHeight}">
		<image class="iconBGImage" :src="imgBaseUrls+iconNav.backgroundImage" @load='imgHeight' mode="widthFix"></image>
		<view class="everyNav ellipsis-one" v-for="item,index in iconNav.imageLinkVOS" @click="homeGoTo(item)" :key='index'>
			<image :src="imgBaseUrls+item.image" mode=""></image>
			<view class="navTitle">{{item.words}}</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default{
		props:["iconNav"],
		mixins:[mixin],
		data(){
			return{
				imgBaseUrls: "",
				iconfigHeight:""
			}
		},
		methods:{
			homeGoTo(item){
				this.renovationGoTo(item)
			},
			imgHeight(e){
				let view = uni.createSelectorQuery().in(this).select(".iconBGImage");
				view.boundingClientRect(data=>{
					if(this.iconNav.backgroundShowWay==1){
						this.iconfigHeight = e.detail.height*(data.width / e.detail.width)+'px'
					}
				}).exec();
			},
			getIconConfig(){
				let iconConfig = ""
				if(this.iconNav.backgroundShowWay==1){
					iconConfig = 'url('+this.imgBaseUrls+this.iconNav.backgroundImage+')'
				}else{
					iconConfig = this.iconNav.backgroundColor
				}
				return iconConfig
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			
		}
	}
</script>

<style scoped>
	.iconNav {
		width: 100%;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		position: relative;
		padding: 0 10rpx;
		background-size: 100% 100% !important;
	}

	.everyNav {
		width: 110rpx;
		height: 130rpx;
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.navTitle {
		width: 100%;
		text-align: center;
		margin-top: 8rpx;
		font-size: 24rpx;
	}

	.everyNav image {
		width: 88rpx;
		height: 88rpx;
	}
	.iconBGImage{
		width: 100%;
		position: absolute;
		opacity: 0;
		z-index: -1;
	}
</style>
