(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-giftCardPay-index"],{"2c57":function(t,a,e){"use strict";var i=e("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("5e8a")),o=i(e("b775")),s={buildMiniPrepPaySign:function(t){return o.default.post(n.default.buildMiniPrepPaySign,t)},buildPrepPaySign:function(t){return o.default.post(n.default.buildPrepPaySign,t)}};a.default=s},"3a29":function(t,a,e){"use strict";var i=e("9fbc"),n=e.n(i);n.a},"45ba":function(t,a,e){var i=e("4bad");a=i(!1),a.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-4f0ff206]{background:#f5f5f5}.pay-cont[data-v-4f0ff206]{padding-top:%?88?%}.order-price[data-v-4f0ff206]{width:100%;height:%?100?%;line-height:%?100?%;padding:0 %?30?%;font-size:%?28?%;color:#686868;letter-spacing:0;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex}.order-price uni-text[data-v-4f0ff206]{font-size:%?36?%;line-height:%?100?%;color:#ff1558}.order-price .tag[data-v-4f0ff206]{margin-left:auto;font-size:%?24?%;line-height:%?108?%}.my-wallet-info[data-v-4f0ff206]{display:block;width:100%;height:%?120?%;padding:0 %?26?%;background:#fff;border-bottom:1px solid #eee;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wallet-icon[data-v-4f0ff206]{width:%?110?%;height:%?110?%}.zfb .wallet-icon[data-v-4f0ff206]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_zhi.png) no-repeat 50%;background-size:%?50?% %?50?%}.wx .wallet-icon[data-v-4f0ff206]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_weixin.png) no-repeat 50%;background-size:%?50?% %?50?%}.select[data-v-4f0ff206]{display:block;width:%?36?%;height:%?36?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;background-size:%?36?% %?36?%;margin-left:auto}.select.cur[data-v-4f0ff206]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;background-size:%?36?% %?36?%}.submit-pay[data-v-4f0ff206]{width:100%;height:%?98?%;line-height:%?98?%;font-size:%?32?%;color:#fff;text-align:center;background-color:#ff1558;position:fixed;bottom:0;margin:0 auto;z-index:9999}.authorizeView[data-v-4f0ff206]{width:%?500?%;background-color:#fff;border-radius:%?8?%;padding:%?30?%}.authorizaImage[data-v-4f0ff206]{width:%?200?%;height:%?200?%;margin:0 auto;text-align:center;padding:%?20?% 0;position:relative}.authorBtnImage[data-v-4f0ff206]{width:100%;height:100%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/headBg2.png) no-repeat 50%;background-size:100%;position:absolute;left:0;top:0;z-index:1}.authorTopImage[data-v-4f0ff206]{width:100%;height:100%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/headBg1.png) no-repeat 50%;background-size:100%;position:absolute;left:0;top:0;z-index:20}.noApplyInfoBtn[data-v-4f0ff206]{background-color:#fff;border:1px solid #ccc;margin:%?20?% auto 0}.authorizaBtnBox[data-v-4f0ff206]{width:85%;height:%?80?%;line-height:%?80?%;font-size:%?36?%;border-radius:%?40?%;text-align:center}.authUserImage[data-v-4f0ff206]{width:%?120?%;height:%?120?%;position:absolute;top:%?38?%;left:%?40?%;z-index:10;border-radius:50%;overflow:hidden}body.?%PAGE?%[data-v-4f0ff206]{background:#f5f5f5}',""]),t.exports=a},"5e8a":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={buildMiniPrepPaySign:"/payment/wechat/buildMiniPrepPaySign",buildPrepPaySign:"/payment/wechat/buildPrepPaySign"},n=i;a.default=n},"97fe":function(t,a,e){"use strict";e.r(a);var i=e("cb0a"),n=e("dfa5");for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("3a29");var s,l=e("f0c5"),u=Object(l["a"])(n["default"],i["b"],i["c"],!1,null,"4f0ff206",null,!1,i["a"],s);a["default"]=u.exports},"9fbc":function(t,a,e){var i=e("45ba");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("e2c19a64",i,!0,{sourceMap:!1,shadowMode:!1})},cb0a:function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return i}));var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"page"},[e("defaultTitle",{attrs:{dto:t.defaultTitleDto}}),e("v-uni-view",{staticClass:"pay-cont"},[e("v-uni-view",{staticClass:"order-price"},[t._v("订单金额"),e("v-uni-text",{staticClass:"tag"},[t._v("￥")]),e("v-uni-text",{staticClass:"payNum"},[t._v(t._s(t.payNum))])],1),t.isWxFlag?t._e():e("v-uni-view",{staticClass:"my-wallet-info zfb",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.walletChange("zfb")}}},[e("v-uni-view",{staticClass:"wallet-icon"}),e("v-uni-view",{staticClass:"wallet-text"},[t._v("支付宝支付")]),e("v-uni-text",{staticClass:"select",class:{cur:2==t.typeFlag}})],1),t.isWxFlag?e("v-uni-view",{staticClass:"my-wallet-info wx",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.walletChange("wx")}}},[e("v-uni-view",{staticClass:"wallet-icon"}),e("v-uni-view",{staticClass:"wallet-text"},[t._v("微信支付")]),e("v-uni-text",{staticClass:"select",class:{cur:1==t.typeFlag}})],1):t._e(),e("v-uni-view",{staticClass:"submit-pay",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.submitPayChange.apply(void 0,arguments)}}},[t._v("提交支付")])],1)],1)},o=[]},dfa5:function(t,a,e){"use strict";e.r(a);var i=e("fde3"),n=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},fde3:function(t,a,e){"use strict";var i=e("4ea4");e("ac1f"),e("466d"),e("5319"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("92c6")),o=i(e("2c57")),s={data:function(){return{defaultTitleDto:{title:"支付方式"},typeFlag:1,payNum:0,isWxFlag:!0,submitBol:!0}},onLoad:function(){var t=navigator.userAgent.toLowerCase();"micromessenger"==t.match(/MicroMessenger/i)?this.isWxFlag=!0:(this.isWxFlag=!1,this.typeFlag=2)},onShow:function(){this.giftcardAmount()},methods:{walletChange:function(t){this.typeFlag=t},closeAuthorize:function(){this.$refs.authorize.close()},submitPayChange:function(){var t=this;if(!this.submitBol)return!1;this.submitBol=!1,uni.showLoading({title:"加载中..."}),uni.login({success:function(a){t.buildMiniPrepPaySign(a.code)}}),this.submitBol=!0,uni.hideLoading()},giftcardAmount:function(){var t=this;n.default.giftcardAmount(this.$Route.query.payId).then((function(a){200==a.data.code?t.payNum=a.data.data:uni.showToast({title:a.data.message,icon:"none"})}))},buildMiniPrepPaySign:function(t){var a=this;o.default.buildMiniPrepPaySign({code:t,orderPayId:this.$Route.query.payId,orderType:"card"}).then((function(t){200==t.data.code?a.requestpayment(t.data.data):uni.showToast({title:t.data.message,icon:"none"})}))},requestpayment:function(t){var a=this;uni.requestPayment({provider:"payment",timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,paySign:t.paySign,signType:t.signType,success:function(t){a.payCallBack(!0)},fail:function(t){a.payCallBack(!1)}})},payCallBack:function(t){var a=this;t?(uni.showToast({title:"支付成功",icon:"none"}),this.$Router.replace({path:"/pages/payment/index",query:{type:"giftCard"}})):(uni.showToast({title:"已取消支付,正在前往订单页",icon:"none"}),setTimeout((function(){a.$Router.replace({path:"/pages/myGiftCardOrderList/index"})}),500))}}};a.default=s}}]);