<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="incomecenterInfo">
			<view class="tixianTitle">
				<text>可用余额（元）</text>
				<text class="isShowIcon" @click="isHideFlag=!isHideFlag" :class="isHideFlag?'active':''"></text>
			</view>
			<view class="tixianPrice">
				{{isHideFlag?"******":memberAchieveInfo.balance?memberAchieveInfo.balance:"0"}}
			</view>
			<view class="shouruPrice">
				<text>累计收入</text>
				<text class="totalInBalacne">{{isHideFlag?"******":memberAchieveInfo.totalInBalacne?memberAchieveInfo.totalInBalacne:"0"}}</text>
			</view>
		</view>
		<view class="incomecenterRevenue">
			<view class="orderRevenueLeft" @click="$Router.push({path:'/pages/incomeList/index'})">
				账户流水
				<view class="revenueIcon"></view>
			</view>
			<view class="orderRevenueRight">
				<view class="every" @click="$Router.push({path:'/pages/promotionDetails/index',query:{timeRange:1}})">
					<view class="everyTitle">
						本月预估收入
					</view>
					<view class="everyPrice">
						{{isHideFlag?"******":memberAchieveInfo.monthIncome?memberAchieveInfo.monthIncome:"0"}}
					</view>
					<view class="monthPrice"></view>
				</view>
				
				<view class="every everyRow" @click="$Router.push({path:'/pages/promotionDetails/index',query:{timeRange:0}})">
					<view class="everyTitle">
						今日预估收入
					</view>
					<view class="everyPrice">
						{{isHideFlag?"******":memberAchieveInfo.todayIncome?memberAchieveInfo.todayIncome:"0"}}
					</view>
					<view class="dayPrice"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import achievementApi from '@/api/achievement/index.js'
	
	export default{
		data(){
			return{
				memberAchieveInfo:{	//收入中心数据
					
				},
				isHideFlag:false,	//余额是否展示的开关
				defaultTitleDto:{
					title:'收入中心',
					bg:'starShopBackWrite.png',
					color:'white'
				}
			}
		},
		methods:{
			memberAchievement(){
				achievementApi.memberAchievement().then(res=>{
					if(res.data.code==200){
						this.memberAchieveInfo = res.data.data
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
			this.memberAchievement()
		},
		onShow() {
			this.zhuge.track("收入中心")
		},
		
	}
</script>

<style scoped>
	.commonPageTitle {
		background: #F5F5F5 url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/incomeCentreBG.png) no-repeat no-repeat;
		background-size: 100%;
		padding-top: 88rpx;
		height: 100vh;
	}
	
	.incomecenterInfo{
		width: 100%;
		height: 324rpx;
		position: relative;
		padding: 0 38rpx;
	}
	.tixianTitle{
		display: flex;
		align-items: flex-end;
		padding-top: 24rpx;
		color: #FFFFFF;
	}
	.tixianPrice{
		font-size: 80rpx;
		color: #FFDF8C;
		height: 112rpx;
		line-height: 112rpx;
	}
	.shouruPrice{
		color: #FFFFFF;
		margin-top: 48rpx;
		line-height: 50rpx;
	}
	.totalInBalacne{
		color: #FFDF8C;
		margin-left: 20rpx;
	}
	.incomecenterRevenue{
		display: flex;
		background-color: #F5F5F5;
		padding: 0 36rpx;
		padding-top: 30rpx;
	}
	.orderRevenueLeft{
		background-color: #FFFFFF;
		min-width: 254rpx;
		height: 336rpx;
		padding: 32rpx;
		position: relative;
		border-radius: 8rpx;
		color: #333333;
		font-size: 24rpx;
	}
	.revenueIcon{
		width: 64rpx;
		height: 64rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/incomeCentre0.png) no-repeat;
		background-size: 100%;
		position: absolute;
		right: 48rpx;
		bottom: 48rpx;
	}
	.orderRevenueRight{
		margin-left: 16rpx;
		height: 336rpx;
		width: 100%;
	}
	.orderRevenueRight .every{
		height: 160rpx;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		padding: 26rpx 32rpx;
		position: relative;
		font-size: 24rpx;
	}
	.everyRow{
		margin-top: 16rpx;
	}
	.everyPrice{
		font-size: 40rpx;
		margin-top: 4rpx;
		height: 56rpx;
		line-height: 56rpx;
		font-weight: 700;
	}
	.dayPrice{
		width: 64rpx;
		height: 64rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/incomeCentre2.png) no-repeat;
		background-size: 100%;
		position: absolute;
		right: 48rpx;
		bottom: 48rpx;
	}
	.monthPrice{
		width: 64rpx;
		height: 64rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/incomeCentre1.png) no-repeat;
		background-size: 100%;
		position: absolute;
		right: 48rpx;
		bottom: 48rpx;
	}
	.isShowIcon{
		width: 28rpx;
		height: 28rpx;
		display: inline-block;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/isHideIcon1.png) no-repeat;
		background-size: 28rpx 20rpx;
	}
	.isShowIcon.active{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/isHideIcon2.png) no-repeat;
		background-size: 28rpx 20rpx;
	}
</style>
