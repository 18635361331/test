import  wechatApi from "@/api/wechat/index.js"
export default {
	methods:{
		requestSubscribeMessage(type){	//微信订阅消息   接受订阅id
			wechatApi.wechatTemplates(type).then(res=>{
				if(res.data.code==200 && res.data.data && res.data.data.length){
					uni.requestSubscribeMessage({
						tmplIds: res.data.data,
						success (res) { 
						},
						fail(){//订阅失败回调
							
						}
					})
				}else{
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
				}
			})
			
		}
	}
}