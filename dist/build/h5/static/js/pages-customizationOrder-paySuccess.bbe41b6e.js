(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-customizationOrder-paySuccess"],{"0b8b":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={queryMyOrders:"/trade/customer/queryMyOrders",addCart:"/trade/cart/addCart",getCarts:"/trade/cart/getCarts",editCart:"/trade/cart/editCart",moveToFavorite:"/trade/cart/moveToFavorite/",removeCarts:"/trade/cart/removeCarts",moveToFavorites:"/trade/cart/moveToFavorites",evaluateGoods:"/trade/customer/evaluateGoods/",appendEvaluate:"/trade/customer/evaluateGoods/append/",pageInit:"/trade/order/pageInit",storePromotions:"/trade/order/storePromotions",storeCoupons:"/trade/order/storeCoupons",freightPromotions:"/trade/order/freightPromotions",storeOrderAmount:"/trade/order/storeOrderAmount",platformPromotions:"/trade/order/platformPromotions",orderGold:"/trade/order/orderGold",orderScore:"trade/order/orderScore",orderSummary:"/trade/order/orderSummary",submitOrder:"/trade/order/submitOrder",deleteOrder:"/trade/customer/deleteOrder/",getCustomerRefundOrderPage:"trade/refund/customer/getCustomerRefundOrderPage",refundDetail:"/trade/refund/customer/refundDetail/",queryOrderDetail:"/trade/customer/queryOrderDetail/",cancelOrder:"/trade/customer/cancel/",applyFofRefund:"/trade/refund/customer/applyFofRefund",refundReason:"/trade/refund/customer/refundReason/",submitApplyFofRefund:"/trade/refund/customer/submitApplyFofRefund",extendShip:"/trade/customer/extendShip/",confirmReceipt:"/trade/customer/confirmReceipt/",queryMyUnCommentOrders:"/trade/customer/queryMyUnCommentOrders",cancelTrade:"/trade/refund/customer/cancel/",platformInvolve:"/trade/refund/customer/platformInvolve/",summary:"/trade/pay/summary/",submitPay:"/trade/pay/submit",defaultCards:"/trade/pay/defaultCards",selectCards:"/trade/pay/selectCards",sendOrderSms:"/trade/order/sendOrderSms",sendSMS:"/trade/pay/sendSMS/",submitLogisticsInfo:"/trade/refund/customer/submitLogisticsInfo",tradeFirstOrder:"/trade/customer/firstOrder/",validSubmitCarts:"/trade/cart/validSubmitCarts",cusPageInit:"/trade/customize/order/pageInit",submitCusOrder:"/trade/customize/order/submitOrder",buildPayOrder:"/trade/customize/order/buildPayOrder",submitPayOrder:"/trade/customize/order/submitPayOrder",getCompanyPaymentInfo:"/trade/customize/order/getCompanyPaymentInfo",listPayLog:"/trade/customize/order/listPayLog/",listOrderPage:"/trade/customize/order/listOrderPage",getOrderInfo:"/trade/customize/order/getOrderInfo/",cancelCusOrder:"/trade/customize/order/cancelOrder/",giftBagPageInit:"/trade/giftBagTransfer/order/pageInit",giftBagGoldOrder:"/trade/giftBagTransfer/order/goldOrder",giftBagScoreOrder:"/trade/giftBagTransfer/order/scoreOrder",giftBagSummaryOrder:"/trade/giftBagTransfer/order/summaryOrder",giftBagSubmitOrder:"/trade/giftBagTransfer/order/submitOrder",giftBagPageOrders:"/trade/giftBagTransfer/order/pageOrders",giftBagPageGetLogs:"/trade/giftBagTransfer/order/pageGetLogs",giftBagCancelOrder:"/trade/giftBagTransfer/order/cancelOrder",giftBagGeneratePoster:"/trade/giftBagTransfer/order/generatePoster/",giftBagInfo:"/trade/giftBagTransfer/order/giftBagInfo/"},n=r;e.default=n},1087:function(t,e,a){"use strict";var r=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(a("b775")),i=r(a("0b8b")),o={queryMyOrders:function(t,e){return n.default.post(i.default.queryMyOrders,{pagePO:t,orderState:e})},addCart:function(t){return n.default.post(i.default.addCart,t)},getCarts:function(){return n.default.post(i.default.getCarts,{})},editCart:function(t){return n.default.post(i.default.editCart,t)},moveToFavorite:function(t){return n.default.post(i.default.moveToFavorite+t,{})},moveToFavorites:function(t){return n.default.post(i.default.moveToFavorites,t)},removeCarts:function(t){return n.default.post(i.default.removeCarts,t)},evaluateGoods:function(t){return n.default.post(i.default.evaluateGoods+t,{})},appendEvaluate:function(t){return n.default.post(i.default.appendEvaluate+t,{})},pageInit:function(t){return n.default.post(i.default.pageInit,t)},storePromotions:function(t){return n.default.post(i.default.storePromotions,t)},storeCoupons:function(t){return n.default.post(i.default.storeCoupons,t)},freightPromotions:function(t){return n.default.post(i.default.freightPromotions,t)},storeOrderAmount:function(t){return n.default.post(i.default.storeOrderAmount,t)},platformPromotions:function(t){return n.default.post(i.default.platformPromotions,t)},orderGold:function(t){return n.default.post(i.default.orderGold,t)},orderScore:function(t){return n.default.post(i.default.orderScore,t)},orderSummary:function(t){return n.default.post(i.default.orderSummary,t)},submitOrder:function(t){return n.default.post(i.default.submitOrder,t)},deleteOrder:function(t){return n.default.post(i.default.deleteOrder+t,{})},getCustomerRefundOrderPage:function(t){return n.default.post(i.default.getCustomerRefundOrderPage,t)},refundDetail:function(t){return n.default.post(i.default.refundDetail+t,{})},queryOrderDetail:function(t){return n.default.post(i.default.queryOrderDetail+t,{})},cancelOrder:function(t){return n.default.post(i.default.cancelOrder+t,{})},applyFofRefund:function(t){return n.default.post(i.default.applyFofRefund,t)},refundReason:function(t){return n.default.post(i.default.refundReason+t,{})},submitApplyFofRefund:function(t){return n.default.post(i.default.submitApplyFofRefund,t)},extendShip:function(t){return n.default.post(i.default.extendShip+t,{})},confirmReceipt:function(t){return n.default.post(i.default.confirmReceipt+t,{})},queryMyUnCommentOrders:function(t){return n.default.post(i.default.queryMyUnCommentOrders,t)},cancelTrade:function(t){return n.default.post(i.default.cancelTrade+t,{})},platformInvolve:function(t){return n.default.post(i.default.platformInvolve+t,{})},summary:function(t){return n.default.post(i.default.summary+t,{})},submitPay:function(t){return n.default.post(i.default.submitPay,t)},defaultCards:function(t){return n.default.post(i.default.defaultCards,t)},selectCards:function(t){return n.default.post(i.default.selectCards,t)},sendOrderSms:function(){return n.default.post(i.default.sendOrderSms,{})},sendSMS:function(t){return n.default.post(i.default.sendSMS+t,{})},submitLogisticsInfo:function(t){return n.default.post(i.default.submitLogisticsInfo,t)},tradeFirstOrder:function(t){return n.default.post(i.default.tradeFirstOrder+t,{})},validSubmitCarts:function(t){return n.default.post(i.default.validSubmitCarts,{cartIds:t})},cusPageInit:function(t){return n.default.post(i.default.cusPageInit,t)},submitCusOrder:function(t){return n.default.post(i.default.submitCusOrder,t)},buildPayOrder:function(t){return n.default.post(i.default.buildPayOrder,t)},submitPayOrder:function(t){return n.default.post(i.default.submitPayOrder,t)},getCompanyPaymentInfo:function(){return n.default.post(i.default.getCompanyPaymentInfo,{})},listPayLog:function(t){return n.default.post(i.default.listPayLog+t,{})},listOrderPage:function(t){return n.default.post(i.default.listOrderPage,t)},getOrderInfo:function(t){return n.default.post(i.default.getOrderInfo+t,{})},cancelCusOrder:function(t){return n.default.post(i.default.cancelCusOrder+t,{})},giftBagPageInit:function(t){return n.default.post(i.default.giftBagPageInit,t)},giftBagGoldOrder:function(t){return n.default.post(i.default.giftBagGoldOrder,t)},giftBagScoreOrder:function(t){return n.default.post(i.default.giftBagScoreOrder,t)},giftBagSummaryOrder:function(t){return n.default.post(i.default.giftBagSummaryOrder,t)},giftBagSubmitOrder:function(t){return n.default.post(i.default.giftBagSubmitOrder,t)},giftBagPageOrders:function(t){return n.default.post(i.default.giftBagPageOrders,t)},giftBagPageGetLogs:function(t){return n.default.post(i.default.giftBagPageGetLogs,t)},giftBagCancelOrder:function(t){return n.default.post(i.default.giftBagCancelOrder,t)},giftBagGeneratePoster:function(t){return n.default.post(i.default.giftBagGeneratePoster+t,{})},giftBagInfo:function(t){return n.default.post(i.default.giftBagInfo+t,{})}};e.default=o},"19ab":function(t,e,a){"use strict";var r;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return r}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"pages"},[a("defaultTitle",{attrs:{dto:t.defaultTitleDto}}),a("v-uni-view",{staticClass:"part head"},[a("v-uni-image",{staticClass:"img",attrs:{src:t.imgBaseUrls+"/appletsImages/customization_success.png",alt:"",mode:"widthFix"}}),a("v-uni-view",{staticClass:"right"},[a("v-uni-text",[t._v(t._s("1"==t.type?"订单提交成功！":"订单支付成功！"))]),"2"==t.payType?a("v-uni-view",{staticClass:"info"},[t._v("请按下方银行账户进行线下打款 确认收款后将会为您进行定制生产")]):"1"==t.type?a("v-uni-view",{staticClass:"info"},[t._v("此订单需要等待卖家确认")]):t._e(),a("v-uni-view",{staticClass:"btns"},[a("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goToCusOrder.apply(void 0,arguments)}}},[t._v("查看订单")]),a("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goToKefu.apply(void 0,arguments)}}},[t._v("联系客服")])],1)],1)],1),a("v-uni-view",{staticClass:"part hint"},[a("v-uni-view",{staticClass:"roll"}),a("v-uni-view",{staticClass:"text"},["2"==t.type?[t._v("温馨提示:"),a("v-uni-text",[t._v("您的定制订单已提交产线生产中请耐心等待~")])]:"1"==t.type?[t._v("温馨提示:"),a("v-uni-text",[t._v("卖家确认后 在订单中心找到该订单进行付款")])]:t._e()],2)],1),"2"==t.payType?a("v-uni-view",{staticClass:"outline"},[a("v-uni-view",{staticClass:"headline"},[a("v-uni-view",{staticClass:"bg bg1"}),a("v-uni-text",[t._v("转账账户信息")])],1),a("v-uni-view",{staticClass:"bank",style:{backgroundImage:"url("+t.imgBaseUrls+t.companyInfo.bankBanner+")"}},[a("v-uni-view",{staticClass:"list"},[a("v-uni-text",{staticClass:"name"},[t._v("账号")]),a("v-uni-text",{staticClass:"content"},[t._v(t._s(t.companyInfo.bankAccount))]),a("v-uni-view",{staticClass:"copy",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy(t.companyInfo.bankAccount)}}},[t._v("复制")])],1),a("v-uni-view",{staticClass:"list"},[a("v-uni-text",{staticClass:"name"},[t._v("账户")]),a("v-uni-text",{staticClass:"content"},[t._v(t._s(t.companyInfo.companyName))])],1),a("v-uni-view",{staticClass:"list"},[a("v-uni-text",{staticClass:"name"},[t._v("开户行")]),a("v-uni-text",{staticClass:"content"},[t._v(t._s(t.companyInfo.openBank))])],1)],1),a("v-uni-view",{staticClass:"headline"},[a("v-uni-view",{staticClass:"bg bg2"}),a("v-uni-text",[t._v("线下转账说明")])],1),a("v-uni-view",{staticClass:"infos"},[a("v-uni-view",[a("v-uni-text",{staticClass:"diamond"}),a("v-uni-text",{staticClass:"info"},[t._v("汇款时请备注订单号，用于保证订单实时核销，订单号务必填写正确，请勿增加其他说明")])],1),a("v-uni-view",[a("v-uni-text",{staticClass:"diamond"}),a("v-uni-text",{staticClass:"info"},[t._v("订单号填写在电汇凭证的【汇款用途】【附言】等栏内")])],1),a("v-uni-view",[a("v-uni-text",{staticClass:"diamond"}),a("v-uni-text",{staticClass:"info"},[t._v("请按照订单实际金额转账，请勿多转或少转")])],1)],1),t.payLogList&&t.payLogList.length?[a("v-uni-view",{staticClass:"headline"},[a("v-uni-view",{staticClass:"bg bg3"}),a("v-uni-text",[t._v("支付流水信息")])],1),a("v-uni-view",{staticClass:"turnover"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-text",[t._v("时间")]),a("v-uni-text",[t._v("收款金额")]),a("v-uni-text",[t._v("剩余尾款")])],1),t._l(t.payLogList,(function(e,r){return a("v-uni-view",{key:r,staticClass:"list"},[a("v-uni-view",{staticClass:"time"},[a("v-uni-text",[t._v(t._s(t.$utils.formatDate(e.payTime,"yyyy-MM-dd")))]),a("v-uni-text",[t._v(t._s(t.$utils.formatDate(e.payTime,"hh:mm:ss")))])],1),a("v-uni-view",{staticClass:"money"},[t._v("¥"+t._s(e.amount))]),a("v-uni-view",{staticClass:"surplus"},[t._v("¥"+t._s(e.remainAmount))])],1)}))],2)]:t._e()],2):t._e()],1)},i=[]},"27f3":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={methods:{openKefu:function(t){uni.navigateTo({url:"/pages/webView/index?url=https://mobile.beifamall.com/qiyu.html"}),uni.setStorageSync("webViewQuery","?sessionId="+uni.getStorageSync("sessionId")+"&qiyuKefuGroupId="+t)}},mounted:function(){}};e.default=r},4990:function(t,e,a){"use strict";var r=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(a("baf2")),i={methods:{copy:function(t){(0,n.default)({content:t,success:function(t){uni.showToast({title:t,icon:"none"})},error:function(t){uni.showToast({title:t,icon:"none",duration:3e3})}})}}};e.default=i},"72ed":function(t,e,a){"use strict";a.r(e);var r=a("19ab"),n=a("fc74");for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);a("ab84");var o,d=a("f0c5"),f=Object(d["a"])(n["default"],r["b"],r["c"],!1,null,"e9ff7c60",null,!1,r["a"],o);e["default"]=f.exports},a06d:function(t,e,a){"use strict";var r=a("4ea4");a("ac1f"),a("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(a("4990")),i=r(a("1087")),o=r(a("27f3")),d={mixins:[n.default,o.default],data:function(){return{defaultTitleDto:{title:"支付成功"},imgBaseUrls:"",type:1,payType:1,companyInfo:{},payLogList:[]}},onShow:function(){2==this.payType&&(this.getCompanyPaymentInfo(),this.listPayLog())},onLoad:function(){this.imgBaseUrls=this.$config.imgBaseUrl,this.type=this.$Route.query.type||1,this.defaultTitleDto.title="1"==this.type?"提交成功":"支付成功",this.payType=this.$Route.query.payType?this.$Route.query.payType:""},methods:{getCompanyPaymentInfo:function(){var t=this;i.default.getCompanyPaymentInfo().then((function(e){200==e.data.code?t.companyInfo=e.data.data:uni.showToast({title:e.data.message,icon:"none"})}))},listPayLog:function(){var t=this;i.default.listPayLog(this.$Route.query.orderId).then((function(e){200==e.data.code?t.payLogList=e.data.data:uni.showToast({title:e.data.message,icon:"none"})}))},goToCusOrder:function(){this.$Router.replace({path:"/pages/customizationOrder/index"})},goToKefu:function(){this.openKefu(this.$Route.query.qiyuKefuGroupId)}}};e.default=d},a9c2:function(t,e,a){var r=a("4bad");e=r(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pages[data-v-e9ff7c60]{\npadding-top:%?88?%;\nmargin:0 auto;min-height:100vh;background:#f5f5f5}.flexCenter[data-v-e9ff7c60], .address[data-v-e9ff7c60]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.whitePart[data-v-e9ff7c60], .part[data-v-e9ff7c60]{width:calc(100% - %?38?%);margin:%?20?% auto 0;background:#fff;border-radius:%?24?%;padding:%?20?% %?18?%}.fixedBottom[data-v-e9ff7c60], .savePart[data-v-e9ff7c60]{position:fixed;height:calc(%?124?% + constant(safe-area-inset-bottom));height:calc(%?124?% + env(safe-area-inset-bottom));width:100%;background:#fff;bottom:0;left:0;padding:%?22?% %?24?%}.submit[data-v-e9ff7c60], .savePart uni-view[data-v-e9ff7c60]{height:%?80?%;background:-webkit-linear-gradient(232deg,#cb6eff,#7530c1);background:linear-gradient(218deg,#cb6eff,#7530c1);text-align:center;font-size:%?24?%;font-family:PingFang SC;font-weight:400;line-height:%?80?%;color:#fff;border-radius:%?42?%}.savePart uni-view[data-v-e9ff7c60]{width:100%;border-radius:%?40?%}.btns[data-v-e9ff7c60]{display:-webkit-box;display:-webkit-flex;display:flex}.btns uni-view[data-v-e9ff7c60]{width:%?206?%;height:%?80?%;border:1px solid #aeb5b8;border-radius:%?40?%;font-size:%?24?%;font-family:PingFang SC;font-weight:400;line-height:%?80?%;color:#7e8385;text-align:center}.btns uni-view[data-v-e9ff7c60]:first-child{margin-right:%?30?%}.address[data-v-e9ff7c60]{background:#fff;border-radius:%?24?%;margin:%?24?% auto %?20?%;width:calc(100% - %?48?%);padding:%?22?% %?20?%}.address .local[data-v-e9ff7c60]{min-width:%?48?%;height:%?48?%;background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/customization_local.png);background-size:100% 100%;margin-right:%?20?%}.address .arrows[data-v-e9ff7c60]{width:%?12?%;height:%?24?%;background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/fill_1copy102x.png);background-size:100% 100%;margin-left:%?34?%}.address .noAddress[data-v-e9ff7c60]{color:#aeb5b8;font-size:%?28?%}.address .info[data-v-e9ff7c60]{width:%?518?%;font-family:PingFang SC;font-weight:400;line-height:1.4}.address .info .top[data-v-e9ff7c60]{font-size:%?28?%;margin-bottom:%?10?%}.address .info .top .name[data-v-e9ff7c60]{color:#333;margin-right:%?20?%}.address .info .top .tel[data-v-e9ff7c60]{color:#aeb5b8}.address .info .detail[data-v-e9ff7c60]{font-size:%?22?%;color:#333}.pages[data-v-e9ff7c60]{padding-bottom:%?40?%}.part[data-v-e9ff7c60]{display:-webkit-box;display:-webkit-flex;display:flex}.part.head[data-v-e9ff7c60]{padding:0 %?18?% %?24?% 0}.part .img[data-v-e9ff7c60]{width:%?206?%}.part .right[data-v-e9ff7c60]{width:calc(100% - %?210?%);margin-top:%?26?%}.part .right .info[data-v-e9ff7c60]{font-size:%?24?%;font-family:PingFang SC;font-weight:400;color:#323232;margin-top:%?14?%}.part .right > uni-text[data-v-e9ff7c60]{font-size:%?36?%;font-family:PingFang SC;font-weight:700;color:#323232;display:inline-block}.part .btns[data-v-e9ff7c60]{margin-top:%?30?%}.hint[data-v-e9ff7c60]{padding:%?14?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.hint .roll[data-v-e9ff7c60]{width:%?55?%;height:%?53?%;background-size:100% 100%;background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/customization_roll.png);margin-right:%?14?%}.hint .text[data-v-e9ff7c60]{font-size:%?24?%;font-family:PingFang SC;font-weight:400;line-height:1.3;color:#7e8385}.hint .text uni-text[data-v-e9ff7c60]{color:#7530c1;margin-left:%?4?%}.outline[data-v-e9ff7c60]{width:calc(100% - %?38?%);background:#e4ccff;border-radius:%?16?%;padding:%?10?% %?24?% %?20?% %?16?%;margin:%?20?% auto}.headline[data-v-e9ff7c60]{width:%?546?%;left:%?-30?%;height:%?60?%;position:relative;padding-left:%?112?%;margin:%?54?% 0 %?24?%;background:-webkit-linear-gradient(left,#9b3fff,#c670fe 28%,rgba(219,145,255,0));background:linear-gradient(90deg,#9b3fff,#c670fe 28%,rgba(219,145,255,0))}.headline uni-text[data-v-e9ff7c60]{font-size:%?32?%;font-family:PingFang SC;font-weight:700;line-height:%?60?%;color:#fff}.headline .bg[data-v-e9ff7c60]{width:%?98?%;height:%?98?%;position:absolute;top:%?-22?%;left:0;background-size:100% 100%}.headline .bg.bg1[data-v-e9ff7c60]{background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/customization_hot.png)}.headline .bg.bg2[data-v-e9ff7c60]{background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/customization_hot2.png)}.headline .bg.bg3[data-v-e9ff7c60]{background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/customization_hot3.png)}.bank[data-v-e9ff7c60]{height:%?342?%;background-size:100% 100%;border-radius:%?20?%;padding:%?10?% %?24?%}.bank .list[data-v-e9ff7c60]{margin-bottom:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.bank .list[data-v-e9ff7c60]:first-child{margin-top:%?110?%;margin-bottom:%?40?%}.bank .name[data-v-e9ff7c60]{width:%?110?%;font-size:%?24?%;font-family:PingFang SC;font-weight:400;color:#fff;opacity:.7}.bank .content[data-v-e9ff7c60]{font-size:%?24?%;font-family:PingFang SC;font-weight:400;color:#fff}.bank .copy[data-v-e9ff7c60]{width:%?104?%;height:%?60?%;background:-webkit-linear-gradient(233deg,#bb53ff,#6d0dfe);background:linear-gradient(217deg,#bb53ff,#6d0dfe);border-radius:%?34?%;line-height:%?60?%;text-align:center;margin-left:%?30?%;color:#f2e6ff;font-size:%?24?%}.infos[data-v-e9ff7c60]{margin-top:%?28?%}.infos > uni-view[data-v-e9ff7c60]{margin-bottom:%?20?%}.infos .diamond[data-v-e9ff7c60], .infos .info[data-v-e9ff7c60]{display:inline-block;vertical-align:text-top}.infos .diamond[data-v-e9ff7c60]{min-width:%?8?%;min-height:%?8?%;background:#7530c1;border-radius:1px;-webkit-transform:rotate(45deg);transform:rotate(45deg);margin-right:%?10?%;margin-top:%?12?%}.infos .info[data-v-e9ff7c60]{width:calc(100% - %?18?%);font-size:%?22?%;font-family:PingFang SC;font-weight:400;line-height:1.6;color:#3e1a66}.turnover[data-v-e9ff7c60]{background:#f8f2ff;border-radius:%?24?%;padding:%?24?% %?32?%}.turnover .title[data-v-e9ff7c60], .turnover .list[data-v-e9ff7c60]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-justify-content:space-around;justify-content:space-around;line-height:1}.turnover .title > uni-view[data-v-e9ff7c60], .turnover .title > uni-text[data-v-e9ff7c60], .turnover .list > uni-view[data-v-e9ff7c60], .turnover .list > uni-text[data-v-e9ff7c60]{width:32%;text-align:center}.turnover .title[data-v-e9ff7c60]{font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#666;margin-bottom:%?16?%}.turnover .list[data-v-e9ff7c60]{margin-top:%?12?%;height:%?70?%;background:#f2e6ff;border-radius:%?36?%}.turnover .time[data-v-e9ff7c60]{color:#666;font-weight:500}.turnover .time uni-text[data-v-e9ff7c60]:first-child{font-size:%?24?%;display:block}.turnover .time uni-text[data-v-e9ff7c60]:nth-child(2){font-size:%?20?%}.turnover .money[data-v-e9ff7c60], .turnover .surplus[data-v-e9ff7c60]{font-size:%?24?%;font-weight:500;color:#666}',""]),t.exports=e},ab84:function(t,e,a){"use strict";var r=a("b873"),n=a.n(r);n.a},b873:function(t,e,a){var r=a("a9c2");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var n=a("4f06").default;n("604b6de6",r,!0,{sourceMap:!1,shadowMode:!1})},baf2:function(t,e,a){"use strict";function r(t){var e=t.content,a=t.success,r=t.error;if(!e)return r("复制的内容不能为空 !");e="string"===typeof e?e:e.toString(),document.queryCommandSupported("copy")||r("浏览器不支持");var n=document.createElement("textarea");n.value=e,n.readOnly="readOnly",document.body.appendChild(n),n.select(),n.setSelectionRange(0,e.length);var i=document.execCommand("copy");i?a("复制成功~"):r("复制失败，请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！"),n.remove()}a("d3b7"),a("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},fc74:function(t,e,a){"use strict";a.r(e);var r=a("a06d"),n=a.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(i);e["default"]=n.a}}]);