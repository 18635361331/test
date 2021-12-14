import api from './url.js';
import request from '@/utils/request.js'
export default {
	novaGetInviterInfo(params){	//获取超v会员商品列表
		return request.post(api.novaGetInviterInfo,params)
	},
}