(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["copartner-joinPartner-index"],{"0907":function(e,t,a){"use strict";var n=a("4ea4");a("ac1f"),a("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var i=n(a("1da1")),s=(n(a("5315")),n(a("92c6"))),r=n(a("ee48")),o=n(a("304c8")),c=n(a("e6bc")),d=n(a("4dcf")),u={mixins:[r.default],data:function(){return{defaultTitleDto:{title:"加入合伙人"},countdown:{inter:"",count:0},partnerName:"",partnerConfig:[],params:{realName:"",mobile:"",captcha:"",inviteCode:"",licenseImage:"",distributorTypeId:"",districtId:""},addressParams:{},agreementFlag:!0,agreementInfo:[],imgBaseUrls:this.$config.imgBaseUrl}},onShow:function(){},methods:{distributorAgreement:function(){var e=this;s.default.distributorAgreement(this.params.distributorTypeId).then((function(t){t.data.code&&(e.agreementInfo=t.data.data)}))},openPopup:function(){this.$refs.openPopup.openPopup()},captcha:function(){var e=this;if(!uni.getStorageSync("sessionId"))return uni.showToast({title:"请登录",icon:"none"}),void setTimeout((function(){e.$Router.push({path:"/pages/login/index"})}),1e3);/^\d{11}$/.test(this.params.mobile)?(this.countDownTime(),this.sendCaptcha()):uni.showToast({title:"请输入正确的手机号",icon:"none"})},countDownTime:function(){var e=this;this.countdown.count=60,this.countdown.inter=setInterval((function(){e.countdown.count--,e.countdown.count||clearInterval(e.countdown.inter)}),1e3)},chooseimage:function(){var e=this;uni.chooseImage({count:1,success:function(t){e.uploadImage(t.tempFiles[0].path,e.params.licenseImage)}})},updateImage:function(e,t){this.$set(this.params,"licenseImage",e.data)},sendCaptcha:function(){s.default.sendCaptcha(this.params.mobile).then((function(e){200==e.data.code?uni.showToast({title:"发送成功",icon:"none"}):uni.showToast({title:e.data.message,icon:"none"})}))},submit:function(){var e=this;if(this.agreementFlag){for(var t in this.params)if(!this.params[t]&&"licenseImage"!=t)return void uni.showToast({title:"请检查必填项是否填写完整",icon:"none"});s.default.submitDistributor(this.params).then((function(t){200==t.data.code?(uni.showToast({title:"提交成功，等待审核",icon:"none"}),setTimeout((function(){"客户"==e.partnerName?e.$Router.push({path:"/pages/giftCardList/index"}):uni.switchTab({url:"/pages/my/index"})}),1e3)):uni.showToast({title:t.data.message,icon:"none"})}))}else uni.showToast({title:"请先同意文器库平台协议",icon:"none"})},closeAddPopup:function(){this.$refs.addressPopup.close()},addressChange:function(e){for(var t in e)this.$set(this.addressParams,t,e[t]);this.params.districtId=e.districtId,this.$refs.addressPopup.close()},openAddress:function(){this.$refs.addressPopup.open()}},onLoad:function(e){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:try{t.$Route.query.scene&&(t.params.inviteCode=decodeURIComponent(t.$Route.query.scene).split(",")[0],uni.setStorageSync("routerShareNumber",t.params.inviteCode)),e&&e.scene&&(t.params.inviteCode=decodeURIComponent(e.scene).split(",")[0],t.params.inviteCode&&uni.setStorageSync("routerShareNumber",t.params.inviteCode)),e&&e.shareNumber&&(t.params.inviteCode=e.shareNumber,uni.setStorageSync("routerShareNumber",t.params.inviteCode)),t.$Route.query.shareNumber&&(t.params.inviteCode=t.$Route.query.shareNumber,uni.setStorageSync("routerShareNumber",t.params.inviteCode))}catch(n){}return a.next=3,c.default.getPartner();case 3:t.partnerConfig=a.sent,t.params.distributorTypeId=t.partnerConfig[0].id,t.partnerName=t.partnerConfig[0].name,t.distributorAgreement(),uni.getStorageSync("sessionId")||(uni.showToast({title:"请登录",icon:"none"}),setTimeout((function(){t.$Router.push({path:"/pages/login/index"})}),1e3));case 8:case"end":return a.stop()}}),a)})))()},components:{agreementPopup:o.default,selectAddress:d.default}};t.default=u},"21f0":function(e,t,a){var n=a("4bad");t=n(!1),t.push([e.i,".commonPageTitle[data-v-610c26b0]{background-color:#f5f5f5;padding-top:%?88?%}.collectTitle .goBackBtn[data-v-610c26b0]{background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png);background-size:%?40?% %?40?%;position:absolute;top:0;right:0}.agreementPopupContent[data-v-610c26b0]{height:100vh;background-color:#fff;padding-top:%?100?%;padding-bottom:%?20?%}.agreementEvery[data-v-610c26b0]{padding:0 %?30?%;color:#999;margin-top:%?20?%;text-indent:%?48?%;font-size:%?26?%}",""]),e.exports=t},2268:function(e,t,a){var n=a("21f0");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("6c803000",n,!0,{sourceMap:!1,shadowMode:!1})},"2a34":function(e,t,a){"use strict";var n=a("9213"),i=a.n(n);i.a},"304c8":function(e,t,a){"use strict";a.r(t);var n=a("ae04"),i=a("b34a");for(var s in i)["default"].indexOf(s)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(s);a("c72c");var r,o=a("f0c5"),c=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"610c26b0",null,!1,n["a"],r);t["default"]=c.exports},"4dcf":function(e,t,a){"use strict";a.r(t);var n=a("ebcf"),i=a("e5f4");for(var s in i)["default"].indexOf(s)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(s);a("c41a");var r,o=a("f0c5"),c=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"02b3555b",null,!1,n["a"],r);t["default"]=c.exports},"5ee4":function(e,t,a){var n=a("4bad");t=n(!1),t.push([e.i,".chooseAddress[data-v-02b3555b]{width:100%;height:100%;background-color:#fff;padding-left:%?24?%}.selectTitle[data-v-02b3555b]{width:100%;height:%?98?%;border-bottom:1px solid #e6e6e6;display:-webkit-box;display:-webkit-flex;display:flex}.everyChoose[data-v-02b3555b],.addressList[data-v-02b3555b]{line-height:%?98?%;height:%?98?%;margin-right:%?34?%;overflow:hidden}.everyChoose[data-v-02b3555b]{max-width:20%}.addressList[data-v-02b3555b]{border-bottom:1px solid #e6e6e6;color:#999}.addressList.active[data-v-02b3555b]{color:#ff1558;position:relative}.chooseBtn[data-v-02b3555b]{line-height:%?98?%;color:#ff1558;height:%?98?%;margin-right:%?36?%}.chooseBtn.active[data-v-02b3555b]{\n\t/* border-bottom: 2http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/558; */}.chooseIcon[data-v-02b3555b]{background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/static/unfollow.png) no-repeat 50%;background-size:%?27?% %?18?%;width:%?27?%;height:%?18?%;position:absolute;right:%?20?%;top:0;bottom:0;margin:auto}.addrContainer[data-v-02b3555b]{height:calc(100% - %?100?%)}.everyChoose.active[data-v-02b3555b]{border-bottom:2px solid #ff1558}.opacity[data-v-02b3555b]{width:0;height:0;opacity:0;font-size:0}",""]),e.exports=t},"64ac":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:["agreementInfo","partnerName"],data:function(){return{memberConfig:[]}},methods:{openPopup:function(){this.$refs.popup.open()},closePopup:function(){this.$refs.popup.close()}},mounted:function(){this.memberConfig=uni.getStorageSync("memberConfig")?JSON.parse(uni.getStorageSync("memberConfig")):[],this.memberConfig.shift()}};t.default=n},7649:function(e,t,a){var n=a("5ee4");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("f77d0114",n,!0,{sourceMap:!1,shadowMode:!1})},"76b2":function(e,t,a){var n=a("4bad");t=n(!1),t.push([e.i,".commonPageTitle[data-v-d53cd1fc]{\npadding-top:%?88?%;\nmin-height:100vh;background-color:#f4f5f6;padding-bottom:%?180?%}.joinPartner[data-v-d53cd1fc]{width:100%;height:%?300?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/joinPartenrBg.png);background-size:100% 100%}.openProcess[data-v-d53cd1fc]{width:%?690?%;background-color:#fff;border-radius:%?20?%;margin:0 auto;margin-top:%?-50?%}.openTitle[data-v-d53cd1fc]{width:100%;height:%?40?%;font-weight:700;padding:%?20?% %?30?%}.everyProcess[data-v-d53cd1fc]{display:-webkit-box;display:-webkit-flex;display:flex;padding:0 %?30?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin:%?50?% 0 %?10?%}.everyTip[data-v-d53cd1fc]{width:%?180?%;height:%?60?%;background-color:#fff3e0;line-height:%?60?%;text-align:center;border-radius:%?30?%;font-size:%?24?%;color:#e88140}.everyLine[data-v-d53cd1fc]{width:%?50?%;height:%?2?%;background-color:#d8d8d8}.openExplain[data-v-d53cd1fc]{padding:0 %?30?%;color:#666;margin-top:%?40?%;font-size:%?24?%}.partnerInfo[data-v-d53cd1fc]{width:%?690?%;background-color:#fff;border-radius:%?20?%;border-top-right-radius:0;border-top-left-radius:0;margin:0 auto;padding:0 %?30?%;padding-bottom:%?30?%}.partnerTab[data-v-d53cd1fc]{width:%?690?%;margin:0 auto;height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;border-radius:%?30?%;overflow:hidden;border-bottom-right-radius:0;border-bottom-left-radius:0;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-top:%?30?%}.everyTab[data-v-d53cd1fc]{width:%?330?%;height:%?80?%;text-align:center;line-height:%?80?%;font-size:%?28?%;color:#999;background-color:#fafafa;border-top-left-radius:%?30?%;border-top-right-radius:%?30?%}.everyTab.active[data-v-d53cd1fc]{background-color:#fff;font-size:%?32?%;color:#734c2d}.everyInfo[data-v-d53cd1fc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;min-height:%?100?%;border-bottom:%?1?% solid #d8d8d8}.imageUpload.everyInfo[data-v-d53cd1fc]{-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;border-bottom:none}.partnerAdd[data-v-d53cd1fc]{color:#3478f6;padding-left:%?24?%}.fixedInfo[data-v-d53cd1fc]{vertical-align:bottom;min-width:%?140?%}.imageUpload .fixedInfo[data-v-d53cd1fc]{margin-top:%?-100?%}.fixedInfo uni-text[data-v-d53cd1fc]{color:red;margin-left:%?6?%}.placeType[data-v-d53cd1fc]{font-size:%?28?%;margin-left:%?20?%;line-height:%?100?%;width:calc(100% - %?325?%)}.countDownInput.placeType[data-v-d53cd1fc]{width:calc(100% - %?380?%)}.getCode[data-v-d53cd1fc]{color:#333;font-size:%?28?%;text-align:center;line-height:%?60?%;height:%?60?%;text-align:right;background-color:#000;padding:0 %?20?%;border-radius:20px;font-size:%?24?%;color:#fff}.countDown[data-v-d53cd1fc]{font-size:%?24?%;color:#fff}.evaluateImage[data-v-d53cd1fc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;position:relative;margin-top:%?20?%}.updateImg[data-v-d53cd1fc]{width:%?162?%;height:%?162?%;margin-left:%?24?%;margin-bottom:%?24?%;border:1px dashed #dfdfdf;border-radius:%?8?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_pic.png) no-repeat;background-position:%?55?% %?30?%;background-size:%?52?% %?46?%;position:relative}.updateImg uni-text[data-v-d53cd1fc]{position:absolute;top:%?98?%;width:100%;text-align:center;color:#b2b2b2}.imageList[data-v-d53cd1fc]{position:relative;width:%?162?%;height:%?162?%;margin-left:%?24?%;margin-bottom:%?24?%;border-radius:%?8?%;overflow:hidden}.removeImgBtn[data-v-d53cd1fc]{position:absolute;top:0;right:0;width:%?30?%;height:%?30?%;background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_close.png) no-repeat 50%;background-size:%?30?% %?30?%}.submitBtn[data-v-d53cd1fc]{width:%?690?%;height:%?88?%;background-color:#333;border-radius:%?44?%;text-align:center;line-height:%?88?%;color:#fff;position:fixed;left:0;right:0;margin:auto;z-index:10;bottom:calc(%?60?% + constant(safe-area-inset-bottom));bottom:calc(%?60?% + env(safe-area-inset-bottom))}.agreement[data-v-d53cd1fc]{width:calc(100% - %?60?%);height:%?74?%;border-top:%?1?% solid #d8d8d8;margin:0 auto;margin-top:%?26?%;padding-top:%?20?%;color:#333;display:-webkit-box;display:-webkit-flex;display:flex}.agreement uni-image[data-v-d53cd1fc]{width:%?30?%;height:%?30?%;margin-top:%?4?%;margin-right:%?10?%}.agreement .agreementText[data-v-d53cd1fc]{color:#007aff}.addressPopup[data-v-d53cd1fc]{width:100%;height:%?840?%;background-color:#fff}.addressPopupTitle[data-v-d53cd1fc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:0 %?20?%;height:%?88?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:1px solid #e6e6e6}.cancel[data-v-d53cd1fc]{color:#999}.createAddressBox[data-v-d53cd1fc]{height:calc(100% - %?88?%)}",""]),e.exports=t},9213:function(e,t,a){var n=a("76b2");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("780c6742",n,!0,{sourceMap:!1,shadowMode:!1})},"9bd5":function(e,t,a){"use strict";var n=a("4ea4");a("a434"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var i=n(a("1da1")),s=n(a("92c6")),r={props:["defaultAddress"],data:function(){return{selectedItems:[],provinceList:[],cityList:[],districtList:[],townList:[],tabIndex:"",level:3}},methods:{setDefaultData:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.chooseAddr(0,{id:e.defaultAddress.provinceId,fullName:e.defaultAddress.provinceName},!0);case 2:return t.next=4,e.chooseAddr(1,{id:e.defaultAddress.cityId,fullName:e.defaultAddress.cityName},!0);case 4:return t.next=6,e.chooseAddr(2,{id:e.defaultAddress.districtId,fullName:e.defaultAddress.districtName},!0);case 6:if(!e.defaultAddress.townId){t.next=9;break}return t.next=9,e.chooseAddr(3,{id:e.defaultAddress.townId,fullName:e.defaultAddress.townName},!0);case 9:e.tabIndex=e.tabIndex-1;case 10:case"end":return t.stop()}}),t)})))()},provices:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.default.appProvices().then((function(t){200==t.data.code?e.provinceList=t.data.data:uni.showToast({title:t.data.message,icon:"none"})}));case 2:case"end":return t.stop()}}),t)})))()},cities:function(e){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,s.default.appCities(e).then((function(e){200==e.data.code?t.cityList=e.data.data:uni.showToast({title:e.data.message,icon:"none"})}));case 2:case"end":return a.stop()}}),a)})))()},counties:function(e){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,s.default.appCounties(e).then((function(e){200==e.data.code?t.districtList=e.data.data:uni.showToast({title:e.data.message,icon:"none"})}));case 2:case"end":return a.stop()}}),a)})))()},chooseAddr:function(e,t,a){var n=this;return(0,i.default)(regeneratorRuntime.mark((function i(){var s;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:i.t0=e,i.next=0===i.t0?3:1===i.t0?6:9;break;case 3:return i.next=5,n.cities(t.id);case 5:return i.abrupt("break",9);case 6:return i.next=8,n.counties(t.id);case 8:return i.abrupt("break",9);case 9:n.selectedItems.splice(e,1,t),n.selectedItems.splice(e+1),n.tabIndex=e+1,e!=n.level-1||a||(s={provinceName:n.selectedItems[0].fullName,provinceId:n.selectedItems[0].id,cityName:n.selectedItems[1].fullName,cityId:n.selectedItems[1].id,districtName:n.selectedItems[2].fullName?n.selectedItems[2].fullName:"",districtId:n.selectedItems[2].id?n.selectedItems[2].id:""},n.$emit("addressChange",s));case 13:case"end":return i.stop()}}),i)})))()},tabChange:function(e){this.tabIndex=e}},computed:{defaultAddressa:function(){return this.defaultAddress.provinceId&&this.setDefaultData(),this.defaultAddress.provinceId}},mounted:function(){this.provices()}};t.default=r},ae04:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return n}));var n={uniPopup:a("1c89").default},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page"},[a("uni-popup",{ref:"popup",attrs:{type:"bottom"}},[a("v-uni-view",{staticClass:"collectTitle"},[a("v-uni-view",{staticClass:"goBackBtn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.closePopup.apply(void 0,arguments)}}}),a("v-uni-view",{staticClass:"title"},[e._v("文器库平台"+e._s(e.partnerName)+"协议")])],1),a("v-uni-scroll-view",{staticClass:"agreementPopupContent",attrs:{"scroll-y":"true"}},e._l(e.agreementInfo,(function(t,n){return a("v-uni-view",{key:n,staticClass:"agreementEvery"},[e._v(e._s(t))])})),1)],1)],1)},s=[]},b34a:function(e,t,a){"use strict";a.r(t);var n=a("64ac"),i=a.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(s);t["default"]=i.a},b94d:function(e,t,a){"use strict";a.r(t);var n=a("bbf4"),i=a("c0a2");for(var s in i)["default"].indexOf(s)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(s);a("2a34");var r,o=a("f0c5"),c=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"d53cd1fc",null,!1,n["a"],r);t["default"]=c.exports},bbf4:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return n}));var n={uniPopup:a("1c89").default},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page commonPageTitle"},[a("defaultTitle",{attrs:{dto:e.defaultTitleDto}}),a("v-uni-view",{staticClass:"joinPartner"}),a("v-uni-view",{staticClass:"openProcess"},[a("v-uni-view",{staticClass:"openTitle"},[e._v("开通流程：")]),a("v-uni-view",{staticClass:"everyProcess"},[a("v-uni-view",{staticClass:"everyTip"},[e._v("确认合作模式")]),a("v-uni-view",{staticClass:"everyLine"}),a("v-uni-view",{staticClass:"everyTip"},[e._v("签订合作协议")]),a("v-uni-view",{staticClass:"everyLine"}),a("v-uni-view",{staticClass:"everyTip"},[e._v("开通合伙人")])],1),a("v-uni-view",{staticClass:"openTitle"},[e._v("开通说明：")]),a("v-uni-view",{staticClass:"openExplain"},[e._v("提交材料务必确保其真实性，提交申请后平台将于1-2工作日内进行合作资质审理，审理通过后将以短信或商务联系形式告知")]),a("v-uni-view",{staticClass:"agreement"},[e.agreementFlag?a("v-uni-image",{attrs:{src:e.imgBaseUrls+"appletsImages/agreementFlag.png",mode:""},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.agreementFlag=!e.agreementFlag}}}):a("v-uni-image",{attrs:{src:e.imgBaseUrls+"appletsImages/agreementFlag1.png",mode:""},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.agreementFlag=!e.agreementFlag}}}),e._v("我已阅读并同意"),a("v-uni-view",{staticClass:"agreementText",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openPopup.apply(void 0,arguments)}}},[e._v("《文器库平台"),e._l(e.partnerConfig,(function(t,n){return t.applyFlag&&e.params.distributorTypeId==t.id?a("v-uni-text",{key:n},[e._v(e._s(t.name))]):e._e()})),e._v("协议》")],2)],1)],1),a("v-uni-view",{staticClass:"partnerTab"},e._l(e.partnerConfig,(function(t,n){return t.applyFlag?a("v-uni-view",{key:n,staticClass:"everyTab",class:{active:e.params.distributorTypeId==t.id},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.params.distributorTypeId=t.id,e.partnerName=t.name,e.distributorAgreement()}}},[e._v(e._s(t.name))]):e._e()})),1),a("v-uni-view",{staticClass:"partnerInfo"},[a("v-uni-view",{staticClass:"everyInfo"},[a("v-uni-view",{staticClass:"fixedInfo"},[e._v("发展区域"),a("v-uni-text",[e._v("*")])],1),e.addressParams.districtId?a("v-uni-view",{staticClass:"partnerAdd ellipsis-one",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openAddress()}}},[a("v-uni-text",[e._v(e._s(e.addressParams.provinceName)+e._s(e.addressParams.cityName)+e._s(e.addressParams.districtName))])],1):a("v-uni-view",{staticClass:"partnerAdd",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openAddress()}}},[e._v("选择所在区域")])],1),a("v-uni-view",{staticClass:"everyInfo"},[a("v-uni-view",{staticClass:"fixedInfo"},[e._v("真实姓名"),a("v-uni-text",[e._v("*")])],1),a("v-uni-input",{staticClass:"placeType",attrs:{type:"text","placeholder-class":"placeholder",placeholder:"输入真实姓名"},model:{value:e.params.realName,callback:function(t){e.$set(e.params,"realName",t)},expression:"params.realName"}})],1),a("v-uni-view",{staticClass:"everyInfo"},[a("v-uni-view",{staticClass:"fixedInfo"},[e._v("联系方式"),a("v-uni-text",[e._v("*")])],1),a("v-uni-input",{staticClass:"placeType",attrs:{type:"number","placeholder-class":"placeholder",placeholder:"输入有效手机号"},model:{value:e.params.mobile,callback:function(t){e.$set(e.params,"mobile",t)},expression:"params.mobile"}})],1),a("v-uni-view",{staticClass:"everyInfo"},[a("v-uni-view",{staticClass:"fixedInfo"},[e._v("验证码"),a("v-uni-text",[e._v("*")])],1),a("v-uni-input",{staticClass:"placeType",class:e.countdown.count?"countDownInput":"",attrs:{type:"number","placeholder-class":"placeholder",placeholder:"输入有效验证码"},model:{value:e.params.captcha,callback:function(t){e.$set(e.params,"captcha",t)},expression:"params.captcha"}}),e.countdown.count?e._e():a("v-uni-text",{staticClass:"getCode",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.captcha.apply(void 0,arguments)}}},[e._v("获取验证码")]),e.countdown.count?a("v-uni-text",{staticClass:"getCode countDown"},[e._v(e._s(e.countdown.count)+"秒后重新获取")]):e._e()],1),a("v-uni-view",{staticClass:"everyInfo"},[a("v-uni-view",{staticClass:"fixedInfo"},[e._v("合伙人邀请码"),a("v-uni-text",[e._v("*")])],1),a("v-uni-input",{staticClass:"placeType",attrs:{type:"text","placeholder-class":"placeholder",placeholder:"输入有效邀请码"},model:{value:e.params.inviteCode,callback:function(t){e.$set(e.params,"inviteCode",t)},expression:"params.inviteCode"}})],1),a("v-uni-view",{staticClass:"everyInfo imageUpload"},[a("v-uni-view",{staticClass:"fixedInfo"},[e._v("上传营业执照"),a("v-uni-text")],1),a("v-uni-view",{staticClass:"evaluateImage"},[e.params.licenseImage?a("v-uni-view",{staticClass:"imageList"},[a("v-uni-image",{attrs:{src:e.imgBaseUrls+e.params.licenseImage,mode:"aspectFill"}}),a("v-uni-view",{staticClass:"removeImgBtn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.params.licenseImage=""}}})],1):e._e(),e.params.licenseImage?e._e():a("v-uni-view",{staticClass:"updateImg",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.chooseimage()}}},[a("v-uni-text",[e._v("添加照片")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"submitBtn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}},[e._v("提交申请")]),a("uni-popup",{ref:"addressPopup",attrs:{type:"bottom"}},[a("v-uni-view",{staticClass:"addressPopup"},[a("v-uni-view",{staticClass:"addressPopupTitle"},[a("v-uni-text",[e._v("请选择所在地区")]),a("v-uni-text",{staticClass:"cancel",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.closeAddPopup.apply(void 0,arguments)}}},[e._v("取消")])],1),a("v-uni-view",{staticClass:"createAddressBox"},[a("selectAddress",{attrs:{defaultAddress:e.addressParams},on:{addressChange:function(t){arguments[0]=t=e.$handleEvent(t),e.addressChange.apply(void 0,arguments)}}})],1)],1)],1),a("agreementPopup",{ref:"openPopup",attrs:{agreementInfo:e.agreementInfo,partnerName:e.partnerName}})],1)},s=[]},c0a2:function(e,t,a){"use strict";a.r(t);var n=a("0907"),i=a.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(s);t["default"]=i.a},c41a:function(e,t,a){"use strict";var n=a("7649"),i=a.n(n);i.a},c72c:function(e,t,a){"use strict";var n=a("2268"),i=a.n(n);i.a},e5f4:function(e,t,a){"use strict";a.r(t);var n=a("9bd5"),i=a.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(s);t["default"]=i.a},e6bc:function(e,t,a){"use strict";var n=a("4ea4");a("4de4"),a("a434"),a("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var i=n(a("1da1")),s={getUserVip:function(e){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.getUserInfo().then((function(t){var a=uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:0;if(a||e){var n=t.filter((function(t){return t.type==(e||a)}));return n[0]}return t[0]}));case 2:return n=a.sent,a.abrupt("return",n||{});case 4:case"end":return a.stop()}}),a)})))()},getPartner:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.partner().then((function(e){return e.distributorTypeList}));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})))()},getVipInfo:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getUserInfo().then((function(e){return e=e.splice(1),e}));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})))()},getUserInfo:function(){return(0,i.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var a=setInterval((function(){(uni.getStorageSync("memberConfig")&&uni.getStorageSync("userInfo")&&uni.getStorageSync("sessionId")||uni.getStorageSync("memberConfig")&&!uni.getStorageSync("sessionId"))&&(clearInterval(a),e(JSON.parse(uni.getStorageSync("memberConfig"))))}),200)})));case 1:case"end":return e.stop()}}),e)})))()},partner:function(){return(0,i.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var a=setInterval((function(){uni.getStorageSync("partnerConfig")&&(clearInterval(a),e(JSON.parse(uni.getStorageSync("partnerConfig"))))}),200)})));case 1:case"end":return e.stop()}}),e)})))()}},r=s;t.default=r},ebcf:function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page chooseAddress"},[a("v-uni-view",{staticClass:"opacity"},[e._v(e._s(e.defaultAddressa))]),a("v-uni-view",{staticClass:"selectTitle"},[e._l(e.selectedItems,(function(t,n){return a("v-uni-view",{key:t.id,staticClass:"everyChoose",class:e.tabIndex==n?"active":"",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.tabChange(n)}}},[e._v(e._s(t.fullName))])})),e.level>e.selectedItems.length?a("v-uni-view",{staticClass:"chooseBtn",class:e.tabIndex===e.selectedItems.length?"active":""},[e._v("请选择")]):e._e()],2),a("v-uni-scroll-view",{staticClass:"addrContainer",attrs:{"scroll-y":"true"}},[e._l(e.provinceList,(function(t,n){return 0==e.tabIndex?a("v-uni-view",{key:n,staticClass:"addressList",class:{active:e.selectedItems[e.tabIndex]&&e.selectedItems[e.tabIndex].fullName===t.fullName},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.chooseAddr(0,t)}}},[a("v-uni-view",[e._v(e._s(t.fullName))]),e.selectedItems[e.tabIndex]&&e.selectedItems[e.tabIndex].fullName===t.fullName?a("v-uni-view",{staticClass:"chooseIcon"}):e._e()],1):e._e()})),e._l(e.cityList,(function(t,n){return 1==e.tabIndex?a("v-uni-view",{key:n,staticClass:"addressList",class:{active:e.selectedItems[e.tabIndex]&&e.selectedItems[e.tabIndex].fullName===t.fullName},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.chooseAddr(1,t)}}},[a("v-uni-view",[e._v(e._s(t.fullName))]),e.selectedItems[e.tabIndex]&&e.selectedItems[e.tabIndex].fullName===t.fullName?a("v-uni-view",{staticClass:"chooseIcon"}):e._e()],1):e._e()})),e._l(e.districtList,(function(t,n){return 2==e.tabIndex?a("v-uni-view",{key:n,staticClass:"addressList",class:{active:e.selectedItems[e.tabIndex]&&e.selectedItems[e.tabIndex].fullName===t.fullName},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.chooseAddr(2,t)}}},[a("v-uni-view",[e._v(e._s(t.fullName))]),e.selectedItems[e.tabIndex]&&e.selectedItems[e.tabIndex].fullName===t.fullName?a("v-uni-view",{staticClass:"chooseIcon"}):e._e()],1):e._e()})),e._l(e.townList,(function(t,n){return 3==e.tabIndex?a("v-uni-view",{key:n,staticClass:"addressList",class:{active:e.selectedItems[e.tabIndex]&&e.selectedItems[e.tabIndex].fullName===t.fullName},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.chooseAddr(3,t)}}},[a("v-uni-view",[e._v(e._s(t.fullName))]),e.selectedItems[e.tabIndex]&&e.selectedItems[e.tabIndex].fullName===t.fullName?a("v-uni-view",{staticClass:"chooseIcon"}):e._e()],1):e._e()}))],2)],1)},s=[]},ee48:function(e,t,a){"use strict";var n=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("0627")),s={methods:{uploadImage:function(e,t){var a=this;uni.uploadFile({url:this.$config.addImageUrl+"/base/file/mgmt/addOneImage",filePath:e,name:"image",success:function(e){a.updateImage(JSON.parse(i.default.decrypt(JSON.parse(e.data))),t)},fail:function(e){}})}}};t.default=s}}]);