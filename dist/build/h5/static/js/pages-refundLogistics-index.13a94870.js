(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-refundLogistics-index"],{"0128":function(t,e,i){"use strict";var a=i("d67e"),s=i.n(a);s.a},"0b259":function(t,e,i){var a=i("4bad");e=a(!1),e.push([t.i,".logisicsBox[data-v-997cf826]{width:100%;\npadding-top:%?88?%\n}.logisicsTitle[data-v-997cf826]{border-bottom:2px solid #e6e6e6}.logisicsTab[data-v-997cf826]{width:100%}.logisicsParentBox[data-v-997cf826]{min-width:100%;height:%?88?%;display:-webkit-box;display:-webkit-flex;display:flex;line-height:%?88?%;text-align:center;white-space:nowrap}.logisicsGoods[data-v-997cf826]{width:100%;padding:%?30?% %?25?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex}.everyRow[data-v-997cf826]{-webkit-box-flex:1;-webkit-flex:1 1 auto;flex:1 1 auto;min-width:%?132?%;display:block;white-space:nowrap}.everyRow.active[data-v-997cf826]{font-size:%?40?%;font-weight:700;-webkit-transition:all .2s;transition:all .2s;white-space:nowrap}.goodsInfo[data-v-997cf826]{position:relative;width:%?150?%;height:%?150?%;background-color:#fff;border:%?1?% solid #dfdfdf;border-radius:%?10?%;overflow:hidden}.goodsNum[data-v-997cf826]{width:100%;height:%?30?%;font-size:%?20?%;color:#fff;text-align:center;line-height:%?30?%;background-color:rgba(0,0,0,.4);position:absolute;bottom:0;left:0}.logisicsInfo[data-v-997cf826]{padding-left:%?25?%;-webkit-box-flex:1;-webkit-flex:1;flex:1}.logisicsStatus[data-v-997cf826]{font-size:%?30?%;color:#ff1558;line-height:%?50?%}.distribution[data-v-997cf826]{line-height:%?50?%;color:#787878}.logisicsAddress[data-v-997cf826]{padding:%?24?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.addressIcon[data-v-997cf826]{width:%?34?%;height:%?34?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/adress@2x.png) no-repeat 50%;background-size:%?34?% %?34?%}.addressInfo[data-v-997cf826]{padding-left:%?25?%;-webkit-box-flex:1;-webkit-flex:1;flex:1}.userInfoName[data-v-997cf826]{font-weight:700;color:#333;font-size:%?32?%}.addressTel[data-v-997cf826]{margin-left:%?64?%}.addrInfo[data-v-997cf826]{margin-top:%?8?%;color:#666;line-height:%?40?%}.logisicsList[data-v-997cf826]{width:100%;position:relative;padding-top:%?32?%}.line[data-v-997cf826]{width:%?4?%;height:calc(100% - %?32?%);position:absolute;top:%?32?%;left:%?42?%;background-color:#e5e5e5}.everyLogisics[data-v-997cf826]{margin-left:%?80?%;margin-right:%?32?%;padding:%?24?% 0;position:relative;border-bottom:1px solid #e6e6e6}.everyName[data-v-997cf826]{color:#333;line-height:%?32?%}.everyTime[data-v-997cf826]{color:#999;margin-top:%?7?%;font-size:%?24?%}.logisicsIcon[data-v-997cf826]{width:%?24?%;height:%?24?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy3@2x.png) no-repeat 50%;background-size:%?24?% %?24?%;position:absolute;left:%?-48?%;top:50%;margin-top:%?-12?%}.logisicsIcon.active[data-v-997cf826]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/quan2@2x.png) no-repeat 50%;background-size:%?24?% %?24?%}.logisticsMask[data-v-997cf826]{width:%?72?%;height:50%;position:absolute;left:%?-72?%;background-color:#fff;top:0}.logisticsMaskBtm[data-v-997cf826]{width:%?72?%;height:50%;position:absolute;left:%?-72?%;background-color:#fff;bottom:0}",""]),t.exports=e},1027:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={getExpressageInfo:"/transport/expressage/getExpressageInfo",getLogistics:"/transport/expressage/getLogistics",getReturnExpressageInfo:"transport/expressage/getReturnExpressageInfo"},s=a;e.default=s},"5db4":function(t,e,i){"use strict";i.r(e);var a=i("61c6"),s=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=s.a},"61c6":function(t,e,i){"use strict";var a=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a(i("f940")),o={data:function(){return{params:{},imgBaseUrls:"",defaultTitleDto:{title:"物流信息"}}},mounted:function(){this.imgBaseUrls=this.$config.imgBaseUrl,this.getExpressageInfo()},onShow:function(){this.zhuge.track("退款物流信息-落地页")},computed:{},onUnload:function(){uni.removeStorageSync("logisticsInfo")},methods:{getExpressageInfo:function(){var t=this;s.default.getReturnExpressageInfo({returnOrderId:this.$Route.query.returnOrderId}).then((function(e){200==e.data.code?t.params=e.data.data:uni.showToast({title:e.data.message,icon:"none"})}))}}};e.default=o},"7e9e":function(t,e,i){"use strict";i.r(e);var a=i("f9a9"),s=i("5db4");for(var o in s)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(o);i("0128");var n,r=i("f0c5"),l=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"997cf826",null,!1,a["a"],n);e["default"]=l.exports},d67e:function(t,e,i){var a=i("0b259");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("121a5de6",a,!0,{sourceMap:!1,shadowMode:!1})},f940:function(t,e,i){"use strict";var a=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a(i("1027")),o=a(i("b775")),n={getExpressageInfo:function(t){return o.default.post(s.default.getExpressageInfo,{orderId:t})},getLogistics:function(){return o.default.post(s.default.getLogistics,{})},getReturnExpressageInfo:function(t){return o.default.post(s.default.getReturnExpressageInfo,t)}};e.default=n},f9a9:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"page logisicsBox"},[i("defaultTitle",{attrs:{dto:t.defaultTitleDto}}),i("v-uni-view",{staticClass:"logisicsGoods"},[i("v-uni-view",{staticClass:"goodsInfo"},[i("v-uni-image",{attrs:{src:t.imgBaseUrls+t.params.goodsImage,mode:""}}),i("v-uni-view",{staticClass:"goodsNum"},[t._v("共"+t._s(t.params.goodsTotal)+"件商品")])],1),i("v-uni-view",{staticClass:"logisicsInfo"},[i("v-uni-view",{staticClass:"distribution"},[t._v("配送商："+t._s(t.params.comName))]),t.params.expressType?t._e():i("v-uni-view",{staticClass:"distribution"},[t._v("快递编号："+t._s(t.params.nu))])],1)],1),i("v-uni-view",{staticClass:"logisicsList"},[i("v-uni-view",{staticClass:"line"}),t._l(t.params.dataList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"everyLogisics"},[i("v-uni-view",{staticClass:"everyName"},[t._v(t._s(e.split("#")[1]))]),i("v-uni-view",{staticClass:"everyTime"},[t._v(t._s(e.split("#")[0]))]),0==a?i("v-uni-view",{staticClass:"logisticsMask"}):t._e(),a==t.params.dataList.length-1?i("v-uni-view",{staticClass:"logisticsMaskBtm"}):t._e(),i("v-uni-view",{staticClass:"logisicsIcon",class:0==a?"active":""})],1)}))],2)],1)},o=[]}}]);