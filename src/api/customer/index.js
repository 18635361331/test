import api from './url.js';
import request from '@/utils/request.js'
export default {
	cardPurchase(params){	//购买省钱卡
		return request.post(api.cardPurchase,params)
	},
	getConfig(){	//获取省钱卡配置
		return request.post(api.getConfig,{})
	},
	getUserCard(){	//获取用户省钱卡信息
		return request.post(api.getUserCard,{})
	},
	payGuide(){	//订单支付后引导用户开省钱卡
		return request.post(api.payGuide,{})
	},
	getUsedCoupon(params){//获取省钱卡优惠券关联的订单
		return request.post(api.getUsedCoupon,params)
	},
	orderDuring(params){//获取用户省钱卡期间的订单数据
		return request.post(api.orderDuring,params)
	},
	receiveCoupon(couponTemplateId){//领取优惠券
		return request.post(api.receiveCoupon,{couponTemplateId})
	},
	pushSwtich(){//开启或取消向用户短信提醒
		return request.post(api.pushSwtich,{})
	},
	rollDisplay(){//获取滚动展示数据信息
		return request.post(api.rollDisplay,{})
	},
	authSms(){ // 用户授权开启短信提醒
		return request.post(api.authSms,{})
	},
	createQR(){ // 生成省钱卡分享小程序二维码
		return request.post(api.createQR,{})
	},
}
