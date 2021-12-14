<template>
	<view class="page userInfo">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		
		<view class="userInfoHead" @click="chooseImage">
			<view class="userInfoText">头像</view>
			<headImg class="userInfoHeadImage" :head="userInfo.smallIcon"></headImg>
			<view class="userInfoArrow"></view>
		</view>
		<view class="infoBox">
			<view class="userInfoRow">
				<text>用户名</text>
				<text class="row">{{userInfo.userName}}</text>
			</view>
			<view class="userInfoRow" @click="goEditName">
				<text>昵称</text>
				<view class="row">
					{{userInfo.nickName?userInfo.nickName:"请设置昵称"}}
					<text class="rowBtn"></text>
				</view>
			</view>
			<view class="userInfoRow" @click="openGenderPopup">
				<text>性别</text>
				<view class="row">
					{{userInfo.gender}}
					<text class="rowBtn"></text>
				</view>
			</view>
			<view class="userInfoRow" @click="openCalendar">
				<text>出生日期</text>
				<view class="row">
					{{userInfo.birthday?userInfo.birthday:""}}
					<text class="rowBtn"></text>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="genderBox">
				<view class="genderChoose">
					<view class="gender" @click="memberUpdate(1)">男</view>
					<view class="gender" @click="memberUpdate(0)">女</view>
				</view>
				<view class="cancelBtn" @click="closeGenderPopup">
					取消
				</view>
			</view>
		</uni-popup>
		<uni-calendar
			:insert="false"
			ref='calendar'
			@confirm="confirm"
		/>
	</view>
</template>

<script>
	import headImg	from  '@/common/model/head.vue'
	import memberApi from '@/api/member/index.js'
	import uniUploadImage from '@/common/js/uniUploadImage.js'
	export default{
		mixins:[uniUploadImage],
		data(){
			return{
				userInfo:{},
				imgBaseUrls:"",
				defaultTitleDto:{
					title:'个人信息',
					bottomColor:'#E6E6E6'
				}
			}
		},
		onShow(){
			this.zhuge.track("个人信息-落地页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.memberInfo()	//获取个人信息
		},
		methods:{
			memberInfo(){	//获取个人信息
				memberApi.memberInfo().then(res=>{
					if(res.data.code==200){
						res.data.data.gender = res.data.data.gender?"男":"女"
						this.userInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			chooseImage(){	//更换头像
				uni.chooseImage({
					count:1,
					success:(data)=>{
						this.uploadImage(data.tempFiles[0].path)
					}
				})
			},
			updateImage(uploadFileRes){
				let params = {
					bigIcon:uploadFileRes.data,
					smallIcon:uploadFileRes.data
				}
				memberApi.memberUpdate(params).then(res=>{
					if(res.data.code==200){
						this.userInfo.smallIcon = uploadFileRes.data;
						uni.setStorageSync("userInfo",JSON.stringify(this.userInfo))
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goEditName(){
				this.$Router.push({
					path:'/pages/editNickName/index',
					query:{
						nickName:this.userInfo.nickName?this.userInfo.nickName:'',
					},
				})
			},
			openGenderPopup(){	//打开性别编辑弹窗
				this.$refs.popup.open()	//打开性别编辑弹窗
			},
			closeGenderPopup(){	//关闭弹窗
				this.$refs.popup.close()
			},
			memberUpdate(item){	//更新个人信息
				this.$refs.popup.close()
				memberApi.memberUpdate({gender:item}).then(res=>{
					if(res.data.code==200){
						this.memberInfo();
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			confirm(params){	//日期发生变化是触发
				memberApi.memberUpdate({birthday:params.fulldate}).then(res=>{
					if(res.data.code==200){
						this.memberInfo();
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			openCalendar(){	//打开日期选择
				this.$refs.calendar.open()
			}
		},
		components:{
			headImg
		}
	}
</script>

<style scoped>
	.userInfo{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	
	.userInfoHead{
		width: 100%;
		height: 170rpx;
		display: flex;
		align-items: center;
		position: relative;
		border-bottom: 1rpx solid #E4E4E4;
	}
	.userInfoText{
		flex: 1;
		padding-left: 24rpx;
		color: #333333;
	}
	.userInfoHeadImage{
		width: 120rpx;
		height: 120rpx;
	}
	.userInfoArrow{
		width: 76rpx;
		height: 140rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
	}
	.infoBox{
		padding-left: 24rpx;
	}
	.userInfoRow{
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		padding-right: 38rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #E4E4E4;
	}
	.row{
		color: #999;
	}
	.rowBtn{
		width: 12rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
		height: 24rpx;
		display: inline-block;
		margin-left: 10rpx;
	}
	.genderBox{
		width: 702rpx;
		height: 540rpx;
		margin: 0 auto;
	}
	.genderChoose{
		width: 100%;
		height: 360rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
	}
	.genderChoose .gender{
		width: 100%;
		height: 50%;
		line-height: 180rpx;
		text-align: center;
		font-size: 32rpx;
		color: #666666;
	}
	.cancelBtn{
		width: 702rpx;
		text-align: center;
		line-height: 88rpx;
		height: 88rpx;
		color: #FFFFFF;
		background-color: #FF1558;
		border-radius: 71rpx;
		font-size: 36rpx;
		margin: 31rpx 0 71rpx;
	}
</style>
