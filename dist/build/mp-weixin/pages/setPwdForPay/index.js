(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setPwdForPay/index"],{"056d":function(t,n,a){},"5ca3":function(t,n,a){"use strict";var e=a("056d"),o=a.n(e);o.a},9616:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=o(a("5315"));o(a("a057"));function o(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{userInfo:{},countdown:{inter:"",count:0},params:{captcha:"",telephone:"",type:6},nextFlag:0,operateCode:"",payPwd:"",aginPayPwd:""}},onShow:function(){this.zhuge.track("忘记支付密码-落地页"),this.account()},methods:{account:function(){var n=this;e.default.account().then((function(a){200==a.data.code?(n.userInfo=a.data.data,n.params.telephone=a.data.data.telephone):t.showToast({title:a.data.message,icon:"none"})}))},captcha:function(){this.countDownTime(),e.default.captcha({telephone:this.params.telephone,type:this.params.type}).then((function(n){200==n.data.code||t.showToast({title:n.data.message,icon:"none"})}))},countDownTime:function(){var t=this;this.countdown.count=60,this.countdown.inter=setInterval((function(){t.countdown.count--,t.countdown.count||clearInterval(t.countdown.inter)}),1e3)},verifyCaptcha:function(){var n=this;this.params.captcha?e.default.verifyCaptcha(this.params).then((function(a){200==a.data.code?(n.nextFlag=1,n.operateCode=a.data.data):t.showToast({title:a.data.message,icon:"none"})})):t.showToast({title:"验证码不能为空!",icon:"none"})},valPayPwd:function(){this.payPwd.length>=6&&(this.nextFlag=2)},aginPayPwdChange:function(){this.aginPayPwd.length>=6&&this.aginPayPwd!=this.payPwd&&(this.nextFlag=1,t.showToast({title:"两次密码输入不一致，请重新设置",icon:"none"}),this.payPwd="",this.aginPayPwd="")},resetPayPwd:function(){var n=this;e.default.resetPayPwd({operateCode:this.operateCode,payPassword:this.payPwd}).then((function(a){200==a.data.code?(t.showToast({title:"密码重置成功",icon:"none"}),n.goBack(1)):t.showToast({title:a.data.message,icon:"none"})}))}}};n.default=c}).call(this,a("543d")["default"])},ae47:function(t,n,a){"use strict";(function(t){a("6cdc");e(a("66fd"));var n=e(a("cfa8"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,a("543d")["createPage"])},babe:function(t,n,a){"use strict";a.r(n);var e=a("9616"),o=a.n(e);for(var c in e)["default"].indexOf(c)<0&&function(t){a.d(n,t,(function(){return e[t]}))}(c);n["default"]=o.a},cfa8:function(t,n,a){"use strict";a.r(n);var e=a("f2db"),o=a("babe");for(var c in o)["default"].indexOf(c)<0&&function(t){a.d(n,t,(function(){return o[t]}))}(c);a("5ca3");var i,u=a("f0c5"),s=Object(u["a"])(o["default"],e["b"],e["c"],!1,null,"6f74ef8c",null,!1,e["a"],i);n["default"]=s.exports},f2db:function(t,n,a){"use strict";var e;a.d(n,"b",(function(){return o})),a.d(n,"c",(function(){return c})),a.d(n,"a",(function(){return e}));var o=function(){var t=this,n=t.$createElement;t._self._c},c=[]}},[["ae47","common/runtime","common/vendor"]]]);