<template>
	<view class="page threeRows">
		<!-- 三列商品 -->
		<view class="threeRowsBox">
			<view class="everyThreeRows"  @click="goToGoodsDetails(item)" v-for="item,index in goodsList" :key='item.id'>
				<view class="everyThreeImg">
					<image :src="imgBaseUrls+(item.pictureName?item.pictureName:item.imgUrl)"></image>
					<goodsTag :params='item'></goodsTag>
				</view>
				<view class="threeRowsDetails">
					<view class="threeTitle">
						<goodsCusTag :params='item'></goodsCusTag>
					</view>
					<goodsMember :params='item'></goodsMember>
					<goodsPrice :params='item'></goodsPrice>
					<goodsActive :params='item'></goodsActive>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsActive from '../model_goodsActive/index.vue'
	import goodsPrice from '../model_goodsPrice/index.vue'
	import goodsCusTag from '../model_goodsCusTag/index.vue'
	import goodsMember from '../model_goodsMember/index.vue'
	import goodsTag from '../model_goodsTag/index.vue'
	import goodsJump from '../mixins_goodsJump/index.js'
	export default {
		props:['goodsList'],
		mixins:[goodsJump],
		data(){
			return{
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
	.threeRowsBox{
		display: flex;
		flex-wrap: wrap;
	}
	.everyThreeRows{
		width: 32.7%;
		margin-right: 6rpx;
		margin-bottom: 6rpx;
		background-color: #fff;
		border-radius: 14rpx;
		position: relative;
		padding-bottom: 20rpx;
	}
	.everyThreeRows:nth-of-type(3n){
		margin-right: 0;
	}
	.everyThreeImg{
		width: 100%;
		height: 222rpx;
		border-top-left-radius: 16rpx;
		border-top-right-radius:16rpx;
		overflow: hidden;
		position: relative;
	}
	.newUserIcon{
		width: 100rpx;
		height: 40rpx;
		position: absolute;
		left: 0;
		top: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/newUserGoodsIcon.png) no-repeat;
		background-size:100% 100%;
	}
	.threeRowsDetails{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 12rpx;
		margin-top: 12rpx;
		padding: 0 12rpx;
	}
	.threeTitle{
		font-size: 24rpx;
	}
</style>
