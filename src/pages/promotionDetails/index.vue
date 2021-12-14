<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="tabTitle promotionTitle">
			<view :class="orderType=='0'?'active':''" @click="chooseChange(0)">个人会员开户</view>
			<view :class="orderType=='1'?'active':''" @click="chooseChange(1)">企业会员开户</view>
			<view :class="orderType=='2'?'active':''" @click="chooseChange(2)">商品推广</view>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltolower='scrolltolower'
		 lower-threshold='150' class="promotionView">
			<block>
				<memberInfo v-if='orderType==1||orderType==0' :info="orderColumns.records" :orderType="orderType"></memberInfo>
				<view class="tab" v-if='orderType==2'>
					<view class="tabTitle goodsTitle">
						<!-- 推广订单状态 1、已支付 2、已结算 3、已售后 4、已退款 -->
						<view :class="orderState==''?'active':''" @click="orderChange()">全部</view>
						<view :class="orderState=='1'?'active':''" @click="orderChange(1)">已支付</view>
						<view :class="orderState=='2'?'active':''" @click="orderChange(2)">已结算</view>
						<view :class="orderState=='3'?'active':''" @click="orderChange(3)">已售后</view>
						<view :class="orderState=='4'?'active':''" @click="orderChange(4)">已退款</view>
					</view>
					<goodsInfo :info="orderColumns.records"></goodsInfo>
				</view>
			</block>
			<view class="hasNothingMsg" v-if="orderColumns.records.length==0">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noOrder.png" mode="widthFix"></image>
				<text class="hasNothingMsgText">暂无订单</text>
			</view>  
		</scroll-view>
	</view>
</template>

<script>
	import memberInfo from '@/pages/promotionDetails/memberInfo.vue'
	import goodsInfo from '@/pages/promotionDetails/goodsInfo.vue'
	import memberApi from '@/api/member/index.js'
	
	export default {
		data(){
			return{
				defaultTitleDto:{
					title:'推广订单明细'
				},
				orderType:0,
				orderState:'',
				pageInfo:{
					pageNo:1,
					pageSize:10
				},
				timeRange:0,//查询时间范围 0、日 1、月
				orderColumns: {
					records: []
				},
				userVipInfo:[],//个人会员
				corporateMemberInfo:[],//企业会员
				commodityInfo:[],//商品推广
				scrollTop:0,
			}
		},
		onShow() {
			this.timeRange = this.$Route.query.timeRange||0
		},
		methods:{
			scrolltolower() { //滚动到底部
				if (this.pageInfo.pageNo >= this.orderColumns.totalPage) {
					return
				}
				this.pageInfo.pageNo++;
				this.queryOrders(true)
			},
			chooseChange(type){
				this.orderType = type||type==0?type:''
				this.pageInfo.pageNo = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				})
				this.queryOrders()
			},
			orderChange(type){ //商品推广切换
				this.orderState = type?type:''
				this.pageInfo.pageNo = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				})
				this.queryOrders()
			},
			queryOrders(flag){ // 
				uni.showLoading({
					title: '加载中...'
				});
				let parmas = {
					...this.pageInfo,
					orderType:this.orderType,
					timeRange:this.timeRange
				}
				if(this.orderType==2 && this.orderState){
					parmas.orderState = this.orderState
				}
				memberApi.estimateDetail(parmas).then(res => {
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
		},
		mounted() {
			this.queryOrders();	
		},
		components:{
			goodsInfo,
			memberInfo
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		background: #FAFAFA;
	}
	.tabTitle{
		width: 92%;
		display: flex;
		height: 88rpx;
		justify-content: space-between;
		margin: 0 auto;
	}
	.promotionTitle view{
		/* width: 33%; */
		text-align: center;
		height: 100%;
		line-height: 138rpx;
		color: #333;
		font-size: 28rpx;
		font-weight: bold;
		border-bottom: 10rpx solid #FAFAFA;
	}
	.promotionTitle view.active{
		font-size: 32rpx;
		border-color: #E61446;
	}
	.goodsTitle{
		margin-top: 36rpx;
	}
	.goodsTitle view{
		height: 54rpx;
		font-weight: 500;
		color: #1B1B1B;
		width: 15%;
		text-align: center;
		line-height: 54rpx;
		font-size: 24rpx;
		background: #F6F6F6;
		border-radius: 27rpx;
	}
	.goodsTitle view.active{
		background: #FEDCE4;
		color: #E61446;
	}
	.promotionView{
		height: calc(100vh - 88rpx);
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 176rpx);
		/* #endif */
		background: #FAFAFA;
	}
	.nothing{
		width: 50%;
	}
</style>
