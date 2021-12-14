<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="head">
			<text>日期</text>
			<text>结余 (元)</text>
		</view>
		<view class="rowList" v-if="blanceInfo.list && blanceInfo.list.length">
			<view v-for="item,index in blanceInfo.list" :key='index'>
				<text class="month">{{item.showDate}}</text>
				<view class="part" v-for="v,i in item.showList" :key='i'>
					<view class="everyRow">
						<view class="left">
							<text class="day">{{$utils.formatDate(v.createdTime,"dd")}}日</text>
							<text class="minute">{{$utils.formatDate(v.createdTime,"hh:mm")}}</text>
						</view>
						<view class="center" :class="v.balanceChange>0?'increase':'reduce'">
							<text class="icon"></text>
							<view>
								<text class="money">{{v.balanceChange}}</text>
								<view class="name">{{v.operateDesc}}</view>
							</view>
						</view>
						<view class="money">{{v.afterBalance}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="hasNothingMsg" v-else>
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/notorder.png" mode="widthFix"></image>
			<view class="hasNothingMsgText">
				暂无內容！
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default {
		data() {
			return {
				blanceInfo: {list:[]},
				defaultTitleDto:{
					title:'收支记录',
				}
			}
		},
		methods: {
			getBalanceHistory(flag) { //获取收入流水
				memberApi.getBalanceHistory({
					lastLogId: this.blanceInfo.lastLogId ? this.blanceInfo.lastLogId : ""
				}).then(res => {
					if (res.data.code == 200) {
						if (res.data.data) {
							if (flag) {
								this.blanceInfo.list = this.blanceInfo.list.concat(res.data.data.list);
								this.blanceInfo.lastLogId = res.data.data.lastLogId
							} else {
								this.blanceInfo = res.data.data
							}
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			}
		},
		onReachBottom() {
			if (this.blanceInfo.lastLogId) {
				this.getBalanceHistory(true)
			}
		},
		mounted() {
			this.getBalanceHistory()
		},
		
	}
</script>

<style scoped lang="scss">
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		height: 100vh;
		background: #F5F5F5;
	}
	.head{
		width: 100%;
		height: 86rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #FAEDDA;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		padding: 0 30rpx;
		position: fixed;
		top: 0;
		/* #ifndef MP-WEIXIN */
			top: 88rpx;
		/* #endif */
		z-index: 2;
	}
	.rowList {
		width: 100%;
		height: auto;
		padding: 90rpx 0 30rpx;
		background: #F5F5F5;
	}
	.month{
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
		margin: 20rpx 30rpx;
		display: block;
	}
	.part{
		background-color: #FFFFFF;
		padding: 0 30rpx;
		&:not(:last-child){
			.everyRow{
				border-bottom: 1px solid #F5F6F7;
			}
		}
	}
	.everyRow {
		display: flex;
		align-items: center;
		font-weight: 400;
		padding: 20rpx 0;
	}
	.left{
		min-width: 40%;
		font-weight: 400;
		.day{
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
		}
		.minute{
			font-size: 24rpx;
			color: #999999;
			margin-left: 16rpx;
		}
	}

	.center{
		min-width: 33%;
		display: flex;
		align-items: center;
		margin-right: auto;
		.icon{
			width: 30rpx;
			height: 30rpx;
			background-size: 100% 100%;
			margin-right: 20rpx;
		}
		.name{
			font-size: 20rpx;
			font-weight: 300;
			color: #666666;
			max-width: 200rpx;
		}
		.money{
			font-size: 24rpx;
			font-weight: 500;
			display: block;
		}
		&.increase{
			.icon{
				background-image: url($img-oss+'increase.png');
			}
			.money{
				color: #DE3452;
			}
		}
		&.reduce{
			.icon{
				background-image: url($img-oss+'reduce.png');
			}
			.money{
				color: #00BE39;
			}
		}
	}
	

	

	
</style>
