<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="integralList">
			<view class="transInItem" v-for="item,index in pointData.list" :key='index'>
				<view class="intransInBox" v-for="v,i in item.showList" :key='i'>
					<view class="transiInTitle">
						{{v.operateDesc}}
					</view>
					<view class="transInDetails">
						<view>
							<text>时间：</text>
							<text>{{$utils.formatDate(v.createdTime,"yyyy-MM-dd hh:mm:ss")}}</text>
						</view>
						<view>
							<text>流水号：</text>
							<text>{{v.id}}</text>
						</view>
						<view>
							<text>文器库商城积分{{v.pointChange<0?"减少":"增加"}}数：</text>
							<text>{{v.pointChange<0?"":"+"}}{{v.pointChange}}</text>
						</view>
						<view class="intergaNum">
							<text>文器库商城积分余额：</text>
							<text class="intergaText">{{v.afterPoint}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="!pointData.list || !pointData.list.length" class="isNull">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/inNUll.png" mode="widthFix"></image>
				<view class="isNullText">
					暂无记录！
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	
	export default{
		data(){
			return{
				pointData:{	//积分明细列表
					list:[],
					lastLogId:"",
				},	
				defaultTitleDto:{
					title:'积分明细',
				}
			}
		},
		methods:{
			pointHistory(lastLogId){	//积分明细
				memberApi.pointHistory(this.pointData.lastLogId).then(res=>{
					if(res.data.code==200){
						if(res.data.data){
							if(lastLogId){
								if(res.data.data.list[0].showDate == this.pointData.list[this.pointData.list.length-1].showDate){
									this.pointData.list[this.pointData.list.length-1].showList=this.pointData.list[this.pointData.list.length-1].concat(res.data.data.list)
								}
								this.pointData.lastLogId = res.data.data.lastLogId
							}else{
								this.pointData = res.data.data;
							}
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		onReachBottom(){
			this.pointHistory()
		},
		onShow() {
			this.zhuge.track("积分明细落地页")
			this.pointHistory()
		},
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		background-color: #F5F5F5;
	}
	
	.integralList{
		min-height: 100vh;
		/* #ifndef MP-WEIXIN */
		min-height: calc(100vh - 88rpx);
		/* #endif */
		width: 100%;
	}
	.transiInTitle{
		width: 100%;
		line-height: 98rpx;
		font-size: 32rpx;
		border-bottom: 1rpx solid #DBDBDB;
		padding: 0 24rpx;
		background-color: #FFFFFF;
	}
	.transInDetails{
		padding-top: 20rpx;
		color: #999999;
		margin-bottom: 16rpx;
		background-color: #FFFFFF;
	}
	.transInDetails view{
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.intransInBox{
		margin-bottom: 16rpx;
	}
	.transInDetails .intergaNum{
		margin-top: 20rpx;
		font-size: 30rpx;
		height: 98rpx;
		line-height: 98rpx;
		border-top: 1rpx solid #DBDBDB;
	}
	.intergaText{
		font-size: 34rpx;
		color: #FF1558;
	}
	.isNull{
		text-align: center;
		padding-top: 262rpx;
		width: 360rpx;
		margin: 0 auto;
	}
	.isNull image {
		width: 100%;
	}
	
	.isNullText {
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		margin-top: 55rpx;
	}
</style>
