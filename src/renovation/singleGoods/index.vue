<template>
	<!-- 单列商品 -->
	<view class="page slingleGoods">
		<view class="goods_list" v-for="item,index in goodsList"  @click="goToGoodsDetails(item)" :key='index'>
			<view class="goosImg">
				<image :src="imgBaseUrls+(item.pictureName?item.pictureName:item.imgUrl)" mode=""></image>
				<goodsTag :params='item'></goodsTag>
			</view>
			<view class="goosItemInfo">
				<view class="goosItemTitle">
					<goodsCusTag :params='item'></goodsCusTag>
				</view>
				<goodsMember :params='item'></goodsMember>
				<view class="goodsItemDetail">
					<goodsPrice :params='item'></goodsPrice>
					<goodsActive :params='item'></goodsActive>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsPrice from '../model_goodsPrice/index.vue'
	import goodsActive from '../model_goodsActive/index.vue';
	import goodsCusTag from '../model_goodsCusTag/index.vue'
	import goodsMember from '../model_goodsMember/index.vue';
	import goodsTag from '../model_goodsTag/index.vue'
	import goodsJump from '../mixins_goodsJump/index.js'
	export default {
		props:["goodsList"],
		mixins:[goodsJump],
		data() {
			return {
			}
		},
		methods:{
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
	.slingleGoods {
		width: 100%;
		height: auto;
		padding: 0 24rpx;
	}

	.goods_list {
		width: 100%;
		height: auto;
		background: #fff;
		display: flex;
		margin-bottom: 10rpx;
		border-radius: 14rpx;
		overflow: hidden;
		position: relative;
	}
	.goosImg {
		width: 308rpx;
		height: 308rpx;
		position: relative;
	}

	.goosItemInfo {
		width: calc(100% - 308rpx);
		padding: 12rpx;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.goosItemTitle {
		width: 100%;
		height: auto;
		font-size: 24rpx;
	}

	.goodsItemDetail {
		line-height: 45rpx;
		margin-top: 16rpx;
	}
</style>
