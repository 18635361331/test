(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/publishEvaluate/index"],{"0df7":function(t,e,a){"use strict";var s=a("545a"),i=a.n(s);i.a},"0fda":function(t,e,a){"use strict";var s;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return s}));var i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e,a,s,i){var o=arguments[arguments.length-1].currentTarget.dataset,n=o.eventParams||o["event-params"];a=n.item,s=n.i,i=n.index;e.stopPropagation(),!t.$Route.query.status&&t.goodsReputation(a,s,i)},t.e1=function(e,a){var s=arguments[arguments.length-1].currentTarget.dataset,i=s.eventParams||s["event-params"];a=i.index;t.storeEvaluate.describe=a+1},t.e2=function(e,a){var s=arguments[arguments.length-1].currentTarget.dataset,i=s.eventParams||s["event-params"];a=i.index;t.storeEvaluate.logistics=a+1},t.e3=function(e,a){var s=arguments[arguments.length-1].currentTarget.dataset,i=s.eventParams||s["event-params"];a=i.index;t.storeEvaluate.service=a+1},t.e4=function(e){t.$Route.query.status?t.addGoodsSkuAppendComment():t.addGoodsSkuCommentDto()})},o=[]},"22fa":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(a("1087")),i=n(a("d084")),o=n(a("ee48"));function n(t){return t&&t.__esModule?t:{default:t}}function d(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var r={mixins:[o.default],data:function(){return{params:{},imgBaseUrls:"",starsLevel:{1:"愤怒",2:"失望",3:"一般",4:"不错",5:"很棒"},storeEvaluate:{describe:5,logistics:5,service:5},updateImgList:[],defaultTitleDto:{title:"",bottomColor:"#E6E6E6"}}},onShow:function(){var e=this.$Route.query.status?"发表追评":"发表评论";t.setNavigationBarTitle({title:e}),this.defaultTitleDto.title=e,this.zhuge.track("评价-落地页")},onLoad:function(){this.imgBaseUrls=this.$config.imgBaseUrl,this.$Route.query.status?this.appendEvaluate():this.evaluateGoods()},methods:{evaluateGoods:function(){var e=this;s.default.evaluateGoods(this.$Route.query.orderId).then((function(a){if(200==a.data.code){for(var s=0;s<a.data.data.length;s++)a.data.data[s].goodsReputation=5,a.data.data[s].updateImgList=[],e.$set(a.data.data[s],"description",a.data.data[s].description?a.data.data[s].description:"");e.params=a.data.data}else t.showToast({title:a.data.message,icon:"none"})}))},appendEvaluate:function(){var e=this;s.default.appendEvaluate(this.$Route.query.orderId).then((function(a){if(200==a.data.code){for(var s=0;s<a.data.data.length;s++)a.data.data[s].updateImgList=[],e.$set(a.data.data[s],"description",a.data.data[s].description?a.data.data[s].description:"");e.params=a.data.data}else t.showToast({title:a.data.message,icon:"none"})}))},goodsReputation:function(t,e,a){this.$set(this.params[a],"goodsReputation",e+1)},chooseimage:function(e){var a=this;t.chooseImage({count:6,success:function(t){t.tempFiles=t.tempFiles.slice(0,6-e.updateImgList.length);for(var s=0;s<t.tempFiles.length;s++)a.uploadImage(t.tempFiles[s].path,e)}})},updateImage:function(t,e){e.updateImgList.push(t.data);for(var a=0;a<this.params.length;a++)this.params[a].itemId==e.itemId&&(this.params[a].updateImgList=e.updateImgList)},clearImage:function(t,e){t.splice(e,1)},addGoodsSkuAppendComment:function(){for(var e=this,a={orderId:this.$Route.query.orderId,details:[]},s=0;s<this.params.length;s++){if(!this.params[s].description)return void t.showToast({title:"请填写评价内容",icon:"none"});a.details.push({itemId:this.params[s].itemId,skuId:this.params[s].skuId,text:this.params[s].description,images:this.params[s].updateImgList})}i.default.addGoodsSkuAppendComment(a).then((function(a){200==a.data.code?e.$Router.replace({path:"/pages/commentSuccess/index",query:{status:1}}):t.showToast({title:a.data.message,icon:"none"})}))},addGoodsSkuCommentDto:function(){for(var e=this,a=[],s=[],o=0;o<this.params.length;o++){var n;s=[];for(var r=0;r<this.params[o].updateImgList.length;r++)s.push({image:this.params[o].updateImgList[r]});a.push((n={skuId:this.params[o].skuId,orderId:this.$Route.query.orderId,goodsLevel:this.params[o].goodsReputation,goodsSkuCommentPictureDtos:s,member:1,isImage:this.params[o].updateImgList.length?1:0,serveLevel:this.storeEvaluate.service,logisticsLevel:this.storeEvaluate.logistics},d(n,"goodsLevel",this.storeEvaluate.describe),d(n,"description",this.params[o].description),d(n,"orderDetailId",this.params[o].orderDetailId),n))}i.default.addGoodsSkuCommentDto(a).then((function(a){200==a.data.code?e.$Router.push({path:"/pages/commentSuccess/index"}):t.showToast({title:a.data.message,icon:"none"})}))}}};e.default=r}).call(this,a("543d")["default"])},"50d3":function(t,e,a){"use strict";(function(t){a("6cdc");s(a("66fd"));var e=s(a("e046"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"545a":function(t,e,a){},b08e:function(t,e,a){"use strict";a.r(e);var s=a("22fa"),i=a.n(s);for(var o in s)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return s[t]}))}(o);e["default"]=i.a},e046:function(t,e,a){"use strict";a.r(e);var s=a("0fda"),i=a("b08e");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("0df7");var n,d=a("f0c5"),r=Object(d["a"])(i["default"],s["b"],s["c"],!1,null,"b024a722",null,!1,s["a"],n);e["default"]=r.exports}},[["50d3","common/runtime","common/vendor"]]]);