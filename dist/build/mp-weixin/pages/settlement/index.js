(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/settlement/index"],{"0291":function(t,o,e){"use strict";var r;e.d(o,"b",(function(){return s})),e.d(o,"c",(function(){return i})),e.d(o,"a",(function(){return r}));var s=function(){var t=this,o=t.$createElement,e=(t._self._c,t.__map(t.orderInfo.stores,(function(o,e){var r=t.__get_orig(o),s=t.__map(o.goodsList,(function(o,e){var r=t.__get_orig(o),s=o.presaleFlag?t.$utils.formatDate(o.itemPresaleInfoDTO.deliveryStartTime,"yyyy年MM月dd日hh:mm"):null,i=o.presaleFlag?t.$utils.formatDate(o.itemPresaleInfoDTO.deliveryEndTime,"yyyy年MM月dd日hh:mm"):null;return{$orig:r,g0:s,g1:i}}));return{$orig:r,l0:s}})));t._isMounted||(t.e0=function(o){return t.$Router.push({path:"/pages/address/index",query:{id:t.orderInfo.address.id}})},t.e1=function(o){return t.$Router.push({path:"/pages/createAddress/index"})}),t.$mp.data=Object.assign({},{$root:{l1:e}})},i=[]},"1b37":function(t,o,e){"use strict";e.r(o);var r=e("80ba"),s=e.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){e.d(o,t,(function(){return r[t]}))}(i);o["default"]=s.a},5689:function(t,o,e){"use strict";e.r(o);var r=e("0291"),s=e("1b37");for(var i in s)["default"].indexOf(i)<0&&function(t){e.d(o,t,(function(){return s[t]}))}(i);e("972b");var a,n=e("f0c5"),d=Object(n["a"])(s["default"],r["b"],r["c"],!1,null,"1fb53aa6",null,!1,r["a"],a);o["default"]=d.exports},"5e04":function(t,o,e){"use strict";(function(t){e("6cdc");r(e("66fd"));var o=r(e("5689"));function r(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,e("543d")["createPage"])},"80ba":function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var r=a(e("1087")),s=a(e("5315")),i=a(e("6b82"));function a(t){return t&&t.__esModule?t:{default:t}}var n=function(){e.e("pages/settlement/storeDiscount").then(function(){return resolve(e("033f"))}.bind(null,e)).catch(e.oe)},d=function(){e.e("pages/settlement/platformCoupons").then(function(){return resolve(e("3715"))}.bind(null,e)).catch(e.oe)},u=function(){e.e("pages/settlement/storePromotionView").then(function(){return resolve(e("98f7"))}.bind(null,e)).catch(e.oe)},m=function(){Promise.all([e.e("common/vendor"),e.e("pages/pay/setPayPsw/index")]).then(function(){return resolve(e("b1f7"))}.bind(null,e)).catch(e.oe)},h=function(){Promise.all([e.e("common/vendor"),e.e("pages/pay/forgetPayPsw/index")]).then(function(){return resolve(e("4406"))}.bind(null,e)).catch(e.oe)},f=function(){e.e("pages/pay/passwordPopup/index").then(function(){return resolve(e("639e"))}.bind(null,e)).catch(e.oe)},c=function(){e.e("pages/pay/verificationCode/index").then(function(){return resolve(e("dcca"))}.bind(null,e)).catch(e.oe)},l={mixins:[i.default],data:function(){return{goodStockState:!1,orderInfo:{},haitaoInfo:{},imgBaseUrls:"",orderGoldCount:{canUseGold:"",accountGold:""},storeInfo:{},couponParams:{},freightParams:{},storeAmountParams:{},platformPromotsParams:{lotteryId:"",addressId:"",orders:[]},orderSummaryParams:{},orderScoreCount:{usefulScoreNum:"",score:""},orderSummaryInfo:{},deductionFlag:{score:!1,gold:!0},orderMessage:{},storeCouponsInfo:{},platforCouponsInfo:{},storePromotion:{},storeAmountData:{},freightData:{},submitFlag:!0,memberType:t.getStorageSync("userInfo")?JSON.parse(t.getStorageSync("userInfo")).plusFlag:"",memberPriceInfo:{price:0,type:"",arriveType:""},limitSettle:{isCart:!1,stockNumber:0,time:"",retry:3}}},onShow:function(){for(var t in this.fmagentInit(),this.zhuge.track("填写订单-落地页"),this.deductionFlag)this.deductionFlag[t]=!1;this.limitSettle.stockNumber=this.$Route.query.stockNumber,this.imgBaseUrls=this.$config.imgBaseUrl,this.pageInitParams()},beforeRouteLeave:function(o,e,r){t.removeStorageSync("addressInfo"),r()},components:{storeCoupons:n,platformCoupons:d,storePromotionView:u,setPayPwd:m,forgetPayPsw:h,verificationCode:c,pswPopup:f},methods:{pageInitParams:function(o){var e=t.getStorageSync("addressInfo")?JSON.parse(t.getStorageSync("addressInfo")):"";this.$Route.query.goodsNum?(this.pageInit({goodsId:this.$Route.query.cartIds,goodsNum:o||this.$Route.query.goodsNum,addressId:e?e.id:"",inviterCode:t.getStorageSync("routerShareNumber")?t.getStorageSync("routerShareNumber"):"",inviterType:t.getStorageSync("routerShareNumber")?1:"",singlePromotionId:this.$Route.query.singlePromotionId?this.$Route.query.singlePromotionId:"",transferOrderId:this.$Route.query.transferOrderId}),this.limitSettle.isCart=!1):(this.pageInit({cartIds:this.$Route.query.cartIds.split(","),addressId:e?e.id:""}),this.limitSettle.isCart=!0)},pageInit:function(o){var e=this;t.showLoading({title:"加载中..."}),r.default.pageInit(o).then((function(o){if(200==o.data.code){e.orderInfo=o.data.data,e.getDefaultRealnameInfo(),e.initshopGoodsNum(),e.initGoodsPrice(),e.initShopGoodsInfo();for(var r=0;r<e.orderInfo.stores.length;r++)e.storePromotions(e.orderInfo.stores[r].storeId)}else{if(0==e.limitSettle.retry)return void t.hideLoading();e.limitSettle.retry--,t.showToast({title:o.data.message,icon:"none"}),e.pageInitParams()}}))},initshopGoodsNum:function(){this.goodStockState=!1;for(var t=0;t<this.orderInfo.stores.length;t++){this.orderInfo.stores[t].goodsNum=0;for(var o=0;o<this.orderInfo.stores[t].goodsList.length;o++)this.orderInfo.stores[t].goodsList[o].stockState||(this.goodStockState=!0),this.orderInfo.stores[t].goodsNum++,this.orderInfo.stores[t].goodsList[o].saleFieldValue=this.compileSpec(this.orderInfo.stores[t].goodsList[o].saleFieldValue)}},compileSpec:function(t){var o="",e=t.split(",");for(var r in e)o+=e[r].split(":")[1]+" ";return o},initGoodsPrice:function(){for(var t=0;t<this.orderInfo.stores.length;t++)for(var o=0;o<this.orderInfo.stores[t].goodsList.length;o++)this.orderInfo.stores[t].goodsList[o].promotions&&this.orderInfo.stores[t].goodsList[o].promotions.length?this.orderInfo.stores[t].goodsList[o].originPrice=this.orderInfo.stores[t].goodsList[o].promotions[0].goodsPrice:this.orderInfo.stores[t].goodsList[o].separatePromotion&&this.orderInfo.stores[t].goodsList[o].separatePromotion.id&&(this.orderInfo.stores[t].goodsList[o].originPrice=this.orderInfo.stores[t].goodsList[o].separatePromotion.goodsPrice)},initShopGoodsInfo:function(){for(var t=0;t<this.orderInfo.stores.length;t++){this.$set(this.orderMessage,this.orderInfo.stores[t].storeId,{}),this.$set(this.orderMessage[this.orderInfo.stores[t].storeId],"orderMessage",""),this.$set(this.storeInfo,this.orderInfo.stores[t].storeId,{}),this.$set(this.storeInfo[this.orderInfo.stores[t].storeId],"storeId",this.orderInfo.stores[t].storeId),this.$set(this.storeInfo[this.orderInfo.stores[t].storeId],"goodsList",[]),this.$set(this.storeInfo[this.orderInfo.stores[t].storeId],"lotteryId","");for(var o=0;o<this.orderInfo.stores[t].goodsList.length;o++){var e={};e.inviterType=this.orderInfo.stores[t].goodsList[o].inviterType,e.inviterId=this.orderInfo.stores[t].goodsList[o].inviterId,this.orderInfo.stores[t].goodsList[o].promotions&&this.orderInfo.stores[t].goodsList[o].promotions.length>0?e.promotionId=this.orderInfo.stores[t].goodsList[o].promotions[0].id:e.promotionId="",this.$Route.query.goodsNum?this.$Route.query.goodsNum&&(e.goodsId=this.orderInfo.stores[t].goodsList[o].goodsId,e.goodsNum=this.orderInfo.stores[t].goodsList[o].goodsNum,this.$Route.query.singlePromotionId&&(e.singlePromotionId=this.$Route.query.singlePromotionId)):e.cartId=this.orderInfo.stores[t].goodsList[o].cartId,this.storeInfo[this.orderInfo.stores[t].storeId].goodsList.push(e)}}},getDefaultRealnameInfo:function(){var o=this;s.default.getDefaultRealnameInfo().then((function(e){200==e.data.code?e.data.data&&e.data.data.realname&&(o.haitaoInfo=e.data.data):t.showToast({title:e.data.message,icon:"none"})}))},storePromotions:function(o){var e=this;r.default.storePromotions(this.storeInfo[o]).then((function(r){200==r.data.code?(e.initCouponParams(o,r.data.data),e.storeCoupons(o),e.initStorePromotion(o,r.data.data)):t.showToast({title:r.data.message,icon:"none"})}))},initCouponParams:function(t,o){var e=JSON.stringify(this.storeInfo);this.$set(this.couponParams,t,JSON.parse(e)[t]),this.$set(this.couponParams[t],"lotteryId",""),o.length>0?this.$set(this.couponParams[t],"promotionId",o[0].id):this.$set(this.couponParams[t],"promotionId","")},storeCoupons:function(o){var e=this;r.default.storeCoupons(this.couponParams[o]).then((function(r){200==r.data.code?(e.$set(e.storeCouponsInfo,o,r.data.data),e.initFreightParams(o,r.data.data.availableList),e.freightPromotions(o)):t.showToast({title:r.data.message,icon:"none"})}))},initFreightParams:function(t,o){var e=JSON.stringify(this.couponParams);this.$set(this.freightParams,t,JSON.parse(e)[t]),o.length>0?this.$set(this.freightParams[t],"couponId",o[0].id):this.$set(this.freightParams[t],"couponId",""),this.$set(this.freightParams[t],"lotteryId","")},freightPromotions:function(o){var e=this;this.freightParams[o].addressId=this.orderInfo.address?this.orderInfo.address.id:"",r.default.freightPromotions(this.freightParams[o]).then((function(r){200==r.data.code?(e.initStoreAmountParams(o,r.data.data),e.storeOrderAmount(o)):t.showToast({title:r.data.message,icon:"none"})}))},initStoreAmountParams:function(t,o){var e=JSON.stringify(this.freightParams);this.$set(this.storeAmountParams,t,JSON.parse(e)[t]),this.$set(this.storeAmountParams[t],"lotteryId",""),o?this.$set(this.storeAmountParams[t],"freightPromotionId",o.id):this.$set(this.storeAmountParams[t],"freightPromotionId","")},storeOrderAmount:function(o){var e=this;this.storeAmountParams[o].addressId=this.orderInfo.address?this.orderInfo.address.id:"",r.default.storeOrderAmount(this.storeAmountParams[o]).then((function(r){200==r.data.code?(e.$set(e.storeAmountData,o,r.data.data.payPrice),e.$set(e.freightData,o,r.data.data.freightAmount),e.initPlatformPromotsParams(o),e.platformPromotsParams.orders.length==e.orderInfo.stores.length&&e.platformPromotions(e.platformPromotsParams)):t.showToast({title:r.data.message,icon:"none"})}))},initPlatformPromotsParams:function(t){this.platformPromotsParams.addressId=this.orderInfo.address?this.orderInfo.address.id:"",this.isCF(t)?this.$set(this.platformPromotsParams.orders,this.isCF(t),this.storeAmountParams[t]):this.platformPromotsParams.orders.push(this.storeAmountParams[t])},isCF:function(t){for(var o in this.platformPromotsParams.orders)if(this.platformPromotsParams.orders[o].storeId==t)return o;return!1},platformPromotions:function(o){var e=this;r.default.platformPromotions(o).then((function(o){200==o.data.code?(e.platforCouponsInfo=o.data.data,e.initOrderSummaryParams(o.data.data.availableList),e.orderGold(e.orderSummaryParams)):t.showToast({title:o.data.message,icon:"none"})}))},initOrderSummaryParams:function(t){var o=JSON.stringify(this.platformPromotsParams);this.orderSummaryParams=JSON.parse(o),this.orderSummaryParams.lotteryId="",t.length>0?(this.$set(this.orderSummaryParams,"platformPromotionId",t[0].id),this.$set(this.orderSummaryParams,"transferOrderId",this.$Route.query.transferOrderId)):(this.$set(this.orderSummaryParams,"transferOrderId",this.$Route.query.transferOrderId),this.$set(this.orderSummaryParams,"platformPromotionId",""))},orderGold:function(o){var e=this;r.default.orderGold(o).then((function(o){200==o.data.code?(e.orderSummaryParams.goldAmount=o.data.data.canUseGold,e.orderGoldCount=o.data.data,e.orderGoldCount.canUseGold?e.deductionFlag.gold=!0:e.deductionFlag.gold=!1,e.orderScore()):t.showToast({title:o.data.message,icon:"none"})}))},orderScore:function(){var o=this;r.default.orderScore(this.orderSummaryParams).then((function(e){200==e.data.code?(o.orderScoreCount=e.data.data,o.orderSummary()):t.showToast({title:e.data.message,icon:"none"})}))},orderSummary:function(){var o=this;r.default.orderSummary(this.orderSummaryParams).then((function(e){t.hideLoading(),200==e.data.code?(o.orderSummaryInfo=e.data.data,4!=o.memberType&&o.getMemberPriceInfo()):t.showToast({title:e.data.message,icon:"none"})}))},getMemberPriceInfo:function(){this.memberPriceInfo.arriveType="",this.memberPriceInfo.type="";try{var o=JSON.parse(t.getStorageSync("memberConfig")),e=JSON.parse(t.getStorageSync("userInfo")),r=0;if(e.plusFlag==o[o.length-1].type)return!1;for(var s=0;s<o.length;s++)o[s].type==e.plusFlag&&o[s].price>e.totalAmountDuring&&(r=o[s].price-e.totalAmountDuring);for(var i=1;i<o.length;i++){if(this.orderSummaryInfo.achievementAmount+e.totalAmountDuring+r<o[i].price)return this.memberPriceInfo.price=(o[i].price-this.orderSummaryInfo.achievementAmount-e.totalAmountDuring).toFixed(2),this.memberPriceInfo.type=o[i].name,!0;i>0&&0==r?(this.memberPriceInfo.arriveType=o[i].name,this.memberPriceInfo.type=o[i].name,this.memberPriceInfo.price=""):o[i].price-this.orderSummaryInfo.achievementAmount-e.totalAmountDuring<=0?(this.memberPriceInfo.arriveType=o[i].name,this.memberPriceInfo.price=""):(this.memberPriceInfo.price=(o[i].price-this.orderSummaryInfo.achievementAmount-e.totalAmountDuring).toFixed(2),this.memberPriceInfo.type=o[i].name)}}catch(a){}},gotoGoods:function(){this.$Router.push({path:"/pages/goodsList/index",query:{priceRangeLeft:this.memberPriceInfo.price}})},submitOrder:function(){this.orderInfo.address?this.orderInfo.address&&2==this.orderInfo.address.checkStatus?t.showToast({title:"请修改地址",icon:"none"}):this.goodStockState?t.showToast({title:"下单商品存在无货商品，请重新选择后下单",icon:"none"}):0==this.orderSummaryInfo.payAmount&&this.deductionFlag.score?"HIGH"==this.orderInfo.riskCheck.riskLevel?t.showToast({title:"抱歉检测到本次交易异常，为了您的账号安全，请稍后再试或联系客服处理，联系方式：400-100-8246",icon:"none"}):"MID"==this.orderInfo.riskCheck.riskLevel||this.orderInfo.riskCheck.firstAddrMobile&&!this.orderInfo.riskCheck.monthNewMember&&this.orderScoreCount.score>this.orderInfo.riskCheck.unsafeAmt?this.$refs.verificationCode.openVerificationCode():this.openPswPopup():this.submit():t.showToast({title:"请设置收货地址",icon:"none"})},openPswPopup:function(){this.orderInfo.hasPayPwd?this.$refs.pswPopup.openPswPopup():this.$refs.setPayPwd.openNoPswPopup()},codeSubmit:function(t){this.$set(this.orderSummaryParams,"code",t),this.submit()},submit:function(){var o=this;for(var e in this.orderSummaryParams.orders){for(var s=0;s<this.orderSummaryParams.orders[e].goodsList.length;s++)this.orderSummaryParams.orders[e].goodsList[s].inviterCode=t.getStorageSync("routerShareNumber")?t.getStorageSync("routerShareNumber"):"";this.orderSummaryParams.orders[e].orderMessage=this.orderMessage[this.orderSummaryParams.orders[e].storeId].orderMessage}this.submitFlag&&(this.submitFlag=!1,r.default.submitOrder(this.orderSummaryParams).then((function(e){o.submitFlag=!0,200==e.data.code?(o.$refs.verificationCode.closeVerificationCode(),0==o.orderSummaryInfo.payAmount?o.$Router.replace({path:"/pages/payment/index",query:{payId:e.data.data.payId,newtype:o.$Route.query.newtype||""}}):o.$Router.replace({path:"/pages/pay/index",query:{payId:e.data.data.payId,newtype:o.$Route.query.newtype||""}})):t.showToast({title:e.data.message,icon:"none"})})))},goldChange:function(t){this.deductionFlag.gold=t.detail.value,t.detail.value?this.orderSummaryParams["goldAmount"]=this.orderGoldCount.canUseGold:this.orderSummaryParams["goldAmount"]=0,this.orderSummary()},scoreChange:function(t){this.deductionFlag.score=t.detail.value,t.detail.value?this.orderSummaryParams["scoreNum"]=this.orderScoreCount.usefulScoreNum:this.orderSummaryParams["scoreNum"]=0,this.orderSummary()},storeCouponChange:function(t,o){this.$set(this.freightParams[t],"couponId",o),this.freightPromotions(t)},plateformCouponChange:function(t){this.$set(this.orderSummaryParams,"platformPromotionId",t),this.orderGold(this.orderSummaryParams)},promotionCouponChange:function(t,o){this.$set(this.couponParams[t],"promotionId",o),this.storeCoupons(t)},initStorePromotion:function(t,o){this.$set(this.storePromotion,t,[]),this.storePromotion[t]=o},openForgetPopup:function(){this.$refs.forgetPayPsw.openForgetPopup()},setSubmitPsw:function(t){this.$set(this.orderSummaryParams,"password",t),this.submit()},goodsNumBlur:function(t,o){t.target.value?(console.log(t.target.value),console.log(this.limitSettle.stockNumber),console.log(t.target.value<=this.limitSettle.stockNumber),Number(t.target.value)<1?(this.debounceHandle(1),this.$set(o,"goodsNum",1)):Number(t.target.value)<=this.limitSettle.stockNumber?(this.debounceHandle(parseInt(t.target.value)),this.$set(o,"goodsNum",parseInt(t.target.value))):(this.debounceHandle(parseInt(this.limitSettle.stockNumber)),this.$set(o,"goodsNum",parseInt(this.limitSettle.stockNumber)))):this.debounceHandle(1)},goodsNumChange:function(t,o){o?Number(t.goodsNum)+1<=this.limitSettle.stockNumber&&(this.debounceHandle(Number(t.goodsNum)+1),this.$set(t,"goodsNum",Number(t.goodsNum)+1)):t.goodsNum>1&&(this.debounceHandle(Number(t.goodsNum)-1),this.$set(t,"goodsNum",Number(t.goodsNum)-1))},debounceHandle:function(t){var o=this;return this.limitSettle.time&&clearTimeout(this.limitSettle.time),function(){o.limitSettle.time=setTimeout((function(){o.pageInitParams(t)}),500)}()}}};o.default=l}).call(this,e("543d")["default"])},"972b":function(t,o,e){"use strict";var r=e("9ae3"),s=e.n(r);s.a},"9ae3":function(t,o,e){}},[["5e04","common/runtime","common/vendor"]]]);