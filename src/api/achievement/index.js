import api from './url.js';
import request from '@/utils/request.js'
export default {
	superVList(params){	//获取超v会员商品列表
		return request.post(api.superVList,params)
	},
	isNovaItem(itemId){	//判断商品是不是超v礼包
		return request.post(api.isNovaItem+"?itemId="+itemId,{})
	},
	memberAchievement(){	//收入中心
		return request.post(api.memberAchievement,{})
	}
}