(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-settlement-increase"],{"033f":function(t,e,o){"use strict";o.r(e);var i=o("fdc6"),a=o("b1b2");for(var n in a)["default"].indexOf(n)<0&&function(t){o.d(e,t,(function(){return a[t]}))}(n);o("bd8c");var s,r=o("f0c5"),d=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"7ea5f717",null,!1,i["a"],s);e["default"]=d.exports},"22f3":function(t,e,o){"use strict";var i=o("ce82"),a=o.n(i);a.a},"2d66":function(t,e,o){var i=o("4bad");e=i(!1),e.push([t.i,".disCount[data-v-7ea5f717]{width:calc(100% - %?44?%);margin:0 auto;height:%?88?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:%?1?% solid #e6e6e6;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.couponsNum[data-v-7ea5f717]{height:%?32?%;line-height:%?32?%;text-align:center;color:#ff1558;background-color:#ffecf1;padding:0 %?14?%;border-radius:%?100?%;margin-left:%?10?%}.couponIcon[data-v-7ea5f717]{height:%?88?%;width:%?32?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/moreD.png) no-repeat 50%;background-size:%?32?% %?8?%}.couponPopup[data-v-7ea5f717]{height:%?752?%;width:100%;background-color:#fff}.popupTitle[data-v-7ea5f717]{width:100%;height:%?100?%;line-height:%?100?%;font-size:%?34?%;text-align:center}.discountPrice[data-v-7ea5f717]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:right;margin-right:%?20?%}.couponMain[data-v-7ea5f717]{width:100%;height:calc(100% - %?200?%)}.everyRow[data-v-7ea5f717]{width:%?702?%;margin:0 auto;margin-bottom:%?30?%;border-radius:%?6?%;box-shadow:0 0 18px 0 rgba(0,0,0,.08);display:-webkit-box;display:-webkit-flex;display:flex;height:%?170?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-right:%?24?%}.couponPrice[data-v-7ea5f717]{width:%?220?%;height:%?170?%;padding:%?24?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/orderCoup.png) no-repeat 50%;background-size:%?220?% %?170?%;text-align:center;color:#fff}.couponPrice.unavailableActive[data-v-7ea5f717]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/orderCoupUn.png) no-repeat 50%}.sureBtn[data-v-7ea5f717]{width:100%;height:%?100?%;text-align:center;line-height:%?100?%;font-size:%?32?%;color:#fff;background-color:#ff1558}.price[data-v-7ea5f717]{font-size:%?60?%}.price uni-text[data-v-7ea5f717]{font-size:%?38?%}.type[data-v-7ea5f717]{font-size:%?24?%;margin-top:%?4?%}.couponInfo[data-v-7ea5f717]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:%?170?%;padding:%?26?% %?84?% %?26?% %?24?%}.couponType[data-v-7ea5f717]{width:100%;height:%?72?%;line-height:%?36?%;color:#333;font-weight:700}.disCountType[data-v-7ea5f717]{color:#fff;margin-right:%?22?%;padding:0 %?10?%;background-color:#ff1558;height:%?24?%;line-height:%?24?%;border-radius:%?100?%;font-size:%?18?%}.unavailableActive[data-v-7ea5f717]{background-color:#ddd}.couponName[data-v-7ea5f717]{font-weight:%?700?%;color:#333}.couponTime[data-v-7ea5f717]{color:#929292;font-size:%?22?%}.couponBtnIcon[data-v-7ea5f717]{width:%?36?%;height:%?36?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;background-size:%?36?% %?36?%}.couponBtnIcon.active[data-v-7ea5f717]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;background-size:%?36?% %?36?%}.availableNotUse[data-v-7ea5f717]{width:%?702?%;height:%?98?%;line-height:%?98?%;text-align:center;background-color:#fff;color:#999;margin:0 auto;margin-bottom:%?30?%;border-radius:%?6?%;font-size:%?32?%;border:%?1?% solid #e4e4e4}.unavailable[data-v-7ea5f717]{width:100%;height:%?94?%;line-height:%?94?%;padding:0 %?24?%;font-size:%?30?%;color:#333}",""]),t.exports=e},"3e16":function(t,e,o){"use strict";o.r(e);var i=o("98e1"),a=o("e14f");for(var n in a)["default"].indexOf(n)<0&&function(t){o.d(e,t,(function(){return a[t]}))}(n);o("22f3");var s,r=o("f0c5"),d=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"7bea508b",null,!1,i["a"],s);e["default"]=d.exports},"487d":function(t,e,o){"use strict";var i=o("e129"),a=o.n(i);a.a},"5ebd":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:["storeCouponsInfo","storeId","storeName","chooseStoreId"],data:function(){return{}},methods:{openCouponPopup:function(){this.$refs.couponPopup.open()},clearCoupon:function(){this.$emit("couponChange",this.storeId,"")},closeCouponPopup:function(){this.$refs.couponPopup.close()},couponChange:function(t){t.id!=this.chooseStoreId&&this.$emit("couponChange",this.storeId,t.id)}},mounted:function(){}};e.default=i},"5ebe":function(t,e,o){"use strict";o.r(e);var i=o("76a5"),a=o.n(i);for(var n in i)["default"].indexOf(n)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(n);e["default"]=a.a},"76a5":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:["storeName","storePromotion","storeId","choosePromotionId"],data:function(){return{}},methods:{openPromotionPopup:function(){this.$refs.storePromotion.open()},closePromotionPopup:function(){this.$refs.storePromotion.close()},promotionChange:function(t){t.id!=this.choosePromotionId&&this.$emit("promotionChange",this.storeId,t.id)}},mounted:function(){}};e.default=i},"85f5":function(t,e,o){var i=o("2d66");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=o("4f06").default;a("8c308338",i,!0,{sourceMap:!1,shadowMode:!1})},"8e41":function(t,e,o){"use strict";var i=o("4ea4");o("ac1f"),o("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(o("1087")),n=(i(o("5315")),i(o("033f")),i(o("98f7"))),s=i(o("b1f7")),r=i(o("4406")),d=i(o("639e")),c=i(o("dcca")),u={data:function(){return{orderInfo:{},imgBaseUrls:"",orderGoldCount:{canUseGold:"",accountGold:""},platformPromotsParams:{lotteryId:"",addressId:"",orders:[]},orderSummaryParams:{},orderScoreCount:{usefulScoreNum:"",score:""},orderSummaryInfo:{},deductionFlag:{score:!1,gold:!0},submitFlag:!0}},onShow:function(){for(var t in this.zhuge.track("填写订单-落地页"),this.deductionFlag)this.deductionFlag[t]=!1;this.imgBaseUrls=this.$config.imgBaseUrl;var e=this.initParams();this.giftBagPageInit(e)},components:{storePromotionView:n.default,setPayPwd:s.default,forgetPayPsw:r.default,verificationCode:c.default,pswPopup:d.default},methods:{initParams:function(){return{itemId:this.$Route.query.goodsId,goodsNum:this.$Route.query.goodsNum,inviterCode:uni.getStorageSync("routerShareNumber")?uni.getStorageSync("routerShareNumber"):""}},giftBagPageInit:function(t){var e=this;uni.showLoading({title:"加载中..."}),a.default.giftBagPageInit(t).then((function(t){200==t.data.code?(e.orderInfo=t.data.data,e.giftBagGoldOrder()):uni.showToast({title:t.data.message,icon:"none"})}))},giftBagGoldOrder:function(){var t=this;a.default.giftBagGoldOrder(this.initParams()).then((function(e){200==e.data.code?(t.orderSummaryParams.goldAmount=e.data.data.canUseGold,t.orderGoldCount=e.data.data,t.orderGoldCount.canUseGold?t.deductionFlag.gold=!0:t.deductionFlag.gold=!1,t.giftBagScoreOrder()):uni.showToast({title:e.data.message,icon:"none"})}))},giftBagScoreOrder:function(){var t=this;a.default.giftBagScoreOrder(this.initParams()).then((function(e){200==e.data.code?(t.orderScoreCount=e.data.data,t.giftBagSummaryOrder()):uni.showToast({title:e.data.message,icon:"none"})}))},giftBagSummaryOrder:function(){var t=this;this.orderSummaryParams=Object.assign(this.orderSummaryParams,this.initParams()),a.default.giftBagSummaryOrder(this.orderSummaryParams).then((function(e){uni.hideLoading(),200==e.data.code?t.orderSummaryInfo=e.data.data:uni.showToast({title:e.data.message,icon:"none"})}))},submitOrder:function(){0==this.orderSummaryInfo.payAmount&&this.deductionFlag.score?"HIGH"==this.orderInfo.riskCheck.riskLevel?uni.showToast({title:"抱歉检测到本次交易异常，为了您的账号安全，请稍后再试或联系客服处理，联系方式：400-100-8246",icon:"none"}):"MID"==this.orderInfo.riskCheck.riskLevel||this.orderInfo.riskCheck.firstAddrMobile&&!this.orderInfo.riskCheck.monthNewMember&&this.orderScoreCount.score>this.orderInfo.riskCheck.unsafeAmt?this.$refs.verificationCode.openVerificationCode():this.openPswPopup():this.giftBagSubmitOrder()},openPswPopup:function(){this.orderInfo.hasPayPwd?this.$refs.pswPopup.openPswPopup():this.$refs.setPayPwd.openNoPswPopup()},codeSubmit:function(t){this.$set(this.orderSummaryParams,"code",t),this.submit()},giftBagSubmitOrder:function(){var t=this;this.submitFlag&&(this.submitFlag=!1,a.default.giftBagSubmitOrder(this.orderSummaryParams).then((function(e){t.submitFlag=!0,200==e.data.code?(t.$refs.verificationCode.closeVerificationCode(),0==t.orderSummaryInfo.payAmount?t.$Router.replace({path:"/pages/payment/index",query:{payId:e.data.data.payId,newtype:t.$Route.query.newtype||"",increase:!0}}):t.$Router.replace({path:"/pages/pay/index",query:{payId:e.data.data.payId,newtype:t.$Route.query.newtype||"",increase:!0}})):uni.showToast({title:e.data.message,icon:"none"})})))},goldChange:function(t){this.deductionFlag.gold=t.detail.value,t.detail.value?this.orderSummaryParams["goldAmount"]=this.orderGoldCount.canUseGold:this.orderSummaryParams["goldAmount"]=0,this.giftBagSummaryOrder()},scoreChange:function(t){this.deductionFlag.score=t.detail.value,t.detail.value?this.orderSummaryParams["scoreNum"]=this.orderScoreCount.usefulScoreNum:this.orderSummaryParams["scoreNum"]=0,this.giftBagSummaryOrder()},openForgetPopup:function(){this.$refs.forgetPayPsw.openForgetPopup()},setSubmitPsw:function(t){this.$set(this.orderSummaryParams,"password",t),this.submit()}}};e.default=u},"98e1":function(t,e,o){"use strict";var i;o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return n})),o.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"page settlement"},[o("defaultTitle",{attrs:{dto:{title:"填写订单",bottomColor:"#E6E6E6"}}}),o("v-uni-view",{staticClass:"shopName"},[t._v(t._s(t.orderInfo.storeName))]),o("v-uni-view",{staticClass:"goodsCont"},[o("v-uni-image",{attrs:{src:t.imgBaseUrls+t.orderInfo.goodsImage,mode:""}}),o("v-uni-view",{staticClass:"goodsInfo"},[o("v-uni-view",{staticClass:"goodsText ellipsis-two"},[t._v(t._s(t.orderInfo.goodsName))]),o("v-uni-view",{staticClass:"goodsPrice"},[o("v-uni-text",[t._v("¥"+t._s(t.orderInfo.goodsPrice))]),o("v-uni-text",{staticClass:"goodsNum"},[t._v("x"+t._s(t.orderInfo.goodsNum))])],1)],1)],1),o("v-uni-view",{staticClass:"fmGoodsMsg"},[o("v-uni-text",[t._v("运费")]),o("v-uni-text",{staticClass:"colorChange"},[t._v(t._s(t.orderInfo.freightAmount?"￥"+t.orderInfo.freightAmount:"包邮"))])],1),o("v-uni-view",{staticClass:"integralMain"},[o("v-uni-text",[t._v("使用库豆")]),t.orderGoldCount.accountGold>0&&t.orderGoldCount.canUseGold?o("v-uni-text",{staticClass:"intergalInfo"},[t._v("库豆"+t._s(t.orderGoldCount.accountGold)+",本次可抵用￥"+t._s(t.orderGoldCount.canUseGold))]):t._e(),t.orderGoldCount.accountGold>0&&!t.orderGoldCount.canUseGold?o("v-uni-text",{staticClass:"intergalInfo"},[t._v("购买的商品不支持使用库豆支付")]):t._e(),t.orderGoldCount.accountGold<=0?o("v-uni-text",{staticClass:"intergalInfo"},[t._v("本次无可用库豆")]):t._e(),o("v-uni-view",{staticClass:"intergalBtn"},[o("v-uni-switch",{staticStyle:{transform:"scale(0.7,0.7)"},attrs:{disabled:t.orderGoldCount.canUseGold<=0,checked:t.deductionFlag.gold,color:"#FF1558"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.goldChange.apply(void 0,arguments)}}})],1)],1),o("v-uni-view",{staticClass:"integralMain scoreBox"},[o("v-uni-text",[t._v("使用积分")]),t.orderScoreCount.usefulScoreNum>0?o("v-uni-text",{staticClass:"intergalInfo"},[t._v("本次可用"+t._s(t.orderScoreCount.usefulScoreNum)+",本次可抵用￥"+t._s(t.orderScoreCount.score))]):t._e(),t.orderScoreCount.usefulScoreNum<=0?o("v-uni-text",{staticClass:"intergalInfo"},[t._v("本次无可用积分")]):t._e(),o("v-uni-view",{staticClass:"intergalBtn"},[o("v-uni-switch",{staticStyle:{transform:"scale(0.7,0.7)"},attrs:{disabled:t.orderScoreCount.score<=0,checked:t.deductionFlag.score,color:"#FF1558"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.scoreChange.apply(void 0,arguments)}}})],1)],1),o("v-uni-view",{staticClass:"deduction"},[o("v-uni-text",[t._v("商品金额")]),o("v-uni-text",[t._v("￥"+t._s(t.orderSummaryInfo.goodsFinalAmount))])],1),t.orderSummaryInfo.freightAmount>0?o("v-uni-view",{staticClass:"deduction"},[o("v-uni-text",[t._v("运费")]),o("v-uni-text",[t._v("￥"+t._s(t.orderSummaryInfo.freightAmount))])],1):t._e(),t.orderSummaryInfo.socreAmount>0?o("v-uni-view",{staticClass:"deduction"},[o("v-uni-text",[t._v("积分抵扣")]),o("v-uni-text",[t._v("-￥"+t._s(t.orderSummaryInfo.socreAmount))])],1):t._e(),t.orderSummaryInfo.goldAmount>0?o("v-uni-view",{staticClass:"deduction"},[o("v-uni-text",[t._v("库豆抵扣")]),o("v-uni-text",[t._v("-￥"+t._s(t.orderSummaryInfo.goldAmount))])],1):t._e(),o("v-uni-view",{staticClass:"goPayBox"},[o("v-uni-view",{staticClass:"payText"},[t._v("实付款："),o("v-uni-text",{staticClass:"symbol"},[t._v("￥")]),o("v-uni-text",{staticClass:"payAmount"},[t._v(t._s(t.orderSummaryInfo.payAmount?t.orderSummaryInfo.payAmount:0))])],1),o("v-uni-view",{staticClass:"submitBtn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submitOrder.apply(void 0,arguments)}}},[t._v("提交订单")])],1),o("pswPopup",{ref:"pswPopup",on:{openForgetPopup:function(e){arguments[0]=e=t.$handleEvent(e),t.openForgetPopup.apply(void 0,arguments)},submitPay:function(e){arguments[0]=e=t.$handleEvent(e),t.setSubmitPsw.apply(void 0,arguments)}}}),o("setPayPwd",{ref:"setPayPwd",attrs:{payInfo:t.orderInfo},on:{openPswPopup:function(e){arguments[0]=e=t.$handleEvent(e),t.openPswPopup.apply(void 0,arguments)},submitPay:function(e){arguments[0]=e=t.$handleEvent(e),t.setSubmitPsw.apply(void 0,arguments)}}}),o("forgetPayPsw",{ref:"forgetPayPsw",attrs:{payInfo:t.orderInfo},on:{openPswPopup:function(e){arguments[0]=e=t.$handleEvent(e),t.openPswPopup.apply(void 0,arguments)},submitPay:function(e){arguments[0]=e=t.$handleEvent(e),t.setSubmitPsw.apply(void 0,arguments)}}}),o("verificationCode",{ref:"verificationCode",attrs:{payInfo:t.orderInfo},on:{codeSubmit:function(e){arguments[0]=e=t.$handleEvent(e),t.codeSubmit.apply(void 0,arguments)}}}),o("share",{attrs:{shareImageList:t.shareImage}})],1)},n=[]},"98f7":function(t,e,o){"use strict";o.r(e);var i=o("fad1"),a=o("5ebe");for(var n in a)["default"].indexOf(n)<0&&function(t){o.d(e,t,(function(){return a[t]}))}(n);o("487d");var s,r=o("f0c5"),d=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"ed540348",null,!1,i["a"],s);e["default"]=d.exports},abc7:function(t,e,o){var i=o("4bad");e=i(!1),e.push([t.i,".settlement[data-v-7bea508b]{\npadding-top:%?88?%;\npadding-bottom:calc(%?120?% + constant(safe-area-inset-bottom));padding-bottom:calc(%?120?% + env(safe-area-inset-bottom))}.settlementTitle[data-v-7bea508b]{width:100%;line-height:%?40?%;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?34?%;font-weight:700}.telephone[data-v-7bea508b]{margin-left:%?20?%}.addressMain[data-v-7bea508b]{width:90%;color:#333;line-height:%?36?%;margin-top:%?24?%}.arrow[data-v-7bea508b]{width:%?10?%;height:%?20?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;background-size:%?10?% %?20?%;position:absolute;right:%?24?%;top:50%;margin-top:%?-10?%}.settlementLine[data-v-7bea508b]{height:%?8?%;width:100%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pic_ct.png) no-repeat 50%;background-size:100% %?8?%}.addressChange[data-v-7bea508b]{width:100%;margin-bottom:.2rem;padding-left:.24rem;color:#ff1558}.orderMain[data-v-7bea508b]{width:100%;margin-bottom:%?60?%}.shopName[data-v-7bea508b]{width:100%;line-height:%?42?%;padding:%?34?% %?24?% %?12?%;font-size:%?30?%;color:#333;font-weight:700}.goodsCont[data-v-7bea508b]{position:relative;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;padding:%?10?% %?24?%}.goodsCont uni-image[data-v-7bea508b]{width:%?220?%;height:%?220?%}.goodsInfo[data-v-7bea508b]{padding:%?20?% 0;margin-left:%?24?%;-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative}.goodsText[data-v-7bea508b]{width:100%;max-height:%?80?%;color:#333}.goodSpce[data-v-7bea508b]{width:100%;height:%?28?%;line-height:%?28?%;font-size:%?24?%;color:#999;margin-top:%?12?%}.goodsPrice[data-v-7bea508b]{height:%?44?%;line-height:%?44?%;position:absolute;bottom:%?20?%;color:#ff1558;width:100%;font-size:%?30?%}.goodsNum[data-v-7bea508b]{position:absolute;right:0;top:0;color:#999;font-size:%?30?%}.fmGoodsMsg[data-v-7bea508b]{width:calc(100% - %?48?%);height:%?88?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin:0 auto;-webkit-box-align:center;-webkit-align-items:center;align-items:center;display:flex;border-bottom:1px solid #e6e6e6}.colorChange[data-v-7bea508b]{color:#999;line-height:%?44?%;height:%?44?%;text-align:right;font-size:%?28?%}.activityBox[data-v-7bea508b]{display:inline-block;height:%?32?%;line-height:%?32?%;font-size:%?22?%;text-align:center;padding:0 %?14?%;border-radius:%?100?%;color:#ff7e18;background:#ffeee1}.promotionsActivityBox[data-v-7bea508b]{display:inline-block;height:%?32?%;line-height:%?32?%;font-size:%?20?%;text-align:center;padding:0 %?14?%;border-radius:%?100?%;background:#242424;color:#ffdf8c}.fmGoodsMsg uni-input[data-v-7bea508b]{font-size:%?24?%;-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-left:%?20?%;height:100%;line-height:%?88?%}.price[data-v-7bea508b]{font-size:%?24?%;color:#333}.goPayBox[data-v-7bea508b]{width:100%;height:%?100?%;line-height:%?100?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;position:fixed;left:0;bottom:0;bottom:calc(%?0?% + constant(safe-area-inset-bottom));bottom:calc(%?0?% + env(safe-area-inset-bottom));border-top:%?1?% solid #e6e6e6;z-index:9}.payText[data-v-7bea508b]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#4a4a4a;text-align:right;margin-right:%?48?%;line-height:%?100?%}.submitBtn[data-v-7bea508b]{width:%?252?%;height:%?100?%;line-height:%?100?%;text-align:center;line-height:%?100?%;color:#fff;font-size:%?32?%;background-color:#ff1558}.nullAddress[data-v-7bea508b]{line-height:%?40?%;font-size:%?34?%;font-weight:700}.integralMain[data-v-7bea508b]{height:%?88?%;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;margin-left:%?24?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:%?1?% solid #e4e4e4;padding-right:%?24?%}.separatePromotion[data-v-7bea508b]{padding:0 %?24?%}.marking_plus[data-v-7bea508b]{display:inline-block;background:#080f23;border-radius:8px 8px 8px 2px;font-size:11px;color:#ffe9d3;padding:0 7px;margin-left:%?20?%}.intergalInfo[data-v-7bea508b]{font-size:%?22?%;color:#999;-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:right}.intergalBtn[data-v-7bea508b]{width:%?89?%;margin-left:%?24?%;margin-right:%?24?%}.discountPrice[data-v-7bea508b]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?24?%}.priceSymbol[data-v-7bea508b]{font-size:%?24?%;color:#ff1558}.symbolPrice[data-v-7bea508b]{font-size:%?32?%;color:#ff1558;margin-right:%?12?%}.symbol[data-v-7bea508b]{font-size:%?22?%;color:#ff1558}.payAmount[data-v-7bea508b]{color:#ff1558;font-size:%?32?%}.deduction[data-v-7bea508b]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:0 %?24?%;color:#333;height:%?40?%;line-height:%?40?%}.scoreBox[data-v-7bea508b]{margin-bottom:%?40?%}.member_identification[data-v-7bea508b]{height:%?26?%;width:calc(100% - %?48?%);margin:%?20?% auto %?10?%}.cartHint[data-v-7bea508b]{width:100%;height:%?90?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 %?20?%;position:fixed;color:#8e5b17;background-color:#fbf4ea;font-size:%?24?%;font-weight:400;bottom:calc(%?100?% + constant(safe-area-inset-bottom));bottom:calc(%?100?% + env(safe-area-inset-bottom));z-index:9}.cartHint uni-text[data-v-7bea508b]{color:#333;font-weight:500}.goBuyBtn[data-v-7bea508b]{color:#8e5b17;font-weight:500}.cartHint .memberGoodsPrice[data-v-7bea508b]{color:#ff1558}.deliveryTime[data-v-7bea508b]{width:calc(100% - %?40?%);height:%?58?%;background-color:#fee5eb;margin:%?5?% auto;border-radius:%?20?%;color:#fe325c;font-size:%?24?%;padding:0 %?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.deliveryTime uni-image[data-v-7bea508b]{width:%?20?%;height:%?20?%;margin-right:%?12?%}",""]),t.exports=e},acd6:function(t,e,o){var i=o("4bad");e=i(!1),e.push([t.i,".disCount[data-v-ed540348]{width:calc(100% - %?44?%);margin:0 auto;height:%?88?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:%?1?% solid #e6e6e6;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.couponIcon[data-v-ed540348]{height:%?88?%;width:%?32?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/moreD.png) no-repeat 50%;background-size:%?32?% %?8?%}.couponPopup[data-v-ed540348]{height:%?752?%;width:100%;background-color:#fff}.popupTitle[data-v-ed540348]{width:100%;height:%?100?%;line-height:%?100?%;font-size:%?34?%;text-align:center}.couponMain[data-v-ed540348]{width:100%;height:calc(100% - %?200?%)}.promotionText[data-v-ed540348]{text-align:right;-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-right:%?20?%}.sureBtn[data-v-ed540348]{width:100%;height:%?100?%;text-align:center;line-height:%?100?%;font-size:%?32?%;color:#fff;background-color:#ff1558}.everyRow[data-v-ed540348]{width:%?702?%;margin:0 auto;margin-bottom:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;height:%?88?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-right:%?24?%}.promotionView[data-v-ed540348]{color:#666;-webkit-box-flex:1;-webkit-flex:1;flex:1}.couponBtnIcon[data-v-ed540348]{width:%?36?%;height:%?36?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;background-size:%?36?% %?36?%}.couponBtnIcon.active[data-v-ed540348]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;background-size:%?36?% %?36?%}",""]),t.exports=e},b1b2:function(t,e,o){"use strict";o.r(e);var i=o("5ebd"),a=o.n(i);for(var n in i)["default"].indexOf(n)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(n);e["default"]=a.a},bd8c:function(t,e,o){"use strict";var i=o("85f5"),a=o.n(i);a.a},ce82:function(t,e,o){var i=o("abc7");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=o("4f06").default;a("c99ce7b2",i,!0,{sourceMap:!1,shadowMode:!1})},e129:function(t,e,o){var i=o("acd6");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=o("4f06").default;a("fbdb7c10",i,!0,{sourceMap:!1,shadowMode:!1})},e14f:function(t,e,o){"use strict";o.r(e);var i=o("8e41"),a=o.n(i);for(var n in i)["default"].indexOf(n)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(n);e["default"]=a.a},fad1:function(t,e,o){"use strict";o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return n})),o.d(e,"a",(function(){return i}));var i={uniPopup:o("1c89").default},a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"page"},[o("v-uni-view",{staticClass:"disCount",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openPromotionPopup.apply(void 0,arguments)}}},[o("v-uni-view",[o("v-uni-text",[t._v("促销")])],1),o("v-uni-view",{staticClass:"promotionText"},[t._v(t._s(t.storePromotion[t.storeId][0].name))]),o("v-uni-view",{staticClass:"couponIcon"})],1),o("uni-popup",{ref:"storePromotion",attrs:{type:"bottom"}},[o("v-uni-view",{staticClass:"couponPopup"},[o("v-uni-view",{staticClass:"popupTitle"},[t._v(t._s(t.storeName))]),o("v-uni-scroll-view",{staticClass:"couponMain",attrs:{"scroll-y":"true"}},t._l(t.storePromotion[t.storeId],(function(e,i){return o("v-uni-view",{key:i,staticClass:"everyRow"},[o("v-uni-view",{staticClass:"promotionView"},[t._v(t._s(e.name))]),o("v-uni-view",{staticClass:"couponBtnIcon",class:t.choosePromotionId==e.id?"active":"",on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.promotionChange(e)}}})],1)})),1),o("v-uni-view",{staticClass:"sureBtn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closePromotionPopup.apply(void 0,arguments)}}},[t._v("完成")])],1)],1)],1)},n=[]},fdc6:function(t,e,o){"use strict";o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return n})),o.d(e,"a",(function(){return i}));var i={uniPopup:o("1c89").default},a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"page"},[o("v-uni-view",{staticClass:"disCount",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openCouponPopup.apply(void 0,arguments)}}},[o("v-uni-view",[o("v-uni-text",[t._v("店铺优惠券")]),o("v-uni-text",{staticClass:"couponsNum"},[t._v(t._s(t.storeCouponsInfo[t.storeId].availableList.length)+"张可用")])],1),t._l(t.storeCouponsInfo[t.storeId].availableList,(function(e,i){return t.chooseStoreId==e.id?o("v-uni-view",{key:i,staticClass:"discountPrice"},[e.discountValue?o("v-uni-text",[t._v("-￥"+t._s(e.discountValue))]):t._e()],1):t._e()})),o("v-uni-view",{staticClass:"couponIcon"})],2),o("uni-popup",{ref:"couponPopup",attrs:{type:"bottom"}},[o("v-uni-view",{staticClass:"couponPopup"},[o("v-uni-view",{staticClass:"popupTitle"},[t._v(t._s(t.storeName))]),o("v-uni-scroll-view",{staticClass:"couponMain",attrs:{"scroll-y":"true"}},[t._l(t.storeCouponsInfo[t.storeId].availableList,(function(e,i){return o("v-uni-view",{key:i,staticClass:"everyRow"},[o("v-uni-view",{staticClass:"couponPrice"},[o("v-uni-view",{staticClass:"price"},[o("v-uni-text",[t._v("￥")]),t._v(t._s(e.discountValue))],1),o("v-uni-view",{staticClass:"type"},[t._v(t._s(1==e.condType?"满":"每满")+t._s(e.condValue)+"使用")])],1),o("v-uni-view",{staticClass:"couponInfo"},[o("v-uni-view",{staticClass:"couponType"},[o("v-uni-text",{staticClass:"disCountType"},[t._v("满减券")]),o("v-uni-text",{staticClass:"couponName"},[t._v(t._s(e.name))])],1),o("v-uni-view",{staticClass:"couponTime"},[t._v(t._s(t.$utils.formatDate(e.startTime,"yyyy.MM.dd"))+"-"+t._s(t.$utils.formatDate(e.endTime,"yyyy.MM.dd")))])],1),o("v-uni-view",{staticClass:"couponBtnIcon",class:t.chooseStoreId==e.id?"active":"",on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.couponChange(e)}}})],1)})),o("v-uni-view",{staticClass:"availableNotUse",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearCoupon.apply(void 0,arguments)}}},[t._v("不使用优惠券")]),o("v-uni-view",{staticClass:"unavailable"},[t._v("不可用优惠券")]),t._l(t.storeCouponsInfo[t.storeId].unavailableList,(function(e,i){return o("v-uni-view",{key:i,staticClass:"everyRow"},[o("v-uni-view",{staticClass:"couponPrice unavailableActive"},[o("v-uni-view",{staticClass:"price"},[o("v-uni-text",[t._v("￥")]),t._v(t._s(e.discountValue))],1),o("v-uni-view",{staticClass:"type"},[t._v(t._s(1==e.condType?"满":"每满")+t._s(e.condValue)+"使用")])],1),o("v-uni-view",{staticClass:"couponInfo"},[o("v-uni-view",{staticClass:"couponType"},[o("v-uni-text",{staticClass:"disCountType unavailableActive"},[t._v("满减券")]),o("v-uni-text",{staticClass:"couponName"},[t._v(t._s(e.name))])],1),o("v-uni-view",{staticClass:"couponTime"},[t._v(t._s(t.$utils.formatDate(e.startTime,"yyyy.MM.dd"))+"-"+t._s(t.$utils.formatDate(e.endTime,"yyyy.MM.dd")))])],1)],1)}))],2),o("v-uni-view",{staticClass:"sureBtn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closeCouponPopup.apply(void 0,arguments)}}},[t._v("完成")])],1)],1)],1)},n=[]}}]);