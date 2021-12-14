<template>
	<view class="page cardStore">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="shopList" v-for="item,index in storeList" :key='index' v-if="storeList.length">
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
	</view>
</template>

<script>
	import threeRowsGoods from '@/renovation/threeRowsGoods/index.vue'
	import appApi from '@/api/app/index.js'
	export default{
		data(){
			return{
				defaultTitleDto:{
					title:'礼卡可用店铺',
				},
				storeList:[],
				imgBaseUrls:""
			}
		},
		methods:{
			getStoreItemsList(){
				appApi.getStoreItemsList(this.$Route.query.cardId).then(res=>{
					if(res.data.code==200){
						this.storeList = res.data.data
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
		},
		onShow() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.getStoreItemsList();
		},
		components:{
			threeRowsGoods
		}
	}
</script>

<style scoped>
	.cardStore{
		padding-top: 88rpx;
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
</style>
