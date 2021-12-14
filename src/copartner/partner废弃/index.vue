<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="partnerTitle">
			<headImg class="userInfoHead" :head="userInfo.smallIcon"></headImg>
			<view class="userInfo">
				<view class="info">
					<view class="partnerType">{{userInfo.distributorTypeName}}</view>
					<view class="code">邀请码：<text>{{userInfo.shareNumber}}</text></view>
					<view class="copyBtn" v-if="userInfo.shareNumber" @click="copy(userInfo.shareNumber)">复制</view>
				</view>
				<view class="time">年度评定周期：{{userInfo.nextEvaluationTime?(userInfo.nextEvaluationTime+'到期'):'-'}}</view>
			</view>
		</view>
		<view class="procurement">
			个人采购额：<text>{{userInfo.totalOneselfSalesAmount?userInfo.totalOneselfSalesAmount:0}}</text>元
		</view>
		<view class="results">
			<view class="resultsIcon">
				<image :src="imgBaseUrls+userInfo.distributorTypeIcon" mode=""></image>
			</view>
			<view class="resultsContent">
				<view class="resultsTitle">
					<text v-if="userInfo.upgradeFlag==3">您已是卓越合伙人~</text>
					<text v-else-if="userInfo.upgradeFlag==1">还差约{{userInfo.deltaUpgradeAmount}}万业绩金额升级为{{userInfo.upgradeTypeName}}~</text>
					<text v-else-if="userInfo.upgradeFlag==0">还差约{{userInfo.deltaUpgradeAmount}}万业绩金额降级为{{userInfo.demotionTypeName}}~</text>
					<text v-else>加油吧！努力奋斗的合伙人~</text>
				</view>
				<view class="resultsBox">
					<view class="resultsSmall" :style="{width:((userInfo.totalSalesAmount/userInfo.upgradeAmount>0.5)?(userInfo.totalSalesAmount/userInfo.upgradeAmount*100):2)+'%'}"></view>
				</view>
				<view class="progress">
					{{userInfo.totalSalesAmount?userInfo.totalSalesAmount:0}}/{{userInfo.upgradeAmount?userInfo.upgradeAmount:0}}
				</view>
			</view>
			<view class="policy" @click="$Router.push({path:'/copartner/policy/index'})">
				查看合伙人政策
				<image :src="imgBaseUrls+'appletsImages/partnerIconPeople.png'" mode=""></image>
			</view>
		</view>
		<view class="interestsPrice">
			<view class="everyprice">
				<view class="priceTitle">可提现金额</view>
				<view class="price">{{withdraw.balance?withdraw.balance:0}}元
					<view v-if="withdraw.withdrawFlag" class="toApply" @click="$Router.push({path:'/pages/withdraw/index'})">
						申请
					</view>
				</view>
			</view>
			<view class="everyprice">
				<view class="priceTitle">提现申请中</view>
				<view class="price">{{withdraw.applyAmount?withdraw.applyAmount:0}}元</view>
			</view>
		</view>
		<view class="settlement">
			<view class="everySettlement">
				已结算(元)
				<view class="settlePrice">{{userInfo.settledAmount?userInfo.settledAmount:0}}</view>
			</view>
			<view class="line"></view>
			<view class="everySettlement waiting">
				待结算(元)
				<view class="settlePrice">{{userInfo.unsettledAmount?userInfo.unsettledAmount:0}}</view>
			</view>
		</view>
		<view class="reward">
			<view class="everyReward">
				<view class="rewardTitle">居间奖励
					<taps :content="'邀请下一级合伙人成功后，根据合伙人在平台的首单或已支付货款定金进行相应返还奖励金额。'" :direction="'big'"></taps>
				</view>
				<view class="rewardPrice">{{userInfo.agencyRewardAmount?userInfo.agencyRewardAmount:0}}元</view>
			</view>
			<view class="everyReward">
				<view class="rewardTitle">拓展奖励
					<taps :content="'发展会员成功后，会员用户在平台消费后的销售差价全额返给邀请人，礼包品不参与市场拓展奖。'" :direction="'big'"></taps>
				</view>
				<view class="rewardPrice">{{userInfo.expandRewardAmount?userInfo.expandRewardAmount:0}}元</view>
			</view>
			<view class="everyReward">
				<view class="rewardTitle">业绩奖励
					<taps :content="'合伙人账户在年度考核周期内生成的所有采购金额及已支付货款金额总和，根据该账户年采购额达到不同等级范围，对应范围内金额乘以相应返利比，对该账户进行业绩奖金返利。'" :direction="'right big'"></taps>
				</view>
				<view class="rewardPrice">{{userInfo.achievementRewardAmount?userInfo.achievementRewardAmount:0}}元</view>
			</view>
		</view>
		<view class="interests">
			<view class="everyInterests" v-for="item,index in interestsList" :key='index'  @click="goToPath(item)" >
				<image :src="imgBaseUrls+'appletsImages/'+item.icon" mode=""></image>
				<view class="interestsName">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headImg	from  '@/common/model/head.vue'
	import taps from './tap.vue'
	import setCopy from '@/common/js/setCopy.js'
	import appApi from '@/api/app/index.js'
	import cashApi from '@/api/cash/index.js'
	export default {
		mixins:[setCopy],
		components:{
			taps,
			headImg
		},
		data(){
			return{
				defaultTitleDto:{
					title:'渠道合伙人',
				},
				userInfo:{
					
				},
				interestsList:[
					{
						name:"我的团队",
						icon:"interests1.png",
						path:"/copartner/myGorup/index"
					},
					{
						name:"居间订单",
						icon:"interests2.png",
						path:"/copartner/order/index",
						query:{
							type:2
						}
					},
					{
						name:"拓展订单",
						icon:"interests3.png",
						path:"/copartner/order/index"
					},
					{
						name:"收支记录",
						icon:"interests4.png",
						path:"/copartner/recordsRevenue/index"
					},
					{
						name:"发起邀请",
						icon:"interests5.png",
						path:"/copartner/inviteCode/index"
					}
				],
				withdraw:{	//提现信息
					
				},
				imgBaseUrls:this.$config.imgBaseUrl
			}
		},
		methods:{
			goToPath(item) {
				this.$Router.push({
					path: item.path,
					query:item.query
				})
			},
			distributorSummary(){	//获取渠道合伙人信息
				appApi.distributorSummary().then(res=>{
					if(res.data.code==200){
						res.data.data.nextEvaluationTime = this.$utils.formatDate(res.data.data.nextEvaluationTime,"yyyy-MM-dd")
						this.userInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			withdrawInfo(){	//获取提现信息
				cashApi.withdrawInfo().then(res=>{
					if(res.data.code==200){
						this.withdraw = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		mounted() {
			this.distributorSummary();
			this.withdrawInfo()
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.partnerTitle{
		display: flex;
		padding: 0 30rpx;
		padding-top: 20rpx;
	}
	.userInfoHead{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.userInfo{
		height: 100rpx;
		width: calc(100% - 120rpx);
		margin-left: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.info{
		display: flex;
		align-items: center;
	}
	.partnerType{
		font-size: 36rpx;
		color: #323232;
		margin-right: 20rpx;
	}
	.code{
		color: #666666;
		font-size: 24rpx;
		margin-right: 20rpx;
	}
	.code text{
		color: #E88140;
		font-weight: 700;
	}
	.copyBtn{
		width: 70rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background: #fff2e2;
		color: #E88140;
		text-align: center;
		line-height: 40rpx;
		font-size: 20rpx;
	}
	.time{
		color: #666666;
		font-size: 24rpx;
		line-height: 40rpx;
		margin-top: 10rpx;
		width: 100%;
	}
	.procurement{
		padding-left: 150rpx;
		color: #666666;
		margin-top: 10rpx;
	}
	.procurement text{
		color: #000000;
		font-weight: 700;
	}
	.results{
		width: 690rpx;
		height: 184rpx;
		background: linear-gradient(49deg, #EED2B9 0%, #F1DEC4 100%);
		box-shadow: 0px 0px 2px 0px #FFDBC8;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		position: relative;
		display: flex;
		padding: 0 30rpx;
		padding-top: 30rpx;
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
		background: linear-gradient(223deg, #DFBC5B 0%, #FDDB94 100%);
		border-radius: 20rpx 20rpx 0px 0px;
		width: 230rpx;
		height: 40rpx;
		color: #666666;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
	}
	.policy image{
		width: 11rpx;
		height: 18rpx;
		margin-left: 8rpx;
	}
	.interestsPrice{
		width: 100%;
		height: 170rpx;
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/interestsPriceBg.png");
		background-size: 100% 100%;
		display: flex;
	}
	.settlePrice{
		margin-top: 16rpx;
		color: #666666;
	}
	
	.everyprice{
		text-align: center;
		color: #E0B79A;
		padding-top: 48rpx;
		width: 46%;
		font-weight: 700;
	}
	.everyprice:first-child{
		margin-right: 8%;
	}
	.price{
		margin-top: 16rpx;
		position: relative;
		text-align: center;
	}
	.toApply{
		width: 100rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 27rpx;
		background: linear-gradient(45deg, #DDB092 0%, #F8DFC5 100%);
		color: #7A4730;
		display: inline-block;
		position: absolute;
		right: -20rpx;
	}
	.settlement{
		display: flex;
		height: 150rpx;
		align-items: center;
	}
	.everySettlement{
		width: 50%;
		text-align: center;
		color: #666666;
	}
	.waiting{
		color: #E88140;
	}
	.line{
		width: 2rpx;
		height: 60rpx;
		 background-color: #D8D8D8;
	}
	.reward{
		width: 100%;
		display: flex;
		padding: 0 30rpx;
		justify-content: space-between;
	}
	.everyReward{
		width: 210rpx;
		height: 150rpx;
		border: 1rpx solid #D8D8D8;
		border-radius: 20rpx;
		text-align: center;
		padding-top: 20rpx;
	}
	.rewardTitle{
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	
	.rewardPrice{
		margin-top: 20rpx;
	}
	.interests{
		display: flex;
		padding: 0 30rpx;
		justify-content: space-around;
		margin-top: 40rpx;
	}
	.everyInterests image{
		width: 130rpx;
		height: 130rpx;
	}
	.interestsName{
		color: #666666;
		text-align: center;
	}
</style>
