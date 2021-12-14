<template>
	<!-- 单列图片 -->
	<view class="singleImg">
		<view class="singleLink" v-if="singleImg && singleImg.imageLinkVOS[0] && singleImg.imageLinkVOS[0].linkType==6">
			<image mode='widthFix' @click="renovationGoTo(singleImg.imageLinkVOS[0])" :src="imgBaseUrls+singleImg.imageLinkVOS[0].image" alt="">
			<view class="everyRow" :style="'width:'+item.tempWidth*2+'rpx;height:'+item.tempHeight*2+'rpx;top:'+item.tempTop*2+'rpx;left:'+item.tempLeft*2+'rpx'" v-for="item,index in singleImg.imageLinkVOS[0].linkValue" :key='index' @click='renovationGoTo(item.data)'></view>
		</view>
		<view v-if="singleImg && singleImg.imageLinkVOS[0] && singleImg.imageLinkVOS[0].linkType!=6">
			<image mode='widthFix' @click="renovationGoTo(singleImg.imageLinkVOS[0])" :src="imgBaseUrls+singleImg.imageLinkVOS[0].image" alt="">
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default{
		props:["singleImg"],
		mixins:[mixin],
		data(){
			return{
				imgBaseUrls: "",
			}
		},
		methods:{
			
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style>
	.singleImg {
		width: 100%;
		height: auto;
	}

	.singleImg image {
		width: 100%;
		height: auto;
		display: block;
		vertical-align: top;
	}
	
	.singleLink{
		position: relative;
	}
	.everyRow{
		position: absolute;
	}
</style>
