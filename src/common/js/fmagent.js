// #ifdef MP-WEIXIN
import FMAgent from '@/static/fmsdk-1.5.8/fm-1.5.8-es.min.js'
// #endif
export default{
	data(){
		return{
			hideFMCanvas:true
		}
	},
	methods:{
		setData(obj){
			// #ifdef MP-WEIXIN
			let that = this;    
			let keys = [];    
			let val,data;    
			Object.keys(obj).forEach(function(key){    
				keys = key.split('.');    
				val = obj[key];    
				data = that.$data;    
				keys.forEach(function(key2,index){    
					if(index+1 == keys.length){    
						that.$set(data,key2,val);    
					}else{    
						if(!data[key2]){    
							that.$set(data,key2,{});    
						}    
					}    
					data = data[key2];    
				})    
			});    
			// #endif
		},
		fmagentInit(){
			// #ifdef MP-WEIXIN
				let _this = this;
				let _fmOpt = {
					partnerCode: "beifa", // 请填入您的partner code
					appName: "beifa_xcx", // 请填入您的app name
				}
				if(this.$config.addImageUrl=="https://api.beifamall.com"){
					_fmOpt.env = "PRODUCTION"
				}
				let fmagent = new FMAgent(_fmOpt);
				fmagent.getInfo({
					page: _this, // 请传入FMAgent所在的Page或Component对象
					openid: '', // 请传入加密的用户openid
					// 如果您开通了unionid功能，请传入加密的用户unionid，
					// 否则留空即可
					unionid: '', 
					success: function (res) {
						uni.setStorageSync('fmagent',res)
					// 成功回调，res为blackbox字符串
					},
					fail: function (res) {
					// 失败回调，res为各种exception对象
					},
					complete: function (res) {
					}
				})
			// #endif
		}
	}
}