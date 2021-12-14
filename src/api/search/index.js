import api from './url.js';
import request from '@/utils/request.js'
export default {
	searchCustom(searchParams,pageInfo){	//查询商品列表
		return request.post(api.searchCustom,{...searchParams,...pageInfo})
	},
	historySearch(){	//搜索历史记录
		return request.get(api.historySearch,{})
	},
	hotWords(){	//热门搜索
		return request.get(api.hotWords,{})
	},
	linkWords(params){	//关键字搜索
		return request.post(api.linkWords,params)
	},
	delHistorySearch(){	//删除搜索历史记录
		return request.delete(api.historySearch,{})
	},
	searchStore(params){	//搜索店铺
		return request.post(api.searchStore,params)
	},
	defaultWords(){	//获取首页输入框中的默认值
		return request.get(api.defaultWords,{})
	}
}