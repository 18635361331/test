import api from './url.js';
import request from '@/utils/request.js'
export default {
	lotteryStatus(){	//会员权益是否使用
		return request.post(api.lotteryStatus,{})
	}
}