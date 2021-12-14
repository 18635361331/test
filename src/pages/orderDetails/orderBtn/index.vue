<template>
	<view class="page orderBtnBox">
		<view v-if="orderInfo.orderState==0||orderInfo.orderState==10||orderInfo.orderState==20||orderInfo.orderState==15||orderInfo.orderState==30||orderInfo.orderState==40||orderInfo.orderState==50||orderInfo.orderState==60||orderInfo.orderState==70||orderInfo.commentFlag==1">
			<text class='active orderBtn' v-if="orderInfo.orderState==10" @click="goToPay">去付款</text>
			<text class='orderBtn' v-if="orderInfo.orderState==10" @click="openCancenPopup">取消订单</text>
			<text class='active orderBtn' v-if="orderInfo.orderType == 1 && orderInfo.tuanStatus !=0 && orderInfo.tuanStatus != 4" @click="toPay(orderInfo.orderPayDTO.id, orderInfo.orderType == 1,orderInfo.tuanId)">拼团详情</text>
			<text class='active orderBtn' v-if="orderInfo.orderType == 2 && orderInfo.tuanStatus !=0 && orderInfo.tuanStatus != 4" @click="toPay(orderInfo.orderPayDTO.id, orderInfo.orderType == 1,orderInfo.tuanId)">拼团详情</text>
			<text class='active orderBtn' v-if="((orderInfo.orderState== 15||orderInfo.orderState==20)&&orderInfo.orderType!=11&&orderInfo.orderType!=12&&orderInfo.refundState==0 && !orderInfo.freeOrder && singlePromotionType<50 && (orderInfo.tuanStatus == 2 || !orderInfo.tuanStatus))" @click="applySerive">申请售后</text>
			<text class='active orderBtn' v-if="orderInfo.orderState==30" @click="openConfirmReceipt">确认收货</text>
			<text class='orderBtn' v-if="orderInfo.orderState==30 && orderInfo.extendShip==0" @click="openExtendPopupBtn">延长收货</text>
			<text class='active orderBtn' v-if="orderInfo.orderState>=40 && orderInfo.orderState < 60 && !orderInfo.commentFlag && orderInfo.refundState==0" @click="$Router.push({path:'/pages/publishEvaluate/index',query:{orderId:orderInfo.id}})">评价有礼</text>
			<text class='active orderBtn' v-if="orderInfo.commentFlag == 1" @click="$Router.push({path:'/pages/publishEvaluate/index',query:{orderId:orderInfo.id,status:1}})">追评有礼</text>
			<text class='orderBtn' v-if="orderInfo.orderState==0||orderInfo.orderState==50||orderInfo.orderState==60" @click="openDeletePopup">删除订单</text>
		</view>
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
		<uni-popup ref="confirmReceiptPopup" type="center">
		    <defaultPopup @cancel='cancelConfirmReceiptPopupBtn' @sure='confirmReceipt'>
				<view class="hint">
					确定收到商品？
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
		<uni-popup ref="applyPopup" type="center">
		    <defaultPopup @cancel='closeApplyPopup' @sure='closeApplyPopup'>
				<view class="applyHint">
					礼品订单问题请联系客服处理客服电话：<view class="makePhoneCall" @click="makePhoneCall">4001008246</view>
				</view>
			</defaultPopup>
		</uni-popup>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js';
	import defaultPopup from '@/components/defaultPopup/index.vue'
	export default{
		props:['orderInfo'],
		data(){
			return{
				singlePromotionType:""
			}
		},
		components:{
			defaultPopup
		},
		mounted() {
			this.singlePromotionType = this.$Route.query.singlePromotionType
		},
		methods:{
			cancel(){
				this.$refs.popup.close();	//点击取消关闭弹窗 
			},
			openDeletePopup(){
				this.$refs.popup.open()
			},
			extendShip(){	//延长收货
				tradeApi.extendShip(this.orderInfo.id).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"收货时间延长成功",
							icon:"none"
						})
						this.cancelextendPopupBtn()
						this.$emit("queryOrderDetail")
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			deleteOrder(){	//删除订单
				this.$refs.popup.close()
				tradeApi.deleteOrder(this.orderInfo.id).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"订单删除成功",
							icon:"none"
						})
						this.goBack(1)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			cancelOrder(){	//取消订单
				tradeApi.cancelOrder(this.orderInfo.orderPayDTO.id).then(res=>{
					if(res.data.code==200){
						this.cancelOrderBtn()
						this.$emit("queryOrderDetail")
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			confirmReceipt(){	//确认收货
				tradeApi.confirmReceipt(this.orderInfo.id).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"确认收货成功",
							icon:"none"
						})
						this.cancelConfirmReceiptPopupBtn();
						this.$emit("queryOrderDetail")
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToPay(){	//去支付
				this.$Router.push({
					path:"/pages/pay/index",
					query:{
						payId:this.orderInfo.orderPayDTO.id
					}
				})
			},
			applySerive(){	//申请售后
				if(this.orderInfo.orderType==6){
					this.openApplyPopup()
					return
				}
				if(this.orderInfo.refundPeriod){
					uni.showToast({
						title:"预售订单仅可在付款后"+this.orderInfo.refundPeriod+"天内发起售后",
						icon:"none"
					})
					return
				}
				this.$Router.push({path:'/pages/applyAfterSale/index',query:{orderId:this.orderInfo.id,orderDetailIds:-1}})
			},
			makePhoneCall(){	//拨打电话
				uni.makePhoneCall({
				    phoneNumber: '4001008246' //仅为示例
				});

			},
			closeApplyPopup(){	//申请售后
				this.$refs.applyPopup.close();
			},
			openApplyPopup(){
				this.$refs.applyPopup.open();
			},
			cancelOrderBtn(){	//取消订单 点击取消
				this.$refs.cancelPopup.close();
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
		}
	}
</script>

<style scoped>
	.orderBtnBox{
		padding-bottom: 80rpx;
		display: flex;
		justify-content: flex-end;
		padding-right: 24rpx;
	}
	.orderBtn{
		width: 136rpx;
		height: 56rpx;
		display: inline-block;
		line-height: 56rpx;
		text-align: center;
		font-size: 26rpx;
		margin-top: 18rpx;
		margin-left: 24rpx;
		color: #999999;
		border: 1rpx solid #999999;
		border-radius: 100rpx;
	}
	.active{
		background-color: #FF1558;
		color: #FFFFFF;
		border: none;
	}
	.hint{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333333;
	}
	.applyHint{
		width: 100%;
		height: 100%;
		padding: 40rpx;
		padding-top: 100rpx;
	}
	.applyHint .makePhoneCall{
		color: #FF1558;
		display: inline-block;
	}
</style>
