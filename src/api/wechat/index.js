import api from './url.js';
import request from '@/utils/request.js'
export default {
	wxPubAppId(){	//获取公众号appid
		return request.post(api.wxPubAppId,{})
	},
	jsSdkAuth(url){	//微信h5分享参数
		return request.get(api.jsSdkAuth,{params:{url}})
	},
	wechatTemplates(eventCode){	//小程序推送消息
		return request.post(api.wechatTemplates,{eventCode})
	}
}