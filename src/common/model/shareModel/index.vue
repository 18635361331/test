<template>
	<view>
		<uni-popup ref="sharePopup" class="uniShare" type="bottom">
			<view class="shareParent">
				<view class="shareImage" @click="previewImage()">
					<view class="closeBtn" @click.stop="closeSharePopip()"></view>
					<image :src="shareImage"></image>
					<view class="saveBtn" @click.stop="previewDownLoad()">
						保存至手机
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import downAndPreview from '@/common/js/downloadAndPreview.js'
	export default {
		mixins:[downAndPreview],
		props:["shareImage"],
		data() {
			return {
				imgBaseUrls: ""
			}
		},
		methods: {
			openSharePopup() { //打开邀请弹窗
				this.$refs.sharePopup.open()
			},
			closeSharePopip() { //关闭邀请弹窗
				this.$refs.sharePopup.close()
			},
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl
		}
	}
</script>

<style scoped lang="scss">
	.shareParent {
		width: 100%;
		height: 100vh;
		position: relative;
		background-color: rgba(255, 255, 255, 0.6);
	}

	.shareImage {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin: auto;
	}

	.shareImage image {
		width: 530rpx;
		height: 720rpx;
	}

	.saveBtn {
		width: 305rpx;
		height: 78rpx;
		color: #fff;
		background-color: #c78e57;
		margin: 0 auto;
		margin-top: 40rpx;
		border-radius: 24px;
		text-align: center;
		line-height: 78rpx;
	}

	.closeBtn {
		width: 100%;
		height: 60rpx;
		background: url(https://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2%402x.png) no-repeat;
		background-size: 60rpx 60rpx;
		background-position-x: right;
		margin-bottom: 20rpx;
	}
</style>
