<template>
	<view class="pages commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="storeInfo">
			<view class="storeTitle">
				{{storeInfo.storeName}}
			</view>
			<view class="storeText">
				<view>
					文器库网店经营者营业执照
				</view>
				<view>
					根据国家工商总局《网络交易管理办法》要求对网店营业执照信息公示如下：
				</view>
				<view>
					<image :src="imgBaseUrls+storeInfo.imageUrl" mode="widthFix"></image>
				</view>
				<view class="hint">
					注:以上营业执照信息来源于卖家自行中报及工商系统数据,具体以工商部经营者需俑保信息真实有效,平台也将定期核查。如与实际不符，为避免违规，请联系当地工商部门或平台客服更新。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				storeInfo:{
					
				},
				imgBaseUrls:"",
				defaultTitleDto:{
					title:'营业执照',
				}
			}
		},
		methods:{
			
		},
		onShow() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.storeInfo = JSON.parse(uni.getStorageSync("storeLicence"));
			this.zhuge.track("营业执照-落地页",{
				"店铺名称":this.storeInfo.storeName
			})
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		height: 100vh;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	
	.storeInfo{
		width: 100%;
		padding: 0 30rpx;
	}
	
	.storeTitle{
		width: 100%;
		font-weight: 700;
		color: #000000;
		line-height: 68rpx;
		margin-top: 30rpx;
		font-size: 48rpx;
	}
	
	.storeText{
		margin-top: 24rpx;
		color: #333333;
	}
	
	.storeText image{
		width: 100%;
	}
	
	.hint{
		margin-top: 24rpx;
		font-size: 20rpx;
		line-height: 38rpx;
		color: #999999;
	}
</style>
