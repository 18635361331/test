<template>
	<view class="page">
		<view class="skuPage" v-if="goodsInfo.goldRatio && goodsInfo.singlePromotionType!=100">
			<view class="skuChoose">库豆</view>
			<view class="skuText">库豆预估可抵扣
				<text class="goldText">￥{{getGoodsPrice()}}</text>
			</view>
		</view>
		<view class="skuPage" v-if="singleProduct.singlePromotion && (singleProduct.singlePromotion.type==1 || singleProduct.singlePromotion.type==2)" @click="openActivePromotions">
			<view class="skuChoose">促销</view>
			<view class="skuText promotion">
				<text v-if="singleProduct.singlePromotion.type==1" class="activity">折扣</text>
				<text v-if="singleProduct.singlePromotion.type==2" class="activity">一口价</text>
				{{singleProduct.singlePromotion.promotionPrice}}元
				<text v-if="singleProduct.singlePromotion.confineNum">，每人限购{{singleProduct.singlePromotion.confineNum}}件，超出数量以结算价为准</text>
			</view>
			<text class="arrowIcon"></text>
		</view>
		<view class="skuPage" v-if="reducePromotions && reducePromotions.length" @click="openReducePromotions">
			<view class="skuChoose">满减</view>
			<view class="skuText">
				{{reducePromotions[0].name}}
			</view>
			<text class="arrowIcon"></text>
		</view>
		<view class="skuPage" v-if="goodsInfo.skuPromotionList && goodsInfo.skuPromotionList[0].freightPromotion">
			<view class="skuChoose">包邮</view>
			<view class="skuText">
				{{goodsInfo.skuPromotionList[0].freightPromotion.name}}
			</view>
			<text class="arrowIcon"></text>
		</view>
		<uni-popup ref="reducePromotions" type="bottom">
			<view class="reduce">
				<view class="reduceTitle">
					满减
				</view>
				<scroll-view scroll-y="true" class="reduceScroll">
					<view class="everyRow" v-for="item,index in reducePromotions" :key='index'>{{item.name}}</view>
				</scroll-view>
				<view class="closeReduce" @click="closeReducePromotions">
					完成
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="activityPromotions" type="bottom">
			<view class="reduce">
				<view class="reduceTitle">
					单品优惠
				</view>
				<scroll-view scroll-y="true" class="reduceScroll">
					<view class="everyRow" v-if="singleProduct.singlePromotion && singleProduct.singlePromotion.type==1">
						<text class="promotions">单品折扣</text>
						折扣{{singleProduct.singlePromotion.promotionPrice}}元
					</view>
					<view class="everyRow" v-if="singleProduct.singlePromotion && singleProduct.singlePromotion.type==2">
						<text class="promotions">单品折扣</text>
						折扣{{singleProduct.singlePromotion.promotionPrice}}元
					</view>
				</scroll-view>
				<view class="closeReduce" @click="closeActivePromotions">
					知道啦
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		props:['goodsInfo','chooseSpceData','reducePromotions','singleProduct','memberInfo'],
		data(){
			return{
				
			}
		},
		methods:{
			openReducePromotions(){	//打开满减券弹窗
				this.$refs.reducePromotions.open()
			},
			closeReducePromotions(){	//关闭满减券弹窗
				this.$refs.reducePromotions.close()
			},
			openActivePromotions(){	//打开单品优惠弹窗
				this.$refs.activityPromotions.open()
			},
			closeActivePromotions(){	//关闭单品优惠弹窗
				this.$refs.activityPromotions.close()
			},
			getGoodsPrice(){	//商品价格的展示与判断
				try{
					if((this.memberInfo.plusFlag==4 && this.goodsInfo.distributorPriceFlag) || (this.memberInfo.plusFlag!=4 && this.memberInfo.plusFlag)){
						let price = this.chooseSpceData.skuId?this.chooseSpceData.memberPrice:this.goodsInfo.minTypePrice;
						return (price*this.goodsInfo.goldRatio/100).toFixed(2)
					}else{
						if(!this.goodsInfo.singlePromotionType && this.chooseSpceData.price){
							return (this.chooseSpceData.price*this.goodsInfo.goldRatio/100).toFixed(2)
						}else if(!this.goodsInfo.singlePromotionType && this.singleProduct.singlePromotion && this.singleProduct.singlePromotion.promotionPrice){
							return (this.singleProduct.singlePromotion.promotionPrice*this.goodsInfo.goldRatio/100).toFixed(2)
						}else if(this.goodsInfo.minPrice!=this.goodsInfo.maxPrice){
							return (this.goodsInfo.minPrice*this.goodsInfo.goldRatio/100).toFixed(2) + "-" + (this.goodsInfo.maxPrice*this.goodsInfo.goldRatio/100).toFixed(2)
						}else{
							return (this.goodsInfo.maxPrice*this.goodsInfo.goldRatio/100).toFixed(2)
						}
					}
				}catch(e){
					return (this.goodsInfo.minPrice*this.goodsInfo.goldRatio/100).toFixed(2)
				}
				
			},
		},
		mounted() {
			
		},
		components:{
		}
	}
</script>

<style scoped>
	.skuPage{
		width: 100%;
		min-height: 110rpx;
		background-color: #FFFFFF;
		display: flex;
		padding-left: 24rpx;
	}
	.skuChoose{
		margin: 0 24rpx 0 0;
		font-size: 26rpx;
		color: #999;
		line-height: 110rpx;
		display: inline-block
	}
	.skuText{
		display: inline-block;
		min-height: 110rpx;
		line-height: 26rpx;
		font-size: 26rpx;
		padding: 41rpx 30rpx 41rpx 0;
		flex: 1;
		color: #000000;
	}
	.skuText image{
		width: 20rpx;
		height: 28rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}
	.arrowIcon{
		display: inline-block;
		width: 48rpx;
		margin-right: 20rpx;
		height: 110rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/more_fx2@2x.png) no-repeat 50%; 
		background-size: 40rpx 40rpx;
	}
	.goldText{
		color: #FF1558;
		display: inline-block;
	}
	.reduce{
		width: 100%;
		height: 752rpx;
		background-color: #FFFFFF;
	}
	.reduceTitle{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 34rpx;
	}
	.reduceScroll{
		height: calc(100% - 200rpx);
		width: 100%;
	}
	.everyRow{
		height: 110rpx;
		line-height: 110rpx;
		margin-left: 24rpx;
		color: #666666;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.closeReduce{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #FF1558;
		font-size: 36rpx;
	}
	
	.activity{
		font-size: 18rpx;
		color: #ff7e18;
		background-color: #ffeee1;
		border-radius: 24rpx;
		text-align: center;
		height: 26rpx;
		line-height: 26rpx;
		margin-right: 10rpx;
		padding: 0 12rpx;
	}
	.promotions{
		font-size: 24rpx;
		height: 34rpx;
		line-height: 34rpx;
		background-color: #ffeee1;
		color: #ff7e18;
		border-radius: 100rpx;
		margin-top: 16rpx;
		padding: 0 10rpx;
		margin-right: 10rpx;
	}
	.promotion{
		line-height: 36rpx;
	}
</style>
