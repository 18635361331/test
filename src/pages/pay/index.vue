<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="orderPrice">
			应付
			<text class="orderAmount" v-if="payInfo.payedSummary">￥{{surplusMoney?surplusMoney:""}}</text>
			<text class="orderAmount" v-else>￥{{payInfo.orderAmount?payInfo.orderAmount:""}}</text>
			<view class="orderDetailsBtn" @click="payFlag=!payFlag">
				{{payFlag?"收起":"详情"}}
				<text :class="payFlag?'active':''"></text>
			</view>
		</view>
		<view class="orderPriceMain" v-if="payFlag">
			<view class="everyRow">
				<text>商品金额</text>
				<text>￥{{payInfo.orderSummary.goodsAmount}}</text>
			</view>
			<view class="everyRow">
				<text>运费</text>
				<text>￥{{payInfo.orderSummary.freightAmount}}</text>
			</view>
			<view class="everyRow">
				<text>库豆抵扣</text>
				<text>-￥{{payInfo.orderSummary.goldAmount}}</text>
			</view>
			<view class="everyRow">
				<text>积分抵扣</text>
				<text>-￥{{payInfo.orderSummary.scorePayedAmount}}</text>
			</view>
		</view>
		<view class="myWalletHead">
			文器库商城支付
		</view>
		<view class="myWalletInfo" v-if="!payInfo.payedSummary">
			<view class="mask" v-if="payInfo.memberAsset && payInfo.memberAsset.balance<=0"></view>
			<view class="walletIcon"></view>
			<view class="walletText">
				<view class="walletType">
					账户余额
				</view>
				<view class="walletPrice">
					余额￥{{payInfo.memberAsset?payInfo.memberAsset.accountBalance:0}} 可用￥{{payInfo.memberAsset.balance?payInfo.memberAsset.balance:0}}
				</view>
			</view>
			<view class="payPrice" v-if="chooseTypeList.indexOf('账户余额')!='-1'">
				￥{{payInfo.memberAsset.balanceUseMoney}}
			</view>
			<view class="payChooseBtn" @click.stop="accountChange()" :class="chooseTypeList.indexOf('账户余额')!='-1'?'active':''"></view>
		</view>
		<!-- 余额支付后进行站外支付展示信息 -->
		<view class="myWalletInfo" v-if="payInfo.payedSummary && payInfo.payedSummary.balanceAmount">
			<view class="walletIcon"></view>
			<view class="walletText">
				<view class="walletType">
					账户余额
				</view>
			</view>
			<view class="payPrice">
				￥{{payInfo.payedSummary.balanceAmount?payInfo.payedSummary.balanceAmount:0}}
			</view>
		</view>
		<view class="myWalletInfo" @click="openGiftCardPopup" v-if="payInfo.memberAsset && !payInfo.payedSummary">
			<view class="mask" v-if="payInfo.memberAsset.cardAmount<=0"></view>
			<view class="walletIcon icon_m"></view>
			<view class="walletText">
				<view class="walletType">
					礼卡
				</view>
				<view class="walletPrice">
					余额￥{{payInfo.memberAsset.accountCard}} 可用￥{{payInfo.memberAsset.cardAmount}}
				</view>
			</view>
			<view class="payPrice" v-if="chooseTypeList.indexOf('礼卡')!='-1'">
				￥{{payInfo.memberAsset.cardUseMoney}}
			</view>
			<view v-if="!this.payInfo.payedSummary" class="payChooseBtn" @click.stop="giftChange" :class="chooseTypeList.indexOf('礼卡')!='-1'?'active':''"></view>
		</view>
		<view class="myWalletInfo" @click="openGiftCardPopup" v-if="payInfo.payedSummary && payInfo.payedSummary.cardAmount">
			<view class="walletIcon icon_m"></view>
			<view class="walletText">
				<view class="walletType">
					礼卡
				</view>
			</view>
			<view class="payPrice">
				-￥{{payInfo.payedSummary.cardAmount}}
			</view>
		</view>

		<view class="myWalletHead">
			其它方式支付
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<view class="payType" v-if="!isWxFlag">
			<view class="mask" v-if="surplusMoney<=0"></view>
			<view class="alipayIcon"></view>
			<view class="payText">
				支付宝支付
			</view>
			<view class="payPrice" v-if="chooseTypeList.indexOf('支付宝')!='-1'">
				￥{{Number(surplusMoney).toFixed(2)}}
			</view>
			<view class="payChooseBtn" @click="outsideStationChange('支付宝')" :class="chooseTypeList.indexOf('支付宝')!='-1'?'active':''"></view>
		</view>
		<!-- #endif -->
		<view class="payType" v-if="isWxFlag">
			<view class="mask" v-if="surplusMoney<=0"></view>
			<view class="weixinIcon"></view>
			<view class="payText">
				微信
			</view>
			<view class="payPrice" v-if="chooseTypeList.indexOf('微信')!='-1'">
				￥{{Number(surplusMoney).toFixed(2)}}
			</view>
			<view class="payChooseBtn" @click="outsideStationChange('微信')" :class="chooseTypeList.indexOf('微信')!='-1'?'active':''"></view>
		</view>
		<view class="surePayBtn" @click="openPswPopup" v-if="payInfo.payedSummary">
			{{chooseTypeList.length>1?"组合":chooseTypeList[0]}}支付￥{{surplusMoney}}元
		</view>
		<view class="surePayBtn" @click="openPswPopup" v-else>
			{{chooseTypeList.length>1?"组合":chooseTypeList[0]}}支付￥{{payInfo.orderAmount?payInfo.orderAmount:""}}元
		</view>
		<pswPopup ref='pswPopup' @openForgetPopup='openForgetPopup' @submitPay='setSubmitPsw'></pswPopup>
		<setPayPwd ref='setPayPwd' :payInfo='payInfo' @openPswPopup='openPswPopup' @submitPay='setSubmitPsw'></setPayPwd>
		<forgetPayPsw ref='forgetPayPsw' :payInfo='payInfo' @openPswPopup='openPswPopup' @submitPay='setSubmitPsw'></forgetPayPsw>
		<verificationCode ref='verificationCode' :payInfo='payInfo' :isSendSMS='true' @codeSubmit='codeSubmit'></verificationCode>
		<cardList ref='giftCard' :cardInfo='cardInfo' :payInfo='payInfo' @cardAmountChange='cardAmountChange'></cardList>
		<!-- #ifdef MP-WEIXIN -->
			<view v-if="(hideFMCanvas != undefined) && !hideFMCanvas">
				<canvas canvas-id='tdcanvas' style='margin-top:200rpx'></canvas>
			</view>
		<!-- #endif  -->
	</view>
