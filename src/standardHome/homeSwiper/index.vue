<template>
	<view>
		<!-- 轮播图 -->
		<swiper class="swiperImg" :class="isShowTitle?'':'noneShow'" v-if="swiperImgList.content && swiperImgList.content.images" :circular='true'  :indicator-dots="true" autoplay="true" interval="3000" duration="500" @change='change'>
			<swiper-item class="swiperImgRow" v-for="item,index in swiperImgList.content.images" @click="homeGoto(item,index)" :key='index'>
				<image :src="imgBaseUrls+item.image" /></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	 import mixin from '@/common/js/homeMixin.js'
	import decorateApi from '@/api/decorate/index.js'
	export default {
		mixins:[mixin],
		props:['isShowTitle'],
		data(){
			return{
				imgBaseUrls: "",
				swiperImgList:{}
			}
		},
		methods:{
			searchComponent(){	//首页轮播图数据获取
				decorateApi.searchComponent(100000).then(res=>{
					if(res.data.code==200){
						res.data.data.content = JSON.parse(res.data.data.content);
						this.swiperImgList = res.data.data;
						this.$emit("swiperChange",this.swiperImgList.content.images[0].bgColor)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			change(params){	//轮播图切换时跟新头部颜色
				this.$emit("swiperChange",this.swiperImgList.content.images[params.detail.current].bgColor)
			},
			homeGoto(item,index){
				this.zhuge.track("首页-轮播图-"+index+1)
				this.renovationGoTo(item)
			}
		},
		mounted(){
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style>
	.swiperImg{
		width: 100%;
		position: absolute;
		width: 690rpx;
		left: 0;
		right: 0;
		margin: auto;
		height: 268rpx;
		top: 180rpx;
	}
	.noneShow.swiperImg{
		top: 100rpx;
	}
	.swiperImgRow{
		height: 262rpx;
		border-radius: 10rpx;
	}
</style>
