<template>
	<view class="page commonPageTitle">
		<!-- #ifndef MP-WEIXIN -->
		<view class="collectTitle">
			<view class="goBackBtn" @click="backHref"></view>
			<view class="title">
				{{isEnterprise?'企业':'VIP'}}会员
			</view>
		</view>
		<!-- #endif  -->
		<view class="infoBox">
			<view class="userInfo">
				<view v-if="userInfo.smallIcon && userInfo.smallIcon.indexOf('http')!='-1'" :style="{backgroundImage:'url('+userInfo.smallIcon+')'}" class="userInfoTitleImage"></view>
				<view v-else-if="userInfo.smallIcon" :style="{backgroundImage:'url('+imgBaseUrls+userInfo.smallIcon+')'}" class="userInfoTitleImage"></view>
				<view v-else class="userInfoTitleImage" :style="{backgroundImage:'url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/default_phone.png)'}"></view>
				<view class="userInfoText">
					<view class="userName">
						{{userInfo.nickName?userInfo.nickName:userInfo.userName}}
					</view>
				</view>
			</view>
			<view class="priceBox">
				<text>年费</text>
				<text v-if="plusInfo.mokaConfigDTO">￥{{plusInfo.mokaConfigDTO.plusPrice}}</text>
			</view>
		</view>
		<view class="membrGiftTitle">
			{{isEnterprise?'企业':'VIP'}}会员{{plusInfo.privilegeUnitDTOList?plusInfo.privilegeUnitDTOList.length:0}}大权益
		</view>
		<view class="memberIncome">
			<memberRights v-if="plusInfo.privilegeUnitDTOList" :privilegeUnitDTOList='plusInfo.privilegeUnitDTOList' color="#000"></memberRights>
		</view>
		<enterpriseInfo v-if='isEnterprise' :enterpriseInfo='enterpriseInfo' :selectAddressParams='selectAddressParams' @addressChange='addressChange' @enterpriseInfoChange='enterpriseInfoChange'></enterpriseInfo>
		<view class="invitationCode">
			<text>邀请码</text>
			<input type="text" v-model="shareCode" placeholder="请输入邀请码" placeholder-style="color:#ccc" maxlength="7" />
		</view>
		<view class="memberHint">
			<view>
				<text class="hint"></text>
				购买即视为同意<text @click='openPopup'>文器库商城会员服务协议</text>
			</view>
			<view>
				<text class="hint"></text>
				会员一经开通不支持退款/取消，敬请谅解
			</view>
		</view>
		<view class="buyNow fixedPosition">
			<view class="buyNowBtn" :class="isEnterprise?'active':''" v-if="plusInfo.mokaConfigDTO" @click="getShareInfo">
				立即支付￥{{plusInfo.mokaConfigDTO.plusPrice}}
			</view>
		</view>
		<uni-popup ref="memberPopup" type="center">
			<defaultPopup @cancel='closeMemberPopup' @sure='createMemberOrder'>
				<view class="shareBox">
					<view class="shareTitle">
						邀请人
					</view>
					<view class="shareInfo">
						<text class="share">邀请人昵称</text>
						<text>{{invitationUserInfo.name}}</text>
					</view>
					<view class="shareInfo">
						<text class="share">邀请人手机号</text>
						<text>{{invitationUserInfo.mobile}}</text>
					</view>
				</view>
			</defaultPopup>
		</uni-popup>
		<agreementPopup ref='agreementPopup' :enterprise='isEnterprise'></agreementPopup>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	import memberConfig from '@/common/js/memberConfig.js'
	import defaultPopup from '@/components/defaultPopup/index.vue'
	import agreementPopup from './agreementPopup.vue'
	import enterpriseInfo from './enterpriseInfo.vue'
	import memberRights from '@/common/model/memberRights.vue'
	export default {
		data() {
			return {
				plusInfo: { //会员权益  金额信息

				},
				userInfo:{	//用户信息
					
				},
				shareCode: "", //邀请码
				invitationUserInfo: { //邀请人信息

				},
				selectAddressParams:{	//地址选择数据
					
				},
				enterpriseInfo:{	//公司信息
					licenseInfo:"",
				},
				imgBaseUrls:"",
				isEnterprise:false
			}
		},
		methods: {
			getPlusUnitInfo() { //获取vip会员权益/金额
				memberApi.getPlusUnitInfo({id: memberConfig.mokaStatus}).then(res => {
					if (res.data.code == 200) {
						this.plusInfo = res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getEnterprise(){	//获取企业会员权益/金额
				memberApi.getEnterprise(memberConfig.enterpriseMember).then(res=>{
					if(res.data.code==200){
						this.plusInfo = res.data.data
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			addressChange(params){	//企业会员地址更换时触发
				this.selectAddressParams = params
			},
			enterpriseInfoChange(params){	//企业会员信息变更时触发
				this.enterpriseInfo = params
			},
			getShareInfo() { //会员权益邀请人信息
				if(!this.shareCode){
					uni.showToast({
						title:"请填写邀请码",
						icon:"none"
					})
					return
				}
				if(this.$Route.query.enterprise){	//企业会员
					if(!this.enterpriseInfo.companyName){
						uni.showToast({
							title:"请填写公司昵称",
							icon:"none"
						})
						return
					}
					if(!this.selectAddressParams.provinceId){
						uni.showToast({
							title:"请选择经营地址",
							icon:"none"
						})
						return
					}
					if(!this.enterpriseInfo.licenseInfo){
						uni.showToast({
							title:"请填写营业执照",
							icon:"none"
						})
						return
					}
					this.getInviterBaseInfoByCode()
				}else{//个人会员
					this.getInviterBaseInfoByCode()
				}
			},
			getInviterBaseInfoByCode(){	//获取个人会员邀请人信息
				memberApi.getInviterBaseInfoByCode(this.shareCode).then(res => {
					if (res.data.code == 200) {
						this.invitationUserInfo = res.data.data
						this.$refs.memberPopup.open();
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			closeMemberPopup() { //关闭会员弹窗
				this.$refs.memberPopup.close()
			},
			openPopup(){	//打开会员服务协议
				this.$refs.agreementPopup.openPopup()
			},
			createMemberOrder(){
				if(this.$Route.query.enterprise){	//企业会员
					this.createEnterprise()
				}else{
					this.plusCreateOrder()
				}
			},
			createEnterprise(){	//创建企业会员订单
				let params = JSON.parse(JSON.stringify(this.enterpriseInfo));
				params.inviteCode = this.shareCode;
				params.inviterType = this.invitationUserInfo.inviteType;
				params.totalFee = this.plusInfo.mokaConfigDTO.plusPrice;
				params.inviterId = this.invitationUserInfo.inviteId;
				params.districtId = this.selectAddressParams.townId?this.selectAddressParams.townId:this.selectAddressParams.districtId
				memberApi.createEnterprise(params).then(res=>{
					if(res.data.code==200){
						this.$refs.memberPopup.close();
						this.$Router.replace({
							path:"/pages/memberPay/index",
							query:{
								orderPayId:res.data.data.orderId,
								payPrice:this.plusInfo.mokaConfigDTO.plusPrice,
								goodsId:this.$Route.query.goodsId?this.$Route.query.goodsId:"",
								enterprise:true
							}
						})
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			plusCreateOrder(){	//创建个人会员订单
				memberApi.plusCreateOrder({shareCode:this.shareCode,orderTotal:this.plusInfo.mokaConfigDTO.plusPrice,shareType:this.invitationUserInfo.inviteType,mokaId:memberConfig.mokaStatus,shareId:this.invitationUserInfo.inviteId}).then(res=>{
					if(res.data.code==200){
						this.$refs.memberPopup.close();
						this.$Router.replace({
							path:"/pages/memberPay/index",
							query:{
								orderPayId:res.data.data.id,
								payPrice:res.data.data.payAmount,
								goodsId:this.$Route.query.goodsId?this.$Route.query.goodsId:""
							}
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			enterpriseInfoStatus(){	//企业会员信息
				memberApi.enterpriseInfo().then(res=>{
					if(res.data.code==200){
						if(res.data.data.auditStatus==0){
							uni.showToast({
								title:"您的会员正在审核中",
								icon:"none"
							})
							this.backHref()
						}
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			backHref(){
				if(getCurrentPages().length>1){
					this.goBack(1)
				}else{
					this.$Router.replace({path:'/pages/memberGiftBag/index'})
				}
			}
		},
		onShow() {
			// 地址栏参数  为真为企业会员 否则为个人会员
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.userInfo = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):"";
			if(uni.getStorageSync("sessionId")){
				if(this.userInfo.plusFlag){
					uni.showToast({
						title:"您已经是会员",
						icon:"none"
					})
					this.backHref()
				}else{
					this.enterpriseInfoStatus()
				}
				if(this.$Route.query.enterprise){
					this.getEnterprise()
				}else{
					this.getPlusUnitInfo();
				}
			}
		},
		onLoad(query) {	//扫码进入该页面后获取分享码
			try{
				if(query && query.scene){
					this.$Router.replace({
						path:"/pages/openMemberShip/index",
						query:{
							shareNumber:decodeURIComponent(query.scene).split(",")[0],
							enterprise:decodeURIComponent(query.scene).split(",")[1]
						}
					})
					return
				}
			}catch(err){
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
			this.isEnterprise = this.$Route.query.enterprise?true:false;
			let title = this.isEnterprise?"企业会员":"VIP会员";
			uni.setNavigationBarTitle({
				title:title
			})
			this.zhuge.track(title+"-落地页")
			if(this.$Route.query.shareNumber){
				this.shareCode = this.$Route.query.shareNumber
				uni.setStorageSync("shareNumber",this.$Route.query.shareNumber)
			}
			try{
				if(uni.getStorageSync("shareNumber")){
					this.shareCode  = uni.getStorageSync("shareNumber")
				}
			}catch(e){
				
			}
			if(!uni.getStorageSync("sessionId")){
				this.$Router.push({
					path:"/pages/login/index"
				})
				return
			}
		},
		components:{
			agreementPopup,
			defaultPopup,
			enterpriseInfo,
			memberRights
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		background-color: #F5F5F5;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
		padding-bottom: 120rpx;
	}

	.collectTitle {
		background-color: #F5F5F5;
	}
	.infoBox {
		padding: 0 30rpx;
	}

	.userInfo {
		width: 100%;
		height: 195rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
	}

	.userInfoText {
		flex: 1;
		margin-left: 32rpx;
	}
	
	.membrGiftTitle {
		width: 100%;
		font-size: 40rpx;
		padding: 20rpx 30rpx;
		margin-top: 64rpx;
	}
	
	.userInfoTitleImage{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background-position: 50%;
		background-size: cover;
		background-repeat: no-repeat;
		z-index: 10;
	}

	.userName {
		font-size: 36rpx;
		line-height: 48rpx;
		height: 48rpx;
		color: #000000;
	}

	.invitees {
		line-height: 37rpx;
		color: #333333;
	}

	.priceBox {
		width: 100%;
		height: 160rpx;
		background-color: #FFFFFF;
		border: 4rpx solid #E4E4E4;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 16rpx;
		padding: 0 36rpx;
	}

	.invitationCode {
		width:calc(100% - 60rpx);
		height: 98rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		line-height: 98rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		margin: 0 auto;
		margin-top: 16rpx;
	}

	.invitationCode input {
		flex: 1;
		margin-left: 24rpx;
	}

	.memberIncome{
		width: calc(100% - 60rpx);
		background-color: #FFFFFF;
		margin: 0 auto;
		border-radius: 8rpx;
		padding: 40rpx 0;
	}
	
	.buyNow {
		position: fixed;
		bottom: 0;
		left: 0;
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
		background-color: #FFFFFF;
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
	}

	.buyNowBtn {
		width: 100%;
		height: 78rpx;
		background-color: #fdc900;
		color: #000000;
		border-radius: 52rpx;
		font-size: 30rpx;
		text-align: center;
		line-height: 78rpx;
	}
	
	.buyNowBtn.active{
		background: linear-gradient(90deg, #F1BD9B 0%, #F8D8CA 100%);
	}

	.shareBox {
		padding-top: 40rpx;
	}
	
	.shareTitle{
		width: 100%;
		text-align: center;
		line-height: 48rpx;
		color: #000000;
		font-size: 36rpx;
	}
	.shareInfo{
		margin-top: 20rpx;
		padding-left: 30rpx;
	}
	.shareInfo .share{
		color: #888888;
		display: inline-block;
		width: 200rpx;
	}
	.memberHint{
		margin: 36rpx auto;
		width: calc(100% - 60rpx);
	}
	.memberHint view{
		display: flex;
		align-items: center;
		margin-bottom: 18rpx;
		color: #999999;
	}
	.memberHint view text{
		color: #F19E4B;
		margin-left: 10rpx;
	}
	.memberHint view .hint{
		margin-left: 0;
		margin-right: 20rpx;
		display: inline-block;
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		background-color: #FCC38B;
	}
</style>
