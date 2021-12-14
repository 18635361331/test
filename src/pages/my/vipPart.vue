<template>
	<view class="vipPartBox">
		<!-- head -->
		<view class="head">
			<view class="vip" :class="type==0?'active':''" @click="setType(0)">
				<text class="text">会员中心</text>
				<text class="bg"></text>
			</view>
			<view class="partner" :class="type==1?'active':''" @click="setType(1)">
				<text class="icon"></text>
				<text class="text">合伙人中心</text>
				<text class="bg"></text>
			</view>	
		</view>
		<!-- 会员 -->
		<block v-if="!type">
			<view class="center vips">
				<!-- 角色 -->
				<scroll-view scroll-x="true" class="scrollBox">
					<view class="scroll_head">
						<view class="vips_list" v-for="item,i in memberConfig" :key="i" :style="{'color':chooseTab==item.type?item.color:''}" @click="setChooseTab(item.type)">
							<text class="icon" :style="{backgroundImage:'url('+imgBaseUrls+item.icon+')'}"></text>
							<view class="name" :style="{'fontWeight':chooseTab==item.type?700:''}">{{item.name}}</view>
							<view class="bg" :style="{'borderColor':chooseTab==item.type?item.color:'',backgroundColor:chooseTab==item.type?item.startColor:''}"></view>
							<!-- <view class="endTime" v-if="userInfo.plusFlag==item.type">2020.08.04到期</view> -->
						</view>
					</view>
				</scroll-view>
				<!-- rights -->
				<rights :list="rights" :source="'vipPart'" :path="'/pages/memberGiftBag/index'"></rights>
				<view class="guide">
					<view class="rule" @click="openPopup">
						会员升级规则<text class="arrow-right ruleArrow"></text>
					</view>
					<view @click="goToMember">
						查看完整会员政策  <text class="arrow-right"></text>
					</view>
				</view>
			</view>
			<view class="invite" @click="inviteMemberCode">邀请会员</view>
		</block>
		<!-- 合伙人 -->
		<block v-else>
			<block v-if="userInfo.plusFlag!=4">
				<view class="center partnerCenter">
					<image :src="imgBaseUrls+partnerBgImage" mode="widthFix"></image>
					<view class="guide" @click="partnerPolicy()">
						查看完整合伙人政策  <text class="arrow-right"></text>
					</view>
				</view>
				<view class="invite_group">
					<view class="share" @click="inviteCode">邀请合伙人</view>
					<view class="join" @click="joinPartner">申请开通</view>
				</view>
			</block>
			<block v-else>
				<view class="center">
					<view class="time">年度评定周期：{{teamInfoNum.nextEvaluationTime?(teamInfoNum.nextEvaluationTime+'到期'):'-'}}</view>
					<!-- <rights :list="rights" v-if="userInfo.distributorType==23" :source="'vipPart'" :path="'/copartner/policy/index'"></rights>
					<view class="rightPolicy" v-if="userInfo.distributorType==23"></view> -->
					<view class="rewardGroup">
						<view class="everyReward rewardProcure" v-if="userInfo.distributorType==21">
							<view class="rewardProcureImage">
								<image :src="imgBaseUrls+'appletsImages/teamProIcon.png'" mode="heightFix"></image>自营采购
							</view>
							<view class="rewardInfo">
								<view class="rewardPrice">
									<digital-rolling :digitTo='teamInfoNum.selfPurchaseAmount' :digitFrom='Number(teamInfoNum.oldselfPurchaseAmount)' :limit="2"></digital-rolling>
								</view>
							</view>
						</view>
						<view class="lineReward" v-if="userInfo.distributorType==21"></view>
						<view class="everyReward" v-if="userInfo.distributorType!=21">
							<view class="rewardImage">
								<image :src="imgBaseUrls+'appletsImages/proprietaryProIcon.png'" mode=""></image>
							</view>
							<view class="rewardInfo">
								<view class="rewardPrice">
									<digital-rolling :digitTo='teamInfoNum.selfPurchaseAmount' :digitFrom='teamInfoNum.oldselfPurchaseAmount' :limit="2"></digital-rolling>
								</view>
								<view>
									自营采购
								</view>
							</view>
						</view>
						<view class="rewardLine" v-if="userInfo.distributorType!=21"></view>
						<view class="everyReward" v-if="userInfo.distributorType!=21">
							<view class="rewardImage">
								<image :src="imgBaseUrls+'appletsImages/teamProIcon.png'" mode=""></image>
							</view>
							<view class="rewardInfo">
								<view class="rewardPrice">
									<digital-rolling :digitTo='teamInfoNum.teamPurchaseAmount' :digitFrom='teamInfoNum.oldteamPurchaseAmount' :limit="2"></digital-rolling>
								</view>
								<view>
									团队采购
								</view>
							</view>
						</view>
						<view class="everyReward">
							<view class="rewardImage">
								<image :src="imgBaseUrls+'appletsImages/userReward.png'" mode=""></image>
							</view>
							<view class="rewardInfo">
								<view class="rewardPrice">
									<digital-rolling :digitTo='teamInfoNum.selfAchievementAmount' :digitFrom='teamInfoNum.oldselfAchievementAmount' :limit="2"></digital-rolling>
								</view>
								<view>
									自营业绩
								</view>
							</view>
						</view>
						<view class="rewardLine" v-if="userInfo.distributorType!=21"></view>
						<view class="everyReward" v-if="userInfo.distributorType!=21">
							<view class="rewardImage">
								<image :src="imgBaseUrls+'appletsImages/rewardGroup.png'" mode=""></image>
							</view>
							<view class="rewardInfo">
								<view class="rewardPrice">
									<digital-rolling :digitTo='teamInfoNum.teamAchievementAmount' :digitFrom='teamInfoNum.oldteamAchievementAmount' :limit="2"></digital-rolling>
								</view>
								<view>
									团队业绩
								</view>
							</view>
						</view>
						<view class="everyReward" v-if="userInfo.distributorType!=21" @click="$Router.push({path:'/copartner/teams/index'})">
							<view class="rewardImage">
								<image :src="imgBaseUrls+'appletsImages/developmentGroup.png'" mode=""></image>
							</view>
							<view class="rewardInfo">
								<view class="rewardPrice">
									{{teamInfoNum.teamNumber}}
									人
								</view>
								<view>
									发展团队
								</view>
							</view>
						</view>
						<view class="rewardLine"></view>
						<view class="everyReward" @click="$Router.push({path:'/copartner/order/index'})">
							<view class="rewardImage">
								<image :src="imgBaseUrls+'appletsImages/myRewardIcon.png'" mode=""></image>
							</view>
							<view class="rewardInfo">
								<view class="rewardPrice">
									<digital-rolling :digitTo='teamInfoNum.rewardAmount' :digitFrom='teamInfoNum.oldrewardAmount' :limit="2"></digital-rolling>
								</view>
								<view>
									我的奖励
								</view>
							</view>
						</view>
					</view>
					<view class="policy" @click="$Router.push({path:'/copartner/policy/index'})">
						查看合伙人政策
						<text class="arrow-right"></text>
					</view>
				</view>
				<view class="invitePolicy" @click="inviteCode">邀请合伙人</view>
			</block>
		</block>
		<uni-popup ref="moneyGiftPopup" class="uniShare" type="bottom">
			<view>
				<image :src="imgBaseUrls+'appletsImages/moneyGift.gif'" mode="widthFix"></image>
			</view>
		</uni-popup>
		<agreementPopup v-if="Object.keys(memberConfig).length" ref='agreementPopup'></agreementPopup>
	</view>
