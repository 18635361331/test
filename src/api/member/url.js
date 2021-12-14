const memberApi = {
	accountLogin:"/member/accountLogin",  //用户名密码登录
	quickLogin:"/member/quickLogin",		//快捷登录
	captcha:"/member/captcha",	//获取验证码
	loginInfo:"/member/center",	//获取登录信息
	addressList:"/member/address/lists",	//获取地址列表
	addressDefault:"/member/address/default/",	//设为默认地址
	addressDetails:"/member/address/detail/",	//地址详情
	addressUpdate:"/member/address/update",	//修改地址
	addressCreate:"/member/address/create",	//创建地址
	getDefaultRealnameInfo:"/member/identity/getDefaultRealnameInfo",	//实名认证信息获取窗口
	memberInfo:"member/info",	//个人信息
	memberUpdate:"member/update",	//更改个人信息
	account:"/member/account",	//账号绑定情况
	verifyCaptcha:"/member/verifyCaptcha",	//验证验证码
	valMemberPwd:"/member/valMemberPwd",	//验证登录密码
	resetMemberPwd:"/member/resetMemberPwd",	//重置密码
	setMemberPwd:"/member/setMemberPwd",	//设置密码
	logout:"/member/logout",	//退出登录
	valPayPwd:"/member/valPayPwd",	//验证支付密码（修改支付密码使用）
	resetPayPwd:"/member/resetPayPwd",	//重置支付密码
	removeAddress:"/member/address/remove/",	//删除地址
	validateCheckin:"/member/validateCheckin",	//积分签到判断
	checkinLog:"/member/checkinLog/",	//签到记录
	checkin:"/member/checkin",	//签到
	memberPoint:"/member/point/mmg",	//获取积分总额
	pointCrm:"/member/point/crm",	//用户积分总额
	pointConvert:"/member/point/convert/",	//积分转换
	pointHistory:"/member/point/history",	//积分明细
	convertLog:"/member/point/convertLog/",	//积分转换记录
	bindTelephone:"/member/bindTelephone",	//绑定手机号
	skipSetMemberPwd:"/member/skipSetMemberPwd",	//登录时跳过此步骤
	setPayPwd:"/member/setPayPwd",	//何止支付密码
	wechatH5Login:"/member/wechatH5Login/",	//微信登录  h5
	wechatMiniLogin:"/member/wechatMiniLogin/",	//微信登录
	wechatMiniAuth:"/member/wechatMiniAuth",	//微信登录授权登录
	getPlusUnitInfo:"/memeber/plus/getPlusUnitInfo",	//获取vip会员信息
	getShareInfo:"/memeber/plus/getShareInfo",	//邀请人会员权益信息
	plusCreateOrder:"/memeber/plus/createOrder",	//会员创建订单
	getMemberPlusInfo:"/memeber/plus/getMemberPlusInfo",	//获取会员相关信息
	verifyShareNumber:"/memeber/plus/verifyShareNumber/",	//校验邀请码是否正确
	plusInfo:"/member/plusInfo",	//判断是否是plus  商品详情页使用
	getQrCode:"/memeber/plus/getQrCode",	//获取会员邀请码
	getBalanceHistory:"/member/point/getBalanceHistory",	//账户流水
	wechatMiniAuthTelephone:"/member/wechatMiniAuthTelephone",	//解密手机号
	wechatMiniBind:"/member/wechatMiniBind",	//绑定微信
	wechatMiniUnBind:"/member/wechatMiniUnbind",	//解绑微信
	wechatH5Bind:"/member/wechatH5Bind/",	//h5绑定微信
	wechatH5Unbind:"/member/wechatH5Unbind/",	//h5解绑微信
	enterpriseInfo:"/member/enterprise/get/info",	//获取企业会员信息
	enterpriseInviteInfo:"/member/enterprise/inviterInfo",	//获取企业会员邀请人信息
	createEnterprise:"/member/enterprise/create/memberInfo",	//创建或修改企业会员基本信息
	createEnterpriseCode:"/member/enterprise/create/QR",	//获取企业会员二维码
	getEnterprise:"/member/enterprise/get/privilege",	//获取会员权益信息
	getEnterpriseResidue:"/member/enterprise/get/privilege/residue",	//获取企业会员剩余次数
	getEnterpriseTotalIncome:"/member/enterprise/asset/totalIncome",	//获取企业会员收入
	getInviterBaseInfoByCode:"/inviter/getInviterBaseInfoByCode",	//获取邀请码信息
	estimateDetail:"/member/enterprise/asset/estimate/detail",	//企业会员预估明细
	createInvoice:"/member/invoice/create",	//创建发票
	updateInvoice:"/member/invoice/update",	//修改发票
	getInvoiceDetail:"/member/invoice/detail/",	//获取发票详情
	getTypeMemberConfig:"/member/get/type/config",	//获取会员类型配置集合
	getPrivilege:'/member/get/privilege',//获取会员类型对应的权益信息
	teamInfo:"/member/teamInfo",	//用户团队和奖励数据
	partnerSummary:'/member/invite/partnerSummary',//邀请的伙伴-伙伴数量统计
	pageMembers:'/member/invite/pageMembers',//邀请的伙伴-用户列表
	distributorSummary:'/member/invite/distributorSummary',//发展团队-团队数量统计
	pageDistributors:'/member/invite/pageDistributors',//发展团队-用户列表
}
export default memberApi;
