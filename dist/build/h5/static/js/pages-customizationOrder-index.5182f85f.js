(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-customizationOrder-index"],{"27f3":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={methods:{openKefu:function(e){uni.navigateTo({url:"/pages/webView/index?url=https://mobile.beifamall.com/qiyu.html"}),uni.setStorageSync("webViewQuery","?sessionId="+uni.getStorageSync("sessionId")+"&qiyuKefuGroupId="+e)}},mounted:function(){}};t.default=n},"2ba7":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{}}};t.default=n},"39dc":function(e,t,a){"use strict";var n=a("b7a6"),i=a.n(n);i.a},4099:function(e,t,a){"use strict";a.r(t);var n=a("2ba7"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=i.a},"6dbb":function(e,t,a){"use strict";a.r(t);var n=a("b921"),i=a("bb78");for(var o in i)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(o);a("39dc");var r,d=a("f0c5"),s=Object(d["a"])(i["default"],n["b"],n["c"],!1,null,"5d75dfa3",null,!1,n["a"],r);t["default"]=s.exports},"6dca":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page popupBox"},[a("v-uni-view",{staticClass:"defaultBox"},[e._t("default")],2),a("v-uni-view",{staticClass:"defaultBtn"},[a("v-uni-view",{staticClass:"cancelBtn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.$emit("cancel")}}},[e._v("取消")]),a("v-uni-view",{staticClass:"sureBtn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.$emit("sure")}}},[e._v("确定")])],1)],1)},o=[]},"9be5":function(e,t,a){var n=a("4bad");t=n(!1),t.push([e.i,".popupBox[data-v-634cc1da]{width:%?600?%;height:%?360?%;border-radius:%?30?%;background-color:#fff;font-size:%?32?%}.defaultBox[data-v-634cc1da]{width:100%;height:calc(100% - %?106?%)}.defaultBtn[data-v-634cc1da]{width:100%;height:%?96?%;display:-webkit-box;display:-webkit-flex;display:flex;border-top:%?1?% solid #e4e4e4;padding-bottom:%?10?%}.cancelBtn[data-v-634cc1da],.sureBtn[data-v-634cc1da]{width:50%;height:%?96?%;text-align:center;line-height:%?96?%;color:#999}.sureBtn[data-v-634cc1da]{color:#ff1558;border-left:%?1?% solid #e4e4e4}",""]),e.exports=t},a82c:function(e,t,a){var n=a("4bad");t=n(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pages[data-v-5d75dfa3]{\npadding-top:%?88?%;\nmargin:0 auto;min-height:100vh;background:#f5f5f5}.flexCenter[data-v-5d75dfa3], .address[data-v-5d75dfa3]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.whitePart[data-v-5d75dfa3]{width:calc(100% - %?38?%);margin:%?20?% auto 0;background:#fff;border-radius:%?24?%;padding:%?20?% %?18?%}.fixedBottom[data-v-5d75dfa3], .savePart[data-v-5d75dfa3]{position:fixed;height:calc(%?124?% + constant(safe-area-inset-bottom));height:calc(%?124?% + env(safe-area-inset-bottom));width:100%;background:#fff;bottom:0;left:0;padding:%?22?% %?24?%}.submit[data-v-5d75dfa3], .savePart uni-view[data-v-5d75dfa3]{height:%?80?%;background:-webkit-linear-gradient(232deg,#cb6eff,#7530c1);background:linear-gradient(218deg,#cb6eff,#7530c1);text-align:center;font-size:%?24?%;font-family:PingFang SC;font-weight:400;line-height:%?80?%;color:#fff;border-radius:%?42?%}.savePart uni-view[data-v-5d75dfa3]{width:100%;border-radius:%?40?%}.btns[data-v-5d75dfa3]{display:-webkit-box;display:-webkit-flex;display:flex}.btns uni-view[data-v-5d75dfa3]{width:%?206?%;height:%?80?%;border:1px solid #aeb5b8;border-radius:%?40?%;font-size:%?24?%;font-family:PingFang SC;font-weight:400;line-height:%?80?%;color:#7e8385;text-align:center}.btns uni-view[data-v-5d75dfa3]:first-child{margin-right:%?30?%}.address[data-v-5d75dfa3]{background:#fff;border-radius:%?24?%;margin:%?24?% auto %?20?%;width:calc(100% - %?48?%);padding:%?22?% %?20?%}.address .local[data-v-5d75dfa3]{min-width:%?48?%;height:%?48?%;background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/customization_local.png);background-size:100% 100%;margin-right:%?20?%}.address .arrows[data-v-5d75dfa3]{width:%?12?%;height:%?24?%;background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/fill_1copy102x.png);background-size:100% 100%;margin-left:%?34?%}.address .noAddress[data-v-5d75dfa3]{color:#aeb5b8;font-size:%?28?%}.address .info[data-v-5d75dfa3]{width:%?518?%;font-family:PingFang SC;font-weight:400;line-height:1.4}.address .info .top[data-v-5d75dfa3]{font-size:%?28?%;margin-bottom:%?10?%}.address .info .top .name[data-v-5d75dfa3]{color:#333;margin-right:%?20?%}.address .info .top .tel[data-v-5d75dfa3]{color:#aeb5b8}.address .info .detail[data-v-5d75dfa3]{font-size:%?22?%;color:#333}.tabTitle[data-v-5d75dfa3]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;height:%?80?%;background:#fff;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin:0 auto;position:fixed;left:0;top:0;z-index:2;top:%?88?%}.promotionView[data-v-5d75dfa3]{margin-top:%?88?%;height:calc(100vh - %?168?%);padding-bottom:%?40?%}.promotionTitle uni-view[data-v-5d75dfa3]{width:25%;text-align:center;height:100%;line-height:%?80?%;color:#666;font-size:%?32?%;font-weight:400}.promotionTitle uni-view.active[data-v-5d75dfa3]{font-weight:700;color:#7a32cc;border-color:#e61446}.promotionTitle uni-view.active[data-v-5d75dfa3]:after{content:"";display:block;width:%?40?%;height:%?4?%;background:#ae66ff;border-radius:1px;margin:%?-6?% auto 0}.hint[data-v-5d75dfa3]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;height:100%;color:#333;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.btns[data-v-5d75dfa3]{margin-top:%?40?%;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.btns uni-view[data-v-5d75dfa3]:first-child{margin-right:0;margin-left:%?30?%}',""]),e.exports=t},ac2a:function(e,t,a){"use strict";a.r(t);var n=a("6dca"),i=a("4099");for(var o in i)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(o);a("e2a9");var r,d=a("f0c5"),s=Object(d["a"])(i["default"],n["b"],n["c"],!1,null,"634cc1da",null,!1,n["a"],r);t["default"]=s.exports},b7a6:function(e,t,a){var n=a("a82c");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("70f943e4",n,!0,{sourceMap:!1,shadowMode:!1})},b921:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}));var n={uniPopup:a("1c89").default},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"pages"},[a("defaultTitle",{attrs:{dto:e.defaultTitleDto}}),a("v-uni-view",{staticClass:"tabTitle promotionTitle"},[e._l(e.order,(function(t,n){return[a("v-uni-view",{key:n+"_0",class:e.orderType==t.type?"active":"",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.orderType=t.type,e.chooseChange()}}},[e._v(e._s(t.name))])]}))],2),a("v-uni-scroll-view",{staticClass:"promotionView",attrs:{"scroll-top":e.scrollTop,"scroll-y":"true","lower-threshold":"150"},on:{scrolltolower:function(t){arguments[0]=t=e.$handleEvent(t),e.scrolltolower.apply(void 0,arguments)}}},[e._l(e.orderInfoParams.records,(function(t,n){return a("v-uni-view",{key:n,on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.goDetail(t)}}},[a("orderInfo",{attrs:{type:1,orderInfo:t,orderParent:e.orderInfoParams}},[a("v-uni-view",{staticClass:"btns",attrs:{slot:"btns"},slot:"btns"},[a("v-uni-view",{on:{click:function(a){a.stopPropagation(),arguments[0]=a=e.$handleEvent(a),e.openKefu(t.qiyuKefuGroupId)}}},[e._v("联系客服")]),10==t.orderState?a("v-uni-view",{on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.cancelOrder(n)}}},[e._v("取消订单")]):e._e(),20==t.orderState?a("v-uni-view",{on:{click:function(a){a.stopPropagation(),arguments[0]=a=e.$handleEvent(a),e.goToPay(t)}}},[e._v("去付款")]):e._e()],1)],1)],1)})),e.orderInfoParams&&e.orderInfoParams.records.length?e._e():a("v-uni-view",{staticClass:"hasNothingMsg"},[a("v-uni-image",{attrs:{src:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noOrder.png",mode:"widthFix"}}),a("v-uni-text",{staticClass:"hasNothingMsgText"},[e._v("暂无订单")])],1)],2),a("uni-popup",{ref:"cancelPopup",attrs:{type:"center"}},[a("defaultPopup",{on:{cancel:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelOk.apply(void 0,arguments)},sure:function(t){arguments[0]=t=e.$handleEvent(t),e.sureOk.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"hint"},[e._v("确定取消该订单吗？")])],1)],1)],1)},o=[]},bb78:function(e,t,a){"use strict";a.r(t);var n=a("d132"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=i.a},d132:function(e,t,a){"use strict";var n=a("4ea4");a("99af"),a("d81d"),a("ac1f"),a("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("5530")),o=n(a("27f3")),r=n(a("9c1e")),d=n(a("1087")),s=n(a("ac2a")),c={mixins:[o.default],data:function(){return{defaultTitleDto:{title:"定制订单"},order:[{type:"",name:"全部"},{type:10,name:"待确认"},{type:20,name:"待付款"},{type:30,name:"生产中"},{type:40,name:"待收货"}],orderType:"",pageInfo:{pageNo:1,pageSize:6},orderInfoParams:"",scrollTop:0,checkIndex:""}},methods:{scrolltolower:function(){this.pageInfo.pageNo>=this.orderInfoParams.totalPage||(this.pageInfo.pageNo++,this.queryOrders(!0))},chooseChange:function(){var e=this;this.pageInfo.pageNo=1,this.$nextTick((function(){e.scrollTop=0})),this.queryOrders()},queryOrders:function(e){var t=this;uni.showLoading({title:"加载中..."});var a=(0,i.default)((0,i.default)({},this.pageInfo),{},{orderState:this.orderType?this.orderType:""});d.default.listOrderPage(a).then((function(a){uni.hideLoading(),200==a.data.code?(a.data.data.records.map=a.data.data.records.map((function(e){return e.goodsList.map=e.goodsList.map((function(e){return e.deliveryDaysMap=e.deliveryDays?t.$utils.getDHours(e.deliveryDays):"",e})),e})),e?t.orderInfoParams.records=t.orderInfoParams.records.concat(a.data.data.records):t.orderInfoParams=a.data.data):uni.showToast({title:a.data.message,icon:"none"})}))},cancelOrder:function(e){this.checkIndex=e,this.$refs.cancelPopup.open()},cancelOk:function(){this.$refs.cancelPopup.close()},goToPay:function(e){2==e.payType?this.$Router.replace({path:"/pages/customizationOrder/paySuccess",query:{payType:2,type:1,orderId:e.id,qiyuKefuGroupId:e.qiyuKefuGroupId?e.qiyuKefuGroupId:""}}):this.goDetail(e)},sureOk:function(){var e=this;this.$refs.cancelPopup.close(),d.default.cancelCusOrder(this.orderInfoParams.records[this.checkIndex].id).then((function(t){200==t.data.code?(e.orderInfoParams.records[e.checkIndex].orderState=0,uni.showToast({title:"取消成功",icon:"none"})):uni.showToast({title:t.data.message,icon:"none"})}))},goDetail:function(e){this.$Router.push({path:"/pages/customizationOrder/detail",query:{id:e.id,qiyuKefuGroupId:e.qiyuKefuGroupId?e.qiyuKefuGroupId:""}})}},onLoad:function(){this.$Route.query.state&&(this.orderType=this.$Route.query.state)},onShow:function(){this.chooseChange()},components:{orderInfo:r.default,defaultPopup:s.default}};t.default=c},d2bf:function(e,t,a){var n=a("9be5");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("4ea0adac",n,!0,{sourceMap:!1,shadowMode:!1})},e2a9:function(e,t,a){"use strict";var n=a("d2bf"),i=a.n(n);i.a}}]);