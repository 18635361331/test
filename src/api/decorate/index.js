import api from './url.js';
import request from '@/utils/request.js'
export default {
	searchComponent(id){	//获取店铺首页头部tab
		return request.post(api.searchComponent+id+"/0")
	},
	storeSearchNew(storeId){	//获取店铺首页banner以及商品
		return request.post(api.storeSearchNew+storeId)
	},
	storeList(params){	//获取店铺首页装修数据
		return request.post(api.storeList,params)
	},
	labelItems(title,page){	//获取首页底部tab数据
		return request.post(api.labelItems,{page,title,urlSuffix:"shouyezhuangxiu"})
	},
	decorateList(params){	//装修系统分页
		return request.post(api.decorateList,params)
	},
	getMiniRotuer(){	//装修组建站内跳转配置  用于配置h5站内跳转地址对应
		return request.post(api.getMiniRotuer,{})
	}
}