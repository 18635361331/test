(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsDetails/container"],{"12fa":function(t,s,o){},"1ecc":function(t,s,o){"use strict";o.d(s,"b",(function(){return i})),o.d(s,"c",(function(){return n})),o.d(s,"a",(function(){return e}));var e={uniPopup:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup")]).then(o.bind(null,"1c89"))}},i=function(){var t=this,s=t.$createElement,o=(t._self._c,t.goodsInfo.freight.amount>0?null:t.freightString.indexOf(t.goodsInfoId));t.$mp.data=Object.assign({},{$root:{g0:o}})},n=[]},"4e30":function(t,s,o){"use strict";o.r(s);var e=o("1ecc"),i=o("e870");for(var n in i)["default"].indexOf(n)<0&&function(t){o.d(s,t,(function(){return i[t]}))}(n);o("e5df");var a,r=o("f0c5"),c=Object(r["a"])(i["default"],e["b"],e["c"],!1,null,"6e2710ae",null,!1,e["a"],a);s["default"]=c.exports},e5df:function(t,s,o){"use strict";var e=o("12fa"),i=o.n(e);i.a},e870:function(t,s,o){"use strict";o.r(s);var e=o("fa60"),i=o.n(e);for(var n in e)["default"].indexOf(n)<0&&function(t){o.d(s,t,(function(){return e[t]}))}(n);s["default"]=i.a},fa60:function(t,s,o){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var e=r(o("a34a")),i=r(o("92c6")),n=r(o("5315")),a=r(o("e6bc"));function r(t){return t&&t.__esModule?t:{default:t}}function c(t,s,o,e,i,n,a){try{var r=t[n](a),c=r.value}catch(u){return void o(u)}r.done?s(c):Promise.resolve(c).then(e,i)}function u(t){return function(){var s=this,o=arguments;return new Promise((function(e,i){var n=t.apply(s,o);function a(t){c(n,e,i,a,r,"next",t)}function r(t){c(n,e,i,a,r,"throw",t)}a(void 0)}))}}var h=function(){o.e("pages/goodsDetails/skuChoose").then(function(){return resolve(o("52d2"))}.bind(null,o)).catch(o.oe)},d=function(){o.e("pages/goodsDetails/addressList").then(function(){return resolve(o("2b4c"))}.bind(null,o)).catch(o.oe)},f={props:["goodsInfo","chooseSpceData","seckillInfo","memberInfo","singleProduct","goodsInfoId","increaseFlag"],data:function(){return{guaranteeList:[{name:"正品保障"},{name:"极速发货"},{name:"售后无忧"},{name:"闪电退款"}],chooseAddress:{},addressList:[],increaseReceive:!1,freightString:""}},methods:{calcGoodsFreight:function(){var s=this,o={provinceId:this.chooseAddress.provinceId,cityId:this.chooseAddress.cityId,countyId:this.chooseAddress.countyId,townId:this.chooseAddress.townId,itemId:this.goodsInfoId,skuId:this.chooseSpceData.skuId,number:this.chooseSpceData.number};i.default.calcGoodsFreight(o).then((function(o){200==o.data.code?(s.goodsInfo.freight.amount=o.data.data.amount,s.goodsInfo.freight.canBuy=o.data.data.canBuy,s.updateMsg(s.goodsInfo,s.chooseSpceData)):t.showToast({title:o.data.message,icon:"none"})}))},getAddressList:function(){var s=this;n.default.addressList().then((function(o){if(200==o.data.code){if(o.data.data){s.addressList=o.data.data;for(var e=0;e<s.addressList.length;e++)if(s.addressList[e].isDefault)return void(s.chooseAddress=s.addressList[e])}}else t.showToast({title:o.data.message,icon:"none"})}))},openSkuPopup:function(){this.increaseReceive=!1,this.$Route.query.transferOrderId&&(this.increaseReceive=!0),2==this.goodsInfo.status&&this.goodsInfo.stockNumber<=0&&!this.goodsInfo.frozenFlag&&!this.increaseReceive?t.showToast({title:"商品暂时缺货",icon:"none"}):(this.$emit("changeIncreaseFlag",!0),this.$refs.skuPopup.open())},openSku:function(){this.$refs.skuPopup.open()},openAddrPopup:function(){this.$refs.addressPopup.open()},closeSkuPopup:function(){this.$refs.skuPopup.close()},addressChange:function(t){this.chooseAddress=t,this.$refs.addressPopup.close(),this.calcGoodsFreight()},initSpecVal:function(){var t=this;if(this.chooseSpceData.stockNumber=this.goodsInfo.stockNumber,0!=this.goodsInfo.stockNumber)if(this.goodsInfo.attrSpecList.length){for(var s=0;s<this.goodsInfo.attrSpecList.length;s++)1==this.goodsInfo.attrSpecList[s].valueDTOList.length?(this.$set(this.goodsInfo.attrSpecList[s],"chooseAttrValueId",this.goodsInfo.attrSpecList[s].valueDTOList[0].attrValueId),this.$set(this.goodsInfo.attrSpecList[s],"chooseAttrValue",this.goodsInfo.attrSpecList[s].valueDTOList[0].attrValue),this.chooseSpceData.checkList.push(this.goodsInfo.attrSpecList[s].valueDTOList[0].attrValue)):(this.$set(this.goodsInfo.attrSpecList[s],"chooseAttrValueId",null),this.$set(this.goodsInfo.attrSpecList[s],"chooseAttrValue",null),this.chooseSpceData.checkList.push(null));this.setSpceName()}else this.setSkuInfo(0),this.chooseSpceData.skuId=this.goodsInfo.skuList[0].skuId;this.$nextTick((function(){t.updateMsg(t.goodsInfo,t.chooseSpceData)}))},setSpceName:function(){var t=this,s=this.skuArrNullNum(this.chooseSpceData.checkList);if(0==s)this.$set(this.chooseSpceData,"name","已选："+this.chooseSpceData.checkList.join(" "));else{this.$set(this.chooseSpceData,"name","请选择");for(var o=0;o<this.goodsInfo.attrSpecList.length;o++)this.goodsInfo.attrSpecList[o].chooseAttrValue||this.$set(this.chooseSpceData,"name",this.chooseSpceData.name+this.goodsInfo.attrSpecList[o].attrName)}this.goodsInfo.skuList.length&&(this.resetFlag(),this.stcokFlagSet()),this.$nextTick((function(){t.updateMsg(t.goodsInfo,t.chooseSpceData)}))},resetFlag:function(){for(var t in this.goodsInfo.attrSpecList)for(var s in this.goodsInfo.attrSpecList[t].valueDTOList)this.$set(this.goodsInfo.attrSpecList[t].valueDTOList[s],"flag",!1)},stcokFlagSet:function(){for(var t=this,s=[],o=-1,e=0;e<this.goodsInfo.attrSpecList.length;e++)this.goodsInfo.attrSpecList[e].chooseAttrValueId?s.push(this.goodsInfo.attrSpecList[e].chooseAttrValueId):o=e;if(1==this.skuArrNullNum(this.chooseSpceData.checkList)&&this.checkStockNumber(s,o),0==this.skuArrNullNum(this.chooseSpceData.checkList))for(var i=JSON.parse(JSON.stringify(s)),n=0;n<this.goodsInfo.skuList.length;n++)this.goodsInfo.skuList[n].attrValueDTOList&&function(){var e=t.goodsInfo.skuList[n].attrValueDTOList.map((function(t){return t.attrValueId}));s.filter((function(t){return e.indexOf(t)>-1})).length==s.length&&(parseInt(t.goodsInfo.skuList[n].stockNumber)>0&&1==t.goodsInfo.skuList[n].status?(t.setSkuInfo(n),s.length>0&&(i.splice(o,1),t.checkStockNumber(i,t.goodsInfo.attrSpecList.length-1))):t.cancelSetSpce(t.goodsInfo.attrSpecList.length-1))}()},cancelSetSpce:function(t){var s=this;this.goodsInfo.attrSpecList[t].chooseAttrValueId="",this.goodsInfo.attrSpecList[t].chooseAttrValue="",this.chooseSpceData.checkList[t]=null,this.chooseSpceData.stockNumber=this.goodsInfo.stockNumber,this.chooseSpceData.price=0,this.chooseSpceData.skuId="",this.setSpceName(),this.stcokFlagSet(),this.$nextTick((function(){s.updateMsg(s.goodsInfo,s.chooseSpceData)}))},checkStockNumber:function(t,s){for(var o=this,e=0;e<this.goodsInfo.skuList.length;e++){var i,n;if(this.goodsInfo.skuList[e].attrValueDTOList)(function(){var a=o.goodsInfo.skuList[e].attrValueDTOList.map((function(t){return t.attrValueId}));if(t.filter((function(t){return a.indexOf(t)>-1})).length==t.length||0==t.length)for(i in o.goodsInfo.skuList[e].attrValueDTOList)if(o.goodsInfo.skuList[e].attrValueDTOList[i].attrId==o.goodsInfo.attrSpecList[s].attrId)for(n in o.goodsInfo.attrSpecList[s].valueDTOList)o.goodsInfo.attrSpecList[s].valueDTOList[n].attrValueId==o.goodsInfo.skuList[e].attrValueDTOList[i].attrValueId&&(o.goodsInfo.skuList[e].stockNumber<=0||0==o.goodsInfo.skuList[e].status)&&o.$set(o.goodsInfo.attrSpecList[s].valueDTOList[n],"flag",!0)})()}this.updateMsg(this.goodsInfo,this.chooseSpceData)},setSkuInfo:function(t){if(this.goodsInfo.skuList[t]){if(this.$set(this.chooseSpceData,"price",this.goodsInfo.skuList[t].price),4==this.memberInfo.plusFlag)for(var s=0;s<this.goodsInfo.skuList[t].distributorPriceList.length;s++)this.goodsInfo.skuList[t].distributorPriceList[s].type==this.memberInfo.distributorType&&this.$set(this.chooseSpceData,"memberPrice",this.goodsInfo.skuList[t].distributorPriceList[s].price);else if(this.memberInfo.plusFlag)for(var o=0;o<this.goodsInfo.skuList[t].newtypePriceList.length;o++)this.goodsInfo.skuList[t].newtypePriceList[o].type==this.memberInfo.plusFlag&&this.$set(this.chooseSpceData,"memberPrice",this.goodsInfo.skuList[t].newtypePriceList[o].price);if(this.$set(this.chooseSpceData,"marketPrice",this.goodsInfo.skuList[t].marketPrice),this.$set(this.chooseSpceData,"skuId",this.goodsInfo.skuList[t].skuId),this.$set(this.chooseSpceData,"stockNumber",parseInt(this.goodsInfo.skuList[t].stockNumber)),this.goodsInfo.showAttrId)for(var e=0;e<this.goodsInfo.attrSpecList.length;e++)if(this.goodsInfo.attrSpecList[e].attrId==this.goodsInfo.showAttrId)for(var i=0;i<this.goodsInfo.attrSpecList[e].valueDTOList.length;i++)for(var n=0;n<this.chooseSpceData.checkList.length;n++)this.goodsInfo.attrSpecList[e].valueDTOList[i].attrValue==this.chooseSpceData.checkList[n]&&this.$set(this.chooseSpceData,"saleImage",this.goodsInfo.attrSpecList[e].valueDTOList[i].picUrl)}this.updateMsg(this.goodsInfo,this.chooseSpceData)},setDefaultSpec:function(t){for(var s=0;s<this.goodsInfo.skuList.length;s++)if(this.goodsInfo.skuList[s].skuId==t){this.setSkuInfo(s);for(var o=0;o<this.goodsInfo.skuList[s].attrValueDTOList.length;o++)for(var e=0;e<this.goodsInfo.attrSpecList.length;e++)this.goodsInfo.attrSpecList[e].attrId==this.goodsInfo.skuList[s].attrValueDTOList[o].attrId&&(this.$set(this.goodsInfo.attrSpecList[e],"chooseAttrValueId",this.goodsInfo.skuList[s].attrValueDTOList[o].attrValueId),this.$set(this.goodsInfo.attrSpecList[e],"chooseAttrValue",this.goodsInfo.skuList[s].attrValueDTOList[o].attrValue),this.chooseSpceData.checkList[e]=this.goodsInfo.skuList[s].attrValueDTOList[o].attrValue)}this.goodsInfo.attrSpecList.length||this.setSkuInfo(0),this.setSpceName()},skuArrNullNum:function(t){var s=0;for(var o in t)t[o]||s++;return s},updateMsg:function(t,s){this.$emit("updateSku",s),this.$emit("UpdateGoodsInfo",t)},addCart:function(){this.$emit("addCart")},bugNow:function(){this.$emit("bugNow")}},mounted:function(){var s=this;return u(e.default.mark((function o(){var i;return e.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return s.increaseReceive=!1,s.$Route.query.transferOrderId&&(s.increaseReceive=!0),t.getStorageSync("sessionId")&&s.getAddressList(),s.$Route.query.skuId?s.setDefaultSpec(s.goodsInfo.savePromotionSkuId?s.goodsInfo.savePromotionSkuId:s.$Route.query.skuId):s.initSpecVal(),o.next=6,a.default.getUserVip();case 6:i=JSON.parse(t.getStorageSync("miniRouter")).freightString,s.freightString=i||"";case 8:case"end":return o.stop()}}),o)})))()},components:{skuChoose:h,addressListTemp:d}};s.default=f}).call(this,o("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goodsDetails/container-create-component',
    {
        'pages/goodsDetails/container-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4e30"))
        })
    },
    [['pages/goodsDetails/container-create-component']]
]);
