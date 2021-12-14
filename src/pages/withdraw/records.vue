<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="rowList" v-if="withDrawInfo.records && withDrawInfo.records.length">
			<view class="everyRow" v-for="v,index in withDrawInfo.records" :key='index'>
				<view class="everyTop">
					<text class="time">{{$utils.formatDate(v.applyTime,"yyyy-MM-dd hh:mm")}}</text>
					<text class="price" :class="v.status==2?'time':''">{{v.withdrawAmount}}元</text>
				</view>
				<view class="everyBottom">
					<text class="title">{{v.remark}}</text>
					<text v-if="v.status==2" class="status error">提现失败</text>
					<text v-else-if="v.status==1" class="status success">已到账</text>
					<text v-else-if="v.status==0" class="status ing">提现中</text>
				</view>
			</view>
		</view>
		<view class="hasNothingMsg" v-else>
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/notorder.png" mode="widthFix"></image>
			<view class="hasNothingMsgText">
				暂无数据！
			</view>
		</view>
	</view>
</template>

<script>
	import cashApi from '@/api/cash/index.js';
	export default {
		data() {
			return {
				withDrawInfo: { // 状态，0-提现中，1-提现成功，2-提现失败
					records:[],
				},
				pageInfo:{
					pageNo:1,
					pageSize:12
				},
				defaultTitleDto:{
					title:'提现记录',
				}
			}
		},
		methods: {
			pageWithdrawApplys(flag) { //获取收入流水
				cashApi.pageWithdrawApplys(this.pageInfo).then(res => {
					if (res.data.code == 200) {
						if (res.data.data) {
							if (flag) {
								this.withDrawInfo.records = this.withDrawInfo.records.concat(res.data.data.records);
							} else {
								this.withDrawInfo = res.data.data
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
			if (this.pageInfo.pageNo >= this.withDrawInfo.totalPage) {
				return
			}
			this.pageInfo.pageNo++;
			this.pageWithdrawApplys(true)
		},
		mounted() {
			this.pageWithdrawApplys()
		},
		onShow() {
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		background: #F5F5F5;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		height: 100vh;
	}

	.everyRow {
		width: calc(100% - 60rpx);
		margin:0 auto;
		position: relative;
		border-bottom: 1rpx solid #F5F6F7;
		padding: 20rpx;
	}

	.rowList {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
	}
	.everyRow>view{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;
		font-weight: 400;
	}
	.title,.status,.price{
		color: #333333;
	}
	.title.price {
		font-size: 28rpx;
	}
	.status{
		min-width: 98rpx;
		text-align: right;
		margin-left: 20rpx;
	}
	.status,.time{
		font-size: 24rpx;
	}
	.status.error,.time {
		color: #999999;
	}
	.status.ing{
		color: #FE325C;
	}
	.price{
		font-weight: 500;
	}

</style>
