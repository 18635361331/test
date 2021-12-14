import api from './url.js';
import request from '@/utils/request.js'
export default {
	getTotalAndBeExpireGoldInfo(){	//获取库豆
		return request.post(api.getTotalAndBeExpireGoldInfo)
	},
	getGoldDetailInfo(params){	//库豆明细
		return request.post(api.getGoldDetailInfo,params)
	}
}