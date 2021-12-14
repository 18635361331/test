<template>
	<view class="page">
		<view class="membrGiftTitle">
			填写企业信息
		</view>
		<view class="memberGiftView">
			<view class="everyRow">
				<view><text class="importantHint">*</text>公司名称</view>
				<input type="text" maxlength="20" @input='enterpriseInfoChange' v-model="enterpriseInfo.companyName" placeholder="输入公司名称" placeholder-style="color:#ccc" />
			</view>
			<view class="everyRow">
				<view><text class="importantHint">*</text>经营地址</view>
				<text class="rowText ellipsis-one" :class='selectAddressParams.provinceId?"active":""' @click="openMemberAddress">{{selectAddressParams.provinceId?selectAddressParams.provinceName+selectAddressParams.cityName+selectAddressParams.districtName+(selectAddressParams.townName?selectAddressParams.townName:""):"省/市/区"}}</text>
			</view>
			<view class="everyRow">
				<view><text class="importantHint"></text>详细地址</view>
				<input type="text" @input='enterpriseInfoChange' v-model="enterpriseInfo.detailAddress" placeholder="输入详细地址" placeholder-style="color:#ccc" />
			</view>
			<view class="everyRow addImages">
				<view><text class="importantHint">*</text>营业执照</view>
				<view class="evaluateImage">
					<view class="imageList" v-if="enterpriseInfo.licenseInfo">
						<image :src="imgBaseUrls+enterpriseInfo.licenseInfo" mode="aspectFill"></image>
						<view class="removeImgBtn" @click="enterpriseInfo.licenseInfo=''"></view>
					</view>
					<view class="updateImg" v-if="!enterpriseInfo.licenseInfo" @click="chooseimage()">
						<text>添加照片</text>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="memberPopup" type="bottom">
			<view class="addressList">
				<selectAddress :defaultAddress='selectAddressParams' @addressChange='addressChange'></selectAddress>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import selectAddress from '@/common/model/selectAddress.vue';
	import uniUploadImage from '@/common/js/uniUploadImage.js'
	export default {
		mixins:[uniUploadImage],
		props:["selectAddressParams","enterpriseInfo"],
		data(){
			return{
				addressFlag:false,
				imgBaseUrls:""
			}
		},
		methods:{
			addressChange(params) {	//选择地址成功后
				this.$emit("addressChange", params);
				this.$refs.memberPopup.close()
			},
			openMemberAddress(){	//打开企业会员弹窗
				this.$refs.memberPopup.open()
			},
			chooseimage(){	//上传图片
				uni.chooseImage({
					count:1,
					success:(res)=>{
						this.uploadImage(res.tempFiles[0].path,this.enterpriseInfo.licenseInfo)
					}
				})
			},
			updateImage(uploadFileRes,params){	//上传图片成功后
				this.enterpriseInfo.licenseInfo = uploadFileRes.data;
				this.enterpriseInfoChange()
			},
			enterpriseInfoChange(){
				this.$emit("enterpriseInfoChange",this.enterpriseInfo)
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		components:{
			selectAddress
		},
	}
</script>

<style scoped>
	.membrGiftTitle {
		width: 100%;
		font-size: 40rpx;
		padding: 20rpx 30rpx;
		margin-top: 64rpx;
	}
	.memberGiftView{
		padding: 10rpx 40rpx 40rpx ;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		width: calc(100% - 60rpx);
		margin: 0 auto;
	}
	.everyRow{
		display: flex;
		min-height: 100rpx;
		border-bottom: 1rpx solid #F5F5F5;
		align-items: center;
		justify-content: space-between;
	}
	.addImages{
		align-items: flex-start;
		padding-top: 20rpx;
	}
	.everyRow input{
		text-align: right;
	}
	.rowText{
		color: #cccccc;
		text-align: right;
		width: calc(100% - 200rpx);
	}
	.rowText.active{
		color: #000
	}
	.addressList{
		height: 554rpx;
	}
	.evaluateImage {
		display: flex;
		flex-wrap: wrap;
	}
	.importantHint{
		display: inline-block;
		width: 16rpx;
		color: #FF1558;
		margin-right: 4rpx;
	}
	.updateImg {
		width: 162rpx;
		height: 162rpx;
		margin-left: 24rpx;
		margin-bottom: 24rpx;
		border: 1px dashed #DFDFDF;
		border-radius: 8rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_pic.png) no-repeat;
		background-position: 55rpx 30rpx;
		background-size: 52rpx 46rpx;
		position: relative;
	}
	
	.updateImg text {
		position: absolute;
		top: 98rpx;
		width: 100%;
		text-align: center;
		color: #B2B2B2;
	}
	
	.imageList {
		position: relative;
		width: 162rpx;
		height: 162rpx;
		margin-left: 24rpx;
		margin-bottom: 24rpx;
		border-radius: 8rpx;
		overflow: hidden;
	}
	
	.removeImgBtn {
		position: absolute;
		top: 0;
		right: 0;
		width: 30rpx;
		height: 30rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_close.png) no-repeat 50%;
		background-size: 30rpx 30rpx;
	}
	
</style>
