<template>
	<view class="page commonPageTitle">
		<view class="collectTitle">
			<!-- #ifndef MP-WEIXIN -->
			<view class="goBackBtn" @click="goToSearch()"></view>
			<!-- #endif  -->
			<view class="title" :class="isWeiXinApplets?'active':''">
				<view class="searcIcon"></view>
				<div class='searchInput' @click="goToSearch()">{{searchValue}}</div>
				<view class="clearIcon" v-if="searchValue" @click="clearSearchValue"></view>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="searchBtn"></view>
			<!-- #endif  -->
		</view>
		<view class="shopList" v-for="item,index in shopList" :key='index' v-if="shopList.length">
			<view class="shopListTitle">
				<image :src="imgBaseUrls+item.image" mode=""></image>
				<view class="shopName">
					{{item.name}}
				</view>
				<view class="goShop" @click="goToShop(item)">
					进店
				</view>
			</view>
			<view class="shopContent">
				<threeRowsGoods :goodsList = 'item.items'></threeRowsGoods>
			</view>
		</view>
		<view class="isNull" v-if="!shopList.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/footprint_none@2x.png" mode="widthFix"></image>
			<view class="isNullText">
				没有找到相关店铺！
			</view>
		</view>
	</view>
</template>

<script>
	import threeRowsGoods from '@/renovation/threeRowsGoods/index.vue'
	import searchApi from '@/api/search/index.js';
	export default{
		data(){
			return{
				shopList:[],
				imgBaseUrls:"",	
				searchValue:"",	//搜索词
				isWeiXinApplets:false,	//是否在微信中
			}
		},
		methods:{
			searchStore(){	//搜索店铺列表
				searchApi.searchStore({param:this.$Route.query.name}).then(res=>{
					if(res.data.code==200){
						this.shopList = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToShop(item){	//进入店铺
				this.$Router.push({
					path:"/pages/shop/index",
					query:{
						storeId:item.id
						
					}
				})
			},
			goToSearch(){
				this.$Router.replace({path:'/pages/search/index',query:{searchValue:this.searchValue}})
			},
			clearSearchValue(){
				this.searchValue = "";
				this.goToSearch()
			}
		},
		onShow() {
			this.imgBaseUrls = this.$config.imgBaseUrl
			this.searchStore();
			this.searchValue = this.$Route.query.name;
			// #ifdef MP-WEIXIN
			this.isWeiXinApplets = true;
			// #endif
		},
		components:{
			threeRowsGoods
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
	}
	.collectTitle{
		/* #ifdef MP-WEIXIN */
		padding-top: 16rpx
		/* #endif */
	}
	.collectTitle .title {
		width: calc(100% - 180rpx);
		/* #ifdef MP-WEIXIN */
		width: 100%;
		/* #endif */
		
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 14rpx;
		border-radius: 54rpx;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
	}
	.collectTitle  .title.active{
		width: calc(100% - 20rpx);
		margin: auto auto;
	}
	.searcIcon{
		width: 60rpx;
		height: 60rpx;
		margin-left: 24rpx;
		background:	url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_popover_search_180820@2x.png) no-repeat 50%;
		background-size: 28rpx 30rpx;
	}
	.searchInput{
		width: 100%;
		margin-left: 2rpx;
		padding-top: 10rpx;
		font-size: 26rpx;
		padding: 4rpx 0;
		line-height: 48rpx;
	}
	.clearIcon{
		width: 74rpx;
		height: 60rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/search_back@2x.png) no-repeat 50%;
		background-size: 26rpx 26rpx;
	}
	.searchBtn{
		width: 108rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 26rpx;
		margin-left: 10rpx;
		color: #333333;
	}
	.shopListTitle{
		width: 100%;
		padding: 20rpx 24rpx;
		display: flex;
	}
	.shopListTitle image{
		width: 123rpx;
		height: 123rpx;
		border: 1px solid #EEEEEE;
		border-radius: 12rpx;
	}
	.shopName{
		line-height: 123rpx;
		flex: 1;
		font-weight: 700;
		font-size: 30rpx;
		padding: 0 30rpx;
	}
	.goShop{
		width: 112rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 40rpx;
		font-size: 28rpx;
		color: #FF1558;
		text-align: center;
		margin-top: 40rpx;
		background-color: #FFECF1;
	}
	.shopContent{
		padding: 8rpx 36rpx;
	}
	.isNull{
		text-align: center;
		padding-top: 262rpx;
		width: 360rpx;
		margin: 0 auto;
	}
	.isNull image {
		width: 100%;
	}
	
	.isNullText {
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		margin-top: 55rpx;
	}
</style>
