<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="giftCardTab">
			<view class="tabRow" @click="tabChange(1)">
				<text :class="category==1?'active':''">可用</text>
			</view>
			<view class="tabRow" @click="tabChange(0)">
				<text :class="category==0?'active':''">不可用</text>
			</view>
		</view>
		<view class="giftCardList">
			<view class="giftCardListRow" :class="category==0?'used':''"  v-for="item,index in giftInfo.records" :key='index'>
				<view class="cardImage">
					<image :class="category==0?'disabled':''" :src="imgBaseUrls+item.cover" mode="aspectFill"></image>
					<view class="cardPrice">
						面值￥{{item.faceValue}}
					</view>
				</view>
				<view class="sealIcon" v-if="category==0"></view>
				<view class="cardInfo">
					<view class="ellipsis-one">
						{{item.cardName}}
					</view>
					<view class="cardDetails ellipsis-one">
						卡号：{{item.cardNo}}
					</view>
					<view class="cardDetailsRange ellipsis-one">
						可用范围：{{item.scope}}
					</view>
					<view class="cardDetailsRange ellipsis-one">
						<text>有效期至：{{$utils.formatDate(item.deadTime,"yyyy-MM-dd hh:mm:ss")}}</text>
						<text>余额</text>
					</view>
				</view>
				<view class="balancePrice" :class="category==0?'disabled':''">
					<text>￥</text> {{item.balance}}
				</view>
			</view>
			<view class="noGiftCard" v-if="!giftInfo.records || !giftInfo.records.length">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_order_none@2x.png" mode=""></image>
				<view class="noText">
					暂无可用礼卡
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js'
	export default{
		data(){
			return{
				category:1,
				pageInfo:{
					pageNo:1,
					pageSize:10
				},
				giftInfo:{},
				imgBaseUrls: "",
				defaultTitleDto:{
					title:'我的礼卡',
				}
			}
		},
		methods:{
			cardList(flag){	//获取礼卡列表
				appApi.cardList({...this.pageInfo,category:this.category}).then(res=>{
					if(res.data.code==200){
						if(flag){
							this.giftInfo.records = this.giftInfo.records.concat(res.data.data.records);
							this.giftInfo.totalPage = res.data.data.totalPage;
						}else{
							this.giftInfo = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			tabChange(item){	//礼卡类型
				this.category = item;
				this.pageInfo.pageNo = 1;
				this.cardList()
			},
		},
		onReachBottom(){	//页面滚动到底部
			if(this.pageInfo.pageNo<this.giftInfo.totalPage){
				this.pageInfo.pageNo++;
				this.cardList(true)
			}
		},
		onShow() {
			this.zhuge.track("我的礼卡-落地页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.cardList()
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 196rpx;
		/* #endif */
		background-color: #F5F5F5;
		min-height: 100vh;
	}
	.giftCardTab{
		position: fixed;
		top: 0;
		/* #ifndef MP-WEIXIN */
		top: 88rpx;
		/* #endif */
		background-color: #FFFFFF;
		left: 0;
		display: flex;
		width: 100%;
		height: 88rpx;
	}
	.tabRow{
		width: 50%;
		text-align: center;
	}
	.tabRow text{
		display: inline-block;
		height: 100%;
		line-height: 88rpx;
		border-bottom: 4rpx solid #FFFFFF;
	}
	.tabRow text.active{
		color: #FF1558;
		border-bottom: 4rpx solid #FF1558;
	}
	.giftCardList{
		background-color: #F5F5F5;
		color: #9a9a9a;
	}
	.giftCardListRow{
		width: 100%;
		height: 225rpx;
		background-color: #FFFFFF;
		position: relative;
		border-left: 10rpx solid #FF1558;
		margin-top: 10rpx;
		display: flex;
		align-items: center;
		padding-left: 22rpx;
	}
	.giftCardListRow.used{
		border-color: #b4b4b4;
	}
	.cardImage{
		width: 184rpx;
		height: 184rpx;
		border: 1rpx solid #EEEEEE;
		padding-top: 30rpx;
		text-align: center;
	}
	.cardImage image{
		width: 170rpx;
		height: 106rpx;
	}
	.cardImage image.disabled{
		opacity: 0.5;
		-webkit-filter: grayscale(100%);
	  -moz-filter: grayscale(100%);
	  -ms-filter: grayscale(100%);
	  -o-filter: grayscale(100%);
	  filter: grayscale(100%);
	}
	.cardPrice{
		color: #555;
	}
	.cardInfo{
		flex: 1;
		padding:0 20rpx 0 10rpx;
	}
	.cardDetails{
		color: #9a9a9a;
		font-size: 24rpx;
		margin-top: 30rpx;
	}
	.cardDetailsRange{
		color: #7f7f7f;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		
	}
	.balancePrice{
		position: absolute;
		top: 100rpx;
		right: 20rpx;
		font-size: 38rpx;
		color: #FF1558;
	}
	.balancePrice.disabled{
		color: #999;
	}
	.balancePrice text{
		font-size: 24rpx;
	}
	.sealIcon{
		width: 125rpx;
		height: 125rpx;
		position: absolute;
		left: 10rpx;
		top: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/gift_card_used@2x.png) no-repeat 50%;
		background-size: 100%;
	}
	.noGiftCard{
		width: 100%;
		background-color: #F5F5F5;
		text-align: center;
		padding-top: 300rpx;
	}
	.noGiftCard image{
		width: 360rpx;
		height: 360rpx;
	}
	.noText{
		color: #999;
		text-align: center;
		font-size: 30rpx;
		padding-top: 55rpx;
	}
</style>
