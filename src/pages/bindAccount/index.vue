<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="bindAlready bindTelBox">
			<view class="bindInfo">
				<view>
					手机号
				</view>
				<view class="des">
					{{accountInfo.hiddenTelephone}}
				</view>
			</view>
			<view class="bindBtn" v-if="accountInfo.bindTelephone" @click="goToBindTel">
				<view>换手机号</view>
			</view>
		</view>
		<view class="bindAlready">
			<view class="bindInfo">
				<view>
					微信绑定
				</view>
			</view>
			<view class="bindBtn">
				<!-- #ifdef MP-WEIXIN -->
				<view v-if="!accountInfo.bindWx">
					<wxLogin @wechatMiniAuth='getUserInfo'></wxLogin>
					去绑定
				</view>
				<view v-else @click='wechatMiniUnBind'>去解绑</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view v-if="!accountInfo.bindWx" @click='getCode'>去绑定</view>
				<view v-else @click='wechatMiniUnBind'>去解绑</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	import wechatApi from '@/api/wechat/index.js'
	import wxLogin from '@/common/model/wxLogin/index.vue'
	export default {
		data(){
			return{
				accountInfo:{	//获取账号绑定信息
					
				},
				authorizeFlag:false,	//是否已授权
				isWxFlag:false,	//是否是微信公众号
				wxCode:"",	//公众号code
				defaultTitleDto:{
					title:'绑定账号',
					bottomColor:'#e6e6e6'
				}
			}
		},
		methods:{
			account(){	//获取账号绑定信息
				memberApi.account().then(res=>{
					if(res.data.code==200){
						this.accountInfo = res.data.data;
						if(!this.accountInfo.bindWx && this.wxCode){
							this.wechatH5Bind()
						}else if(this.accountInfo.bindWx && this.wxCode){
							this.wechatMiniUnBind()
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getUserInfo(data){
				uni.login({
					success:(res)=>{
						let params = {
							encryptedData:data.encryptedData,
							iv:data.iv,
							code:res.code,
						}
						this.wechatMiniBind(params)
					}
				})
			},
			wechatMiniBind(params){	// 小程序绑定微信
				memberApi.wechatMiniBind(params).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"绑定成功",
							icon:"none"
						})
						this.account()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			wechatMiniUnBind(){	//小程序解绑微信
				memberApi.wechatMiniUnBind().then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"解绑成功",
							icon:"none"
						})
						this.account()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getCode(){	//获取code
				wechatApi.wxPubAppId().then(res=>{
					if(res.data.code==200){
						let urls = 'https://' + location.host + location.pathname;
						location.href=location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+res.data.data+'&redirect_uri=' + encodeURIComponent(urls) + '&response_type=code&scope=snsapi_userinfo';
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			wechatH5Bind(){	//公众号绑定微信
				memberApi.wechatH5Bind(this.wxCode).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"绑定成功",
							icon:"none"
						})
						this.wxCode = ""
						this.account()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			wechatH5Unbind(){	//解绑微信
				memberApi.wechatH5Unbind().then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"解绑成功",
							icon:"none"
						})
						this.wxCode = ""
						this.account()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToBindTel(){
				this.$Router.push({path:'/pages/changeCellPhone/index',query:{tel:this.accountInfo.telephone}})
			}
		},
		onShow() {
			this.zhuge.track("绑定账号")
			if(uni.getStorageSync("sessionId")){
				this.account();
			}else{
				this.$Router.push({
					path:"/pages/login/index"
				})
			}
			// #ifdef H5
			let ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				this.isWxFlag = true //在微信浏览器中
			} else {
				this.isWxFlag = false //不在微信浏览器中
			}
			//#endif
		},
		onLoad(option) {
			if(option.code){
				this.wxCode = option.code
			}
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
	.bindAlready {
		width: 100%;
		display: flex;
		height: 138rpx;
		padding: 18rpx 30rpx 0 32rpx;
	}

	.bindInfo {
		flex: 1;
		height: auto;
		padding-top: 30rpx;
	}
	.bindBtn {
		height: 100%;
		display: flex;
		align-items: center;
		position: relative;
	}

	.bindBtn view,.bindWxBtn {
		display: block;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 28rpx;
		border: 1rpx solid #a4a4a4;
		padding: 0 10rpx;
		color: #787878;
		background-color: none;
	}
	.bindWxBtn{
		opacity: 0.01;
		border: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.des{
		color: #999999;
		margin-top: 14rpx;
		line-height: 27rpx;
		font-size: 24rpx;
	}
	
</style>
