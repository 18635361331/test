import api from './url.js';
import request from '@/utils/request.js'
export default{
	buildMiniPrepPaySign(params){	//获取微信小程序支付信息
		return request.post(api.buildMiniPrepPaySign,params)
	},
	buildPrepPaySign(params){	//微信公众号支付
		return request.post(api.buildPrepPaySign,params)
	}
}