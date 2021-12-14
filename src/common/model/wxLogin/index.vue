<template>
	<view>
		<button class="authorizaBtnBox userName" v-if="canIUseGetUserProfile" lang="zh_CN" @tap="getUserProfile">
		</button>
		<button class="authorizaBtnBox userName" v-else open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authorizeFlag:false,
				canIUseGetUserProfile:false,//是否能够使用getUserProfile
				code:'',
			}
		},
		mounted() {
			if (uni.canIUse("getUserProfile")){
				this.canIUseGetUserProfile = true
			}else{
				this.canIUseGetUserProfile = false
			}
		},
		methods:{
			getUserProfile(e){ //新版本获取头像
				 // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				 // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				 let _this = this
				 uni.login({
					 success:(data)=>{
						_this.code = data.code
					 }
				 })
				 uni.getUserProfile({
				   desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				   success: (res) => {
					 _this.encryptedData = res.encryptedData
					 _this.iv = res.iv
					 _this.uniLogin(true)
				   },
				   fail(){
					   uni.showToast({
					   	title:"授权失败",
					   	icon:"none"
					   })
				   }
				 })
			},
			getUserInfo(res){	//获取授权信息
				uni.login({
					 success:(data)=>{
						this.code = data.code
					 }
				})
				if(res.detail.errMsg=="getUserInfo:ok"){
					uni.getUserInfo({
						success:(res1)=>{
							this.encryptedData = res1.encryptedData
							this.iv = res1.iv;
							this.uniLogin(true);
						}
					})
				}else{
					uni.showToast({
						title:"授权失败",
						icon:"none"
					})
				}
			},
			uniLogin(flag){	//微信登录换取信息
				uni.showLoading({
					title:"加载中..."
				})
				if(!flag){
					uni.login({
						success:(data)=>{
							this.code = data.code
						}
					})
				}
				let parmas = {
					encryptedData:this.encryptedData,iv:this.iv,code:this.code
				}
				this.$emit("wechatMiniAuth",parmas)
			},
		}
	}
</script>

<style scoped lang="scss">
	 .authorizaBtnBox{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.01;
	}
</style>
