<template>
	<view class="page">
		<view class="swiper-main">
			<swiper class="swiperImg" :circular='true' :indicator-dots="false"  @change="swiperChange" :autoplay="goodsInfo.videoInfo?false:true"
			 interval="2000" duration="500">
				<swiper-item v-for="item,index in goodsInfo.itemPictureDtos" :key='index' >
					<video class="goodsVideo" v-if="item.isVideo && item.name" :src="imgBaseUrls+item.name" controls :muted="true"  object-fit='fill' :show-mute-btn='true'></video>
					<image :src="imgBaseUrls+item.name" mode="aspectFill" @click.stop="openRreviewPopup"> </image>
				</swiper-item>
			</swiper>
			 <view class="indexShow" >
				 {{swiperIndex}} / {{ goodsInfo.itemPictureDtos.length}}
			  </view> 
		</view>
		<!-- 弹出层放大 -->
		<img-preview v-if="goodsInfo.itemPictureDtos" ref='previewPopup' :previewImageList='goodsInfo.itemPictureDtos' :previewIndex="swiperIndex"></img-preview>
	</view>
</template>

<script>
	import imgPreview from '../../goodsDetails/imgPreview.vue'	//头部图片放大
	export default {
		props:["goodsInfo"],
		data(){
			return{
				previewIndex:1,
				imgBaseUrls:"",
				swiperIndex:1,
			}
		},
		methods:{
			openRreviewPopup () {
				this.previewIndex = this.swiperIndex
				this.$refs.previewPopup.openRreviewPopup()
			},
			//事件处理函数
			swiperChange(e){
				this.swiperIndex = e.detail.current +1
			},
			
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		components:{
			imgPreview
		}
	}
</script>

<style scoped>
	.swiper-main{
		position: relative;
	}
	.indexShow{
	      position: absolute;
	      left: 50%;
	      bottom: 20rpx;
	      background: rgba(105, 99, 99, 0.31);
	      color: #FFF;
	      font-size: 24rpx;
	      padding: 5rpx 30rpx;
	      border-radius: 30rpx;
	      transform: translateX(-50%);
	}
	.swiperImg {
		width: 100%;
		height: 750rpx;
		background-color: #FFFFFF;
	}
	.goodsVideo{
		width: 100%;
		height: 100%;
	}
</style>
