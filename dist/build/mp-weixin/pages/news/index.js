(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/news/index"],{1377:function(t,e,a){"use strict";(function(t){a("6cdc");n(a("66fd"));var e=n(a("9768"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},2751:function(t,e,a){"use strict";a.r(e);var n=a("b0bb"),s=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=s.a},"3f33":function(t,e,a){"use strict";a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var n={uniSwipeAction:function(){return a.e("components/uni-swipe-action/uni-swipe-action").then(a.bind(null,"0cc7"))},uniSwipeActionItem:function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-swipe-action-item/uni-swipe-action-item")]).then(a.bind(null,"f1c2"))}},s=function(){var t=this,e=t.$createElement,a=(t._self._c,t.__map(t.msgModuleList,(function(e,a){var n=t.__get_orig(e),s=a<3&&e.flag&&e.lastMsgTime?t.$utils.formatDate(e.lastMsgTime,"yyyy-MM-dd"):null;return{$orig:n,g0:s}})));t.$mp.data=Object.assign({},{$root:{l0:a}})},i=[]},4630:function(t,e,a){},9768:function(t,e,a){"use strict";a.r(e);var n=a("3f33"),s=a("2751");for(var i in s)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return s[t]}))}(i);a("b2d6");var o,l=a("f0c5"),u=Object(l["a"])(s["default"],n["b"],n["c"],!1,null,"26e33af9",null,!1,n["a"],o);e["default"]=u.exports},b0bb:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(a("40e4"));function s(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{msgModuleList:[{name:"优惠促销",latestMsg:"",image:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/p-icon.png",path:"/pages/messagePromotion/index",flag:!1},{name:"系统通知",latestMsg:"",image:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/s-icon.png",path:"/pages/systemNotice/index",flag:!1},{name:"交易物流",latestMsg:"",image:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/l-icon.png",path:"/pages/messageLogistics/index",flag:!1},{name:"互动消息",latestMsg:"",image:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/n-icon.png",path:"/pages/systemNotice/index",flag:!1}],options:{style:{width:"200rpx",height:"285rpx"}},imgBaseUrls:""}},methods:{allMsg:function(){var e=this;n.default.allMsg().then((function(a){if(200==a.data.code){for(var n=0;n<e.msgModuleList.length;n++)e.msgModuleList[n].flag=!1;for(var s=0;s<a.data.data.length;s++)for(var i in a.data.data[s])e.$set(e.msgModuleList[a.data.data[s].msgModule-1],i,a.data.data[s][i]),e.$set(e.msgModuleList[a.data.data[s].msgModule-1],"flag",!0)}else t.showToast({title:a.data.message,icon:"none"})}))},readAllMsg:function(){var e=this;n.default.readAllMsg().then((function(a){200==a.data.code?e.allMsg():t.showToast({title:a.data.message,icon:"none"})}))},goToPage:function(t){this.$Router.push({path:t.path})},removeModule:function(e){var a=this;n.default.removeModule(e).then((function(e){200==e.data.code?a.allMsg():t.showToast({title:e.data.message,icon:"none"})}))}},onShow:function(){this.zhuge.track("消息落地页"),this.imgBaseUrls=this.$config.imgBaseUrl,this.allMsg()}};e.default=i}).call(this,a("543d")["default"])},b2d6:function(t,e,a){"use strict";var n=a("4630"),s=a.n(n);s.a}},[["1377","common/runtime","common/vendor"]]]);