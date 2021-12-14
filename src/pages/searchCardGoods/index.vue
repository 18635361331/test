<template>
	<view class="page searchCardGoods">
		<!-- #ifndef MP-WEIXIN -->
		<view class="collectTitle">
			<view class="goBackBtn" @click="searchCardGoods(true)"></view>
			<view class="title">礼卡可用商品</view>
		</view>
		<!-- #endif -->
		<view class="searchTitle">
			<view class="title active">
				<view class="searcIcon"></view>
				<input type="text" v-model="searchValue" focus placeholderClass="placeholderValue" placeholder="搜礼卡适用商品" class="searchInput" />
				<view class="clearIcon" v-if="searchValue" @click="searchValue=''"></view>
			</view>
			<view class="searchBtn" @click="searchCardGoods(false)">搜索</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				searchValue:"",
			}
		},
		methods:{
			searchCardGoods(flag){	//flag为真返回上一页面 不带参数
				this.$Router.replace({
					path:"/pages/giftCardGoods/index",
					query:{
						batchId:this.$Route.query.batchId,
						cardName:this.$Route.query.cardName,
						searchValue:flag?"":this.searchValue,
						param:flag?"":this.searchValue
					}
				})
			}
		},
		onShow(){
		}
	}
</script>

<style scoped>
	.searchCardGoods{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.searchTitle {
		display: flex;
		justify-content: space-between;
	}
	
	
	.searchTitle .title {
		width: calc(100% - 60rpx);
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 14rpx;
		border-radius: 54rpx;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
		position: relative;
	}
	
	.searchTitle .title.active {
		margin-left: 20rpx;
	}
	
	.searcIcon {
		width: 60rpx;
		height: 60rpx;
		margin-left: 24rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_popover_search_180820@2x.png) no-repeat 50%;
		background-size: 28rpx 30rpx;
	}
	
	.searchInput {
		width: 100%;
		height: 60rpx;
		margin-left: 2rpx;
		/* padding-top: 10rpx; */
		font-size: 26rpx;
		padding: 4rpx 0;
		line-height: 48rpx;
		text-align: left;
	}
	
	.clearIcon {
		width: 74rpx;
		height: 60rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/search_back@2x.png) no-repeat 50%;
		background-size: 26rpx 26rpx;
	}
	
	.searchBtn {
		width: 108rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 26rpx;
		margin-left: 10rpx;
		color: #333333;
	}
</style>
