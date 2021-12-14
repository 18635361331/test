<template>
	<view class="page recommend">
		<swiper class="swiperImg" :circular='true' :indicator-dots="true" :autoplay="false" interval="3000" previous-margin="50rpx"
		 next-margin="50rpx" duration="1000" @change="bannerChange" autoplay easing-function="easeInCubic">
			<swiper-item class="swiperImgRow" v-for="item,index in carouselList" @click="goToGiftCardDetails(item,true)" :key='index'>
				<image :src="imgBaseUrls+item.imgUrl" mode="scaleToFill" :data-index='index' class="slide-image" :class="bannerCurrent==index?'slide-active':''" />
				</image>
			</swiper-item>
		</swiper>
		<view class="cardTitle">
			精彩推荐
		</view>
		<view class="marvellous">
			<view class="everyRow" v-for="item,index in recommendLists.records" :key='index' @click="goToGiftCardDetails(item)">
				<image :src="imgBaseUrls+item.cover" mode=""></image>
				<view class="cardInfo">
					<view class="price">
						<text class="identification">¥</text>
						<text class="salePrice">{{item.salePrice}}</text>
						<text>售价</text>
						<text class="faceValue">¥</text>
						<text>{{item.faceValue}}&nbsp;面值</text>
					</view>
					<view class="buyBtn">
						购买
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['recommendLists', 'carouselList'],
		data() {
			return {
				imgBaseUrls: "",
				bannerCurrent: 0,
				duration: 1000
			}
		},
		methods: {
			//轮播current切换监听事件
			bannerChange(e) {
				this.bannerCurrent = e.detail.current
			},
			goToGiftCardDetails(item,flag) {
				if(flag){
					this.$Router.push({
						path:"/pages/giftCardDetails/index",
						query:{
							batchId:item.linkUrl.split("/")[item.linkUrl.split("/").length-1]
						}
					})
				}else{
					this.$Router.push({
						path:"/pages/giftCardDetails/index",
						query:{
							batchId:item.batchId
						}
					})
				}
				
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.recommend {
		padding-top: 40rpx;
	}

	.cardTitle {
		font-size: 34rpx;
		height: 132rpx;
		font-weight: 700;
		padding: 60rpx 0 24rpx 36rpx;
	}

	.marvellous {
		padding: 0 36rpx 50rpx;
	}

	.everyRow {
		width: 100%;
		height: 587rpx;
		box-shadow: 0 6px 25px 0 rgba(0, 0, 0, .12);
		margin-bottom: 36rpx;
		border-radius: 18rpx;
	}

	.everyRow image {
		height: 420rpx;
		border-radius: 18rpx;
	}

	.cardInfo {
		width: 100%;
		height: 167rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #666;
		font-size: 24rpx;
	}

	.buyBtn {
		background: #ffecf1;
		border-radius: 50rpx;
		height: 60rpx;
		width: 144rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		color: #ff1558;
		text-align: center;
	}

	.identification {
		color: #FF1558;
	}

	.salePrice {
		font-size: 36rpx;
		color: #FF1558;
		margin: 0 6rpx;
	}

	.faceValue {
		margin-left: 50rpx;
	}

	.swiperImg {
		height: 400rpx;
		width: 100%;
		margin: 0 auto;
	}

	.slide-image {
		position: absolute;
		width: 100%;
		height: 70%;
		z-index: 5;
		opacity: 0.7;
		top: 15%;
		transform: scale(1, 0.9);

	}

	.slide-active {
		transform: scale(1, 1);
		opacity: 1;
		z-index: 10;
		height: 86%;
		top: 7%;
		transition: all .5s;
	}
</style>
