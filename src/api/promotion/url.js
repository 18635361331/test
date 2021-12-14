const promotionApi = {
	getCouponNums:"/promotion/customer/getCouponNums",  //获取已使用 未使用 已过期优惠券的数量
	getMemberCoupons:"/promotion/customer/getMemberCoupons",	//我的优惠券列表
	getCouponGoodsList:"/promotion/customer/getCouponGoodsList",	//优惠券商品
	getItemCoupons:"/promotion/customer/getItemCoupons/",	//商品详情页 根据item获取优惠券
	receiveCoupon:"/promotion/customer/receiveCoupon/",	//领取优惠券
	getCartStoreCoupons:"/promotion/customer/getCartStoreCoupons/",	//根据店铺id获取优惠券 
	getDecorateCoupons:"/promotion/customer/getDecorateCoupons",	//装修页根据id获取优惠券信息
	exchangeCouponUsePoint:"/promotion/customer/exchangeCouponUsePoint",	//积分兑换优惠券
	// promotionGoodsList:"/promotion/app/gift/goods/list",	//超v会员礼包商品列表
	generatePoster:"/promotion/goodsPoster/generate",	//分享图
	firstOrderRewardConfigInfo:"/promotion/inviteMember/firstOrderRewardConfigInfo",	//邀新注册的奖励配置信息
	generateInvitePoster:"/promotion/inviteMember/generateInvitePoster",	//邀新注册生成海报图片
	getInviteMemberRewardInfo:"/promotion/inviteMember/getInviteMemberRewardInfo",	//获取用户的邀新奖励信息
	getLastExpireCoupons:"/promotion/customer/getLastExpireCoupons",	//获取最近一天之内过期的首单优惠券
	couponCardData:"/promotion/customer/coupon/card/get/popup/data",	//获取用户邀新弹窗信息
	promotionGoodsList:"promotion/app/gift/goods/list/new"	//员礼包商品列表
}
export default promotionApi;
