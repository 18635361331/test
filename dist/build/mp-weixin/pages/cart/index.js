(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cart/index"],{"0b71":function(t,e,o){"use strict";var n=o("6814"),i=o.n(n);i.a},"0f10":function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return s})),o.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},s=[]},"4eb8":function(t,e,o){"use strict";(function(t){o("6cdc");n(o("66fd"));var e=n(o("e16e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"506f":function(t,e,o){"use strict";o.r(e);var n=o("72b4"),i=o.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},6814:function(t,e,o){},"72b4":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(o("1087")),i=(a(o("d084")),a(o("0d75"))),s=a(o("962d"));function a(t){return t&&t.__esModule?t:{default:t}}var r=function(){o.e("common/model/couponPopup").then(function(){return resolve(o("0571"))}.bind(null,o)).catch(o.oe)},c=function(){o.e("pages/cart/cartSku").then(function(){return resolve(o("5085"))}.bind(null,o)).catch(o.oe)},u={data:function(){return{titleTransparent:0,cartList:{unusefulGoods:[],activityGoods:[],shops:[]},options:{style:{width:"200rpx",height:"285rpx"}},chooseCart:{submitArr:[],price:0,selectAllFlag:!1},imgBaseUrls:"",editFlag:!1,chooseInfo:{},couponInfo:{},cateDecorateList:{},chooseSpec:"",cartIndex:{},memberType:t.getStorageSync("userInfo")?JSON.parse(t.getStorageSync("userInfo")).plusFlag:"",memberPriceInfo:{price:0,type:"",arriveType:"",choosePrice:""}}},methods:{getCarts:function(){var e=this;t.showLoading({title:"加载中..."}),n.default.getCarts().then((function(o){t.hideLoading(),200==o.data.code?(e.cartList=o.data.data,e.setSaleFieldValue(),e.judgeCartId(),e.judgeCartType()):t.showToast({title:o.data.message,icon:"none"})}))},judgeCartId:function(){for(var t in this.cartList)if("unusefulGoods"!=t)for(var e=0;e<this.cartList[t].length;e++)if(this.cartList[t][e].goodsList)for(var o=0;o<this.cartList[t][e].goodsList.length;o++)for(var n=0;n<this.chooseCart.submitArr.length;n++)this.chooseCart.submitArr[n]==this.cartList[t][e].goodsList[o].cartId&&(this.cartList[t][e].goodsList[o].chooseFlag,this.$set(this.cartList[t][e].goodsList[o],"chooseFlag",!0))},setSaleFieldValue:function(){for(var t in this.cartList)if("unusefulGoods"!=t)for(var e=0;e<this.cartList[t].length;e++)if(this.cartList[t][e].goodsList)for(var o=0;o<this.cartList[t][e].goodsList.length;o++)this.cartList[t][e].goodsList[o].saleFieldValue=this.compileSpec(this.cartList[t][e].goodsList[o].saleFieldValue)},compileSpec:function(t){var e="",o=t.split(",");for(var n in o)e+=o[n].split(":")[1]+" ";return e},goHome:function(){t.switchTab({url:"/pages/index/index"})},scroll:function(t){this.titleTransparent=t.detail.scrollTop/80},jian:function(t){1*t.num>1&&(t.num--,this.editCart(t),this.judgeCartType())},jia:function(t){1*t.num<1*t.storage&&(t.num++,this.editCart(t),this.judgeCartType())},goodsNumBlur:function(t){t.num?1*t.storage<1*t.num?this.$set(t,"num",parseInt(t.storage)):t.storage<1?this.$set(t,"num",1):this.$set(t,"num",parseInt(t.num)):this.$set(t,"num",1),this.editCart(t)},changeCart:function(t){this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k];var e=!0;for(var o in this.cartList[this.cartIndex.key]){var n=this.cartList[this.cartIndex.key][o].goodsList;for(var i in n)if(n[i].goodsId==t.goodsId){e=!1;n[i].num,t.num;i!=this.cartIndex.k&&this.cartList[this.cartIndex.key][o].goodsList.splice(this.cartIndex.k,1)}}e&&(this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].goodsId=t.goodsId,this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].num=t.num,this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].price=t.price,this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].saleFieldValue=t.saleFieldValue,this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].storage=t.storage,this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].goodsImg=t.goodsImg,this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].status=t.status),this.editCart(t)},editCart:function(e){var o=this,i={cartId:e.cartId,goodsId:e.goodsId,goodsPrice:e.price,num:e.num};n.default.editCart(i).then((function(e){200==e.data.code?o.judgeCartType():t.showToast({title:e.data.message,icon:"none"})}))},moveToFavorite:function(e,o){var i=this;n.default.moveToFavorite(e).then((function(e){200==e.data.code?(i.cartList.unusefulGoods.splice(o,1),t.showToast({title:"移入收藏夹成功，您可以到收藏夹查看",icon:"none"}),i.judgeCartType()):t.showToast({title:e.data.message,icon:"none"})}))},moveToFavorites:function(){var e=this;n.default.moveToFavorites(this.chooseCart.submitArr).then((function(o){200==o.data.code?e.getCarts():t.showToast({title:o.data.message,icon:"none"})}))},removeCarts:function(){for(var e=this,o=[],i=0;i<this.cartList.unusefulGoods.length;i++)o.push(this.cartList.unusefulGoods[i].cartId);n.default.removeCarts(o).then((function(o){200==o.data.code?e.cartList.unusefulGoods.splice(0):t.showToast({title:o.data.message,icon:"none"})}))},removeCartsBtm:function(){var e=this;n.default.removeCarts(this.chooseCart.submitArr).then((function(o){200==o.data.code?e.getCarts():t.showToast({title:o.data.message,icon:"none"})}))},removeGoods:function(e,o,i){var s=this;n.default.removeCarts([i.cartId]).then((function(n){if(200==n.data.code){var a=o.goodsList.findIndex((function(t){return i.cartId==t.cartId})),r=e.findIndex((function(t){return t.storeId==o.storeId})),c=s.chooseCart.submitArr.findIndex((function(t){return t==i.cartId}));"-1"!=c&&s.chooseCart.submitArr.splice(c,1),o.goodsList.splice(a,1),o.goodsList.length||e.splice(r,1),s.judgeCartType()}else t.showToast({title:n.data.message,icon:"none"})}))},getCartStoreCoupons:function(e){var o=this;e&&(this.chooseInfo=e),this.zhuge.track("购物车列表页-领券按钮"),i.default.getCartStoreCoupons(this.chooseInfo.storeId).then((function(e){if(200==e.data.code){for(var n=0;n<e.data.data.length;n++)e.data.data[n].flag=!1;o.couponInfo=e.data.data,o.$refs.couponPopup.open()}else t.showToast({title:e.data.message,icon:"none"})}))},closeCouponPopup:function(){this.$refs.couponPopup.close()},shopChooseChange:function(t){this.$set(t,"chooseFlag",!t.chooseFlag);for(var e=0;e<t.goodsList.length;e++)t.chooseFlag!=t.goodsList[e].chooseFlag&&this.$set(t.goodsList[e],"chooseFlag",!t.goodsList[e].chooseFlag);this.judgeCartType()},goodsChooseChange:function(t,e){this.$set(t,"chooseFlag",!t.chooseFlag),this.judgeCartType()},selectAll:function(){for(var t in this.chooseCart.selectAllFlag=!this.chooseCart.selectAllFlag,this.cartList)if("unusefulGoods"!=t)for(var e=0;e<this.cartList[t].length;e++){this.cartList[t][e].chooseFlag!=this.chooseCart.selectAllFlag&&this.$set(this.cartList[t][e],"chooseFlag",this.chooseCart.selectAllFlag);for(var o=0;o<this.cartList[t][e].goodsList.length;o++)this.$set(this.cartList[t][e].goodsList[o],"chooseFlag",this.chooseCart.selectAllFlag)}this.judgeCartType()},judgeCartType:function(){for(var t in this.chooseCart.submitArr.splice(0),this.chooseCart.selectAllFlag=!0,this.chooseCart.price=0,this.memberPriceInfo.choosePrice=0,this.cartList)if("unusefulGoods"!=t)for(var e=0;e<this.cartList[t].length;e++){if(this.cartList[t][e].chooseFlag=!0,this.cartList[t][e].goodsList)for(var o=0;o<this.cartList[t][e].goodsList.length;o++)this.cartList[t][e].goodsList[o].chooseFlag?(this.chooseCart.price+=this.cartList[t][e].goodsList[o].price*this.cartList[t][e].goodsList[o].num*1,0==this.cartList[t][e].goodsList[o].achievementFlag&&(this.memberPriceInfo.choosePrice+=this.cartList[t][e].goodsList[o].price*this.cartList[t][e].goodsList[o].num*1),this.chooseCart.submitArr.push(this.cartList[t][e].goodsList[o].cartId)):this.cartList[t][e].chooseFlag=!1;this.cartList[t][e].chooseFlag||(this.chooseCart.selectAllFlag=!1)}4!=this.memberType&&this.getMemberPriceInfo()},getMemberPriceInfo:function(){this.memberPriceInfo.arriveType="",this.memberPriceInfo.type="";try{var e=JSON.parse(t.getStorageSync("memberConfig")),o=JSON.parse(t.getStorageSync("userInfo")),n=0;if(o.plusFlag==e[e.length-1].type)return!1;for(var i=0;i<e.length;i++)e[i].type==o.plusFlag&&e[i].price>o.totalAmountDuring&&(n=e[i].price-o.totalAmountDuring);for(var s=1;s<e.length;s++){if(this.memberPriceInfo.choosePrice+o.totalAmountDuring+n<e[s].price)return this.memberPriceInfo.price=(e[s].price-this.memberPriceInfo.choosePrice-o.totalAmountDuring).toFixed(2),this.memberPriceInfo.type=e[s].name,!0;s>0&&0==n?(this.memberPriceInfo.arriveType=e[s].name,this.memberPriceInfo.type=e[s].name,this.memberPriceInfo.price=""):e[s].price-this.memberPriceInfo.choosePrice-o.totalAmountDuring<=0?(this.memberPriceInfo.arriveType=e[s].name,this.memberPriceInfo.price=""):(this.memberPriceInfo.price=(e[s].price-this.memberPriceInfo.choosePrice-o.totalAmountDuring).toFixed(2),this.memberPriceInfo.type=e[s].name)}}catch(a){}},gotoGoods:function(){this.$Router.push({path:"/pages/goodsList/index",query:{priceRangeLeft:this.memberPriceInfo.price}})},pageInit:function(){var e=this;this.chooseCart.submitArr.length?n.default.validSubmitCarts(this.chooseCart.submitArr).then((function(o){200==o.data.code?e.$Router.push({path:"/pages/settlement/index",query:{cartIds:e.chooseCart.submitArr.join(",")}}):t.showToast({title:o.data.message,icon:"none"})})):t.showToast({title:"请选择商品",icon:"none"})},goToShop:function(t){this.$Router.push({path:"/pages/shop/index",query:{storeId:t.storeId}})},goToGoodsDetail:function(t){this.$Router.push({path:"/pages/goodsDetails/index",query:{goodsId:t.itemId,skuId:t.goodsId}})},editClick:function(){this.zhuge.track("购物车列表页-编辑按钮"),this.editFlag=!this.editFlag},findCartGoods:function(t,e,o,n){var i=this;this.chooseSpec=t,this.cartIndex={key:e,j:o,k:n},this.$nextTick((function(){i.$refs.cartSku.findCartGoods()}))}},onShow:function(){this.zhuge.track("购物车页"),t.getStorageSync("userInfo")?(this.imgBaseUrls=this.$config.imgBaseUrl,this.getCarts()):this.$Router.replace({path:"/pages/login/index"})},components:{couponTemplate:r,renovation:s.default,cartSku:c}};e.default=u}).call(this,o("543d")["default"])},"922f":function(t,e,o){},9541:function(t,e,o){"use strict";var n=o("922f"),i=o.n(n);i.a},"962d":function(t,e,o){"use strict";o.r(e);var n=o("0f10"),i=o("aa53");for(var s in i)["default"].indexOf(s)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(s);o("9541");var a,r=o("f0c5"),c=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"45ad9771",null,!1,n["a"],a);e["default"]=c.exports},9820:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(o("1d88"));function i(t){return t&&t.__esModule?t:{default:t}}function s(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function a(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?s(Object(o),!0).forEach((function(e){r(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var c=function(){o.e("renovation/renovationMain/index").then(function(){return resolve(o("594e"))}.bind(null,o)).catch(o.oe)},u={props:["url"],data:function(){return{renovationInfo:{},scrollNum:0,pageInfo:{pageNo:1,sortNo:""}}},methods:{storeList:function(){var e=this;this.pageInfo.pageNo=1,t.showLoading({title:"加载中..."}),n.default.storeList({location:"h5",url:this.$Route.query.url?this.$Route.query.url:this.url}).then((function(o){if(t.hideLoading(),200==o.data.code){if(o.data.data.componentVos)for(var n=0;n<o.data.data.componentVos.length;n++)if(o.data.data.componentVos[n].content&&"NaN"!=o.data.data.componentVos[n].content&&(o.data.data.componentVos[n].content=JSON.parse(o.data.data.componentVos[n].content)),"twoColumnGoods"==o.data.data.componentVos[n].type)for(var i=0;i<o.data.data.componentVos[n].content.componentPageVO.componentVoList.length;i++)o.data.data.componentVos[n].content.componentPageVO.componentVoList[i].unpromotionMinPrice=o.data.data.componentVos[n].content.componentPageVO.componentVoList[i].marketPrice,o.data.data.componentVos[n].content.componentPageVO.componentVoList[i].minPrice=o.data.data.componentVos[n].content.componentPageVO.componentVoList[i].sellingPrice;e.renovationInfo=o.data.data;try{t.setNavigationBarTitle({title:e.renovationInfo.componentVos[0].content.titleName?e.renovationInfo.componentVos[0].content.titleName:e.renovationInfo.shareSubTitle}),e.zhuge.track("装修页面"+o.data.data.componentVos[0].content.titleName)}catch(s){}}else t.showToast({title:o.data.message,icon:"none"})}))},decorateList:function(){var e=this;n.default.decorateList(a({location:"h5",url:this.$Route.query.url?this.$Route.query.url:this.url},this.pageInfo)).then((function(o){200==o.data.code?o.data.data.componentVoList&&(e.renovationInfo.componentVos[e.renovationInfo.componentVos.length-1].content.componentPageVO.componentVoList=e.renovationInfo.componentVos[e.renovationInfo.componentVos.length-1].content.componentPageVO.componentVoList.concat(o.data.data.componentVoList)):t.showToast({title:o.data.message,icon:"none"})}))},judgeReachBottom:function(){var t=this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].content;this.pageInfo.sortNo=this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].sortNo,t&&t.componentPageVO&&t.componentPageVO.totalPageNum&&this.pageInfo.pageNo<t.componentPageVO.totalPageNum&&(this.pageInfo.pageNo++,this.decorateList())}},onPageScroll:function(t){this.scrollNum=t.scrollTop},onReachBottom:function(){this.judgeReachBottom()},mounted:function(){this.storeList()},components:{renovation:c}};e.default=u}).call(this,o("543d")["default"])},aa53:function(t,e,o){"use strict";o.r(e);var n=o("9820"),i=o.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},d772:function(t,e,o){},e16e:function(t,e,o){"use strict";o.r(e);var n=o("e57e"),i=o("506f");for(var s in i)["default"].indexOf(s)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(s);o("eb2d"),o("0b71");var a,r=o("f0c5"),c=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"584211d6",null,!1,n["a"],a);e["default"]=c.exports},e57e:function(t,e,o){"use strict";o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return s})),o.d(e,"a",(function(){return n}));var n={uniSwipeAction:function(){return o.e("components/uni-swipe-action/uni-swipe-action").then(o.bind(null,"0cc7"))},uniSwipeActionItem:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-swipe-action-item/uni-swipe-action-item")]).then(o.bind(null,"f1c2"))},uniPopup:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup")]).then(o.bind(null,"1c89"))}},i=function(){var t=this,e=t.$createElement,o=(t._self._c,t.__map(t.cartList,(function(e,o){var n=t.__get_orig(e),i="unusefulGoods"!=o?t.__map(e,(function(e,o){var n=t.__get_orig(e),i=t.__map(e.goodsList,(function(e,o){var n=t.__get_orig(e),i=e.saleFieldValue.replace(/(^\s+)|(\s+$)/g,"");return{$orig:n,g0:i}}));return{$orig:n,l0:i}})):null;return{$orig:n,l1:i}}))),n=(t.cartList.activityGoods.length||t.cartList.shops.length||t.cartList.unusefulGoods.length)&&!t.editFlag?t.chooseCart.price.toFixed(2):null;t.$mp.data=Object.assign({},{$root:{l2:o,g1:n}})},s=[]},eb2d:function(t,e,o){"use strict";var n=o("d772"),i=o.n(n);i.a}},[["4eb8","common/runtime","common/vendor"]]]);