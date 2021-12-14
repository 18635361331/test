const customerApi = {
	cardPurchase:"/promotion/customer/coupon/card/purchase",  //购买省钱卡
	getConfig:"/promotion/customer/coupon/card/get/config",	//获取省钱卡配置
	getUserCard:'/promotion/customer/coupon/card/get/user/card',//获取用户省钱卡信息
	payGuide:'/promotion/customer/coupon/card/after/pay/guide',//订单支付后引导用户开省钱卡
	getUsedCoupon:'/promotion/customer/coupon/card/used/coupon',//获取省钱卡优惠券关联的订单
	orderDuring:'/promotion/customer/coupon/card/order/during',//获取用户省钱卡期间的订单数据
	receiveCoupon:'/promotion/customer/coupon/card/receive/coupon',//领取优惠券
	pushSwtich:'/promotion/customer/coupon/card/sms/push/swtich',//开启或取消向用户短信提醒
	rollDisplay:'/promotion/customer/coupon/card/get/roll/display',//获取滚动展示数据信息
	authSms:'/promotion/customer/coupon/card/auth/sms',//用户授权开启短信提醒
	createQR:'/promotion/customer/coupon/card/create/QR',//生成省钱卡分享小程序二维码
}
export default customerApi;