</template>

<script>
	/*
		收银台逻辑
		拿到详情信息去判断是否有余额  如果存在 放入chooseTypeList数组中  并且重新获取礼卡信息 用来判断礼卡是否可用
		调用judgeSurplusMoney判断已选的站内支付金额是否足够支付订单  如果不足 进行判断平台类型（支付宝/微信）
		如果两者都存在 默认勾选微信
		选中按钮以及底部按钮展示文案  按照chooseTypeList的长度以及是否存在该类型来做判断
		
		
	*/
	import tradeApi from '@/api/trade/index.js'
	import payMentApi from '@/api/payment/index.js'
	import wechatApi from '@/api/wechat/index.js'
	import setPayPwd from '@/pages/pay/setPayPsw/index.vue'
	import forgetPayPsw from '@/pages/pay/forgetPayPsw/index.vue'
	import pswPopup from '@/pages/pay/passwordPopup/index.vue'
	import verificationCode from '@/pages/pay/verificationCode/index.vue'
	import cardList from './cardList/index.vue'
	// #ifdef MP-WEIXIN
	import fmagent from '@/common/js/fmagent.js'
	// #endif
	export default {
		//  #ifdef MP-WEIXIN
		mixins:[fmagent],
		// #endif
		data() {
			return {
				payInfo: { //支付详细信息
				},
				payFlag: false, //详情是否展示
				submitParams: { //提交支付
					payId: "",
					score: 0,
					password: "",
					thirdPayAmount: 0,
					thirdPayMethod: "alipay",
					cardAmount: 0,
					balance: ""
				},
				cardInfo: {}, //礼卡相关数据
				isWxFlag: true, //是否在微信浏览器中  1为小程序   true公众号  false 普通浏览器
				chooseTypeList: [], //选中的类型列表  当大于一种类型支付时为组合支付  否则为勾选类型支付
				surplusMoney: 0, //剩余支付金额
				oldBalance: 0, //账户余额  初始化时记录最大可用账户余额 在礼卡时取消选中时回显是否有可用余额
				wxCode:"",	//公众号code
				defaultTitleDto:{
					title:'收银台',
				}
			}
		},
		methods: {
			summary() { //获取支付详情
				tradeApi.summary(this.$Route.query.payId).then(res => {
					if (res.data.code == 200) {
						// 允许最大使用站内支付金额   如果余额查过限制  将可用余额赋值为最大使用站内余额
						if (res.data.data.maxPkgPay < res.data.data.memberAsset.balance) {
							res.data.data.memberAsset.balance=res.data.data.maxPkgPay
						}
						this.oldBalance = res.data.data.memberAsset.balance
						this.payInfo = res.data.data;
						// 初始化选中支付类型
						this.initChoose()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			async initChoose() { //初始化选中支付类型
				// 第一次进入收银台  没有进行过订单站内的支付
				if (!this.payInfo.payedSummary) { //没有进行过站内支付 
					if (this.payInfo.memberAsset.balance) {
						this.chooseTypeList.push("账户余额");
						this.$set(this.payInfo.memberAsset, "balanceUseMoney", this.payInfo.memberAsset.balance)
						await this.defaultCards() //支付信息变化后用来获取礼卡可用信息及列表
					}
					// 如果礼卡可用余额大于0的话 勾选礼卡
					if (this.payInfo.memberAsset.cardAmount) {
						this.chooseTypeList.push("礼卡");
						this.$set(this.payInfo.memberAsset, "cardUseMoney", this.payInfo.memberAsset.cardAmount)
						await this.defaultCards();
					}
					// 如果站内支付不足以支付的话
					this.judegChooseOther()
				} else { //已经进行过站内支付   
					this.surplusMoney = this.payInfo.needPay;
					this.judegChooseOther();
				}
			},
			async defaultCards() { //用户更改支付类型时获取礼卡可用信息
				let params = {
					balance: this.chooseTypeList.indexOf("账户余额") != "-1" ? this.payInfo.memberAsset.balanceUseMoney : 0,
					payId: this.$Route.query.payId,
					cardAmount: this.chooseTypeList.indexOf("礼卡") != "-1" ? this.payInfo.memberAsset.cardUseMoney : 0
				}
				await tradeApi.defaultCards(params).then(res => {
					if (res.data.code == 200) {
						this.cardInfo = res.data.data;
						//更改可用礼卡余额
						this.$set(this.payInfo.memberAsset, "cardAmount", res.data.data.usefulAmount)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			judgeSurplusMoney() { //判断去除站内支付是否还有待支付余额 是否需要支付宝或微信进行支付
				let stationMoney = 0 //站内总金额
				for (let i = 0; i < this.chooseTypeList.length; i++) {
					switch (this.chooseTypeList[i]) {
						case "账户余额":
							stationMoney += this.payInfo.memberAsset.balanceUseMoney
							break;
						case "礼卡":
							stationMoney += this.payInfo.memberAsset.cardUseMoney
							break;
					}
				}
				if (!this.payInfo.payedSummary) {
					this.surplusMoney = this.payInfo.orderAmount - stationMoney;
				}
				return this.surplusMoney
			},
			judegChooseOther() { //当余额不足支付 或 不勾选余额支付   判断应该选中支付宝还是微信
				if (this.isWxFlag) {
					if (this.judgeTypeIsExistence("微信") != -1 && this.judgeSurplusMoney() <= 0) {
						this.chooseTypeList.splice(this.judgeTypeIsExistence("微信"), 1)
					} else if (this.judgeSurplusMoney() > 0 && this.judgeTypeIsExistence("微信") == -1) {
						this.chooseTypeList.push("微信")
					}
					return
				}
				// 只有不是小程序会执行该代码
				// #ifndef MP-WEIXIN
				if (!this.isWxFlag) { //在普通浏览器中
					if (this.judgeTypeIsExistence("支付宝") != -1 && this.judgeSurplusMoney() <= 0) {
						this.chooseTypeList.splice(this.judgeTypeIsExistence("支付宝"), 1)
					} else if (this.judgeSurplusMoney() > 0 && this.judgeTypeIsExistence("支付宝") == -1) {
						this.chooseTypeList.push("支付宝")
					}
				}
				// #endif
			},
			async accountChange() { //账户余额取消/选中触发
				if (this.judgeTypeIsExistence("账户余额") != -1) {
					this.chooseTypeList.splice(this.judgeTypeIsExistence("账户余额"), 1);
					this.payInfo.memberAsset.balanceUseMoney = 0;
				} else {
					this.chooseTypeList.push("账户余额");
					this.payInfo.memberAsset.balanceUseMoney = this.payInfo.memberAsset.balance
				}
				await this.defaultCards();
				this.judegChooseOther();
				if (this.judgeTypeIsExistence("账户余额") == -1) {
					if (!this.payInfo.memberAsset.cardUseMoney) {
						this.payInfo.memberAsset.balance = this.oldBalance
					} else {
						this.payInfo.memberAsset.balance = (this.surplusMoney < this.oldBalance ? this.surplusMoney : this.oldBalance)
					}
				}
			},
			async giftChange() { //礼卡余额取消/选中触发
				if (this.judgeTypeIsExistence("礼卡") != -1) {
					this.chooseTypeList.splice(this.judgeTypeIsExistence("礼卡"), 1);
					this.payInfo.memberAsset.cardUseMoney = 0;
				} else {
					this.chooseTypeList.push("礼卡");
					this.payInfo.memberAsset.cardUseMoney = this.payInfo.memberAsset.cardAmount
				}
				await this.defaultCards();
				this.judegChooseOther() //计算剩余金额  如果余额没有选中的话  去更新账户余额
				if (this.judgeTypeIsExistence("账户余额") == -1) {
					this.payInfo.memberAsset.balance = (this.oldBalance - this.surplusMoney > 0 ? this.surplusMoney : this.oldBalance)
				}
			},
			outsideStationChange(type) { //站外支付取消选中时触发
				let index = this.judgeTypeIsExistence(type)
				if (index != "-1" && this.judgeIsExistence() == 2) { //已经勾选 要取消  两者都存在时可以取消
					if (type == "微信") {
						this.chooseTypeList.splice(index, 1, "支付宝")
					} else {
						this.chooseTypeList.splice(index, 1, "微信")
					}
				}
			},
			cardAmountChange(params) { //礼卡列表选中变化时触发
				this.cardInfo = params;
				// 选中的礼卡支付金额
				this.$set(this.payInfo.memberAsset, "cardUseMoney", params.selectedAmount);
				if (this.judgeTypeIsExistence("礼卡") == -1) {
					this.chooseTypeList.push("礼卡")
				} else if (!this.payInfo.memberAsset.cardUseMoney && this.judgeTypeIsExistence("礼卡") != -1) {
					this.chooseTypeList.splice(this.judgeTypeIsExistence("礼卡"), 1)
				}
				this.judegChooseOther();
				// 可用金额
				this.payInfo.memberAsset.balance = (this.oldBalance - this.surplusMoney > 0 ? this.surplusMoney : this.oldBalance)
			},
			judgeTypeIsExistence(type) { //判断类型是否选中 存在返回下标
				let index = this.chooseTypeList.findIndex(data => {
					return data == type
				})
				return index
			},
			judgeIsExistence() { //判断支付宝和微信是否同时存在
				let isExistence = 0; //存在一个加1  为2时说明支付宝和微信都存在  用来判断是否可以取消某个站外支付
				if (this.isWxFlag) { //微信存在
					isExistence++
				}
				// #ifndef MP-WEIXIN
				if (!this.isWxFlag) { //支付宝存在
					isExistence++
				}
				// #endif
				return isExistence
			},
			openPswPopup() { //打开支付密码弹窗
				let _this = this;
				if (this.payInfo.orderSummary.scorePayedAmount || this.judgeTypeIsExistence("礼卡") != "-1" || this.judgeTypeIsExistence(
						"账户余额") != "-1") {
							console.log(this.payInfo)
					if (this.payInfo.riskCheck && this.payInfo.riskCheck.riskLevel == 'MID') {
						this.$refs.verificationCode.openVerificationCode()
					} else if (this.payInfo.riskCheck && this.payInfo.riskCheck.riskLevel == 'LOW' && this.payInfo.riskCheck.firstAddrMobile && !this.payInfo.riskCheck
						.monthNewMember) {
						if (this.payInfo.riskCheck && this.payInfo.riskCheck.unsafeAmt < (this.payInfo.memberAsset.cardUseMoney + this.payInfo.memberAsset.scorePayedAmount +
								this.payInfo.memberAsset.balanceUseMoney)) {
							this.$refs.verificationCode.openVerificationCode()
						} else {
							if (this.payInfo.hasPayPwd) {
								this.$refs.pswPopup.openPswPopup();
							} else {
								this.$refs.setPayPwd.openNoPswPopup()
							}
						}
					} else {
						if (this.payInfo.hasPayPwd) {
							this.$refs.pswPopup.openPswPopup();
						} else {
							this.$refs.setPayPwd.openNoPswPopup()
						}
					}
				} else {
					// 在微信小程序中 
					// #ifdef MP-WEIXIN
						uni.login({
							success(data) {
								_this.buildMiniPrepPaySign(data.code)
							}
						})
						return
					// #endif
					
					// #ifdef H5
						this.getH5Code()
					// #endif
				}
			},
			buildMiniPrepPaySign(code, payId) { //获取小程序支付相关信息
				let orderType = "good"
				if(this.$Route.query.increase){	//转增礼包
					orderType = "giftbag"
				}else if(this.$Route.query.newtype>50){	//会员礼包
					orderType = "newtype"
				}
				payMentApi.buildMiniPrepPaySign({
					code: code,
					orderPayId: payId ? payId : this.$Route.query.payId,
					orderType: orderType
				}).then(res => {
					if (res.data.code == 200) {
						this.requestpayment(res.data.data)
					} else {
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			buildPrepPaySign(){	//获取公众号支付信息
				payMentApi.buildPrepPaySign({code:this.wxCode,orderPayId:this.$Route.query.payId,orderType:"good"}).then(res=>{
					if(res.data.code==200){
						this.requestH5Payment(res.data.data)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			requestpayment(params) { //小程序支付
				let _this = this;
				uni.requestPayment({
					provider: "payment",
					timeStamp: params.timeStamp,
					nonceStr: params.nonceStr,
					package: params.package,
					paySign: params.paySign,
					signType: params.signType,
					success: function(res) {
						_this.payCallBack(true)
					},
					fail: function(res) {
						_this.payCallBack(false)

					}
				})
			},
			requestH5Payment(params){	//微信公众号支付
				if (typeof WeixinJSBridge == "undefined"){
				   if( document.addEventListener ){
				       document.addEventListener('WeixinJSBridgeReady', this.WeixinJSBridgeH5, false);
				   }else if (document.attachEvent){
				       document.attachEvent('WeixinJSBridgeReady', this.WeixinJSBridgeH5); 
				       document.attachEvent('onWeixinJSBridgeReady', this.WeixinJSBridgeH5);
				   }
				}else{
				   this.WeixinJSBridgeH5(params);
				}
			},
			WeixinJSBridgeH5(params){
				let _this=this;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId":params.appId,     //公众号名称，由商户传入     
						"timeStamp":params.timeStamp,         //时间戳，自1970年以来的秒数     
						"nonceStr":params.nonceStr, //随机串     
						"package":params.package,     
						"signType":params.signType,         //微信签名方式：     
						"paySign":params.paySign //微信签名 
					},
					function(res){
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							_this.payCallBack(true)
						} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
							_this.payCallBack(false)
						} else {
							_this.payCallBack(false)
						}
					}
				); 
			},
			payCallBack(flag){	 //支付成功或失败的回调
				if(flag){
					uni.showToast({
						title: "支付成功",
						icon: "none"
					})
					this.$Router.replace({
						path: "/pages/payment/index",
						query:{
							payId:this.$Route.query.payId,
							newtype:this.$Route.query.newtype,
							increase:this.$Route.query.increase || ""
						}
					})
				}else{
					uni.showToast({
						title: "已取消支付,正在前往订单页",
						icon: "none"
					})
					setTimeout(() => {
						this.$Router.replace({
							path: "/pages/order/index",
						})
					}, 500)
				}
			},
			getH5Code(){	//获取公众号code
				wechatApi.wxPubAppId().then(res=>{
					if(res.data.code==200){
						let urls = 'https://' + location.host + location.pathname+'?payId='+this.$Route.query.payId;
						location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+res.data.data + '&redirect_uri=' + encodeURIComponent(urls) +'&response_type=code&scope=snsapi_userinfo';
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			openForgetPopup() { //打开忘记支付密码弹窗
				this.$refs.forgetPayPsw.openForgetPopup();
			},
			setSubmitPsw(password) { //子集修改密码/重置密码/输入密码后点击确定触发  赋值支付密码
				this.submitParams.password = password;
				this.submit()
			},
			codeSubmit(code) { //用户安全等级过低时 触发验证码  点击确定  提交订单
				this.$set(this.submitParams, "code", code);
				this.submit()
			},
			submit() { //提交支付
				this.submitParams = {
					balance: this.payInfo.memberAsset.balanceUseMoney ? this.payInfo.memberAsset.balanceUseMoney : 0,
					password: this.submitParams.password,
					payId: this.$Route.query.payId,
					score: this.payInfo.orderSummary.scorePayedAmount,
					thirdPayAmount: Number(this.surplusMoney).toFixed(2),
					thirdPayMethod: this.chooseTypeList.indexOf("支付宝") != "1" ? "alipay" : "wxpay",
					code: this.submitParams.code,
					cardAmount: this.payInfo.memberAsset.cardUseMoney ? this.payInfo.memberAsset.cardUseMoney : 0
				}
				tradeApi.submitPay(this.submitParams).then(res => {
					if (res.data.code == 200) {
						this.$refs.verificationCode.closeVerificationCode();
						if (this.judgeTypeIsExistence("微信") != "-1") {
							uni.showLoading({
								title: '正在前往微信支付',
								mask: false
							});
							uni.login({
								success: (data) => {
									this.buildMiniPrepPaySign(data.code, res.data.data)
								}
							})
							return
						}
						this.payCallBack(true)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},

			openGiftCardPopup() { //打开礼卡弹窗
				if (this.cardInfo.usableCards && this.cardInfo.usableCards.length) {
					this.$refs.giftCard.openGiftCardPopup()
				}
			},
		},
		onLoad(option) {
			// #ifdef H5
			let ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				this.isWxFlag = true //在微信浏览器中
			} else {
				this.isWxFlag = false //不在微信浏览器中
			}
			//#endif
			/*微信小程序*/
			//#ifdef MP-WEIXIN
			this.isWxFlag = 1
			this.fmagentInit()
			//#endif
			this.submitParams.payId = this.$Route.query.payId;
			this.summary();
			if(option.code){
				this.wxCode = option.code;
				this.buildPrepPaySign()
			}
		},
		onShow() {
			this.zhuge.track("订单收银台-落地页")
		},
		components: {
			setPayPwd,
			forgetPayPsw,
			pswPopup,
			verificationCode,
			cardList
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
		background-color: #FFFFFF;
	}
	.orderPrice {
		width: 100%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		position: relative;
		font-size: 34rpx;
		/* #ifdef MP-WEIXIN */
		margin-top: 40rpx;
		/* #endif */
	}

	.orderAmount {
		color: #FF1558;
	}

	.orderDetailsBtn {
		position: absolute;
		right: 24rpx;
		top: 0;
		font-size: 24rpx;
		color: #666;
		display: flex;
		align-items: center;
	}

	.orderDetailsBtn text {
		display: inline-block;
		width: 40rpx;
		height: 80rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_cannotusearrow@2x.png) no-repeat 50%;
		background-size: 20rpx 10rpx;
	}

	.orderPriceMain {
		width: 100%;
		padding: 24rpx;
		background-color: #FFFFFF;
	}

	.everyRow {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999999;
		margin: 5rpx 0;
	}

	.myWalletHead {
		margin-top: 48rpx;
		padding: 24rpx;
		width: 100%;
		font-size: 34rpx;
		color: #333333;
		font-weight: 700;
	}

	.myWalletInfo {
		display: flex;
		padding: 30rpx 24rpx;
		align-items: center;
		position: relative;
	}

	.walletIcon,
	.alipayIcon,
	.weixinIcon {
		width: 60rpx;
		height: 80rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_qb.png) no-repeat 50%;
		background-size: 50rpx 50rpx;
	}

	.alipayIcon {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_zhi.png) no-repeat 50%;
		background-size: 50rpx 50rpx;
	}

	.weixinIcon {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_weixin.png) no-repeat 50%;
		background-size: 50rpx 50rpx;
	}

	.icon_m {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_m.png) no-repeat 50%;
		background-size: 50rpx 50rpx;
	}

	.payText {
		flex: 1;
		line-height: 80rpx;
		padding: 0 18rpx;
	}

	.walletText {
		flex: 1;
		padding: 0 20rpx;
	}

	.walletType {
		height: 40rpx;
		line-height: 40rpx;
		color: #333333;
	}

	.walletPrice {
		color: #999;
		font-size: 24rpx;
		line-height: 40rpx;
	}

	.surePayBtn {
		width: 100%;
		height: 100rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		position: fixed;
		bottom: calc(0rpx + constant(safe-area-inset-bottom));
		bottom: calc(0rpx + env(safe-area-inset-bottom));
		left: 0;
		text-align: center;
		line-height: 100rpx;
	}


	.payPrice {
		line-height: 80rpx;
		font-size: 32rpx;
		color: #333333;
	}

	.payChooseBtn {
		width: 36rpx;
		height: 36rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
		margin-left: 20rpx;
	}

	.payChooseBtn.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}

	.payType {
		width: 100%;
		display: flex;
		padding: 30rpx 24rpx;
		align-items: center;
		position: relative;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(255, 255, 255, 0.5);
	}
	
</style>
