<template>
	<view class="page">
		<!-- #ifndef MP-WEIXIN -->
		<view class="goBack" @click="goBack(1)"></view>
		<!-- #endif -->
		<view class="setTitle">设置</view>
		<view class="setInfo" v-if="userInfo">
			<headImg class="userInfoHead" :head="userInfo.smallIcon"></headImg>
			<view class="userInfoTitle" @click="goToUserInfo">
				{{userInfo.nickName?userInfo.nickName:'请设置昵称'}}
			</view>
			<view class="setTitleIcon"></view>
		</view>
		<view class="setConfig">
			<view class="everyConfig" v-for="item,index in setConfigList" :key='item.id' @click="goToPath(item)">
				<image :src="'http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/'+item.icon" mode=""></image>
				<view class="userInfoTitle">
					{{item.name}}
				</view>
				<view class="setTitleIcon"></view>
			</view>
		</view>
		<view class="quitLogin" @click="quitLogin">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/set_out@2x.png"></image>
			<view class="userInfoTitle">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	import headImg	from  '@/common/model/head.vue'
	import memberApi from '@/api/member/index.js'
	export default{
		data(){
			return{
				setConfigList:[
					{
						icon:"set_location@2x.png",
						name:"地址管理",
						path:"/pages/address/index",
						id:1
					},
					{
						icon:"set_bind@2x.png",
						name:"绑定账号",
						path:"/pages/bindAccount/index",
						id:2
					},
					{
						icon:"set_password@2x.png",
						name:"密码保护",
						path:"/pages/cryptoguard/index",
						id:3
					},
					{
						icon:"set_aboutus@2x.png",
						name:"关于我们",
						path:"/pages/aboutMe/index",
						id:4
					},
					{
						icon:"szz2.png",
						name:"保密协议",
						path:"/pages/confidentiality/index",
						id:5
					}
				],
				userInfo:{},
				imgBaseUrls:"",
			}
		},
		methods:{
			quitLogin(){
				memberApi.logout().then(res=>{})
				let userInfoTelphone = uni.getStorageSync("userInfoTelphone")?uni.getStorageSync("userInfoTelphone"):""
				let miniRouter = uni.getStorageSync("miniRouter")
				let memberConfig = uni.getStorageSync("memberConfig")
				uni.clearStorageSync();
				uni.setStorageSync("userInfoTelphone",userInfoTelphone);
				uni.setStorageSync("miniRouter",miniRouter);
				uni.setStorageSync("memberConfig",memberConfig);
				uni.switchTab({
					url:"/pages/my/index"
				})
			},
			goToPath(item){
				this.$Router.push({path:item.path})
			},
			goToUserInfo(){
				this.$Router.push({path:'/pages/userInfo/index'})
			}
		},
		onShow() {
			this.zhuge.track("设置-落地页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.userInfo = JSON.parse(uni.getStorageSync("userInfo"))
		},
		components:{
			headImg
		}
	}
</script>

<style scoped>
	.goBack{
		width: 80rpx;
		height: 88rpx;
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_1@2x.png") no-repeat 50%;
		background-size: 16rpx 28rpx;
	}
	.setTitle{
		width: 100%;
		padding: 24rpx 0 24rpx 36rpx;
		font-weight: 700;
		font-size: 60rpx;
		line-height: 84rpx;
	}
	.setInfo{
		width: 100%;
		height: 170rpx;
		background-color: #FFFFFF;
		display: flex;
		padding-left: 24rpx;
		align-items: center;
		border-top: 1px solid #E4e4e4;
		border-bottom: 1px solid #E4e4e4;
	}
	.userInfoHead{
		width: 100rpx;
		height: 100rpx;
	}
	.userInfoTitle{
		flex: 1;
		height: 140rpx;
		font-size: 28rpx;
		color: #666666;
		padding-left: 24rpx;
		display: flex;
		align-items: center;
	}
	.setTitleIcon{
		width: 76rpx;
		height: 140rpx;
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png") no-repeat 50%;
		background-size: 12rpx 24rpx;
	}
	.setConfig{
		width: 100%;
		height: auto;
		margin-top: 60rpx;
		padding-left: 24rpx;
		padding-bottom: 60rpx;
		border-top: 1px solid #E4e4e4;
		border-bottom: 1px solid #E4e4e4;
	}
	.everyConfig{
		display: flex;
		align-items: center;
		height: 110rpx;
		overflow: hidden;
		border-bottom: 1px solid #E4e4e4;
	}
	.everyConfig image{
		width: 40rpx;
		height: 40rpx;
	}
	.quitLogin{
		display: flex;
		align-items: center;
		height: 110rpx;
		padding-left: 24rpx;
		border-bottom: 1px solid #E4e4e4;
	}
	.quitLogin image{
		width: 40rpx;
		height: 40rpx;
	}
</style>
