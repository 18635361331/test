<template>
	<view class="goodsPrice"  :class="((memberInfo.plusFlag==4 && params.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))?'':'active'">
		<text class="currency" :class="((memberInfo.plusFlag==4 && params.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))?'':'active'">¥</text>
		<text class="price" :class="((memberInfo.plusFlag==4 && params.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))?'':'active'">{{computedPrice(params)}}</text>
		<text class="decoration" v-if="computedUnpromotionMinPrice(params)">¥{{computedUnpromotionMinPrice(params)}}</text>
		<view class="defaultPrice" v-if="params.customizeFlag && params.defaultPrice">¥{{params.defaultPrice}} 零售价</view>
	</view>
</template>
<script>
	export default {
		props:['params'],
		data(){
			return{
				memberInfo:{}
			}
		},
		methods:{
			computedPrice(params){	//普通价格
				let price = params.minPrice?params.minPrice:params.sellingPrice
				if(params.singlePromotionType==24 && (this.memberInfo.newMemberFlag || !uni.getStorageSync("sessionId"))){	//新人价
					return params.unpromotionMinPrice || params.sellingPrice
				}else{
					if(price!=params.maxPrice && params.customizeFlag){
						return price +"~"+ params.maxPrice
					}else{
						return params.minPrice?params.minPrice:params.sellingPrice
					}
				}
			},
			computedUnpromotionMinPrice(params){
				if(params.marketPrice){	//普通划线价
					return params.marketPrice
				}
				return false
			},
		},
		mounted() {
			this.memberInfo = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{}
		}
	}
</script>
<style scoped>
	.goodsPrice {
		line-height: 24rpx;
		margin-top: 12rpx;
	}
	
	.currency {
		font-size: 18rpx;
		color: #333;
	}
	
	.price {
		font-size: 24rpx;
		color: #333;
	}
	.goodsPrice.active{
		margin-top: 24rpx;
	}
	.price.active{
		color: #FF1558;
		font-size: 32rpx;
	}
	.currency.active{
		color: #FF1558;
	}
	.decoration {
		text-decoration: line-through;
		margin-left: 12rpx;
		color: #999;
		font-size: 20rpx;
	}
	.defaultPrice{
		color: #666666;
		margin-top: 12rpx;
		font-size: 22rpx;
	}
</style>

