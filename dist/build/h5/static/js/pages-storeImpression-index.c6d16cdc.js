(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-storeImpression-index"],{"0867":function(e,t,a){var o=a("4bad");t=o(!1),t.push([e.i,".commonPageTitle[data-v-6a97dfc0]{height:100vh;background-color:#f5f5f5}.storeMain[data-v-6a97dfc0]{padding:0 %?30?%;width:100%;padding-top:%?88?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/shop_bg.png) 50%;height:%?500?%;position:relative;padding-top:%?40?%;\npadding-top:%?120?%\n}.shopInfo[data-v-6a97dfc0]{width:100%;height:%?192?%;padding:%?36?%;border-radius:%?6?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex}.shopImage[data-v-6a97dfc0]{width:%?100?%;height:%?100?%;background-position:50%;background-size:cover}.shopName[data-v-6a97dfc0]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin:0 %?36?%;height:%?100?%}.business[data-v-6a97dfc0]{width:%?44?%;height:%?44?%;vertical-align:middle}.shopNameTitle[data-v-6a97dfc0]{font-size:%?36?%;color:#000;margin-top:%?8?%;height:%?44?%;font-weight:700}.shopNameSpeople[data-v-6a97dfc0]{margin-top:%?10?%}.storeInfo[data-v-6a97dfc0]{width:100%;margin-top:%?6?%;padding:%?36?%;background-color:#fff;border-radius:%?6?%}.storeTitle[data-v-6a97dfc0]{font-weight:700;line-height:%?44?%}.infoText[data-v-6a97dfc0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;height:%?88?%;line-height:%?88?%;color:#666}",""]),e.exports=t},"0cd9":function(e,t,a){"use strict";var o;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return o}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page commonPageTitle"},[a("defaultTitle",{attrs:{dto:e.defaultTitleDto}}),a("v-uni-view",{staticClass:"storeMain"},[a("v-uni-view",{staticClass:"shopInfo"},[a("v-uni-view",{staticClass:"shopImage",style:{backgroundImage:"url("+e.imgBaseUrls+e.merchantInfo.images+")"}}),a("v-uni-view",{staticClass:"shopName"},[a("v-uni-view",{staticClass:"shopNameTitle"},[e._v(e._s(e.merchantInfo.storeName?e.merchantInfo.storeName:""))]),a("v-uni-view",{staticClass:"shopNameSpeople"},[e._v(e._s(e.merchantInfo.focusCount?e.merchantInfo.focusCount:"0")+"人关注")])],1)],1),a("v-uni-view",{staticClass:"storeInfo"},[a("v-uni-view",{staticClass:"storeTitle"},[e._v("基础信息")]),a("v-uni-view",{staticClass:"infoText"},[a("v-uni-text",[e._v("商家电话")]),a("v-uni-text",[e._v(e._s(e.basicInfo.telephone?e.basicInfo.telephone:""))])],1),a("v-uni-view",{staticClass:"infoText",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goToShopCode.apply(void 0,arguments)}}},[a("v-uni-text",[e._v("营业执照")]),a("v-uni-view",[a("v-uni-image",{staticClass:"business",attrs:{src:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/szz2.png",mode:""}})],1)],1),a("v-uni-view",{staticClass:"infoText"},[a("v-uni-text",[e._v("所在地区")]),a("v-uni-text",[e._v(e._s(e.basicInfo.licenseLocation?e.basicInfo.licenseLocation:""))])],1),a("v-uni-view",{staticClass:"infoText"},[a("v-uni-text",[e._v("开店时间")]),a("v-uni-text",[e._v(e._s(e.$utils.formatDate(e.basicInfo.establishTime,"yyyy-MM-dd")))])],1)],1)],1)],1)},i=[]},"49f2":function(e,t,a){"use strict";a.r(t);var o=a("7709"),n=a.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return o[e]}))}(i);t["default"]=n.a},7709:function(e,t,a){"use strict";var o=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("c519")),i={data:function(){return{merchantInfo:{},basicInfo:{},imgBaseUrls:"",defaultTitleDto:{title:"店铺印象",bg:"page_write@2x.png",color:"white"}}},methods:{selectMerchantFollowDetailsList:function(){var e=this;n.default.selectMerchantFollowDetailsList(this.$Route.query.storeId).then((function(t){200==t.data.code?e.merchantInfo=t.data.data:uni.showToast({title:t.data.message,icon:"none"})}))},merchantBasicInfo:function(){var e=this;n.default.merchantBasicInfo(this.$Route.query.storeId).then((function(t){200==t.data.code?e.basicInfo=t.data.data:uni.showToast({title:t.data.message,icon:"none"})}))},goToShopCode:function(){this.$Router.push({path:"/pages/shopCode/index",query:{storeId:this.$Route.query.storeId}})}},onShow:function(){this.zhuge.track("店铺印象-落地页",{"店铺id":this.$Route.query.storeId}),this.imgBaseUrls=this.$config.imgBaseUrl,this.selectMerchantFollowDetailsList(),this.merchantBasicInfo()}};t.default=i},"8f9c":function(e,t,a){"use strict";var o=a("a956"),n=a.n(o);n.a},a633:function(e,t,a){"use strict";a.r(t);var o=a("0cd9"),n=a("49f2");for(var i in n)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(i);a("8f9c");var s,c=a("f0c5"),r=Object(c["a"])(n["default"],o["b"],o["c"],!1,null,"6a97dfc0",null,!1,o["a"],s);t["default"]=r.exports},a956:function(e,t,a){var o=a("0867");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=a("4f06").default;n("2572a2e6",o,!0,{sourceMap:!1,shadowMode:!1})},c519:function(e,t,a){"use strict";var o=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("ebd3")),i=o(a("b775")),s={getStore:function(e){return i.default.post(n.default.getStore+e)},selectMerchantFollowDetailsList:function(e){return i.default.post(n.default.selectMerchantFollowDetailsList+e)},cancelFollowByMemberIdAndStoreId:function(e){return i.default.post(n.default.cancelFollowByMemberIdAndStoreId,{storeId:e})},addMerchantFollow:function(e){return i.default.post(n.default.addMerchantFollow,{storeId:e})},selectMerchantFollowList:function(e){return i.default.post(n.default.selectMerchantFollowList,e)},merchantBasicInfo:function(e){return i.default.post(n.default.merchantBasicInfo+e,{})},merchGetVerifyCode:function(){return i.default.post(n.default.merchGetVerifyCode,{})},checkVerifyCode:function(e){return i.default.post(n.default.checkVerifyCode,e)}};t.default=s},ebd3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={getStore:"/merchant/storeInfo/getStore/",selectMerchantFollowDetailsList:"/merchant/merchantfollow/selectMerchantFollowDetailsList/",cancelFollowByMemberIdAndStoreId:"/merchant/merchantfollow/cancelFollowByMemberIdAndStoreId",addMerchantFollow:"merchant/merchantfollow/addMerchantFollow",selectMerchantFollowList:"/merchant/merchantfollow/selectMerchantFollowList",merchantBasicInfo:"/merchant/storeInfo/basicInfo/",checkVerifyCode:"/merchant/storeInfo/checkVerifyCode",merchGetVerifyCode:"/merchant/storeInfo/getVerifyCode"},n=o;t.default=n}}]);