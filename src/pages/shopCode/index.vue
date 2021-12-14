<template>
	<view class="pages commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="review">
			<view class="codeTitle">输入验证码查看执照信息</view>
			<view class="codeInfo">
				<input type="text" v-model="verifyCode" class="codeInput" />
				<view class="codeImage" @click='merchGetVerifyCode'>
					<image v-if="codeInfo.verifyCode" :src="'data:image/jpg;base64,'+codeInfo.verifyCode.replace(/[\r\n]/g, '')" mode=""></image>
					<view class="codeText">
						点击图片换一张
					</view>
				</view>
			</view>
			<view class="codeSubmit" @click='checkVerifyCode'>
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import merchantApi from '@/api/merchant/index.js'
	export default {
		data(){
			return{
				codeInfo:{	//验证码相关信息
					
				},
				verifyCode:"",	//验证码
				defaultTitleDto:{
					title:'营业执照',
				}
			}
		},
		methods:{
			merchGetVerifyCode(){	//获取验证码
				merchantApi.merchGetVerifyCode().then(res=>{
					if(res.data.code==200){
						this.codeInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			checkVerifyCode(){	//校验验证码
				let params = {
					storeId:this.$Route.query.storeId,
					type:0,
					verifyCode:this.verifyCode,
					verifyCodeToken:this.codeInfo.verifyCodeToken
				}
				merchantApi.checkVerifyCode(params).then(res=>{
					if(res.data.code==200){
						uni.setStorageSync("storeLicence",JSON.stringify(res.data.data))
						this.$Router.replace({
							path:"/pages/storeLicence/index",
							query:{
								storeId:this.$Route.query.storeId
							}
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		onShow() {
			this.zhuge.track("营业执照验证码-落地页",{
				"店铺id":this.$Route.query.storeId
			})
			this.merchGetVerifyCode()
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		height: 100vh;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}	
	.review{
		width: 100%;
		height: auto;
		padding: 0 60rpx;
	}
	
	.codeTitle{
		margin-top: 60rpx;
		color: #333333;
		font-size: 34rpx;
	}
	.codeInfo{
		width: 100%;
		height: auto;
		display: flex;
		margin-top: 72rpx;
		height: 136rpx;
	}
	.codeSubmit{
		width: 100%;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		background-color: #FF1558;
		font-size: 32rpx;
		color: #FFFFFF;
		margin-top: 60rpx;
		border-radius: 26px;
	}
	.codeImage{
		width: 220rpx;
		height: 88rpx;
		border: 1rpx solid #E4E4E4;
	}
	.codeImage image{
		height: 85rpx;
		width: 100%;
	}
	.codeInput{
		border-bottom: 1rpx solid #E4E4E4;
		margin-right: 36rpx;
		margin-top: 30rpx;
		flex: 1;
	}
	.codeText{
		font-size: 20rpx;
		text-align: center;
		color: #999999;
		margin-top: 12rpx;
	}
</style>
