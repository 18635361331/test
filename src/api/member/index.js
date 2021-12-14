import api from './url.js';
import request from '@/utils/request.js'
export default {
	accountLogin(params){	//用户名密码登录 
		return request.post(api.accountLogin,params)
	},
	quickLogin(params){	//快捷登录
		return request.post(api.quickLogin,params)
	},
	captcha(params){ //获取验证码
		return request.post(api.captcha,params)
	},
	loginInfo(){	//获取登录信息
		return request.post(api.loginInfo,{})
	},
	addressList(){	//获取地址列表
		return request.post(api.addressList,{})
	},
	addressDefault(id){	//设为默认地址
		return request.post(api.addressDefault+id)
	},
	addressDetails(id){	//获取地址详情
		return request.post(api.addressDetails+id)
	},
	addressUpdate(params){	//修改地址
		return request.post(api.addressUpdate,params)
	},
	addressCreate(params){	//创建地址
		return request.post(api.addressCreate,params)
	},
	getDefaultRealnameInfo(){	//实名认证获取窗口
		return request.post(api.getDefaultRealnameInfo,{})
	},
	memberInfo(){	//获取个人信息
		return request.post(api.memberInfo,{})
	},
	memberUpdate(params){	//更新个人信息头像
		return request.post(api.memberUpdate,params)
	},
	account(){	//账号绑定情况
		return request.post(api.account,{})
	},
	verifyCaptcha(params){	//验证验证码
		return request.post(api.verifyCaptcha,params)
	},
	valMemberPwd(params){	//验证登录密码
		return request.post(api.valMemberPwd,params)
	},
	resetMemberPwd(params){	//重置密码
		return request.post(api.resetMemberPwd,params)
	},
	logout(){	//退出登录
		return request.post(api.logout,{})
	},	
	valPayPwd(params){	/////验证支付密码（修改支付密码使用）
		return request.post(api.valPayPwd,params)
	},
	resetPayPwd(params){	//重置支付密码
		return request.post(api.resetPayPwd,params)
	},
	removeAddress(id){	//删除地址
		return request.post(api.removeAddress+id,{})
	},
	validateCheckin(){	//积分签到判断
		return request.post(api.validateCheckin,{})
	},
	checkinLog(lastLogId){	//签到记录
		return request.post(api.checkinLog+lastLogId,{})
	},
	checkin(){	//签到
		return request.post(api.checkin,{})
	},
	memberPoint(){	//获取积分总额
		return request.post(api.memberPoint,{})
	},
	pointCrm(){	//用户积分总额
		return request.post(api.pointCrm,{})
	},
	pointConvert(params){	//积分转换
		return request.post(api.pointConvert+params,{})
	},
	pointHistory(lastLogId){	//积分明细
		return request.post(api.pointHistory,{lastLogId})
	},
	convertLog(params){	//转换记录
		return request.post(api.convertLog+params,{})
	},
	setMemberPwd(params){	//设置密码
		return request.post(api.setMemberPwd,params)
	},
	bindTelephone(params){	//绑定手机号
		return request.post(api.bindTelephone,params)
	},
	skipSetMemberPwd(params){	//登录时跳过此步骤
		return request.post(api.skipSetMemberPwd,params)
	},
	setPayPwd(params){	//设置支付密码
		return request.post(api.setPayPwd,params)
	},
	wechatH5Login(code){	//微信登录
		return request.get(api.wechatH5Login+code,{})
	},
	wechatMiniLogin(code){	//小程序登录
		return request.get(api.wechatMiniLogin+code,{})
	},
	wechatMiniAuth(params){	//小程序登录授权登录
		return request.post(api.wechatMiniAuth,params)
	},
	getPlusUnitInfo(params){	//获取超v会员详情
		return request.post(api.getPlusUnitInfo,params)
	},
	getShareInfo(params){	//会员邀请人权益信息
		return request.post(api.getShareInfo,params)
	},
	plusCreateOrder(params){	//成为会员创建订单
		return request.post(api.plusCreateOrder,params)
	},
	getMemberPlusInfo(){	//获取会员相关信息
		return request.post(api.getMemberPlusInfo,{})
	},
	verifyShareNumber(shareCode){	//校验邀请码是否正确
		return request.post(api.verifyShareNumber+shareCode,{})
	},
	plusInfo(){	//是否是plus  商品详情页使用
		return request.post(api.plusInfo,{})
	},
	getQrCode(){	//获取会员邀请码
		return request.post(api.getQrCode,{})
	},
	getBalanceHistory(params){	//账户流水
		return request.post(api.getBalanceHistory,params)
	},
	wechatMiniAuthTelephone(params){	//解密手机号
		return request.post(api.wechatMiniAuthTelephone,params)
	},
	wechatMiniBind(params){	//绑定微信
		return request.post(api.wechatMiniBind,params)
	},
	wechatMiniUnBind(){	//解绑微信
		return request.post(api.wechatMiniUnBind,{})
	},
	wechatH5Bind(code){	//绑定微信 h5
		return request.get(api.wechatH5Bind+code,{})
	},
	wechatH5Unbind(code){	//h5解绑微信
		return request.get(api.wechatH5Unbind+code,{})
	},
	enterpriseInfo(){	//获取企业会员信息
		return request.post(api.enterpriseInfo,{})
	},
	enterpriseInviteInfo(inviteCode){	//获取企业会员邀请人信息
		return request.post(api.enterpriseInviteInfo,{inviteCode})
	},
	createEnterprise(params){	//创建或修改企业会员基本信息
		return request.post(api.createEnterprise,params)
	},
	createEnterpriseCode(inviteeType){	//获取企业会员二维码
		return request.post(api.createEnterpriseCode,{inviteeType})
	},
	getEnterprise(mokaId){	//获取企业会员权益信息
		return request.post(api.getEnterprise,{mokaId})
	},
	getEnterpriseResidue(promotionType){	//获取企业会员剩余次数
		return request.post(api.getEnterpriseResidue,{promotionType})
	},
	getEnterpriseTotalIncome(){	//获取企业会员收入
		return request.post(api.getEnterpriseTotalIncome,{})
	},
	getInviterBaseInfoByCode(shareCode){	//获取邀请码信息
		return request.post(api.getInviterBaseInfoByCode,{shareCode})
	},
	estimateDetail(params){	//企业会员预估明细
		return request.post(api.estimateDetail,params)
	},
	createInvoice(params){	//创建发票
		return request.post(api.createInvoice,params)
	},
	updateInvoice(params){	//修改发票
		return request.post(api.updateInvoice,params)
	},
	getInvoiceDetail(invoiceType){	//获取发票详情
		return request.post(api.getInvoiceDetail+invoiceType,)
	},
	getTypeMemberConfig(){	//获取会员类型配置集合
		return request.post(api.getTypeMemberConfig)
	},
	getPrivilege(type){	//获取会员类型对应的权益信息
		return request.post(api.getPrivilege,{type})
	},
	teamInfo(){	//用户团队和奖励数据
		return request.post(api.teamInfo,{})
	},
	partnerSummary(){	//邀请的伙伴-伙伴数量统计
		return request.post(api.partnerSummary,{})
	},
	pageMembers(inviteType,params){	//邀请的伙伴-用户列表
		return request.post(api.pageMembers,{inviteType,...params})
	},
	distributorSummary(){	//发展团队-团队数量统计
		return request.post(api.distributorSummary,{})
	},
	pageDistributors(inviteType,params){	//发展团队-用户列表
		return request.post(api.pageDistributors,{inviteType,...params})
	},
}