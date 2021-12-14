<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="tabTitle promotionTitle">
			<view :class="inviteType==0?'active':''" @click="chooseChange(0)">
				<view class="title">粉丝</view>
				<text class="num">{{partners.fansNumber}}</text>
			</view>
			<view :class="inviteType==1?'active':''" @click="chooseChange(1)">
				<view class="title">会员</view>
				<text class="num">{{partners.memberNumber}}</text>
			</view>
			<view :class="inviteType==2?'active':''" @click="chooseChange(2)">
				<view class="title">合伙人</view>
				<text class="num">{{partners.distributorNumber}}</text>
			</view>
		</view>
		<view class="head">
			<view class="descripition">
				<text>解读</text>
				<block v-if="inviteType==0">
					分享小程序任意页链接给未注册用户，新用户通过分享的链接成功注册，该用户则成为您邀请的粉丝
				</block>
				<block v-else-if="inviteType==1">邀请注册的用户通过购买礼包或累计消费达到指定金额将升级为会员用户，该用户则成为您邀请的会员</block>
				<block v-else>邀请注册的用户通过申请合伙人并成功通过审核将升级为合伙人用户，该用户则成为您邀请的合伙人
</block>
			</view>
		</view>
		<view class="hasNothingMsg" v-if="(!inviterColumns.records || !inviterColumns.records.length)">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noOrder.png" mode="widthFix"></image>
			<text class="hasNothingMsgText">暂无内容</text>
		</view> 
		<block v-else>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltolower='scrolltolower' lower-threshold='150' class="promotionView">
				<view class="userList">
					<view class="user_part" v-for="item,i in inviterColumns.records" :key="i">
						<headImg class="userInfoHead" :head="item.smallIcon"></headImg>
						<view class="user_info">
							<view class="name">
								<text>{{item.nickName||''}}</text>
								<text>{{item.telephone}}</text>
							</view>
							<text class="time">发展时间：{{$utils.formatDate(item.createdTime,"yyyy-MM-dd")}}</text>
						</view>
						<view class="user_dou">
							<view class="num">+{{item.amount}}</view>
							<view class="doudou"></view>
						</view>
					</view>
				</view>
			</scroll-view>
		</block>
		
	</view>
</template>

<script>
	import headImg from  '@/common/model/head.vue'
	import memberApi from '@/api/member/index.js'
	
	export default {
		data(){
			return{
				defaultTitleDto:{
					title:'邀请的伙伴'
				},
				inviteType:0,//  粉丝 - 0 会员 - 1 合伙人 - 2
				pageInfo:{
					pageNo:1,
					pageSize:10
				},
				partners:{},//团队人数
				inviterColumns: {
					records: []
				},
				policyInfo:{},
				scrollTop:0,
			}
		},
		methods:{
			scrolltolower() { //滚动到底部
				if (this.pageInfo.pageNo >= this.inviterColumns.totalPage) {
					return
				}
				this.pageInfo.pageNo++;
				this.pageMembers(true)
			},
			chooseChange(type){ // 切换
				this.inviteType = (type||type==0)?type:''
				this.pageInfo.pageNo = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				})
				this.pageMembers()
			},
			partnerSummary(){ // 邀请的伙伴-伙伴数量统计
				memberApi.partnerSummary().then(res => {
					if (res.data.code == 200) {
						this.partners = res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			pageMembers(flag){ // 查询
				uni.showLoading({
					title: '加载中...'
				});
				memberApi.pageMembers(this.inviteType,this.pageInfo).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						if (res.data.data) {
							if (flag) {
								this.inviterColumns.records = this.inviterColumns.records.concat(res.data.data.records)
							} else {
								this.inviterColumns = res.data.data;
							}
						} else {
							this.inviterColumns.records.splice(0);
							this.inviterColumns.totalPage = 0;
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
			this.partnerSummary()
			this.pageMembers();	
		},
		components:{
			headImg
		}
	}
</script>

<style scoped>
	.page {
		padding-top: 30rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 118rpx;
		/* #endif */
		height: 100vh;
		background: #F4F5F6;
	}
	.tabTitle{
		width: 92%;
		height: 130rpx;
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
	}
	.promotionTitle > view{
		width: 32%;
		height: 100%;
		text-align: center;
		background: #FAFAFA;
		border-radius: 20rpx 20rpx 0 0;
		position: relative;
		color: #999999;
		padding: 20rpx;
	}
	
	.promotionTitle .active{
		background: #FFFFFF;
		color: #333333;
	}
	.promotionTitle .active::after{
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
	.promotionTitle .title{
		font-size: 32rpx;
	}
	.promotionTitle .num{
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.head{
		width: 92%;
		margin: 20rpx auto 0;
		background: #FFFFFF;
		padding: 20rpx 20rpx 30rpx;
		margin-top: 0;
		border-radius: 0 0 20rpx 20rpx;
	}
	.descripition{
		width: 100%;
		background: #FFFAF1;
		border-radius: 10rpx;
		border: 1px solid #FFE9C8;
		padding: 20rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
		text-align: justify;
		position: relative;
	}
	.descripition::before{
		content: '';
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: 0;
		left: 0;
		background-image: url('http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/marks.png');
		background-size: contain;
		z-index: 1;
	}
	.descripition text{
		font-size: 28rpx;
		font-weight: 500;
		color: #A07435;
		line-height: 40rpx;
		position: relative;
		z-index: 2;
	}
	.descripition text::after{
		content: '';
		display: inline-block;
		width: 2rpx;
		height: 20rpx;
		background: #A07435;
		margin: 0 20rpx;
	}
	.promotionView{
		width: 100%;
		/* 130 + 154 + 40 + 88*/
		height: calc(100vh - 324rpx);
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 412rpx);
		/* #endif */
		padding-bottom: 2px;
	}
	
	.userList{
		width: 100%;
		padding: 30rpx 30rpx 0;
	}
	.user_part{
		width: 100%;
		height: 140rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx;
	}
	.userInfoHead{
		width: 100rpx;
		min-width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.user_info,.user_dou{
		font-size: 28rpx;
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
	}
	.user_info .name{
		font-weight: 400;
		color: #333333;
		display: block;
	}
	.name text{
		margin-right: 20rpx;
	}
	.user_info .time{
		font-weight: 300;
		color: #666666;
		display: block;
	}
	.user_dou{
		text-align: right;
		margin-left:auto;
		margin-right: 14rpx;
		color: #FE325C;
	}
	.user_dou .num{
		font-size: 24rpx;
		font-weight: 500;
	}
	.user_dou .doudou{
		width: 60rpx;
		height: 60rpx;
		margin-right: -6rpx;
		background-size: 100% 100%;
		background-image: url('http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/doudou.png');
	}
</style>
