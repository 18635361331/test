(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myGiftCardOrderList/index"],{4809:function(e,t,n){"use strict";var r=n("fe0d"),o=n.n(r);o.a},4994:function(e,t,n){"use strict";n.r(t);var r=n("c902"),o=n.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},bd1b:function(e,t,n){"use strict";(function(e){n("6cdc");r(n("66fd"));var t=r(n("d8a0"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},c902:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("92c6"));function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(){n.e("components/defaultPopup/index").then(function(){return resolve(n("ac2a"))}.bind(null,n)).catch(n.oe)},s={data:function(){return{orderStatus:"",pageInfo:{pageNo:1,pageSize:10},imgBaseUrls:"",cardInfo:{},chooseItem:{},defaultTitleDto:{title:"礼卡订单"}}},methods:{checkOrderItem:function(e,t){this.chooseItem=e,"del"==t?this.$refs.popup.open():this.$refs.cancelPopup.open()},tabChange:function(e){this.orderStatus!=e&&(this.orderStatus=e,this.pageInfo.pageNo=1,this.cardOrderList())},cardOrderList:function(t){var n=this;e.showLoading({title:"加载中"}),r.default.cardOrderList(c({orderStatus:this.orderStatus},this.pageInfo)).then((function(r){e.hideLoading(),200==r.data.code?t?(n.cardInfo.records=n.cardInfo.records.concat(r.data.data.records),n.cardInfo.totalPage=r.data.data.totalPage):n.cardInfo=r.data.data:e.showToast({title:r.data.message,icon:"none"})}))},cancelOk:function(){this.$refs.cancelPopup.close()},sureOk:function(){var t=this;r.default.cardOrderCancel(this.chooseItem.orderId).then((function(n){if(200==n.data.code){for(var r=0;r<t.cardInfo.records.length;r++)t.cardInfo.records[r].orderId==t.chooseItem.orderId&&(t.cardInfo.records[r].orderStatus=0);t.cancelOk(),e.showToast({title:"取消成功",icon:"none"})}else e.showToast({title:n.data.message,icon:"none"})}))},cancel:function(){this.$refs.popup.close()},sure:function(){var t=this;r.default.cardOrderDel(this.chooseItem.orderId).then((function(n){if(200==n.data.code){var r=t.cardInfo.records.findIndex((function(e){return e.orderId==t.chooseItem.orderId}));t.cardInfo.records.splice(r,1),t.cancel(),e.showToast({title:"删除成功",icon:"none"})}else e.showToast({title:n.data.message,icon:"none"})}))},goToGiftCardPay:function(e){this.$Router.push({path:"/pages/giftCardPay/index",query:{payId:e.orderId}})}},onReachBottom:function(){this.pageInfo.pageNo<this.cardInfo.totalPage&&(this.pageInfo.pageNo++,this.cardOrderList(!0))},onShow:function(){this.zhuge.track("礼卡订单-落地页"),this.imgBaseUrls=this.$config.imgBaseUrl,this.cardOrderList()},components:{defaultPopup:d}};t.default=s}).call(this,n("543d")["default"])},d48d:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var r={uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"1c89"))}},o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.cardInfo.records,(function(t,n){var r=e.__get_orig(t),o=e.$utils.formatDate(t.createdTime,"yyyy-MM-dd");return{$orig:r,g0:o}})));e.$mp.data=Object.assign({},{$root:{l0:n}})},a=[]},d8a0:function(e,t,n){"use strict";n.r(t);var r=n("d48d"),o=n("4994");for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("4809");var c,i=n("f0c5"),d=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,"659a2d28",null,!1,r["a"],c);t["default"]=d.exports},fe0d:function(e,t,n){}},[["bd1b","common/runtime","common/vendor"]]]);