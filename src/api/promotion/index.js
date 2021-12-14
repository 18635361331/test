import api from './url.js';
import request from '@/utils/request.js'
export default {
	getCouponNums(){	//获取已使用 未使用 已过期优惠券的数量
		return request.post(api.getCouponNums)
	},
	getMemberCoupons(params){	//我的优惠券列表
		return request.post(api.getMemberCoupons,params)
	},
	getCouponGoodsList(params){	//优惠券商品
		return request.post(api.getCouponGoodsList,params)
	},
	getItemCoupons(itemId){	//商品详情页 根据item获取优惠券
		return request.post(api.getItemCoupons+itemId,{})
	},
	receiveCoupon(id){	//领取优惠券
		return request.post(api.receiveCoupon+id,{})
	},
	getCartStoreCoupons(id){	//根据店铺id获取优惠券
		return request.post(api.getCartStoreCoupons+id,{})
	},
	getDecorateCoupons(params){	//装修页面根据id获取优惠券信息
		return request.post(api.getDecorateCoupons,params)
	},
	exchangeCouponUsePoint(params){	//积分兑换优惠券
		return request.post(api.exchangeCouponUsePoint,params)
	},
	promotionGoodsList(params,typeId){	//超v会员礼包商品列表 
		return request.post(api.promotionGoodsList,{...params,typeId})
	},
	generatePoster(params){	//分享图
		return request.post(api.generatePoster,params)
	},
	firstOrderRewardConfigInfo(){	//邀新注册的奖励配置信息
		return request.post(api.firstOrderRewardConfigInfo,{})
	},
	generateInvitePoster(){	//邀新注册生成海报图片
		return request.post(api.generateInvitePoster,{})
	},
	getInviteMemberRewardInfo(){	//获取用户的邀新奖励信息
		return request.post(api.getInviteMemberRewardInfo,{})
	},
	getLastExpireCoupons(){	//获取最近一天之内过期的首单优惠券
		return request.post(api.getLastExpireCoupons,{})
	},
	couponCardData(){	//获取用户邀新弹窗信息
		return request.post(api.couponCardData,{})
	}
}