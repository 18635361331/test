<template>
	<view class="page">
		<uni-popup ref="sharePopup" type="bottom">
			<view class="shareImageBox">
				<view class="shareParent">
					<view class="imageBox">
						<image @click="previewImage" :src="shareImage" mode="aspectFit"></image>
					</view>
					<view class="closeBtn" @click="closeSharePopup"></view>
				</view>
				<view class="operateBtn">
					<view class="shareBtn">
						<!-- #ifdef MP-WEIXIN -->
						<button type="default" class="shareButton" open-type="share"></button>
						<!-- #endif -->
						<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/shareWeixiIcon.png" mode=""></image>
						<view>
							分享给微信好友
						</view>
					</view>
					<view class="downLoad" @click.stop="previewDownLoad">
						<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/downLoadWeixinIcon.png" mode=""></image>
						<view>下载朋友圈海报</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import customerApi from '@/api/customer/index.js';
	import downLoadAndPreview from '@/common/js/downloadAndPreview.js'
	export default {
		mixins:[downLoadAndPreview],
		data(){
			return{
				shareImage:"https:/oss.beifamall.com/promotion/goods/poster/8f8162f89eab51778f01192e556fcf17.png",
			}
		},
		methods:{
			openSharePopup(){	//打开分享海报弹窗
				this.createQR()
			},
			closeSharePopup(){	//关闭分享海报弹窗
				this.$refs.sharePopup.close()
			},
			createQR(){	//邀新注册生成海报图片
				customerApi.createQR().then(res=>{
					if(res.data.code==200){
						this.shareImage = this.$config.imgBaseUrl+res.data.data.base64Image;
						this.$refs.sharePopup.open();
					}
				})
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.closeBtn{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		bottom: -20rpx;
		left: 0;
		margin: auto;
		right: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/11_close.png) no-repeat;
		background-size: 100%;
	}
	
	.shareImageBox{
		width: 100%;
		height: 100vh;
	}
	.shareParent{
		width: calc(100vw - 60rpx);
		height: calc(100vh - 320rpx);
		margin: 0 auto;
		position: relative;
	}
	.shareParent .imageBox{
		position: absolute;
		width: 100%;
		height: 80%;
		top: 10%;
		text-align: center;
	}
	.operateBtn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		color: #666666;
		text-align: center;
		padding-top: 30rpx;
	}
	.operateBtn image{
		width: 80rpx;
		height: 80rpx;
	}
	.shareBtn{
		margin-right: 120rpx;
		position: relative;
	}
	.shareButton{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		opacity: 0.01;
	}
</style>
