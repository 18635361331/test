(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/agreementPopup"],{a5f8:function(n,e,t){},a614:function(n,e,t){"use strict";t.d(e,"b",(function(){return u})),t.d(e,"c",(function(){return o})),t.d(e,"a",(function(){return r}));var r={uniPopup:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-popup/uni-popup")]).then(t.bind(null,"1c89"))}},u=function(){var n=this,e=n.$createElement;n._self._c},o=[]},b638:function(n,e,t){"use strict";var r=t("a5f8"),u=t.n(r);u.a},e2d5:function(n,e,t){"use strict";t.r(e);var r=t("a614"),u=t("f669");for(var o in u)["default"].indexOf(o)<0&&function(n){t.d(e,n,(function(){return u[n]}))}(o);t("b638");var a,i=t("f0c5"),c=Object(i["a"])(u["default"],r["b"],r["c"],!1,null,"1d1fbcde",null,!1,r["a"],a);e["default"]=c.exports},ea61:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(t("a34a")),u=o(t("e6bc"));function o(n){return n&&n.__esModule?n:{default:n}}function a(n,e,t,r,u,o,a){try{var i=n[o](a),c=i.value}catch(f){return void t(f)}i.done?e(c):Promise.resolve(c).then(r,u)}function i(n){return function(){var e=this,t=arguments;return new Promise((function(r,u){var o=n.apply(e,t);function i(n){a(o,r,u,i,c,"next",n)}function c(n){a(o,r,u,i,c,"throw",n)}i(void 0)}))}}var c={data:function(){return{vipInfo:[],partner:[]}},methods:{openPopup:function(){this.$refs.popup.open()},closePopup:function(){this.$refs.popup.close()},getPartner:function(){var n=this;return i(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.default.getPartner();case 2:n.partner=e.sent;case 3:case"end":return e.stop()}}),e)})))()},getVipInfo:function(){var n=this;return i(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.default.getVipInfo();case 2:n.vipInfo=e.sent;case 3:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.getPartner(),this.getVipInfo()}};e.default=c},f669:function(n,e,t){"use strict";t.r(e);var r=t("ea61"),u=t.n(r);for(var o in r)["default"].indexOf(o)<0&&function(n){t.d(e,n,(function(){return r[n]}))}(o);e["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/login/agreementPopup-create-component',
    {
        'pages/login/agreementPopup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e2d5"))
        })
    },
    [['pages/login/agreementPopup-create-component']]
]);