<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="everyIncrease" v-for="item,index in userInfo.records" :key='index'>
			<headImg class="userInfoHead" :head="item.smallIcon"></headImg>
			<view class="userInfo">
				<view class="everyInfo">
					<text>领取人名称</text>{{item.nickName}}
				</view>
				<view class="everyInfo">
					<text>领取时间</text>{{$utils.formatDate(item.receivedTime,"yyyy-MM-dd hh:mm")}}
				</view>
				<view class="everyInfo">
					<text>联系电话</text>{{item.telephone}}
				</view>
			</view>
		</view>
		<view class="orderNoMsg" v-if="!userInfo.records || !userInfo.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/giftBagOrderMsg.jpg" mode="widthFix"></image>
			<view class="orderNoMsgText">
				暂无数据！
			</view>
		</view>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js'
	import headImg	from  '@/common/model/head.vue'
	export default{
		data(){
			return{
				defaultTitleDto:{
					title:'领取详情',
				},
				userInfo:{},
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				imgBaseUrls:""
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.giftBagPageGetLogs()
		},
		methods:{
			giftBagPageGetLogs(){
				tradeApi.giftBagPageGetLogs({...this.pageInfo,orderId:this.$Route.query.orderId}).then(res=>{
					if(res.data.code==200){
						this.userInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		components:{
			headImg
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		padding-top: 20rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 108rpx;
		/* #endif */
		background-color: #F4F4F4;
		min-height: 100vh;
	}
	.everyIncrease{
		width: calc(100% - 40rpx);
		height: 158rpx;
		margin: 0 auto;
		margin-bottom:20rpx ;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		display: flex;
		padding: 34rpx 0 34rpx 44rpx;
	}
	.userInfoHead {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
		display: inline-block;
		margin-right: 44rpx;
	}
	.everyInfo{
		font-size: 22rpx;
		color: #333333;
	}
	.everyInfo text{
		color: #999999;
		display: inline-block;
		width: 110rpx;
		margin-bottom: 4rpx;
		margin-right: 20rpx;
	}
	.orderNoMsg {
		padding-top: 262rpx;
		width: 360rpx;
		margin: 0 auto;
	}
	
	.orderNoMsg image {
		width: 100%;
	}
	
	.orderNoMsgText {
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		margin-top: 55rpx;
	}
</style>
