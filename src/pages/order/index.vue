<template>
	<view class="page">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
	
		<view class="orderType">
			<view class="everyOrderType" @click="chooseItem=item.label;seachReast()" v-for="item,index in orderTypeList" :key='index'>
				<view class="orderLine" :class="chooseItem==item.label?'active':''">
					{{item.value}}
				</view>
			</view>
		</view>
		<scroll-view class="orderScroll" :scroll-top="scrollTop" scroll-y="true" @scrolltolower='scrolltolower'
		 lower-threshold='150' v-if="orderColumns.records && orderColumns.records.length">
			<orderList v-for='item,index in orderColumns.records' :key='item.id' :orderRow='item' :index='index' @deleteOrder='deleteOrder'
			 @extendShip='extendShip' @confirmReceipt='seachReast'></orderList>
		</scroll-view>
		<view class="orderNoMsg" v-if="!orderColumns.records || !orderColumns.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/void@2x.png" mode="widthFix"></image>
			<view class="orderNoMsgText">
				暂无订单！
			</view>
		</view>
	</view>
</template>

<script>
	import trade from '@/api/trade/index.js'
	import orderList from './orderList/index.vue'
	
	export default {
		data() {
			return {
				orderTypeList: [{
						value: "全部",
						label: 0
					},
					{
						value: "待付款",
						label: 10
					},
					{
						value: "待发货",
						label: 20
					},
					{
						value: "待收货",
						label: 30
					},
					{
						value: "待评价",
						label: 70
					}
				],
				chooseItem: 0,
				scrollTop: 0,
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				orderColumns: {
					records: []
				},
				imgBaseUrls: "",
				defaultTitleDto:{
					title:'我的订单',
					bottomColor:'#E6E6E6'
				}
			}
		},
		methods: {
			scrolltolower() { //滚动到底部
				if (this.pageInfo.pageNo >= this.orderColumns.totalPage) {
					return
				}
				this.pageInfo.pageNo++;
				this.queryMyOrders(true)
			},
			seachReast() { //顶部type切换时调用
				this.pageInfo.pageNo = 1;
				uni.setStorageSync("orderState",this.chooseItem)
				this.$nextTick(() => {
					this.scrollTop = 0;
				})
				this.queryMyOrders()
			},
			deleteOrder(index) { //删除订单
				this.orderColumns.records.splice(index, 1)
			},
			extendShip(index) { //延长收货
				this.orderColumns.records[index].extendShip = 1
			},
			queryMyOrders(type) { //获取订单列表
				uni.showLoading({
					title: '加载中...'
				});
				trade.queryMyOrders(this.pageInfo, this.chooseItem ? this.chooseItem : "").then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						if (res.data.data) {
							if (type) {
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
			}
		},
		onLoad() {
			if (this.$Route.query.state) {
				this.chooseItem = this.$Route.query.state;
			}
		},
		onShow() {
			this.zhuge.track("我的订单落地页")
			if(this.pageInfo.pageNo>1){
				this.pageInfo.pageNo = 1;
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
			}
			this.queryMyOrders();
		},
		components: {
			orderList
		}
	}
</script>

<style scoped>
	.collectTitle {
		position: relative;
	}

	.orderType {
		width: 100%;
		height: 88rpx;
		display: flex;
	}

	.everyOrderType {
		width: 25%;
		height: 100%;
		text-align: center;
		line-height: 88rpx;
		padding: 0 25rpx;
		color: #333;
		font-size: 28rpx;
		border-bottom: 1px solid #E6E6E6;
	}

	.orderLine {
		width: 100%;
		height: 100%;
		border-bottom: 2px solid #fff;
	}

	.orderLine.active {
		border-bottom: 2px solid #ff1558;
		color: #FF1558;
	}

	.orderScroll {
		width: 100%;
		height: calc(100vh - 88rpx);
		
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 176rpx);
		/* #endif */
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
