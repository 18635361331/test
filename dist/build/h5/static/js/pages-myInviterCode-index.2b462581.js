(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-myInviterCode-index"],{"16c4":function(e,t,a){"use strict";a("c975"),a("ac1f"),a("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{isScopedFlag:!1,authorizeFlag:!1}},mounted:function(){},methods:{previewImage:function(){if(this.shareImage.indexOf("http")>-1)uni.downloadFile({url:this.shareImage,success:function(e){200==e.statusCode&&uni.previewImage({urls:[e.tempFilePath],longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){},fail:function(e){}}})},fail:function(e){}});else{var e=this.shareImage.replace(/^data:image\/\w+;base64,/,""),t=wx.env.USER_DATA_PATH+"/hym_pay_qrcode.png";uni.getFileSystemManager().writeFile({filePath:t,data:e,encoding:"base64",success:function(e){uni.previewImage({urls:[t],longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){},fail:function(e){}}})},fail:function(e){}})}},previewDownLoad:function(){this.isScopedFlag=!1,this.getDownLoadScope()},getDownLoadScope:function(){var e=this;this.authorizeFlag?this.downloadFile():uni.authorize({scope:"scope.writePhotosAlbum",success:function(t){e.downloadFile()},fail:function(t){e.isScopedFlag||uni.showModal({title:"警告",content:"您点击了拒绝授权，将无法正常保存图片，点击确定重新获取授权",confirm:function(){e.getDownLoadScope()},cancel:function(){uni.showToast({title:"您点击了取消",icon:"none"})}}),e.isScopedFlag=!0}})},downloadFile:function(){if(this.shareImage.indexOf("http")>-1)uni.downloadFile({url:this.shareImage,success:function(e){200==e.statusCode?uni.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(e){uni.showToast({title:"保存成功",icon:"none"})},fail:function(e){uni.showToast({title:"您取消了保存",icon:"none"})}}):uni.showToast({title:"临时文件生成失败",icon:"none"})}});else{var e=this.shareImage.replace(/^data:image\/\w+;base64,/,""),t=wx.env.USER_DATA_PATH+"/hym_pay_qrcode.png";uni.getFileSystemManager().writeFile({filePath:t,data:e,encoding:"base64",success:function(e){uni.saveImageToPhotosAlbum({filePath:t,success:function(e){uni.showToast({title:"保存成功",icon:"none"})},fail:function(e){uni.showToast({title:"临时文件生成失败",icon:"none"})}})},fail:function(e){uni.showToast({title:"临时文件生成失败",icon:"none"})}})}},uniGetSetting:function(){var e=this;uni.getSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"],e.authorizeFlag=!1},fail:function(e){}})}}};t.default=n},"205f":function(e,t,a){var n=a("4bad");t=n(!1),t.push([e.i,".commonPageTitle[data-v-6a172e18]{min-height:100vh;\npadding-top:%?88?%;\nbackground-color:#fef4e8;padding-bottom:%?100?%}.shareImage[data-v-6a172e18]{width:100%;height:auto}.shareMemberBtn[data-v-6a172e18]{width:100%;height:calc(constant(safe-area-inset-bottom) + %?86?%);height:calc(env(safe-area-inset-bottom) + %?86?%);background-color:#fff;position:fixed;bottom:0;left:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.btn[data-v-6a172e18]{width:%?300?%;height:%?74?%;position:relative;text-align:center;line-height:%?74?%;border-radius:%?37?%}.shareBtn[data-v-6a172e18]{background:-webkit-linear-gradient(209deg,#e61446,#fb5a8b);background:linear-gradient(241deg,#e61446,#fb5a8b);color:#fff}.saveBtn[data-v-6a172e18]{border:%?1?% solid #666;color:#666}.shareButton[data-v-6a172e18]{width:100%;height:100%;position:absolute;left:0;top:0;opacity:0}",""]),e.exports=t},"4f90":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page commonPageTitle"},[a("defaultTitle",{staticClass:"defaultTitleInterCode",attrs:{dto:e.defaultTitleDto}}),a("v-uni-view",{staticClass:"shareImage"},[a("v-uni-image",{attrs:{src:e.shareImage,mode:"widthFix"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.previewImage.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"shareMemberBtn"},[a("v-uni-view",{staticClass:"saveBtn btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getDownLoadScope.apply(void 0,arguments)}}},[e._v("生成分享海报")]),a("v-uni-view",{staticClass:"shareBtn btn"},[e._v("分享好友"),a("v-uni-button",{staticClass:"shareButton",attrs:{type:"default","open-type":"share"}})],1)],1)],1)},o=[]},"6c78":function(e,t,a){"use strict";var n=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("16c4")),o=n(a("92c6")),s={mixins:[i.default],data:function(){return{defaultTitleDto:{title:"邀请会员"},wxShare:{title:"",path:""},imgBaseUrls:"",shareImage:""}},methods:{generateInviteMemberPoster:function(){var e=this;o.default.generateInviteMemberPoster().then((function(t){200==t.data.code?e.shareImage=e.imgBaseUrls+t.data.data:uni.showToast({title:t.data.message,icon:"none"})}))}},onShareAppMessage:function(e){var t=JSON.parse(uni.getStorageSync("userInfo"));this.wxShare.title="["+(t.nickName?t.nickName:t.telephone)+"@你]快来成为文器库会员！！！";var a=uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"";return this.wxShare.path="/pages/memberGiftBag/index?shareNumber="+a,console.log(a),this.wxShare},onShow:function(){this.zhuge.track("邀请新会员-落地页"),this.imgBaseUrls=this.$config.imgBaseUrl,this.generateInviteMemberPoster()}};t.default=s},8766:function(e,t,a){"use strict";a.r(t);var n=a("4f90"),i=a("af8f");for(var o in i)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(o);a("e6cc");var s,c=a("f0c5"),r=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"6a172e18",null,!1,n["a"],s);t["default"]=r.exports},a47a:function(e,t,a){var n=a("205f");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("0b36ce13",n,!0,{sourceMap:!1,shadowMode:!1})},af8f:function(e,t,a){"use strict";a.r(t);var n=a("6c78"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=i.a},e6cc:function(e,t,a){"use strict";var n=a("a47a"),i=a.n(n);i.a}}]);