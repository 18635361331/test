<template>
	<view class="wrapper">
		<!-- 轮播图 -->
		<swiper class="swiperImg" :circular='true' :style="{height:imageH+'px'}" :autoplay="true" interval="2000" duration="500" @change='change'>
			<swiper-item v-for="item,index in swiperImg.imageLinkVOS" @click="renovationGoTo(item)" :key='index'>
				<image :src="imgBaseUrls+item.image" mode="widthFix" @load='imgHeight'/></image>
			</swiper-item>
		</swiper>
		<view class="dots">
			<block v-for="item,index in swiperImg.imageLinkVOS" :key='index' >
				<view :class="imgIndex==index?'active':''"></view>
			</block>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default {
		props:["swiperImg"],
		mixins:[mixin],
		data(){
			return{
				imgBaseUrls: "",
				imageH:"",
				imgIndex:0
			}
		},
		methods:{ 
			imgHeight(e){
				let view = uni.createSelectorQuery().in(this).select(".swiperImg");
				view.boundingClientRect(data=>{
					this.imageH = e.detail.height*(data.width / e.detail.width);
					this.change()
				}).exec();
				
			},
			change(params){	//轮播图切换时跟新头部颜色
				this.$emit("swiperChange",(params?params.detail.current:0),this.imageH)
				this.imgIndex = params?params.detail.current:0
			}
		},
		mounted(){
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.swiperImg{
		width: 100%;
	}
	.wrapper{
		position: relative;
		padding-bottom: 40rpx;
	}
	.dots{
		position: absolute;
		bottom: 10rpx;
		width: 100%;
		z-index: 1;
		display: flex;
		justify-content: center;
	}
	.dots view{
		width: 8rpx;
		height: 8rpx;
		background: #FFFFFF;
		border-radius: 50%;
		opacity: 0.6;
		margin: 0 10rpx; 
		transition: 0.3s all ease-in-out;
	}
	.dots .active{
		width: 16px;
		background: linear-gradient(90deg, #F42F67 0%, #E61446 100%);
		opacity: 1;
		border-radius: 8rpx;
		transition: 0.3s all ease-in-out;
	}
</style>
