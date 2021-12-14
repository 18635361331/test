<template>
	<view class="pages">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		
		<view class="tabTitle promotionTitle">
			<block v-for="item,index in order" :key="index">
				<view :class="orderType==item.type?'active':''" @click="orderType=item.type;chooseChange()">{{item.name}}</view>
			</block>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltolower='scrolltolower'
		 lower-threshold='150' class="promotionView">
			<view v-for="(item,index) in orderInfoParams.records" :key='index' @click="goDetail(item)">
				<orderInfo :type="1" :orderInfo='item' :orderParent="orderInfoParams">
					<view slot="btns" class="btns">
						<view @click.stop="openKefu(item.qiyuKefuGroupId)">联系客服</view>
						<!-- 待确认状态可以取消订单 -->
						<view v-if="item.orderState==10" @click.stop="cancelOrder(index)">取消订单</view> 
						<!-- 待付款状态 -->
						<view v-if="item.orderState==20" @click.stop="goToPay(item)">去付款</view>
					</view>
				</orderInfo>
			</view>
			<view class="hasNothingMsg" v-if="!orderInfoParams || !orderInfoParams.records.length">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noOrder.png" mode="widthFix"></image>
				<text class="hasNothingMsgText">暂无订单</text>
			</view> 
		</scroll-view>
		<uni-popup ref="cancelPopup" type="center">
			<defaultPopup @cancel='cancelOk' @sure='sureOk'>
				<view class="hint">
					确定取消该订单吗？
				</view>
			</defaultPopup>
		</uni-popup>
		
	</view>
</template>

<script>
	import qiyuPlug from '@/plugInUnit/qiyuPlug.js'
	import orderInfo from '@/pages/customizationOrder/orderInfo.vue'
	import tradeApi from '@/api/trade/index.js'
	import defaultPopup from '@/components/defaultPopup/index.vue'
	
	export default {
		mixins:[qiyuPlug],
		data() {
			return {
				defaultTitleDto:{
					title:'定制订单'
				},
				order:[
					{
						type:'',
						name:'全部',
					},
					{
						type:10,
						name:'待确认',
					},
					{
						type:20,
						name:'待付款',
					},
					{
						type:30,
						name:'生产中',
					},
					{
						type:40,
						name:'待收货',
					},
				],
				orderType:'',
				pageInfo:{
					pageNo:1,
					pageSize:6
				},
				orderInfoParams:"",
				scrollTop:0,
				checkIndex:'',//取消订单id
			}
		},
		methods: {
			scrolltolower() { //滚动到底部
				if (this.pageInfo.pageNo >= this.orderInfoParams.totalPage) {
					return
				}
				this.pageInfo.pageNo++;
				this.queryOrders(true)
			},
			chooseChange(){
				this.pageInfo.pageNo = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				})
				this.queryOrders()
			},
			queryOrders(flag){ //获取订单列表
				uni.showLoading({
					title: '加载中...'
				});
				let parmas = {
					...this.pageInfo,
					orderState:this.orderType?this.orderType:'',
				}
				tradeApi.listOrderPage(parmas).then(res=>{
					uni.hideLoading()
					if(res.data.code==200){
						 res.data.data.records.map = res.data.data.records.map(v=>{
								v.goodsList.map =v.goodsList.map(t=>{
									 t.deliveryDaysMap = t.deliveryDays?this.$utils.getDHours(t.deliveryDays):''
									return t
								})
							return v
						})
						if(flag){
							this.orderInfoParams.records = this.orderInfoParams.records.concat(res.data.data.records)
						}else{
							this.orderInfoParams = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
				
			},
			//取消订单
			cancelOrder(index){
				this.checkIndex = index
				this.$refs.cancelPopup.open()
			},
			cancelOk(){	//取消取消订单
				this.$refs.cancelPopup.close();
			},
			goToPay(params){
				if(params.payType==2){
					this.$Router.replace({
						path:"/pages/customizationOrder/paySuccess",
						query:{
							payType:2,
							type:1,
							orderId:params.id,
							qiyuKefuGroupId:params.qiyuKefuGroupId?params.qiyuKefuGroupId:""
						}
					})
				}else{
					this.goDetail(params)
				}
			},
			sureOk(){	//确定取消订单
				this.$refs.cancelPopup.close()
				tradeApi.cancelCusOrder(this.orderInfoParams.records[this.checkIndex].id).then(res=>{
					if(res.data.code==200){
						this.orderInfoParams.records[this.checkIndex].orderState = 0
						uni.showToast({
							title:"取消成功",
							icon:"none"
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goDetail(item){
				this.$Router.push({
					path:'/pages/customizationOrder/detail',
					query:{
						id:item.id,
						qiyuKefuGroupId:item.qiyuKefuGroupId?item.qiyuKefuGroupId:""
					}
				})
			}
		},
		onLoad() {
			if (this.$Route.query.state) {
				this.orderType = this.$Route.query.state;
			}
		},
		onShow() {
			this.chooseChange();	
		},
		components:{
			orderInfo,
			defaultPopup
		}
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
	
	$height1:80rpx;
	.tabTitle{
		width: 100%;
		display: flex;
		height: $height1;
		background: #fff;
		justify-content: space-between;
		margin: 0 auto;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 2;
		/* #ifndef MP-WEIXIN */
		top: 88rpx;
		/* #endif */
	}
	.promotionView{
		margin-top: 88rpx;
		height: calc(100vh - 168rpx);
		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 80rpx);
		/* #endif */
		padding-bottom: 40rpx;
	}
	.promotionTitle view{
		width: 25%;
		text-align: center;
		height: 100%;
		line-height: $height1;
		color: #666666;
		font-size: 32rpx;
		font-weight: 400;
		&.active{
			font-weight: bold;
			color: #7A32CC;
			border-color: #E61446;
			&:after{
				content: '';
				display: block;
				width: 40rpx;
				height: 4rpx;
				background: #AE66FF;
				border-radius: 1px;
				margin: -6rpx auto 0;
			}
		}
	}
	.hint{
		display: flex;
		width: 100%;
		height: 100%;
		color: #333333;
		justify-content: center;
		align-items: center;
	}
	.btns{
		margin-top: 40rpx;
		flex-direction: row-reverse;
		view:first-child{
			margin-right: 0;
			margin-left: 30rpx;
		}
	}
</style>
