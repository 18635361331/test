<template>
	<view class="pages">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="head">
			<text>开卡每月劲省236元</text>
			<view class="rule" @click="openRulePopup()">查看规则  <text class="arrow-right"></text></view>
		</view>
		<!-- 开通情况 -->
		<view class="opening" :class="couponCardMemberFlag?'join':''">
			<view class="top">
				<text>Vanch省钱月卡</text>
				<view class="right">
					<text class="ellipsis-one">{{userInfo&&userInfo.nickName?userInfo.nickName:userInfo.telephone}}</text><text style="margin: 0 6rpx;">|</text><text>{{couponCardMemberFlag?'已':'未'}}开通</text></view>
			</view>
			<!-- 累计 -->
			<view class="save" v-if="couponCardMemberFlag" @click="goSavingDetail()">
				累计已省<text>{{userCardInfo.totalSaveAmount||0}}</text>元
			</view>
			<block v-if="users&&users.length">
				<swiper class="swiperContent" :autoplay="true" :vertical="true" :circular="true" :interval="3000" :duration="1000">
					<block v-for="item,index in users" :key="index">
						<swiper-item>
							<view class="swiper-item">
								<view v-if="item.smallIcon && String(item.smallIcon).indexOf('http')!='-1'" :style="{backgroundImage:'url('+item.smallIcon+')'}" class="headImg"></view>
								<view v-else-if="item.smallIcon" :style="{backgroundImage:'url('+imgBaseUrlFiles+item.smallIcon+')'}" class="headImg"></view>
								<view v-else class="headImg" :style="{backgroundImage:'url('+imgBaseUrlFiles+'default_phone.png)'}"></view>
								<text :class="couponCardMemberFlag?'hong':''">{{item.userName}}{{item.dataType==1?'开通了':'刚使用月卡节省'}}{{item.dataType==1?(item.cardCycle+'月月卡'):(item.discountValue+'元')}}</text>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</block>
			<block v-if="couponCardMemberFlag">
				<view class="btn" @click="inviteOpen()">邀请好友开通省钱月卡返{{configDetInfo.inviteNewReturnCoupon.discountValue}}元优惠券</view>
				<view class="validity">剩余有效期：{{configDetInfo.privilegeLeftDays}}天</view>
			</block>
		</view>
		<!-- 开卡 -->
		<view class="card">
			<view class="list" v-for="item,index in configDetInfo.priceConfigList" :key="index">
				<view class="first" v-if="item.firstChargePrice&&configDetInfo.firstOpenFlag">首月仅{{item.firstChargePrice}}元</view>
				<view class="info">
					<view class="left" v-if="index==0">
						<text>单月开卡</text>
						<text>有效期30天</text>
					</view>
					<view class="left" v-else>
						<text>连续{{item.cycle}}月</text>
						<text>共{{item.price}}元</text>
					</view>
					<view class="money">
						¥ 
						<block v-if="index==0">
							<text>{{item.price}}</text>
						</block>
						<block v-else>
							<text>{{(item.price/item.cycle).toFixed(2)}}</text>
							<text class="dark">/月</text>
						</block>
					</view>
				</view>
				<view class="btn" @click="cardPurchase(item.cycle,item.price,item.firstChargePrice)">{{couponCardMemberFlag?'立即续费':'立即开通'}}</view>
			</view>
			
		</view>
		<!-- 提示 -->
		<view class="tips">
			<text class="dot"></text>
			<text>购买后不会自动续费，需再次购买月卡有效期</text>
			<text class="dot"></text>
		</view>
		<!-- 权益1 -->
		<view class="rights first" :class="couponCardMemberFlag?'yes':''">
			<view class="title">
				<view class="icno">权益1</view>
				<text>{{configDetInfo.privilegeTitle1}}</text>
			</view>
			<view class="explain">
				<view class="headline">
					<text class="line"></text>全场通用券
				</view>
				<text class="time">领取优惠券有效期：1天</text>
			</view>
			<!-- 券 -->
			<view class="coupon" v-if="!couponCardMemberFlag">
				<view class="part" v-for="item,index in configDetInfo.couponInfoList" :key='index'>
					<view class="money">¥ <text class="num">{{item.discountValue}}</text></view>
					<view class="condition">{{item.condValue?((item.condType==2?"每满":'满') + item.condValue + "元可用") :"无门槛"}}</view>
				</view>
			</view>
			<!-- 4周 -->
			<block v-else>
				<view class="weeks">
					<block v-for="(item,index) in configDetInfo.weekSaveAmountMap" :key='index'>	
						<view class="part" :class="chooseWeeksClick==index?'active':''" @click="changeWeeks(index)">
							<text>第<block v-if="index==1">一</block>
							<block v-else-if="index==2">二</block>
							<block v-else-if="index==3">三</block>
							<block v-else-if="index==4">四</block>
							周</text>
							<text :class="item.status==1?'active':''">
								<block v-if="item.status==1">开放中</block>
								<block v-else-if="item.status==0">待开放</block>
								<block v-else>省{{item.totalSaveAmount}}元</block>
							</text>
						</view>
					</block>
				</view>
				<view class="count">
					<block v-if="chooseWeeksClick==chooseWeeksInit">本周领券时间剩余<text>{{configDetInfo.dayNumTillNextReceive}}天</text></block>
				</view>
				<view class="coupon">
					<view class="part" v-for="item in couponInfoList" :key='index' :class="[{'get':item.privilegeStatus==2},{'used':item.privilegeStatus==3},{'overdue':item.privilegeStatus==4||item.privilegeStatus==5}]">
						<view class="money">¥ <text class="num">{{item.discountValue}}</text></view>
						<view class="condition">{{item.condValue?((item.condType==2?"每满":'满') + item.condValue + "元可用") :"无门槛"}}</view>
						<view class="tag" @click="item.privilegeStatus==1&&chooseWeeksClick==chooseWeeksInit?receiveCoupon(item.couponTemplateId):''">
							<block v-if="item.privilegeStatus==1">可领取</block>							<block v-else-if="item.privilegeStatus==2">已领取</block>							<block v-else-if="item.privilegeStatus==3">已使用</block>
							<block v-else-if="item.privilegeStatus==5">已失效</block>
							<block v-else>已失效</block>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 权益2 -->
		<view class="rights second">
			<view class="title">
				<view class="icno">权益2</view>
				<text>{{configDetInfo.privilegeTitle2}}</text>
			</view>
			<view class="explain">
				<view class="headline">
					<text class="line"></text>省钱卡有效期内：
				</view>
				<text class="time" v-if="userCardInfo&&userCardInfo.balanceReturnAmount>0" @click="goConsumptionDetail()">已返 <text>{{userCardInfo.balanceReturnAmount}}元</text></text>
			</view>
			<view class="rebate" v-for="item,index in configDetInfo.returnBalanceConfigList" :key='index'>
				<view class="line_dot"></view>
				<view>累计消费<text class="num">{{item.triggerAmount}}</text>元返<text class="num">{{item.bonusAmount}}</text>元余额</view>
				<view class="line_dot"></view>
			</view>
		</view>
		
		<view class="openNews" v-if="couponCardMemberFlag&&remindFlag=='1'">
			<text class="left">开启消息提醒，优惠不再错过</text>
			<view class="btn" @click="authSms()">立即开启 <text class="arrow-right white"></text></view>
			<view class="close" @click="closeMessage"></view>
		</view>
		
		<!-- 活动规则 -->
		<uni-popup ref="rulePopup" type="center">
			<activeRule @closeRulePopup='closeRulePopup' :description='configDetInfo.activityRules'></activeRule>
		</uni-popup>
		
		<!-- 分享海报 -->
		<inviteNew></inviteNew>
		
		<!-- 邀请 -->
		<invite ref="invite" v-if="couponCardMemberFlag"></invite>
		
	</view>
