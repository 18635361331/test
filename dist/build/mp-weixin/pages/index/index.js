(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0f10":function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"155b":function(t,e,o){},6502:function(t,e,o){"use strict";var n=o("155b"),i=o.n(n);i.a},8069:function(t,e,o){"use strict";o.r(e);var n=o("da67"),i=o.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},"922f":function(t,e,o){},9541:function(t,e,o){"use strict";var n=o("922f"),i=o.n(n);i.a},"962d":function(t,e,o){"use strict";o.r(e);var n=o("0f10"),i=o("aa53");for(var a in i)["default"].indexOf(a)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("9541");var r,s=o("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"45ad9771",null,!1,n["a"],r);e["default"]=c.exports},9820:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(o("1d88"));function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function r(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?a(Object(o),!0).forEach((function(e){s(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function s(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var c=function(){o.e("renovation/renovationMain/index").then(function(){return resolve(o("594e"))}.bind(null,o)).catch(o.oe)},f={props:["url"],data:function(){return{renovationInfo:{},scrollNum:0,pageInfo:{pageNo:1,sortNo:""}}},methods:{storeList:function(){var e=this;this.pageInfo.pageNo=1,t.showLoading({title:"加载中..."}),n.default.storeList({location:"h5",url:this.$Route.query.url?this.$Route.query.url:this.url}).then((function(o){if(t.hideLoading(),200==o.data.code){if(o.data.data.componentVos)for(var n=0;n<o.data.data.componentVos.length;n++)if(o.data.data.componentVos[n].content&&"NaN"!=o.data.data.componentVos[n].content&&(o.data.data.componentVos[n].content=JSON.parse(o.data.data.componentVos[n].content)),"twoColumnGoods"==o.data.data.componentVos[n].type)for(var i=0;i<o.data.data.componentVos[n].content.componentPageVO.componentVoList.length;i++)o.data.data.componentVos[n].content.componentPageVO.componentVoList[i].unpromotionMinPrice=o.data.data.componentVos[n].content.componentPageVO.componentVoList[i].marketPrice,o.data.data.componentVos[n].content.componentPageVO.componentVoList[i].minPrice=o.data.data.componentVos[n].content.componentPageVO.componentVoList[i].sellingPrice;e.renovationInfo=o.data.data;try{t.setNavigationBarTitle({title:e.renovationInfo.componentVos[0].content.titleName?e.renovationInfo.componentVos[0].content.titleName:e.renovationInfo.shareSubTitle}),e.zhuge.track("装修页面"+o.data.data.componentVos[0].content.titleName)}catch(a){}}else t.showToast({title:o.data.message,icon:"none"})}))},decorateList:function(){var e=this;n.default.decorateList(r({location:"h5",url:this.$Route.query.url?this.$Route.query.url:this.url},this.pageInfo)).then((function(o){200==o.data.code?o.data.data.componentVoList&&(e.renovationInfo.componentVos[e.renovationInfo.componentVos.length-1].content.componentPageVO.componentVoList=e.renovationInfo.componentVos[e.renovationInfo.componentVos.length-1].content.componentPageVO.componentVoList.concat(o.data.data.componentVoList)):t.showToast({title:o.data.message,icon:"none"})}))},judgeReachBottom:function(){var t=this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].content;this.pageInfo.sortNo=this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].sortNo,t&&t.componentPageVO&&t.componentPageVO.totalPageNum&&this.pageInfo.pageNo<t.componentPageVO.totalPageNum&&(this.pageInfo.pageNo++,this.decorateList())}},onPageScroll:function(t){this.scrollNum=t.scrollTop},onReachBottom:function(){this.judgeReachBottom()},mounted:function(){this.storeList()},components:{renovation:c}};e.default=f}).call(this,o("543d")["default"])},aa53:function(t,e,o){"use strict";o.r(e);var n=o("9820"),i=o.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},c210:function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},d537:function(t,e,o){"use strict";(function(t){o("6cdc");n(o("66fd"));var e=n(o("f75a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},da67:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(o("1d88")),i=a(o("962d"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function s(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?r(Object(o),!0).forEach((function(e){c(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function c(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var f=function(){Promise.all([o.e("common/vendor"),o.e("standardHome/homeHeader/index")]).then(function(){return resolve(o("d7c2"))}.bind(null,o)).catch(o.oe)},l=function(){Promise.all([o.e("common/vendor"),o.e("standardHome/homeTitleTab/index")]).then(function(){return resolve(o("1e09"))}.bind(null,o)).catch(o.oe)},u=function(){o.e("renovation/renovationMain/index").then(function(){return resolve(o("594e"))}.bind(null,o)).catch(o.oe)},p=function(){o.e("standardHome/homeBtmTab/index").then(function(){return resolve(o("2b85"))}.bind(null,o)).catch(o.oe)},m=function(){Promise.all([o.e("common/vendor"),o.e("standardHome/homePopup/index")]).then(function(){return resolve(o("beab"))}.bind(null,o)).catch(o.oe)},h={data:function(){return{scrollNum:0,homeInfo:"",titleNav:"",boutique:"",webViewInfo:{title:"首页"},pageInfo:{pageNo:1,sortNo:""},updateData:!0,swiperIndex:"0",swiperHeight:0,imageConfig:"",titleConfig:"",titleConfigTempalte:{kfDefaultImage:"appletsImages/kefu-bai.png",kfCeilingImage:"appletsImages/kefu.png",siginDefaultImage:"appletsImages/sign.gif",siginCeilingImage:"appletsImages/sign.gif",messageDefaultImage:"appletsImages/msg-bai.png",messageCeilingImage:"appletsImages/msg.png",title:{type:"0",defaultColorConfig:["#FF1558"],ceilingColorConfig:"#fff",imageConfig:""},swiper:{type:"0",colorConfig:["#FF1558"],imageConfig:""}},imgBaseUrls:"",plusFlag:""}},onShow:function(){var e=this,o=t.getStorageSync("userInfo")?JSON.parse(t.getStorageSync("userInfo")).plusFlag:"";if(this.imgBaseUrls=this.$config.imgBaseUrl,"首页"==this.webViewInfo.title&&this.homeInfo)try{this.$refs.renovation.updateNewuser(),this.$refs.renovation.updateActivitys()}catch(n){}this.plusFlag!=o&&(this.plusFlag=o,"首页"==this.webViewInfo.title?this.$nextTick((function(){try{e.$refs.renovation.updateGoods(),e.boutique&&e.$refs.homeBtmTab.updateGoods()}catch(n){}})):(this.updateData=!1,this.$nextTick((function(){e.updateData=!0}))))},onLoad:function(){t.pageScrollTo({scrollTop:0,duration:0}),this.getHomeInfo()},onHide:function(){"首页"==this.webViewInfo.title&&this.$refs.renovation.clearInters()},methods:{getHomeInfo:function(){var e=this;n.default.storeList({location:"h5",url:"shouyezhuangxiu"}).then((function(o){if(e.plusFlag=t.getStorageSync("userInfo")?JSON.parse(t.getStorageSync("userInfo")).plusFlag:"",200==o.data.code){if(o.data.data.componentVos){for(var n=0,i=o.data.data.componentVos,a=0;a<i.length;a++){if(i[a].content&&"NaN"!=i[a].content&&(i[a].content=JSON.parse(i[a].content)),"twoColumnGoods"==i[a].type)for(var r=0;r<i[a].content.componentPageVO.componentVoList.length;r++)i[a].content.componentPageVO.componentVoList[r].unpromotionMinPrice=i[a].content.componentPageVO.componentVoList[r].marketPrice,i[a].content.componentPageVO.componentVoList[r].minPrice=i[a].content.componentPageVO.componentVoList[r].sellingPrice;if("titleConfig"==i[a].type||"titleNav"==i[a].type||"boutique"==i[a].type||"titleTpl"==i[a].type){try{e.$data[i[a].type]=i[a].content}catch(s){}"titleNav"==i[a].type&&e.$data[i[a].type].labels.unshift({title:"首页"}),"titleConfig"==i[a].type&&(n+=1,e.$nextTick((function(){e.titleConfigJudge()}))),i.splice(a,1),a--}}n||(e.titleConfig=e.titleConfigTempalte),e.homeInfo=o.data.data,e.getHomeOther()}}else t.showToast({title:o.data.message,icon:"none"})}))},setWebView:function(e){var o=this;if(e.title!=this.webViewInfo.title){this.pageInfo.pageNo=1;var n="";e.linkValue&&(n=e.linkValue.split("/")),e.linkValue=e.linkValue?n[n.length-1]:"",this.webViewInfo=e,"首页"==e.title?(t.setNavigationBarTitle({title:"首页"}),this.getHomeInfo()):"首页"==this.webViewInfo.title?this.$refs.renovation.clearInters():(this.updateData=!1,this.$nextTick((function(){o.updateData=!0}))),t.pageScrollTo({scrollTop:0,duration:0})}},swiperChange:function(t,e){"carousel"==this.homeInfo.componentVos[0].type||"carousel"==this.homeInfo.componentVos[1].type&&"backToTop"==this.homeInfo.componentVos[0].type?(this.swiperIndex=t>this.titleConfig.swiper.colorConfig.length-1?this.titleConfig.swiper.colorConfig.length-1:t,this.swiperHeight=e):this.swiperHeight=0},titleConfigJudge:function(){0==this.titleConfig.title.type&&0==this.titleConfig.swiper.type?this.titleConfig.title.defaultColorConfig.length!=this.titleConfig.swiper.colorConfig.length&&(this.titleConfig.swiper.colorConfig=this.titleConfig.title.defaultColorConfig):0==this.titleConfig.title.type&&1==this.titleConfig.swiper.type&&(this.titleConfig.title.defaultColorConfig=this.titleConfig.title.defaultColorConfig[0])},getHomeOther:function(){var t=this;this.$nextTick((function(){t.$refs.homeHear.defaultWords(),t.$refs.homeHear.unreadCount(),t.boutique&&t.$refs.homeBtmTab&&t.$refs.homeBtmTab.getLabelItems()}))},judgeReachBottom:function(){var t=this.homeInfo.componentVos[this.homeInfo.componentVos.length-1].content;this.pageInfo.sortNo=this.homeInfo.componentVos[this.homeInfo.componentVos.length-1].sortNo,t&&t.componentPageVO&&t.componentPageVO.totalPageNum&&this.pageInfo.pageNo<t.componentPageVO.totalPageNum&&(this.pageInfo.pageNo++,this.decorateList())},decorateList:function(){var e=this;n.default.decorateList(s({location:"h5",url:"shouyezhuangxiu"},this.pageInfo)).then((function(o){200==o.data.code?o.data.data.componentVoList&&(e.homeInfo.componentVos[e.homeInfo.componentVos.length-1].content.componentPageVO.componentVoList=e.homeInfo.componentVos[e.homeInfo.componentVos.length-1].content.componentPageVO.componentVoList.concat(o.data.data.componentVoList)):t.showToast({title:o.data.message,icon:"none"})}))}},onPageScroll:function(t){this.scrollNum=t.scrollTop},onReachBottom:function(t){"首页"==this.webViewInfo.title?this.boutique?this.$refs.homeBtmTab.getNextPageGoods():this.homeInfo&&this.judgeReachBottom():this.$refs.renovationHome.judgeReachBottom()},onPullDownRefresh:function(e){var o=this;this.pageInfo.pageNo=1,"首页"==this.webViewInfo.title?this.$nextTick((function(){o.$refs.renovation.updateNewuser(),o.$refs.renovation.clearInters(),o.$refs.renovation.updateActivitys(),o.getHomeInfo()})):this.$refs.renovationHome.storeList(),setTimeout((function(){t.stopPullDownRefresh(),t.showToast({title:"更新成功",icon:"none"})}),1e3)},components:{homeHear:f,homeTitleTab:l,homeBtmTab:p,homeIndexRenova:i.default,renovation:u,homePopup:m}};e.default=h}).call(this,o("543d")["default"])},f75a:function(t,e,o){"use strict";o.r(e);var n=o("c210"),i=o("8069");for(var a in i)["default"].indexOf(a)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("6502");var r,s=o("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"137f1def",null,!1,n["a"],r);e["default"]=c.exports}},[["d537","common/runtime","common/vendor"]]]);