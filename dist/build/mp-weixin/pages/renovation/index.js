(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/renovation/index"],{"0f10":function(t,o,n){"use strict";var e;n.d(o,"b",(function(){return a})),n.d(o,"c",(function(){return c})),n.d(o,"a",(function(){return e}));var a=function(){var t=this,o=t.$createElement;t._self._c},c=[]},"8aa4":function(t,o,n){"use strict";(function(t){n("6cdc");e(n("66fd"));var o=e(n("962d"));function e(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,n("543d")["createPage"])},"922f":function(t,o,n){},9541:function(t,o,n){"use strict";var e=n("922f"),a=n.n(e);a.a},"962d":function(t,o,n){"use strict";n.r(o);var e=n("0f10"),a=n("aa53");for(var c in a)["default"].indexOf(c)<0&&function(t){n.d(o,t,(function(){return a[t]}))}(c);n("9541");var r,i=n("f0c5"),s=Object(i["a"])(a["default"],e["b"],e["c"],!1,null,"45ad9771",null,!1,e["a"],r);o["default"]=s.exports},9820:function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e=a(n("1d88"));function a(t){return t&&t.__esModule?t:{default:t}}function c(t,o){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);o&&(e=e.filter((function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable}))),n.push.apply(n,e)}return n}function r(t){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{};o%2?c(Object(n),!0).forEach((function(o){i(t,o,n[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(n,o))}))}return t}function i(t,o,n){return o in t?Object.defineProperty(t,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[o]=n,t}var s=function(){n.e("renovation/renovationMain/index").then(function(){return resolve(n("594e"))}.bind(null,n)).catch(n.oe)},u={props:["url"],data:function(){return{renovationInfo:{},scrollNum:0,pageInfo:{pageNo:1,sortNo:""}}},methods:{storeList:function(){var o=this;this.pageInfo.pageNo=1,t.showLoading({title:"加载中..."}),e.default.storeList({location:"h5",url:this.$Route.query.url?this.$Route.query.url:this.url}).then((function(n){if(t.hideLoading(),200==n.data.code){if(n.data.data.componentVos)for(var e=0;e<n.data.data.componentVos.length;e++)if(n.data.data.componentVos[e].content&&"NaN"!=n.data.data.componentVos[e].content&&(n.data.data.componentVos[e].content=JSON.parse(n.data.data.componentVos[e].content)),"twoColumnGoods"==n.data.data.componentVos[e].type)for(var a=0;a<n.data.data.componentVos[e].content.componentPageVO.componentVoList.length;a++)n.data.data.componentVos[e].content.componentPageVO.componentVoList[a].unpromotionMinPrice=n.data.data.componentVos[e].content.componentPageVO.componentVoList[a].marketPrice,n.data.data.componentVos[e].content.componentPageVO.componentVoList[a].minPrice=n.data.data.componentVos[e].content.componentPageVO.componentVoList[a].sellingPrice;o.renovationInfo=n.data.data;try{t.setNavigationBarTitle({title:o.renovationInfo.componentVos[0].content.titleName?o.renovationInfo.componentVos[0].content.titleName:o.renovationInfo.shareSubTitle}),o.zhuge.track("装修页面"+n.data.data.componentVos[0].content.titleName)}catch(c){}}else t.showToast({title:n.data.message,icon:"none"})}))},decorateList:function(){var o=this;e.default.decorateList(r({location:"h5",url:this.$Route.query.url?this.$Route.query.url:this.url},this.pageInfo)).then((function(n){200==n.data.code?n.data.data.componentVoList&&(o.renovationInfo.componentVos[o.renovationInfo.componentVos.length-1].content.componentPageVO.componentVoList=o.renovationInfo.componentVos[o.renovationInfo.componentVos.length-1].content.componentPageVO.componentVoList.concat(n.data.data.componentVoList)):t.showToast({title:n.data.message,icon:"none"})}))},judgeReachBottom:function(){var t=this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].content;this.pageInfo.sortNo=this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].sortNo,t&&t.componentPageVO&&t.componentPageVO.totalPageNum&&this.pageInfo.pageNo<t.componentPageVO.totalPageNum&&(this.pageInfo.pageNo++,this.decorateList())}},onPageScroll:function(t){this.scrollNum=t.scrollTop},onReachBottom:function(){this.judgeReachBottom()},mounted:function(){this.storeList()},components:{renovation:s}};o.default=u}).call(this,n("543d")["default"])},aa53:function(t,o,n){"use strict";n.r(o);var e=n("9820"),a=n.n(e);for(var c in e)["default"].indexOf(c)<0&&function(t){n.d(o,t,(function(){return e[t]}))}(c);o["default"]=a.a}},[["8aa4","common/runtime","common/vendor"]]]);