import request from '@/utils/request.js'
import api from './url.js'
export default {
	queryMyOrders(params,orderState){	//获取订单列表
		return request.post(api.queryMyOrders,{pagePO:params,orderState})
	},
	addCart(params){	//加入购物车
		return request.post(api.addCart,params)
	},
	getCarts(){	//获取购物车列表
		return request.post(api.getCarts,{})
	},
	editCart(params){	//修改购物车信息
		return request.post(api.editCart,params)
	},
	moveToFavorite(id){	//单个移入收藏夹
		return request.post(api.moveToFavorite+id,{})
	},
	moveToFavorites(params){	//批量移入收藏夹
		return request.post(api.moveToFavorites,params)
	},
	removeCarts(params){	//清空失效商品
		return request.post(api.removeCarts,params)
	},
	evaluateGoods(id){	//获取评价商品
		return request.post(api.evaluateGoods+id,{})
	},
	appendEvaluate(id){	//追加评价详情
		return request.post(api.appendEvaluate+id,{})
	},
	pageInit(cartIds){	//初始化结算
		return request.post(api.pageInit,cartIds)
	},
	storePromotions(params){	//获取店铺促销信息
		return request.post(api.storePromotions,params)
	},
	storeCoupons(params){	//获取店铺优惠券信息
		return request.post(api.storeCoupons,params)
	},
	freightPromotions(params){	//获取店铺包邮活动信息
		return request.post(api.freightPromotions,params)
	},
	storeOrderAmount(params){	//获取店铺订单金额
		return request.post(api.storeOrderAmount,params)
	},
	platformPromotions(params){	//获取平台优惠券信息
		return request.post(api.platformPromotions,params)
	},
	orderGold(params){	//获取权益金
		return request.post(api.orderGold,params)
	},
	orderScore(params){	//获取积分信息
		return request.post(api.orderScore,params)
	},
	orderSummary(params){	//获取总订单金额
		return request.post(api.orderSummary,params)
	},
	submitOrder(params){	//提交订单
		return request.post(api.submitOrder,params)
	},
	deleteOrder(id){	//删除订单
		return request.post(api.deleteOrder+id,{})
	},
	getCustomerRefundOrderPage(params){	//获取售后列表
		return request.post(api.getCustomerRefundOrderPage,params)
	},
	refundDetail(returnOrderId){	//售后详情
		return request.post(api.refundDetail+returnOrderId,{})
	},
	queryOrderDetail(orderId){	//查询订单详情
		return request.post(api.queryOrderDetail+orderId,{})
	},
	cancelOrder(orderId){	//取消订单
		return request.post(api.cancelOrder+orderId,{})
	},
	applyFofRefund(params){	//申请售后详情
		return request.post(api.applyFofRefund,params)
	},
	refundReason(type){	//售后原因
		return request.post(api.refundReason+type,{})
	},
	submitApplyFofRefund(params){	//提交售后
		return request.post(api.submitApplyFofRefund,params)
	},
	extendShip(orderId){	//延长收货
		return request.post(api.extendShip+orderId,{})
	},
	confirmReceipt(orderId){	//确认收货
		return request.post(api.confirmReceipt+orderId,{})
	},
	queryMyUnCommentOrders(params){	//评价成功后调用
		return request.post(api.queryMyUnCommentOrders,params)
	},
	cancelTrade(orderId){	//取消申请售后
		return request.post(api.cancelTrade+orderId,{})
	},
	platformInvolve(orderId){	//申诉
		return request.post(api.platformInvolve+orderId,{})
	},
	summary(payId){	//收银台详情
		return request.post(api.summary+payId,{})
	},
	submitPay(params){	//提交支付
		return request.post(api.submitPay,params)
	},
	defaultCards(params){		//根据用户更改支付类型判断礼卡可用余额
		return request.post(api.defaultCards,params)
	},
	selectCards(params){	//收银台礼卡更改时触发
		return request.post(api.selectCards,params)
	},
	sendOrderSms(){	//发送验证码
		return request.post(api.sendOrderSms,{})
	},
	sendSMS(id){	//收银台发送验证码
		return request.post(api.sendSMS+id,{})
	},
	submitLogisticsInfo(params){	//寄回商品
		return request.post(api.submitLogisticsInfo,params)
	},
	tradeFirstOrder(payId){	//判断是否为新用户首单
		return request.post(api.tradeFirstOrder+payId,{})
	},
	validSubmitCarts(cartIds){	//购物车-结算校验
		return request.post(api.validSubmitCarts,{cartIds})
	},
	cusPageInit(params){	//定制品下单初始化
		return request.post(api.cusPageInit,params)
	},
	submitCusOrder(params){	//定制品提交订单
		return request.post(api.submitCusOrder,params)
	},
	buildPayOrder(params){	//构建支付订单
		return request.post(api.buildPayOrder,params)
	},
	submitPayOrder(params){	//提交线下支付订单
		return request.post(api.submitPayOrder,params)
	},
	getCompanyPaymentInfo(){	//获取公司对公账号信息
		return request.post(api.getCompanyPaymentInfo,{})
	},
	listPayLog(orderId){	//获取订单的支付记录
		return request.post(api.listPayLog+orderId,{})
	},
	listOrderPage(params){	//查询定制订单列表
		return request.post(api.listOrderPage,params)
	},
	getOrderInfo(orderId){	//获取定制订单详情
		return request.post(api.getOrderInfo+orderId,{})
	},
	cancelCusOrder(orderId){	//	取消定制订单
		return request.post(api.cancelCusOrder+orderId,{})
	},
	giftBagPageInit(params){	//转增商品下单初始化
		return request.post(api.giftBagPageInit,params)
	},
	giftBagGoldOrder(params){	//购物金可使用情况
		return request.post(api.giftBagGoldOrder,params)
	},
	giftBagScoreOrder(params){	//积分可使用情况
		return request.post(api.giftBagScoreOrder,params)
	},
	giftBagSummaryOrder(params){
		return request.post(api.giftBagSummaryOrder,params)
	},
	giftBagSubmitOrder(params){	//提交订单
		return request.post(api.giftBagSubmitOrder,params)
	},
	giftBagPageOrders(params){	//我的礼包
		return request.post(api.giftBagPageOrders,params)
	},
	giftBagPageGetLogs(params){	//转赠单领取记录
		return request.post(api.giftBagPageGetLogs,params)
	},
	giftBagCancelOrder(params){	//取消订单
		return request.post(api.giftBagCancelOrder,params)
	},
	giftBagGeneratePoster(params){	//生成转赠海报
		return request.post(api.giftBagGeneratePoster+params,{})
	},
	giftBagInfo(params){
		return request.post(api.giftBagInfo+params,{})
	},
}