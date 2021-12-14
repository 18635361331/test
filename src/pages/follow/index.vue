<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="followStore">
			<view class="store" v-if="followStore.records && followStore.records.length" v-for="item,index in followStore.records" :key='item.id'>
				<image :src="imgBaseUrls+item.images" mode=""></image>
				<view class="storeName">
					{{item.storeName}}
				</view>
				<view class="entryStore" @tap='entryStore(item)'>进店逛逛</view>
			</view>
			<view class="orderNoMsg" v-if="!followStore.records || !followStore.records.length">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collection_none@2x.png" mode="widthFix"></image>
				<view class="orderNoMsgText">
					暂无关注！
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import merchantApi from '@/api/merchant/index.js'
	export default{
		data(){
			return{
				pageInfo:{
					pageNo:1,
					pageSize:10
				},
				followStore:{},
				imgBaseUrls: "",
				defaultTitleDto:{
					title:'关注店铺',
				}
			}
		},
		onShow() {
			this.zhuge.track("关注店铺页面")
			if(this.pageInfo.pageNo>1){
				this.pageInfo.pageNo = 1;
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
			}
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.selectMerchantFollowList()
		},
		methods:{
			selectMerchantFollowList(flag){	//获取关注店铺列表
				merchantApi.selectMerchantFollowList(this.pageInfo).then(res=>{
					if(res.data.code==200){
						if(flag){
							this.followStore.records = this.followStore.records.concat(res.data.data.records);
							this.followStore.totalPage = res.data.data.totalPage;
						}else{
							this.followStore = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			entryStore(item){	//进入店铺
				this.$Router.push({
					path:"/pages/shop/index",
					query:{
						storeId:item.storeId
					}
				})
			}
		},
		onReachBottom(){	//页面滚动到底部
			if(this.pageInfo.pageNo<this.followStore.totalPage){
				this.pageInfo.pageNo++;
				this.selectMerchantFollowList(true)
			}
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	
	.scrollViewGoods{
		padding: 0 36rpx;
		padding-top: 20rpx;
		background:#F5F5F5;
	}
	.store{
		width: 100%;
		height: 169rpx;
		background-color: #FFFFFF;
		margin-bottom: 10rpx;
		display: flex;
	}
	.store image{
		width: 123rpx;
		height: 123rpx;
		margin: 20rpx 37rpx 26rpx 24rpx;
		border-radius: 9rpx;
		border: 1rpx solid #D1D1D1;
	}
	.storeName{
		width: 398rpx;
		line-height: 168rpx;
		color: #333333;
	}
	.entryStore{
		width: 144rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background-color: #FFFFFF;
		color: #FF1558;
		border: 1rpx solid #FF1558;
		border-radius: 40rpx;
		margin-top: 70rpx;
	}
	.followStore{
		width:100%;
		height: 100vh;
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 88rpx);
		/* #endif */
		background: #F5F5F5;
	}
	.orderNoMsg {
		padding-top: 262rpx;
		width: 360rpx;
		margin: 0 auto;
	}
	
	.orderNoMsg image {
		width: 100%;
	}
	
	.orderNoMsgText {
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		margin-top: 55rpx;
	}
</style>
