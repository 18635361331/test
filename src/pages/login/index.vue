<template>
	<view class="page loginBox">
		<!-- #ifndef MP-WEIXIN -->
		<view class="closeBtn" @click="goBack(1)">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png"></image>
		</view>
		<!-- #endif  -->
		<view class="loginType">
			<text @click="chooseType='quick'" :class="chooseType=='quick'?'active':''">快捷登录</text>
			<text @click="chooseType='pass'" :class="chooseType=='pass'?'active':''">密码登录</text>
		</view>
		<view class="loginFrom" v-if="chooseType=='quick'">
			<view class="quickInput">
				<input type="text" v-model="quick.telephone" placeholder="请输入手机号" />
			</view>
			<view class="quickInput">
				<input type="text" v-model="quick.captcha" class="passWord" placeholder="请输入验证码" />
				<text v-if="!countdown.count" class="getCode" @click="captcha">获取验证码</text>
				<text v-if="countdown.count" class="getCode countDown">{{countdown.count}}秒后重新获取</text>
			</view>
		</view>
		<view class="loginFrom" v-if="chooseType=='pass'">
			<view class="quickInput">
				<input type="text" v-model="account.loginName" placeholder="请输入账号/手机号" />
			</view>
			<view class="quickInput">
				<input v-if="passwordFlag" type="text" v-model="account.password" class="passWord" placeholder="请输入密码" />
				<input v-else type="password" v-model="account.password" class="passWord" placeholder="请输入密码" />
				
				<view class="getCode">
					<image @click="passwordFlag=!passwordFlag" v-if="passwordFlag" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/eyes@2x.png"
					 mode=""></image>
					<image @click="passwordFlag=!passwordFlag" v-if="!passwordFlag" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/shape@2x.png"
					 mode=""></image>
					<view class="forgeBtn" @click="goToForgetPwd">忘记密码</view>
				</view>
			</view>
		</view>
		<view class="loginBtn" @click="judgeSubmit">
			<text>登录</text>
		</view>

		<view class="otherLogin">
			<view class="otherLoginLine"></view>
			<view class="otherLoginText">其他方式登录</view>
		</view>
		<view class="otherLoginBtn" @click="telephone?'':otherLogin()">
			<wxLogin v-if='telephone' @wechatMiniAuth='getUserInfo'></wxLogin>
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/wechat_s_login@2x.png?123" mode=""></image>
			<view>微信</view>
		</view>
		<view class="loginAgreement">
			登录即代表您同意<text @click='openPopup'>《文器库商城用户协议》</text>
		</view>
		<agreementPopup ref='agreementPopup'></agreementPopup>
		<!-- #ifdef MP-WEIXIN -->
			<view v-if="(hideFMCanvas != undefined) && !hideFMCanvas">
				<canvas canvas-id='tdcanvas' style='margin-top:200rpx'></canvas>
			</view>
		<!-- #endif  -->
	</view>
</template>

