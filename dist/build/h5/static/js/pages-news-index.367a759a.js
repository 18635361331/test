(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-news-index"],{"0cc7":function(t,e,n){"use strict";n.r(e);var i=n("e537"),a=n("c07d");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var s,r=n("f0c5"),l=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"aadb45bc",null,!1,i["a"],s);e["default"]=l.exports},"19a2":function(t,e,n){var i=n("4bad");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-swipe[data-v-ff96a1be]{position:relative;overflow:hidden}.uni-swipe_box[data-v-ff96a1be]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-shrink:0;flex-shrink:0;position:relative}.uni-swipe_button-group[data-v-ff96a1be]{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;position:absolute;top:0;bottom:0}.button-group--left[data-v-ff96a1be]{left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%)}.button-group--right[data-v-ff96a1be]{right:0;-webkit-transform:translateX(100%);transform:translateX(100%)}.uni-swipe_button[data-v-ff96a1be]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 20px}.uni-swipe_button-text[data-v-ff96a1be]{-webkit-flex-shrink:0;flex-shrink:0;font-size:14px}.ani[data-v-ff96a1be]{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:cubic-bezier(.165,.84,.44,1);transition-timing-function:cubic-bezier(.165,.84,.44,1)}',""]),t.exports=e},"1c37":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uniSwipeAction:n("0cc7").default,uniSwipeActionItem:n("f1c2").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"page commonPageTitle"},[n("v-uni-view",{staticClass:"collectTitle"},[n("v-uni-view",{staticClass:"goBackBtn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack(1)}}}),n("v-uni-view",{staticClass:"title"},[t._v("消息中心")]),n("v-uni-view",{staticClass:"clearBtn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.readAllMsg.apply(void 0,arguments)}}})],1),t._l(t.msgModuleList,(function(e,i){return i<3&&e.flag?n("v-uni-view",{key:e.name},[n("uni-swipe-action",[n("uni-swipe-action-item",{scopedSlots:t._u([{key:"right",fn:function(){return[n("v-uni-view",{staticClass:"delAddr",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.removeModule(i+1)}}},[n("v-uni-text",[t._v("刪除")])],1)]},proxy:!0}],null,!0)},[n("v-uni-view",{staticClass:"everyRow",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.goToPage(e)}}},[n("v-uni-view",{staticClass:"newIcon"},[n("v-uni-image",{attrs:{src:e.image,mode:""}}),e.unreadCount?n("v-uni-view",{staticClass:"msgNum"},[t._v(t._s(e.unreadCount))]):t._e()],1),n("v-uni-view",{staticClass:"newInfo"},[n("v-uni-view",{staticClass:"infoTitle"},[t._v(t._s(e.name))]),n("v-uni-view",{staticClass:"infoSubTitle ellipsis-one"},[t._v(t._s(e.latestMsg?e.latestMsg:"暂无消息"))])],1),e.lastMsgTime?n("v-uni-view",{staticClass:"newTime"},[t._v(t._s(t.$utils.formatDate(e.lastMsgTime,"yyyy-MM-dd")))]):t._e()],1)],1)],1)],1):t._e()}))],2)},o=[]},2320:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{}},provide:function(){return{swipeaction:this}},created:function(){this.children=[]},methods:{closeOther:function(t){this.openItem&&this.openItem!==t&&(this.openItem.button.show="none"),this.openItem=t}}};e.default=i},2751:function(t,e,n){"use strict";n.r(e);var i=n("8dbd"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"3f91":function(t,e,n){var i=n("19a2");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("7d9644e0",i,!0,{sourceMap:!1,shadowMode:!1})},"3fe2":function(t,e,n){"use strict";n("4160"),n("a434"),n("ac1f"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{position:[],button:{},btn:"[]"}},watch:{button:{handler:function(t){this.btn=JSON.stringify(t)},deep:!0},show:function(t){this.autoClose||(this.button?this.button.show=t:this.init())},leftOptions:function(){this.init()},rightOptions:function(){this.init()}},created:function(){void 0!==this.swipeaction.children&&this.swipeaction.children.push(this)},mounted:function(){this.init()},beforeDestroy:function(){var t=this;this.swipeaction.children.forEach((function(e,n){e===t&&t.swipeaction.children.splice(n,1)}))},methods:{init:function(){var t=this;clearTimeout(this.swipetimer),this.swipetimer=setTimeout((function(){t.getButtonSize()}),50)},closeSwipe:function(t){this.autoClose&&this.swipeaction.closeOther(this)},change:function(t){this.$emit("change",t.open);var e=this.button.show;e!==t.open&&(this.button.show=t.open)},appTouchStart:function(t){var e=t.changedTouches[0].clientX;this.clientX=e,this.timestamp=(new Date).getTime()},appTouchEnd:function(t,e,n,i){var a=t.changedTouches[0].clientX,o=Math.abs(this.clientX-a),s=(new Date).getTime()-this.timestamp;o<40&&s<300&&this.$emit("click",{content:n,index:e,position:i})},getButtonSize:function(){var t=this,e=uni.createSelectorQuery().in(this);e.selectAll(".uni-swipe_button-group").boundingClientRect((function(e){var n="none";n=t.autoClose?"none":t.show,t.button={data:e,show:n}})).exec()}}};e.default=i},"40e4":function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("5a40")),o=i(n("b775")),s={allMsg:function(){return o.default.post(a.default.allMsg,{})},readAllMsg:function(){return o.default.post(a.default.readAllMsg,{})},moduleMessages:function(t){return o.default.post(a.default.moduleMessages,t)},unreadCount:function(){return o.default.post(a.default.unreadCount,{})},setRead:function(t){return o.default.post(a.default.setRead,t)},removeModule:function(t){return o.default.post(a.default.removeModule+t,{})},removeMsg:function(t){return o.default.post(a.default.removeMsg,t)}};e.default=s},"537a":function(t,e,n){var i=n("4bad");e=i(!1),e.push([t.i,".commonPageTitle[data-v-0cf96cbf]{padding-top:%?88?%}.collectTitle[data-v-0cf96cbf]{border-bottom:%?1?% solid #e4e4e4}.clearBtn[data-v-0cf96cbf]{width:%?88?%;height:%?88?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/mremove.png) no-repeat 50%;background-size:%?36?%;position:absolute;right:%?40?%;top:0;bottom:0;margin:auto}.uniSwipeAction[data-v-0cf96cbf]{width:100%}.everyRow[data-v-0cf96cbf]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;padding:%?40?% %?28?%;border-bottom:%?1?% solid #e4e4e4}.newIcon[data-v-0cf96cbf]{width:%?88?%;height:%?88?%;margin-right:%?24?%;position:relative}.newIcon uni-image[data-v-0cf96cbf]{width:1005;height:100%}.newInfo[data-v-0cf96cbf]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.newTime[data-v-0cf96cbf]{max-width:%?240?%;margin-left:%?20?%;font-size:%?26?%;text-align:right;color:#999;line-height:%?40?%}.infoTitle[data-v-0cf96cbf]{width:100%;height:%?44?%;line-height:%?44?%}.infoSubTitle[data-v-0cf96cbf]{width:100%;height:%?44?%;color:#999;line-height:%?44?%;font-size:%?24?%}.msgNum[data-v-0cf96cbf]{position:absolute;top:0;right:0;min-width:%?28?%;height:%?28?%;background-color:#ff1558;color:#fff;font-size:%?24?%;padding:0 %?6?%;line-height:%?28?%;text-align:center;border-radius:50%}.delAddr[data-v-0cf96cbf]{width:%?150?%;height:100%;background-color:#ff1558;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#fff}",""]),t.exports=e},"5a40":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={allMsg:"/msg/all",readAllMsg:"/msg/readAll",moduleMessages:"/msg/moduleMessages",unreadCount:"/msg/unreadCount",setRead:"/msg/setRead",removeModule:"/msg/removeModule/",removeMsg:"/msg/removeMsg"},a=i;e.default=a},"5d9d":function(t,e,n){"use strict";var i=n("e2e4"),a=n.n(i);a.a},"822b":function(t,e,n){"use strict";n.r(e);var i=n("da90"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"8dbd":function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("40e4")),o={data:function(){return{msgModuleList:[{name:"优惠促销",latestMsg:"",image:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/p-icon.png",path:"/pages/messagePromotion/index",flag:!1},{name:"系统通知",latestMsg:"",image:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/s-icon.png",path:"/pages/systemNotice/index",flag:!1},{name:"交易物流",latestMsg:"",image:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/l-icon.png",path:"/pages/messageLogistics/index",flag:!1},{name:"互动消息",latestMsg:"",image:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/n-icon.png",path:"/pages/systemNotice/index",flag:!1}],options:{style:{width:"200rpx",height:"285rpx"}},imgBaseUrls:""}},methods:{allMsg:function(){var t=this;a.default.allMsg().then((function(e){if(200==e.data.code){for(var n=0;n<t.msgModuleList.length;n++)t.msgModuleList[n].flag=!1;for(var i=0;i<e.data.data.length;i++)for(var a in e.data.data[i])t.$set(t.msgModuleList[e.data.data[i].msgModule-1],a,e.data.data[i][a]),t.$set(t.msgModuleList[e.data.data[i].msgModule-1],"flag",!0)}else uni.showToast({title:e.data.message,icon:"none"})}))},readAllMsg:function(){var t=this;a.default.readAllMsg().then((function(e){200==e.data.code?t.allMsg():uni.showToast({title:e.data.message,icon:"none"})}))},goToPage:function(t){this.$Router.push({path:t.path})},removeModule:function(t){var e=this;a.default.removeModule(t).then((function(t){200==t.data.code?e.allMsg():uni.showToast({title:t.data.message,icon:"none"})}))}},onShow:function(){this.zhuge.track("消息落地页"),this.imgBaseUrls=this.$config.imgBaseUrl,this.allMsg()}};e.default=o},"8fac":function(t,e,n){"use strict";var i=function(t){(t.options.wxs||(t.options.wxs={}))["swipe"]=function(t){var e=10;function n(t,e,n,i){var a=i.getState(),o=JSON.parse(t);o&&o.data&&0!==o.data.length&&(a.leftWidth=o.data[0].width,a.rightWidth=o.data[1].width,a.threshold=i.getDataset().threshold,o.show&&"none"!==o.show?u(o.show,i,n):(a.left&&u("none",i,n),f(i)))}function i(t,e){var n=t.instance,i=n.getDataset().disabled,a=n.getState();i=("string"===typeof i?JSON.parse(i):i)||!1,i||(n.requestAnimationFrame((function(){n.removeClass("ani"),e.callMethod("closeSwipe")})),a.x=a.left||0,d(t,e))}function a(t,e){var n=t.instance,i=n.getDataset().disabled,a=n.getState();i=("string"===typeof i?JSON.parse(i):i)||!1,i||(p(t),"horizontal"===a.direction&&(t.preventDefault&&t.preventDefault(),s(a.x+a.deltaX,n,e)))}function o(t,e){var n=t.instance,i=n.getDataset().disabled,a=n.getState();i=("string"===typeof i?JSON.parse(i):i)||!1,i||l(a.left,n,e)}function s(t,e,n){t=t||0;var i=e.getState(),a=i.leftWidth,o=i.rightWidth;i.left=r(t,-o,a),e.requestAnimationFrame((function(){e.setStyle({transform:"translateX("+i.left+"px)","-webkit-transform":"translateX("+i.left+"px)"})}))}function r(t,e,n){return Math.min(Math.max(t,e),n)}function l(t,e,n){var i=e.getState(),a=i.threshold,o=(i.position,i.isopen||"none"),s=i.leftWidth,r=i.rightWidth;0!==i.deltaX?u("none"===o&&r>0&&-t>a||"none"!==o&&r>0&&r+t<a?"right":"none"===o&&s>0&&t>a||"none"!==o&&s>0&&s-t<a?"left":"none",e,n):u("none",e,n)}function u(t,e,n){var i=e.getState(),a=(i.position,i.leftWidth),o=i.rightWidth,r="";switch(i.isopen=i.isopen?i.isopen:"none",t){case"left":r=a;break;case"right":r=-o;break;default:r=0}i.isopen!==t&&(i.throttle=!0,n.callMethod("change",{open:t})),i.isopen=t,e.requestAnimationFrame((function(){e.addClass("ani"),s(r,e,n)}))}function c(t,n){return t>n&&t>e?"horizontal":n>t&&n>e?"vertical":""}function f(t){var e=t.getState();e.direction="",e.deltaX=0,e.deltaY=0,e.offsetX=0,e.offsetY=0}function d(t){var e=t.instance,n=e.getState();f(e);var i=t.touches[0];n.startX=i.clientX,n.startY=i.clientY}function p(t){var e=t.instance,n=e.getState(),i=t.touches[0];n.deltaX=i.clientX-n.startX,n.deltaY=i.clientY-n.startY,n.offsetX=Math.abs(n.deltaX),n.offsetY=Math.abs(n.deltaY),n.direction=n.direction||c(n.offsetX,n.offsetY)}return t.exports={sizeReady:n,touchstart:i,touchmove:a,touchend:o},t.exports}({exports:{}})};e["a"]=i},9768:function(t,e,n){"use strict";n.r(e);var i=n("1c37"),a=n("2751");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("5d9d");var s,r=n("f0c5"),l=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"0cf96cbf",null,!1,i["a"],s);e["default"]=l.exports},b788:function(t,e,n){"use strict";var i=n("3f91"),a=n.n(i);a.a},c07d:function(t,e,n){"use strict";n.r(e);var i=n("2320"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},da90:function(t,e,n){"use strict";var i=n("4ea4");n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("3fe2")),o={mixins:[a.default],props:{show:{type:String,default:"none"},disabled:{type:Boolean,default:!1},autoClose:{type:Boolean,default:!0},threshold:{type:Number,default:20},leftOptions:{type:Array,default:function(){return[]}},rightOptions:{type:Array,default:function(){return[]}}},inject:["swipeaction"]};e.default=o},e2e4:function(t,e,n){var i=n("537a");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("6011dbe8",i,!0,{sourceMap:!1,shadowMode:!1})},e537:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t._t("default")],2)},o=[]},eda5:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-swipe"},[n("v-uni-view",{wxsProps:{"change:prop":"btn"},staticClass:"uni-swipe_box",attrs:{"data-threshold":t.threshold,"data-disabled":t.disabled,"change:prop":t.swipe.sizeReady,prop:t.btn},on:{touchstart:function(e){e=t.$handleWxsEvent(e),t.swipe.touchstart(e,t.$getComponentDescriptor())},touchmove:function(e){e=t.$handleWxsEvent(e),t.swipe.touchmove(e,t.$getComponentDescriptor())},touchend:function(e){e=t.$handleWxsEvent(e),t.swipe.touchend(e,t.$getComponentDescriptor())}}},[n("v-uni-view",{staticClass:"uni-swipe_button-group button-group--left"},[t._t("left",t._l(t.leftOptions,(function(e,i){return n("v-uni-view",{key:i,staticClass:"uni-swipe_button button-hock",style:{backgroundColor:e.style&&e.style.backgroundColor?e.style.backgroundColor:"#C7C6CD",fontSize:e.style&&e.style.fontSize?e.style.fontSize:"16px"},attrs:{"data-button":t.btn},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.appTouchStart.apply(void 0,arguments)},touchend:function(n){arguments[0]=n=t.$handleEvent(n),t.appTouchEnd(n,i,e,"left")}}},[n("v-uni-text",{staticClass:"uni-swipe_button-text",style:{color:e.style&&e.style.color?e.style.color:"#FFFFFF"}},[t._v(t._s(e.text))])],1)})))],2),t._t("default"),n("v-uni-view",{staticClass:"uni-swipe_button-group button-group--right"},[t._t("right",t._l(t.rightOptions,(function(e,i){return n("v-uni-view",{key:i,staticClass:"uni-swipe_button button-hock",style:{backgroundColor:e.style&&e.style.backgroundColor?e.style.backgroundColor:"#C7C6CD",fontSize:e.style&&e.style.fontSize?e.style.fontSize:"16px"},attrs:{"data-button":t.btn},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.appTouchStart.apply(void 0,arguments)},touchend:function(n){arguments[0]=n=t.$handleEvent(n),t.appTouchEnd(n,i,e,"right")}}},[n("v-uni-text",{staticClass:"uni-swipe_button-text",style:{color:e.style&&e.style.color?e.style.color:"#FFFFFF"}},[t._v(t._s(e.text))])],1)})))],2)],2)],1)},o=[]},f1c2:function(t,e,n){"use strict";n.r(e);var i=n("eda5"),a=n("822b");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("b788");var s,r=n("f0c5"),l=n("8fac"),u=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"ff96a1be",null,!1,i["a"],s);"function"===typeof l["a"]&&Object(l["a"])(u),e["default"]=u.exports}}]);