(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-resetPassword-index"],{"0a3e":function(e,t,a){"use strict";a.r(t);var s=a("4f2f"),i=a.n(s);for(var n in s)["default"].indexOf(n)<0&&function(e){a.d(t,e,(function(){return s[e]}))}(n);t["default"]=i.a},"2d31":function(e,t,a){var s=a("3037");"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var i=a("4f06").default;i("4d23f110",s,!0,{sourceMap:!1,shadowMode:!1})},3037:function(e,t,a){var s=a("4bad");t=s(!1),t.push([e.i,".commonPageTitle[data-v-234dd23b]{padding-top:%?88?%}.forgetBox[data-v-234dd23b]{width:100%;height:auto;padding:%?24?% %?64?% 0}.contain[data-v-234dd23b]{font-size:%?60?%;color:#000;font-weight:700;line-height:%?84?%;padding-bottom:%?24?%}.everRow[data-v-234dd23b]{width:100%;height:%?90?%;position:relative;border-bottom:%?1?% solid #e6e6e6;display:-webkit-box;display:-webkit-flex;display:flex}.everRow uni-input[data-v-234dd23b]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-right:%?22?%;height:%?90?%;line-height:%?90?%}.pswIcon[data-v-234dd23b]{width:%?80?%;height:%?90?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/shape@2x.png) no-repeat 50%;background-size:%?40?% %?40?%}.pswIcon.active[data-v-234dd23b]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/eyes@2x.png) no-repeat 50%;background-size:%?40?% %?40?%}.pswHint[data-v-234dd23b]{margin-top:%?24?%;color:#666;font-size:%?24?%;text-align:center}.passwordProgress[data-v-234dd23b]{height:%?6?%;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;border-radius:%?6?%;margin-top:%?24?%}.everyEm[data-v-234dd23b]{position:relative;width:33%;margin-right:%?4?%;background:#eee}.everyEm uni-text[data-v-234dd23b]{position:absolute;bottom:%?-30?%;font-size:%?20?%;color:#666;left:0;right:0;margin:auto;line-height:%?30?%;text-align:center}.everyEm.active1[data-v-234dd23b]{background-color:#ff7e18}.everyEm.active2[data-v-234dd23b]{background-color:#ff5d46}.everyEm.active3[data-v-234dd23b]{background-color:#ff1558}.complete[data-v-234dd23b]{width:100%;height:%?88?%;background:#ff1558;line-height:%?88?%;color:#fff;border-radius:%?100?%;margin-top:%?112?%;font-size:%?32?%;text-align:center}.aginPsw[data-v-234dd23b]{margin-top:%?72?%}",""]),e.exports=t},"4f2f":function(e,t,a){"use strict";var s=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(a("a057")),n=s(a("5315")),o={data:function(){return{params:{operateCode:"",password:"",telephone:"",type:3},aginPsw:"",pswFlag:{first:!1,second:!1},pswStrength:0}},onShow:function(){this.zhuge.track("设置新登录密码-落地页"),this.params.telephone=this.$Route.query.telephone,this.params.operateCode=this.$Route.query.operateCode},methods:{complete:function(){i.default.isDiffStr(this.params.password)?this.params.password==this.aginPsw?i.default.checkPassword(this.params.password,!0)&&i.default.checkPassword(this.aginPsw,!0)?this.resetMemberPwd():uni.showToast({title:"密码由8-20位，字母（需同时包含大小写）、数字组成",icon:"none"}):uni.showToast({title:"两次密码输入不一致，请重新输入",icon:"none"}):uni.showToast({title:"数字和大小写字母以外仅支持@#!$*_~-几种特殊符号，请修改重试",icon:"none"})},pswJudge:function(){this.pswStrength=i.default.checkPwdIntensity(this.params.password)},resetMemberPwd:function(){var e=this;n.default.resetMemberPwd({operateCode:this.params.operateCode,password:this.params.password,telephone:this.params.telephone,type:3}).then((function(t){200==t.data.code?(uni.showToast({title:"重置密码成功",icon:"none"}),e.goBack(1)):uni.showToast({title:t.data.message,icon:"none"})}))}}};t.default=o},"9f0c":function(e,t,a){"use strict";var s;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return s}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page commonPageTitle"},[a("defaultTitle",{attrs:{dto:{}}}),a("v-uni-view",{staticClass:"forgetBox"},[a("v-uni-view",{staticClass:"contain"},[e._v("设置新登录密码")]),a("v-uni-view",{staticClass:"everRow"},[e.pswFlag.first?a("v-uni-input",{attrs:{type:"text",placeholder:"请输入新密码",placeholderClass:"placeholder"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.pswJudge.apply(void 0,arguments)}},model:{value:e.params.password,callback:function(t){e.$set(e.params,"password",t)},expression:"params.password"}}):a("v-uni-input",{attrs:{type:"password",placeholder:"请输入新密码",placeholderClass:"placeholder"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.pswJudge.apply(void 0,arguments)}},model:{value:e.params.password,callback:function(t){e.$set(e.params,"password",t)},expression:"params.password"}}),a("v-uni-view",{staticClass:"pswIcon",class:e.pswFlag.first?"active":"",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pswFlag.first=!e.pswFlag.first}}})],1),a("v-uni-view",{staticClass:"passwordProgress"},[a("v-uni-view",{staticClass:"everyEm",class:e.pswStrength>0?"active1":""},[a("v-uni-text",[e._v("弱")])],1),a("v-uni-view",{staticClass:"everyEm",class:e.pswStrength>1?"active2":""},[a("v-uni-text",[e._v("中")])],1),a("v-uni-view",{staticClass:"everyEm",class:e.pswStrength>2?"active3":""},[a("v-uni-text",[e._v("强")])],1)],1),a("v-uni-view",{staticClass:"everRow aginPsw"},[e.pswFlag.second?a("v-uni-input",{attrs:{type:"text",placeholder:"请再次确认新密码",placeholderClass:"placeholder"},model:{value:e.aginPsw,callback:function(t){e.aginPsw=t},expression:"aginPsw"}}):a("v-uni-input",{attrs:{type:"password",placeholder:"请再次确认新密码",placeholderClass:"placeholder"},model:{value:e.aginPsw,callback:function(t){e.aginPsw=t},expression:"aginPsw"}}),a("v-uni-view",{staticClass:"pswIcon",class:e.pswFlag.second?"active":"",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pswFlag.second=!e.pswFlag.second}}})],1),a("v-uni-view",{staticClass:"pswHint"},[e._v("8-20位，由字母（需同时包含大小写）、数字组成")]),a("v-uni-view",{staticClass:"complete",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.complete.apply(void 0,arguments)}}},[e._v("完成")])],1)],1)},n=[]},a057:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={checkPassword:function(e){return!(!this.isDiffStr(e)||!/^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*).{8,20}$/.test(e))},isDiffStr:function(e){return!!/^([a-zA-Z0-9]|[@#!_~\-\$\*]){0,20}$/.test(e)},checkPwdIntensity:function(e){return this.checkPassword(e)?e.length>=8&&e.length<=10?/[@#!$*_~-]/im.test(e)?"2":"1":e.length>=11&&e.length<=13?/[@#!$*_~-]/im.test(e)?"3":"2":e.length>=14&&e.length<=20?"3":void 0:"0"}};t.default=s},d1ea:function(e,t,a){"use strict";a.r(t);var s=a("9f0c"),i=a("0a3e");for(var n in i)["default"].indexOf(n)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(n);a("f66d");var o,r=a("f0c5"),d=Object(r["a"])(i["default"],s["b"],s["c"],!1,null,"234dd23b",null,!1,s["a"],o);t["default"]=d.exports},f66d:function(e,t,a){"use strict";var s=a("2d31"),i=a.n(s);i.a}}]);