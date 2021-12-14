<template>
	<view class="amount">
		<!-- 团队 -->
		<!-- v-if="isLogin&&userInfo.plusFlag==4" -->
		<!-- <view class="part group">
			<view class="group_part">
				<view class="list">
					<text class="img normal"></text>
					<view @click="goToPath('/copartner/myGorup/index')">
						<text class="num">{{teamInfoNum.teamNumber?teamInfoNum.teamNumber:0}}</text>
						<text class="name">团队人数</text>
					</view>
				</view>
				<view class="list">
					<text class="img vips"></text>
					<view @click="goToPath('/copartner/order/index')">
						<text class="num">{{teamInfoNum.rewardAmount?teamInfoNum.rewardAmount:0}}</text>
						<text class="name">奖励金额</text>
					</view>
				</view>
			</view>
		</view> -->
		<view class="myGroup" @click="goToPath('/copartner/inviters/index')">
			<view class="name">
				<image v-if="userInfo.distributorType==21" :src="imgBaseUrls+'appletsImages/myInvterUser.png'" mode=""></image>
				<image  v-if="userInfo.distributorType!=21" :src="imgBaseUrls+'appletsImages/myInvterUser1.png'" mode=""></image>
				我邀请的伙伴
			</view>
			<view class="peopleNum">
				{{userInfo.partnerNum?userInfo.partnerNum:0}}人
			</view>
		</view>
		<!-- 现金 -->
		<view class="part cash">
			<view class="title">
				<text>现金提现</text>
				<view class="right" @click="goToRevenue">收支明细 <text class="arrow"></text></view>
			</view>
			<view class="cash_group">
				<block v-for="item,i in money" :key="i">
					<view class="list">
						<text class="name">{{item.name}}</text>
						<view class="money" :class="item.hasW?'hasW':''">
							{{item.num}}
							<block v-if="item.hasW"> 
								W
							</block>
						</view>
					</view>
				</block>
			</view>
			<!-- 提现 -->
			<view class="withdraw" :class="withdraw&&withdraw.withdrawFlag?'can':''" @click.stop="goWithdraw">提现</view>
		</view>
	</view>
</template>

<script>
	import cashApi from '@/api/cash/index.js';
	import memberApi from '@/api/member/index.js';
	export default{
		props:['userInfo'],
		data(){
			return{
				plusFlag:4,
				canCash:false,//是否可以提现
				money: [
					{
						'name':'待结算 (元)',
						"num": "",
						"hasW":false,
						"type":"unsettledAmount"
					},
					{
						'name':'已结算 (元)',
						"num": "",
						"hasW":false,
						"type":"settledAmount"
					},
					{
						'name':'提现中 (元)',
						"num": "",
						"hasW":false,
						"type":"applyAmount"
					},
					{
						'name':'可提金额 (元)', // withdraw.balance
						"num": "",
						"hasW":false,
						"type":"balance"
					},
				],
				withdraw:{},
				imgBaseUrls:""
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		methods:{
			goWithdraw(){
				if(this.withdraw&&this.withdraw.withdrawFlag){
					this.$Router.push({path:'/pages/withdraw/index'})
				}
			},
			reasetMoney(){
				for (let i = 0; i < this.money.length; i++) {
					this.$set(this.money[i], "num", "0")
					this.$set(this.money[i], "hasW", false)
				}
				if(uni.getStorageSync("sessionId")){
					this.withdrawInfo();
				}
			},
			
			withdrawInfo(){	//获取提现信息
				cashApi.withdrawInfo().then(res=>{
					if(res.data.code==200){
						for (let i = 0; i < this.money.length; i++) {
							this.$set(this.money[i], "num", 0)
							this.$set(this.money[i], "hasW", false)
							if(res.data.data[this.money[i].type] && res.data.data[this.money[i].type]>10000){
								this.$set(this.money[i], "num", Math.floor(res.data.data[this.money[i].type]/10000))
								this.$set(this.money[i], "hasW", true)
							}else{
								this.$set(this.money[i], "num", res.data.data[this.money[i].type])
							}
						}
						
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToPath(path) {
				if (uni.getStorageSync("sessionId")) {
					this.$Router.push({
						path: path
					})
				}else{
					this.$Router.push({
						path: "/pages/login/index"
					})
				}
			},
			goToRevenue(){
				this.$Router.push({
					path:"/copartner/recordsRevenue/index"
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.amount{
		margin: 30rpx auto;
		width: calc(100% - 60rpx);
	}
	.arrow-right{
		display: inline-block;
		width: 16rpx;
		height: 16rpx;
		transform: rotate(45deg);
	}
	// 团队人数
	.part{
		width: 100%;
		background: #FFFFFF;
		border-radius: 20rpx;
	}
	.group{
		margin-bottom: 30rpx;
		height: 150rpx;
		padding: 30rpx ;
		.group_part{
			display: flex;
			align-items: center;
			.list{
				width: 50%;
				position: relative;
				display: flex;
				&:not(:last-child)::after{
					content: '';
					position: absolute;
					width: 1px;
					height: 40rpx;
					top: 20rpx;
					background: #D8D8D8;
					right: 0;
				}
				&:last-child{
					padding-left: 64rpx;
				}
			}
			.img{
				width: 40rpx;
				height: 40rpx;
				background-size: cover;
				margin-right:30rpx;
				display: inline-block;
				margin-top: 16rpx;
			}
			.num{
				font-size: 32rpx;
				color: #666666;
				display: block;
				margin-bottom: 10rpx;
			}
			.name{
				font-size: 28rpx;
				color: #333333;
			}
		}
		.normal{
			background-image: url($img-oss+'tdrs.png');
		}
		.vips{
			background-image: url($img-oss+'jlje.png');
		}
	}
	
	.cash{
		height: 285rpx;
		overflow: hidden;
		.title{
			padding: 30rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
		}
		.right{
			font-size: 28rpx;
			font-weight: 400;
			color: #6F382C;
			display: flex;
			align-items: center;
			.arrow{
				display: inline-block;
				background-size: 100% 100%;
				background-image:url($img-oss+'v2_arrow_szmx.png');
				width: 20rpx;
				height: 20rpx;
				margin: 2rpx 4rpx 0 4rpx;
			}
			
		}
		.cash_group{
			display: flex;
			padding: 0 20rpx;
			justify-content: space-between;
			vertical-align:baseline;
			.name{
				font-size: 28rpx;
				color: #666666;
				display: block;
				margin-bottom: 20rpx;
			}
			.money{
				font-size: 32rpx;
				font-weight: 500;
				color: #666666;
				display: inline-block;
				position: relative;
			}
			.hasW::after{
				content: '+';
				width: 0;
				position: absolute;
				right: 0;
				top: -10rpx;
				font-size: 30rpx;
			}
		}
	}
	.withdraw{
		width: 100rpx;
		height: 40rpx;
		background: #F6F6F6;
		border-radius: 27px;
		color: #999999;
		border-radius: 26rpx;
		line-height:40rpx;
		text-align: center;
		font-size: 24rpx;
		float: right;
		margin: 16rpx 30rpx 0 0;
		&.can{
			background: #E9BC80;
			color: #7A4730;
		}
	}
	.myGroup{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		margin-bottom: 20rpx;
	}
	.myGroup image{
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
	.peopleNum{
		color: #666666;
		font-size: 32rpx;
	}
	.name{
		color:#333333;
		display: flex;
		align-items: center;
	}
</style>
