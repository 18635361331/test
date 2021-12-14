import api from './url.js';
import request from '@/utils/request.js'
export default {
	provices(){	//获取一级地址
		return request.post(api.provices,{})
	},
	cities(id){	//获取二级地址
		return request.post(api.cities+id,{})
	},
	counties(id){	//获取三级地址
		return request.post(api.counties+id,{})
	},
	towns(id){	//获取四级地址
		return request.post(api.towns+id,{})
	}
}