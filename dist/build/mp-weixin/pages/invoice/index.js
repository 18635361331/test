(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/invoice/index"],{"1c6b":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(i("5315"));function o(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{defaultTitleDto:{title:"发票管理"},tab:0,invoice:{invoiceType:1,title:"",taxpayerNo:"",address:"",telephone:"",openBank:"",account:""},invoiceDef:{invoiceType:0,title:"",taxpayerNo:""},isDisabled:!1}},onShow:function(){this.getInvoiceDetail()},methods:{judge:function(){if(1==this.tab){for(var e in this.invoice)if(!String(this.invoice[e]))return void t.showToast({title:"请检查信息是否填写完整",icon:"none"});this.invoice.id?this.updateInvoice(this.invoice):this.createInvoice(this.invoice)}else{for(var i in this.invoiceDef)if(!String(this.invoiceDef[i]))return void t.showToast({title:"请检查信息是否填写完整",icon:"none"});this.invoiceDef.id?this.updateInvoice(this.invoiceDef):this.createInvoice(this.invoiceDef)}},createInvoice:function(e){var i=this;n.default.createInvoice(e).then((function(e){200==e.data.code?(t.showToast({title:"创建成功",icon:"none"}),i.getInvoiceDetail()):t.showToast({title:e.data.message,icon:"none"})}))},updateInvoice:function(e){var i=this;n.default.updateInvoice(e).then((function(e){200==e.data.code?(t.showToast({title:"修改成功",icon:"none"}),i.getInvoiceDetail()):t.showToast({title:e.data.message,icon:"none"})}))},getInvoiceDetail:function(){var e=this;t.showLoading({title:"加载中..."}),n.default.getInvoiceDetail(this.tab).then((function(i){t.hideLoading(),200==i.data.code?i.data.data?(1==e.tab?e.invoice=i.data.data:e.invoiceDef=i.data.data,e.isDisabled=!0):e.isDisabled=!1:t.showToast({title:i.data.message,icon:"none"})}))}}};e.default=a}).call(this,i("543d")["default"])},"2ba6":function(t,e,i){"use strict";i.r(e);var n=i("1c6b"),o=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},6191:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.tab=0,t.getInvoiceDetail()},t.e1=function(e){t.tab=1,t.getInvoiceDetail()})},a=[]},"9dfc":function(t,e,i){"use strict";(function(t){i("6cdc");n(i("66fd"));var e=n(i("e40e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},a0f7:function(t,e,i){"use strict";var n=i("b013"),o=i.n(n);o.a},b013:function(t,e,i){},e40e:function(t,e,i){"use strict";i.r(e);var n=i("6191"),o=i("2ba6");for(var a in o)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("a0f7");var c,s=i("f0c5"),u=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"60ba5d45",null,!1,n["a"],c);e["default"]=u.exports}},[["9dfc","common/runtime","common/vendor"]]]);