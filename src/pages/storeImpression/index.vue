<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		
		<view class="storeMain">
			<view class="shopInfo">
				<view class="shopImage" :style="{backgroundImage:'url('+imgBaseUrls+merchantInfo.images+')'}"></view>
				<view class="shopName">
					<view class="shopNameTitle">
						{{merchantInfo.storeName?merchantInfo.storeName:""}}
					</view>
					<view class="shopNameSpeople">
						{{merchantInfo.focusCount?merchantInfo.focusCount:"0"}}人关注
					</view>
				</view>
			</view>
			<view class="storeInfo">
				<view class="storeTitle">
					基础信息
				</view>
				<view class="infoText">
					<text>商家电话</text>
					<text>{{basicInfo.telephone?basicInfo.telephone:""}}</text>
				</view>
				<view class="infoText" @click='goToShopCode'>
					<text>营业执照</text>
					<view><image class="business" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/szz2.png" mode=""></image></view>
				</view>
				<view class="infoText">
					<text>所在地区</text>
					<text>{{basicInfo.licenseLocation?basicInfo.licenseLocation:""}}</text>
				</view>
				<view class="infoText">
					<text>开店时间</text>
					<text>{{$utils.formatDate(basicInfo.establishTime,"yyyy-MM-dd")}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import merchantApi from '@/api/merchant/index.js'
	export default {
		data() {
			return {
				merchantInfo: { //店铺基本信息

				},
				basicInfo:{
					
				},
				imgBaseUrls: "",
				defaultTitleDto:{
					title:'店铺印象',
					bg:'page_write@2x.png',
					color:'white'
				}
			}
		},
		methods: {
			selectMerchantFollowDetailsList() {
				merchantApi.selectMerchantFollowDetailsList(this.$Route.query.storeId).then(res => {
					if (res.data.code == 200) {
						this.merchantInfo = res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			merchantBasicInfo(){	//店铺印象信息
				merchantApi.merchantBasicInfo(this.$Route.query.storeId).then(res=>{
					if(res.data.code==200){
						this.basicInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToShopCode(){
				this.$Router.push({
					path:"/pages/shopCode/index",
					query:{
						storeId:this.$Route.query.storeId
					}
				})
			}
		},
		onShow() {
			this.zhuge.track("店铺印象-落地页",{
				"店铺id":this.$Route.query.storeId
			})
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.selectMerchantFollowDetailsList();
			this.merchantBasicInfo()
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		height: 100vh;
		background-color: #F5F5F5;
	}
	.storeMain {
		padding: 0 30rpx;
		width: 100%;
		padding-top: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/shop_bg.png) 50%;
		height: 500rpx;
		position: relative;
		padding-top: 40rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 120rpx;
		/* #endif */
	}

	.shopInfo {
		width: 100%;
		height: 192rpx;
		padding: 36rpx;
		border-radius: 6rpx;
		background-color: #FFFFFF;
		display: flex;
	}
	.shopImage{
		width: 100rpx;
		height: 100rpx;
		background-position: 50%;
		background-size: cover;
	}
	.shopName{
		flex:1;
		margin: 0 36rpx;
		height: 100rpx;
	}
	.business{
		width: 44rpx;
		height: 44rpx;
		vertical-align: middle;
	}
	.shopNameTitle{
		font-size: 36rpx;
		color: #000000;
		margin-top: 8rpx;
		height: 44rpx;
		font-weight: 700;
	}
	.shopNameSpeople{
		margin-top: 10rpx;
	}
	.storeInfo{
		width:100%;
		margin-top:6rpx;
		padding: 36rpx;
		background-color: #FFFFFF;
		border-radius: 6rpx;
	}
	.storeTitle{
		font-weight: 700;
		line-height: 44rpx;
	}
	.infoText{
		display: flex;
		justify-content: space-between;
		height: 88rpx;
		line-height: 88rpx;
		color: #666666;
	}
</style>
