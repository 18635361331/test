<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="head">
			<view class="headgroup">
				<block v-for="item,i in awardList" :key="i">
					<view class="list" :class="awardType.type==item.type?'active':''" @click="changeAwardType(item)">
						<text>{{item.name}}</text>
						<view class="money">
							<block v-if="item.money">
								<text class="big">{{item.money.toString().split('.')[0]}}</text>
								<text v-if="item.money.toString().split('.').length>0">.{{item.money.toString().split('.')[1]}}</text>
							</block>
							<text v-else>0</text>
						 </view>
					</view>
				</block>
			</view>
			<view class="headCen">
				<view class="descripition">
					<text>解读</text>
					<block v-if="awardType.type==12">
						合伙人发展的下级合伙人团队在平台购买商品后将向上级合伙人返相应团队业绩奖励（特殊商品除外）
					</block>
					<block v-else-if="awardType.type==10">合伙人在平台购买的商品可享受合伙人自购订单优惠（特殊商品除外）</block>
					<block v-else>合伙人邀请用户注册并开通会员，会员在平台消费后的销售差价全额返给合伙人（特殊商品除外）</block>
				</view>
			</view>
		</view>
		<view class="tabTitle promotionTitle">
			<view :class="(!settledStatus)?'active':''" @click="chooseChange('')">全部</view>
			<view :class="settledStatus==='0'?'active':''" @click="chooseChange('0')">待结算</view>
			<view :class="settledStatus==1?'active':''" @click="chooseChange(1)">已结算</view>
			<view :class="settledStatus==2?'active':''" @click="chooseChange(2)">已关闭</view>
		</view>
		<view class="hasNothingMsg" v-if="(!orderColumns.records || !orderColumns.records.length) ">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noOrder.png" mode="widthFix"></image>
			<text class="hasNothingMsgText">暂无内容</text>
		</view> 
		<block v-else>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltolower='scrolltolower' lower-threshold='150' class="promotionView">
				<orderlist :list="orderColumns.records" :type="awardType.type"></orderlist>
			</scroll-view>
		</block>
		
		
	</view>
</template>

<script>
	import orderlist from '@/copartner/order/orderlist.vue'
	import appApi from '@/api/app/index.js'
	export default {
		data(){
			return{
				defaultTitleDto:{
					title:'我的奖励'
				},
				settledStatus:'', // 0-未结算、1-已结算、2-已关闭
				pageInfo:{
					pageNo:1,
					pageSize:10
				},
				awardType:{ // 奖励类型，10-自营奖励、11-拓展奖励、12-团队奖励
					type:11,
					name:'拓展奖励'
				},
				awardList:[ 
					{
						type:11,
						name:'拓展奖励',
						money:'',
					},
					{
						type:10,
						name:'自营奖励',
						money:'',
					},
					{
						type:12,
						name:'团队奖励',
						money:'',
					}
				],
				orderColumns: {
					records: []
				},
				awardInfo:{}, // 头部数据
				scrollTop:0,
			}
		},
		methods:{
			scrolltolower() { //滚动到底部
				if (this.pageInfo.pageNo >= this.orderColumns.totalPage) {
					return
				}
				this.pageInfo.pageNo++;
				this.pagePerformanceOrder(true)
			},
			changeAwardType(item){
				this.awardType = item
				this.chooseChange() // 切换类型
			},
			chooseChange(type){ // 切换
				this.settledStatus = type?type:''
				this.pageInfo.pageNo = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				})
				this.pagePerformanceOrder()
			},
			pagePerformanceOrder(flag){ // 查询
				uni.showLoading({
					title: '加载中...'
				});
				let parmas = {
					...this.pageInfo,
					rewardType:this.awardType.type,
					settledStatus:this.settledStatus,
				}
				appApi.pagePerformanceOrder(parmas).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						if (res.data.data) {
							if (flag) {
								this.orderColumns.records = this.orderColumns.records.concat(res.data.data.records)
							} else {
								this.orderColumns = res.data.data;
							}
						} else {
							this.orderColumns.records.splice(0);
							this.orderColumns.totalPage = 0;
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			rewardSummary(){	//我的奖励-奖励统计信息
				appApi.rewardSummary().then(res=>{
					if(res.data.code==200){
						this.awardInfo = res.data.data
						this.awardList[0].money = res.data.data.expandRewardAmount
						this.awardList[1].money = res.data.data.selfRewardAmount
						this.awardList[2].money = res.data.data.teamRewardAmount
						// 客户类型 不展示团队奖励
						if(res.data.data.distributorTypeId == '1427145756447391746'){
							this.awardList.splice(2)
						}
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			}
		},
		onShow() {
			this.awardType = this.awardList[0]
			this.pagePerformanceOrder();	
			this.rewardSummary()
		},
		components:{
			orderlist,
		}
	}
</script>

<style scoped>
	.page {
		padding-top: 20rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 108rpx;
		/* #endif */
		height: 100vh;
		
		background: #F4F5F6;
	}
	.tabTitle{
		width: 92%;
		height: 88rpx;
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: 0 auto ;
	}
	.promotionTitle view{
		width: 25%;
		text-align: center;
		color: #999999;
		font-size: 28rpx;
		position: relative;
		line-height: 1;
	}
	.promotionTitle view:not(:last-child)::before{
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 1px;
		height: 30rpx;
		background: #D8D8D8;
	}
	.promotionTitle view.active{
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}
	.promotionTitle .active::after{
		content: '';
		position: absolute;
		bottom: -14px;
		left: 50%;
		transform: translate(-50%,0);
		width: 50rpx;
		height: 10rpx;
		background: #DE3150;
		border-radius: 5px;
	}
	
	.promotionView{
		width: 100%;
		/* 224 +  130 + 30 + 40 + 88 */
		height: calc(100vh - 424rpx);
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 512rpx);
		/* #endif */
		padding-top: 20rpx;
		padding-bottom: 2px;
	}
	.head{
		margin: 20rpx 30rpx;
		border-radius: 20rpx;
		margin-top: 0;
	}
	.headgroup{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.head .list{
		width: 48%;
		height: 130rpx;
		background: #FAFAFA;
		border-radius: 20rpx 20rpx 0 0;
		margin-right: 20rpx;
		text-align: center;
		padding: 20rpx 0;
		font-size: 32rpx;
		font-weight: 400;
		color: #999999;
		position: relative;
	}
	.head .list.active{
		background: #FFFFFF;
		color: #333333;
	}
	.head .list.active::after{
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
	.head .list:last-child{
		margin-right: 0;
	}
	.headCen{
		background: #fff;
		padding: 20rpx 20rpx 30rpx;
		border-radius: 0 0 20rpx 20rpx;
	}
	.money{
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
	}
	.money .big{
		font-size: 32rpx;
	}
	.descripition{
		width: 100%;
		background: #FFFAF1;
		border-radius: 10rpx;
		border: 1px solid #FFE9C8;
		padding: 20rpx;
		font-size: 24rpx;
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
		position: relative;z-index: 2;
	}
	.descripition text::after{
		content: '';
		display: inline-block;
		width: 2rpx;
		height: 20rpx;
		background: #A07435;
		margin: 0 20rpx;
	}
</style>
