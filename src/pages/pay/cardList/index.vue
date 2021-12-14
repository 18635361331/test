<template>
	<view class="page">
		<uni-popup ref="giftCardInfo" type="bottom">
			<view class="cardList">
				<view class="cardTitle">
					我的礼卡
				</view>
				<scroll-view scroll-y="true" class="giftCardList">
					<view class="everyRowParent" v-for="item,index in cardInfo.usableCards" :key='item.cardNo'>
						<view class="everyRow">
							<view class="mask" v-if="!payInfo.memberAsset.cardAmount"></view>
								<view class="giftCardInfo">
									<view class="giftCardImage">
										<image :src="imgBaseUrls+item.cover" mode=""></image>
										<view class="giftCardHint">
											有效期至：{{$utils.formatDate(new Date(item.expireTime),"yyyy-MM-dd")}}
										</view>
									</view>
									<view class="giftCardText">
										<view class="giftCardName">
											<text>{{item.cardName}}</text>
											<text class="giftCardType">推荐</text>
										</view>
										<view class="giftCardRange">
											<text v-if="item.scope==1">可用范围：全平台通用</text>
											<text v-if="item.scope==2">可用范围：部分店铺可用</text>
											<text v-if="item.scope==3">可用范围：部分店铺不可用</text>
											<text v-if="item.scope==4">可用范围：部分商品可用</text>
										</view>
										<view class="giftPrice" v-if="item.selectedAmount"> 
											￥{{item.selectedAmount}}
										</view>
									</view>
									<view class="payChooseBtn" @click="chooseChange(item)" :class="item.seleted?'active':''"></view>
								</view>
						</view>
						<view class="giftCardPriceInfo">
							<view class="giftCardPriceAll">
								余额：
								<text>￥{{item.cardAmount}}</text>
							</view>
							<view class="giftCardPriceAll">
								本次可用：
								<text>￥{{item.usefulAmount}}</text>
							</view>
							<view class="detailsBtn"  @click="detailsChange(item)">
								详情
								<view class="arrowIcon" :class="item.flag?'active':''"></view>
							</view>
						</view>
						<view class="giftCardDetails" v-if="item.flag">
							<view class="giftCardDetailsTitle">
								当前礼卡可支付的商品
							</view>
							<scroll-view scroll-x="true" class="goodsList">
								<view class="goodsListParent">
									<view class="everyGoodsRow" v-for="v,i in item.goodsList" :key='i'>
										<image :src="imgBaseUrls + v.imgUrl" mode=""></image>
										<view class="goodsName">
											{{v.name}}
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</scroll-view>
				<view class="sureBtn" @click="closeGiftCardPopup">
					完成
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js'
	export default {
		props:["cardInfo","payInfo"],
		data(){
			return{
				imgBaseUrls: "",
			}
		},
		methods:{
			openGiftCardPopup(){	//打开礼卡信息弹窗
				this.$refs.giftCardInfo.open()
			},
			closeGiftCardPopup(){	//关闭礼卡信息弹窗
				this.$refs.giftCardInfo.close()
			},
			detailsChange(item){	//详情变化时触发
				this.$set(item,"flag",item.flag?false:true)
			},
			chooseChange(item){	//礼卡勾选状态放生变化时触发
				this.payInfo.memberAsset.cardUseMoney=this.payInfo.memberAsset.cardUseMoney?this.payInfo.memberAsset.cardUseMoney:0
				if(item.seleted){
					item.seleted = false;
					this.payInfo.memberAsset.cardUseMoney = this.payInfo.memberAsset.cardUseMoney - item.usefulAmount
				}else{
					item.seleted = true;
					this.payInfo.memberAsset.cardUseMoney = this.payInfo.memberAsset.cardUseMoney + item.usefulAmount
				}
				this.selectCards()
			},
			selectCards(){	//礼卡更改时触发
				let  cards = [];
				for(let i=0;i<this.cardInfo.usableCards.length;i++){
					if(this.cardInfo.usableCards[i].seleted){
						cards.push({
							cardNo:this.cardInfo.usableCards[i].cardNo,
							amt:this.cardInfo.usableCards[i].usefulAmount
						})
					}
				}
				let params = {
					balance:this.payInfo.memberAsset.balanceUseMoney?this.payInfo.memberAsset.balanceUseMoney:0,
					cardAmount:this.payInfo.memberAsset.cardUseMoney,
					cards:cards,
					payId:this.$Route.query.payId
				}
				tradeApi.selectCards(params).then(res=>{
					if(res.data.code==200){
						this.$emit("cardAmountChange",res.data.data);
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.cardList{
		width: 100%;
		height: calc(100vh - 300rpx);
		background-color: #FFFFFF;
	}
	.cardTitle{
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		border-bottom: 1rpx solid #E4E4E4;
	}
	.giftCardList{
		height: calc(100% - 200rpx);
		background-color: #FFFFFF;
		
	}
	.everyRowParent{
		width: 100%;
		padding: 12px;
		position: relative;
		border-bottom: 1rpx solid #E4E4E4;
		
	}
	.everyRow {
		display: flex;
	}
	.mask{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: rgba(255,255,255,0.3);
		z-index: 1;
	}
	.giftCardInfo{
		width: 100%;
		height: 68px;
		display: flex;
	}
	.giftCardImage{
		width: 90px;
		height: 68px;
		position: relative;
		margin-right: 12px;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.giftCardImage image{
		width: 100%;
		height: 100%;
	}
	.giftCardHint{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 16px;
		font-size: 8px;
		background-color: rgba(0,0,0,0.4);
		color: #FFFFFF;
		text-align: center;
		line-height: 16px;
	}
	.giftCardText{
		flex: 1;
		height: 68px;
		position: relative;
	}
	.giftCardName{
		width: 100%;
		height: 24px;
		display: flex;
		align-items: center;
	}
	.giftCardType{
		display: inline-block;
		width: 40px;
		height: 16px;
		background-color: #FF1558;
		color-interpolation: #fff;
		color: #FFFFFF;
		border-radius: 50px;
		text-align: center;
		line-height: 16px;
		font-size: 10px;
		margin-left: 20rpx;
	}
	.sureBtn{
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: #FFFFFF;
		background-color: #FF1558;
	}
	.giftCardRange{
		width: 100%;
		height: 15px;
		line-height: 15px;
		color: #999999;
		padding-right: 20px;
		font-size: 11px;
	}
	.giftPrice{
		font-size: 16PX;
		line-height: 22px;
		color: #FF1558;
		height: 22px;
	}
	.giftCardPriceInfo{
		width: 100%;
		height: 17px;
		line-height: 17px;
		display: flex;
		color: #002537;
		position: relative;
		font-size: 12px;
		margin-top: 12px;
	}
	.giftCardPriceAll{
		width: auto;
		margin-right: 40rpx;
	}
	.giftCardPriceAll text{
		color: #FF1558;
	}
	.payChooseBtn {
		width: 36rpx;
		height: 36rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
		position: absolute;
		right: 20rpx;
		top: 80rpx;
	}
	
	.payChooseBtn.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}
	.detailsBtn{
		width: 80rpx;
		height: 17px;
		display: flex;
		align-items: center;
		position: absolute;
		right: 0rpx;
		bottom: 0;
		color: #666666;
	}
	.arrowIcon{
		width: 20rpx;
		height: 10rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_cannotusearrow@2x.png) no-repeat 50%;
		background-size: 20rpx 10rpx;
		margin-left: 10rpx;
	}
	.arrowIcon.active{
		transform: rotate(180deg);
	}
	.giftCardDetailsTitle{
		width: 100%;
		padding: 24px 0 6px;
		color: #333;
		line-height: 16px;
	}
	.goodsList{
		width: 100%;
	}
	.goodsListParent{
		display: flex;
		flex-wrap: nowrap;
	}
	.everyGoodsRow{
		width: 90px;
		margin-right: 12px;
	}
	.everyGoodsRow image{
		width: 90px;
		height: 90px;
	}
	.goodsName{
		width: 100%;
		height: 28px;
		text-align: center;
		line-height: 14px;
		margin-top: 5px;
		font-size: 11px;
		color: #999999;
	}
</style>