<script>
	import agreementPopup from './agreementPopup.vue'
	import memberApi from '@/api/member/index.js'
	import wechatApi from '@/api/wechat/index.js'
	import wxLogin from '@/common/model/wxLogin/index.vue'
	
	// #ifdef MP-WEIXIN
	import fmagent from '@/common/js/fmagent.js'
	// #endif
	
	export default {
		//  #ifdef MP-WEIXIN
		mixins:[fmagent],
		// #endif
		data() {
			return {
				passwordFlag: false,
				chooseType: "quick",
				quick: {	//快捷登录
					telephone: "",
					captcha: ""
				},
				account: {	//账号密码登录
					loginName: "",
					password: ""
				},
				countdown: {	//倒计时
					inter: "",
					count: 0
				},
				authorizeFlag:true,	//是否已授权
				telephone:"",	//授权手机号
				retry:1
			}
		},
		methods: {
			judgeSubmit() { //判断登录类型
				if (this.chooseType == 'quick') { //快捷登录
					this.quickLogin()
				} else { //密码登录
					this.accountLogin()
				}
			},
			captcha() { //获取验证码
				if (!(/^\d{11}$/.test(this.quick.telephone))) {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					})
					return;
				}
				this.countDownTime();
				memberApi.captcha({
					telephone: this.quick.telephone,
					type: "0"
				}).then(res => {
					if (res.data.code == 200) {} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			countDownTime() {	//倒计时开始
				this.countdown.count = 60
				this.countdown.inter = setInterval(() => {
					this.countdown.count--;
					if (!this.countdown.count) {
						clearInterval(this.countdown.inter)
					}
				}, 1000)
			},
			accountLogin() { //密码登录
				if (!this.account.loginName) {
					uni.showToast({
						title: '请输入账号或手机号',
						icon: 'none'
					});
					return;
				}
				if (!this.account.password) {
					uni.showToast({
						title: "请输入密码",
						icon: 'none'
					});
					return;
				}
				memberApi.accountLogin({
					loginName: this.account.loginName,
					password: this.account.password,
					inviteCode:uni.getStorageSync("routerShareNumber")?uni.getStorageSync("routerShareNumber"):"",	//分享者的id   
					inviteType:""	//分享类型
				}).then(res => {
					if (res.data.code == 200) {
						this.zhuge.identify(res.data.data.telephone)
						this.loginStore(res.data.data)
						this.judgeLoginType(res)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			wechatH5Login(code){	//微信登陆 h5
				memberApi.wechatH5Login(code).then(res=>{
					if(res.data.code==200){
						this.loginStore(res.data.data)
						this.judgeLoginType(res)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			judgeLoginType(res){	//登录后类型判断
				if (!res.data.data.hasBindTel) {
					this.$Router.push({
						path: "/pages/phoneCheck/index",
						query: {
							loginName: res.data.data.userName,
							operateCode: res.data.data.bindTelCode,
							isLogin: true
						}
					})
				} else {
					if (res.data.data.needResetPwd) {
						this.$Router.push({
							path: "/pages/modifyPwdForLogin/index",
							query: {
								loginName: res.data.data.userName,
								telephone: res.data.data.telephone,
								resetPwdCode: res.data.data.resetPwdCode,
								isLogin: true
							}
						})
					} else if (res.data.data.needVerifyTel) {
						this.$Router.push({
							path: "/pages/modifyPwdForLogin/index",
							query: {
								loginName: res.data.data.userName,
								telephone: res.data.data.telephone,
								resetPwdCode: res.data.data.resetPwdCode,
								verifyTel: true,
								isLogin: true
							}
						})
					} else {
						uni.showToast({
							title: "登录成功",
							icon: "none"
						})
						this.goBack(1)
					}
				}
			},
			quickLogin() { //快捷登录
				if (!(/^\d{11}$/.test(this.quick.telephone))) {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					});
					return;
				}
				if (!(/^\d{6}$/.test(this.quick.captcha))) {
					uni.showToast({
						title: "验证码输入有误",
						icon: "none"
					});
					return;
				}
				console.log(11111111)
				console.log(uni.getStorageSync("routerShareNumber"))
				memberApi.quickLogin({
					telephone: this.quick.telephone,
					captcha: this.quick.captcha,
					inviteCode:uni.getStorageSync("routerShareNumber")?uni.getStorageSync("routerShareNumber"):"",
					inviteType:uni.getStorageSync("routerShareNumber")?1:""
				}).then(res => {
					if (res.data.code == 200) {
						this.zhuge.identify(this.quick.telephone)
						this.loginStore(res.data.data)
						if (!res.data.data.hasSetPwd) {
							this.$Router.push({
								path: "/pages/registerSetPassword/index",
								query: {
									telephone: this.quick.telephone,
									operateCode: res.data.data.setPwdCode
								}
							})
						} else {
							if (res.data.data.needResetPwd) {
								this.$Router.push({
									path: "/pages/modifyPwdForLogin/index",
									query: {
										loginName: res.data.data.userName,
										telephone: res.data.data.telephone,
										resetPwdCode: res.data.data.resetPwdCode,
										isLogin: true
									}
								})
							} else {
								uni.showToast({
									title: "登录成功",
									icon: "none"
								})
								this.goBack(1)
							}

						}

					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			otherLogin(){	//其它方式登录
				//#ifdef MP-WEIXIN
					this.$Router.push({
						path:"/pages/authorization/index",
					})
					return
				//#endif
				/*公众号*/
				this.h5UniLogin();
			},
			getUserInfo(res){
				uni.login({
					success:(data)=>{
						let params = {
							encryptedData:res.encryptedData,
							iv:res.iv,
							code:data.code,
							telephone:uni.getStorageSync("userInfoTelphone"),
							inviteCode:uni.getStorageSync("routerShareNumber")?uni.getStorageSync("routerShareNumber"):"",
						}
						this.wechatMiniAuth(params)
					}
				})
			},
			h5UniLogin() {
				wechatApi.wxPubAppId().then(res=>{
					if(res.data.code==200){
						let urls = 'https://' + location.host + location.pathname;
						location.href = ('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+res.data.data+'&redirect_uri=' + encodeURIComponent(urls) + '&response_type=code&scope=snsapi_userinfo');
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			wechatMiniAuth(params){
				memberApi.wechatMiniAuth(params).then(res=>{
					uni.hideLoading()
					if(res.data.code==200){
						this.zhuge.identify(res.data.data.telephone)
						this.loginStore(res.data.data)
						this.judgeLoginType(res)
					}else{
						if(this.retry>3){
							uni.showToast({
								title:res.data.message,
								icon:"none"
							})
							return
						}
						this.retry++
						this.getUserInfo(params)
					}
				})
			},
			getSetting(){
				let _this= this
				uni.getSetting({
					success(res) {
						if(!res.authSetting['scope.userInfo']){
							_this.authorizeFlag = false
						}else{
							_this.authorizeFlag = true
						}
					}
				})
			},
			goToForgetPwd(){	//忘记支付密码
				this.$Router.push({path:'/pages/forgetPassword/index'})
			},
			openPopup(){	//打开会员服务协议
				this.$refs.agreementPopup.openPopup()
			},
			loginStore(params){	//登陆后存值
				uni.setStorageSync("sessionId", params.sessionId);
				uni.setStorageSync("shareNumber",params.shareNumber)
				uni.setStorageSync("userInfo", JSON.stringify(params))
			}
		},
		onLoad(option) {
			if(option.code && !uni.getStorageSync("hasCode")){
				uni.setStorageSync("hasCode",true)
				this.wechatH5Login(option.code)
			}
		},
		onShow() {
			this.telephone = uni.getStorageSync("userInfoTelphone")
			this.zhuge.track("登录页面")
			/*微信小程序*/
			//#ifdef MP-WEIXIN
				this.getSetting()
				this.fmagentInit()
			//#endif		
		},
		components:{
			agreementPopup,
			wxLogin
		},
	}
</script>

<style>
	.closeBtn {
		width: 88rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.closeBtn image {
		width: 44rpx;
		height: 44rpx;
	}

	.loginType {
		padding: 0 65rpx;
		padding-top: 40rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 24rpx;
		/* #endif */
		height: 80rpx;
	}

	.loginType text {
		padding-bottom: 24rpx;
		margin-right: 40rpx;
		color: #333;
		font-size: 32rpx;
		transition: font .15s;
	}

	.loginType text.active {
		font-weight: 700;
		font-size: 60rpx;
		color: #000;
		line-height: 70rpx;
	}

	.loginFrom {
		width: 100%;
		padding: 0 65rpx;
		padding-top: 40rpx;
	}

	.quickInput {
		width: 100%;
		height: 90rpx;
		margin: 22rpx 0;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
		align-items: center;
	}

	.quickInput input {
		height: 100%;
		width: 100%;
	}

	.quickInput .passWord {
		display: inline-block;
		width: 460rpx;
		height: 90rpx;
		padding-right: 40rpx;
		border: none;
		list-style: none;
		background: none;
		outline: none;
	}

	.getCode {
		color: rgb(51, 51, 51);
		width: 175rpx;
		font-size: 30rpx;
		text-align: right;
	}

	.countDown {
		font-size: 28rpx;
		width: 226rpx;
	}

	.getCode image {
		width: 40rpx;
		vertical-align: middle;
		height: 40rpx;
		margin-right: 10rpx;
	}

	.loginBtn {
		margin: 120rpx auto 0;
		text-align: center;
		line-height: 88rpx;
		height: 88rpx;
		border-radius: 70rpx;
		background: linear-gradient(201deg, #FF3E71 0%, #D72044 99%, #D72044 100%);
		box-shadow: 0px 10px 30px rgba(252, 1, 78, 0.3);
		color: #fff;
		font-size: 36rpx;
		width: calc(100% - 130rpx);
		text-align: center;
	}
	.loginBtn text{
		color: #FFFFFF;
		opacity: 0.6;
	}
	.otherLoginBtn{
		text-align: center;
		margin-top: 98rpx;
		position: relative;
	}
	.otherLoginBtn image{
		width: 50rpx;
		height: 50rpx;
	}
	.otherLoginBtn view{
		text-align: center;
		color: #999999;
		margin-top: 10rpx;
		font-size: 24rpx;
	}
	.otherLogin{
		width: calc(100% - 48rpx);
		margin: 0 auto;
		height: 33rpx;
		text-align: center;
		margin-top: 170rpx;
		position: relative;
	}
	.otherLoginLine{
		position: absolute;
		top: 0;
		bottom: 0;
		width: calc(100% - 120rpx);
		left: 0;
		right: 0;
		margin: auto;
		height: 1rpx;
		background-color: #E4E4E4;
	}
	.otherLoginText{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		background-color: #FFFFFF;
		width: 200rpx;
		color:#999999;
	}
	.loginAgreement{
		margin-top: 100rpx;
		text-align: center;
		font-size: 24rpx;
		color: #999999;
	}
	.loginAgreement text{
		color: #FF1558;
	}
	.forgeBtn{
		display: inline-block;
	}
</style>
