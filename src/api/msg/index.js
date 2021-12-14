import api from './url.js';
import request from '@/utils/request.js'
export default{
	allMsg(){	//获取所有消息个数
		return request.post(api.allMsg,{})
	},
	readAllMsg(){	//清空所有通知消息
		return request.post(api.readAllMsg,{})
	},
	moduleMessages(params){	//获取消息信息列表
		return request.post(api.moduleMessages,params)
	},
	unreadCount(){	//消息数量
		return request.post(api.unreadCount,{})
	},
	setRead(params){	//设置已读
		return request.post(api.setRead,params)
	},
	removeModule(moduleType){	//消息中心删除
		return request.post(api.removeModule+moduleType,{})
	},
	removeMsg(params){	//删除消息
		return request.post(api.removeMsg,params)
	}
}