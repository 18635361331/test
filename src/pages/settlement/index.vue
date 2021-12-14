<template>
	<view class="page settlement" :class="(memberType!=4 && memberPriceInfo.type && orderSummaryInfo.achievementAmount!=0)?'active':''">
		<defaultTitle :dto="{title:'填写订单',bottomColor:'#E6E6E6'}"></defaultTitle>
		<view class="settlementAddress">
			<view v-if="orderInfo.address" @click="$Router.push({path:'/pages/address/index',query:{id:orderInfo.address.id}})">
				<view class="settlementTitle">
					<text>{{orderInfo.address.name}}</text>
					<text class="telephone">{{orderInfo.address.telephone}}</text>
				</view>
				<view class="addressMain" v-if='orderInfo.address'>
					{{orderInfo.address.provinceName+orderInfo.address.cityName+orderInfo.address.districtName+(orderInfo.address.townName?orderInfo.address.townName:"")+orderInfo.address.address}}
				</view>
			</view>
			<view class="nullAddress" v-if="!orderInfo.address" @click="$Router.push({path:'/pages/createAddress/index'})">
				请填写收货地址
			</view>
			<view class="arrow"></view>
		</view>
		<view class="settlementLine"></view>
		<view class='addressChange' v-if='orderInfo.address && orderInfo.address.checkStatus=="2"'>*由于邮政地址升级，请填写街道地址</view>
		<view class="orderMain" v-for="item,index in orderInfo.stores" :key='index'>
			<view class="shopName">
				{{item.storeName}}
			</view>
			<view v-for="v,i in item.goodsList" :key='v.goodsId'>
				<view class="goodsCont">
					<image :src="imgBaseUrls+v.goodsImg" mode=""></image>
					<view class="goodsInfo">
						<view class="goodsText ellipsis-two">
							{{v.goodsName}}
						</view>
						<view class="goodSpce">
							{{v.saleFieldValue}}
						</view>
						<view class="goodsPrice">
							<text>¥{{v.originPrice}}</text>
							<view class="goodsNum" :class="limitSettle.isCart?'active':''">
								<block v-if="!limitSettle.isCart">
									<view class="jian" @click="goodsNumChange(v,false)">-</view>
									<input type="number" v-model="v.goodsNum" @blur='goodsNumBlur($event,v)'/>
									<view class="jia" @click="goodsNumChange(v,true)">+</view>
								</block>
								<block v-else>
									x{{v.goodsNum}}
								</block>
							</view>
						</view>
					</view>
				</view>
				<view class="deliveryTime" v-if="v.presaleFlag">
					<image :src="imgBaseUrls+'appletsImages/openBookingIcon.png'" mode=""></image>
					发货时间：{{$utils.formatDate(v.itemPresaleInfoDTO.deliveryStartTime,"yyyy年MM月dd日hh:mm")}} ~ {{$utils.formatDate(v.itemPresaleInfoDTO.deliveryEndTime,"yyyy年MM月dd日hh:mm")}}
				</view>
				<view class="separatePromotion" v-if="v.separatePromotion">
					<text>{{v.separatePromotion.name}}</text>
					<text class="marking_plus">{{v.separatePromotion.typeName}}</text>
				</view>
				<view class="">
					<view class="fmGoodsMsg" v-for="l,o in v.promotions" :key='o' v-if="l.typeCode==19">
						<text class="promotionsActivityBox">{{l.typeName}}</text>
					</view>
					<view class="fmGoodsMsg" v-for="l,o in v.promotions" :key='o' v-else>
						{{l.name?l.name:""}}
						<text class="activityBox">{{l.typeName}}</text>
					</view>
				</view>
			</view>
			
			<view class="fmGoodsMsg">
				<text>运费</text>
				<text class="colorChange">{{freightData[item.storeId]?"￥"+freightData[item.storeId]:"包邮"}}</text>
			</view>
			<!-- 促销活动 -->
			<storePromotionView v-if='storePromotion[item.storeId] && storePromotion[item.storeId].length' :choosePromotionId='couponParams[item.storeId].promotionId' :storePromotion='storePromotion'  :storeId='item.storeId' :storeName='item.storeName' @promotionChange='promotionCouponChange'></storePromotionView>
			<!-- 店铺优惠券 -->
			<storeCoupons v-if='storeCouponsInfo[item.storeId] && storeCouponsInfo[item.storeId].availableList&&storeCouponsInfo[item.storeId].availableList.length' :storeCouponsInfo='storeCouponsInfo' :chooseStoreId='freightParams[item.storeId].couponId' :storeId='item.storeId' :storeName='item.storeName' @couponChange='storeCouponChange'></storeCoupons>
			<view class="fmGoodsMsg">
				留言<input type="text" v-model="orderMessage[item.storeId].orderMessage" maxlength="40" placeholder="选填,限40字以内" />
			</view>
			<view class="fmGoodsMsg">
				<view></view>
				<view class="price">共{{item.goodsNum}}件商品 合计：<text class="priceSymbol">￥</text> <text class="symbolPrice">{{storeAmountData[item.storeId]}}</text>
					(含运费¥{{freightData[item.storeId]}})</view>
			</view>
		</view>
		<!-- 平台优惠券 -->
		<platformCoupons v-if='platforCouponsInfo.availableList && platforCouponsInfo.availableList.length' :platforCouponsInfo='platforCouponsInfo' :choosePlatfromId='orderSummaryParams.platformPromotionId' @couponChange='plateformCouponChange'></platformCoupons>
		<view class="integralMain " v-if="memberType==4">
			<text class="partnerPref">合伙人优惠</text>
			<text class="intergalInfo partnerPrefNum">-¥{{orderSummaryInfo.distributorDiscount}}</text>
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
		<view class='deduction' v-if='orderSummaryInfo.couponAmount>0'>
			<text>优惠券</text>
			<text>-￥{{orderSummaryInfo.couponAmount}}</text>
		</view>
		<view class='deduction' v-if='orderSummaryInfo.socreAmount>0'>
			<text>积分抵扣</text>
			<text>-￥{{orderSummaryInfo.socreAmount}}</text>
		</view>
		<view class='deduction' v-if="orderSummaryInfo.goldAmount>0">
			<text>库豆抵扣</text>
			<text>-￥{{orderSummaryInfo.goldAmount}}</text>
		</view>
		<view class='deduction performance' v-if="memberType==4">
			<text>本单商品计有效业绩</text>
			<text>￥{{orderSummaryInfo.performanceAmount}}</text>
		</view>
		<view class="cartHint" v-if="orderSummaryInfo.achievementAmount!=0 && memberType!=4 && (memberPriceInfo.type || memberPriceInfo.arriveType)">
			<view class="cartPrice">
				<view v-if="memberPriceInfo.arriveType">
					当前结算金额已满足<text>{{memberPriceInfo.arriveType}}</text>升级条件
				</view>
				<block v-if="memberPriceInfo.price">
					还差<text class="memberGoodsPrice">{{memberPriceInfo.price}}</text>元，
				</block>
				<block v-if="!memberPriceInfo.price">下单</block>
				即可升级为{{memberPriceInfo.type}}
			</view>
			<view class="goBuyBtn" @click="gotoGoods" v-if="memberPriceInfo.price">
				去凑单&nbsp;›
			</view>
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
		<!-- #ifdef MP-WEIXIN -->
			<view v-if="(hideFMCanvas != undefined) && !hideFMCanvas">
				<canvas canvas-id='tdcanvas' style='margin-top:200rpx'></canvas>
			</view>
		<!-- #endif  -->
	</view>
