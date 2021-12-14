const appApi = {
	loadBox:"/boxActivity/customer/loadBox",  //初始化抽奖
	getBoxCount:"/boxActivity/customer/getBoxCount",	//获取剩余抽奖次数
	openBox:"/boxActivity/customer/openBox",	//抽奖
	getAwardRecords:"/boxActivity/customer/getAwardRecords",	//获取中奖记录
	saveReceiver:"/boxActivity/customer/saveReceiver",	//保存邮寄地址
	getAwardsInfo:"/boxActivity/customer/getAwardsInfo",	//滚屏中奖人信息
	queryUserDefinedComponents:"/decorate/customer/component/queryUserDefinedComponents", // 推荐的商品列表
	queryUserDefinedTabs:'/decorate/customer/component/queryUserDefinedTabs/'
}
export default appApi;