</template>

<script>
	import rights from './rights.vue'
	import memberApi from '@/api/member/index.js';
	import appApi from '@/api/app/index.js'
	import vipConfig from '@/common/js/vipConfig.js';
	import agreementPopup from './agreementPopup.vue';
	import digitalRolling from '@/components/digital-rolling/digital-rolling.vue'
	export default{
		props:['userInfo'],
		components:{
			rights,
			agreementPopup,
			digitalRolling
		},
		data(){
			return{
				type:"", 
				imgBaseUrls:'',
				chooseTab:0,//合伙人当前选中
				memberConfig:'',
				rights:[],// 权益
				// summaryInfo:"",	//合伙人信息
				partnerBgImage:"",
				teamInfoNum:{
					rewardAmount:0,
					selfAchievementAmount:0,
					teamAchievementAmount:0,
					teamNumber:0,
					teamPurchaseAmount:0,
					selfPurchaseAmount:0,
					oldrewardAmount:0,
					oldselfAchievementAmount:0,
					oldteamAchievementAmount:0,
					oldteamNumber:0,
					oldteamPurchaseAmount:0,
				}
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.setType(0);
			
		},
		methods:{
			async setType(type){
				if(type!==this.type){
					this.type = (type!=0&&!type)?this.type:type;
					await this.getCurrentList(this.type);
					this.getChooseTab();
					this.$nextTick(()=>{
						if(this.type){
							if(uni.getStorageSync("sessionId") && this.userInfo.plusFlag==4){
								this.teamInfo()
							}
						}else{
							this.getPrivilege(this.type)
						}
					})
					
				}
			},
			async getCurrentList(type){	//获取合伙人/会员列表
				if(type){
					this.memberConfig = await vipConfig.getPartner();
					this.partnerBgImage = JSON.parse(uni.getStorageSync("partnerConfig")).bgImage
				}else{
					this.memberConfig = await vipConfig.getVipInfo();
				}
			},
			setChooseTab(tab){	//tab下切换
				this.chooseTab = tab;
				if(this.type){
					// this.privilegeItem();
				}else{
					this.getPrivilege()
				}
			},
			getChooseTab(){	//获取当前tab下是否有该身份
				if(this.type){
					this.chooseTab = this.memberConfig[0].id;
					for(let i=0;i<this.memberConfig.length;i++){
						if(this.memberConfig[i].id == this.userInfo.distributorTypeId){
							this.chooseTab = this.memberConfig[i].id;
							return
						}
					}
				}else{
					this.chooseTab = this.memberConfig[0].type;
					for(let i=0;i<this.memberConfig.length;i++){
						if(this.memberConfig[i].type == this.userInfo.plusFlag){
							this.chooseTab = this.memberConfig[i].type;
							return
						}
					}
				}
			},
			getPrivilege(){	//获取会员类型对应的权益信息
				memberApi.getPrivilege(this.chooseTab?this.chooseTab:this.memberConfig[0].type).then(res=>{
					if(res.data.code==200){
						this.rights = res.data.data.privilegeUnitList;
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			// privilegeItem(){	//获取合伙人权益
			// 	appApi.privilegeItem(this.chooseTab?this.chooseTab:this.memberConfig[0].id).then(res=>{
			// 		if(res.data.code==200){
			// 			this.rights = res.data.data;
			// 		}else{
			// 			uni.showToast({
			// 				title: res.data.message,
			// 				icon: "none"
			// 			})
			// 		}
			// 	})
			// },
			// privilegesSummary(){	//分销商权益的概述信息
			// 	appApi.privilegesSummary().then(res=>{
			// 		if(res.data.code==200){
			// 			this.rights = res.data.data?res.data.data.policyList:[]
			// 		}else{
			// 			uni.showToast({
			// 				title:res.data.message,
			// 				icon:"none"
			// 			})
			// 		}
			// 	})
			// },
			// distributorSummary(){	//获取渠道合伙人信息
			// 	appApi.distributorSummary().then(res=>{
			// 		// console.log(res.data.data)
			// 		if(res.data.code==200){
			// 			res.data.data.nextEvaluationTime = this.$utils.formatDate(res.data.data.nextEvaluationTime,"yyyy-MM-dd")
			// 			this.summaryInfo = res.data.data
			// 		}else{
			// 			uni.showToast({
			// 				title:res.data.message,
			// 				icon:"none"
			// 			})
			// 		}
			// 	})
			// },
			teamInfo(flag){//用户团队和奖励数据
				memberApi.teamInfo().then(res=>{
					if(res.data.code==200){
						if(res.data.data.nextEvaluationTime){
							res.data.data.nextEvaluationTime = this.$utils.formatDate(res.data.data.nextEvaluationTime,"yyyy-MM-dd")
						}
						for(let i in res.data.data){
							if(i!="teamNumber" && i!="nextEvaluationTime"){
								res.data.data[i] = Number(res.data.data[i]).toFixed(2)
							}
						}
						if(uni.getStorageSync("teamInfoNum")){
							let teamInfo = JSON.parse(uni.getStorageSync("teamInfoNum"))
							for(let i in res.data.data){
								this.$set(this.teamInfoNum,"old"+i,teamInfo[i]);
								if(res.data.data[i]>teamInfo[i] && i!="teamNumber"){
									const innerAudioContext = uni.createInnerAudioContext();
									innerAudioContext.autoplay = true;
									// #ifdef MP-WEIXIN
									wx.setInnerAudioOption({
										obeyMuteSwitch:false,
										success:()=>{
											console.log("开启静音模式下播放音乐的功能")
										},
										fail:()=>{
											console.log("静音设置失败");
										}
									})
									// #endif
									
									innerAudioContext.src = this.imgBaseUrls+'appletsImages/moneyInfoAudio.mp3';
									innerAudioContext.play();
									innerAudioContext.onError((res)=>{
										console.log(res)
									})
									this.$refs.moneyGiftPopup.open();
									setTimeout(()=>{
										this.$refs.moneyGiftPopup.close();
										uni.setStorageSync("teamInfoNum",JSON.stringify(res.data.data));
										this.teamInfoNum = res.data.data;
									},2200)
									return
								}
							}
							this.teamInfoNum = res.data.data;
						}else{
							this.teamInfoNum = res.data.data;
							uni.setStorageSync("teamInfoNum",JSON.stringify(res.data.data));
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			openPopup(){	//打开升级协议
				this.$refs.agreementPopup.openPopup()
			},
			goToMember(){
				this.$Router.push({path:'/pages/memberGiftBag/index'})
			},
			partnerPolicy(){
				this.$Router.push({path:'/copartner/policy/index'})
			},
			inviteCode(){
				if(!uni.getStorageSync("sessionId")){
					this.$Router.push({path:'/pages/login/index'});
					return
				}
				this.$Router.push({path:'/copartner/inviteCode/index'})
			},
			inviteMemberCode(){
				if(!uni.getStorageSync("sessionId")){
					this.$Router.push({path:'/pages/login/index'});
					return
				}
				this.$Router.push({path:'/pages/myInviterCode/index'})
			},
			joinPartner(){
				if(!uni.getStorageSync("sessionId")){
					this.$Router.push({path:'/pages/login/index'});
					return
				}
				this.$Router.push({path:'/copartner/joinPartner/index'})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.vipPartBox{
		margin: 150rpx auto 30rpx;
		width: calc(100% - 60rpx);
	}
	.arrow-right{
		display: inline-block;
		width: 16rpx;
		height: 16rpx;
		transform: rotate(45deg);
	}
	.head{
		$he:70rpx;
		position: relative;
		height: $he;
		view{
			width: 52%;
			position: absolute;
			text-align: center;
			height: $he;
			background-size: 100% 100% ;
			font-size: 32rpx;
			line-height: $he;
			font-weight: 400;
			color: #666666;
		}
		.vip {
			left: 2rpx;
			background-image:url($img-oss+'vips_init.png');
			&.active {
				background-image:url($img-oss+'vips_select.png') ;
			}
		}
		.partner{
			right: 0;
			background-image:url($img-oss+'partners_init.png')  ;
			&.active {
				background-image:url($img-oss+'partners_select.png') ;
				.icon{
					background-image:url($img-oss+'partner_icon_select.png') ;
				}
			}
			.icon{
				width: 40rpx;
				height: 40rpx;
				background-size: 100% 100% ;
				display: inline-block;
				vertical-align: middle;
				margin-right: 10rpx;
				background-image:url($img-oss+'partner_icon_init.png') ;
			}
		}
		.active {
			z-index: 2;
			color: #6F382C;
			font-weight: 500;
		}
	}
	.center{
		width: 100%;
		background: #FFFFFF;
		border-radius: 0 0 20rpx 20rpx;
		margin-bottom: 30rpx;
		padding: 10rpx 0 30rpx;
		position: relative;
	}
	.partnerCenter{
		padding-top: 0;
		padding-bottom: 14rpx;
	}
	.partnerCenter .guide{
		width: 100%;
		display: block;
		margin-top: 4rpx;
	}
	.guide{
		font-size: 28rpx;
		font-weight: 700;
		color: #6F382C;
		line-height: 1.4;
		text-align: center;
		display: flex;
		align-items: center;
		.arrow-right{
			margin-left: 8rpx;
			border-top: 2px solid #6F382C;
			border-right: 2px solid #6F382C;
			vertical-align: middle;
		}
		.rule{
			color: #666666;
			font-weight: 400;
		}
		.ruleArrow{
			width: 12rpx;
			height: 12rpx;
			border-top: 1px solid #666666;
			border-right: 1px solid #666666;
		}
	}
	.scrollBox{
		width: 100%;
		padding:20rpx;
		.scroll_head{
			width: 100%;
			display: flex;
			flex-wrap: nowrap;
		}
	}
	// 会员
	.vips .icon,.partners .icon{
		width: 40rpx;
		height: 40rpx;
		display: inline-block;
		background-size: 100% 100%;
	}
	
	.vips{
		.scrollBox{
			padding-bottom: 10rpx;
		}
		.vips_list{
			min-width: 140rpx;
			height: 162rpx;
			margin-right: 12rpx;
			text-align: center;
			font-size: 28rpx;
			line-height: 1.2;
			color: #666666;
			position: relative;
			.icon{
				margin-top: 20rpx;
				position: relative;
				z-index: 2;
			}
			.bg{
				width:100%;
				height:100%;
				position: absolute;
				border-radius: 8rpx;
				border: 1px solid #bebebe;
				top: 0;
				left: 0;
				opacity: 0.5;
			}
			.name{
				width: 60rpx;
				margin: 0 auto;
				position: relative;
				z-index: 2;
				font-size: 30rpx;
			}
		}
		.guide{
			width: 100%;
			.rule::after{
				content: '';
				display: inline-block;
				width: 1rpx;
				height: 30rpx;
				background-color: #D8D8D8;
				position: absolute;
				right: 8rpx;
				top: 8rpx;
			}
			.rule,view:last-child{
				width: 50%;
				text-align: center;
				position: relative;
			}
		}
		
	}
	// 合伙人
	.partners{
		.role_list{
			min-width: 210rpx;
			height: 80rpx;
			border-radius: 20rpx;
			border: 1px solid #D8D8D8;
			padding: 0 14rpx 0 8rpx;
			margin-right: 24rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
			&.active{
				border-color: #E6B857;
				background: #FFFAF1;
				color: #A07435;
				.icon{
					opacity: 1;
				}
			}
			.icon{
				opacity: 0.5;
			}
		}
		.guide{
			color: #7B561E;
			justify-content: center;
			align-items: center;
			.arrow{
				display: inline-block;
				vertical-align: middle;
				background-size: 100% 100%;
				background-image:url($img-oss+'v2_vip_arrow.png');
				width: 20rpx;
				height: 20rpx;
				margin: 4rpx 0 0 8rpx;
			}
		}
	}
	.rights{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		.rights_list{
			min-width: 22%;
			margin-bottom: 30rpx;
			margin-left: 20rpx;
		}
		text{
			text-align: center;
			display: block;
			line-height: 1.3;
		}
		.img{
			width: 80rpx;
			height: 80rpx;
			margin: 0 auto 10rpx;
			background-size:100% 100%;
		}
		.name{
			font-size: 26rpx;
			font-weight: 500;
			color: #333333;
		}
		.info{
			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
		}
	}
	.invite_group{
		width: 100%;
		display: flex;
		justify-content: space-between;
		view{
			width: 48%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border-radius: 40rpx;
			font-size: 32rpx;
			font-weight: 500;
		}
		.share{
			color: #663F0A;
			background: linear-gradient(127deg, #FFE8CA 0%, #E6BA78 100%);
		}
		.join{
			color: #fff;
			background: #FE325C;
		}
	}
	.invite{
		width: 100%;
		height: 80rpx;
		background: #B27F65;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin-top: 30rpx;
	}
	.invitePolicy{
		width: 100%;
		height: 80rpx;
		background: linear-gradient(127deg, #FFE8CA 0%, #E6BA78 100%);
		border-radius: 40rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #663F0A;
		line-height: 80rpx;
		text-align: center;
		margin-top: 30rpx;
	}
	
	.results{
		width: 690rpx;
		height: 184rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		position: relative;
		display: flex;
		padding: 0 30rpx;
		padding-top: 10rpx;
	}
	.resultsIcon{
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
	}
	.resultsTitle{
		color: #8E5B17;
	}
	.resultsBox{
		width: 480rpx;
		height: 20rpx;
		border-radius: 20rpx;
		background-color: #ebd1ba;
		box-shadow: 0px -0.5px 0.5px 0px rgba(0, 0, 0, 0.4);
		margin-top: 17rpx;
		overflow: hidden;
	}
	.resultsSmall{
		width: 0;
		height: 100%;
		background-color: #E88140;
		border-radius: 20px;
	}
	.progress{
		color: #999999;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	.policy{
		position: absolute;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(229deg,#FE3F4D  0%,#FE9849  100%);
		border-radius: 25rpx  0px 25rpx 0px;
		width: 230rpx;
		height: 40rpx;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
	}
	.policy image{
		width: 11rpx;
		height: 18rpx;
		margin-left: 8rpx;
	}
	.procurement{
		color: #666666;
		margin-top: 10rpx;
		padding-left: 40rpx;
	}
	.procurement text{
		color: #000000;
		font-weight: 700;
	}
	.time{
		color: #666666;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		padding-left: 40rpx;
	}
	.policy .arrow-right{
		width: 12rpx;
		height: 12rpx;
		vertical-align: middle;
		border-top: 1px solid #fff;
		border-right: 1px solid #fff;
	}
	.rewardGroup{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-top:20rpx ;
	}
	.everyReward{
		display: flex;
		width: 49%;
		min-width: 49%;
		justify-content: center;
		margin-bottom: 20rpx;
	}
	.rewardLine{
		width: 2rpx;
		height: 40rpx;
		background-color: #D8D8D8;
	}
	.rewardImage{
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		min-width: 40rpx;
		margin-top: 20rpx;
	}
	.rewardInfo{
		font-size: 28rpx;
		color: #333333;
		width: 200rpx;
	}
	.rewardProcure{
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding-left: 40rpx;
		padding-right: 50rpx;
	}
	.rewardProcureImage{
		height: 40rpx;
		display: flex;
		align-items: center;
		color: #333333;
	}
	.rewardProcureImage image{
		margin-right: 22rpx;
	}
	.lineReward{
		width: calc(100% - 90rpx);
		height: 1rpx;
		background-color: #D8D8D8;
		margin: 0 auto;
		margin-bottom: 14rpx;
	}
	.rewardPrice{
		color: #666666;
		font-size: 32rpx;
	}
	.rewardPrice text{
		font-size: 28rpx;
	}
	.rightPolicy{
		margin-top: 20rpx;
		border-bottom: 1rpx solid #D8D8D8;
		width: 630rpx;
		margin: 0 auto;
	}
</style>
