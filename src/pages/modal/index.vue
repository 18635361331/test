<template>
	<view class="page">
		<!-- 展示邀请奖励 -->
		<uni-popup ref="invitePopup" :mask-click="false" type="center">
			<view class="heardTitle">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/newUserCouponTitleImage.png" mode=""></image>
			</view>
			<view class="inviteBox">
				<view class="invite_title">
					<text class="colour"></text> <text>邀新奖励</text> <text class="colour"></text>
				</view>
				<view class="list">
					<view class="user" v-if="inviteInfo && index<6" v-for="item,index in inviteInfo.newMemberList" :key='index'>
						<headImg class="userInfoHeadImage" :head="item.smallIcon"></headImg>
					</view>
				</view>
				<text class="block det" v-if="inviteInfo"><text>{{inviteInfo.newMemberList && inviteInfo.newMemberList.length}}</text>位好友已{{modalType==1?"完成新人首单":"被邀请开通省钱月卡"}}</text>
				<text class="block remark">感谢推荐，送您奖励：</text>
				<view class="coupon">
					<text class="termValidity">有效期：{{couponInfo.validType==1?("领取后"+couponInfo.validDays+"天内有效"):($utils.formatDate(couponInfo.validStartTime,"yyyy.MM.dd")+"-"+$utils.formatDate(couponInfo.validEndTime,"yyyy.MM.dd"))}} </text>
					<text class="couponType">{{couponInfo.condValue==0?"无门槛优惠券":"满"+couponInfo.condValue+"元使用"}}</text>
					<view class="couponPrice"><text>¥</text>{{couponInfo.discountValue}}</view>
				</view>
				<view class="btn" @click="closePopup()">收下</view>
			</view>
			<view class="look">
				<text @click="goCoupon()">查看我的优惠券</text>
			</view>
			<view class="close" @click="closePopup()"></view>
		</uni-popup>
		<!-- 展示即将过期优惠券 -->
		<uni-popup ref="couponPopup" :mask-click="false" type="center">
			<view class="newUserCoupon">
				<view class="getTitle">
					您即将失去以下优惠券
				</view>
				<view class="getText">
					还有1天失效
				</view>
			</view>
			<view class="newUserCouponContent">
				<scroll-view scroll-y="true" class="couponScroll">
					<view class="everyCoupon" v-if="newUserTimeCoupon && newUserTimeCoupon.length" v-for="item,index in newUserTimeCoupon" :key='index'>
						<view class="couponPrice">
							<view class="couponMonety">
								<text>¥</text>{{item.discountValue}}
							</view>
							<view class="couponReduction">
								{{item.condValue==0?"无门槛":"满"+item.condValue+"元使用"}}
							</view>
						</view>
						<view class="couponText">
							<view class="couponName">{{item.name}}</view>
							<view class="couponTime">
								{{$utils.formatDate(item.startTime,"yyyy.MM.dd")+"-"+$utils.formatDate(item.endTime,"yyyy.MM.dd")}}
							</view>
							<view class="couponMJ">{{item.limitType==3?'全场通用':'部分商品可用'}}</view>
						</view>
					</view>
				</scroll-view>
				<view class="getBtn" @click="goToHome">
					去使用
				</view>
				<view class="look couponContent">
					<text  @click="goCoupon()">查看我的优惠券</text>
				</view>
				<view class="closeBtn" @click="closeNewUserPopup"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import headImg	from  '@/common/model/head.vue'
	import promotionApi from '@/api/promotion/index.js'
	export default {
		data() {
			return {
				inviteInfo:"",	//邀新奖励/邀请开通省钱卡
				newUserTimeCoupon:"",	//即将失去
				couponInfo:"",	//优惠券信息
				imgBaseUrls:"",
				modalType:1,	//1 邀新奖励   2 邀请开通省钱卡
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.getPopupType();
		},
		methods:{
			closePopup(){
				this.$refs.invitePopup.close();
				this.getPopupType()
			},
			closeNewUserPopup(){
				this.$refs.couponPopup.close();
				this.getPopupType()
			},
			getPopupType(){	//获取展示弹窗类型
				if(uni.getStorageSync("newUserInvite")){ //邀新奖励
					this.inviteInfo = JSON.parse(uni.getStorageSync("newUserInvite"))
					uni.removeStorageSync("newUserInvite");
					this.userImage()
					this.modalType = 1
					this.$nextTick(()=>{
						this.$refs.invitePopup.open();
					})
				}else if(uni.getStorageSync("newUserTimeCoupon")){	//即将过期
					this.newUserTimeCoupon = JSON.parse(uni.getStorageSync("newUserTimeCoupon"));
					uni.removeStorageSync("newUserTimeCoupon");
					this.$nextTick(()=>{
						this.$refs.couponPopup.open();
					})
				}else if(uni.getStorageSync("newCouponCardInvite")){	//省钱卡
					this.inviteInfo = JSON.parse(uni.getStorageSync("newCouponCardInvite"));
					uni.removeStorageSync("newCouponCardInvite");
					this.userImage()
					this.modalType = 2
					this.$nextTick(()=>{
						this.$refs.invitePopup.open();
					})
				}else{
					this.goBack(1);
				}
			},
			userImage(){
				if(this.inviteInfo.newMemberList.length>=5){
					let img = {
						smallIcon:this.$config.imgBaseUrl + 'appletsImages/inviteUserDot.png'
					}
					this.inviteInfo.newMemberList.splice(4,0,img)
				}
				this.getDecorateCoupons([this.inviteInfo.newMemberReward.couponId])
			},
			getDecorateCoupons(params){	//根据id获取优惠券信息
				promotionApi.getDecorateCoupons(params).then(res=>{
					if(res.data.code==200){
						this.couponInfo = res.data.data[0];
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToHome(){
				this.$refs.couponPopup.close();
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			goCoupon(){
				this.$refs.invitePopup.close();
				this.$refs.couponPopup.close();
				this.$Router.replace({
					path:"/pages/coupon/index"
				})
			}
		},
		components:{
			headImg
		}
	}
</script>

<style scoped lang="scss">
	.inviteBox {
		width: 690rpx;
		height: 690rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 40rpx 20rpx;
	}
	.heardTitle{
		width: 672rpx;
		height: 160rpx;
		position: relative;
		margin: 0 auto;
	}
	.heardTitle image{
		position: absolute;
		top: 30rpx;
	}
	.invite_title {
		text-align: center;

		text {
			display: inline-block;
			vertical-align: middle;
		}

		text:nth-child(1) {
			transform: rotate(180deg);
		}

		text:nth-child(2) {
			font-size: 32rpx;
			font-weight: 500;
			color: #333;
			margin: 0 30rpx;

			&::after {
				content: '';
				display: block;
				width: 128rpx;
				height: 20rpx;
				background: linear-gradient(270deg, rgba(240, 34, 71, 0.1) 0%, #F83D64 50%, #FD6458 100%);
				border-radius: 10rpx;
				margin-top: -16rpx;
			}
		}

		.colour {
			// inviteStreamers
			background-image: url($img-oss+'inviteIcon.png');
			width: 64rpx;
			height: 26rpx;
			background-size: contain;
		}
	}

	.block {
		display: block;
		text-align: center;
	}
	
	.list{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 23rpx;
		.user{
			width: 94rpx;
			height: 94rpx;
			border: 2px solid #fff;
			border-radius: 50%;
			overflow: hidden;
			&:not(:last-child){
				margin-right: 16rpx;
			}
			.userInfoHeadImage{
				display: inline-block;
			}
		}
	}
	.det{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 20rpx;
		text{
			color: #FE325C;
			margin-right: 10rpx;
		}
	}
	
	.look{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin: 32rpx 0 62rpx;
		text-align: center;
			text{
				display: inline-block;
				&::after {
					content: '';
					display: block;
					width: 100%;
					height: 1px;
					margin-top: 8rpx;
					background: #fff;
				}
			
		}
	}
	.couponContent.look{
		position: absolute;
		bottom: -130rpx;
		left: 0;
		right: 0;
	}
	.remark {
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
		margin: 30rpx 0 20rpx;
	}

	.btn {
		width: 100%;
		height: 88rpx;
		background: #FE325C;
		border-radius: 44rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 88rpx;
		margin-top: 30rpx;
	}

	.coupon {
		width: 100%;
		height: 164rpx;
		background-image: url($img-oss+'newUserCoupon.png');
		background-size: 100% 100%;
		margin: 6rpx auto 0;
		position: relative;

		.termValidity {
			position: absolute;
			bottom: 20rpx;
			left: 20rpx;
			color: #875C3F;
			font-size: 20rpx;
		}

		.couponType {
			position: absolute;
			left: 185rpx;
			top: 40rpx;
			color: #42342D;
			font-size: 32rpx;
			font-weight: 700;
		}

		.couponPrice {
			position: absolute;
			left: 30rpx;
			bottom: 66rpx;
			font-size: 80rpx;
			height: 80rpx;
			color: #F42041;
			vertical-align: bottom;
			font-weight: 700;

			text {
				font-size: 32rpx;
				font-weight: 600;
				margin-right: 10rpx;
			}
		}
	}

	.close {
		width: 60rpx;
		height: 60rpx;
		margin: auto;
		right: 0;
		background-image: url($img-oss+'11_close.png');
		background-size: 100%;

	}
	
	
	
	.newUserCoupon{
		width: 690rpx;
		height: 200rpx;
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/newUserTopTitle.png") no-repeat;
		background-size: 100% 100%;
		text-align: center;
	}
	.newUserCouponContent{
		width: 690rpx;
		max-height: 720rpx;
		background: linear-gradient(180deg, #F66A74 0%, #EC5764 100%);
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		font-size: 32rpx;
		position: relative;
		padding-bottom: 20rpx;
	}
	.getTitle{
		padding-top: 60rpx;
		color: #E42040;
	}
	.getText{
		padding-top: 10rpx;
	}
	.getBtn{
		width: 650rpx;
		height: 88rpx;
		background: linear-gradient(132deg, #FFC9A8 0%, #F5CC8D 45%, #F7B45D 100%);
		border-radius: 44rpx;
		color: black;
		text-align: center;
		line-height: 88rpx;
		margin: 0 auto;
	}
	.closeBtn{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		bottom: -160rpx;
		left: 0;
		margin: auto;
		right: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/11_close.png) no-repeat;
		background-size: 100%;
	}
	.couponScroll{
		max-height: 596rpx;
	}
	.everyCoupon{
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/newUserCancel.png") no-repeat;
		width: 650rpx;
		height: 178rpx;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-bottom: 20rpx;
		display: flex;
		padding-top: 36rpx;
	}
	.couponPrice{
		width: 250rpx;
		position: relative;
	}
	.couponMonety{
		color: #E42040;
		font-size: 80rpx;
		position: absolute;
		left: 60rpx;
		top: -20rpx;
	}
	.couponMonety text{
		font-size: 32rpx;
	}
	.couponReduction{
		font-size: 18rpx;
		color: #875C3F;
		position: absolute;
		bottom: 36rpx;
		left: 60rpx;
	}
	.couponName{
		color: #886956;
	}
	.couponTime{
		font-size: 18rpx;
		color: #875C3F;
	}
	.couponMJ{
		color: #875C3F;
		font-size: 18rpx;
		margin-top: 10rpx;
	}
</style>
