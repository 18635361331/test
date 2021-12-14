<template>
	<view class="page orderType" v-if="(order.orderState != 20 && order.orderState != 15) || order.commentFlag  == 1">
		<text v-if="order.orderState==0||order.orderState==50||order.orderState==60" @click='openDeletePopup' class="delete">删除订单</text>
		<text v-if="order.orderState==10" class="active" @click="goToPay">去付款</text>
		<text v-if="order.orderState==10" @click="openCancenPopup">取消订单</text>
		<text v-if="order.orderState >= 40 && order.orderState < 60 && !order.commentFlag && order.refundState==0" class="active" @click="$Router.push({path:'/pages/publishEvaluate/index',query:{orderId:order.id}})">评价有礼</text>
		<text v-if='order.commentFlag  == 1 ' @click="$Router.push({path:'/pages/publishEvaluate/index',query:{orderId:order.id,status:1}})" class="active">追评有礼</text>
		<text v-if="order.orderState==30" class="active" @click="openConfirmReceipt">确认收货</text>
		<text v-if="order.orderState >= 30 && order.orderState < 60" @click="entryLogistics()">查看物流</text>
		<text v-if="order.orderState==30 && order.extendShip==0" @click="openExtendPopupBtn()">延长收货</text>
		<uni-popup ref="popup" type="center">
		    <defaultPopup @cancel='cancel' @sure='deleteOrder'>
				<view class="hint">
					确定删除订单吗？
				</view>
			</defaultPopup>
		</uni-popup>
		<uni-popup ref="cancelPopup" type="center">
		    <defaultPopup @cancel='cancelOrderBtn' @sure='cancelOrder'>
				<view class="hint">
					确定取消该订单吗？
				</view>
			</defaultPopup>
		</uni-popup>
		<uni-popup ref="extendPopup" type="center">
		    <defaultPopup @cancel='cancelextendPopupBtn' @sure='extendShip'>
				<view class="hint">
					是否确定延长收货？
				</view>
			</defaultPopup>
		</uni-popup>
		<uni-popup ref="confirmReceiptPopup" type="center">
		    <defaultPopup @cancel='cancelConfirmReceiptPopupBtn' @sure='confirmReceipt'>
				<view class="hint">
					确定收到商品？
				</view>
			</defaultPopup>
		</uni-popup>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js';
	import defaultPopup from '@/components/defaultPopup/index.vue'
	export default{
		props:["order","index"],
		data(){
			return{
			}
		},
		methods:{
			deleteOrder(){	//删除订单
				this.$refs.popup.close()
				tradeApi.deleteOrder(this.order.id).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"订单删除成功",
							icon:"none"
						})
						this.$emit("deleteOrder",this.index)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			cancelOrder(){	//取消订单
				tradeApi.cancelOrder(this.order.payId).then(res=>{
					if(res.data.code==200){
						this.$emit("deleteOrder",this.index)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			extendShip(){	//延长收货
				tradeApi.extendShip(this.order.id).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"收货时间延长成功",
							icon:"none"
						})
						this.cancelextendPopupBtn()
						this.$emit("extendShip",this.index)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			confirmReceipt(){	//确认收货
				tradeApi.confirmReceipt(this.order.id).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"确认收货成功",
							icon:"none"
						})
						this.cancelConfirmReceiptPopupBtn();
						this.$emit("confirmReceipt")
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			entryLogistics(){	//查看物流
				uni.setStorageSync("logisticsInfo",JSON.stringify(this.order))
				this.$Router.push({path:'/pages/logisticsDetails/index',query:{orderId:this.order.id}})
			},
			goToPay(){	//去支付
				this.$Router.push({
					path:"/pages/pay/index",
					query:{
						payId:this.order.payId,
						newtype:this.order.singlePromotionType||""
					}
				})
			},
			cancel(){
				this.$refs.popup.close();	//点击取消关闭弹窗 
			},
			cancelOrderBtn(){	//取消订单 点击取消
				this.$refs.cancelPopup.close();
			},
			openDeletePopup(){
				this.$refs.popup.open()
			},
			openCancenPopup(){
				this.$refs.cancelPopup.open()
			},
			cancelextendPopupBtn(){	//取消延长收货
				this.$refs.extendPopup.close()
			},
			openExtendPopupBtn(){	//打开延长收货弹窗
				this.$refs.extendPopup.open()
			},
			openConfirmReceipt(){	//打开确认收货弹窗
				this.$refs.confirmReceiptPopup.open()
			},
			cancelConfirmReceiptPopupBtn(){	//取消确认收货弹窗
				this.$refs.confirmReceiptPopup.close()
			}
		},
		components:{
			defaultPopup
		}
	}
</script>

<style>
	.orderType{
		display: flex;
		height: 98rpx;
		padding-right: 24rpx;
		justify-content: flex-end;
	}
	.orderType text{
		display: inline-block;
		width: 136rpx;
		height: 56rpx;
		text-align: center;
		line-height: 50rpx;
		margin-top: 18rpx;
		margin-left: 24rpx;
		font-size: 26rpx;
		border: 1px solid #666;
		border-radius: 32rpx;
		color: #666;
	}
	.orderType .delete{
		color: #999;
		border: 1px solid #999;
	}
	.orderType .active{
		color: #fff;
		background: #FF1558;
		border: 1px solid #FF1558;
	}
	.hint{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333333;
	}
</style>
