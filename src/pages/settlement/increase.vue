<template>
	<view class="page settlement">
		<defaultTitle :dto="{title:'填写订单',bottomColor:'#E6E6E6'}"></defaultTitle>
			<view class="shopName">
				{{orderInfo.storeName}}
			</view>
			<view class="goodsCont">
				<image :src="imgBaseUrls+orderInfo.goodsImage" mode=""></image>
				<view class="goodsInfo">
					<view class="goodsText ellipsis-two">
						{{orderInfo.goodsName}}
					</view>
					<view class="goodsPrice">
						<text>¥{{orderInfo.goodsPrice}}</text>
						<text class="goodsNum">x{{orderInfo.goodsNum}}</text>
					</view>
				</view>
			</view>
			
			<view class="fmGoodsMsg">
				<text>运费</text>
				<text class="colorChange">{{orderInfo.freightAmount?"￥"+orderInfo.freightAmount:"包邮"}}</text>
			</view>
		<view class="integralMain">
			<text>使用库豆</text>
			<text class="intergalInfo" v-if="orderGoldCount.accountGold>0 && orderGoldCount.canUseGold">库豆{{orderGoldCount.accountGold}},本次可抵用￥{{orderGoldCount.canUseGold}}</text>
			<text class="intergalInfo" v-if="orderGoldCount.accountGold>0 && !orderGoldCount.canUseGold">购买的商品不支持使用库豆支付</text>
			<text class="intergalInfo" v-if="orderGoldCount.accountGold<=0">本次无可用库豆</text>
			<view class="intergalBtn">
				<switch style="transform: scale(0.7,0.7);" :disabled='orderGoldCount.canUseGold<=0'  :checked="deductionFlag.gold" color='#FF1558' @change="goldChange" />
			</view>
		</view>
		<view class="integralMain scoreBox">
			<text>使用积分</text>
			<text class="intergalInfo" v-if="orderScoreCount.usefulScoreNum>0">本次可用{{orderScoreCount.usefulScoreNum}},本次可抵用￥{{orderScoreCount.score}}</text>
			<text class="intergalInfo" v-if="orderScoreCount.usefulScoreNum<=0">本次无可用积分</text>
			<view class="intergalBtn">
				<switch style="transform: scale(0.7,0.7);" :disabled='orderScoreCount.score<=0' :checked="deductionFlag.score" color='#FF1558' @change="scoreChange" />
			</view>
		</view>
		<view class='deduction'>
			<text>商品金额</text>
			<text>￥{{orderSummaryInfo.goodsFinalAmount}}</text>
		</view>
		<view class='deduction' v-if="orderSummaryInfo.freightAmount>0">
			<text>运费</text>
			<text>￥{{orderSummaryInfo.freightAmount}}</text>
		</view>
		<!-- <view class='deduction' v-if='orderSummaryInfo.couponAmount>0'>
			<text>优惠券</text>
			<text>-￥{{orderSummaryInfo.couponAmount}}</text>
		</view> -->
		<view class='deduction' v-if='orderSummaryInfo.socreAmount>0'>
			<text>积分抵扣</text>
			<text>-￥{{orderSummaryInfo.socreAmount}}</text>
		</view>
		<view class='deduction' v-if="orderSummaryInfo.goldAmount>0">
			<text>库豆抵扣</text>
			<text>-￥{{orderSummaryInfo.goldAmount}}</text>
		</view>
		<view class="goPayBox">
			<view class="payText">实付款：<text class="symbol">￥</text><text class="payAmount">{{orderSummaryInfo.payAmount?orderSummaryInfo.payAmount:0}}</text></view>
			<view class="submitBtn" @click="submitOrder">提交订单</view>
		</view>
		<!-- 输入密码 -->
		<pswPopup ref='pswPopup' @openForgetPopup='openForgetPopup' @submitPay='setSubmitPsw'></pswPopup>
		<!-- 设置支付密码 -->
		<setPayPwd ref='setPayPwd' :payInfo='orderInfo' @openPswPopup='openPswPopup' @submitPay='setSubmitPsw'></setPayPwd>
		<!-- 忘记密码 -->
		<forgetPayPsw ref='forgetPayPsw' :payInfo='orderInfo' @openPswPopup='openPswPopup' @submitPay='setSubmitPsw'></forgetPayPsw>
		<!-- 输入支付验证码 -->
		<verificationCode ref='verificationCode' :payInfo='orderInfo' @codeSubmit='codeSubmit'></verificationCode>
		<share :shareImageList='shareImage'></share>
		<!-- #ifdef MP-WEIXIN -->
			<view v-if="(hideFMCanvas != undefined) && !hideFMCanvas">
				<canvas canvas-id='tdcanvas' style='margin-top:200rpx'></canvas>
			</view>
		<!-- #endif  -->
	</view>
