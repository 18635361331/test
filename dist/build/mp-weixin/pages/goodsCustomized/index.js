(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsCustomized/index"],{1287:function(e,o,t){"use strict";var n=t("2168"),s=t.n(n);s.a},2168:function(e,o,t){},"546d":function(e,o,t){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=a(t("d084")),s=a(t("0086")),i=a(t("27f3"));function a(e){return e&&e.__esModule?e:{default:e}}var u=function(){t.e("pages/goodsCustomized/goodsBanner/index").then(function(){return resolve(t("ea30"))}.bind(null,t)).catch(t.oe)},d=function(){t.e("pages/goodsCustomized/cusAttr/index").then(function(){return resolve(t("6d2b"))}.bind(null,t)).catch(t.oe)},r=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsCustomized/shop/index")]).then(function(){return resolve(t("1d45"))}.bind(null,t)).catch(t.oe)},c=function(){t.e("pages/goodsCustomized/cusPrice/index").then(function(){return resolve(t("eed8"))}.bind(null,t)).catch(t.oe)},f=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsDetails/details")]).then(function(){return resolve(t("612e"))}.bind(null,t)).catch(t.oe)},l=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsCustomized/goodsPrice/index")]).then(function(){return resolve(t("b931"))}.bind(null,t)).catch(t.oe)},h=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsDetails/memberInterests")]).then(function(){return resolve(t("5e88"))}.bind(null,t)).catch(t.oe)},g={mixins:[s.default,i.default],data:function(){return{titleTransparent:0,chooseSpceData:{name:"",checkList:[],number:1,minOrderNum:1,price:null},operateFlag:!1,qiyuKefuGroupId:""}},methods:{getGoodsDetail:function(){var o=this;e.showLoading({title:"加载中..."}),n.default.cusGoodsDetails(this.goodsInfoId).then((function(t){e.hideLoading(),200==t.data.code?(t.data.data.videoInfo&&t.data.data.itemPictureDtos.unshift({isVideo:!0,name:t.data.data.videoInfo}),o.goodsInfo=t.data.data,o.isGetInfo=!0):e.showToast({title:t.data.message,icon:"none"})}))},goToMake:function(){return e.getStorageSync("sessionId")?this.chooseSpceData.skuId?void this.$Router.push({path:"/pages/customizationOrder/makeSure",query:{goodsId:this.chooseSpceData.skuId,goodsNum:this.chooseSpceData.number,qiyuKefuGroupId:this.qiyuKefuGroupId?this.qiyuKefuGroupId:""}}):(e.showToast({title:"请选择商品规格",icon:"none"}),void this.$refs.cusAttr.openSkuPopup()):(this.$Router.push({path:"/pages/login/index"}),!1)},updateSku:function(e){for(var o in e)this.$set(this.chooseSpceData,o,e[o])},UpdateGoodsInfo:function(e){for(var o in e)this.$set(this.goodsInfo,o,e[o])},goHome:function(){e.switchTab({url:"/pages/index/index"})},goMyPage:function(){e.switchTab({url:"/pages/my/index"})},setQiyuKefuGroupId:function(e){this.qiyuKefuGroupId=e}},onShow:function(){},onPageScroll:function(e){this.titleTransparent=e.scrollTop/200},onLoad:function(o){try{this.$Route.query.scene&&(this.goodsInfoId=decodeURIComponent(this.$Route.query.scene).split(",")[0],decodeURIComponent(this.$Route.query.scene).split(",")[1]&&e.setStorageSync("routerShareNumber",decodeURIComponent(this.$Route.query.scene).split(",")[1])),o&&o.scene&&(this.goodsInfoId=decodeURIComponent(o.scene).split(",")[0],decodeURIComponent(o.scene).split(",")[1]&&e.setStorageSync("routerShareNumber",decodeURIComponent(o.scene).split(",")[1])),o&&o.goodsId&&(this.goodsInfoId=o.goodsId),this.$Route.query.goodsId&&(this.goodsInfoId=this.$Route.query.goodsId),this.zhuge.track("商品详情页",{"商品id":this.goodsInfoId}),this.getGoodsDetail(),e.getStorageSync("sessionId")&&this.findGoodsFavorite()}catch(t){e.showToast({title:"系统错误",icon:"none"}),e.switchTab({url:"/pages/index/index"})}},onShareAppMessage:function(o){return{title:this.goodsInfo.name,path:"/pages/goodsCustomized/index?shareNumber="+(e.getStorageSync("shareNumber")?e.getStorageSync("shareNumber"):"")+"&goodsId="+this.goodsInfoId,imageUrl:this.$config.imgBaseUrl+this.goodsInfo.itemPictureDtos[0].name}},onShareTimeline:function(o){return{title:this.goodsInfo.name,path:"/pages/goodsCustomized/index?shareNumber="+(e.getStorageSync("shareNumber")?e.getStorageSync("shareNumber"):"")+"&goodsId="+this.goodsInfoId,imageUrl:this.$config.imgBaseUrl+this.goodsInfo.itemPictureDtos[0].name}},components:{goodsDetails:f,goodsBanner:u,shop:r,cusPrice:c,cusAttr:d,goodsPrice:l,memberInterests:h}};o.default=g}).call(this,t("543d")["default"])},"6a0c":function(e,o,t){"use strict";t.r(o);var n=t("546d"),s=t.n(n);for(var i in n)["default"].indexOf(i)<0&&function(e){t.d(o,e,(function(){return n[e]}))}(i);o["default"]=s.a},"7a00":function(e,o,t){"use strict";t.r(o);var n=t("e644"),s=t("6a0c");for(var i in s)["default"].indexOf(i)<0&&function(e){t.d(o,e,(function(){return s[e]}))}(i);t("1287");var a,u=t("f0c5"),d=Object(u["a"])(s["default"],n["b"],n["c"],!1,null,"981e1d2a",null,!1,n["a"],a);o["default"]=d.exports},8675:function(e,o,t){"use strict";(function(e){t("6cdc");n(t("66fd"));var o=n(t("7a00"));function n(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,t("543d")["createPage"])},e644:function(e,o,t){"use strict";var n;t.d(o,"b",(function(){return s})),t.d(o,"c",(function(){return i})),t.d(o,"a",(function(){return n}));var s=function(){var e=this,o=e.$createElement;e._self._c;e._isMounted||(e.e0=function(o){o.stopPropagation(),e.operateFlag=!e.operateFlag},e.e1=function(o){return e.$Router.push({path:"/pages/shop/index",query:{storeId:e.goodsInfo.belongStore}})},e.e2=function(o){e.isCollectionFlag?e.cancelGoodsFavorite():e.saveGoodsFavorite()})},i=[]}},[["8675","common/runtime","common/vendor"]]]);