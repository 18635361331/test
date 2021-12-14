<template>
	<view class="page goodsPriceBox">
		<view class="memberPrice" v-if="((memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))">
			<block v-if="!chooseSpceData.skuId">
				¥
				<text class="memberPriceNum" v-if="goodsInfo.minTypePrice!=goodsInfo.maxTypePrice">{{goodsInfo.minTypePrice}}~{{goodsInfo.maxTypePrice}}</text>
				<text class="memberPriceNum" v-else>{{goodsInfo.minTypePrice}}</text>
				<view class="memberName" :style="{background:memberIconConfig.color}">
					<text>{{memberInfo.memberTypeName}}价</text>
				</view>
			</block>
			<block v-else>
				¥
				<text class="memberPriceNum">{{chooseSpceData.memberPrice}}</text>
				<view class="memberName" :style="{background:memberIconConfig.color}">
					<text>{{memberInfo.memberTypeName}}价</text>
				</view>
			</block>
		</view>
		
		<view class="cusGoodsPrice" >
			<text class="priceArrow" :class="((memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))?'':'active'">¥</text>
			<view class="price" :class="((memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))?'':'active'">
				<view v-if="!chooseSpceData.skuId">
					<text v-if="goodsInfo.minPrice!=goodsInfo.maxPrice">{{goodsInfo.minPrice}}~{{goodsInfo.maxPrice}}</text>
					<text v-else>{{goodsInfo.minPrice}}</text>
				</view>
				<view v-else>
					<text>{{chooseSpceData.price}}</text>
				</view>
			</view>
			<text class="referencePrice" v-if="goodsInfo.minOrderQuantity>=0"><text>{{goodsInfo.minOrderQuantity}}</text>{{goodsInfo.unit?goodsInfo.unit:"支"}}起订</text>
		</view>
		
		<view class="retailPrice" v-if="goodsInfo.defaultPrice">
			<text>¥{{goodsInfo.defaultPrice}}</text>全国统一零售价
		</view>
		<view class="priceHint">
			最终价格以实际加工定制需求为准
		</view>
		<view class="goodsName">
			<text class="cusHint">礼品定制</text>
			<text>{{goodsInfo.name}}</text>
		</view>
		<view>
			<text class="cusTag" v-for="(item,index) in goodsInfo.itemLabelList" :key='index' v-if="goodsInfo.itemLabelList&&goodsInfo.itemLabelList">{{item.labelDesc}}</text>
		</view>
		<view class="shareBtn" @click="openSharePopup">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/goods_details_share.png" mode=""></image>
			<view>
				分享
			</view>
		</view>
		<share ref='sharePopup' :shareImageList='shareImageList'></share>
	</view>
</template>

