<template>
	<view class="page newUser" :class="!saveNewUserStatus?'active':''">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="markQuee">
			<view class="roll">
				<roll v-if="list" :list='list'></roll>
			</view>
			<view class="ruleBtn" @click="openRulePopup()">
				查看规则
			</view>
		</view>
		<renovation url='xinrenzhuanxiang'></renovation>
		<!-- 活动已过期  非新人弹窗 -->
		<activeStatus ref='goHomeType'></activeStatus>
		<!-- 活动规则弹窗 -->
		<uni-popup ref="rulePopup" type="center">
			<activeRule @closeRulePopup='closeRulePopup' :description='newUserInfo && newUserInfo.description'></activeRule>
		</uni-popup>
		<!-- 分享海报 -->
		<inviteNew></inviteNew>
		<view class="openNews" @click="openSubscribe" v-if="saveNewUserStatus">
			<view class="closeNewsBtn" @click.stop="closeMessage()"></view>
		</view>
	</view>
</template>

<script>
	import roll from '@/common/model/roll/index';
	import activeStatus from './activeStatus.vue';
	import activeRule from './activeRule.vue';
	import inviteNew from './inviteNew.vue'
	import appApi from '@/api/app/index.js'
	import renovation from '@/pages/renovation/index.vue'
	import  wechatApi from "@/api/wechat/index.js"
	export default {
		data(){
			return{
				list:"",
				newUserInfo:"",
				defaultTitleDto:{
					title:'新人专享',
				},
				saveNewUserStatus:true
			}
		},
		methods:{
			openRulePopup(){	//打开规则弹窗
				this.$refs.rulePopup.open()
			},
			closeRulePopup(){
				this.$refs.rulePopup.close()
			},
			newPersonInfo(){	//新人专享活动信息
				appApi.newPersonInfo().then(res=>{
					if(res.data.code == 200){
						this.newUserInfo = res.data.data;
						if(!res.data.data){
							this.$refs.goHomeType.interDown()
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			closeMessage(){ // 本次登录有效期不在出现
				this.saveNewUserStatus = false
				uni.setStorageSync("saveNewUserStatus",1)
			},
			newPersonOrderTips(){	//新人专享下单提示信息
				appApi.newPersonOrderTips().then(res=>{
					if(res.data.code == 200){
						this.list = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			openSubscribe(){	//开启订阅
				appApi.smsSubject([0,1]).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"订阅成功",
							icon:"none"
						})
						this.saveNewUserStatus = false
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			wechatTemplates(){	//是否订阅
				appApi.smsSubjectState([0,1]).then(res=>{
					if(res.data.code==200){
						this.saveNewUserStatus = !res.data.data
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
			this.newPersonInfo();
			this.newPersonOrderTips();
			if(uni.getStorageSync("saveNewUserStatus")){
				this.saveNewUserStatus = false
			}else{	//调用接口 判断是否显示消息提醒
				if(uni.getStorageSync("sessionId")){
					this.wechatTemplates()
				}
			}
		},
		onShareAppMessage(res) { //发送给朋友
			this.zhuge.track("新人专享活动分享")
			let shareImage = (this.newUserInfo&&this.newUserInfo.shareImage)?this.newUserInfo.shareImage:"/appletsImages/newUserShareImage.png";
			return {
				title: this.newUserInfo&&this.newUserInfo.shareDescription?this.newUserInfo.shareDescription:"神秘邀请：你被拉入优惠商品福利专区！",
				path: "/pages/newUser/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):""),
				imageUrl: this.$config.imgBaseUrl + shareImage
			}
		},
		onShareTimeline(res) { //分享到朋友圈
			this.zhuge.track("新人专享活动分享")
			let shareImage = (this.newUserInfo&&this.newUserInfo.shareImage)?this.newUserInfo.shareImage:"/appletsImages/newUserShareImage.png";
			return {
				title: this.newUserInfo&&this.newUserInfo.shareDescription?this.newUserInfo.shareDescription:"神秘邀请：你被拉入优惠商品福利专区！",
				path: "/pages/newUser/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):""),
				imageUrl: this.$config.imgBaseUrl + shareImage
			}
		},
		onLoad(query) {
			try{
				if(query && query.scene){
					this.zhuge.track("新人专享分享落地页")
					uni.setStorageSync("routerShareNumber",decodeURIComponent(query.scene).split(",")[0])
					return
				}
				this.zhuge.track("新人专享落地页")
			}catch(err){
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
			
		},
		components:{
			roll,
			activeStatus,
			activeRule,
			inviteNew,
			renovation
		}
	}
</script>

<style scoped>
	.newUser{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		padding-bottom: 145rpx;
	}
	.newUser.active{
		padding-bottom: 0;
	}
	.markQuee{
		width: calc(100% - 60rpx);
		height: 50rpx;
		position: absolute;
		top: 32rpx;
		/* #ifndef MP-WEIXIN */
		top: 120rpx;
		/* #endif */
		left: 0;
		right: 0;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 1;
	}
	.roll{
		height: 50rpx;
		width: 370rpx;
		border-radius: 25px;
		padding-left: 10rpx;
		background-color: rgba(0,0,0,0.2);
	}
	.ruleBtn{
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		color: #FFFFFF;
	}
	.openNews{
		width: 100%;
		height: 140rpx;
		position: fixed;
		padding-bottom: 30rpx;
		bottom: 0rpx;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 10;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_coupon_info.png) #FFFFFF 100% 100% no-repeat;
		background-size: calc(100% - 60rpx) 100rpx;
		background-position: 30rpx 10rpx;
	}
	.closeNewsBtn{
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		right: 20rpx;
		top: 6rpx;
	}
	
</style>
