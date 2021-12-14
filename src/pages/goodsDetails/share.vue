<template>
	<view class="pages">
		<uni-popup ref="popup" type="bottom">
			<view class="shareBox fixedPosition">
				<view class="shareImage">
					 <swiper class="swiper" previous-margin='120rpx' @change='currentChange' next-margin='120rpx'>
						<swiper-item class="swiperItem" @click='previewImage'>
							<image class="swiperItemImage" :src="imgBaseUrls+shareImageList" mode="aspectFit"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="shareBtn">
					<view class="shareBtnTitle">
						<view>分享商品
						</view><view class="closeBtn" @click="closeSharePopup"></view>
					</view>
					<view class="shareContent">
						<view class="shareContentBtn" @click="guideShareWx">
							<!-- #ifdef MP-WEIXIN -->
							<button type="default" class="shareButton" open-type="share"></button>
							<!-- #endif -->
							<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/shareIconWeixin.png" mode=""></image>
							<view class="shareText">
								微信分享
							</view>
						</view>
						<!-- #ifndef H5 -->
						<view class="shareContentBtn" @click="previewDownLoad">
							<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/downLoadIcon.png" mode=""></image>
							<view class="shareText">
								保存本地
							</view>
						</view>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<view class="shareContentBtn">
							<a class='downLoadBtn' :href="imgBaseUrls+shareImageList" download="aaa.png" target="_blank">
								<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/downLoadIcon.png" mode=""></image>
								<view class="shareText">
									保存本地
								</view>
							</a>
						</view>
						<!-- #endif-->
					</view>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<view class="guide" v-show="guide">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/guideShare.png" mode="aspectFit"></image>
				<view class="guide-cancel" @click="guide=false"></view>
			</view>
			<!-- #endif-->
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props:['shareImageList'],
		data(){
			return{
				imgBaseUrls:"",
				authorizeFlag:false,
				currentIndex:0,	//当前选中的下标
				// shareImageList:[{imageUrl:"js/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201127134905.jpg"}],  //分享图片
				isScopedFlag:false,	//是否第二次授权  如果再次授权不再弹出警告弹窗
				guide:false,// h5 分享引导
			}
		},
		methods:{
			closeSharePopup(){
				this.$refs.popup.close()
			},
			openSharePopup(){
				this.$refs.popup.open()
			},
			
			previewImage(){	//预览图片
				uni.downloadFile({
					url:this.imgBaseUrls+this.shareImageList,
					success:(res)=>{
						if(res.statusCode==200){
							uni.previewImage({
								urls:[res.tempFilePath],
								longPressActions: {
									itemList: ['发送给朋友', '保存图片', '收藏'],
									success: function(data) {
									},
									fail: function(err) {
									}
								}
							})
						}
					},
					fail:(err)=>{
					}
				})
				
			},
			currentChange(res){	//选中下标发生变化时触发
				this.currentIndex = res.detail.current
			},
			previewDownLoad(){	//点击下载前处理
				this.isScopedFlag = false;
				this.getDownLoadScope();
			},
			getDownLoadScope(){	//下载临时文件
				if(!this.authorizeFlag){
					uni.authorize({
						scope:"scope.writePhotosAlbum",
						success: (res) => {
							this.downloadFile()
						},
						fail: (err) => {
							if(!this.isScopedFlag){
								uni.showModal({
									title:"警告",
									content:"您点击了拒绝授权，将无法正常保存图片，点击确定重新获取授权",
									confirm:()=>{
										this.getDownLoadScope()
									},
									cancel:()=>{
										uni.showToast({
											title:"您点击了取消",
											icon:"none"
										})
									}
								})
							}
							this.isScopedFlag = true;
							
						}
					})
				}else{
					this.downloadFile()
				}
				
			},
			downloadFile(){
				uni.downloadFile({
					url:this.imgBaseUrls+this.shareImageList,
					success:(res)=>{
						if(res.statusCode==200){
							uni.saveImageToPhotosAlbum({
								filePath:res.tempFilePath,
								success:(data)=>{
									uni.showToast({
										title:"保存成功",
										icon:"none"
									})
								},
								fail:(err)=>{
									uni.showToast({										title:"您取消了保存",										icon:"none"									})
								}
							})
						}else{
							uni.showToast({
								title:"临时文件生成失败",
								icon:"none"
							})
						}
					}
				})
			},
			uniGetSetting(){
				let _this = this;
				uni.getSetting({
					success(res) {
						if(!res.authSetting['scope.writePhotosAlbum']){
							_this.authorizeFlag = false
						}else{
							_this.authorizeFlag = false
						}
					},
					fail(err) {
					}
				})
			},
			guideShareWx(){
				// #ifndef MP-WEIXIN
				this.guide = true
				// #endif
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl
			//#ifdef MP-WEIXIN
			this.uniGetSetting();
			//#endif
		}
	}
</script>

<style scoped>
	.shareBox{
		width: 100%;
		height: 100vh;
	}
	.shareImage{
		width: 100%;
		height: calc(100% - 360rpx);
	}
	.shareBtn{
		width: 100%;
		height: 360rpx;
		background-color: #FFFFFF;
		border-radius: 36rpx 36rpx 0 0;
	}
	.shareBtnTitle{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		height: 80rpx;
		border-bottom: 1rpx solid #E4E4E4;
	}
	.closeBtn{
		width: 30rpx;
		height: 30rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/search_back@2x.png) no-repeat 50%; 
		background-size: 30rpx;
	}
	.shareContent{
		display: flex;
		justify-content: space-around;
		text-align: center;
	}
	.shareContentBtn{
		width: 120rpx;
		padding-top: 70rpx;
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
	.shareContentBtn image{
		width: 100rpx;
		height: 100rpx;
	}
	.shareText{
		margin-top: 20rpx;
	}
	.swiper{
		height: 100%;
	}
	.swiperItem{
		width:100%;
		height: auto;
		padding:6rpx;
		text-align: center;
	}
	.swiperItemImage{
		/* width: calc(100% - 120rpx); */
	}
	.downLoadBtn{
		color: inherit;
		text-decoration: none;
	}
	.guide{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background: rgba(0,0,0,0.3);
	}
	.guide-cancel{
		width: 340rpx;
		height: 140rpX;
		position: absolute;
		left: 60rpx;
		bottom: 10rpx;
		z-index: 12;
	}
</style>
