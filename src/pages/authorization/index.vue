<template>
	<view class="page commonPageTitle">
		<!-- <view class="authorizaImage">
			<open-data type="userAvatarUrl"></open-data>
		</view> -->
		<view class="authorizaBg">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/authorizationBg.png" mode="widthFix"></image>
		</view>
		<view class="authorizaBtn">
			<!-- <view class="applyInfo">
				申请获取以下权限
			</view>
			<view class="applyInfoSub">
				获得你的公开信息（昵称、头像等）
			</view> -->
			<!-- #ifdef MP-WEIXIN -->
			<view v-if="!authorizeFlag" class="authorizaWxBtn" type="primary">
				微信授权
				<wxLogin v-if="!authorizeFlag" @wechatMiniAuth='getUserInfo'></wxLogin>
			</view>
			<button class="authorizaWxBtn" v-else type="primary" open-type="getPhoneNumber" withCredentials="true" lang="zh_CN" @getphonenumber="getphonenumber">授权手机号</button>
			<!-- #endif -->
			<view class="noApplyInfoBtn" @click="goBack(1)">
				暂不登录
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
			<view v-if="(hideFMCanvas != undefined) && !hideFMCanvas">
				<canvas canvas-id='tdcanvas' style='margin-top:200rpx'></canvas>
			</view>
		<!-- #endif  -->
	</view>
</template>

<script>
	import wxLogin from '@/common/model/wxLogin/index.vue'
	// #ifdef MP-WEIXIN
	import fmagent from '@/common/js/fmagent.js'
	// #endif
	import memberApi from '@/api/member/index.js'
	export default {
		//  #ifdef MP-WEIXIN
		mixins:[fmagent],
		// #endif
		data() {
			return {
				userInfo:{
					
				},
				authorizeFlag:false,
				retry:1,	//手机号解密重试次数
				loginRetry:1,	//登录重试次数
				wxLoginParams:""
			}
		},
		onShow() {
			this.zhuge.track("微信授权")
			//  #ifdef MP-WEIXIN
			this.fmagentInit()
			// #endif
		},
		methods: {
			getUserInfo(res){
				this.wxLoginParams = res;
				this.authorizeFlag = true;
				uni.hideLoading()
			},
			getphonenumber(res){	//获取手机号回调
				if(res.detail.errMsg=="getPhoneNumber:ok"){
					this.wechatMiniAuthTelephone(res.detail)
				}else{
					uni.showToast({
						title:"获取失败",
						icon:"none"
					})
				}
			},
			uniGetUserInfo(){	//获取个人信息
				uni.login({
					success:(res)=> {
						this.$set(this.wxLoginParams,"code",res.code)
						this.$set(this.wxLoginParams,"telephone",uni.getStorageSync("userInfoTelphone"))
						this.$set(this.wxLoginParams,"inviteCode",uni.getStorageSync("routerShareNumber")?uni.getStorageSync("routerShareNumber"):"")
						this.wechatMiniAuth()
					}
				})
			},
			wechatMiniAuthTelephone(params){	//解密手机号
				let paramsData = {
					encryptedData:params.encryptedData,
					iv:params.iv,
				}
				uni.login({
					success:()=>{
						uni.login({
							success:(data)=> {
								paramsData.code = data.code;
								memberApi.wechatMiniAuthTelephone(paramsData).then(res=>{
									if(res.data.code==200){	//将解密的手机号保存下来 然后去登录
										uni.setStorageSync("userInfoTelphone",res.data.data);
										this.uniGetUserInfo()
									}else{
										if(this.retry>3){
											uni.showToast({
												title:res.data.message,
												icon:"none"
											})
											return
										}
										this.retry++;
										this.wechatMiniAuthTelephone(params)
									}
								})
							}
						})
					}
				})
			},
			wechatMiniAuth(){	//微信登录
				memberApi.wechatMiniAuth(this.wxLoginParams).then(res=>{
					if(res.data.code==200){
						this.zhuge.identify(res.data.data.telephone)
						this.judgeLoginType(res)
					}else{
						if(this.loginRetry>3){
							uni.showToast({
								title:res.data.message,
								icon:"none"
							})
							return
						}
						this.loginRetry++;
						this.uniGetUserInfo()
					}
				})
			},
			judgeLoginType(res){	//登录类型判断
				if (!res.data.data.hasBindTel) {
					this.$Router.replace({
						path: "/pages/phoneCheck/index",
						query: {
							loginName: res.data.data.userName,
							operateCode: res.data.data.bindTelCode,
							isLogin: true
						}
					})
				} else {
					if (res.data.data.needResetPwd) {
						this.$Router.replace({
							path: "/pages/modifyPwdForLogin/index",
							query: {
								loginName: res.data.data.userName,
								telephone: res.data.data.telephone,
								resetPwdCode: res.data.data.resetPwdCode,
								isLogin: true
							}
						})
					} else if (res.data.data.needVerifyTel) {
						this.$Router.replace({
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
						uni.setStorageSync("sessionId", res.data.data.sessionId);
						uni.setStorageSync("shareNumber",res.data.data.shareNumber)
						uni.setStorageSync("userInfo", JSON.stringify(res.data.data))
						uni.showToast({
							title: "登录成功",
							icon: "none"
						})
						this.goBack(2)
					}
				}
			},
		},
		components:{
			wxLogin
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.authorizaBtn{
		width: calc(100% - 120rpx);
		margin: 0 auto;
		padding-top: 80rpx;
	}
	.authorizaBtn image{
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		border: 1rpx solid #E4E4E4;
	}
	.authorizaBtnBox{
		width: 100%;
		height: 100%;
		position: relative;
		/* opacity: 0.01; */
	}
	.authorizaWxBtn{
		width: 100%;
		height: 92rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		background-color: #1aad19;
		text-align: center;
		line-height: 92rpx;
		border-radius: 4px;
	}
	.authorizaImage{
		width: 160rpx;
		height: 180rpx;
		margin: 0 auto;
		text-align: center;
		padding: 20rpx 0;
	}
	.applyInfo{
		text-align: left;
		font-size: 26rpx;
		margin-bottom: 40rpx;
	}
	.applyInfoSub{
		text-align: left;
		font-size: 24rpx;
		color: #CCCCCC;
		margin-bottom: 40rpx;
	}
	.goBacLoginkBtn{
		width: calc(100% - 120rpx);
		margin: 0 auto;
		height: 80rpx;
		text-align: center;
		line-height: 100rpx;
		color: #FFFFFF;
		background-color: #DDDDDD;
		margin-top: 40rpx;
		border-radius: 8rpx;
	}
	.noApplyInfoBtn{
		margin-top: 40rpx;
		color: #999999;
		text-align: center;
	}
</style>
