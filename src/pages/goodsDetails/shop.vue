<template>
	<!-- 店铺 -->
	<view class="page goodsDetailsStore" @click="$Router.push({path:'/pages/shop/index',query:{storeId:storeInfo.storeId}})">
		<view class="storeTitle">
			<view class="storeImage" :style="{backgroundImage:'url('+imgBaseUrls+storeInfo.images+')'}"></view>
			<view class="store-name">
				<view class="storeName">{{storeInfo.name}}</view>
				<view class="storeSale">在售商品<text>{{storeInfo.salesTotal}}</text>件</view>
			</view>
			<!-- 0正常  2冻结 -->
			<view class="storeBtn">进店</view>
		</view>
		<!-- <view class="storeContent">
			<view class="entryStore">
				<view class="entryTop">
					进入店铺
				</view>
				<view class="entryTop borderNone">
					Entry this shop
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import merchantApi from '@/api/merchant/index.js';
	import goodsApi from '@/api/goods/index.js'
	export default{
		props:['goodsInfo'],
		data(){
			return{
				storeInfo:{},
				imgBaseUrls:""
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl
			this.getStore();
		},
		methods:{
			getStore(){	//获取店铺信息
				merchantApi.getStore(this.goodsInfo.belongStore).then(res=>{
					if(res.data.code==200){
						this.storeInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		
	}
</script>

<style>
	.goodsDetailsStore{
		background-color: #fff;
		width: 100%;
		padding-top: 50rpx;
		padding-bottom: 50rpx;
	}
	.storeTitle{
		width: 100%;
		padding:  0 24rpx;
		display: flex;
		height: 123rpx;
		align-items: center;
	}
	.storeTitle .storeImage{
		width: 123rpx;
		height: 123rpx;
		background-position: 50%;
		background-size: cover;
		border-radius: 12rpx;
		border: 1px solid #E6E6E6;
		background-repeat: no-repeat;
	}
	.store-name{
		height: 100%;
		padding: 20rpx 30rpx;
		line-height: 35rpx;
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: space-between;
	}
	.storeName{
		font-size: 30rpx;
		color: #000000;
		font-weight: 700;
	}
	.storeBtn{
		font-size: 26rpx;
		color: #fff;
		background-color: #ff1558;
		margin-right: 24rpx;
		width: 98rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		text-align: center;
	}
	.storeContent{
		width: auto;
		padding: 24rpx;
	}
	.storeSale{
		font-size: 26rpx;
		color: #999;
	}
	.storeSale text{
		padding: 12rpx;
		color: #ff1558;
	}
	.entryStore{
		width: 266rpx;
		height: 266rpx;
		line-height: 54rpx;
		text-align: center;
		color: #999;
		font-size: 24rpx;
		padding: 83rpx 40rpx;
		border: 1px solid #E6E6E6;
		border-radius: 16rpx;
	}
	.entryTop{
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		border-bottom: 1px solid #E6E6E6;
	}
	.borderNone{
		border: none;
	}
</style>
