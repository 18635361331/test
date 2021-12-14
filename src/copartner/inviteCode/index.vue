<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto='defaultTitleDto'></defaultTitle>
		<image :src="shareImage" mode="widthFix" class="shareImg"></image>
		<view class="btnGroup">
			<button class="postButton" @click="previewDownLoad">保存邀请海报</button>
			<button type="default" class="shareButton" open-type="share">分享微信好友</button>
		</view>
	</view>
</template>

<script>
	import downLoadAndPreview from '@/common/js/downloadAndPreview.js'
	import appApi from "@/api/app/index.js"
	export default {
		mixins:[downLoadAndPreview],
		data() {
			return {
				imgBaseUrls: "",
				shareNumber: "", //分享码
				defaultTitleDto: {
					title: '邀请合伙人',
				},
				shareImage:"",//邀请二维码
			}
		},
		onShareAppMessage() { //微信分享
			let userName = JSON.parse(uni.getStorageSync("userInfo"))
			return {
				title: "["+(userName.nickName?userName.nickName:userName.telephone)+"@你]快来成为文器库合伙人！！！",
				path: "/copartner/joinPartner/index?shareNumber=" + this.shareNumber ,
				imageUrl: "http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/sharePartner.png",
			}
		},
		methods: {
			generateInvitePoster() { //获取合伙人邀请码
				appApi.generateInvitePoster().then(res => {
					if (res.data.code == 200) {
						this.shareImage = this.$config.imgBaseUrl+res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
		},
		components:{
		},
		onShow() {
			this.zhuge.track("邀请合伙人-落地页")
			this.shareNumber = uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):""
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.generateInvitePoster()
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
	.shareImg{
		height: 100%;
		margin: 0 auto;
		display: block;
	}
	.btnGroup{
		width: 100%;
		position: fixed;
		bottom: 100rpx;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.btnGroup button{
		width: 330rpx;
		font-size: 28rpx;
		font-weight: 400;	
		border-radius: 36rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin: 0 20rpx;
	}
	
	.postButton{
		border: 1px solid #FE325C;
		color: #FE325C;
		background: #fff;
	}
	.shareButton{
		background: #FE325C;
		color: #FFFFFF;
	}
</style>
