import api from './url.js';
import request from '@/utils/request.js'
export default {
	getStore(storeid){	//获取店铺信息
		return request.post(api.getStore+storeid)
	},
	selectMerchantFollowDetailsList(storeId){	//店铺基本信息
		return request.post(api.selectMerchantFollowDetailsList+storeId)
	},
	cancelFollowByMemberIdAndStoreId(storeId){	//取消关注
		return request.post(api.cancelFollowByMemberIdAndStoreId,{storeId})
	},
	addMerchantFollow(storeId){	//关注店铺
		return request.post(api.addMerchantFollow,{storeId})
	},
	selectMerchantFollowList(params){	//关注店铺列表
		return request.post(api.selectMerchantFollowList,params)
	},
	merchantBasicInfo(storeId){	//店铺印象信息
		return request.post(api.merchantBasicInfo+storeId,{})
	},
	merchGetVerifyCode(){	//获取营业执照验证码
		return request.post(api.merchGetVerifyCode,{})
	},
	checkVerifyCode(params){	//校验营业执照验证码
		return request.post(api.checkVerifyCode,params)
	}
}