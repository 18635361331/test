(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-giftCard-index"],{"10e1":function(t,a,i){"use strict";i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return o})),i.d(a,"a",(function(){return e}));var e={uniPopup:i("1c89").default},n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"page commonPageTitle"},[i("defaultTitle",{attrs:{dto:t.defaultTitleDto}}),i("v-uni-view",{staticClass:"giftCardHead"},[i("v-uni-image",{attrs:{src:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/myGift_card_headerbg.png?233",mode:"widthFix"}}),i("v-uni-view",{staticClass:"giftCardText"},[t._v("礼卡余额：")]),i("v-uni-view",{staticClass:"giftCardMoney"},[t._v(t._s(t.giftMoney)),i("v-uni-text",[t._v("元")])],1),i("v-uni-view",{staticClass:"giftCardSubTitle"},[t._v("文器库商城发行的专属预付购物储值卡")]),i("v-uni-view",{staticClass:"bindGiftCard",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.openCardPopup.apply(void 0,arguments)}}},[t._v("礼卡绑定")])],1),i("v-uni-view",{staticClass:"giftCardRow",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$Router.push({path:"/pages/myGiftList/index"})}}},[i("v-uni-image",{attrs:{src:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/my_card@2x.png?3",mode:""}}),i("v-uni-view",{staticClass:"giftCardRowText"},[i("v-uni-view",{staticClass:"giftCardTitle"},[t._v("我的礼卡")]),i("v-uni-view",{staticClass:"giftCardSub"},[t._v("可查看自己的所有礼卡使用情况")])],1)],1),i("v-uni-view",{staticClass:"giftCardRow",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$Router.push({path:"/pages/myGiftCardOrderList/index"})}}},[i("v-uni-image",{attrs:{src:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_order@2x.png?1",mode:""}}),i("v-uni-view",{staticClass:"giftCardRowText"},[i("v-uni-view",{staticClass:"giftCardTitle"},[t._v("礼卡订单")]),i("v-uni-view",{staticClass:"giftCardSub"},[t._v("可查看所有购买礼卡记录")])],1)],1),i("v-uni-view",{staticClass:"giftCardRow",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$Router.push({path:"/pages/giftCardRecord/index"})}}},[i("v-uni-image",{attrs:{src:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_record@2x.png?2",mode:""}}),i("v-uni-view",{staticClass:"giftCardRowText"},[i("v-uni-view",{staticClass:"giftCardTitle"},[t._v("消费记录")]),i("v-uni-view",{staticClass:"giftCardSub"},[t._v("可查看所有礼卡使用消费记录")])],1)],1),i("v-uni-view",{staticClass:"giftBanner",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.goToGiftCardList.apply(void 0,arguments)}}}),i("uni-popup",{ref:"popup",attrs:{type:"center"}},[i("v-uni-view",{staticClass:"cardPopup"},[i("v-uni-view",{staticClass:"closeBtn",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.closeCardPopup.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"cardTitle"},[t._v("绑定")]),i("v-uni-view",{staticClass:"cardInput"},[i("v-uni-input",{staticClass:"cardInputBox",attrs:{type:"text",placeholderClass:"placeholder",placeholder:"请输入卡号"},model:{value:t.cardInfo.cardNo,callback:function(a){t.$set(t.cardInfo,"cardNo",a)},expression:"cardInfo.cardNo"}}),i("v-uni-input",{staticClass:"cardInputBox",attrs:{type:"password",placeholderClass:"placeholder",placeholder:"请输入卡密"},model:{value:t.cardInfo.pwd,callback:function(a){t.$set(t.cardInfo,"pwd",a)},expression:"cardInfo.pwd"}})],1),i("v-uni-view",{staticClass:"bindBtn",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.sureBind.apply(void 0,arguments)}}},[t._v("绑定")])],1)],1)],1)},o=[]},1320:function(t,a,i){var e=i("4bad");a=e(!1),a.push([t.i,".commonPageTitle[data-v-202a6dca]{\npadding-top:%?88?%;\nbackground-color:#f4f4f4;min-height:100vh;padding-bottom:%?48?%}.giftCardHead[data-v-202a6dca]{width:100%;padding-top:%?30?%;position:relative}.giftCardText[data-v-202a6dca]{position:absolute;top:%?94?%;left:%?64?%;color:#fff;font-size:%?34?%}.giftCardMoney[data-v-202a6dca]{position:absolute;left:%?64?%;top:%?168?%;font-size:%?110?%;color:#fff}.giftCardMoney uni-text[data-v-202a6dca]{font-size:%?30?%}.giftCardSubTitle[data-v-202a6dca]{position:absolute;left:%?64?%;bottom:%?100?%;color:#fff}.bindGiftCard[data-v-202a6dca]{width:%?124?%;height:%?40?%;background-color:#fff;border-top-left-radius:%?33?%;border-bottom-left-radius:%?33?%;position:absolute;bottom:%?200?%;right:%?30?%;color:#ff1558;text-align:center;line-height:%?40?%;font-size:%?24?%}.giftCardRow[data-v-202a6dca]{height:%?196?%;width:%?690?%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-color:#fff;margin-bottom:%?24?%;border-radius:%?12?%;padding:0 %?32?%}.giftCardRow uni-image[data-v-202a6dca]{width:%?112?%;height:%?112?%}.giftCardRowText[data-v-202a6dca]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin:%?38?% 0 %?30?% %?56?%}.giftCardTitle[data-v-202a6dca]{font-size:%?36?%;margin-bottom:%?20?%;font-weight:700;color:#333}.giftCardSub[data-v-202a6dca]{font-size:%?24?%;color:#999}.arrow[data-v-202a6dca]{width:%?12?%;height:%?24?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;background-size:%?12?% %?24?%}.cardPopup[data-v-202a6dca]{width:%?600?%;height:%?480?%;background-color:#fff;padding:%?23?% %?40?% %?46?%;border-radius:%?30?%;position:relative}.cardTitle[data-v-202a6dca]{width:100%;height:%?60?%;line-height:%?60?%;text-align:center;line-height:%?60?%;color:#333;font-size:%?32?%}.cardInput[data-v-202a6dca]{width:%?520?%;padding-top:%?18?%;padding-bottom:%?50?%}.cardInputBox[data-v-202a6dca]{width:100%;height:%?98?%;border-bottom:%?1?% solid #e4e4e4}.bindBtn[data-v-202a6dca]{width:100%;height:%?88?%;line-height:%?88?%;text-align:center;background-color:#ff1558;color:#fff;font-size:%?36?%;border-radius:%?71?%}.closeBtn[data-v-202a6dca]{width:%?50?%;height:%?50?%;position:absolute;top:%?30?%;right:%?40?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png) no-repeat 50%;background-size:%?50?% %?50?%}.giftBanner[data-v-202a6dca]{width:%?690?%;height:%?200?%;margin:auto;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/giftCardBanner.png) no-repeat 50%;background-size:100%}",""]),t.exports=a},cc9a:function(t,a,i){"use strict";i.r(a);var e=i("10e1"),n=i("f257");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(a,t,(function(){return n[t]}))}(o);i("d9d3");var d,s=i("f0c5"),c=Object(s["a"])(n["default"],e["b"],e["c"],!1,null,"202a6dca",null,!1,e["a"],d);a["default"]=c.exports},d238:function(t,a,i){"use strict";var e=i("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=e(i("92c6")),o={data:function(){return{giftMoney:0,cardInfo:{cardNo:"",pwd:""},defaultTitleDto:{title:"我的礼卡"}}},methods:{totalBalance:function(){var t=this;n.default.totalBalance().then((function(a){200==a.data.code?t.giftMoney=a.data.data:uni.showToast({title:a.data.message,icon:"none"})}))},openCardPopup:function(){this.$refs.popup.open()},closeCardPopup:function(){this.$refs.popup.close()},sureBind:function(){this.cardInfo.cardNo?this.cardInfo.pwd?6==this.cardInfo.pwd.length?this.bindCard():uni.showToast({title:"请输入6位密码",icon:"none"}):uni.showToast({title:"请输入卡密",icon:"none"}):uni.showToast({title:"请输入卡号",icon:"none"})},bindCard:function(){var t=this;n.default.bindCard(this.cardInfo).then((function(a){200==a.data.code?(uni.showToast({title:"礼卡绑定成功",icon:"none"}),t.totalBalance(),t.closeCardPopup()):uni.showToast({title:a.data.message,icon:"none"})}))},goToGiftCardList:function(){this.$Router.push({path:"/pages/giftCardList/index"})}},onShow:function(){this.zhuge.track("我的礼卡页面"),this.totalBalance()}};a.default=o},d9d3:function(t,a,i){"use strict";var e=i("f31c"),n=i.n(e);n.a},f257:function(t,a,i){"use strict";i.r(a);var e=i("d238"),n=i.n(e);for(var o in e)["default"].indexOf(o)<0&&function(t){i.d(a,t,(function(){return e[t]}))}(o);a["default"]=n.a},f31c:function(t,a,i){var e=i("1320");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("53312f5b",e,!0,{sourceMap:!1,shadowMode:!1})}}]);