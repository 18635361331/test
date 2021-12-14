<template>
	<view class="page">
		<view class="inviteNewBtn" v-if="newUserInfo" @click="openNewUserPopup">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/inviteNew.gif" mode=""></image>
		</view>
		<uni-popup ref="newUserPopup" type="center">
			<view class="userTopImage"></view>
			<view class="userPopupBg">
				<view class="inviteTitle">
					<view class="inviteIcon"></view>
					<view class="inviteText">
						<view class="inviteTop">
							邀新用户注册
						</view>
						<view class="inviteBtm">
							得无门槛优惠券
						</view>
					</view>
					<view class="inviteIcon inviteReversal"></view>
				</view>
				<view class="inviteHint">
					<view class="everyHint">
						<text></text>
						邀请未注册用户
					</view>
					<view class="everyHint">
						<text></text>
						用户首单交易完成
					</view>
					<view class="everyHint">
						<text></text>
						获得优惠券
					</view>
				</view>
				<view class="openSharePopup" @click="openSharePopup">
					立即邀请新用户
				</view>
				<view class="inviteHintText">
					邀新任务完成后，将送你：
				</view>
				<view class="coupon" :style="{backgroundImage:'url('+imgBaseUrls+couponInfo.couponBgImage+')'}">
					<view class="termValidity">
						有效期：{{couponInfo.validType==1?"领取后"+couponInfo.validDays+"天内有效":$utils.formatDate(couponInfo.validStartTime,"yyyy.MM.dd")+"-"+$utils.formatDate(couponInfo.validEndTime,"yyyy.MM.dd")}}
					</view>
					<view class="couponType">
						{{couponInfo.condValue==0?"无门槛":"满"+couponInfo.condValue+"元使用"}}
					</view>
					<view class="couponPrice">
						<text>¥</text>
						{{couponInfo.discountValue}}
					</view>
				</view>
				<view class="closeBtn newUserClose" @click="closeNewUserPopup"></view>
			</view>
		</uni-popup>
		<uni-popup ref="sharePopup" type="bottom">
			<view class="shareImageBox">
				<view class="shareParent" :class="isBtm?'active':''">
					<scroll-view scroll-y="true"  class="iamge">
						<image @click="previewImage" :src="shareImage" mode="widthFix"></image>
					</scroll-view>
					<view class="closeBtn" @click="closeSharePopup"></view>
				</view>
				<view class="operateBtn" :class="isBtm?'active':''">
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
	import promotionApi from '@/api/promotion/index.js'
	import downLoadAndPreview from '@/common/js/downloadAndPreview.js'
	import appApi from '@/api/app/index.js'
	export default {
		mixins:[downLoadAndPreview],
		props:['isBtm'],//当在我的页面等其他页面时  有底部tab  避免遮挡
		data(){
			return{
				shareImage:"https://oss.beifamall.com/promotion/goods/poster/8f8162f89eab51778f01192e556fcf17.png",
				couponInfo:"",
				imgBaseUrls:"",
				newUserInfo:"",	//新人专享活动信息
			}
		},
		methods:{
			openNewUserPopup(){	//打开邀新注册弹窗
				this.firstOrderRewardConfigInfo()
			},
			closeNewUserPopup(){	//关闭邀新注册弹窗
				this.$refs.newUserPopup.close()
			},
			openSharePopup(){	//打开分享海报弹窗
				if(uni.getStorageSync("sessionId")){
					this.closeNewUserPopup();
					this.generateInvitePoster()
				}else{
					uni.showToast({
						title:"请登录",
						icon:"none"
					})
					this.$refs.newUserPopup.close()
					this.$Router.push({
						path:"/pages/login/index"
					})
				}
			},
			closeSharePopup(){	//关闭分享海报弹窗
				this.$refs.sharePopup.close()
			},
			newPersonInfo(){	//新人专享活动信息
				appApi.newPersonInfo().then(res=>{
					if(res.data.code == 200){
						this.newUserInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			firstOrderRewardConfigInfo(){	//邀新注册的奖励配置信息
				promotionApi.firstOrderRewardConfigInfo().then(res=>{
					if(res.data.code==200){
						this.getDecorateCoupons([res.data.data.couponId],res.data.data.couponBgImage)
					}
				})
			},
			getDecorateCoupons(couponId,couponBgImage){	//根据id获取优惠券信息
				promotionApi.getDecorateCoupons(couponId).then(res=>{
					if(res.data.code==200){
						res.data.data[0].couponBgImage = couponBgImage
						this.couponInfo = res.data.data[0];
						this.$refs.newUserPopup.open()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			generateInvitePoster(){	//邀新注册生成海报图片
				promotionApi.generateInvitePoster().then(res=>{
					if(res.data.code==200){
						this.shareImage = this.imgBaseUrls+res.data.data;
						this.$refs.sharePopup.open();
					}
				})
			}
		},
		mounted() {
			this.newPersonInfo()
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.inviteNewBtn{
		position: fixed;
		bottom: 160rpx;
		right: 20rpx;
		width: 88rpx;
		height: 88rpx;
		z-index: 10;
	}
	.userTopImage{
		width: 690rpx;
		height: 30rpx;
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/newUserBlock.png") no-repeat;
		background-size: 690rpx 30rpx;
	}
	.userPopupBg{
		width: 690rpx;
		height: 576rpx;
		background-color: #FFF5F4;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		padding-top: 38rpx;
		position: relative;
		margin-top: -2rpx;
	}
	.inviteTitle{
		width: 500rpx;
		height: 103rpx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.inviteIcon{
		width: 64rpx;
		height: 26rpx;
		background: url('http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/inviteIcon.png') no-repeat;
		background-size: 100%;
	}
	.inviteReversal{
		transform:rotate(180deg);
	}
	.inviteText{
		width: 280rpx;
		margin: 0 36rpx;
		text-align: center;
	}
	.inviteTop{
		font-size: 32rpx;
		font-weight: 700;
	}
	.inviteBtm{
		font-size: 40rpx;
		font-weight: 700;
	}
	.inviteHint{
		width: 600rpx;
		height: 34rpx;
		display: flex;
		margin: 30rpx auto 44rpx;
		justify-content: space-between;
	}
	.everyHint{
		display: flex;
		font-size: 24rpx;
		color: #7D301C;
		align-items: center;
	}
	.everyHint text{
		display: inline-block;
		width: 10rpx;
		height: 20rpx;
		border-radius: 5px;
		background: linear-gradient(180deg, #FFDEBA 0%, rgba(255, 108, 99, 0.44) 100%);
		margin-right: 10rpx;
	}
	.openSharePopup{
		width: 570rpx;
		height: 88rpx;
		background: linear-gradient(124deg, #F20003 0%, #FE2C00 44%, #FF7F00 100%);
		border-radius: 44rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 88rpx;
		margin: 0 auto;
		font-weight: 700;
		margin-bottom: 40rpx;
	}
	.inviteHintText{
		width: 590rpx;
		font-size: 24rpx;
		color: #7D301C;
		margin: 0 auto;
	}
	.coupon{
		width: 590rpx;
		height: 144rpx;
		background-size: 100% 100%;
		margin: 6rpx auto 0;
		position: relative;
	}
	.termValidity{
		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
		color: #875C3F;
		font-size: 20rpx;
	}
	.couponType{
		position: absolute;
		left: 185rpx;
		top: 30rpx;
		color: #42342D;
		font-size: 32rpx;
		font-weight: 700;
	}
	.couponPrice{
		position: absolute;
		left: 30rpx;
		bottom: 66rpx;
		font-size: 80rpx;
		height: 80rpx;
		color: #F42041;
		vertical-align: bottom;
		font-weight: 700;
	}
	.couponPrice text{
		font-size: 32rpx;
		font-weight: 600;
		margin-right: 10rpx;
	}
	.closeBtn{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		bottom: -90rpx;
		left: 0;
		margin: auto;
		right: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/11_close.png) no-repeat;
		background-size: 100%;
	}
	.newUserClose{
		bottom: -88rpx;
	}
	.shareImageBox{
		width: 100%;
		height: 100vh;
		padding-top: 30rpx;
	}
	
	.shareParent{
		width: calc(100vw - 40rpx);
		height: calc(100vh - 340rpx);
		margin: 0 auto;
		position: relative;
	}
	.shareParent.active{
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 428rpx);
		/* #endif */
	}
	.shareParent .iamge{
		width: 100%;
		height: 100%;
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
	.operateBtn.active{
		/* #ifndef MP-WEIXIN */
		bottom: 88rpx;
		/* #endif */
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
