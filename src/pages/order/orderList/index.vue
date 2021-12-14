<template>
	<view class="page">
		<view class="everyOrder">
			<view class="storeName" @click="goToOrderShop(orderRow)">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/store_icon@2x.png" ></image>
				<text class="everyStore">{{orderRow.storeName}}</text>
				<view class="orderStatus">
					<orderStatus :order='orderRow' :index='index'></orderStatus>
				</view> 
			</view>
			<view class="orderDetails" @click="goToOrderDetails(orderRow)" v-for="list,listIndex in orderRow.cmOrderDetailDTOS" :key='listIndex'>
				<image :src="imgBaseUrls+list.goodsImage" ></image>
				<view class='goodsDetails'>
					<view class="goodsName ellipsis-two">{{list.name}}</view>
					<view class="goodsSpce ellipsis-one">{{list.fieldValue}}</view>
					<view class="goodsprice">
						<text class="price"><text>¥</text>{{list.goodsPrice}}</text>
						<text class="goodsNum">x{{list.goodsNum}}</text>
					</view>
				</view>
			</view>
			<view class="statistics">
				共{{orderRow.cmOrderDetailDTOS.length}}件商品&nbsp;&nbsp;&nbsp;&nbsp;合计：¥<text>{{orderRow.payPrice}}</text>&nbsp;&nbsp;&nbsp;&nbsp; (含运费¥{{orderRow.actualFreight}})
			</view>
			<view class="deliveryTime" v-if="orderRow.presaleFlag">
				<image :src="imgBaseUrls+'appletsImages/openBookingIcon.png'" mode=""></image>
				发货时间：{{$utils.formatDate(orderRow.itemPresaleInfo.deliveryStartTime,"yyyy年MM月dd日hh:mm")}} ~ {{$utils.formatDate(orderRow.itemPresaleInfo.deliveryEndTime,"yyyy年MM月dd日hh:mm")}}
			</view>
			<orderGroupBtn :order='orderRow' :index='index' @deleteOrder='deleteOrder' @confirmReceipt='confirmReceipt' @extendShip='extendShip'></orderGroupBtn>
		</view>
	</view>
</template>

<script>
	import orderStatus from '@/pages/order/orderStatusBtn/orderStatus.vue';
	import orderGroupBtn from '@/pages/order/orderStatusBtn/orderGroupBtn.vue';
	export default{
		props:["orderRow","index"],
		data(){
			return{
				imgBaseUrls:""
			}
		},
		methods:{
			deleteOrder(index){	//删除订单
				this.$emit("deleteOrder",index)
			},
			extendShip(index){	//延长收货
				this.$emit("extendShip",index)
			},
			confirmReceipt(){	//确认收货
				this.$emit("confirmReceipt")
			},
			goToOrderDetails(){	//去往订单详情
				this.$Router.push({
					path:"/pages/orderDetails/index",
					query:{
						orderId:this.orderRow.id,
						singlePromotionType:this.orderRow.singlePromotionType || ""
					}
				})
			},
			goToOrderShop(){	//去往店铺详情
				this.$Router.push({
					path:"/pages/shop/index",
					query:{
						storeId:this.orderRow.storeId
					}
				})
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		components:{
			orderStatus,
			orderGroupBtn
		}
	}
</script>

<style>
	.everyOrder{
		width: 100%;
		height: auto;
		background: #fff;
		border-bottom: 1px solid #E6E6E6;
	}
	.storeName{
		display: flex;
		width: 100%;
		height: 88rpx;
		align-items: center;
		padding: 0 26rpx;
	}
	.storeName image{
		width: 32rpx;
		height: 30rpx;
		margin-right: 12rpx;
		vertical-align: middle;
	}
	.everyStore{
		padding-right: 30rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 100%;
		margin-right: 4rpx;
		background-size: 12rpx 24rpx;
	}
	.orderStatus{
		margin-left: auto;
		color: #FF1558;
		display: inline-block;
	}
	.orderDetails{
		padding: 0 26rpx;
		display: flex;
		width: 100%;
		padding: 10rpx 24rpx;
		height: auto;
	}
	.orderDetails image{
		width: 220rpx;
		height: 220rpx;
	}
	.goodsDetails{
		width: calc(100% - 220rpx);
		height: auto;
		padding-left: 24rpx;
		position: relative;
	}
	.goodsName{
		color: #333;
		font-size: 28rpx;
	}
	.goodsSpce{
		margin-top: 12rpx;
		color: #999;
	}
	.goodsprice{
		position: absolute;
		bottom: 20rpx;
		display: flex;
		align-items: center;
		width: 100%;
		padding-right: 24rpx;
		justify-content: space-between;
	}
	.goodsprice .price{
		color: #FF1558;
		font-size: 32rpx;
	}
	.goodsprice .price text{
		font-size: 28rpx;
	}
	.goodsprice .goodsNum{
		color: #999;
	}
	.statistics{
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: right;
		padding-right: 18rpx;
		font-size: 24rpx;
		color: #333;
	}
	.statistics text{
		font-size: 32rpx;
		margin-right: 6rpx;
	}
	.deliveryTime{
		width: calc(100% - 40rpx);
		height: 58rpx;
		background-color: #FEE5EB;
		margin: 5rpx auto;
		border-radius: 20rpx;
		color: #FE325C;
		font-size: 24rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.deliveryTime image{
		width: 20rpx;
		height: 20rpx;
		margin-right: 12rpx;
	}
</style>
