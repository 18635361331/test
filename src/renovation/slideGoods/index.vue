<template>
	<view class="page slideGoodsParent">
		<!-- 横向滑动商品 -->
		<scroll-view scroll-x="true"  show-scrollbar="false">
			<view class="slideGoodsBox" :style="{backgroundColor:information.content.backGround}">
				<view class="everyThreeRows" @click="goToGoodsDetails(item)" v-for="item,index in information.content.itemVOS"
				 :key='index'>
					<view class="everyThreeImg">
						<image :src="imgBaseUrls+item.imgUrl" mode=""></image>
						<goodsTag :params='item'></goodsTag>
					</view>
					<view class="slideGoodsDetails">
						<view class="slideGoodsTitle">
							<goodsCusTag :params='item'></goodsCusTag>
						</view>
						<goodsMember :params='item'></goodsMember>
						<goodsPrice :params='item'></goodsPrice>
						<goodsActive :params='item'></goodsActive>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import goodsPrice from '../model_goodsPrice/index.vue'
	import goodsActive from '../model_goodsActive/index.vue'
	import goodsCusTag from '../model_goodsCusTag/index.vue'
	import goodsMember from '../model_goodsMember/index.vue'
	import goodsTag from '../model_goodsTag/index.vue'
	import goodsJump from '../mixins_goodsJump/index.js'
	export default {
		props: ['information'],
		mixins:[goodsJump],
		data() {
			return {
			}
		},
		components:{
			goodsActive,
			goodsCusTag,
			goodsMember,
			goodsPrice,
			goodsTag
		}
	}
</script>

<style>
	.slideGoodsBox {
		white-space: nowrap;
		display: flex;
	}

	.everyThreeRows {
		width: 200rpx;
		min-width: 200rpx;
		margin-right: 6rpx;
		background-color: #fff;
		border-radius: 14rpx;
		position: relative;
		padding-bottom: 20rpx;
	}

	.everyThreeRows:nth-of-type(1) {
		margin-left: 24rpx;
	}

	.everyThreeImg {
		width: 100%;
		height: 200rpx;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		overflow: hidden;
		position: relative;
	}

	.slideGoodsDetails {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-top: 12rpx;
		padding: 0 12rpx;
	}

	.slideGoodsTitle {
		font-size: 24rpx;
		white-space: normal;
		color: #333333;
	}
</style>
