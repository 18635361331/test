<template>
	<view class="page">
		<view class="goodsItemTags">
			<view class="goodsItemTag marketIngBox" v-if="params.promotionExtraTag && memberInfo.plusFlag">
				<image :src="imgBaseUrls+params.promotionExtraTag.subject" mode=""></image>
				<text class="verb">{{params.promotionExtraTag.verb}}</text>
				<text class="objectPrice">{{params.promotionExtraTag.object}}</text>
			</view>
			<view class="goodsItemTag superTag" v-if="(params.singlePromotionType==21 || params.singlePromotionType>50)&& params.singlePromotionstatus==2">超值礼品</view>
			<!-- 新人专享 -->
			<view class="newUserIcon" v-if="params.singlePromotionType==24 && (memberInfo.newMemberFlag || !Object.keys(memberInfo).length)"></view>
			<!-- 新人专享结束 -->

			<view class="goodsItemTag border_style" v-if="params.integralRatio">积分抵扣{{params.integralRatio}}%</view>
			<view class="goodsItemTag border_style" v-if="params.singlePromotionType==1">限时折扣</view>
			<view class="goodsItemTag border_style" v-if="params.singlePromotionType==6">秒杀</view>
			<view class="goodsItemTag border_style" v-if="params.singlePromotionType==2">一口价</view>
			<view class="goodsItemTag border_style" v-if="params.singlePromotionType==14">一分价</view>
			<view class="goodsItemTag border_style" v-if="params.singlePromotionType==15">会员专享价</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['params'],
		data(){
			return{
				memberInfo:{},
				imgBaseUrls:""
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.memberInfo = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{}
		}
	}
</script>

<style scoped>
	.goodsItemTags {
		line-height: 30rpx;
	}
	.goodsItemTag {
		display: inline-block;
		vertical-align: middle;
		margin-top: 8rpx;
		margin-right: 8rpx;
		color: #FF1558;
		font-size: 18rpx;
	}
	
	/* .everyGoods {
		margin-top: 10rpx;
	} */
	
	.superTag {
		padding: 5rpx 8rpx;
		background-color: #242424;
		font-size: 20rpx;
		border-radius: 8rpx;
		color: #FFDCBA;
		margin-top: 8rpx;
		margin-right: 8rpx;
		width: auto;
	}
	
	.marketIngBox {
		height: 31rpx;
		line-height: 30rpx;
		display: inline-block;
		padding-right: 8rpx;
		background-color: #FBE3B2;
		border-radius: 8rpx;
		font-size: 20rpx;
		margin-right: 8rpx;
		overflow: hidden;
	}
	
	.marketIngBox image , .marketIngBox text{
		display: inline-block;
		vertical-align: middle;
		line-height: 1;
	}
	
	.marketIngBox image{
		width: 70rpx;
		height: 100%;
	}
	
	.marketIngBox .verb {
		color: #242424;
		margin-left: 5rpx;
	}
	
	.objectPrice {
		color: #242424;
	}
	.newUserIcon{
		width: 100rpx;
		height: 40rpx;
		position: absolute;
		left: 0;
		top: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/newUserGoodsIcon.png) no-repeat;
		background-size:100% 100%;
	}
	
</style>
