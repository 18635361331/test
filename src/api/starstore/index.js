import api from './url.js';
import request from '@/utils/request.js'
export default {
	canUseCount(){	//待使用星店优惠券数量
		return request.post(api.canUseCount)
	}
}