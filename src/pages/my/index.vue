<template>
	<view class="page my">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="header">
			<image lazy-load :src="imgBaseUrls+'/appletsImages/myheadBg2.png'" mode="widthFix" class="headImg"></image>
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
				<view class="userInfo loginActive" v-if="isLogin"  @click="$Router.push({path:'/pages/userInfo/index'})">
					<headImg class="userInfoHead" :head="userInfo.smallIcon"></headImg>
					<view class="userName" :class="userInfo.plusFlag==0?'noRole':''">
						<text class="ellipsis-one">{{userInfo.nickName?userInfo.nickName:userInfo.telephone}}</text>
						<!-- 会员图标 -->
						<view class="memberIcon" v-if="userInfo.plusFlag&&userInfo.plusFlag!=4" :style="'background:'+memberInfo.color">
							<view class="icon" :style="{backgroundImage:'url('+imgBaseUrls+memberInfo.icon+')'}"></view>
							<text>{{userInfo.memberTypeName}}</text>
							<view class="memberColor"></view>
						</view>
						<!-- 合伙人 -->
						<block v-if="userInfo.plusFlag==4">
							<view class="partnerIcon"  :style="{background:'linear-gradient(125deg,'+ memberInfo.startColor +' 0%, '+memberInfo.color+' 100%)'}">
								<view class="icon" :style="{backgroundImage:'url('+imgBaseUrls+memberInfo.icon+')'}"></view>
								<text>{{userInfo.memberTypeName}}</text>
								<view class="memberColor"></view>
							</view>
						</block>
						<view class="inviteCode" v-if="userInfo.shareNumber">
							<text>邀请码：</text>
							<text class="code">{{userInfo.shareNumber}}</text>
							<view class="copy" @click.stop="copy(userInfo.shareNumber)">复制</view>
						</view>
					</view>
				</view>
				<!-- 订单 -->
				<view class="orderTitle">
					<view class="general" :class="orderType==1?'active':''" @click="orderType=1">
						<text class="text">普通订单</text>
						<text class="bg"></text>
					</view>
					<view class="customized" :class="orderType==0?'active':''" @click="orderType=0">
						<text class="text">定制订单</text>
						<text class="bg"></text>
					</view>	
				</view>
				<scroll-view scroll-x="true" class="order">
					<view class="orderDetails">
						<view class="nav" v-for="item,index in order[orderType]" :key='item.type' @click="goToOrder(item)" :class="index==order[orderType].length-1?'allIcon':''">
							<image :src="imgBaseUrls+'appletsImages/'+item.icon"></image>
							<view>{{item.name}}</view>
							<view class="navMarker" v-if="item.num">{{item.num}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 会员 -->
		<vipPart ref='vipPart' :userInfo="userInfo"></vipPart>
		<!-- 现金 -->
		<money ref='money' :userInfo="userInfo"></money>
		<!-- 工具/资产 -->
		<tools :myAssets="myAssets"></tools>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js';
	import starstoreApi from '@/api/starstore/index.js';
	import appApi from '@/api/app/index.js'
	
	import vipConfig from '@/common/js/vipConfig.js';
	import setCopy from '@/common/js/setCopy.js'
	import headImg from  '@/common/model/head.vue'
	import vipPart from  './vipPart.vue'
	import money from  './money.vue'
	import tools from  './tools.vue'
	
	
	export default {
		mixins:[setCopy],
		data() {
			return {
				isLogin: false,
				defaultTitleDto:{
					title:'我的',
					color:'red',
				},
				orderType:1,// 1 普通 0 定制
				order:[
					[
						{
							name: '待确认',
							icon: 'confirmed.png',
							state: 10,
							type: "confirmed",
							num: "",
						},
						{
							name: '待付款',
							icon: 'pending.png',
							state: 20,
							type: "pending",
							num: "",
						},
						{
							name: '生产中',
							icon: 'production.png',
							state: 30,
							type: "production",
							num: "",
						},
						{
							name: '待收货',
							icon: 'received.png',
							state: 40,
							type: "received",
							num: "",
						},
						{
							name: '全部订单',
							icon: 'myOrder.png',
							type: "all",
							num: "",
						},
					],
					[{
							name: '待付款',
							icon: 'myPay.png',
							state: 10,
							type: "orderUnpay",
							num: "",
						},
						{
							name: '待发货',
							icon: 'userDeliveryIcon.png',
							type: "orderUnshipped",
							num: "",
							state: 20
						},
						{
							name: '待收货',
							icon: 'myGet.png',
							num: "",
							type: "orderUunreceived",
							state: 30
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
					]
				],
				myAssets: [
					{
						name: '账户积分',
						icon: 'integralV3.png',
						path: "/pages/integral/index",
						type: "point"
					},
					{
						name: '礼卡余额',
						icon: 'giftCardBalanceV3.png',
						path: "/pages/giftCard/index",
						type: "cardBalance"
					},
					{
						name: '优惠券',
						icon: 'couponV3.png',
						path: "/pages/coupon/index",
						type: "couponCount"
					},
					{
						name: '收入中心',
						icon: 'shouruV3.png',
						path:"",
						type:"incomeMoney"
					},
					{
						name: '库豆',
						icon: 'peasV3.png',
						path: "/pages/shopMoneyDetails/index",
						type: "goldTotal"
					}
				],
				userInfo: {
					plusFlag:0
				},	//用户信息
				imgBaseUrls: "",
				memberInfo:{},	//会员信息
				withdraw:{//提现
					withdrawFlag:false
				},
				partner:{},//合伙人团队信息
			}
		},
		components: {
			headImg,
			vipPart,
			money,
			tools
		},
			
		onShow() {
			this.zhuge.track("我的-落地页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			if (uni.getStorageSync("sessionId")) {
				this.loginInfo();
			}else{
				for(let i=0;i<this.order[1].length;i++){
					this.order[1][i].num = 0
				}
				for(let i=0;i<this.myAssets.length;i++){
					this.myAssets[i].num = 0
				}
				this.isLogin = false;
				this.userInfo = {}
			}
			this.$nextTick(()=>{
				try{
					this.$refs.money.reasetMoney()
				}catch(e){}
			})
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
						for (let i = 0; i < this.order[1].length; i++) {
							this.order[1][i].num = res.data.data[this.order[1][i].type]
						}
						for (let i = 0; i < this.myAssets.length; i++) {
							this.$set(this.myAssets[i], "num", res.data.data[this.myAssets[i].type])
						}
						uni.setStorageSync("userInfo", JSON.stringify(this.userInfo))
						// if(this.userInfo.plusFlag==4){
						// 	try{
						// 		this.$refs.vipPart.distributorSummary();
						// 	}catch(e){
								
						// 	}
						// }
						// 会员信息
						this.getUserVip()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			async getUserVip(){	//获取vip信息
				if(this.userInfo.plusFlag && this.userInfo.plusFlag!=4){
					this.memberInfo = await vipConfig.getUserVip();
				}else if(this.userInfo.plusFlag==4){
					let partner = await vipConfig.getPartner();
					for(let i=0;i<partner.length;i++){
						if(this.userInfo.distributorTypeId == partner[i].id){
							this.memberInfo  = partner[i]
						}
					}
				}
				try{
					this.$refs.vipPart.setType()
				}catch(e){}
			},
			goToOrder(item) { //去往订单页
				if (!uni.getStorageSync("sessionId")) {
					this.$Router.push({
						path: "/pages/login/index",
						
					})
					return false;
				}
				if (item.path) {
					this.$Router.push({
						path: item.path,
						query:{
							state:item.state || ""
						}
					})
				} else if(this.orderType==1){ // 普通
					this.$Router.push({
						path: '/pages/order/index',
						query: {
							state: item.state || ""
						}
					})
				}else{	//定制订单
					this.$Router.push({
						path: '/pages/customizationOrder/index',
						query: {
							state: item.state || ""
						}
					})
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
			teamNumbers(){ // 团队人数展示
				appApi.teamNumbers().then(res=>{
					if(res.data.code==200){
						this.partner = res.data.data
					}
				})
			},
			
			
		}
	}
</script>

<style scoped lang="scss">
	.my {
		width: 100%;
		background-color: #F4F4F4;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
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
		position: absolute;
		left: 30rpx;
		top: 10rpx;
		
		.nav image{
			margin-bottom: 14rpx;
		}
	}
	.userInfo {
		width: 100%;
		display: flex;
		margin-bottom: 40rpx;
	}
	
	.userInfoHead {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
		display: inline-block;
	}
	.orderTitle{
		$he:66rpx;
		position: relative;
		height: $he;
		view{
			width: 52%;
			position: absolute;
			text-align: center;
			height: $he;
			.bg{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				background: #FD5679;
				box-shadow: inset 0 1px 3px 0 #ffffff;
				border-bottom: 0;
			}
			.text{
				position: relative;
				z-index: 11;
				font-size: 32rpx;
				line-height: $he;
				font-weight: 500;
				color: #90102F;
			}
		}
		.general {
			.bg{
				border-radius: 20rpx 16rpx 0 0;
				transform: perspective(28rpx) scale(1, 1.3) rotateX(3deg);
				/* 镜头距离元素表面的位置为8px，x轴为1.1倍y轴为1.3倍，绕x轴旋转5度 */
				transform-origin: bottom left;
				/* bottom left = left bottom = 0 100% 中心点偏移量*/
			}
		}
		.customized{
			right: 0;
			.bg{
				border-radius: 16rpx 20rpx 0 0;
				transform: perspective(28rpx) scale(1, 1.3) rotateX(3deg);
				transform-origin: bottom right;
			}
			
		}
		.active {
			.bg{
				background: #fff;
				z-index: 10;
			}
			.text{
				color: #333333;
			}
		}
			
		
	}
	.order{
		background: #fff;
		border-radius: 0 0 20rpx 20rpx;
		margin-top: -2rpx;
	}
	.orderDetails {
		width: 100%;
		padding: 32rpx 0 30rpx;
		display: flex;
		flex-wrap: nowrap;
		.nav {
			text-align: center;
			min-width: 20%;
			color: #333;
			font-size: 24rpx;
			position: relative;
		}
	}
	.orderDetails .nav image{
		width: 60rpx;
		height: 60rpx;
	}
	
	.loginName,.userName>text{
		font-size: 36rpx;
		color: #FFFFFF;
		padding-right:20rpx;
	}
	.userName {
		margin-left: 30rpx;
		max-width: 460rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		&.noRole{
			margin-top: -48rpx;
		}
		&>text{
			width: 100%;
		}
		.memberIcon,.partnerIcon{
			height: 40rpx;
			border-radius: 20rpx;
			padding: 0 22rpx 0 14rpx;
			margin-top: 14rpx;
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			.icon{
				background-size: 100% 100%;
			}
			text{
				margin-left: 12rpx;
				font-size: 20rpx;
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
				width: 32rpx;
				height: 32rpx;
			}
		}
		
		@keyframes example {
		  0% {left:-84rpx}
		  50% {left: 100%}
		  100% {left: 100%;}
		}
		.partnerIcon{
			background: linear-gradient(130deg, #F7D3C0 0%, #F3B795 100%);
			color: #333333;
			view{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	
	
	.inviteCode{
		font-size: 24rpx;
		font-weight: 400;
		margin-top: 6rpx;
		color: #fff;
		position: absolute;
		right: 0;
		top: 4rpx;
		display: flex;
		align-items: center;
		.code{
			font-size: 28rpx;
		}
		.copy{
			text-align: center;
			width: 70rpx;
			height: 28rpx;
			font-size: 20rpx;
			font-weight: 500;
			color: #663F0A;
			line-height: 28rpx;
			margin-left: 10rpx;
			background: #FFF2E2;
			border-radius: 20rpx;
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
	
</style>