<script>
	import promotionApi from '@/api/promotion/index.js'
	import share from '../../goodsDetails/share.vue'	//分享
	import vipConfig from '@/common/js/vipConfig.js'
	export default {
		props:["goodsInfo","chooseSpceData","goodsInfoId"],
		data(){
			return{
				shareImageList:"",
				memberInfo:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{},
				memberIconConfig:{}
			}
		},
		methods:{
			openSharePopup(){//分享图
				if(!uni.getStorageSync("sessionId")){
					this.$Router.push({
						path:"/pages/login/index"
					})
					return
				}
				uni.showLoading({
					title:"生成中..."
				})
				let frontEndType=""
				//#ifdef MP-WEIXIN
					frontEndType = "weixinMini"
				//#endif
				// #ifdef H5
					frontEndType = "weixin"
				//#endif
				let params = {
					frontEndType:frontEndType,
					promotionType:this.goodsInfo.singlePromotionType,
					promotionId:this.goodsInfo.promotionId,
					itemId:this.goodsInfoId
				}
				promotionApi.generatePoster(params).then(res=>{
					if(res.data.code==200){
						this.shareImageList = res.data.data
						this.$refs.sharePopup.openSharePopup()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
					uni.hideLoading()
				})
			}
		},
		async mounted() {
			if(this.memberInfo.plusFlag==4){
				let partner = await vipConfig.getPartner();
				for(let i = 0;i<partner.length;i++){
					if(partner[i].id = this.memberInfo.distributorTypeId){
						this.memberIconConfig = partner[i]
					}
				}
			}else{
				this.memberIconConfig = await vipConfig.getUserVip()
			}
		},
		components:{
			share
		}
	}
</script>

<style scoped>
	.goodsPriceBox{
		width: 100%;
		min-height: 256rpx;
		background-color: #FFFFFF;
		padding-top: 32rpx;
		padding-left: 24rpx;
		padding-bottom: 10rpx;
		position: relative;
	}
	.cusGoodsPrice{
		display: flex;
		align-items: flex-end;
		margin-top: 10rpx;
	}
	.priceArrow{
		font-size: 22rpx;
		color: #333333;
	}
	.priceArrow.active{
		font-size: 30rpx;
		color: #FE1557;
	}
	.price{
		font-size: 28rpx;
		color: #333;
		margin-right: 24rpx;
		margin-left: 4rpx;
		padding-top: 10rpx;
	}
	.price.active{
		color: #FE1557;
		font-size: 60rpx;
		line-height: 62rpx;
		padding-top: 0;
	}
	.referencePrice{
		padding-bottom: 6rpx;
		font-size: 28rpx;
		font-weight: 400;
		line-height: 1;
		color: #7E8385;
	}
	.referencePrice text{
		color: #1F0D33;
	}
	.priceHint{
		color: #7E8385;
		margin-top: 18rpx;
		font-size: 24rpx;
	}
	.goodsName{
		font-size: 28rpx;
		font-weight: 700;
		padding-right: 24rpx;
		line-height: 46rpx;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
	}
	.goodsName text{
		vertical-align: middle;
	}
	.goodsName .cusHint{
		display: inline-block;
		width: 88rpx;
		height: 28rpx;
		line-height: 28rpx;
		text-align: center;
		color: #FFFFFF;
		/* background-color: #E4CCFF; */
		/* color: #7A32CC; */
		background: linear-gradient(313deg, #A114E6 0%, #BF5DFF 100%);
		border-radius:4rpx;
		margin-right: 12rpx;
		font-size: 20rpx;
		font-weight: 400;
	}
	.cusTag{
		display: inline-block;
		width: auto;
		height: 28rpx;
		line-height: 24rpx;
		text-align: center;
		padding: 0 4rpx;
		color: #FA4C7B;
		border: 1rpx solid #DC416B;
		border-radius:4rpx;
		margin-right: 12rpx;
		font-size: 20rpx;
		font-weight: 400;
	}
	.shareBtn{
		position: absolute;
		right: 40rpx;
		top: 80rpx;
		font-weight: 400;
		font-size: 20rpx;
		text-align: center;
	}
	
	.shareBtn image{
		width: 40rpx;
		height: 40rpx;
	}
	.retailPrice{
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		color: #666666;
		font-size: 22rpx;
		margin: 20rpx 0;
	}
	.retailPrice text{
		margin-right: 12rpx;
		font-size: 20rpx;
	}
	.memberPrice{
		display: inline-block;
		border-radius: 4px;
		padding-right: 8rpx;
		height: 70rpx;
		color: #FF1558;
		font-size: 30rpx;
		
	}
	.memberName{
		width: auto;
		padding: 0 4rpx;
		height: 25rpx;
		line-height: 25rpx;
		display: inline-block;
		vertical-align: top;
		margin-right: 8rpx;
		margin-left: 10rpx;
		position: relative;
		border-radius: 4rpx;
		font-size: 18rpx;
		color: #FFFFFF;
		margin-top: 42rpx;
	}
	.memberName text{
		z-index: 10;
		position: relative;
	}
	.memberArrowIcon{
		width: 0;
		height: 0;
		position: absolute;
		border: 16px solid rgba(0,0,0,0);
		border-left: 26px solid transparent;
		left: -18rpx;
		top: 0;
		z-index: 0;
	}
	.memberPriceNum{
		font-weight: 700;
		font-size: 60rpx;
		margin-left: 8rpx;
	}
</style>
