(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/bindAccount/index"],{2956:function(n,t,e){"use strict";(function(n){e("6cdc");o(e("66fd"));var t=o(e("2c11"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"2c11":function(n,t,e){"use strict";e.r(t);var o=e("89fd"),a=e("3070");for(var i in a)["default"].indexOf(i)<0&&function(n){e.d(t,n,(function(){return a[n]}))}(i);e("fa4d");var c,u=e("f0c5"),d=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,"489da177",null,!1,o["a"],c);t["default"]=d.exports},3070:function(n,t,e){"use strict";e.r(t);var o=e("97f3"),a=e.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){e.d(t,n,(function(){return o[n]}))}(i);t["default"]=a.a},6056:function(n,t,e){},"89fd":function(n,t,e){"use strict";var o;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return o}));var a=function(){var n=this,t=n.$createElement;n._self._c},i=[]},"97f3":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(e("5315")),a=i(e("081b"));function i(n){return n&&n.__esModule?n:{default:n}}var c=function(){e.e("common/model/wxLogin/index").then(function(){return resolve(e("3095"))}.bind(null,e)).catch(e.oe)},u={data:function(){return{accountInfo:{},authorizeFlag:!1,isWxFlag:!1,wxCode:"",defaultTitleDto:{title:"绑定账号",bottomColor:"#e6e6e6"}}},methods:{account:function(){var t=this;o.default.account().then((function(e){200==e.data.code?(t.accountInfo=e.data.data,!t.accountInfo.bindWx&&t.wxCode?t.wechatH5Bind():t.accountInfo.bindWx&&t.wxCode&&t.wechatMiniUnBind()):n.showToast({title:e.data.message,icon:"none"})}))},getUserInfo:function(t){var e=this;n.login({success:function(n){var o={encryptedData:t.encryptedData,iv:t.iv,code:n.code};e.wechatMiniBind(o)}})},wechatMiniBind:function(t){var e=this;o.default.wechatMiniBind(t).then((function(t){200==t.data.code?(n.showToast({title:"绑定成功",icon:"none"}),e.account()):n.showToast({title:t.data.message,icon:"none"})}))},wechatMiniUnBind:function(){var t=this;o.default.wechatMiniUnBind().then((function(e){200==e.data.code?(n.showToast({title:"解绑成功",icon:"none"}),t.account()):n.showToast({title:e.data.message,icon:"none"})}))},getCode:function(){a.default.wxPubAppId().then((function(t){if(200==t.data.code){var e="https://"+location.host+location.pathname;location.href=location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+t.data.data+"&redirect_uri="+encodeURIComponent(e)+"&response_type=code&scope=snsapi_userinfo"}else n.showToast({title:t.data.message,icon:"none"})}))},wechatH5Bind:function(){var t=this;o.default.wechatH5Bind(this.wxCode).then((function(e){200==e.data.code?(n.showToast({title:"绑定成功",icon:"none"}),t.wxCode="",t.account()):n.showToast({title:e.data.message,icon:"none"})}))},wechatH5Unbind:function(){var t=this;o.default.wechatH5Unbind().then((function(e){200==e.data.code?(n.showToast({title:"解绑成功",icon:"none"}),t.wxCode="",t.account()):n.showToast({title:e.data.message,icon:"none"})}))},goToBindTel:function(){this.$Router.push({path:"/pages/changeCellPhone/index",query:{tel:this.accountInfo.telephone}})}},onShow:function(){this.zhuge.track("绑定账号"),n.getStorageSync("sessionId")?this.account():this.$Router.push({path:"/pages/login/index"})},onLoad:function(n){n.code&&(this.wxCode=n.code)},components:{wxLogin:c}};t.default=u}).call(this,e("543d")["default"])},fa4d:function(n,t,e){"use strict";var o=e("6056"),a=e.n(o);a.a}},[["2956","common/runtime","common/vendor"]]]);