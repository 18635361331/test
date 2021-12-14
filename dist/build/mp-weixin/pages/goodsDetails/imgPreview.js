(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsDetails/imgPreview"],{"1a5d":function(e,n,t){},"40ca":function(e,n,t){"use strict";t.r(n);var i=t("9974"),u=t("e54b");for(var r in u)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return u[e]}))}(r);t("e454");var o,a=t("f0c5"),c=Object(a["a"])(u["default"],i["b"],i["c"],!1,null,"0cdaf75d",null,!1,i["a"],o);n["default"]=c.exports},9974:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return i}));var i={uniPopup:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-popup/uni-popup")]).then(t.bind(null,"1c89"))}},u=function(){var e=this,n=e.$createElement;e._self._c},r=[]},b459:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={props:["previewImageList","previewIndex","hasHttp"],data:function(){return{imgBaseUrls:this.$config.imgBaseUrl,imgIndex:this.previewIndex}},methods:{closeRreviewPopup:function(){this.$refs.popup.close()},openRreviewPopup:function(){this.imgIndex=this.previewIndex,this.$refs.popup.open()},swiperChange:function(e){this.imgIndex=e.detail.current+1}}};n.default=i},e454:function(e,n,t){"use strict";var i=t("1a5d"),u=t.n(i);u.a},e54b:function(e,n,t){"use strict";t.r(n);var i=t("b459"),u=t.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(r);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goodsDetails/imgPreview-create-component',
    {
        'pages/goodsDetails/imgPreview-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("40ca"))
        })
    },
    [['pages/goodsDetails/imgPreview-create-component']]
]);