</template>

<script>
	/* 
	订单逻辑
		初始化信息时需判断购物车还是商品详情的入口：通过地址栏的goodsNum  为真商品详情入口   否则为购物车
		初始化信息成功后  获取实名认证	getDefaultRealnameInfo  
		计算店铺下的商品总数 并且标记是否存在无货商品  goodStockState
		整合店铺商品数据 为接下来的接口做准备  initShopGoodsInfo  data中新建对象storeInfo  将每个店铺的id作为key  
	 */
	import tradeApi from '@/api/trade/index.js';
	import memberApi from '@/api/member/index.js'
	import storeCoupons from './storeDiscount.vue'	//店铺优惠券
	import platformCoupons from './platformCoupons.vue'	//平台优惠券
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
				goodStockState:false,	//标记是否存在无货商品   true为存在  false为不存在
				orderInfo: {},
				haitaoInfo: {},
				imgBaseUrls: "",
				orderGoldCount: { //库豆
					canUseGold: "", //可抵用金额
					accountGold: "", //库豆总额
				},
				storeInfo:{	//保存每个店铺下的商品数据  id为key   值为数据
				},
				couponParams:{	//店铺优惠券请求参数
				},
				freightParams:{		//运费包邮请求参数
				},
				storeAmountParams:{	//订单金额请求参数
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
				orderMessage:{	//留言信息
					
				},
				storeCouponsInfo:{	//店铺优惠券数据
					
				},
				platforCouponsInfo:{	//平台优惠券
					
				},
				storePromotion:{	//店铺促销活动展示
					
				},
				storeAmountData:{	//店铺金额
					
				},
				freightData:{	//运费金额
					
				},
				submitFlag:true,	//提交开关、做防抖
				memberType:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:"",
				memberPriceInfo:{
					price:0,
					type:"",
					arriveType:""
				},
				limitSettle:{
					isCart:false,
					stockNumber:0,
					time:"",
					retry:3
				}
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
			this.limitSettle.stockNumber = this.$Route.query.stockNumber
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.pageInitParams()
		},
		beforeRouteLeave(to, from, next){	//页面销毁时清除地址
			uni.removeStorageSync("addressInfo");
			next()
		},
		components:{
			storeCoupons,
			platformCoupons,
			storePromotionView,
			setPayPwd,
			forgetPayPsw,
			verificationCode,
			pswPopup
		},
		methods: {
			pageInitParams(goodsNum){
				let addressInfo = uni.getStorageSync("addressInfo")?JSON.parse(uni.getStorageSync("addressInfo")):""
				if (this.$Route.query.goodsNum) {
					this.pageInit({
						goodsId: this.$Route.query.cartIds,
						goodsNum: goodsNum?goodsNum:this.$Route.query.goodsNum,
						addressId:addressInfo?addressInfo.id:"",
						inviterCode:uni.getStorageSync("routerShareNumber")?uni.getStorageSync("routerShareNumber"):"",
						inviterType:uni.getStorageSync("routerShareNumber")?1:"",
						singlePromotionId:this.$Route.query.singlePromotionId?this.$Route.query.singlePromotionId:"",
						transferOrderId:this.$Route.query.transferOrderId,
					})
					this.limitSettle.isCart = false
				} else {
					this.pageInit({
						cartIds: this.$Route.query.cartIds.split(","),
						addressId:addressInfo?addressInfo.id:"",
					})
					this.limitSettle.isCart = true
				}
			},
			pageInit(params) { //初始化订单信息
				uni.showLoading({
					title:"加载中..."
				})
				tradeApi.pageInit(params).then(res => {
					if (res.data.code == 200) {
						this.orderInfo = res.data.data;
						this.getDefaultRealnameInfo();	//实名认证
						this.initshopGoodsNum() //计算各个店铺下的商品总数 
						this.initGoodsPrice();	//计算各个商品的价格
						this.initShopGoodsInfo() //将店铺中的商品数据整合  为下一个接口做准备 
						for(let i=0;i<this.orderInfo.stores.length;i++){
							this.storePromotions(this.orderInfo.stores[i].storeId);
						}
					} else {
						if(this.limitSettle.retry==0){
							uni.hideLoading()
							return
						}else{
							this.limitSettle.retry--
						}
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
						this.pageInitParams()
					}
				})
			},
			initshopGoodsNum() { //初始化每个店铺下有多少个商品  
				this.goodStockState = false
				for (let i = 0; i < this.orderInfo.stores.length; i++) {
					this.orderInfo.stores[i].goodsNum = 0;
					for (let j = 0; j < this.orderInfo.stores[i].goodsList.length; j++) {
						if(!this.orderInfo.stores[i].goodsList[j].stockState){	//是否为无库存商品  false为无货
							this.goodStockState = true
						}
						this.orderInfo.stores[i].goodsNum++;
						//初始化属性规格
						this.orderInfo.stores[i].goodsList[j].saleFieldValue = this.compileSpec(this.orderInfo.stores[i].goodsList[j].saleFieldValue)
					}
				}
			},
			compileSpec(spce) { //编译默认规格例如  颜色：红色，尺码：40 -> 红色 40
				var newSpec = '';
				var specArr = spce.split(',');
				for (let i in specArr) {
					newSpec += specArr[i].split(':')[1] + ' ';
				}
				return newSpec;
			},
			initGoodsPrice(){	//计算商品价格
				for (let i = 0; i < this.orderInfo.stores.length; i++) {
					for (let j = 0; j < this.orderInfo.stores[i].goodsList.length; j++) {
						if(this.orderInfo.stores[i].goodsList[j].promotions && this.orderInfo.stores[i].goodsList[j].promotions.length){
							this.orderInfo.stores[i].goodsList[j].originPrice = this.orderInfo.stores[i].goodsList[j].promotions[0].goodsPrice
						}else{
							if(this.orderInfo.stores[i].goodsList[j].separatePromotion && this.orderInfo.stores[i].goodsList[j].separatePromotion.id){
								this.orderInfo.stores[i].goodsList[j].originPrice = this.orderInfo.stores[i].goodsList[j].separatePromotion.goodsPrice
							}
						}
					}
				}
			},
			initShopGoodsInfo() { //初始化店铺下的商品信息 做整合
				for (let i = 0; i < this.orderInfo.stores.length; i++) {
					this.$set(this.orderMessage, this.orderInfo.stores[i].storeId, {})
					this.$set(this.orderMessage[this.orderInfo.stores[i].storeId],"orderMessage", "")
					this.$set(this.storeInfo, this.orderInfo.stores[i].storeId, {})
					this.$set(this.storeInfo[this.orderInfo.stores[i].storeId], "storeId", this.orderInfo.stores[i].storeId)
					this.$set(this.storeInfo[this.orderInfo.stores[i].storeId], "goodsList", [])
					this.$set(this.storeInfo[this.orderInfo.stores[i].storeId], "lotteryId", "")
					for (let j = 0; j < this.orderInfo.stores[i].goodsList.length; j++) {
						let obj = {};
						obj.inviterType = this.orderInfo.stores[i].goodsList[j].inviterType;
						obj.inviterId = this.orderInfo.stores[i].goodsList[j].inviterId;
						if (this.orderInfo.stores[i].goodsList[j].promotions && this.orderInfo.stores[i].goodsList[j].promotions.length > 0) {
							obj.promotionId = this.orderInfo.stores[i].goodsList[j].promotions[0].id;
						} else {
							obj.promotionId = "";
						}
						if (!this.$Route.query.goodsNum) {	//购物车
							obj.cartId = this.orderInfo.stores[i].goodsList[j].cartId;
						} else if (this.$Route.query.goodsNum) {	//商品详情页
							obj.goodsId = this.orderInfo.stores[i].goodsList[j].goodsId;
							obj.goodsNum = this.orderInfo.stores[i].goodsList[j].goodsNum;
							if(this.$Route.query.singlePromotionId){
								obj.singlePromotionId = this.$Route.query.singlePromotionId
							}
						}
						this.storeInfo[this.orderInfo.stores[i].storeId].goodsList.push(obj)
					}
				}
			},
			getDefaultRealnameInfo() { //实名认证获取窗口
				memberApi.getDefaultRealnameInfo().then(res => {
					if (res.data.code == 200) {
						if (res.data.data && res.data.data.realname) {
							this.haitaoInfo = res.data.data
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			storePromotions(storeId) { //获取店铺促销信息
				tradeApi.storePromotions(this.storeInfo[storeId]).then(res => {
					if (res.data.code == 200) {
						this.initCouponParams(storeId,res.data.data);
						this.storeCoupons(storeId);
						this.initStorePromotion(storeId,res.data.data)	//初始化店铺促销活动展示信息
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			initCouponParams(storeId,data) {	//初始化店铺优惠券请求参数数据
				let params = JSON.stringify(this.storeInfo);
				this.$set(this.couponParams,storeId,JSON.parse(params)[storeId]);
				this.$set(this.couponParams[storeId],'lotteryId',"");
				if(data.length>0){
					this.$set(this.couponParams[storeId],'promotionId',data[0].id)
				}else{
					this.$set(this.couponParams[storeId],'promotionId',"");
				}
			},
			storeCoupons(storeId) { //获取店铺优惠券信息
				tradeApi.storeCoupons(this.couponParams[storeId]).then(res => {
					if (res.data.code == 200) {
						this.$set(this.storeCouponsInfo,storeId,res.data.data)
						this.initFreightParams(storeId,res.data.data.availableList);
						this.freightPromotions(storeId);
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			initFreightParams(storeId,data){	//初始化包邮活动参数
				let params = JSON.stringify(this.couponParams);
				this.$set(this.freightParams,storeId,JSON.parse(params)[storeId])
				if(data.length>0){
					this.$set(this.freightParams[storeId],'couponId',data[0].id);
				}else{
					this.$set(this.freightParams[storeId],'couponId',"");
				}
				this.$set(this.freightParams[storeId],'lotteryId','');
			},
			freightPromotions(storeId){	//获取店铺包邮活动信息
				this.freightParams[storeId].addressId = this.orderInfo.address?this.orderInfo.address.id:""
				tradeApi.freightPromotions(this.freightParams[storeId]).then(res=>{
					if(res.data.code==200){
						this.initStoreAmountParams(storeId,res.data.data);
						this.storeOrderAmount(storeId)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			initStoreAmountParams(storeId,data){//初始化店铺订单金额请求参数
				let params = JSON.stringify(this.freightParams);
				this.$set(this.storeAmountParams,storeId,JSON.parse(params)[storeId])
				this.$set(this.storeAmountParams[storeId],'lotteryId','')
				if(data){
					this.$set(this.storeAmountParams[storeId],'freightPromotionId',data.id);
				}else{
					this.$set(this.storeAmountParams[storeId],'freightPromotionId',"");
				}
			},
			storeOrderAmount(storeId) { //获取店铺订单金额
				this.storeAmountParams[storeId].addressId = this.orderInfo.address?this.orderInfo.address.id:""
				tradeApi.storeOrderAmount(this.storeAmountParams[storeId]).then(res => {
					if (res.data.code == 200) {
						this.$set(this.storeAmountData,storeId,res.data.data.payPrice)
						this.$set(this.freightData,storeId,res.data.data.freightAmount)
						this.initPlatformPromotsParams(storeId);
						if(this.platformPromotsParams.orders.length == this.orderInfo.stores.length){
							this.platformPromotions(this.platformPromotsParams)
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			initPlatformPromotsParams(storeId){	//初始化平台优惠券请求参数
				this.platformPromotsParams.addressId = this.orderInfo.address?this.orderInfo.address.id:""
				 if(!this.isCF(storeId)){
					this.platformPromotsParams.orders.push(this.storeAmountParams[storeId])
				}else{
					this.$set(this.platformPromotsParams.orders,this.isCF(storeId),this.storeAmountParams[storeId]);
				}
			},
			isCF(storeId){
				for(let v in this.platformPromotsParams.orders){
					if(this.platformPromotsParams.orders[v].storeId == storeId){
						return v;
					}
				}
				return false;
			},
			platformPromotions(params) { //获取平台优惠券信息
				tradeApi.platformPromotions(params).then(res => {
					if (res.data.code == 200) {
						this.platforCouponsInfo = res.data.data
						this.initOrderSummaryParams(res.data.data.availableList);
						this.orderGold(this.orderSummaryParams)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			initOrderSummaryParams(data){	//订单总价格请求参数
				let params = JSON.stringify(this.platformPromotsParams);
				this.orderSummaryParams = JSON.parse(params);
				this.orderSummaryParams.lotteryId =  '';
				// this.PtCPrice.num=data.length
				if(data.length>0){
					this.$set(this.orderSummaryParams,'platformPromotionId',data[0].id);
					this.$set(this.orderSummaryParams,'transferOrderId',this.$Route.query.transferOrderId);
				}else{
					this.$set(this.orderSummaryParams,'transferOrderId',this.$Route.query.transferOrderId);
					this.$set(this.orderSummaryParams,'platformPromotionId','');
				}
			},
			orderGold(params) { //获取权益金
				tradeApi.orderGold(params).then(res => {
					if (res.data.code == 200) {
						this.orderSummaryParams.goldAmount=res.data.data.canUseGold
						this.orderGoldCount = res.data.data;
						if(!this.orderGoldCount.canUseGold){
							this.deductionFlag.gold = false
						}else{
							this.deductionFlag.gold = true
						}
						this.orderScore()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			orderScore() { //获取积分信息
				tradeApi.orderScore(this.orderSummaryParams).then(res => {
					if (res.data.code == 200) {
						this.orderScoreCount = res.data.data;
						this.orderSummary()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			orderSummary() { //获取总订单价格
				tradeApi.orderSummary(this.orderSummaryParams).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						this.orderSummaryInfo = res.data.data;
						if(this.memberType != 4){
							this.getMemberPriceInfo()
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getMemberPriceInfo(){
				this.memberPriceInfo.arriveType=""
				this.memberPriceInfo.type = ""
				try{
					let memberConfig = JSON.parse(uni.getStorageSync("memberConfig"));
					let userInfo = JSON.parse(uni.getStorageSync("userInfo"))
					let memberPrie = 0;
					if(userInfo.plusFlag==memberConfig[memberConfig.length-1].type){
						return false
					}
					for(let i=0;i<memberConfig.length;i++){
						if(memberConfig[i].type == userInfo.plusFlag){
							if(memberConfig[i].price>userInfo.totalAmountDuring){
								memberPrie = memberConfig[i].price - userInfo.totalAmountDuring
							}
						}
					}
					for(let i=1;i<memberConfig.length;i++){
						if((this.orderSummaryInfo.achievementAmount+userInfo.totalAmountDuring+memberPrie)<memberConfig[i].price){
							this.memberPriceInfo.price = (memberConfig[i].price - this.orderSummaryInfo.achievementAmount - userInfo.totalAmountDuring).toFixed(2)
							this.memberPriceInfo.type = memberConfig[i].name;
							return true
						}else if(i>0 && memberPrie==0){
							this.memberPriceInfo.arriveType = memberConfig[i].name
							this.memberPriceInfo.type = memberConfig[i].name;
							this.memberPriceInfo.price = ""
						}else{
							if(memberConfig[i].price - this.orderSummaryInfo.achievementAmount - userInfo.totalAmountDuring<=0){
								this.memberPriceInfo.arriveType = memberConfig[i].name;
								this.memberPriceInfo.price = ""
							}else{
								this.memberPriceInfo.price = (memberConfig[i].price - this.orderSummaryInfo.achievementAmount - userInfo.totalAmountDuring).toFixed(2)
								this.memberPriceInfo.type = memberConfig[i].name;
							}
						}
					}
				}catch(e){
					
				}
			},
			gotoGoods(){	//去凑单
				this.$Router.push({
					path:"/pages/goodsList/index",
					query:{
						priceRangeLeft:this.memberPriceInfo.price
					}
				})
			},
			submitOrder() { //提交订单判断
				
				if(!this.orderInfo.address){
					uni.showToast({
						title:"请设置收货地址",
						icon:"none"
					})
					return
				}
				if(this.orderInfo.address && this.orderInfo.address.checkStatus==2){
					uni.showToast({
						title:"请修改地址",
						icon:"none"
					})
					return
				}
				if(this.goodStockState){
					uni.showToast({
						title:"下单商品存在无货商品，请重新选择后下单",
						icon:"none"
					})
					return
				}
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
					this.submit()
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
			submit(){	//提交订单
				for(let o in this.orderSummaryParams.orders){
					for(let i=0;i<this.orderSummaryParams.orders[o].goodsList.length;i++){
						this.orderSummaryParams.orders[o].goodsList[i].inviterCode = uni.getStorageSync("routerShareNumber")?uni.getStorageSync("routerShareNumber"):""
					}
					this.orderSummaryParams.orders[o].orderMessage = this.orderMessage[this.orderSummaryParams.orders[o].storeId].orderMessage;
				}
				if(!this.submitFlag){
					return
				}
				this.submitFlag = false
				tradeApi.submitOrder(this.orderSummaryParams).then(res => {
					this.submitFlag = true
					if (res.data.code == 200) {
						this.$refs.verificationCode.closeVerificationCode()
						if(this.orderSummaryInfo.payAmount==0){
							this.$Router.replace({
								path:"/pages/payment/index",
								query:{
									payId:res.data.data.payId,
									newtype:this.$Route.query.newtype||""
								}
							})
						}else{
							this.$Router.replace({
								path:"/pages/pay/index",
								query:{
									payId:res.data.data.payId,
									newtype:this.$Route.query.newtype || ""
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
				this.orderSummary()
			},
			scoreChange(e){	//积分开关变化时触发
				this.deductionFlag.score = e.detail.value
				if(e.detail.value){
					this.orderSummaryParams["scoreNum"] = this.orderScoreCount.usefulScoreNum
				}else{
					this.orderSummaryParams["scoreNum"] = 0
				}
				this.orderSummary()
			},
			storeCouponChange(storeId,id){	//店铺优惠券发生变化时触发
				this.$set(this.freightParams[storeId],'couponId',id);
				this.freightPromotions(storeId)
			},
			plateformCouponChange(id){	//平台优惠券发生变化时触发
				this.$set(this.orderSummaryParams,'platformPromotionId',id);
				this.orderGold(this.orderSummaryParams)
			},
			promotionCouponChange(storeId,id){
				this.$set(this.couponParams[storeId],'promotionId',id);
				this.storeCoupons(storeId)
				
			},
			initStorePromotion(storeId,data){	//初始化店铺促销活动信息
				this.$set(this.storePromotion,storeId,[]);	//获取促销活动信息
				this.storePromotion[storeId] = data
			},
			openForgetPopup() { //打开忘记支付密码弹窗
				this.$refs.forgetPayPsw.openForgetPopup();
			},
			setSubmitPsw(password) { //子集修改密码/重置密码/输入密码后点击确定触发  赋值支付密码
				this.$set(this.orderSummaryParams,"password",password)
				this.submit()
			},
			goodsNumBlur(e,item) { //购物车商品数量变化时触发
				if (e.target.value) {
					console.log(e.target.value)
					console.log(this.limitSettle.stockNumber)
					console.log(e.target.value<=this.limitSettle.stockNumber)
					if (Number(e.target.value) < 1) {
						this.debounceHandle(1);
						this.$set(item,"goodsNum",1)
					} else {
						if(Number(e.target.value)<=this.limitSettle.stockNumber){
							this.debounceHandle(parseInt(e.target.value));
							this.$set(item,"goodsNum",parseInt(e.target.value))
						}else{
							this.debounceHandle(parseInt(this.limitSettle.stockNumber));
							this.$set(item,"goodsNum",parseInt(this.limitSettle.stockNumber))
						}
					}
				} else {
					this.debounceHandle(1)
				}
			},
			goodsNumChange(item,flag){
				if(flag){
					if((Number(item.goodsNum)+1)<=this.limitSettle.stockNumber){
						this.debounceHandle(Number(item.goodsNum)+1);
						this.$set(item,"goodsNum",Number(item.goodsNum)+1)
					}
				}else{
					if(item.goodsNum>1){
						this.debounceHandle(Number(item.goodsNum)-1);
						this.$set(item,"goodsNum",Number(item.goodsNum)-1)
					}
				}
			},
			// 防抖
			debounceHandle(goodsNum){
				if(this.limitSettle.time){
					clearTimeout(this.limitSettle.time);
				}
				return (()=>{
					this.limitSettle.time = setTimeout(()=>{
						this.pageInitParams(goodsNum)
					},500)
				})()
			}
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

	.settlement.active{
		padding-bottom: calc(210rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(210rpx + env(safe-area-inset-bottom));
	}

	.settlementAddress {
		width: 100%;
		padding: 60rpx 24rpx;
		position: relative;
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
	.performance{
		font-size: 28rpx;
		font-weight: 400;
		color: #663F0A;
		margin-top: 20rpx;
		padding-top: 20rpx;
		border-top: 1px solid #E4E4E4;
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
	.partnerPref{
		font-weight: 700;
	}
	.partnerPrefNum{
		padding-right: 40rpx;
		color: #000000;
		font-size: 28rpx;
	}
	
	
	.goodsNum {
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		background-color: #FFFFFF;
		width: 188rpx;
		height: 50rpx;
		display: flex;
		color: #999999;
		font-size: 30rpx;
	}
	
	.goodsNum .jia,
	.goodsNum .jian {
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		line-height: 48rpx;
		border: 1px solid #E6E6E6;
	}
	
	.goodsNum input {
		width: 88rpx;
		height: 100%;
		text-align: center;
		border-top: 1px solid #E6E6E6;
		border-bottom: 1px solid #E6E6E6;
		font-size: 24rpx;
	}
	.goodsNum.active{
		width: auto;
	}
</style>
