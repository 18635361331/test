(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-myGiftCardOrderList-index"],{"2ba7":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{}}};e.default=i},4099:function(t,e,a){"use strict";a.r(e);var i=a("2ba7"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},"44cc":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var i={uniPopup:a("1c89").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"page commonPageTitle"},[a("defaultTitle",{attrs:{dto:t.defaultTitleDto}}),a("v-uni-view",{staticClass:"giftCardTab"},[a("v-uni-view",{staticClass:"tabRow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabChange("")}}},[a("v-uni-text",{class:t.orderStatus?"":"active"},[t._v("全部")])],1),a("v-uni-view",{staticClass:"tabRow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabChange(10)}}},[a("v-uni-text",{class:10==t.orderStatus?"active":""},[t._v("待付款")])],1)],1),a("v-uni-view",{staticClass:"orderList"},t._l(t.cardInfo.records,(function(e,i){return a("v-uni-view",{key:i,staticClass:"orderRow"},[a("v-uni-view",{staticClass:"orderTitle"},[a("v-uni-text",[t._v(t._s(t.$utils.formatDate(e.createdTime,"yyyy-MM-dd")))]),0==e.orderStatus?a("v-uni-text",{staticClass:"cancelBtn"},[t._v("已取消")]):t._e(),10==e.orderStatus?a("v-uni-text",{staticClass:"cancelBtn"},[t._v("待付款")]):t._e(),20==e.orderStatus?a("v-uni-text",{staticClass:"cancelBtn"},[t._v("已付款")]):t._e(),30==e.orderStatus?a("v-uni-text",{staticClass:"cancelBtn"},[t._v("已发布")]):t._e(),40==e.orderStatus?a("v-uni-text",{staticClass:"cancelBtn"},[t._v("已完成")]):t._e()],1),a("v-uni-view",{staticClass:"giftCardText"},[a("v-uni-view",{staticClass:"cardImage"},[a("v-uni-view",{staticClass:"cardImageBg",style:{backgroundImage:"url("+t.imgBaseUrls+e.cover+"?x-oss-process=image/resize,w_134)"}}),a("v-uni-view",{staticClass:"cardPrice"},[t._v("面值￥"+t._s(e.faceValue))])],1),a("v-uni-view",{staticClass:"cardInfo"},[a("v-uni-view",{staticClass:"cardTitle ellipsis-two"},[t._v(t._s(e.cardName))]),a("v-uni-view",{staticClass:"cardMoney"},[a("v-uni-view",[a("v-uni-text",[t._v("￥"+t._s(e.salePrice))]),a("v-uni-text",{staticClass:"faceValue"},[t._v("面值"+t._s(e.faceValue))])],1),a("v-uni-view",{staticClass:"cardNum"},[t._v("x"+t._s(e.cardNum))])],1)],1)],1),a("v-uni-view",{staticClass:"cardAllPrice"},[t._v("共"+t._s(e.cardNum)+"件商品，合计：￥"+t._s(e.orderAmount))]),a("v-uni-view",{staticClass:"cardBtn"},[0==e.orderStatus||40==e.orderStatus?a("v-uni-view",{staticClass:"cardBtnText",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.checkOrderItem(e,"del")}}},[t._v("删除订单")]):t._e(),10==e.orderStatus?a("v-uni-view",{staticClass:"cardBtnText",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.goToGiftCardPay(e)}}},[t._v("去付款")]):t._e(),10==e.orderStatus?a("v-uni-view",{staticClass:"cardBtnText",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.checkOrderItem(e,"cancel")}}},[t._v("取消订单")]):t._e()],1)],1)})),1),t.cardInfo.records&&t.cardInfo.records.length?t._e():a("v-uni-view",{staticClass:"noGiftCard"},[a("v-uni-image",{attrs:{src:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_order_none@2x.png",mode:""}}),a("v-uni-view",{staticClass:"noText"},[t._v("暂无礼卡订单")])],1),a("uni-popup",{ref:"popup",attrs:{type:"center"}},[a("defaultPopup",{on:{cancel:function(e){arguments[0]=e=t.$handleEvent(e),t.cancel.apply(void 0,arguments)},sure:function(e){arguments[0]=e=t.$handleEvent(e),t.sure.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"hint"},[t._v("确定删除该订单吗？")])],1)],1),a("uni-popup",{ref:"cancelPopup",attrs:{type:"center"}},[a("defaultPopup",{on:{cancel:function(e){arguments[0]=e=t.$handleEvent(e),t.cancelOk.apply(void 0,arguments)},sure:function(e){arguments[0]=e=t.$handleEvent(e),t.sureOk.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"hint"},[t._v("确定取消该订单吗？")])],1)],1)],1)},o=[]},4994:function(t,e,a){"use strict";a.r(e);var i=a("7818"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},"6dca":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"page popupBox"},[a("v-uni-view",{staticClass:"defaultBox"},[t._t("default")],2),a("v-uni-view",{staticClass:"defaultBtn"},[a("v-uni-view",{staticClass:"cancelBtn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$emit("cancel")}}},[t._v("取消")]),a("v-uni-view",{staticClass:"sureBtn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$emit("sure")}}},[t._v("确定")])],1)],1)},o=[]},7818:function(t,e,a){"use strict";var i=a("4ea4");a("99af"),a("c740"),a("a434"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("5530")),o=i(a("ac2a")),c=i(a("92c6")),r={data:function(){return{orderStatus:"",pageInfo:{pageNo:1,pageSize:10},imgBaseUrls:"",cardInfo:{},chooseItem:{},defaultTitleDto:{title:"礼卡订单"}}},methods:{checkOrderItem:function(t,e){this.chooseItem=t,"del"==e?this.$refs.popup.open():this.$refs.cancelPopup.open()},tabChange:function(t){this.orderStatus!=t&&(this.orderStatus=t,this.pageInfo.pageNo=1,this.cardOrderList())},cardOrderList:function(t){var e=this;uni.showLoading({title:"加载中"}),c.default.cardOrderList((0,n.default)({orderStatus:this.orderStatus},this.pageInfo)).then((function(a){uni.hideLoading(),200==a.data.code?t?(e.cardInfo.records=e.cardInfo.records.concat(a.data.data.records),e.cardInfo.totalPage=a.data.data.totalPage):e.cardInfo=a.data.data:uni.showToast({title:a.data.message,icon:"none"})}))},cancelOk:function(){this.$refs.cancelPopup.close()},sureOk:function(){var t=this;c.default.cardOrderCancel(this.chooseItem.orderId).then((function(e){if(200==e.data.code){for(var a=0;a<t.cardInfo.records.length;a++)t.cardInfo.records[a].orderId==t.chooseItem.orderId&&(t.cardInfo.records[a].orderStatus=0);t.cancelOk(),uni.showToast({title:"取消成功",icon:"none"})}else uni.showToast({title:e.data.message,icon:"none"})}))},cancel:function(){this.$refs.popup.close()},sure:function(){var t=this;c.default.cardOrderDel(this.chooseItem.orderId).then((function(e){if(200==e.data.code){var a=t.cardInfo.records.findIndex((function(e){return e.orderId==t.chooseItem.orderId}));t.cardInfo.records.splice(a,1),t.cancel(),uni.showToast({title:"删除成功",icon:"none"})}else uni.showToast({title:e.data.message,icon:"none"})}))},goToGiftCardPay:function(t){this.$Router.push({path:"/pages/giftCardPay/index",query:{payId:t.orderId}})}},onReachBottom:function(){this.pageInfo.pageNo<this.cardInfo.totalPage&&(this.pageInfo.pageNo++,this.cardOrderList(!0))},onShow:function(){this.zhuge.track("礼卡订单-落地页"),this.imgBaseUrls=this.$config.imgBaseUrl,this.cardOrderList()},components:{defaultPopup:o.default}};e.default=r},"8c31":function(t,e,a){"use strict";var i=a("e288"),n=a.n(i);n.a},"8fa6":function(t,e,a){var i=a("4bad");e=i(!1),e.push([t.i,".commonPageTitle[data-v-731529ba]{padding-top:%?88?%;\npadding-top:%?196?%;\nbackground-color:#f5f5f5;min-height:100vh}.giftCardTab[data-v-731529ba]{position:fixed;top:0;\ntop:%?88?%;\nbackground-color:#fff;left:0;display:-webkit-box;display:-webkit-flex;display:flex;width:100%;height:%?88?%}.tabRow[data-v-731529ba]{width:50%;text-align:center}.tabRow uni-text[data-v-731529ba]{display:inline-block;height:100%;line-height:%?88?%;border-bottom:%?4?% solid #fff}.tabRow uni-text.active[data-v-731529ba]{color:#ff1558;border-bottom:%?4?% solid #ff1558}.orderList[data-v-731529ba]{width:100%}.orderRow[data-v-731529ba]{width:100%;background-color:#fff;margin-bottom:%?16?%}.orderTitle[data-v-731529ba]{width:100%;height:%?80?%;line-height:%?80?%;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:0 %?20?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.cancelBtn[data-v-731529ba]{color:#ff1558}.giftCardText[data-v-731529ba]{height:%?194?%;background-color:#fafafa;display:-webkit-box;display:-webkit-flex;display:flex;padding:%?22?% 0}.cardImage[data-v-731529ba]{width:%?150?%;height:%?150?%;border:%?1?% solid #e5e5e5;padding-top:%?14?%;border-radius:%?10?%;background-color:#fff;margin-left:%?24?%}.cardImageBg[data-v-731529ba]{width:%?134?%;height:%?82?%;background-position:50%;background-size:cover;background-repeat:no-repeat;margin:0 auto}.cardPrice[data-v-731529ba]{font-size:%?24?%;color:#555;padding-top:%?8?%;text-align:center}.cardInfo[data-v-731529ba]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:%?150?%;margin:0 %?24?%}.cardTitle[data-v-731529ba]{width:100%;height:%?72?%;line-height:%?36?%;color:#333}.cardMoney[data-v-731529ba]{width:100%;height:%?40?%;line-height:%?40?%;color:#ff1558;margin-top:%?36?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.faceValue[data-v-731529ba]{margin-left:%?10?%;color:#999;text-decoration:line-through}.cardNum[data-v-731529ba]{color:#999}.cardAllPrice[data-v-731529ba]{width:100%;height:%?88?%;line-height:%?88?%;text-align:right;font-size:%?24?%;color:#686868;padding-right:%?18?%;border-bottom:%?1?% solid #e4e4e4}.cardBtn[data-v-731529ba]{width:100%;height:%?98?%;padding-right:%?24?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.cardBtnText[data-v-731529ba]{width:%?150?%;height:%?52?%;text-align:center;line-height:%?52?%;color:#666;margin-top:%?18?%;margin-left:%?24?%;border-radius:%?8?%;border:%?1?% solid #999}.hint[data-v-731529ba]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;height:100%;color:#333;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.noGiftCard[data-v-731529ba]{width:100%;background-color:#f5f5f5;text-align:center;padding-top:%?300?%}.noGiftCard uni-image[data-v-731529ba]{width:%?360?%;height:%?360?%}.noText[data-v-731529ba]{color:#999;text-align:center;font-size:%?30?%;padding-top:%?55?%}",""]),t.exports=e},"9be5":function(t,e,a){var i=a("4bad");e=i(!1),e.push([t.i,".popupBox[data-v-634cc1da]{width:%?600?%;height:%?360?%;border-radius:%?30?%;background-color:#fff;font-size:%?32?%}.defaultBox[data-v-634cc1da]{width:100%;height:calc(100% - %?106?%)}.defaultBtn[data-v-634cc1da]{width:100%;height:%?96?%;display:-webkit-box;display:-webkit-flex;display:flex;border-top:%?1?% solid #e4e4e4;padding-bottom:%?10?%}.cancelBtn[data-v-634cc1da],.sureBtn[data-v-634cc1da]{width:50%;height:%?96?%;text-align:center;line-height:%?96?%;color:#999}.sureBtn[data-v-634cc1da]{color:#ff1558;border-left:%?1?% solid #e4e4e4}",""]),t.exports=e},ac2a:function(t,e,a){"use strict";a.r(e);var i=a("6dca"),n=a("4099");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("e2a9");var c,r=a("f0c5"),d=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"634cc1da",null,!1,i["a"],c);e["default"]=d.exports},d2bf:function(t,e,a){var i=a("9be5");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("4ea0adac",i,!0,{sourceMap:!1,shadowMode:!1})},d8a0:function(t,e,a){"use strict";a.r(e);var i=a("44cc"),n=a("4994");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("8c31");var c,r=a("f0c5"),d=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"731529ba",null,!1,i["a"],c);e["default"]=d.exports},e288:function(t,e,a){var i=a("8fa6");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("10531c4e",i,!0,{sourceMap:!1,shadowMode:!1})},e2a9:function(t,e,a){"use strict";var i=a("d2bf"),n=a.n(i);n.a}}]);