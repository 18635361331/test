const appApi = {
	entranceShow:"/app/goods/entrance/show/",  //商品入口展示接口
	calcGoodsFreight:"/app/goods/calcGoodsFreight",	//计算运费
	bugNow:"/app/goods/bugNow/",//判断此商品是否能购买
	getPromotionItems:"/app/goods/getPromotionItems",	//获取店铺促销商品
	getPromotionType:"/app/goods/getPromotionType/",	//获取促销tab
	totalBalance:"/app/giftcard/mine/totalBalance",	//美礼卡余额
	cardList:"app/giftcard/mine/cardList",	//礼卡列表
	cardOrderList:"app/giftcard/order/list",	//礼卡订单列表
	cardOrderDel:"app/giftcard/order/del/",	//删除订单
	cardOrderCancel:"/app/giftcard/order/cancel/",	//确定取消订单
	consumeLog:"app/giftcard/mine/consumeLog",	//礼卡消费记录
	bindCard:"/app/giftcard/mine/bindCard",	//绑定礼卡
	homePopup:"/app/home/popup/show",	//首页弹窗
	labelList:"/app/giftcard/show/labelList",	//美礼卡优选列表
	recommendList:"/app/giftcard/show/recommendList",	//美礼卡精心推荐列表
	carousel:"/app/giftcard/show/carousel",	//美礼卡推荐列表
	giftCardDetail:"/app/giftcard/show/detail",	//购买礼卡详情
	getStoreItemsList:"/app/giftcard/show/getStoreItemsList/",	//礼卡可用店铺
	orderPlace: "app/giftcard/order/place", //礼卡 下单购买
	orderGoPay: "app/giftcard/order/goPay", //去下单
	giftcardAmount:"/app/giftcard/order/amount/",	//支付方式详情
	getCardItemList:"/app/giftcard/show/getCardItemList/",	//获取礼卡可用商品
	newPersonInfo:"/app/promotion/newPerson/info",	//新人专享活动信息
	newPersonOrderTips:"/app/promotion/newPerson/orderTips",	//新人专享下单提示信息
	smsSubject:"/app/sms/message/subject",	//订阅新人专享过期提醒短信
	smsSubjectState:"/app/sms/message/subjectState",		//C端-查询新人专享优惠券订阅状态
	submitDistributor:"/app/distributor/submit",	//提交成为分销商申请
	getPrivileges:"/app/distributor/privileges",	//分销商权益信息
	sendCaptcha:"/app/distributor/sendCaptcha",		//发送分销商申请验证码短信
	privilegesSummary:"/app/distributor/privilegesSummary",		//分销商权益的概述信息
	teamSummary:"/app/distributor/teamSummary",	//我的团队
	teamDistributors:"/app/distributor/teamDistributors",	//发展合伙人列表
	teamMembers:"/app/distributor/teamMembers",	//发展会员列表
	achievementOrders:'/app/distributor/achievementOrders',//业绩单查询
	distributorSummary:"/app/distributor/summary",	//合伙人信息
	generateInvitePoster:"/app/distributor/generateInvitePoster",	//合伙人邀请海报
	distributorAgreement:"/app/distributor/agreement/",	//合伙人协议
	teamNumbers:'/app/distributor/teamNumbers',//团队人数展示
	privilegeItem:"/app/distributor/privilegeItem/",	//获取合伙人权益信息
	generateInviteMemberPoster:"/app/distributor/generateInviteMemberPoster",	//获取会员邀请海报
	teamFans:"/app/distributor/teamFans",	//查看会员粉丝列表
	getAchievementInfo:"/app/distributor/getAchievementInfo",	//获取会员的奖励信息以及业绩政策
	distributorTypeConfig:"/app/distributor/distributorTypeConfig",	//获取合伙人配置
	appProvices:"/app/distributor/provices",	//获取省份
	appCities:"/app/distributor/cities/",	//获取城市
	appCounties:"/app/distributor/counties/",	//获取区域
	distributorStatus:"/app/distributor/status",	//获取合伙人状态
	rewardSummary:'/app/distributor/performance/rewardSummary',//我的奖励-奖励统计信息
	pagePerformanceOrder:'/app/distributor/performance/pagePerformanceOrder',//我的奖励-奖励订单
}
export default appApi;
