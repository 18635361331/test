import api from './url.js';
import request from '@/utils/request.js'
export default {
	marketingSessionItemFlag(id){	//商品入口展示接口
		return request.post(api.marketingSessionItemFlag+id,{})
	},
	nonDesignatedMarketing(){	//首页秒杀活动
		return request.post(api.nonDesignatedMarketing,{})
	},
	listSessionItems(marketingSessionId,page){	//获取秒杀某场次下商品
		return request.post(api.listSessionItems,{marketingSessionId,page})
	},
	marketingSessionItemFlag(id){	//判断商品是否是秒杀
		return request.post(api.marketingSessionItemFlag+id,{})
	},
	addMarketingItemNotification(params){	//秒杀加入提醒
		return request.post(api.addMarketingItemNotification,params)
	},
	removeMarketingItemNotification(params){	//取消提醒
		return request.post(api.removeMarketingItemNotification,params)
	},
	listMarketings(){	//获取秒杀活动列表
		return request.post(api.listMarketings,{})
	},
	listMarketingSessionsByMarketingId(id){	//秒杀活动列表拿秒杀活动
		return request.post(api.listMarketingSessionsByMarketingId+id,{})
	}
}