<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="tabTitle" scroll-x="true">
			<block v-for="item,i in teams" :key="i">
				<view :class="inviteType==item.type?'active':''" @click="chooseChange(item)">
					<view class="title">{{item.typeName}}</view>
					<text class="num">{{item.number}}</text>
				</view>
			</block>
		</view>
		
		<block v-if="teamsColumns.records&&teamsColumns.records.length">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltolower='scrolltolower' lower-threshold='150' class="promotionView">
				<view class="userList">
					<view class="user_part" v-for="item,index in teamsColumns.records" :key="index">
						<headImg class="userInfoHead" :head="item.smallIcon"></headImg>
						<view class="user_info">
							<view class="name">
								<text>{{item.nickName||''}}</text>
								<text>{{item.telephone}}</text>
							</view>
							<text class="time">发展时间：{{$utils.formatDate(item.createdTime,"yyyy-MM-dd")}}</text>
							<view class="money">业绩返利：<text>{{item.amount||0}}元</text></view>
						</view>
					</view>
				</view>
			</scroll-view>
		</block>
		<view class="hasNothingMsg" v-else>
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noOrder.png" mode="widthFix"></image>
			<text class="hasNothingMsgText">暂无内容</text>
		</view>
	</view>
</template>

<script>
	import headImg from  '@/common/model/head.vue'
	import memberApi from '@/api/member/index.js'
	
	export default {
		data(){
			return{
				defaultTitleDto:{
					title:'发展团队'
				},
				inviteType:'',
				pageInfo:{
					pageNo:1,
					pageSize:10
				},
				teams:[],//团队人数
				teamsColumns: {
					records: []
				},
				scrollTop:0,
			}
		},
		methods:{
			scrolltolower() { //滚动到底部
				if (this.pageInfo.pageNo >= this.teamsColumns.totalPage) {
					return
				}
				this.pageInfo.pageNo++;
				this.pageDistributors(true)
			},
			chooseChange(item){ // 切换
				if(this.inviteType==item.type){
					return false
				}
				this.inviteType = item.type
				this.pageInfo.pageNo = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				})
				this.pageDistributors()
			},
			distributorSummary(){ // 发展团队-团队数量统计
				memberApi.distributorSummary().then(res => {
					if (res.data.code == 200) {
						if(res.data.data&&res.data.data.length){
							this.teams = res.data.data
							this.inviteType = res.data.data[0].type
							this.pageDistributors()
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},	
			pageDistributors(flag){ // 查询
				uni.showLoading({
					title: '加载中...'
				});
				memberApi.pageDistributors(this.inviteType,this.pageInfo).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						if (res.data.data) {
							if (flag) {
								this.teamsColumns.records = this.teamsColumns.records.concat(res.data.data.records)
							} else {
								this.teamsColumns = res.data.data;
							}
						} else {
							this.teamsColumns.records.splice(0);
							this.teamsColumns.totalPage = 0;
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
		},
		onLoad() {
			this.distributorSummary()
			
		},
		components:{
			headImg
		}
	}
</script>

<style scoped>
	.page {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		height: 100vh;
		background: #F4F5F6;
	}
	.tabTitle{
		width: 92%;
		height: 160rpx;
		align-items: center;
		display: flex;
		overflow-x: auto;
		margin: 0 auto ;
		padding-top: 30rpx;
	}
	.tabTitle > view{
		width: 100%;
		min-width: 216rpx;
		height: 100%;
		text-align: center;
		background: #FAFAFA;
		border-radius: 20rpx;
		position: relative;
		color: #999999;
		padding: 20rpx;
		margin-right: 30rpx;
	}
	.tabTitle > view:last-child{
		margin-right: 0;
	}
	
	.tabTitle .active{
		background: #FFFFFF;
		color: #333333;
	}
	.tabTitle .active::after{
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%,0);
		width: 50rpx;
		height: 10rpx;
		background: #FE325C;
		border-radius: 6rpx;
	}
	.tabTitle .title{
		font-size: 32rpx;
	}
	.tabTitle .num{
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.promotionView{
		width: 100%;
		height: calc(100vh - 160rpx);
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 248rpx);  
		/* #endif */
		padding-bottom: 2px;
	}
	
	.userList{
		width: 100%;
		padding: 30rpx ;
	}
	.user_part{
		width: 100%;
		height: 180rpx;
		margin-bottom: 20rpx;
		display: flex;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
	}
	.userInfoHead{
		width: 100rpx;
		min-width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.user_info{
		font-size: 28rpx;
		color: #333333;
	}
	.user_info .name{
		font-weight: 400;
	}
	.name text{	
		margin-right: 20rpx;
	}
	.user_info .time{
		font-weight: 300;
		color: #666666;
		display: block;
		margin: 10rpx 0;
	}
	.user_info .money text{
		color: #FE325C;
	}
	
</style>
