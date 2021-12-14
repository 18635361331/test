export default {
	methods:{
		// initWeiXinQiyu(){	//初始化小程序客服信息
		// 	let myPluginInterface = requirePlugin('qiyu-plugins');
		// 	let appId = 'NcJyGZOCmMB';
		// 	myPluginInterface.__configAppId(appId);  // 不是微信的appId，是七鱼后台生成的appId
		// 	myPluginInterface._$configAppKey('10aed8b44d059dd84aee0d207c90f313'); // 申请企业的appKey
		// },
		openKefu(qiyuKefuGroupId){
			uni.navigateTo({
				url:"/pages/webView/index?url=https://mobile.beifamall.com/qiyu.html"
			})
			uni.setStorageSync("webViewQuery","?sessionId="+uni.getStorageSync("sessionId")+"&qiyuKefuGroupId="+qiyuKefuGroupId)
			// this.$Router.push({
			// 	path:"",
			// 	query:{
			// 		url:"https://mobile.beifamall.com/qiyu.html"
			// 	}
			// })
			// uni.navigateTo({url:"plugin://qiyu-plugins/chat"})
		}
	},
	mounted(){
		// this.initWeiXinQiyu()
	}
}