</template>

<script>
	
	import tradeApi from '@/api/trade/index.js';
	import memberApi from '@/api/member/index.js'
	import storeCoupons from './storeDiscount.vue'	//店铺优惠券
	import storePromotionView from './storePromotionView.vue'	//促销活动
	import setPayPwd from '@/pages/pay/setPayPsw/index.vue'
	import forgetPayPsw from '@/pages/pay/forgetPayPsw/index.vue'
	import pswPopup from '@/pages/pay/passwordPopup/index.vue'
	import verificationCode from '@/pages/pay/verificationCode/index.vue'
	// #ifdef MP-WEIXIN
	import fmagent from '@/common/js/fmagent.js'
	// #endif
	
	export default {
		//  #ifdef MP-WEIXIN
		mixins:[fmagent],
		// #endif
		data() {
			return {
				orderInfo: {},
				imgBaseUrls: "",
				orderGoldCount: { //库豆
					canUseGold: "", //可抵用金额
					accountGold: "", //库豆总额
				},
				platformPromotsParams:{	//平台优惠券请求参数
					lotteryId:'',
					addressId:'',
					orders:[]
				},
				orderSummaryParams:{},//请求总订单价格参数
				orderScoreCount: { //积分
					usefulScoreNum: "", //可用积分
					score: "" //抵扣金额
				},
				orderSummaryInfo:{},	//实付金额信息
				deductionFlag:{	//所有抵扣的开关
					score:false,	//积分开关
					gold:true,	//库豆
				},
				submitFlag:true,	//提交开关、做防抖
			}
		},
		onShow() {
			//#ifdef MP-WEIXIN
				this.fmagentInit()
			//#endif
			
			this.zhuge.track("填写订单-落地页")
			for(let i in this.deductionFlag){
				this.deductionFlag[i]=false
			}
			this.imgBaseUrls = this.$config.imgBaseUrl;
			let params = this.initParams()
			this.giftBagPageInit(params)
		},
		
		components:{
			storePromotionView,
			setPayPwd,
			forgetPayPsw,
			verificationCode,
			pswPopup
		},
		methods: {
			initParams(){
				return {
					itemId: this.$Route.query.goodsId,
					goodsNum: this.$Route.query.goodsNum,
					inviterCode:uni.getStorageSync("routerShareNumber")?uni.getStorageSync("routerShareNumber"):"",
				}
			},
			giftBagPageInit(params) { //初始化订单信息
				uni.showLoading({
					title:"加载中..."
				})
				tradeApi.giftBagPageInit(params).then(res => {
					if (res.data.code == 200) {
						this.orderInfo = res.data.data;
						this.giftBagGoldOrder()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			giftBagGoldOrder(){	//购物金可用情况
				tradeApi.giftBagGoldOrder(this.initParams()).then(res=>{
					if (res.data.code == 200) {
						this.orderSummaryParams.goldAmount=res.data.data.canUseGold
						this.orderGoldCount = res.data.data;
						if(!this.orderGoldCount.canUseGold){
							this.deductionFlag.gold = false
						}else{
							this.deductionFlag.gold = true
						}
						this.giftBagScoreOrder()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},	
			giftBagScoreOrder(){	//积分使用情况
				tradeApi.giftBagScoreOrder(this.initParams()).then(res=>{
					if (res.data.code == 200) {
						this.orderScoreCount = res.data.data;
						this.giftBagSummaryOrder()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			giftBagSummaryOrder() { //获取总订单价格
				this.orderSummaryParams = Object.assign(this.orderSummaryParams,this.initParams())
				tradeApi.giftBagSummaryOrder(this.orderSummaryParams).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						this.orderSummaryInfo = res.data.data;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			submitOrder() { //提交订单判断
				if(this.orderSummaryInfo.payAmount==0 && this.deductionFlag.score){
					if(this.orderInfo.riskCheck.riskLevel == "HIGH"){
						uni.showToast({
							title:"抱歉检测到本次交易异常，为了您的账号安全，请稍后再试或联系客服处理，联系方式：400-100-8246",
							icon:"none"
						})
					}else if(this.orderInfo.riskCheck.riskLevel == "MID"){
						this.$refs.verificationCode.openVerificationCode();
					}else{
						if(this.orderInfo.riskCheck.firstAddrMobile && !this.orderInfo.riskCheck.monthNewMember && this.orderScoreCount.score>this.orderInfo.riskCheck.unsafeAmt){
							this.$refs.verificationCode.openVerificationCode();
						}else{
							this.openPswPopup()//打开密码弹窗	
						}
					}
				}else{
					this.giftBagSubmitOrder()
				}
			},
			openPswPopup(){	//判断是否已设置过密码
				if (this.orderInfo.hasPayPwd) {
					this.$refs.pswPopup.openPswPopup();
				} else { //没有设置过密码  打开设置密码
					this.$refs.setPayPwd.openNoPswPopup()
				}
			},
			codeSubmit(code){	//用户安全等级过低时 触发验证码  点击确定  提交订单
				this.$set(this.orderSummaryParams,"code",code);
				this.submit()
			},
			giftBagSubmitOrder(){	//提交订单
				if(!this.submitFlag){
					return
				}
				this.submitFlag = false
				tradeApi.giftBagSubmitOrder(this.orderSummaryParams).then(res => {
					this.submitFlag = true
					if (res.data.code == 200) {
						this.$refs.verificationCode.closeVerificationCode()
						if(this.orderSummaryInfo.payAmount==0){
							this.$Router.replace({
								path:"/pages/payment/index",
								query:{
									payId:res.data.data.payId,
									newtype:this.$Route.query.newtype||"",
									increase:true
								}
							})
						}else{
							this.$Router.replace({
								path:"/pages/pay/index",
								query:{
									payId:res.data.data.payId,
									newtype:this.$Route.query.newtype || "",
									increase:true
								}
							})
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			goldChange(e) { //库豆开关变化时触发
				this.deductionFlag.gold = e.detail.value
				if(e.detail.value){
					this.orderSummaryParams["goldAmount"] = this.orderGoldCount.canUseGold
				}else{
					this.orderSummaryParams["goldAmount"] = 0
				}
				
				this.giftBagSummaryOrder()
			},
			scoreChange(e){	//积分开关变化时触发
				this.deductionFlag.score = e.detail.value
				if(e.detail.value){
					this.orderSummaryParams["scoreNum"] = this.orderScoreCount.usefulScoreNum
				}else{
					this.orderSummaryParams["scoreNum"] = 0
				}
				this.giftBagSummaryOrder()
			},
			openForgetPopup() { //打开忘记支付密码弹窗
				this.$refs.forgetPayPsw.openForgetPopup();
			},
			setSubmitPsw(password) { //子集修改密码/重置密码/输入密码后点击确定触发  赋值支付密码
				this.$set(this.orderSummaryParams,"password",password)
				this.submit()
			},
		}
	}
</script>

<style scoped>

	.settlement {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}

	.settlementTitle {
		width: 100%;
		line-height: 40rpx;
		color: #333;
		display: flex;
		font-size: 34rpx;
		font-weight: 700;
	}

	.telephone {
		margin-left: 20rpx;
	}

	.addressMain {
		width: 90%;
		color: #333333;
		line-height: 36rpx;
		margin-top: 24rpx;
	}

	.arrow {
		width: 10rpx;
		height: 20rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 10rpx 20rpx;
		position: absolute;
		right: 24rpx;
		top: 50%;
		margin-top: -10rpx;
	}

	.settlementLine {
		height: 8rpx;
		width: 100%;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pic_ct.png) no-repeat 50%;
		background-size: 100% 8rpx;
	}

	.addressChange {
		width: 100%;
		margin-bottom: 0.2rem;
		padding-left: 0.24rem;
		color: #FF1558
	}

	.orderMain {
		width: 100%;
		margin-bottom: 60rpx;
	}
	
	.shopName {
		width: 100%;
		line-height: 42rpx;
		padding: 34rpx 24rpx 12rpx;
		font-size: 30rpx;
		color: #333333;
		font-weight: 700;
	}

	.goodsCont {
		position: relative;
		width: 100%;
		display: flex;
		padding: 10rpx 24rpx;
	}

	.goodsCont image {
		width: 220rpx;
		height: 220rpx;
	}

	.goodsInfo {
		padding: 20rpx 0;
		margin-left: 24rpx;
		flex: 1;
		position: relative;
	}

	.goodsText {
		width: 100%;
		max-height: 80rpx;
		color: #333333;
	}

	.goodSpce {
		width: 100%;
		height: 28rpx;
		line-height: 28rpx;
		font-size: 24rpx;
		color: #999999;
		margin-top: 12rpx;
	}

	.goodsPrice {
		height: 44rpx;
		line-height: 44rpx;
		position: absolute;
		bottom: 20rpx;
		color: #FF1558;
		width: 100%;
		font-size: 30rpx;
	}

	.goodsNum {
		position: absolute;
		right: 0;
		top: 0;
		color: #999999;
		font-size: 30rpx;
	}

	.fmGoodsMsg {
		width: calc(100% - 48rpx);
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		align-items: center;
		display: flex;
		border-bottom: 1px solid #E6E6E6;
	}

	.colorChange {
		color: rgba(153, 153, 153);
		line-height: 44rpx;
		height: 44rpx;
		text-align: right;
		font-size: 28rpx;
	}
	
	.activityBox{
		display: inline-block;
		height: 32rpx;
		line-height: 32rpx;
		font-size: 22rpx;
		text-align: center;
		padding: 0 14rpx;
		border-radius: 100rpx;
		color: #ff7e18;
		background: #ffeee1;
	}
	.promotionsActivityBox{
		display: inline-block;
		height: 32rpx;
		line-height: 32rpx;
		font-size: 20rpx;
		text-align: center;
		padding: 0 14rpx;
		border-radius: 100rpx;
		background: #242424;
		color: #ffdf8c;
	}
	.fmGoodsMsg input {
		font-size: 24rpx;
		flex: 1;
		margin-left: 20rpx;
		height: 100%;
		line-height: 88rpx;
	}

	.price {
		font-size: 24rpx;
		color: #333333;
	}

	.goPayBox {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		bottom: calc(0rpx + constant(safe-area-inset-bottom));
		bottom: calc(0rpx + env(safe-area-inset-bottom));
		border-top: 1rpx solid #E6E6E6;
		z-index: 9;
	}

	.payText {
		flex: 1;
		color: #4a4a4a;
		text-align: right;
		margin-right: 48rpx;
		line-height: 100rpx;
	}

	.submitBtn {
		width: 252rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		background-color: #FF1558;
	}

	.nullAddress {
		line-height: 40rpx;
		font-size: 34rpx;
		font-weight: 700;
	}

	.integralMain {
		height: 88rpx;
		width: 100%;
		display: flex;
		margin-left: 24rpx;
		align-items: center;
		border-bottom: 1rpx solid #E4E4E4;
		padding-right: 24rpx;
	}
	.separatePromotion {
		padding: 0 24rpx;
	}
	.marking_plus{
		display: inline-block;
		background: #080f23;
		border-radius: 8px 8px 8px 2px;
		font-size: 11px;
		color: #ffe9d3;
		padding: 0 7px;
		margin-left: 20rpx;
	}
	.intergalInfo {
		font-size: 22rpx;
		color: #999999;
		flex: 1;
		text-align: right;
	}

	.intergalBtn {
		width: 89rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
	}

	.discountPrice {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 24rpx;
	}

	.priceSymbol {
		font-size: 24rpx;
		color: #FF1558;
	}

	.symbolPrice {
		font-size: 32rpx;
		color: #FF1558;
		margin-right: 12rpx;
	}
	.symbol{
		font-size: 22rpx;
		color: #FF1558;
	}
	.payAmount{
		color: #FF1558;
		font-size: 32rpx;
	}
	.deduction{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 24rpx;
		color: #333333;
		height: 40rpx;
		line-height: 40rpx;
	}
	.scoreBox{
		margin-bottom: 40rpx;
	}
	.member_identification{
		height: 26rpx;
		width: calc(100% - 48rpx);
		margin: 20rpx auto 10rpx;
	}
	.cartHint{
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		position: fixed;
		color: #8E5B17;
		background-color: #fbf4ea;
		font-size: 24rpx;
		font-weight: 400;
		bottom: calc(100rpx + constant(safe-area-inset-bottom));
		bottom: calc(100rpx + env(safe-area-inset-bottom));
		z-index: 9;
	}
	.cartHint text{
		color: #333;
		font-weight: 500;
	}
	.goBuyBtn{
		color: #8E5B17;
		font-weight: 500;
	}
	.cartHint .memberGoodsPrice{
		color: #FF1558;
	}
	.deliveryTime{
		width: calc(100% - 40rpx);
		height: 58rpx;
		background-color: #FEE5EB;
		margin: 5rpx auto;
		border-radius: 20rpx;
		color: #FE325C;
		font-size: 24rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
	}
	.deliveryTime image{
		width: 20rpx;
		height: 20rpx;
		margin-right: 12rpx;
	}
</style>
