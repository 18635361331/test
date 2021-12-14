<template>
	<view class="page">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="myHeader">
			<view class="userInfo loginActive">
				<view class="userInfoHead" v-if="userInfo">
					<view v-if="userInfo.smallIcon && userInfo.smallIcon.indexOf('http')!='-1'" :style="{backgroundImage:'url('+userInfo.smallIcon+')'}" class="userInfoTitleImage"></view>
					<view v-else-if="userInfo.smallIcon" :style="{backgroundImage:'url('+imgBaseUrl+userInfo.smallIcon+')'}" class="userInfoTitleImage"></view>
					<view v-else class="userInfoTitleImage" :style="{backgroundImage:'url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/default_phone.png)'}"></view>
				</view>
				<view class="userName">
					<view>
						<text class="nickName ellipsis-one">{{userInfo.nickName?userInfo.nickName:userInfo.telephone}}</text>
					</view>
					<view class="des noLeft" v-if="code">
						<text class="info">激活码</text>
						<text class="code">{{code}}</text>
						<text class="copy" @click="copy(code)">复制</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="info" :class="type==1?'activation':''">
			<text class="headTitle">车总管权益介绍</text>
			<view class="banner">
				
			</view>
		</view>
		<block v-if="!det.activeState">
			<view class="group">
				<text class="type">邀请码</text>
				<input type="text" v-model="cardNo" placeholder="请输入激活码" placeholderClass="placeholder" class="searchInput" />
			</view>
			<view class="inviteBtn" @click="activation">
				<text>立即激活</text>
			</view>
		</block>
		<view class="btn use" v-else @click="goOther">立即享受权益</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/setCopy.js'
	import thirdpartyApi from '@/api/thirdparty/index.js'
	import memberApi from '@/api/member/index.js'
	export default {
		mixins:[mixin],
		data() {
			return {
				userInfo:{
					
				},
				type:1,
				code:'',//获取到的激活码
				cardNo:'',//激活码
				imgBaseUrl:this.$config.imgBaseUrl,
				defaultTitleDto:{
					title:'权益介绍',
					bg:'starShopBackWrite.png',
					color:"white"
				},
				det:{	//获取会员权益卡基本信息
					
				}
			}
		},
		onLoad(query) {
			try{
				if(query && query.scene){
					this.cardNo = decodeURIComponent(query.scene).split(",")[0];
					this.$Router.replace({
						path:"/pages/partner/index"
					})
				}
			}catch(e){
				
			}
			if(uni.getStorageSync("sessionId")){
				this.memberInfo();
				this.getPrivilegeCardSummary()
			}else{
				this.$Router.push({
					path:"/pages/login/index"
				})
			}
		},
		methods:{
			memberInfo(){	//获取用户信息
				memberApi.memberInfo().then(res=>{
					if(res.data.code==200){
						this.userInfo = res.data.data;
						if(this.userInfo.plusFlag){
							this.getCode();
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getPrivilegeCardSummary(){	//获取会员权益卡基本信息
				thirdpartyApi.getPrivilegeCardSummary().then(res=>{
					if(res.data.code == 200){
						this.det = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getCode(){ //生成激活码
				thirdpartyApi.getSinglePrivilegeCardNo().then(res=>{
					if(res.data.code == 200){
						this.code = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			activation(){ // 发送请求
				if(!this.code){
					uni.showToast({
						title:"请填写激活码",
						icon:"none"
					})
				}
				uni.showLoading({
					title:"加载中..."
				})
				thirdpartyApi.activePrivilegeCard(this.cardNo).then(res=>{
					uni.hideLoading();
					if(res.data.code == 200){
						uni.showToast({
							title: "激活成功",
							icon: "none",
						});
						this.det.activeState = 1
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goOther(){
				
			}
		}
	} 
</script>

<style lang="scss" scoped>
	@import '@/common/css/all';
	
	.myHeader {
			width: 100%;
			height: 195rpx;
			background-color: #FFEFDB;
			border-radius: 20rpx;
			background-size: 100% 100%;
			padding: 26rpx 30rpx;
			&.ordinary{
				background-image: url($img-oss+'resellerComBg.png');
			}
			&.isVip{
				height: 210rpx;
				background-image: url($img-oss+'resellerBg.png');
			}
			.des {
				margin-left: 150rpx;
				text {
					vertical-align: middle;
					display: inline-block;
				}
			
				.info {
					font-size: 28rpx;
					font-weight: 400;
					color: #CB9958;
				}
			
				.code {
					font-size: 28rpx;
					font-weight: bold;
					color: #C78E57;
					margin: 0 24rpx;
				}
			
				.copy {
					font-size: 24rpx;
					font-weight: 400;
					color:#7F4A13;
				}
			}
		}
	
		.userInfo {
			display: flex;
			align-items: center;
			position: relative;
			.authorizaBtnBox{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0.01;
			}
		}
	
		.userInfoHead {
			width: 120rpx;
			height: 120rpx;
			margin-right: 30rpx;
			// border: 1px solid #FFFFFF;
			border-radius: 50%;
	
			image,
			view {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
	
			view {
				background-size: 100% 100%;
			}
	
		}
	
		.userName {
			width: 70%;
			font-size: 32rpx;
			font-weight: bold;
			color: #8F591F;
			.nickName{
				border: none;
				background: transparent;
				padding: 0;
				margin: 0;
				width: 200rpx;
				color: #8F591F;
				&:after{
					border: none;
				}
			}
		}
	.page{
		background: #27292D;
		height: 100vh;
		padding:110rpx 30rpx 30rpx;
	}
	.headTitle{
		font-size: 40rpx;
		color: #FFFFFF;
		margin-top: 56rpx;
	}
	.banner{
		width: 100%;
		height: 625rpx;
		background: #FFEFDB;
		border-radius: 16px;
		margin-top: 36rpx;
	}
	.activation .banner{
		height: 450rpx;
	}
	.myHeader.isVip{
		height: auto;
	}
	.noLeft.des{
		margin-left: 0;
		margin-top: 20rpx;
	}
	.group{
		width: 100%;
		background: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		padding: 28rpx 26rpx;
		margin-top: 43rpx;
		.type{
			width: 120rpx;
			font-size: 30rpx;
			font-weight: 400;
			color: #333;
			margin-right: 142rpx;
		}
		input{
			width: 50%;
			color: #333333;
			font-size: 28rpx;
		}
	}
	.inviteBtn{
		width: 100%;
		position: fixed;
		padding: 20rpx 30rpx;
		bottom: 0;
		padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		left: 0;
		z-index: 120;
		box-shadow: 1px -3px 2px rgba(126, 125, 125, 0.18);
		background: #fff;
		&.disabled{
			text{
				color: #999999;
			}
		}
		text{
			background: linear-gradient(90deg, #E8BA7C 0%, #FFEFDB 100%);
			height: 78rpx;
			font-size: 32rpx;
			line-height: 78rpx;
			font-weight: bold;
			color: #12151C;
			text-align: center;
			border-radius: 60rpx;
			display: block;
		}
		
	}
	
	.use{
		width: calc(100% - 60rpx);
		height: 78rpx;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 78rpx;
		border-radius: 40rpx;
		text-align: center;
		color: #FFEFDB;
		background: #804B11;
		position: fixed;
		bottom: calc(30rpx + constant(safe-area-inset-bottom));
		bottom: calc(30rpx + env(safe-area-inset-bottom));
	}
</style>
