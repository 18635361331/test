(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/customizationOrder/makeSure"],{"102f":function(e,o,t){},"24b5":function(e,o,t){"use strict";t.r(o);var r=t("9dc3"),s=t("7286");for(var n in s)["default"].indexOf(n)<0&&function(e){t.d(o,e,(function(){return s[e]}))}(n);t("9649");var a,d=t("f0c5"),u=Object(d["a"])(s["default"],r["b"],r["c"],!1,null,"c095643a",null,!1,r["a"],a);o["default"]=u.exports},"43d6":function(e,o,t){"use strict";(function(e){t("6cdc");r(t("66fd"));var o=r(t("24b5"));function r(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,t("543d")["createPage"])},7286:function(e,o,t){"use strict";t.r(o);var r=t("79b6"),s=t.n(r);for(var n in r)["default"].indexOf(n)<0&&function(e){t.d(o,e,(function(){return r[e]}))}(n);o["default"]=s.a},"79b6":function(e,o,t){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var r=s(t("1087"));function s(e){return e&&e.__esModule?e:{default:e}}var n=function(){Promise.all([t.e("common/vendor"),t.e("pages/customizationOrder/orderInfo")]).then(function(){return resolve(t("9c1e"))}.bind(null,t)).catch(t.oe)},a={data:function(){return{defaultTitleDto:{title:"确认订单"},orderInfoParams:"",memberType:e.getStorageSync("userInfo")?JSON.parse(e.getStorageSync("userInfo")).plusFlag:""}},onShow:function(){this.cusPageInit()},methods:{cusPageInit:function(){var o=this,t=e.getStorageSync("addressInfo")?JSON.parse(e.getStorageSync("addressInfo")):"";r.default.cusPageInit({goodsId:this.$Route.query.goodsId,addressId:t.id,goodsNum:this.$Route.query.goodsNum}).then((function(t){200==t.data.code?o.orderInfoParams=t.data.data:e.showToast({title:t.data.message,icon:"none"})}))},goToPay:function(){var o=this;if(this.orderInfoParams.address&&this.orderInfoParams.address.id){for(var t={addressId:this.orderInfoParams.address.id,storeOrderList:[]},s=0;s<this.orderInfoParams.stores.length;s++){t.storeOrderList.push({remark:this.orderInfoParams.stores[s].remark,goodsList:[]});for(var n=0;n<this.orderInfoParams.stores[s].goodsList.length;n++)t.storeOrderList[s].goodsList.push({goodsId:this.orderInfoParams.stores[s].goodsList[n].goodsId,goodsNum:this.orderInfoParams.stores[s].goodsList[n].goodsNum})}r.default.submitCusOrder(t).then((function(t){200==t.data.code?(e.showToast({title:"提交成功",icon:"none"}),o.$Router.replace({path:"/pages/customizationOrder/paySuccess",query:{qiyuKefuGroupId:o.$Route.query.qiyuKefuGroupId}})):e.showToast({title:t.data.message,icon:"none"})}))}else e.showToast({title:"请选择下单地址",icon:"none"})}},beforeRouteLeave:function(o,t,r){e.removeStorageSync("addressInfo"),r()},components:{orderInfo:n}};o.default=a}).call(this,t("543d")["default"])},9649:function(e,o,t){"use strict";var r=t("102f"),s=t.n(r);s.a},"9dc3":function(e,o,t){"use strict";var r;t.d(o,"b",(function(){return s})),t.d(o,"c",(function(){return n})),t.d(o,"a",(function(){return r}));var s=function(){var e=this,o=e.$createElement;e._self._c;e._isMounted||(e.e0=function(o){return e.$Router.push({path:"/pages/address/index",query:{id:e.orderInfoParams.address.id}})},e.e1=function(o){return e.$Router.push({path:"/pages/createAddress/index"})})},n=[]}},[["43d6","common/runtime","common/vendor"]]]);