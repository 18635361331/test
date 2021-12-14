const merchantApi = {
	getStore:"/merchant/storeInfo/getStore/",
	selectMerchantFollowDetailsList:"/merchant/merchantfollow/selectMerchantFollowDetailsList/",	//店铺基本信息
	cancelFollowByMemberIdAndStoreId:"/merchant/merchantfollow/cancelFollowByMemberIdAndStoreId",	//取消关注
	addMerchantFollow:"merchant/merchantfollow/addMerchantFollow",	//关注店铺
	selectMerchantFollowList:"/merchant/merchantfollow/selectMerchantFollowList",	//关注店铺列表
	merchantBasicInfo:"/merchant/storeInfo/basicInfo/",	//店铺印象信息
	checkVerifyCode:"/merchant/storeInfo/checkVerifyCode",	//校验营业执照验证码
	merchGetVerifyCode:"/merchant/storeInfo/getVerifyCode",	//获取营业执照验证码
}
export default merchantApi;
