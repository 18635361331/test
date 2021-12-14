import api from './url.js';
import request from '@/utils/request.js'
export default {
	entranceShow(id){	//商品入口展示接口
		return request.post(api.entranceShow+id,{})
	},
	calcGoodsFreight(params){	//计算运费
		return request.post(api.calcGoodsFreight,params)
	},
	bugNow(skuId,skuNum,transferOrderId){	//判断商品是否可以购买
		return request.post(api.bugNow+skuId+"/"+skuNum+"/"+transferOrderId,{})
	},
	getPromotionItems(params){	//获取店铺促销商品
		return request.post(api.getPromotionItems,params)
	},
	getPromotionType(storeId){	//获取促销tab
		return request.post(api.getPromotionType+storeId,{})
	},
	totalBalance(){	//礼卡余额
		return request.post(api.totalBalance,{})
	},
	cardList(params){	//礼卡列表
		return request.post(api.cardList,params)
	},
	cardOrderList(params){	//礼卡订单列表
		return request.post(api.cardOrderList,params)
	},
	cardOrderDel(id){	//删除订单
		return request.post(api.cardOrderDel+id,{})
	},
	cardOrderCancel(id){	//取消订单
		return request.post(api.cardOrderCancel+id,{})
	},
	consumeLog(params){	//礼卡消费记录
		return request.post(api.consumeLog,params)
	},
	bindCard(params){	//绑定礼卡
		return request.post(api.bindCard,params)
	},
	homePopup(){	//首页弹窗
		return request.post(api.homePopup,{})
	},
	labelList(){	//美礼卡优选列表
		return request.post(api.labelList,{})
	},
	recommendList(params){	//美礼卡精心推荐列表
		return request.post(api.recommendList,params)
	},
	carousel(){	//美礼卡推荐列表
		return request.post(api.carousel,{})
	},
	giftCardDetail(params){	//购买礼卡详情
		return request.post(api.giftCardDetail,params)
	},
	getStoreItemsList(cardId){	//获取礼卡可用店铺
		return request.post(api.getStoreItemsList+cardId,{})
	},
	orderPlace(params){	//获取卡片详情
		return request.post(api.orderPlace,params)
	},
	orderGoPay(params){	//礼品卡去付款
		return request.post(api.orderGoPay,params)
	},
	giftcardAmount(cardId){	//支付方式详情
		return request.post(api.giftcardAmount+cardId,{})
	},
	getCardItemList(cardId,params){	//获取礼卡可用商品
		return request.post(api.getCardItemList+cardId,params)
	},
	newPersonInfo(){	//新人专享活动信息
		return request.post(api.newPersonInfo,{})
	},
	newPersonOrderTips(){	//新人专享下单提示信息
		return request.post(api.newPersonOrderTips,{})
	},
	smsSubject(typeList){	//订阅新人专享过期提醒短信
		return request.post(api.smsSubject,{typeList})
	},
	smsSubjectState(typeList){	//C端-查询新人专享优惠券订阅状态
		return request.post(api.smsSubjectState,{typeList})
	},
	submitDistributor(params){	//提交成为分销商申请
		return request.post(api.submitDistributor,params)
	},
	getPrivileges(){	//分销商权益信息
		return request.post(api.getPrivileges,{})
	},
	sendCaptcha(telephone){	//发送分销商申请验证码短信
		return request.post(api.sendCaptcha,{telephone})
	},
	privilegesSummary(){	//分销商权益的概述信息
		return request.post(api.privilegesSummary,{})
	},
	teamSummary(){	//我的团队业绩情况
		return request.post(api.teamSummary,{})
	},
	teamDistributors(params){	//反展合伙人列表
		return request.post(api.teamDistributors,params)
	},
	teamMembers(params){	//发展会员列表
		return request.post(api.teamMembers,params)
	},
	achievementOrders(params){	//业绩单查询
		return request.post(api.achievementOrders,params)
	},
	distributorSummary(){	//合伙人信息
		return request.post(api.distributorSummary,{})
	},
	generateInvitePoster(){	//合伙人邀请海报
		return request.post(api.generateInvitePoster,{})
	},
	distributorAgreement(id){	//合伙人协议
		return request.post(api.distributorAgreement+id,{})
	},
	teamNumbers(){	//团队人数展示
		return request.post(api.teamNumbers,{})
	},
	privilegeItem(id){//获取合伙人权益信息
		return request.post(api.privilegeItem+id,{})
	},
	generateInviteMemberPoster(){	//获取会员邀请海报
		return request.post(api.generateInviteMemberPoster,{})
	},
	teamFans(){	//查看会员粉丝列表
		return request.post(api.teamFans,{})
	},
	getAchievementInfo(){
		return request.post(api.getAchievementInfo,{})
	},
	distributorTypeConfig(){	//获取合伙人配置
		return request.post(api.distributorTypeConfig,{})
	},
	appProvices(){	//获取一级地址
		return request.post(api.appProvices,{})
	},
	appCities(id){	//获取二级地址
		return request.post(api.appCities+id,{})
	},
	appCounties(id){	//获取三级地址
		return request.post(api.appCounties+id,{})
	},
	distributorStatus(){	//获取合伙人状态
		return request.post(api.distributorStatus,{})
	},
	rewardSummary(){	//我的奖励-奖励统计信息
		return request.post(api.rewardSummary,{})
	},
	pagePerformanceOrder(params){	//我的奖励-奖励订单
		return request.post(api.pagePerformanceOrder,params)
	},
	
}