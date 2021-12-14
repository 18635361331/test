<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto='defaultTitleDto' class="defaultTitleInterCode"></defaultTitle>
		<view class="shareImage">
			<image :src="shareImage" @click="previewImage" mode="widthFix"></image>
		</view>
		<view class="shareMemberBtn">
			<view class="saveBtn btn" @click="getDownLoadScope">
				生成分享海报
			</view>
			<view class="shareBtn btn">
				分享好友
				<button type="default" class="shareButton" open-type="share"></button>
			</view>
		</view>
	</view>
</template>

<script>
	import downloadFile from '@/common/js/downloadAndPreview.js';
	import appApi from '@/api/app/index.js';
	export default {
		mixins:[downloadFile],
		data() {
			return {
				defaultTitleDto: {
					title: '邀请会员',
				},
				wxShare:{
					title:"",
					path:""
				},
				imgBaseUrls:"",
				shareImage:""
			}
		},
		methods: {
			generateInviteMemberPoster() { //获取个人会员邀请码
				appApi.generateInviteMemberPoster().then(res => {
					if (res.data.code == 200) {
						this.shareImage = this.imgBaseUrls + res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
		},
		onShareAppMessage(res) { //发送给朋友
			let userName = JSON.parse(uni.getStorageSync("userInfo"))
			this.wxShare.title = "["+(userName.nickName?userName.nickName:userName.telephone)+"@你]快来成为文器库会员！！！"
			let shareNumber = uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):""
			this.wxShare.path = "/pages/memberGiftBag/index?shareNumber=" + shareNumber;
			console.log(shareNumber)
			return this.wxShare
		},
		onShow() {
			this.zhuge.track("邀请新会员-落地页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.generateInviteMemberPoster()
		}
	}
</script>
<style scoped>
	.commonPageTitle {
		min-height: 100vh;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		background-color: #FEF4E8;
		padding-bottom: 100rpx;
	}
	.shareImage{
		width: 100%;
		height: auto;
	}
	.shareMemberBtn{
		width: 100%;
		height: calc(constant(safe-area-inset-bottom) + 86rpx);
		height: calc(env(safe-area-inset-bottom) + 86rpx);
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.btn{
		width: 300rpx;
		height: 74rpx;
		position: relative;
		text-align: center;
		line-height: 74rpx;
		border-radius: 37rpx;
	}
	.shareBtn{
		background: linear-gradient(241deg, #E61446 0%, #FB5A8B 100%);
		color: #FFFFFF;
		
	}
	
	.saveBtn{
		border: 1rpx solid #666666;
		color: #666666;
	}
	.shareButton{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}
</style>
