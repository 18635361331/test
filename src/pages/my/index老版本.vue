<template>
	<view class="page my">
		<view class="header">
			<image lazy-load :src="imgBaseUrls+'/appletsImages/myheadBg2.png'" mode="widthFix" class="headImg"></image>
			<view class="setConfig" @click="$Router.push({path:'/pages/setting/index'})"></view>
			<!-- 邀请合伙人 -->
			<view v-if="userInfo&&userInfo.plusFlag==4" class="partnerShare" @click="$Router.push({path:'/copartner/inviteCode/index'})"></view> 
			
			<view class="myHeader">
				<view class="userInfo" v-if="!isLogin" @click="$Router.push({path:'/pages/login/index'})">
					<view class="userInfoHead">
						<image lazy-load src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/default_phone.png"></image>
					</view>
					<view class="userName ellipsis-one loginName">
						登录/注册
					</view>
				</view>
				<!-- 合伙人/会员身份-->
				<view class="userInfo loginActive" v-if="isLogin"  @click="goRolePage()">
					<headImg class="userInfoHead" :head="userInfo.smallIcon"></headImg>
					<view class="userName">
						<text class="ellipsis-one">{{userInfo.nickName?userInfo.nickName:userInfo.telephone}}</text>
						<!-- 会员图标 -->
						<view class="memberIcon" v-if="userInfo.plusFlag&&userInfo.plusFlag!=4" :style="'background:'+memberInfo.color">
							<view class="icon" :style="{backgroundImage:'url('+imgBaseUrls+memberInfo.icon+')'}"></view>
							<text>{{memberInfo.name}}</text>
							<view class="memberColor"></view>
						</view>
						<!-- 合伙人 -->
						<block v-if="userInfo.plusFlag==4">
							<view class="partnerIcon"  :style="{background:'linear-gradient(125deg,'+ memberInfo.startColor +' 0%, '+memberInfo.color+' 100%)'}">
								<view class="icon" :style="{backgroundImage:'url('+imgBaseUrls+memberInfo.icon+')'}"></view>
								<text>{{userInfo.memberTypeName}}</text>
								<view class="memberColor"></view>
							</view>
							<view class="inviteCode">
								<text>邀请码：</text>
								<text class="code">{{userInfo.shareNumber}}</text>
								<view class="copy" @click.stop="copy(userInfo.shareNumber)">复制</view>
							</view>
						</block>
						
						<!-- 提現 -->
						<!-- withdrawFlag -->
						<view class="widthDraw" v-if="withdraw&&withdraw.withdrawFlag">
							<text>可提现金额：</text>
							<text class="money">{{withdraw.balance}}元</text>
							<view class="btn" @click.stop="$Router.push({path:'/pages/withdraw/index'})">去提现 <text class="arrow-right"></text></view>
						</view>
					</view>
				</view>
				<!-- 订单 -->
				<view class="order">
					<view class="orderDetails">
						<view class="nav" v-for="item,index in navOrderData" :key='item.type' @click="goToOrder(item)" :class="index==navOrderData.length-1?'allIcon':''">
							<image :src="imgBaseUrls+'appletsImages/'+item.icon"></image>
							<view>{{item.name}}</view>
							<view class="navMarker" v-if="item.num">{{item.num}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 团队人数 -->
		<view class="group" v-if="isLogin&&userInfo.plusFlag==4">
			<view class="title">
				<text class="headline">团队人数</text>
				<text class="guide" @click="$Router.push({path:'/copartner/partner/index'})">进入合伙人中心  <text class="arrow-right"></text></text>
			</view>
			<view class="group_part">
				<view class="list">
					<text class="num">{{partner.fansNumber||0}}</text>
					<view class="img normal"></view>
					<text class="name">粉丝</text>
				</view>
				<view class="list">
					<text class="num">{{partner.plusNumber||0}}</text>
					<view class="img vips"></view>
					<text class="name">会员</text>
				</view>
				<view class="list">
					<text class="num">{{partner.distributorNumber||0}}</text>
					<view class="img partners"></view>
					<text class="name">合伙人</text>
				</view>
			</view>
		</view>
		
		<!-- 未登錄、无身份 -->
		<view class="swiper" v-if="!isLogin||userInfo.plusFlag==0">
			<swiper class="swiperMy" :indicator-dots="false" circular autoplay :interval="2000" :duration="500"  @change="swiperChange">
				<swiper-item>
					<view class="everyRow" @click="$Router.push({path:'/pages/memberGiftBag/index'})">
						<image :src="imgBaseUrls+memberInfo.mainBg" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="everyRow" @click="$Router.push({path:'/copartner/policy/index'})">
						<image :src="imgBaseUrls+partnerBg" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<block v-for="item,index in 2" :key='index' >
					<view :class="swiperIndex-1==index?'active':''"></view>
				</block>
			</view>
		</view>
		
		<block v-if="isLogin && userInfo.plusFlag">
			<!-- 会员/合伙人权益 -->
			<view class="memberDefult" @click="goToMember" :style="{backgroundImage:'url('+imgBaseUrls+(memberInfo.mainBg?memberInfo.mainBg:memberInfo.bgImage)+')'}">
				<!-- plusFlag 引用组件标示合伙人权益不可点击 -->
				<rights :list="rights" :plusFlag="userInfo.plusFlag==4?true:''"></rights>
				<view v-if="userInfo.plusFlag!=4" class="levelRule" @click.stop="openPopup()"></view>
			</view>
		</block>
		
		
		<!-- 签到功能 -->
		<view class="navCont">
			<view v-for="item,index in navContData" @click="goToPath(item)" :key="index">
				<image :src="'http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/'+item.icon"></image>
				<view class="navText">{{item.name}}</view>
			</view>
		</view>
		<!-- 定制化订单 -->
		<view class="customization" @click="goToOrder({path:'/pages/customizationOrder/index'})">
			<text>我的个性定制订单</text>
			<image :src="imgBaseUrls+'/appletsImages/customization.png'" mode="heightFix"></image>
		</view>
		
		<view class="marketingBox" scroll-x="true">
			<view class="fm-function">
				<text class="name">我的资产</text>
				<text class="val"></text>
			</view>
			<scroll-view scroll-x="true" class="navigation">
				<view class="orderDetails">
					<view class="nav navBtnIcon" v-for="item,index in myAssets" :key='item.type' @click="goToCorresponding(item)">
						<image :src="'http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/'+item.icon"></image>
						<view class="navName">{{item.name}}</view>
						<view class="navCount">{{item.num?item.num:0}}</view>
					</view>
					<!-- <view class="navIcon" @click="goToThirdparty">
						<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/vehicle.png"></image>
						<view class="navName">车主权益卡</view>
					</view> -->
					<view class="navIcon navBtnIcon" @click="goToOrder({path:'/pages/invoice/index'})">
						<image :src="imgBaseUrls+'/appletsImages/customization_invoice.png'"></image>
						<view class="navName">我的发票</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<renovation url='my?type=system'></renovation>
		<inviteNew :isBtm='true'></inviteNew>
		<agreementPopup v-if="Object.keys(memberInfo).length" ref='agreementPopup'></agreementPopup>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js';
	import starstoreApi from '@/api/starstore/index.js';
	import renovation from '@/pages/renovation/index.vue'
	import inviteNew from '@/pages/newUser/inviteNew.vue';
	import appApi from '@/api/app/index.js'
	import customerApi from '@/api/customer/index.js';
	import cashApi from '@/api/cash/index.js';
	
	import agreementPopup from './agreementPopup.vue'
	import rights from './rights.vue'
	import vipConfig from '@/common/js/vipConfig.js';
	import setCopy from '@/common/js/setCopy.js'
	import headImg	from  '@/common/model/head.vue'

	
	export default {
		mixins:[setCopy],
		data() {
			return {
				isLogin: false,
				navOrderData: [{
						name: '待付款',
						icon: 'myPay.png',
						state: 10,
						type: "orderUnpay",
						num: "",
					},
					// {
					// 	name: '待发货',
					// 	icon: 'daifahuo2@2x.png',
					// 	num: "",
					// 	type: "orderUnshipped",
					// 	state: 20
					// },
					{
						name: '待收货',
						icon: 'myGet.png',
						num: "",
						type: "orderUunreceived",
						state: 30
					},
					{
						name: '待评价',
						icon: 'myComment.png',
						type: "orderUncomment",
						num: "",
						state: 70
					},
					{
						name: '退款/售后',
						num: "",
						type: "orderRefund",
						icon: 'myRefund.png',
						path: "/pages/refund/index"
					},
					{
						name: '全部订单',
						icon: 'myOrder.png',
						type: "all",
						num: "",
						path: '/pages/order/index'
					},
				],
				navContData: [{
						name: '签到',
						icon: 'sign@2x.png',
						path: "/pages/signIn/index"
					},
					{
						name: '收藏',
						icon: 'collection@2x.png',
						path: '/pages/collection/index'
					},
					{
						name: '关注',
						icon: 'follow@2x.png',
						path: "/pages/follow/index"
					},
					{
						name: '足迹',
						icon: 'footprint@2x.png',
						path: "/pages/footprint/index"
					}
				],
				myAssets: [
					// {
					// 	name: '账户余额',
					// 	icon: 'balance@2x.png',
					// 	type: "balance"
					// },
					{
						name: '账户积分',
						icon: 'integral@2x.png',
						path: "/pages/integral/index",
						type: "point"
					},
					{
						name: '礼卡余额',
						icon: 'giftCardBalance@2x.png',
						path: "/pages/giftCard/index",
						type: "cardBalance"
					},
					{
						name: '优惠券',
						icon: 'myCoupon@2x.png',
						path: "/pages/coupon/index",
						type: "couponCount"
					},
					{
						name: '收入中心',
						icon: 'shouru.png',
						path:"",
						type:"incomeMoney"
					},
					// {
					// 	name: '星店优惠券',
					// 	icon: 'xingdianquan.png',
					// 	path:"/pages/startStore/index",
					// 	type:"startStore"
					// },
					{
						name: '库豆',
						icon: 'peas.png',
						path: "/pages/shopMoneyDetails/index",
						type: "goldTotal"
					}
				],
				userInfo: {
					plusFlag:0
				},	//用户信息
				swiperIndex:1,
				imgBaseUrls: "",
				memberInfo:{},	//会员信息
				partnerBg:'',// 合伙人默认加入图
				rights:[],//权益
				withdraw:{//提现
					withdrawFlag:false
				},
				partner:{},//合伙人团队信息
			}
		},
		components: {
			renovation,
			inviteNew,
			agreementPopup,
			rights,
			headImg
		},
		async onShow() {
			this.zhuge.track("我的-落地页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			if (uni.getStorageSync("sessionId")) {
				this.loginInfo();
				this.canUseCount();
				this.withdrawInfo()
			}else{
				for(let i=0;i<this.navOrderData.length;i++){
					this.navOrderData[i].num = 0
				}
				for(let i=0;i<this.myAssets.length;i++){
					this.myAssets[i].num = 0
				}
				this.getUserVip();
				this.isLogin = false;
				this.userInfo = {}
				
			}
		},
		onShareAppMessage(res) { //发送给朋友
			this.zhuge.track("新人专享活动分享")
			let shareImage = "/appletsImages/WechatIMG30.png"
			let path = ""
			let title=""
			if (res.from === 'button') {// 来自页面内分享按钮
				title = "神秘邀请：你被拉入优惠商品福利专区！"
				shareImage = "/appletsImages/newUserShareImage.png"
				path = "/pages/newUser/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")
				return {
					title: title,
					path: path,
					shareImage
				}
			}else{
				title = "文器库商城"
				shareImage = null
				path = "/pages/my/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")
				return {
					title: title,
					path: path
				}
			}
			
		},
		methods: {
			loginInfo() { //获取登录信息
				memberApi.loginInfo().then(res => {
					if (res.data.code == 200) {
						this.userInfo = res.data.data;
						this.isLogin = true
						for (let i = 0; i < this.navOrderData.length; i++) {
							this.navOrderData[i].num = res.data.data[this.navOrderData[i].type]
						}
						for (let i = 0; i < this.myAssets.length; i++) {
							this.$set(this.myAssets[i], "num", res.data.data[this.myAssets[i].type])
						}
						uni.setStorageSync("userInfo", JSON.stringify(this.userInfo))
						
						// 会员信息
						if(this.userInfo.plusFlag == 4){
							this.privilegesSummary();
							this.teamNumbers()
						}else if(this.userInfo.plusFlag){
							this.getPrivilege(this.userInfo.plusFlag);
							this.getUserVip()
						}else{
							this.getUserVip()
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			async getUserVip(){	//获取vip信息
				this.memberInfo = await vipConfig.getUserVip();
				this.partnerBg = uni.getStorageSync("miniRouter")?JSON.parse(uni.getStorageSync("miniRouter")).partnerBg:''
			},
			withdrawInfo(){ // 用户提现信息
				cashApi.withdrawInfo().then(res=>{
					if(res.data.code==200){
						this.withdraw = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			privilegesSummary(){	//分销商权益的概述信息
				appApi.privilegesSummary().then(res=>{
					if(res.data.code==200){
						this.rights = res.data.data?res.data.data.policyList:[]
						this.memberInfo = res.data.data;
						let miniRouter = JSON.parse(uni.getStorageSync("miniRouter")).memberConfig;
						for(let i = 0;i<miniRouter.length;i++){
							if(miniRouter[i].id == this.userInfo.distributorTypeId){
								this.memberInfo = Object.assign(this.memberInfo,miniRouter[i])
							}
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getPrivilege(type){	//获取会员类型对应的权益信息
				memberApi.getPrivilege(type).then(res=>{
					if(res.data.code==200){
						this.rights = res.data.data.privilegeUnitList;
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			goToOrder(item) { //去往订单页
				if (!uni.getStorageSync("sessionId")) {
					this.$Router.push({
						path: "/pages/login/index"
					})
					return false;
				}
				if (item.path) {
					this.$Router.push({
						path: item.path
					})
				} else {
					this.$Router.push({
						path: '/pages/order/index',
						query: {
							state: item.state
						}
					})
				}
			},
			goToMember(){
				if(this.userInfo.plusFlag!=4){
					this.$Router.push({path:'/pages/memberGiftBag/index'})
				}else{
					this.$Router.push({path:'/copartner/policy/index'})
				}
			},
			// goToThirdparty(){	//去往车总管页面  普通会员直接跳转至激活页面   个人或企业跳转至权益卡页面
			// 	if(!uni.getStorageSync("sessionId")){
			// 		this.$Router.push({
			// 			path:"/pages/login/index"
			// 		})
			// 		return
			// 	}
			// 	this.$Router.push({
			// 		path:"/pages/thirdparty/index"
			// 	})
			// },
			goToPath(item) {
				this.$Router.push({
					path: item.path
				})
			},
			goToCorresponding(item) { //我的资产页面跳转
				if (item.path) {
					this.$Router.push({
						path: item.path
					})
				}
			},
			canUseCount() { //待使用星店优惠券数量
				starstoreApi.canUseCount().then(res => {
					if (res.data.code == 200) {
						let index = this.myAssets.findIndex(item => {
							return item.type == "startStore"
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			openPopup(){	//打开升级协议
				this.$refs.agreementPopup.openPopup()
			},
			
			swiperChange(e){
				this.swiperIndex = e.detail.current +1
			},
			goRolePage(){ // 头部点击
				if(this.userInfo.plusFlag==4){
					// 是合伙人
					this.$Router.push({path:'/copartner/partner/index'})
				}else{
					this.$Router.push({path:'/pages/userInfo/index'})
				}
			},
			teamNumbers(){ // 团队人数展示
				appApi.teamNumbers().then(res=>{
					if(res.data.code==200){
						this.partner = res.data.data
					}
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.my {
		width: 100%;
		background-color: #F4F4F4;
		padding-bottom: 20rpx;
		min-height:100vh;
		/* #ifdef H5 */
			min-height: calc(100vh - 50px);
		/* #endif */		
	}
	.header{
		position: relative;
		margin-bottom: 30rpx;
	}
	.headImg{
		width: 100%;
	}
	.myHeader {
		width: calc(100% - 60rpx);
		min-height: 354rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		position: relative;
		margin: 0 auto;
		margin-top: -200rpx;
		padding-top: 60rpx;
		.nav image{
			margin-bottom: 14rpx;
		}
	}
	.userInfo {
		width: 100%;
		padding-left: 36rpx;
		display: flex;
		margin-bottom: 38rpx;
	}
	
	.userInfoHead {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
		display: inline-block;
	}
	
	.setConfig {
		width: 40rpx;
		height: 40rpx;
		background:url($img-oss+'set_btn_white.png') no-repeat 50%;
		position: absolute;
		background-size: 42rpx;
		right: 34rpx;
		top: 30rpx;
	}
	.partnerShare{
		width: 168rpx;
		height: 40rpx;
		background:url($img-oss+'partnerShare.png');
		background-size: cover;
		position: absolute;
		right: 90rpx;
		top: 30rpx
	}
	
	.orderDetails {
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		flex-wrap: wrap;
		.nav {
			text-align: center;
			min-width: 20%;
			color: #333;
			font-size: 24rpx;
			position: relative;
		}
	}
	
	
	.navIcon{
		text-align: center;
		min-width: 20%;
		color: #333;
		font-size: 24rpx;
		position: relative;
		margin-top: 40rpx;
	}
	
	.orderDetails .nav image,.navIcon image{
		width: 60rpx;
		height: 60rpx;
	}
	
	.loginName,.userName>text{
		font-size: 36rpx;
		color: #323232;
		padding-right:30rpx;
		line-height: 1.2;
	}
	.userName {
		margin-left: 30rpx;
		max-width: 460rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		&>text{
			width: 100%;
		}
		.memberIcon,.partnerIcon{
			height: 40rpx;
			border-radius: 20rpx;
			padding: 0 22rpx 0 14rpx;
			margin-top: 10rpx;
			// display: inline-block;
			display: flex;
			align-items: center;
			
			position: relative;
			overflow: hidden;
			view{
				background-size: 100% 100%;
			}
			text{
				margin-left: 12rpx;
				font-size: 20rpx;
				font-weight: 400;
				line-height: 1;
			}
			.memberColor{
				animation: example 2s infinite ;
				height: 120rpx;
				width: 88rpx;
				background: linear-gradient(89deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
				transform: rotate(207deg);
				position: absolute;
				left: -84rpx;
				top: -40rpx;
				z-index: 1;
			}
		}
		.memberIcon{
			background-color: #FCDECE;
			color: #fff;
			display: flex;
			align-items: center;
			vertical-align: middle;
			view{
				width: 28rpx;
				height: 28rpx;
			}
		}
		
		@keyframes example {
		  0% {left:-84rpx}
		  50% {left: 100%}
		  100% {left: 100%;}
		}
		.partnerIcon{
			background: linear-gradient(125deg, #FFEEC5 0%, #F8E58F 100%);
			color: #572E05;
			view{
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
	
	
	.inviteCode{
		font-size: 24rpx;
		font-weight: 400;
		margin-top: 6rpx;
		color: #666666;
		display: flex;
		width: 100%;
		align-items: center;
		.code{
			color: #333333;
		}
		.copy{
			text-align: center;
			width: 70rpx;
			height: 40rpx;
			margin-left: 10rpx;
			background: #FFF2E2;
			font-size: 20rpx;
			font-weight: 500;
			color: #AA7231;
			line-height: 40rpx;
			border-radius: 20rpx;
		}
	}
	
	.widthDraw{
		margin-top: 12rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		display: flex;
		align-items: center;
		.money{
			font-size: 28rpx;
			color: #FE325C;
		}
		.btn{
			font-size: 20rpx;
			font-weight: 700;
			color: #AA7231;
			margin-left: 10rpx;
		}
		.arrow-right{
			border-top: 2px solid #AA7231;
			border-right: 2px solid #AA7231;
		}
	}
	
	
	.arrow-right{
		display: inline-block;
		width: 16rpx;
		height: 16rpx;
		transform: rotate(45deg);
	}
	// 团队人数
	.group{
		width: calc(100% - 60rpx);
		margin: 0 auto 30rpx;
		height: 274rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx 20rpx 20rpx 34rpx;
		.title{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30rpx;
		}
		.headline{
			font-size: 32rpx;
			font-weight: 700;
			color: #000000;
		}
		.guide{
			font-size: 24rpx;
			font-weight: 700;
			color: #AA7231;
		}
		.arrow-right{
			border-top: 2px solid #AA7231;
			border-right: 2px solid #AA7231;
		}
		.group_part{
			display: flex;
			justify-content: center;
			.list{
				text-align: center;
				width: 33%;
				position: relative;
				&:not(:last-child)::after{
					content: '';
					position: absolute;
					width: 1px;
					height: 80rpx;
					top: 40rpx;
					background: #D8D8D8;
					right: 0;
				}
			}
			.num{
				font-size: 36rpx;
				font-weight: 500;
				color: #333333;
				line-height: 1.3;
			}
			.img{
				width: 30rpx;
				height: 26rpx;
				background-size: 100% 100%;
				margin: 28rpx auto 22rpx;
			}
			.name{
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}
		}
		.normal{
			background-image: url($img-oss+'group_normal.png');
		}
		.vips{
			background-image: url($img-oss+'group_vips.png');
		}
		.partners{
			background-image: url($img-oss+'group_partners.png');
		}
	}
	.memberDefult{
		width: calc(100% - 60rpx);
		border-radius: 12rpx;
		margin: 0 auto;
		background-size: 100% 100%;
		position: relative;
		height: 297rpx;
		padding:22rpx 20rpx;
		.levelRule{
			width: 120rpx;
			height: 50rpx;
			position: absolute;
			top: 0;
			right: 12rpx;
			z-index: 2;
		}
		/deep/ .rightsGroup{
			position: absolute;
			bottom: 20rpx;
			width: calc(100% - 30rpx);
			.content>view{
				min-width: 160rpx;
				height: 196rpx;
				margin-right: 10rpx;
				background: rgba(255,255,255,0.6);
				image{
					margin: 20rpx 0;
				}
				.info{
					font-size: 28rpx;
				}
			}
		}
		
	}
	
	.swiper{
		width: calc(100% - 60rpx);
		height: 152rpx;
		margin: 0 auto;
		position: relative;
		image{
			width: 100%;
		}
	}
	.swiperMy{
		height: 100%;
	}
	.dots{
		position: absolute;
		bottom: 20rpx;
		width: 100%;
		z-index: 1;
		display: flex;
		justify-content: center;
		view{
			width: 10rpx;
			height: 8rpx;
			background: #D8D8D8;
			border-radius: 50%;
			opacity: 0.6;
			margin: 0 10rpx; 
			transition: 0.3s all ease-in-out;
		}
		.active{
			width: 20rpx;
			background: #FF1457;
			opacity: 1;
			border-radius: 8rpx;
			transition: 0.3s all ease-in-out;
		}
	}
	
	
	.marketingBox {
		width: calc(100% - 60rpx);
		background-color: #fff;
		border-radius: 12rpx;
		margin: 0 auto;
		margin-top: 20rpx;
	}

	.fm-function {
		width: 100%;
		height: 98rpx;
		display: flex;
		position: relative;
		.name {
			display: block;
			height: 98rpx;
			line-height: 98rpx;
			margin-left: 36rpx;
			font-size: 34rpx;
			font-weight: 700;
			flex: 1;
		}
		.val {
			display: block;
			font-size: 26rpx;
			letter-spacing: 0;
			height: 98rpx;
			font-size: 26rpx;
			color: #666;
			line-height: 98rpx;
		}
	}

	.navName {
		margin-top: 2rpx;
		font-size: 24rpx;
	}

	.navigation {
		width: 702rpx;
		margin: 0 auto;
	}

	.navCount {
		color: #999999;
	}

	.navCont {
		width: calc(100% - 60rpx);
		height: 160rpx;
		bottom: 16rpx;
		display: flex;
		margin: 0 auto;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		view {
			width: 25%;
			color: #333;
			font-size: 24rpx;
			padding-top: 40rpx;
			text-align: center;
			justify-content: center;
			image {
				width: 48rpx;
				height: 48rpx;
			}
		}
		view.navText{
			width: 100%;
			padding-top: 0;
		}
	}

	.navMarker {
		width: 48rpx;
		top: -6rpx;
		border-radius: 16rpx;
		position: absolute;
		height: 28rpx;
		right: 14rpx;
		background: #ff1558;
		color: #fff;
		font-size: 18rpx;
		line-height: 28rpx;
	}
	.allIcon::before{
		content: '';
		position: absolute;
		width: 6rpx;
		height: 60rpx;
		left: 0;
		top: 0;
		background-image: url($img-oss+'orderLine.png');
		background-size: 100% 100%;
	}
	
	.customization{
		width: calc(100% - 60rpx);
		margin: 20rpx auto 0;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left:35rpx;
		text{
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 700;
			line-height: 1;
			color: #323232;
		}
	}
</style>
