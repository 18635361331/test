(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/applyAfterSale/index"],{"33e4":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=s(n("1087")),r=s(n("ee48"));function s(e){return e&&e.__esModule?e:{default:e}}var u={mixins:[r.default],data:function(){return{refundInfo:{},imgBaseUrls:"",refundReasonList:[],params:{refundReasonCode:"",refundImages:[],orderId:"",refundType:0,entryRefundPrice:0,refundDescription:""},defaultTitleDto:{title:"申请售后"}}},methods:{applyFofRefund:function(t){var n=this;a.default.applyFofRefund(t).then((function(a){if(200==a.data.code){if(n.refundInfo=a.data.data,t.refundId)for(var r in n.params)"refundImages"==r?n.$set(n.params,r,JSON.parse(a.data.data[r])):n.$set(n.params,r,a.data.data[r])}else e.showToast({title:a.data.message,icon:"none"})}))},refundReason:function(t){var n=this;a.default.refundReason(t).then((function(t){200==t.data.code?n.refundReasonList=t.data.data:e.showToast({title:t.data.message,icon:"none"})}))},openRefundReason:function(){this.$refs.refundPopup.open()},closeRefundPopup:function(){this.$refs.refundPopup.close()},chooseimage:function(){var t=this;e.chooseImage({count:3,success:function(e){e.tempFiles=e.tempFiles.slice(0,3-t.params.refundImages.length);for(var n=0;n<e.tempFiles.length;n++)t.uploadImage(e.tempFiles[n].path)}})},updateImage:function(e){this.params.refundImages.push(e.data)},submitApplyFofRefund:function(){var t=this;if(this.params.refundReasonCode){this.params.refundDescription||this.$delete(this.params,"refundDescription"),this.$set(this.params,"entryRefundPrice",this.refundInfo.refundPrice);var n=JSON.parse(JSON.stringify(this.params));n.refundImages=JSON.stringify(n.refundImages),this.$Route.query.status?(delete n.orderDetailIds,delete n.orderId,n.refundId=this.$Route.query.orderId):n.orderDetailIds=[this.$Route.query.orderDetailIds],a.default.submitApplyFofRefund(n).then((function(n){200==n.data.code?t.goBack(1):e.showToast({title:n.data.message,icon:"none"})}))}else e.showToast({title:"售后原因不能为空",icon:"none"})}},onShow:function(){this.zhuge.track("申请售后"),this.imgBaseUrls=this.$config.imgBaseUrl,this.params.orderId=this.$Route.query.orderId,"-1"!=this.$Route.query.orderDetailIds?(this.params.refundType=1,this.refundReason(2)):(this.params.refundType=0,this.refundReason(1)),this.$Route.query.status?this.applyFofRefund({refundId:this.$Route.query.orderId}):this.applyFofRefund({orderId:this.$Route.query.orderId,orderDetailIds:[this.$Route.query.orderDetailIds]})}};t.default=u}).call(this,n("543d")["default"])},3855:function(e,t,n){"use strict";n.r(t);var a=n("ba2a"),r=n("bcd1");for(var s in r)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(s);n("929d");var u,o=n("f0c5"),d=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,"b1be92a8",null,!1,a["a"],u);t["default"]=d.exports},"892a":function(e,t,n){"use strict";(function(e){n("6cdc");a(n("66fd"));var t=a(n("3855"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"929d":function(e,t,n){"use strict";var a=n("942e"),r=n.n(a);r.a},"942e":function(e,t,n){},ba2a:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return a}));var a={uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"1c89"))}},r=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.params.refundType=1},e.e1=function(t){e.params.refundType=0},e.e2=function(t,n){var a=arguments[arguments.length-1].currentTarget.dataset,r=a.eventParams||a["event-params"];n=r.i;return e.params.refundImages.splice(n,1)},e.e3=function(t,n){var a=arguments[arguments.length-1].currentTarget.dataset,r=a.eventParams||a["event-params"];n=r.index;e.params.refundReasonCode=n})},s=[]},bcd1:function(e,t,n){"use strict";n.r(t);var a=n("33e4"),r=n.n(a);for(var s in a)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(s);t["default"]=r.a}},[["892a","common/runtime","common/vendor"]]]);