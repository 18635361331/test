import api from './url.js';
import request from '@/utils/request.js'
export default {
	withdrawInfo(){	//用户提现信息
		return request.post(api.withdrawInfo,{})
	},
	sendCaptcha(){	//发送提现短信验证码
		return request.post(api.sendCaptcha,{})
	},
	apply(params){	//申请提现
		return request.post(api.apply,params)
	},
	pageWithdrawApplys(params){	//提现记录
		return request.post(api.pageWithdrawApplys,params)
	}
}