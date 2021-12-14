import request from '@/utils/request.js'
import api from './url.js';
export default {
	getPrivilegeCardSummary(){	//获取会员权益卡基本信息
		return request.post(api.getPrivilegeCardSummary,{})
	},
	getSinglePrivilegeCardNo(){	//会员获取随机单个权益码
		return request.post(api.getSinglePrivilegeCardNo,{})
	},
	activePrivilegeCard(cardNo){	//会员商激活权益码
		return request.post(api.activePrivilegeCard,{cardNo})
	},
	generatePrivilegeCardPoster(){	//会员商生成权益卡分享海报
		return request.post(api.generatePrivilegeCardPoster,{})
	},
}