(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["standardHome/newUser/index"],{"0646":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(t("92c6")),a=r(t("1d88")),i=r(t("d591"));function r(n){return n&&n.__esModule?n:{default:n}}var s=function(){Promise.all([t.e("common/vendor"),t.e("renovation/singleCoupon/index")]).then(function(){return resolve(t("6441"))}.bind(null,t)).catch(t.oe)},u=function(){t.e("common/model/roll/index").then(function(){return resolve(t("e0ef"))}.bind(null,t)).catch(t.oe)},d={mixins:[i.default],data:function(){return{list:[],newUserInfo:"",imgBaseUrls:"",oneColumnCoupon:""}},methods:{newPersonOrderTips:function(){var e=this;o.default.newPersonOrderTips().then((function(t){200==t.data.code?e.list=t.data.data:n.showToast({title:t.data.message,icon:"none"})}))},newPersonInfo:function(){var e=this;o.default.newPersonInfo().then((function(t){200==t.data.code?(e.newUserInfo=t.data.data,e.getCouponInfo()):n.showToast({title:t.data.message,icon:"none"})}))},getCouponInfo:function(){var e=this;a.default.storeList({location:"h5",url:"xinrenzhuanxiang"}).then((function(t){if(200==t.data.code)for(var o=0;o<t.data.data.componentVos.length;o++)"oneColumnCoupon"==t.data.data.componentVos[o].type&&(t.data.data.componentVos[o].content=JSON.parse(t.data.data.componentVos[o].content),e.oneColumnCoupon=t.data.data.componentVos[o].content);else n.showToast({title:t.data.message,icon:"none"})}))},goToNewUser:function(){this.zhuge.track("首页-新版-新人专享入口"),this.$Router.push({path:"/pages/newUser/index"})}},mounted:function(){this.newPersonOrderTips(),this.newPersonInfo(),this.imgBaseUrls=this.$config.imgBaseUrl},components:{roll:u,singleCoupon:s}};e.default=d}).call(this,t("543d")["default"])},"5e4d":function(n,e,t){"use strict";var o;t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){return o}));var a=function(){var n=this,e=n.$createElement;n._self._c},i=[]},"6f3e":function(n,e,t){},e34d:function(n,e,t){"use strict";var o=t("6f3e"),a=t.n(o);a.a},e93e:function(n,e,t){"use strict";t.r(e);var o=t("5e4d"),a=t("fa4e");for(var i in a)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return a[n]}))}(i);t("e34d");var r,s=t("f0c5"),u=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"74d389b0",null,!1,o["a"],r);e["default"]=u.exports},fa4e:function(n,e,t){"use strict";t.r(e);var o=t("0646"),a=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'standardHome/newUser/index-create-component',
    {
        'standardHome/newUser/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e93e"))
        })
    },
    [['standardHome/newUser/index-create-component']]
]);
