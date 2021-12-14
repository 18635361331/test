<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="giftCardHead">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/myGift_card_headerbg.png?233" mode="widthFix"></image>
			<view class="giftCardText">
				礼卡余额：
			</view>
			<view class="giftCardMoney">
				{{giftMoney}}
				<text>元</text>
			</view>
			<view class="giftCardSubTitle">文器库商城发行的专属预付购物储值卡</view>
			<view class="bindGiftCard" @click="openCardPopup">
				礼卡绑定
			</view>
		</view>
		<view class="giftCardRow" @click="$Router.push({path:'/pages/myGiftList/index'})">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/my_card@2x.png?3" mode=""></image>
			<view class="giftCardRowText">
				<view class="giftCardTitle">
					我的礼卡
				</view>
				<view class="giftCardSub">
					可查看自己的所有礼卡使用情况
				</view>
			</view>
		</view>
		<view class="giftCardRow" @click="$Router.push({path:'/pages/myGiftCardOrderList/index'})">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_order@2x.png?1" mode=""></image>
			<view class="giftCardRowText">
				<view class="giftCardTitle">
					礼卡订单
				</view>
				<view class="giftCardSub">
					可查看所有购买礼卡记录
				</view>
			</view>
		</view>
		<view class="giftCardRow" @click="$Router.push({path:'/pages/giftCardRecord/index'})">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_record@2x.png?2" mode=""></image>
			<view class="giftCardRowText">
				<view class="giftCardTitle">
					消费记录
				</view>
				<view class="giftCardSub">
					可查看所有礼卡使用消费记录
				</view>
			</view>
		</view>
		<view class="giftBanner" @click="goToGiftCardList"></view>
		<uni-popup ref="popup" type="center">
			<view class="cardPopup">
				<view class="closeBtn" @click="closeCardPopup"></view>
				<view class="cardTitle">
					绑定
				</view>
				<view class="cardInput">
					<input class="cardInputBox" v-model="cardInfo.cardNo" type="text" placeholderClass="placeholder" placeholder="请输入卡号">
					<input class="cardInputBox" v-model="cardInfo.pwd" type="password" placeholderClass="placeholder" placeholder="请输入卡密">
				</view>
				<view class="bindBtn" @click="sureBind">
					绑定
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js'
	export default {
		data() {
			return {
				giftMoney: 0,	//礼卡余额
				cardInfo:{	//礼卡绑定参数
					cardNo:"",
					pwd:""
				},
				defaultTitleDto:{
					title:'我的礼卡',
				}
			}
		},
		methods: {
			totalBalance() { //获取礼卡余额
				appApi.totalBalance().then(res => {
					if (res.data.code == 200) {
						this.giftMoney = res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			openCardPopup() { //打开礼卡绑定弹窗
				this.$refs.popup.open()
			},
			closeCardPopup(){	//关闭礼卡弹窗
				this.$refs.popup.close()
			},
			sureBind(){	//绑定礼卡触发事件
				if(!this.cardInfo.cardNo){
					uni.showToast({
						title:"请输入卡号",
						icon:"none"
					})
					return
				}
				if(!this.cardInfo.pwd){
					uni.showToast({
						title:"请输入卡密",
						icon:"none"
					})
					return
				}
				if(this.cardInfo.pwd.length!=6){
					uni.showToast({
						title:"请输入6位密码",
						icon:"none"
					})
					return
				}
				this.bindCard()
			},
			bindCard(){	//绑定礼卡
				appApi.bindCard(this.cardInfo).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"礼卡绑定成功",
							icon:"none"
						})
						this.totalBalance()
						this.closeCardPopup()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToGiftCardList(){
				this.$Router.push({
					path:"/pages/giftCardList/index"
				})
			}
		},
		onShow() {
			this.zhuge.track("我的礼卡页面")
			this.totalBalance()
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		background-color: #F4F4F4;
		min-height: 100vh;
		padding-bottom: 48rpx;
	}

	.giftCardHead {
		width: 100%;
		padding-top: 30rpx;
		position: relative;
	}

	.giftCardText {
		position: absolute;
		top: 94rpx;
		left: 64rpx;
		color: #FFFFFF;
		font-size: 34rpx;
	}

	.giftCardMoney {
		position: absolute;
		left: 64rpx;
		top: 168rpx;
		font-size: 110rpx;
		color: #FFFFFF;
	}

	.giftCardMoney text {
		font-size: 30rpx;
	}

	.giftCardSubTitle {
		position: absolute;
		left: 64rpx;
		bottom: 100rpx;
		color: #FFFFFF;
	}

	.bindGiftCard {
		width: 124rpx;
		height: 40rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 33rpx;
		border-bottom-left-radius: 33rpx;
		position: absolute;
		bottom: 200rpx;
		right: 30rpx;
		color: #FF1558;
		text-align: center;
		line-height: 40rpx;
		font-size: 24rpx;
	}

	.giftCardRow {
		height: 196rpx;
		width: 690rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		margin-bottom: 24rpx;
		border-radius: 12rpx;
		padding: 0 32rpx;
	}

	.giftCardRow image {
		width: 112rpx;
		height: 112rpx;
	}

	.giftCardRowText {
		flex: 1;
		margin: 38rpx 0 30rpx 56rpx;
	}

	.giftCardTitle {
		font-size: 36rpx;
		margin-bottom: 20rpx;
		font-weight: 700;
		color: #333333;
	}

	.giftCardSub {
		font-size: 24rpx;
		color: #999999;
	}

	.arrow {
		width: 12rpx;
		height: 24rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
	}

	.cardPopup {
		width: 600rpx;
		height: 480rpx;
		background-color: #FFFFFF;
		padding: 23rpx 40rpx 46rpx;
		border-radius: 30rpx;
		position: relative;
	}

	.cardTitle {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #333333;
		font-size: 32rpx;
	}

	.cardInput {
		width: 520rpx;
		padding-top: 18rpx;
		padding-bottom: 50rpx;
	}

	.cardInputBox {
		width: 100%;
		height: 98rpx;
		border-bottom: 1rpx solid #E4E4E4;
	}

	.bindBtn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background-color: #FF1558;
		color: #FFFFFF;
		font-size: 36rpx;
		border-radius: 71rpx;
	}
	.closeBtn{
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: 30rpx;
		right: 40rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png) no-repeat 50%;
		background-size: 50rpx 50rpx;
	}
	.giftBanner{
		width: 690rpx;
		height: 200rpx;
		margin: auto;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/giftCardBanner.png) no-repeat 50%;
		background-size: 100%;
	}
</style>
