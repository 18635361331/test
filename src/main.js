import Vue from 'vue'
import App from './App'
import router from './router/index.js';
import config from './config/index.js';
import utils from './utils/utils.js';
import back from '@/common/js/goBack.js'
import {zhuge,mixins} from 'zg-sdk-uniapp';
import {RouterMount} from 'uni-simple-router';
// #ifdef H5
import jweixin from 'jweixin-module';
Vue.prototype.$wxShare = jweixin
// #endif
//微信小程序分享
import wxShareMixin from '@/common/js/wxShareMixin.js'
import defaultTitle from '@/components/defaultTitle/index.vue'
Vue.component("defaultTitle", defaultTitle);//全局自定义组件


Vue.config.productionTip = false;
Vue.prototype.$config = config;
Vue.prototype.$utils = utils;
App.mpType = 'app';
const app = new Vue({
	...App
})

// 微信分享
Vue.mixin(wxShareMixin)
Vue.mixin(back)

// 诸葛io
Vue.prototype.zhuge = zhuge
Vue.mixin(mixins);
zhuge.load("6e049bc0a4a4454f88297d6f6f11268a",{
	serverUrl:{
		normal:"https://iodata.beifamall.com"
	}	
})



// #ifdef H5
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
