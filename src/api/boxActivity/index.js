import api from './url.js';
import request from '@/utils/request.js'
export default {
	loadBox(promotionId,type) { //初始化抽奖
		return request.post(api.loadBox, {
			promotionId,type
		})
	},
	getBoxCount(promotionId) { //获取剩余抽奖次数
		return request.post(api.getBoxCount, {promotionId})
	},
	openBox(promotionId) { //抽奖
		return request.post(api.openBox, {promotionId})
	},
	getAwardRecords(promotionId) { //获取中奖记录
		return request.post(api.getAwardRecords, {
			promotionId
		})
	},
	saveReceiver(params) { //保存邮寄地址
		return request.post(api.saveReceiver, params)
	},
	getAwardsInfo(promotionId) { //滚屏中奖人信息
		return request.post(api.getAwardsInfo, {promotionId})
	},
	queryUserDefinedComponents(componentId,title,page) { //推荐的商品列表
		return request.post(api.queryUserDefinedComponents, {componentId,title,page})
	},
	queryUserDefinedTabs(componentId) { //推荐的商品列表
		return request.post(api.queryUserDefinedTabs+componentId)
	},
	
}
