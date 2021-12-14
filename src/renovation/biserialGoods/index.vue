<template>
	<!-- 双列商品 -->
	<view class="page biserialParent">
		<view class="biserialbox">
			<view class="goodsList">
				<view class="everyGoods" @click="goToGoodsDetails(item)" v-if="index%2==0"
				 v-for="item,index in goodsList" :key='index'>
					<view class="itemImg">
						<image :src="imgBaseUrls+(item.pictureName?item.pictureName:item.imgUrl)" ></image>
						<goodsTag :params='item'></goodsTag>
					</view>
					<view class="goodsSpacing">
						<view class="goodsTitle">
							<goodsCusTag :params='item'></goodsCusTag>
						</view>
						<goodsMember :params='item'></goodsMember>
						<goodsPrice :params='item'></goodsPrice>
						<goodsActive :params='item'></goodsActive>
					</view>
				</view>
			</view>
			<view class="goodsList rightGoodsList">
				<view class="everyGoods" @click="goToGoodsDetails(item)" v-if="index%2==1"
				 v-for="item,index in goodsList" :key='index'>
					<view class="itemImg">
						<image :src="imgBaseUrls+(item.pictureName?item.pictureName:item.imgUrl)" ></image>
						<goodsTag :params='item'></goodsTag>
					</view>
					<view class="goodsSpacing">
						<view class="goodsTitle">
							<goodsCusTag :params='item'></goodsCusTag>
						</view>
						<goodsMember :params='item'></goodsMember>
						<goodsPrice :params='item'></goodsPrice>
						<goodsActive :params='item'></goodsActive>
					</view>
				</view>
			</view>
		</view>
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
		props: ["goodsList"],
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
	.biserialParent {
		width: 100%;
		padding: 24rpx 24rpx 0;
	}

	.biserialbox {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.goodsList {
		width: 49.3%;
		height: auto;
	}

	.everyGoods {
		width: 100%;
		height: auto;
		background: #FFFFFF;
		padding-bottom: 20rpx;
		border-radius: 14rpx;
		overflow: hidden;
		margin-bottom: 10rpx;
		position: relative;
	}
	.goodsSpacing{
		padding: 0 24rpx;
	}
	.itemImg {
		width: 100%;
		height: 334rpx;
		position: relative;
	}
	.itemImg image{
		width: 100%;
		height: 100%;
	}
	.goodsTitle {
		width: 100%;
		margin-top: 12rpx;
		color: #333;
		font-size: 24rpx;
	}
</style>
