(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-giftBagReceive-index"],{"0202":function(e,t,r){"use strict";var a;r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return n})),r.d(t,"a",(function(){return a}));var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"page commonPageTitle"},[r("defaultTitle",{attrs:{dto:e.defaultTitleDto}}),r("v-uni-view",{staticClass:"giftReceive"},[r("v-uni-view",{staticClass:"title"},[r("headImg",{staticClass:"userInfoHead",attrs:{head:e.info.smallIcon}}),r("v-uni-text",[e._v(e._s(e.info.nickName)+" 送你一个超值大礼包快来领取吧~")])],1),r("v-uni-view",{staticClass:"goodsInfo"},[r("v-uni-image",{staticClass:"goodsImage",attrs:{src:e.imgBaseUrls+e.info.goodsImage,mode:""}}),r("v-uni-view",{staticClass:"goodsName ellipsis-one"},[e._v(e._s(e.info.goodsName))]),r("v-uni-view",{staticClass:"goodsPrice"},[r("v-uni-text",{staticClass:"defPrice"},[e._v("¥"+e._s(e.info.goodsPrice))]),e.info.marketPrice?r("v-uni-text",{staticClass:"marketPrice"},[e._v("¥"+e._s(e.info.marketPrice))]):e._e()],1)],1),1==e.info.receiveFlag?r("v-uni-view",{staticClass:"receiveBtn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goToGoodsDetail.apply(void 0,arguments)}}}):0==e.info.receiveFlag?r("v-uni-view",{staticClass:"noReceiveBtn"}):r("v-uni-view",{staticClass:"noReciveGiftBtn"})],1)],1)},n=[]},"0b8b":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={queryMyOrders:"/trade/customer/queryMyOrders",addCart:"/trade/cart/addCart",getCarts:"/trade/cart/getCarts",editCart:"/trade/cart/editCart",moveToFavorite:"/trade/cart/moveToFavorite/",removeCarts:"/trade/cart/removeCarts",moveToFavorites:"/trade/cart/moveToFavorites",evaluateGoods:"/trade/customer/evaluateGoods/",appendEvaluate:"/trade/customer/evaluateGoods/append/",pageInit:"/trade/order/pageInit",storePromotions:"/trade/order/storePromotions",storeCoupons:"/trade/order/storeCoupons",freightPromotions:"/trade/order/freightPromotions",storeOrderAmount:"/trade/order/storeOrderAmount",platformPromotions:"/trade/order/platformPromotions",orderGold:"/trade/order/orderGold",orderScore:"trade/order/orderScore",orderSummary:"/trade/order/orderSummary",submitOrder:"/trade/order/submitOrder",deleteOrder:"/trade/customer/deleteOrder/",getCustomerRefundOrderPage:"trade/refund/customer/getCustomerRefundOrderPage",refundDetail:"/trade/refund/customer/refundDetail/",queryOrderDetail:"/trade/customer/queryOrderDetail/",cancelOrder:"/trade/customer/cancel/",applyFofRefund:"/trade/refund/customer/applyFofRefund",refundReason:"/trade/refund/customer/refundReason/",submitApplyFofRefund:"/trade/refund/customer/submitApplyFofRefund",extendShip:"/trade/customer/extendShip/",confirmReceipt:"/trade/customer/confirmReceipt/",queryMyUnCommentOrders:"/trade/customer/queryMyUnCommentOrders",cancelTrade:"/trade/refund/customer/cancel/",platformInvolve:"/trade/refund/customer/platformInvolve/",summary:"/trade/pay/summary/",submitPay:"/trade/pay/submit",defaultCards:"/trade/pay/defaultCards",selectCards:"/trade/pay/selectCards",sendOrderSms:"/trade/order/sendOrderSms",sendSMS:"/trade/pay/sendSMS/",submitLogisticsInfo:"/trade/refund/customer/submitLogisticsInfo",tradeFirstOrder:"/trade/customer/firstOrder/",validSubmitCarts:"/trade/cart/validSubmitCarts",cusPageInit:"/trade/customize/order/pageInit",submitCusOrder:"/trade/customize/order/submitOrder",buildPayOrder:"/trade/customize/order/buildPayOrder",submitPayOrder:"/trade/customize/order/submitPayOrder",getCompanyPaymentInfo:"/trade/customize/order/getCompanyPaymentInfo",listPayLog:"/trade/customize/order/listPayLog/",listOrderPage:"/trade/customize/order/listOrderPage",getOrderInfo:"/trade/customize/order/getOrderInfo/",cancelCusOrder:"/trade/customize/order/cancelOrder/",giftBagPageInit:"/trade/giftBagTransfer/order/pageInit",giftBagGoldOrder:"/trade/giftBagTransfer/order/goldOrder",giftBagScoreOrder:"/trade/giftBagTransfer/order/scoreOrder",giftBagSummaryOrder:"/trade/giftBagTransfer/order/summaryOrder",giftBagSubmitOrder:"/trade/giftBagTransfer/order/submitOrder",giftBagPageOrders:"/trade/giftBagTransfer/order/pageOrders",giftBagPageGetLogs:"/trade/giftBagTransfer/order/pageGetLogs",giftBagCancelOrder:"/trade/giftBagTransfer/order/cancelOrder",giftBagGeneratePoster:"/trade/giftBagTransfer/order/generatePoster/",giftBagInfo:"/trade/giftBagTransfer/order/giftBagInfo/"},o=a;t.default=o},1087:function(e,t,r){"use strict";var a=r("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(r("b775")),n=a(r("0b8b")),d={queryMyOrders:function(e,t){return o.default.post(n.default.queryMyOrders,{pagePO:e,orderState:t})},addCart:function(e){return o.default.post(n.default.addCart,e)},getCarts:function(){return o.default.post(n.default.getCarts,{})},editCart:function(e){return o.default.post(n.default.editCart,e)},moveToFavorite:function(e){return o.default.post(n.default.moveToFavorite+e,{})},moveToFavorites:function(e){return o.default.post(n.default.moveToFavorites,e)},removeCarts:function(e){return o.default.post(n.default.removeCarts,e)},evaluateGoods:function(e){return o.default.post(n.default.evaluateGoods+e,{})},appendEvaluate:function(e){return o.default.post(n.default.appendEvaluate+e,{})},pageInit:function(e){return o.default.post(n.default.pageInit,e)},storePromotions:function(e){return o.default.post(n.default.storePromotions,e)},storeCoupons:function(e){return o.default.post(n.default.storeCoupons,e)},freightPromotions:function(e){return o.default.post(n.default.freightPromotions,e)},storeOrderAmount:function(e){return o.default.post(n.default.storeOrderAmount,e)},platformPromotions:function(e){return o.default.post(n.default.platformPromotions,e)},orderGold:function(e){return o.default.post(n.default.orderGold,e)},orderScore:function(e){return o.default.post(n.default.orderScore,e)},orderSummary:function(e){return o.default.post(n.default.orderSummary,e)},submitOrder:function(e){return o.default.post(n.default.submitOrder,e)},deleteOrder:function(e){return o.default.post(n.default.deleteOrder+e,{})},getCustomerRefundOrderPage:function(e){return o.default.post(n.default.getCustomerRefundOrderPage,e)},refundDetail:function(e){return o.default.post(n.default.refundDetail+e,{})},queryOrderDetail:function(e){return o.default.post(n.default.queryOrderDetail+e,{})},cancelOrder:function(e){return o.default.post(n.default.cancelOrder+e,{})},applyFofRefund:function(e){return o.default.post(n.default.applyFofRefund,e)},refundReason:function(e){return o.default.post(n.default.refundReason+e,{})},submitApplyFofRefund:function(e){return o.default.post(n.default.submitApplyFofRefund,e)},extendShip:function(e){return o.default.post(n.default.extendShip+e,{})},confirmReceipt:function(e){return o.default.post(n.default.confirmReceipt+e,{})},queryMyUnCommentOrders:function(e){return o.default.post(n.default.queryMyUnCommentOrders,e)},cancelTrade:function(e){return o.default.post(n.default.cancelTrade+e,{})},platformInvolve:function(e){return o.default.post(n.default.platformInvolve+e,{})},summary:function(e){return o.default.post(n.default.summary+e,{})},submitPay:function(e){return o.default.post(n.default.submitPay,e)},defaultCards:function(e){return o.default.post(n.default.defaultCards,e)},selectCards:function(e){return o.default.post(n.default.selectCards,e)},sendOrderSms:function(){return o.default.post(n.default.sendOrderSms,{})},sendSMS:function(e){return o.default.post(n.default.sendSMS+e,{})},submitLogisticsInfo:function(e){return o.default.post(n.default.submitLogisticsInfo,e)},tradeFirstOrder:function(e){return o.default.post(n.default.tradeFirstOrder+e,{})},validSubmitCarts:function(e){return o.default.post(n.default.validSubmitCarts,{cartIds:e})},cusPageInit:function(e){return o.default.post(n.default.cusPageInit,e)},submitCusOrder:function(e){return o.default.post(n.default.submitCusOrder,e)},buildPayOrder:function(e){return o.default.post(n.default.buildPayOrder,e)},submitPayOrder:function(e){return o.default.post(n.default.submitPayOrder,e)},getCompanyPaymentInfo:function(){return o.default.post(n.default.getCompanyPaymentInfo,{})},listPayLog:function(e){return o.default.post(n.default.listPayLog+e,{})},listOrderPage:function(e){return o.default.post(n.default.listOrderPage,e)},getOrderInfo:function(e){return o.default.post(n.default.getOrderInfo+e,{})},cancelCusOrder:function(e){return o.default.post(n.default.cancelCusOrder+e,{})},giftBagPageInit:function(e){return o.default.post(n.default.giftBagPageInit,e)},giftBagGoldOrder:function(e){return o.default.post(n.default.giftBagGoldOrder,e)},giftBagScoreOrder:function(e){return o.default.post(n.default.giftBagScoreOrder,e)},giftBagSummaryOrder:function(e){return o.default.post(n.default.giftBagSummaryOrder,e)},giftBagSubmitOrder:function(e){return o.default.post(n.default.giftBagSubmitOrder,e)},giftBagPageOrders:function(e){return o.default.post(n.default.giftBagPageOrders,e)},giftBagPageGetLogs:function(e){return o.default.post(n.default.giftBagPageGetLogs,e)},giftBagCancelOrder:function(e){return o.default.post(n.default.giftBagCancelOrder,e)},giftBagGeneratePoster:function(e){return o.default.post(n.default.giftBagGeneratePoster+e,{})},giftBagInfo:function(e){return o.default.post(n.default.giftBagInfo+e,{})}};t.default=d},"490b":function(e,t,r){"use strict";var a;r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return n})),r.d(t,"a",(function(){return a}));var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"headBox"},[e.head&&"-1"!=String(e.head).indexOf("http")?r("v-uni-view",{staticClass:"userInfoTitleImage",style:{backgroundImage:"url("+e.head+")"}}):e.head?r("v-uni-view",{staticClass:"userInfoTitleImage",style:{backgroundImage:"url("+e.imgBaseUrls+e.head+")"}}):r("v-uni-view",{staticClass:"userInfoTitleImage",style:{backgroundImage:"url("+e.imgBaseUrls+"appletsImages/default_phone.png)"}})],1)},n=[]},"5ab4":function(e,t,r){"use strict";var a=r("a5a0"),o=r.n(a);o.a},"63d3":function(e,t,r){var a=r("4bad");t=a(!1),t.push([e.i,".commonPageTitle[data-v-1932d268]{\npadding-top:%?88?%;\nheight:100vh}.giftReceive[data-v-1932d268]{width:100%;height:%?1060?%;margin:0 auto;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/giftReceiveBg.png) no-repeat;background-size:100% 100%;padding:%?42?% %?79?% %?40?% %?79?%;position:relative}.userInfoHead[data-v-1932d268]{min-width:%?90?%;width:%?90?%;height:%?90?%;min-height:%?90?%;border-radius:50%;overflow:hidden;display:inline-block;margin-right:%?24?%}.title[data-v-1932d268]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?20?%}.title uni-text[data-v-1932d268]{font-size:%?28?%;color:#333}.goodsInfo[data-v-1932d268]{padding-bottom:%?20?%;width:%?520?%;margin:0 auto;margin-top:%?52?%}.goodsImage[data-v-1932d268]{width:%?520?%;height:%?520?%;border-radius:%?24?%}.goodsName[data-v-1932d268]{text-align:center;font-size:%?24?%;color:#333;margin-top:%?30?%}.goodsPrice[data-v-1932d268]{margin-top:%?20?%;text-align:center}.defPrice[data-v-1932d268]{color:#ec2626}.marketPrice[data-v-1932d268]{color:#999;font-size:%?20?%;margin-left:%?35?%}.receiveBtn[data-v-1932d268]{position:absolute;left:0;right:0;margin:auto;bottom:%?36?%;width:%?500?%;height:%?82?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/giftReceiveBgBtn.png);-webkit-animation:bounceIn-data-v-1932d268 .5s infinite;animation:bounceIn-data-v-1932d268 .5s infinite;background-size:100% 100%}.noReceiveBtn[data-v-1932d268],.noReciveGiftBtn[data-v-1932d268]{position:absolute;left:0;right:0;margin:auto;bottom:%?36?%;width:%?500?%;height:%?82?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noGiftReceiveBgBtn.png);background-size:100% 100%}.noReciveGiftBtn[data-v-1932d268]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noGiftReceiveBgBtn1.png);background-size:100% 100%}@-webkit-keyframes bounceIn-data-v-1932d268{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(1.13);transform:scale(1.13)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes bounceIn-data-v-1932d268{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(1.13);transform:scale(1.13)}to{-webkit-transform:scale(1);transform:scale(1)}}",""]),e.exports=t},"7bac":function(e,t,r){"use strict";var a=r("4ea4");r("ac1f"),r("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(r("1087")),n=a(r("fca6")),d={data:function(){return{defaultTitleDto:{title:"礼包领取"},info:{},orderId:"",imgBaseUrls:""}},methods:{giftBagInfo:function(){var e=this;o.default.giftBagInfo(this.orderId).then((function(t){200==t.data.code?e.info=t.data.data:uni.showToast({title:t.data.message,icon:"none"})}))},goToGoodsDetail:function(){this.info.orderState&&this.info.receiveFlag?this.$Router.push({path:"/pages/goodsDetails/index",query:{goodsId:this.info.itemId,transferOrderId:this.info.orderId}}):uni.showToast({title:"礼包已领完",icon:"none"})}},onLoad:function(e){this.imgBaseUrls=this.$config.imgBaseUrl;try{this.$Route.query.scene&&(this.orderId=decodeURIComponent(this.$Route.query.scene).split(",")[0],decodeURIComponent(this.$Route.query.scene).split(",")[1]&&uni.setStorageSync("routerShareNumber",decodeURIComponent(this.$Route.query.scene).split(",")[1])),e&&e.scene&&(this.orderId=decodeURIComponent(e.scene).split(",")[0],decodeURIComponent(e.scene).split(",")[1]&&uni.setStorageSync("routerShareNumber",decodeURIComponent(e.scene).split(",")[1])),e&&e.orderId&&(this.orderId=e.orderId,uni.setStorageSync("routerShareNumber",e.shareNumber)),this.$Route.query.orderId&&(this.orderId=this.$Route.query.orderId,uni.setStorageSync("routerShareNumber",this.$Route.query.shareNumber)),this.giftBagInfo()}catch(t){console.log(t),uni.showToast({title:"系统错误",icon:"none"})}},components:{headImg:n.default}};t.default=d},9121:function(e,t,r){"use strict";r.r(t);var a=r("a6dc"),o=r.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(n);t["default"]=o.a},a5a0:function(e,t,r){var a=r("c824");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var o=r("4f06").default;o("7daa58a0",a,!0,{sourceMap:!1,shadowMode:!1})},a6dc:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={props:["head","width"],data:function(){return{imgBaseUrls:""}},mounted:function(){this.imgBaseUrls=this.$config.imgBaseUrl}};t.default=a},b17e:function(e,t,r){"use strict";var a=r("dfc4"),o=r.n(a);o.a},c824:function(e,t,r){var a=r("4bad");t=a(!1),t.push([e.i,".headBox[data-v-5a61360d]{width:100%;height:100%}.userInfoTitleImage[data-v-5a61360d]{width:100%;height:100%;border-radius:%?6?%;background-position:50%;background-size:cover;background-repeat:no-repeat;z-index:10}",""]),e.exports=t},db73:function(e,t,r){"use strict";r.r(t);var a=r("0202"),o=r("ea53");for(var n in o)["default"].indexOf(n)<0&&function(e){r.d(t,e,(function(){return o[e]}))}(n);r("b17e");var d,i=r("f0c5"),u=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,"1932d268",null,!1,a["a"],d);t["default"]=u.exports},dfc4:function(e,t,r){var a=r("63d3");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var o=r("4f06").default;o("6d6bd338",a,!0,{sourceMap:!1,shadowMode:!1})},ea53:function(e,t,r){"use strict";r.r(t);var a=r("7bac"),o=r.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(n);t["default"]=o.a},fca6:function(e,t,r){"use strict";r.r(t);var a=r("490b"),o=r("9121");for(var n in o)["default"].indexOf(n)<0&&function(e){r.d(t,e,(function(){return o[e]}))}(n);r("5ab4");var d,i=r("f0c5"),u=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,"5a61360d",null,!1,a["a"],d);t["default"]=u.exports}}]);