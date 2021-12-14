export default{
	data(){
		return{
			wxShare:{
				title:"文器库商城",
				path:"",
				// imageUrl:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/WechatIMG30.png",
			}
		}
	},
	onShareAppMessage(res) { //发送给朋友
		let routes = getCurrentPages()
		let options = routes[routes.length - 1].options;
		let shareNumber = uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):""
		this.wxShare.path = "/"+routes[routes.length - 1].route+"?shareNumber=" + shareNumber;
		for(let i in options){
			this.wxShare.path+="&"+i+"="+options[i];
		}
		return this.wxShare
	},
	onShareTimeline(res) {//分享到朋友圈
		let routes = getCurrentPages()
		let options = routes[routes.length - 1].options;
		let shareNumber = uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):""
		this.wxShare.path = "/"+routes[routes.length - 1].route+"?shareNumber=" + shareNumber;
		for(let i in options){
			this.wxShare.path+="&"+i+"="+options[i];
		}
		return this.wxShare
	},
	methods:{
		shareJudge(){
			if(this.$Route.query.shareNumber){
				uni.setStorageSync("routerShareNumber",this.$Route.query.shareNumber)
			}
		},
		wxShareH5(){
			this.$wxShare.ready(()=>{
				// 分享到朋友圈
				this.$wxShare.onMenuShareTimeline({
					title: this.wxShare.title, // 分享标题
					link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: this.wxShare.imageUrl, // 分享图标
					success: function () {
					}
				});
				this.$wxShare.onMenuShareAppMessage({
					title: this.wxShare.title, // 分享标题
					desc: '我的时尚生活 GET A LIFE', // 分享描述
					link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: this.wxShare.imageUrl, // 分享图标
					success: function () {
					}
				});
			});
			

		}
	},
	mounted(){			//plus分享code
		this.shareJudge();
		// #ifdef H5
		let pages = getCurrentPages()
		if(uni.getStorageSync("wxShareUrl")!=window.location.href){
			this.wxShareH5();
			uni.setStorageSync("wxShareUrl",window.location.href)
		}
		// #endif
	}
}