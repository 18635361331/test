(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsDetails/index"],{"5db7":function(e,o,t){"use strict";(function(e){t("6cdc");n(t("66fd"));var o=n(t("9230"));function n(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,t("543d")["createPage"])},7649:function(e,o,t){"use strict";var n;t.d(o,"b",(function(){return s})),t.d(o,"c",(function(){return i})),t.d(o,"a",(function(){return n}));var s=function(){var e=this,o=e.$createElement;e._self._c;e._isMounted||(e.e0=function(o){e.operateFlag=!1},e.e1=function(o){e.isEvaluate?e.isEvaluate=!1:e.goBack(1)},e.e2=function(o){e.isCollectionFlag?e.cancelGoodsFavorite():e.saveGoodsFavorite()},e.e3=function(o){o.stopPropagation(),e.operateFlag=!e.operateFlag},e.e4=function(o){return e.$Router.push({path:"/pages/shop/index",query:{storeId:e.goodsInfo.belongStore}})},e.e5=function(o){e.isEvaluate=!0})},i=[]},8395:function(e,o,t){},9230:function(e,o,t){"use strict";t.r(o);var n=t("7649"),s=t("9cbf");for(var i in s)["default"].indexOf(i)<0&&function(e){t.d(o,e,(function(){return s[e]}))}(i);t("9a49");var a,r=t("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"14abfce8",null,!1,n["a"],a);o["default"]=c.exports},"9a49":function(e,o,t){"use strict";var n=t("8395"),s=t.n(n);s.a},"9cbf":function(e,o,t){"use strict";t.r(o);var n=t("a354"),s=t.n(n);for(var i in n)["default"].indexOf(i)<0&&function(e){t.d(o,e,(function(){return n[e]}))}(i);o["default"]=s.a},a354:function(e,o,t){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=c(t("d084")),s=c(t("92c6")),i=c(t("688c")),a=c(t("1087")),r=(c(t("627a")),c(t("69ae")),c(t("5315")),c(t("ff1f")),c(t("0086")));function c(e){return e&&e.__esModule?e:{default:e}}var d=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsDetails/goodsBanner")]).then(function(){return resolve(t("f890"))}.bind(null,t)).catch(t.oe)},u=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsDetails/coupon")]).then(function(){return resolve(t("db0c"))}.bind(null,t)).catch(t.oe)},l=function(){t.e("pages/goodsDetails/activity").then(function(){return resolve(t("945c"))}.bind(null,t)).catch(t.oe)},f=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsDetails/container")]).then(function(){return resolve(t("4e30"))}.bind(null,t)).catch(t.oe)},h=function(){t.e("pages/goodsDetails/evaluate").then(function(){return resolve(t("ee9a"))}.bind(null,t)).catch(t.oe)},g=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsDetails/shop")]).then(function(){return resolve(t("2fbf"))}.bind(null,t)).catch(t.oe)},m=function(){t.e("components/footNoMore/index").then(function(){return resolve(t("1fd4"))}.bind(null,t)).catch(t.oe)},p=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsDetails/details")]).then(function(){return resolve(t("612e"))}.bind(null,t)).catch(t.oe)},I=function(){Promise.all([t.e("common/vendor"),t.e("pages/goodsDetails/footOperate")]).then(function(){return resolve(t("dc76"))}.bind(null,t)).catch(t.oe)},S=function(){t.e("pages/goodsDetails/evaluateDetail").then(function(){return resolve(t("6463"))}.bind(null,t)).catch(t.oe)},v=function(){t.e("pages/goodsDetails/openBooking").then(function(){return resolve(t("09bc"))}.bind(null,t)).catch(t.oe)},y={mixins:[r.default],data:function(){return{titleChooseIndex:0,titleTransparent:0,scrollTopNum:"",operateFlag:!1,gobackFlag:!1,isEvaluate:!1,chooseSpceData:{name:"",checkList:[],number:1,price:null},singleProduct:{},reducePromotions:[],seckillInfo:{},increaseFlag:!0,memberInfo:e.getStorageSync("userInfo")?JSON.parse(e.getStorageSync("userInfo")):{}}},onShow:function(){this.increaseFlag=!0,this.memberInfo=e.getStorageSync("userInfo")?JSON.parse(e.getStorageSync("userInfo")):{},this.goodsInfoId&&Object.keys(this.goodsInfo).length&&(this.isGetInfo=!1,this.marketingSessionItemFlag(),this.getGoodsDetail(),e.getStorageSync("sessionId")&&this.findGoodsFavorite())},onLoad:function(o){try{this.$Route.query.scene&&(this.goodsInfoId=decodeURIComponent(this.$Route.query.scene).split(",")[0],decodeURIComponent(this.$Route.query.scene).split(",")[1]&&e.setStorageSync("routerShareNumber",decodeURIComponent(this.$Route.query.scene).split(",")[1])),o&&o.scene&&(this.goodsInfoId=decodeURIComponent(o.scene).split(",")[0],decodeURIComponent(o.scene).split(",")[1]&&e.setStorageSync("routerShareNumber",decodeURIComponent(o.scene).split(",")[1])),o&&o.goodsId&&(this.goodsInfoId=o.goodsId,o.shareNumber&&e.setStorageSync("routerShareNumber",o.shareNumber)),this.$Route.query.goodsId&&(this.goodsInfoId=this.$Route.query.goodsId,this.$Route.query.shareNumber&&e.setStorageSync("routerShareNumber",this.$Route.query.shareNumber)),this.zhuge.track("商品详情页",{"商品id":this.goodsInfoId}),this.marketingSessionItemFlag(),this.getGoodsDetail(),e.getStorageSync("sessionId")&&this.findGoodsFavorite()}catch(t){e.showToast({title:"系统错误",icon:"none"}),e.switchTab({url:"/pages/index/index"})}},methods:{getGoodsDetail:function(){var o=this;e.showLoading({title:"加载中..."}),n.default.getGoodsDetail(this.goodsInfoId).then((function(t){if(e.hideLoading(),200==t.data.code){var n=t.data.data;n.presaleInfo&&n.presaleFlag&&(n.presaleInfo.deliveryStart=o.getTime(n.presaleInfo.deliveryStartTime),t.data.data.presaleInfo.deliveryEnd=o.getTime(n.presaleInfo.deliveryEndTime),t.data.data.presaleInfo.presaleStart=o.getTime(n.presaleInfo.presaleStartTime),t.data.data.presaleInfo.presaleEnd=o.getTime(n.presaleInfo.presaleEndTime),t.data.data.presaleInfo.deliveryStartTime=o.$utils.formatDate(t.data.data.presaleInfo.deliveryStartTime,"yyyy年MM月dd日hh:mm"),t.data.data.presaleInfo.deliveryEndTime=o.$utils.formatDate(t.data.data.presaleInfo.deliveryEndTime,"yyyy年MM月dd日hh:mm")),t.data.data.videoInfo&&t.data.data.itemPictureDtos.unshift({isVideo:!0,name:t.data.data.videoInfo}),o.goodsInfo=t.data.data,o.isGetInfo=!0,o.memberInfo=e.getStorageSync("userInfo")?JSON.parse(e.getStorageSync("userInfo")):{},o.initReducePromotions(),o.$nextTick((function(){o.$Route.query.transferOrderId&&o.$refs.container.openSkuPopup()}))}else e.showToast({title:t.data.message,icon:"none"})}))},getTime:function(e){return{year:this.$utils.formatDate(e,"yyyy"),month:this.$utils.formatDate(e,"MM"),day:this.$utils.formatDate(e,"dd"),hours:this.$utils.formatDate(e,"hh:mm")}},initReducePromotions:function(){if(this.reducePromotions=[],this.goodsInfo.skuPromotionList)for(var e=0;e<this.goodsInfo.skuPromotionList.length;e++)for(var o=0;o<this.goodsInfo.skuPromotionList[e].reducePromotions.length;o++)this.judgeReduce(this.goodsInfo.skuPromotionList[e].reducePromotions[o])&&this.reducePromotions.push(this.goodsInfo.skuPromotionList[e].reducePromotions[o])},judgeReduce:function(e){for(var o=0;o<this.reducePromotions.length;o++)if(this.reducePromotions[o].id==e.id)return!1;return!0},initSingleProduct:function(){if(this.chooseSpceData.skuId){if(this.goodsInfo.skuPromotionList)for(var e=0;e<this.goodsInfo.skuPromotionList.length;e++)this.goodsInfo.skuPromotionList[e].skuId==this.chooseSpceData.skuId&&(this.singleProduct=this.goodsInfo.skuPromotionList[e])}else this.singleProduct={}},marketingSessionItemFlag:function(){var o=this;i.default.marketingSessionItemFlag(this.goodsInfoId).then((function(t){200==t.data.code?t.data.data?o.seckillInfo=t.data.data:o.seckillInfo={}:e.showToast({title:t.data.message,icon:"none"})}))},addCart:function(){if(this.addCartJudge()){var o={goodsId:this.chooseSpceData.skuId,goodsPrice:this.chooseSpceData.price,num:this.chooseSpceData.number};a.default.addCart(o).then((function(o){200==o.data.code?e.showToast({title:"添加购物车成功",icon:"none"}):e.showToast({title:o.data.message,icon:"none"})}))}},addCartJudge:function(){return e.getStorageSync("sessionId")?this.chooseSpceData.skuId?this.chooseSpceData.stockNumber<=0?(e.showToast({title:"该商品规格库存不足",icon:"none"}),!1):!(this.chooseSpceData.number>this.chooseSpceData.stockNumber)||(e.showToast({title:"选择的数量大于库存量",icon:"none"}),!1):(e.showToast({title:this.chooseSpceData.name,icon:"none"}),this.increaseFlag=!0,this.$refs.container.openSkuPopup(),!1):(this.$Router.push({path:"/pages/login/index"}),!1)},bugNow:function(){var o=this;if(this.addCartJudge()){var t="";t=22==this.goodsInfo.singlePromotionType&&(new Date).getTime()>=this.seckillInfo.marketingSessionStartTime?this.seckillInfo.marketingId:"";this.goodsInfo.singlePromotionType>50&&(this.goodsInfo.singlePromotionType,t=this.goodsInfo.promotionId),s.default.bugNow(this.chooseSpceData.skuId,this.chooseSpceData.number,this.$Route.query.transferOrderId?1:0).then((function(n){200==n.data.code?o.$Router.push({path:"/pages/settlement/index",query:{cartIds:o.chooseSpceData.skuId||"",goodsNum:o.chooseSpceData.number||"",singlePromotionId:t||"",newtype:o.goodsInfo.singlePromotionType||"",transferOrderId:o.$Route.query.transferOrderId||"",stockNumber:o.chooseSpceData.stockNumber}}):e.showToast({title:n.data.message,icon:"none"})}))}},increaseBuy:function(e){this.$set(this.$data,"increaseFlag",e),this.$refs.container.openSku()},changeIncreaseFlag:function(e){this.increaseFlag=e},updateSku:function(e){for(var o in e)this.$set(this.chooseSpceData,o,e[o]),this.initSingleProduct()},UpdateGoodsInfo:function(e){for(var o in e)this.$set(this.goodsInfo,o,e[o])},evaluateJump:function(o){var t=this,n=e.createSelectorQuery().select("."+o),s=e.createSelectorQuery().select(".goodsTitle");s.boundingClientRect((function(o){n.boundingClientRect((function(o){e.pageScrollTo({duration:0,scrollTop:o.top+t.scrollTopNum-40})})).exec()})).exec()},goHome:function(){e.switchTab({url:"/pages/index/index"})},goMyPage:function(){e.switchTab({url:"/pages/my/index"})}},onReachBottom:function(){this.isEvaluate&&this.$refs.evaluateDetails.getMoreComment()},beforeRouteLeave:function(e,o,t){t(),this.$refs.container.closeSkuPopup()},onPageScroll:function(o){var t=this;this.titleTransparent=o.scrollTop/200,this.scrollTopNum=o.scrollTop;var n=e.createSelectorQuery().selectAll(".Elevator"),s=40,i=e.createSelectorQuery().select(".goodsTitle");i.boundingClientRect((function(e){s=e.height})).exec(),n.boundingClientRect((function(e){for(var n=0;n<e.length;n++)e[n].top+o.scrollTop-s<=o.scrollTop&&(t.titleChooseIndex=n)})).exec()},onShareAppMessage:function(o){return{title:this.goodsInfo.name,path:"/pages/goodsDetails/index?shareNumber="+(e.getStorageSync("shareNumber")?e.getStorageSync("shareNumber"):"")+"&goodsId="+this.goodsInfoId,imageUrl:this.$config.imgBaseUrl+this.goodsInfo.itemPictureDtos[0].name}},onShareTimeline:function(o){return{title:this.goodsInfo.name,path:"/pages/goodsDetails/index?shareNumber="+(e.getStorageSync("shareNumber")?e.getStorageSync("shareNumber"):"")+"&goodsId="+this.goodsInfoId,imageUrl:this.$config.imgBaseUrl+this.goodsInfo.itemPictureDtos[0].name}},components:{goodsBanner:d,coupon:u,activity:l,goodsDetails:p,shop:g,footNoMore:m,evaluate:h,footOperate:I,evaluateDetail:S,container:f,openBooking:v}};o.default=y}).call(this,t("543d")["default"])}},[["5db7","common/runtime","common/vendor"]]]);