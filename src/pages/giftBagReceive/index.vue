<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="giftReceive">
			<view class="title">
				<headImg class="userInfoHead" :head="info.smallIcon"></headImg>
				<text>{{info.nickName}} 送你一个超值大礼包快来领取吧~</text>
			</view>
			<view class="goodsInfo">
				<image class="goodsImage" :src="imgBaseUrls+info.goodsImage" mode=""></image>
				<view class="goodsName ellipsis-one">
					{{info.goodsName}}
				</view>
				<view class="goodsPrice">
					<text class="defPrice">¥{{info.goodsPrice}}</text>
					<text class="marketPrice" v-if="info.marketPrice">¥{{info.marketPrice}}</text>
				</view>
			</view>
			<view class="receiveBtn" v-if="info.receiveFlag==1" @click="goToGoodsDetail"></view>
			<view class="noReceiveBtn" v-else-if='info.receiveFlag==0'></view>
			<view class="noReciveGiftBtn" v-else></view>
		</view>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js'
	import headImg	from  '@/common/model/head.vue'
	export default{
		data(){
			return{
				defaultTitleDto:{
					title:'礼包领取',
				},
				info:{},
				orderId:"",
				imgBaseUrls:""
			}
		},
		methods:{
			giftBagInfo(){
				tradeApi.giftBagInfo(this.orderId).then(res=>{
					if(res.data.code==200){
						this.info = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToGoodsDetail(){
				if(this.info.orderState && this.info.receiveFlag){
					this.$Router.push({
						path:"/pages/goodsDetails/index",
						query:{
							goodsId:this.info.itemId,
							transferOrderId:this.info.orderId
						}
					})
				}else{
					uni.showToast({
						title:"礼包已领完",
						icon:"none"
					})
				}
				
			}
		},
		onLoad(query) {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			try{
				if(this.$Route.query.scene){
					this.orderId = decodeURIComponent(this.$Route.query.scene).split(",")[0]
					if(decodeURIComponent(this.$Route.query.scene).split(",")[1]){
						uni.setStorageSync("routerShareNumber",decodeURIComponent(this.$Route.query.scene).split(",")[1])
					}
				}
				if(query && query.scene){
					this.orderId = decodeURIComponent(query.scene).split(",")[0];
					if(decodeURIComponent(query.scene).split(",")[1]){
						uni.setStorageSync("routerShareNumber",decodeURIComponent(query.scene).split(",")[1])
					}
				}
				if(query && query.orderId){
					this.orderId = query.orderId;
					uni.setStorageSync("routerShareNumber",query.shareNumber)
				}
				if(this.$Route.query.orderId){
					this.orderId = this.$Route.query.orderId;
					uni.setStorageSync("routerShareNumber",this.$Route.query.shareNumber)
				}
				this.giftBagInfo()
			}catch(err){
				console.log(err)
				uni.showToast({
					title: "系统错误",
					icon: "none"
				})
				// uni.switchTab({
				// 	url:"/pages/index/index"
				// })
			}
		},
		components:{
			headImg
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		height: 100vh;
	}
	.giftReceive{
		width: 100%;
		height: 1060rpx;
		margin: 0 auto;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/giftReceiveBg.png) no-repeat;
		background-size: 100% 100%;
		padding:42rpx 79rpx 40rpx 79rpx;
		position: relative;
	}
	.userInfoHead {
		min-width: 90rpx;
		width: 90rpx;
		height: 90rpx;
		min-height: 90rpx;
		border-radius: 50%;
		overflow: hidden;
		display: inline-block;
		margin-right: 24rpx;
	}
	.title{
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
	.title text{
		font-size: 28rpx;
		color: #333333;
	}
	.goodsInfo{
		padding-bottom: 20rpx;
		width: 520rpx;
		margin: 0 auto;
		margin-top: 52rpx;
	}
	.goodsImage{
		width: 520rpx;
		height: 520rpx;
		border-radius: 24rpx;
	}
	.goodsName{
		text-align: center;
		font-size: 24rpx;
		color: #333333;
		margin-top: 30rpx;
	}
	.goodsPrice{
		margin-top: 20rpx;
		text-align: center;
	}
	.defPrice{
		color: #EC2626;
	}
	.marketPrice{
		color: #999999;
		font-size: 20rpx;
		margin-left: 35rpx;
	}
	.receiveBtn{
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 36rpx;
		width: 500rpx;
		height: 82rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/giftReceiveBgBtn.png);
		animation: bounceIn .5s infinite;
		background-size: 100% 100%;
	}
	.noReceiveBtn,.noReciveGiftBtn{
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 36rpx;
		width: 500rpx;
		height: 82rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noGiftReceiveBgBtn.png);
		background-size: 100% 100%;
	}
	.noReciveGiftBtn{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noGiftReceiveBgBtn1.png);
		background-size: 100% 100%;
	}
	@keyframes bounceIn {
	    0% {
	        transform: scale(1,1)
	    }
		50% {
	        transform: scale(1.13,1.13)
	    }
	    to {
	        transform: scale(1,1)
	    }
	}
</style>
