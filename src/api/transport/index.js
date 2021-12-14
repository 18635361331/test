import api from './url.js';
import request from '@/utils/request.js'
export default {
	getExpressageInfo(orderId){	//获取物流信息
		return request.post(api.getExpressageInfo,{orderId})
	},
	getLogistics(){	//获取快递公司
		return request.post(api.getLogistics,{})
	},
	getReturnExpressageInfo(params){	//退款
		return request.post(api.getReturnExpressageInfo,params)
	}
}