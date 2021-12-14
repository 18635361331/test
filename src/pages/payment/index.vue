<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="payMain">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group1111@2x.png" mode="widthFix"></image>
			<view>
				支付成功
			</view>
		</view>
		<view class="buySuccess" v-if="isNewType>50 && userInfo.plusFlag!=4">
			恭喜您已成为尊贵的文器库会员用户！
		</view>
		<!-- <view class="card" v-if="!source&&price&&!isNewType">
			<image class="tag" src="https://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_pay_tag.png" mode="widthFix"></image>
			开通省钱卡本单预估可省<text>{{price}}</text>元，<text @click="goToSavingCard">立即开卡</text>
			<view class="icon"></view>
		</view> -->
		<view class="paySuccessBtn" v-if="increase">
			<!-- <view v-if="source" class="orderBtn btn" @click="goToSavingCard">
				我的省钱卡
			</view> -->
			<view class="orderBtn btn" @click="goToGift">
				查看礼包
			</view>
			<view class="gotoHome btn" @click="goMember">
				去会员中心
			</view>
		</view>
		<view class="paySuccessBtn" v-else-if="!isNewType">
			<!-- <view v-if="source" class="orderBtn btn" @click="goToSavingCard">
				我的省钱卡
			</view> -->
			<view class="orderBtn btn" @click="goToOrder">
				查看订单
			</view>
			<view class="gotoHome btn" @click="goHome">
				返回首页
			</view>
		</view>
		
		<view class="paySuccessBtn" v-else>
			<view class="gotoHome btn" @click="goToOrder">
				查看订单
			</view>
			<view class="orderBtn btn" @click="goMember">
				去会员中心
			</view>
		</view>
		<uni-popup ref="newUserPopup" type="center">
			<newUserGift v-if="isNewUserFlag" :newUserCouponInfo='newUserCouponInfo' @closeNewUserPopup='closeNewUserPopup'></newUserGift>
		</uni-popup>
		<inviteNew></inviteNew>
	</view>
</template>
<script>
	import newUserGift from './newUserGift/index.vue';
	import tradeApi from '@/api/trade/index.js'
	import inviteNew from '@/pages/newUser/inviteNew.vue'
	import customerApi from '@/api/customer/index.js';
	import memberApi from "@/api/member/index.js"
	export default {
		data() {
			return {
				defaultTitleDto:{
					title:'付款结果',
				},
				newUserCouponInfo:{
					isFirstOrder:false,	//是否是新人首单
					couponIdList:[],	//新人首单优惠券id集合
					couponBagKey:""
				},
				isNewUserFlag:false,
				// source:'',// 来源 1 省钱卡
				// price:'',//已省
				// couponCardMemberFlag:'',//是否开通省钱卡
				isNewType:"",	//是否是礼包品
				increase:false,	//是否是转增品
				userInfo:{
					plusFlag:0
				}
			}
		},
		methods:{
			goHome(){
				uni.switchTab({url:'/pages/index/index'})
			},
			goMember(){
				this.$Router.replace({
					path:"/pages/memberGiftBag/index"
				})
			},	
			// getPrice(){ //省钱卡预估可省
			// 	customerApi.payGuide().then(res=>{
			// 		if(res.data.code==200){
			// 			this.price = res.data.data.estimateDiscountAmount // 有值
			// 			this.couponCardMemberFlag = res.data.data.couponCardMemberFlag
			// 		}else{
			// 			uni.showToast({
			// 				title:res.data.message,
			// 				icon:"none"
			// 			})
			// 		}
			// 	})
			// },
			// goToSavingCard(){
			// 	this.$Router.replace({path:'/pages/moneySavingCard/index'})
			// },
			goToOrder(){
				if(this.$Route.query.type){
					this.$Router.replace({path:'/pages/myGiftCardOrderList/index'})
				}else{
					this.$Router.replace({path:'/pages/order/index'})
				}
			},
			goToGift(){
				this.$Router.replace({path:'/pages/equityCard/index'})
			},
			openNewUserPopup(){	//打开优惠券弹窗
				this.$refs.newUserPopup.open()
			},
			closeNewUserPopup(){	//关闭优惠券弹窗
				this.$refs.newUserPopup.close()
			},
			tradeFirstOrder(){	//判断新用户是否为首单
				tradeApi.tradeFirstOrder(this.$Route.query.payId).then(res=>{
					if(res.data.code==200){
						if(res.data.data.isFirstOrder){
							this.zhuge.track("完成首单支付");
							this.newUserCouponInfo = res.data.data;
							this.isNewUserFlag = true
							this.$refs.newUserPopup.open();
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			loginInfo() { //获取登录信息
				memberApi.loginInfo().then(res => {
					if (res.data.code == 200) {
						this.userInfo = res.data.data
						uni.setStorageSync("userInfo", JSON.stringify(res.data.data))
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
		},
		onShow() {
			if(this.$Route.query.type!="giftCard"){
				this.tradeFirstOrder()
			}
			this.zhuge.track("订单支付成功-落地页")
			// this.source = this.$Route.query.source
			this.$nextTick(()=>{
				this.loginInfo();
			})
			// this.getPrice()
			this.isNewType = this.$Route.query.newtype
			this.increase = this.$Route.query.increase
		},
		onShareAppMessage(res) { //发送给朋友
			let shareImage = "/appletsImages/WechatIMG30.png"
			let path = ""
			let title=""
			if (res.from === 'button') {// 来自页面内分享按钮
				this.zhuge.track("支付页面-新人专享活动分享")
				title = "神秘邀请：你被拉入优惠商品福利专区！"
				shareImage = "/appletsImages/newUserShareImage.png"
				path = "/pages/newUser/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")
			}else{
				title = "文器库商城"
				shareImage = "/appletsImages/WechatIMG30.png"
				path = "/pages/index/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")
			}
			return {
				title: title,
				path: path,
				imageUrl: this.$config.imgBaseUrl + shareImage
			}
		},
		components:{
			newUserGift,
			inviteNew
		}
	}
</script>

<style scoped lang="scss">
	.commonPageTitle {
		padding-top: 88rpx;
	}
	.payMain{
		padding: 55rpx 0 48rpx 0;
		width: 100%;
		text-align: center;
		color: #999999;
		font-size: 32rpx;
		line-height: 40rpx;
		margin-top: 35rpx;
	}
	.payMain image{
		width: 285rpx;
	}
	
	.paySuccessBtn{
		width: calc(100% - 160rpx);
		height: 70rpx;
		display: flex;
		margin: 0 auto;
		margin-top: 60rpx;
		justify-content: space-between;
		.btn{
			width: 268rpx;
			height: 70rpx;
			text-align: center;
			line-height: 70rpx;
			border-radius: 36rpx;
		}
		.orderBtn{
			background-color: #FF1558;
			color: #FFFFFF;
		}
		.gotoHome{
			border: 1rpx solid #FF1558;
			color: #FF1558;
		}
	}
	
	.card{
		width: 690rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 36rpx;
		background-image: url($img-oss+'card_pay_bg.png');
		background-size: 100% 100%;
		margin: 32rpx auto 0;
		position: relative;
		color: #DE3150;
		font-size: 28rpx;
		text{
			font-weight: 600;
		}
		.icon{
			width: 19rpx;
			height: 19rpx;
			background-image: url($img-oss+'card_pay_icon.png');
			background-size: 100% 100%;
			margin-left: 12rpx;
		}
		.tag{
			width: 124rpx;
			position: absolute;
			left: 10rpx;
			bottom: 12rpx;
		}
	}
	.buySuccess{
		width: 100%;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: red;
	}
</style>

