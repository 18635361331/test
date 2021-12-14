<template>
	<view class="imgBox">
		<uni-popup ref="popup" type="bottom" >
			<view class="previewImage">
				 <swiper class="swiper" :circular='true' :indicator-dots="false"  @change="swiperChange" 
			 interval="2000" duration="500" :current="imgIndex-1">
					<swiper-item v-if="previewImageList" v-for="item,index in previewImageList" :key='index'>
						<video class="goodsVideo" v-if="item.isVideo && item.name" :src="imgBaseUrls+item.name" controls :muted="true"  object-fit='fill' :show-mute-btn='true'></video>
						<image v-else-if="hasHttp" :src="item.name" mode="aspectFit" /> </image>
						<image v-else :src="imgBaseUrls+item.name" mode="aspectFill" /> </image>
						<text>{{item.name}}</text>
					</swiper-item>
				</swiper>
				<view class="indexShow"  v-if="previewImageList">
					 {{imgIndex}} / {{ previewImageList.length}}
				 </view> 
				 <view class="page-num" ><text class="close-icon" @click="closeRreviewPopup"></text></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props:['previewImageList','previewIndex','hasHttp'],
		data() {
			return {
				imgBaseUrls : this.$config.imgBaseUrl,
				imgIndex:this.previewIndex,
			}
		},
		methods: {
			closeRreviewPopup(){
				this.$refs.popup.close()
			},
			openRreviewPopup(){
				this.imgIndex = this.previewIndex
				this.$refs.popup.open()
			},
			swiperChange(e){
				this.imgIndex = e.detail.current +1
			},
		}
	}
</script>

<style scoped>
	
	.previewImage{
		width: 100%;
		height: 100vh;
		position: relative;
		background: #000;	
	}
	.swiper{
		width: 100%;
		padding: 25% 0;
		height: 100%;
	}
	.indexShow{
	      position: absolute;
	      left: 50%;
	      bottom: 20rpx;
	      background: rgba(105, 99, 99, 0.81);
	      color: #FFF;
	      font-size: 24rpx;
	      padding: 5rpx 30rpx;
	      border-radius: 30rpx;
	      transform: translateX(-50%);
	
	}
	.page-num{
		width: 100%;
		height:36rpx;
		color: #fff;
		position: fixed;
		    top: 40rpx;
		    left: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 99999;
	}
	.close-icon{
		width:36rpx;
		height: 100%;
		display: inline-block;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/close_white.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}
	.goodsVideo{
		width: 100%;
	}
</style>
