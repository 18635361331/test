const marketApi = {
	marketingSessionItemFlag:"/marketing/consumer/skse/marketingSessionItemFlag/",	//商品详情页打标
	nonDesignatedMarketing:"/marketing/consumer/skse/listMarketingSessions/nonDesignatedMarketing",	//首页秒杀活动
	listSessionItems:"/marketing/consumer/skse/listSessionItems",	//获取秒杀某场次下商品
	marketingSessionItemFlag:"/marketing/consumer/skse/marketingSessionItemFlag/"	,//判断是否是秒杀
	addMarketingItemNotification:"/marketing/consumer/skse/addMarketingItemNotification",	//秒杀加入提醒
	removeMarketingItemNotification:"/marketing/consumer/skse/removeMarketingItemNotification",	//取消提醒
	listMarketings:"/marketing/consumer/skse/listMarketings",	//获取秒杀活动列表
	listMarketingSessionsByMarketingId:"/marketing/consumer/skse/listMarketingSessionsByMarketingId/",	//秒杀活动列表拿秒杀场次
}
export default marketApi;