</template>

<script>
	import activeRule from '@/pages/newUser/activeRule.vue';
	import inviteNew from '@/pages/newUser/inviteNew.vue'
	import customerApi from '@/api/customer/index.js';
	import invite from './invite.vue'
	
	import downLoadAndPreview from '@/common/js/downloadAndPreview.js'
	
	export default {
		components:{
			activeRule,
			inviteNew,
			invite
		},
		mixins:[downLoadAndPreview],
		data() {
			return {
				imgBaseUrlFiles:'',
				backToTop:'',
				defaultTitleDto:{
					title:'省钱月卡',
				},
				newUserInfo:"",
				shareInfo:{
					title:'开卡每月劲省236元',
					img:'http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/WechatIMG30.png'
				},
				couponCardMemberFlag:0,//是否开通 0、未开通 1、已开通
				users:[],
				configDetInfo:{},//省钱卡配置
				userCardInfo:{
				},// 用户省钱卡信息
				userInfo:'',//用户信息
				inviteCode:'',
				remindFlag:1, // 是否展示开启按钮 1 是 2否
				chooseWeeksInit:1,//选择周初始化int
				chooseWeeksClick:1,//点击第几周int
				couponInfoList:[],// 当前展示的周
				weekCardCouponMap:null,//用户省钱卡4周数据
			}
		},
		onLoad(query) {
			this.imgBaseUrlFiles = this.$config.imgBaseUrlFiles
			this.remindFlag = uni.getStorageSync("remindFlag")&&uni.getStorageSync("sessionId")?uni.getStorageSync("remindFlag"):1
			try{
				if(query && query.scene){
					this.inviteCode = decodeURIComponent(query.scene).split(",")[0]
				}else if(this.$Route.query.inviteCode){
					this.inviteCode = this.$Route.query.inviteCode
				}
				uni.setStorageSync("routerShareNumber",this.inviteCode)
			}catch(err){
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
			this.rollDisplay()
		},
		onShow() {			
			this.getConfig()
			if (uni.getStorageSync("sessionId")) {
				this.getUserCard()
			}
			this.userInfo =	 uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):''
		},
		onShareAppMessage(res) { //发送给朋友
			let code = this.userCardInfo&&this.userCardInfo.shareCode?this.userCardInfo.shareCode:''
			return {
				title: this.shareInfo.title,
				path: "/pages/moneySavingCard/index?inviteCode="+code,
				imageUrl: this.$config.imgBaseUrl + this.shareInfo.img
			}
		},
		onShareTimeline(res) { //分享到朋友圈
			let code = this.userCardInfo&&this.userCardInfo.shareCode?this.userCardInfo.shareCode:''
			return {
				title: this.shareInfo.title,
				path: "/pages/moneySavingCard/index?inviteCode="+code,
				imageUrl: this.$config.imgBaseUrl + this.shareInfo.img
			}
		},
		methods: {
			changeWeeks(index){ // 查看第几周
				this.chooseWeeksClick = index  //点击第几周
				this.couponInfoList = this.weekCardCouponMap[index].weekCouponList //选中周优惠券
			},
			closeRulePopup(){
				this.$refs.rulePopup.close()
			},
			openRulePopup(){
				this.$refs.rulePopup.open()
			},
			inviteOpen(){
				this.$refs.invite.openSharePopup()
			},
			authSms(){ // 短信开启
				customerApi.authSms().then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "订阅成功",
							icon: "none"
						})
						this.closeMessage()
					} else {
						this.$utils.hintMsg(res.data.message)
					}
				})
			},
			closeMessage(){ // 本次登录有效期不在出现
				this.remindFlag = 2
				uni.setStorageSync("remindFlag",2)
			},
			rollDisplay(){ // 滚动
				customerApi.rollDisplay().then(res => {
					if (res.data.code == 200) {
						this.users = res.data.data
					} else {
						this.$utils.hintMsg(res.data.message)
					}
				})
			},
			getConfig(){//获取省钱卡配置
				customerApi.getConfig().then(res => {
					if (res.data.code == 200) {
						this.configDetInfo = res.data.data
						
						// 省钱卡有效期内
						if(res.data.data.weekCardCouponMap){
							let weekCardCouponMap = res.data.data.weekCardCouponMap
							this.weekCardCouponMap = weekCardCouponMap
							for(let x in weekCardCouponMap){
								if(weekCardCouponMap[x].status == 1){
									this.chooseWeeksInit = x //选择周初始化
									this.chooseWeeksClick = x
									this.couponInfoList = weekCardCouponMap[x].weekCouponList //当前周优惠券
								}
							}
						}
						if(res.data.data.shareWords){
							this.shareInfo.title = res.data.data.shareWords
						}
						if(res.data.data.sharePic){
							this.shareInfo.img = res.data.data.sharePic
						}
						this.couponCardMemberFlag = res.data.data.couponCardMemberFlag 
					} else {
						this.$utils.hintMsg(res.data.message)
					}
				})
			},
			getUserCard(){ // 用户省钱卡信息
				customerApi.getUserCard().then(res => {
					if (res.data.code == 200) {
						this.userCardInfo = res.data.data
						this.remindFlag = res.data.data.remindFlag&&res.data.data.remindFlag==1?2:1 // 是否已经开启订阅
					} else {
						this.$utils.hintMsg(res.data.message)
					}
				})
			},
			cardPurchase(cardCycle,price,firstChargePrice){ //购买省钱卡
				if(!uni.getStorageSync("sessionId")){
					this.$Router.push({
						path:"/pages/login/index"
					})
					return
				}
				let parmas = {
					inviteCode:this.inviteCode,
					couponCardId:this.configDetInfo.couponCardConfigId,
					cardCycle,
					firstOpenFlag:this.configDetInfo.firstOpenFlag,
					orderTotal:this.configDetInfo.firstOpenFlag&&firstChargePrice?firstChargePrice:price
				}
				customerApi.cardPurchase(parmas).then(res => {
					if (res.data.code == 200) {
						this.$Router.push({
							path:"/pages/moneySavingCard/pay",
							query:{
								orderPayId:res.data.data.orderId,
								payPrice:res.data.data.orderTotal,
							}
						})
					} else {
						this.$utils.hintMsg(res.data.message)
					}
				})
			},
			receiveCoupon(id){ // 领取优惠券
				uni.showLoading({
					title:''
				})
				customerApi.receiveCoupon(id).then(res=>{
					if (res.data.code == 200) {
						setTimeout(()=>{
							uni.hideLoading()
							this.$utils.hintMsg('领取成功')
							this.getConfig()
						},2000)
					} else {
						uni.hideLoading()
						this.$utils.hintMsg(res.data.message)
					}
				})
			},
			goSavingDetail(){
				this.$Router.push({
					path:"/pages/moneySavingCard/savingRecords"
				})
			},
			goConsumptionDetail(){
				this.$Router.push({
					path:"/pages/moneySavingCard/consumptionRecords",
					query:{
						totalTsaAmount:this.userCardInfo.totalTsaAmount
					}
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	$width:690rpx;
	.pages {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
		background: #F6F6F6;
		
		padding-bottom: calc(130rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(130rpx + env(safe-area-inset-bottom));
		
	}
	.backgroundSize{
		background-size: 100%;
	}
	.displayMiddle{
		display: inline-block;
		vertical-align: middle;
	}
	.arrow-right {
	    display: inline-block;
	    width: 16rpx;
	    height: 16rpx;
	    border-top: 2px solid #fff;
	    border-right: 2px solid #fff;
	    transform: rotate(45deg);
	}
	.head{
		height: 300rpx;
		background-image: url($img-oss+'card_head.png?v1');
		@extend .backgroundSize;
		text-align: center;
		padding-top: 90rpx;
		position: relative;
		z-index: 1;
		&>text{
			font-size: 40rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.rule{
			position: absolute;
			top: 30rpx;
			right: 30rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.opening{
		position: relative;
		z-index: 3;
		width: 690rpx;
		height: 180rpx;
		margin: -124rpx auto 50rpx;
		padding: 26rpx 30rpx;
		@extend .backgroundSize;
		background-image: url($img-oss+'card_no_join.png');
		&.join{
			background-image: url($img-oss+'card_join.png');
			height: 340rpx;
			.save{
				font-size: 40rpx;
				font-weight: 600;
				color: #333333;
				line-height: 1;
				text-align: center;
				margin: -12rpx 0 0;
				text{
					font-size: 50rpx;
					color: #DE3150;
				}
			}
			.btn{
				width: 540rpx;
				height: 60rpx;
				line-height: 60rpx;
				background: linear-gradient(180deg, #F3A770 0%, #FE587A 51%, #FA3D63 100%);
				border-radius: 30rpx;
				text-align: center;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				margin: 14rpx auto 0;
			}
			.validity{
				width: 210rpx;
				height: 50rpx;
				@extend .backgroundSize;
				background-image: url($img-oss+'card_time.png');
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A0583A;
				line-height: 44rpx;
				text-align: center;
				position: absolute;
				right: -10rpx;
				top: 84rpx;
				z-index: 4;
			}
		}
		.top{
			display: flex;
			justify-content: space-between;
			margin-bottom:32rpx;
			&>text{
				font-size: 32rpx;
				font-weight: 600;
				color: #333333;
				line-height: 1.4;
			}
			.right{
				font-size: 28rpx;
				font-weight: 400;
				color: #603668;
				line-height: 1.4;
				text{
					display: inline-block;
					vertical-align: middle;
				}
				.ellipsis-one {
					max-width: 184rpx;
					width: auto;
				}
			}
		}
	}
	.swiperContent{
		margin: 24rpx auto 0;
		width: 100%;
		height: 64rpx;
		overflow: hidden;
		.swiper-item{
			font-size: 28rpx;
			font-weight: 500;
			color: #FFFFFF;
			width: 90%;
			height: 100%;
			margin: 6rpx 0;
			.headImg{
				@extend .displayMiddle;
				@extend .backgroundSize;
				width: 52rpx;
				height: 52rpx;
				border: 1px solid #fff;
				margin-right: 10rpx;
				border-radius: 50%;
			}
			text{
				@extend .displayMiddle;
				font-size: 24rpx;
				font-weight: 400;
				color: #907C99;
				line-height: 1.3;
				&.hong{
					color: #BD5A47;
				}
			}
			
		}
	}
	
	.card{
		display: flex;
		justify-content: space-between;
		width: 690rpx;
		margin: 0 auto;
		// flex-wrap: nowrap;
		// overflow-x: auto;

		.list{
			// min-width: 330rpx;
			// margin: 0 20rpx;
			width:330rpx;
			background: #FFFFFF;
			box-shadow: 0px 6px 8px 0px #DFDFDF;
			border-radius: 20rpx;
			position: relative;
			padding: 30rpx 20rpx;
			.first{
				width: 164rpx;
				height: 40rpx;
				background: linear-gradient(110deg, #FFFBF9 0%, #FFE9D1 85%, #FFD7AE 100%);
				border-radius: 20rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #DE3150;
				text-align: center;
				position: absolute;
				top: -20rpx;
				left: 20rpx;
			}
		}
		.info{
			margin-top: 4rpx;
			display: flex;
			justify-content: space-between;
			.left{
				text:first-child{
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					display: block;
					margin-bottom: 7rpx;
				}
				text:nth-child(2){
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 1.3;
				}
			}
			.money{
				font-size: 40rpx;
				font-weight: 600;
				color: #DE3150;
				line-height: 1.4;
				.dark{
					font-size: 24rpx;
					font-weight: 400;
					color: #666666;
				}
			}
		}
		.btn{
			width: 100%;
			height: 56rpx;
			background: linear-gradient(180deg, #FF2226 0%, #D80002 100%);
			border-radius: 28rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 56rpx;
			text-align: center;
			margin-top: 22rpx;
		}
	}
	
	.tips{
		text-align: center;
		margin: 20rpx 0;
		font-size: 24rpx;
		color: #999999;
		line-height: 1.3;
		text{
			@extend  .displayMiddle;
		}
		text:nth-child(2){
			margin: 0 10rpx;
		}
		.dot{
			width: 90rpx;
			height: 1px;
			border-bottom: 1px dashed #E1E1E1;
		}
		
	}
	
	.rights{
		width: $width;
		padding: 20rpx;
		// height: 434px;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: 0 auto 30rpx;
		.title{
			text-align: center;
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
			line-height: 1.4;
			display: flex;
			align-items: center;
			.icno{
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #732018;
				width: 110rpx;
				height: 40rpx;
				line-height: 40rpx;
				background: linear-gradient(141deg, #FEC589 0%, #FAB271 48%, #FCEEE3 100%);
				border-radius: 24rpx 24rpx 24rpx 0px;
				margin-right: 20rpx;
			}
		}
		.explain{
			line-height: 1.4;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 20rpx 0 30rpx;
			.headline{
				font-size: 28rpx;
				font-weight: 600;
				color: #654836;
				.line{
					width: 10rpx;
					height: 20rpx;
					background: linear-gradient(180deg, #FFDEBA 0%, rgba(255, 108, 99, 0.44) 100%);
					border-radius: 5rpx;
					display: inline-block;
					margin-right: 12rpx;
				}
			}
			.time{
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				text{
					color: #DE3150;
				}
			}
		}
	}
	.second{
		.explain .headline{
			color: #333333;
			font-weight: 400;
		}
		.rebate{
			display: flex;
			align-items:center ;
			width: 100%;
			height: 70rpx;
			background: linear-gradient(118deg, #FFF3F6 0%, #FEE4EA 100%);
			box-shadow: 0px 1px 3px 0px #F8D3DC;
			border-radius: 35rpx;
			margin-bottom: 20rpx;
			justify-content: center;
			view:nth-child(2){
				margin: 0 28rpx;
				color: #A1314C;
				.num{
					font-weight: 700;
				}
			}
			.line_dot{
				width: 94rpx;
				height: 4rpx;
				@extend .backgroundSize;
				background-image: url($img-oss+'card_line_dot.png');
				&:last-child{
					transform: rotateY(180deg);
				}
			}
		}
	}
	.coupon{
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		.part{
			width: 210rpx;
			height: 120rpx;
			margin-bottom: 30rpx;
			background-image: url($img-oss+'card_coupon.png');
			@extend .backgroundSize;
			&:nth-child(3n+2){
				margin: 0 10rpx;
			}
		}
		.money{
			font-size: 28rpx;
			font-weight: 600;
			color: #654836;
			line-height: 1.4;
			margin: 10rpx 0 6rpx;
			.num{
				font-size: 60rpx;
				line-height: 1;
				margin-left: 6rpx;
			}
		}
		.condition{
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #5B4831;
			line-height: 1.3;
		}
	}
	// 开通权益1
	.yes{
		.weeks{
			display: flex;
			.part{
				width: 154rpx;
				height: 90rpx;
				background-color: #F6F7F8;
				border-radius: 14rpx 14rpx 0 0;
				text-align: center;
				&:not(:last-child){
					margin-right: 10rpx;
				}
				&.active{
					background: url($img-oss+'card_week_bg.png') no-repeat;
					border-radius: none;
					background-size: 100% 100%;
					background-position: 0 -6rpx;
					text:first-child{
						color: #DE3150;
					}
				}
				text.active{
					width: 90rpx;
					height: 32rpx;
					background: #DE3150;
					border-radius: 16rpx;
					color: #FFFFFF;
					line-height: 32rpx;
					margin: 0 auto;
				}
				text{
					display: block;
					line-height: 1.3;
					color: #48403D;
				}
				text:first-child{
					font-size: 28rpx;
					font-weight: 600;
					margin-top: 8rpx;
					margin: 8rpx 0 4rpx;
				}
				text:nth-child(2){
					font-size: 24rpx;
					font-weight: 400;
				}
			}
		}
		.count{
			margin: 20rpx 0;
			height: 31rpx;
			text-align: center;
			font-size: 24rpx;
			font-weight: 400;
			color: #68574D;
			line-height: 1.3;
			text{
				color: #DE3150;
			}
		}
	
		.tag{
			font-size: 28rpx;
			font-weight: 600;
			color: #DE3150;
			line-height: 1.3;
			margin-top: 22rpx; 
		}
		.coupon .part{
			background-image: url($img-oss+'card_coupon_use.png');
			height: 172rpx;
			&.get{
				.tag{
					color: #60503D;
				}
			}
			&.used{
				.money,.condition,.tag{
					color: #E9C387;
				}
			}
			
			&.overdue{
				background-image: url($img-oss+'card_coupon_overdue.png');
				.money,.condition,.tag{
					color: #999999;
				}
			}
		}
	}
	
	.openNews{
		width: $width;
		height: 100rpx;
		@extend .backgroundSize;
		background-image: url($img-oss+'card_notice.png');
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 8;
		.left{
			font-size: 28rpx;
			font-weight: 500;
			color: #6C330B;
			line-height: 1.4;
			margin-right: 40rpx;
		}
		.btn{
			width: 170rpx;
			height: 46rpx;
			border-radius: 23rpx;
			border: 1px solid #FFFFFF;
			text-align: center;
			font-size: 24rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 46rpx;
		}
		.close{
			width: 30rpx;
			height: 30rpx;
			@extend .backgroundSize;
			background-image: url($img-oss+'card_close.png');
			position: absolute;
			right: 0;
			top: 0;
			z-index: 11;
		}
	}
	
	
	
	.shareImageBox{
		width: 100%;
		height: 100vh;
		.shareParent{
			width: calc(100vw - 60rpx);
			height: calc(100vh - 320rpx);
			margin: 0 auto;
			position: relative;
		}
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
		.imageBox{
			position: absolute;
			width: 100%;
			height: 80%;
			top: 10%;
			text-align: center;
		}
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
		image{
			width: 80rpx;
			height: 80rpx;
		}
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
