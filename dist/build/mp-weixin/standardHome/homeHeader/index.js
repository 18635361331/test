(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["standardHome/homeHeader/index"],{"40a9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("986b")),u=i(n("27f3")),o=i(n("40e4"));function i(t){return t&&t.__esModule?t:{default:t}}var s={props:["scrollNum","titleConfig"],mixins:[u.default],data:function(){return{imgBaseUrls:"",defaultWordsList:[],chooseIndex:0,unreadNum:""}},methods:{homeOpenKf:function(){this.zhuge.track("首页-导航栏-客服按钮"),this.openKefu()},goToSignIn:function(){this.zhuge.track("首页-导航栏-签到"),this.$Router.push({path:"/pages/signIn/index"})},goToNews:function(){this.zhuge.track("首页-导航栏-消息"),this.$Router.push({path:"/pages/news/index"})},unreadCount:function(){var e=this;t.getStorageSync("sessionId")&&o.default.unreadCount().then((function(n){200==n.data.code?e.unreadNum=n.data.data:t.showToast({title:n.data.message,icon:"none"})}))},defaultWords:function(){var e=this;a.default.defaultWords().then((function(n){200==n.data.code?e.defaultWordsList=n.data.data:t.showToast({title:n.data.message,icon:"none"})}))},goToSearch:function(){this.zhuge.track("首页-导航栏-搜索框"),this.$Router.push({path:"/pages/search/index",query:{searchValue:this.defaultWordsList[this.chooseIndex].value}})}},mounted:function(){this.imgBaseUrls=this.$config.imgBaseUrl}};e.default=s}).call(this,n("543d")["default"])},a105:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var u=function(){var t=this,e=t.$createElement;t._self._c},o=[]},a1bc:function(t,e,n){"use strict";var a=n("cdc4"),u=n.n(a);u.a},b4c7:function(t,e,n){"use strict";n.r(e);var a=n("40a9"),u=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=u.a},cdc4:function(t,e,n){},d7c2:function(t,e,n){"use strict";n.r(e);var a=n("a105"),u=n("b4c7");for(var o in u)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(o);n("a1bc");var i,s=n("f0c5"),r=Object(s["a"])(u["default"],a["b"],a["c"],!1,null,"6db6b7df",null,!1,a["a"],i);e["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'standardHome/homeHeader/index-create-component',
    {
        'standardHome/homeHeader/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d7c2"))
        })
    },
    [['standardHome/homeHeader/index-create-component']]
]);