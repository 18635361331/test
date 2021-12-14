<template>
	<view class="page">
		<view class="memberPriceBox" v-if="((memberInfo.plusFlag==4 && params.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))">
			<view class="memberPrice">
				<view>
					¥<text class="memberPriceNum" v-if="getMemberPrice()">{{getMemberPrice()}}</text>
				</view>
				<view class="memberType" :style="{color:memberIconConfig.color,borderColor:memberIconConfig.color}">
					<view class="arrowIcon" :style="{background:memberIconConfig.color}">
						<view class="arrowNewIcon"></view>
					</view>
					<view class="arrowIconNew"></view>
					<text>{{memberInfo.memberTypeName}}价</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vipConfig from '@/common/js/vipConfig.js'
	export default{
		props:['params'],
		data() {
			return {
				memberIconConfig:{},
				memberInfo:{}
			}
		},
		methods:{
			getMemberPrice(){	//会员价格
				if(this.params.singlePromotionType>50){
					return this.params.minPrice || this.params.sellingPrice
				}
				if(this.memberInfo.plusFlag==4){
					try{
						for(let i = 0;i<this.params.distributorMinPriceList.length;i++){
							if(this.params.distributorMinPriceList[i].type==this.memberInfo.distributorType){
								if(this.params.distributorMinPriceList[i].minPrice!=this.params.distributorMinPriceList[i].maxPrice){
									return this.params.distributorMinPriceList[i].minPrice +"~"+ this.params.distributorMinPriceList[i].maxPrice
								}else{
									return this.params.distributorMinPriceList[i].minPrice
								}
							}
						}
						
					}catch(e){
						return this.params.minPrice?this.params.minPrice:this.params.sellingPrice
					}
				}else if(this.memberInfo.plusFlag && this.memberInfo.plusFlag!=4){
					try{
						for(let i = 0;i<this.params.newtypeMinPriceList.length;i++){
							if(this.params.newtypeMinPriceList[i].type==this.memberInfo.plusFlag){
								if(this.params.newtypeMinPriceList[i].minPrice!=this.params.newtypeMinPriceList[i].maxPrice && this.params.customizeFlag){
									return this.params.newtypeMinPriceList[i].minPrice +"~"+ this.params.newtypeMinPriceList[i].maxPrice
								}else{
									return this.params.newtypeMinPriceList[i].minPrice
								}
							}
						}
					}catch(e){
						return this.params.minPrice?this.params.minPrice:this.params.sellingPrice
					}
				}else{
					return false
				}
			}
		},
		async mounted() {
			this.memberIconConfig = await vipConfig.getUserVip();
			let partner = await vipConfig.getPartner();
			this.memberInfo = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{};
			if(this.memberInfo.plusFlag==4){
				for(let i = 0;i<partner.length;i++){
					if(partner[i].id = this.memberInfo.distributorTypeId){
						this.memberIconConfig = partner[i]
					}
				}
			}
		}
	}
</script>

<style scoped>
	.memberPriceBox{
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		margin-top: 24rpx;
	}
	.memberPrice{
		width: auto;
		padding-right: 8rpx;
		color: #FF1558;
		font-size: 20rpx;
	}
	
	.memberPriceNum{
		font-weight: 700;
		font-size: 32rpx;
	}
	.memberType{
		width: auto;
		height: 26rpx;
		padding: 0 4rpx;
		line-height: 26rpx;
		color: #FFFFFF;
		font-size: 18rpx;
		position: relative;
		display: inline;
		border: 1rpx solid transparent;
		border-radius: 4rpx;
	}
	.memberType text{
		position: relative;
	}
	.arrowIcon{
		position: absolute;
		left: 10rpx;
		width: 10rpx;
		height: 20rpx;
		transform: rotate(60deg);
		margin: auto;
		top: -8rpx;
	}
	.arrowIconNew{
		position: absolute;
		top: 0rpx;
		left: 2rpx;
		background-color: #FFFFFF;
		width: 30rpx;
		height: 10rpx;
	}
	.arrowNewIcon{
		position: absolute;
		width: 8rpx;
		height: 18rpx;
		background-color: #FFFFFF;
		left: 1rpx;
		top: 1rpx;
	}
</style>
