<template>
	<!-- 资讯头条 -->
	<view class="infoLines" :style="bgStyle">
		<view class="iconLines" :style="logoStyle"></view>
		<view class="swiper">
			<swiper class="swiperBox" :circular='true' :autoplay="true" :vertical='true'>
				<swiper-item v-for="item,index in headLine.wordsLinkVOS" @click="renovationGoTo(item)" :key='index'>
					<view class="swiper-item">{{item.words}}</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default {
		props:['headLine'],
		mixins:[mixin],
		data() {
			return {
			}
		},
		methods: {

		},
		computed: {
			bgStyle() {
				let image = this.headLine.logoImage
				if (image) {
					return `background: url(${this.$config.imgBaseUrl+image}) no-repeat center; background-size: cover;`
				} else {
					return ''
				}
			},
			logoStyle() {
				let image = this.headLine.backgroundImage
				if (image) {
					return `background: url(${this.$config.imgBaseUrl+image});`
				} else {
					return ''
				}
			},
		}
	}
</script>

<style>
	.infoLines {
		width: 100%;
		height: 86rpx;
		display: flex;
		align-items: center;
	}

	.iconLines {
		width: 178rpx;
		height: 86rpx;
		background-repeat: no-repeat !important;
		background-position: 50% !important;
		background-size: 125rpx 27rpx !important;
	}

	.swiper {
		width: calc(100% - 178rpx);
		height: 100%;
	}

	.swiper-item {
		line-height: 86rpx;
	}

	.swiperBox {
		width: 100%;
		height: 100%;
	}
</style>
