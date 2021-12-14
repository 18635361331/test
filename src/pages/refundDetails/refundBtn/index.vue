<template>
	<view class="page">
		<view class="refundBtn" v-if="(refundInfo.refundState==1 || refundInfo.refundState==2||refundInfo.refundState==3||refundInfo.refundState==8 ||refundInfo.refundState==7)&& refundInfo.refundIntervening != 1">
			<text class="active" v-if="refundInfo.refundState==3 && refundInfo.refundIntervening == 0" @click="submitLogisticsInfo()">提交快递</text>
			<text v-if="(refundInfo.refundState==8||refundInfo.refundState==3||refundInfo.refundState==7) && refundInfo.refundIntervening == 0" @click="openCancelPopup">取消申请</text>
			<text class="active" v-if="(refundInfo.refundState==8 ||refundInfo.refundState==7)&& refundInfo.refundIntervening != 1" @click="goToApplyAfterSale">重新申请</text>
			<text class="active" v-if="(refundInfo.refundState==8 || refundInfo.refundState==7)&& refundInfo.showAppealBtn == 1 && refundInfo.refundIntervening == 0" @click="platformInvolve()">申诉</text>
			<text class="active" v-if="(refundInfo.refundState==1 || refundInfo.refundState==2) && refundInfo.refundIntervening == 0" @click="openCancelPopup()">取消申请</text>
			<text v-if="(refundInfo.refundState==1 || refundInfo.refundState==2) && refundInfo.refundIntervening == 0" @click="goToApplyAfterSale">修改申请</text>
		</view>
		<uni-popup ref="cancelPopup" type="center">
		    <defaultPopup @cancel='cancelOrderBtn' @sure='cancelTrade'>
				<view class="hint">
					确定取消该订单吗？
				</view>
			</defaultPopup>
		</uni-popup>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js'
	import defaultPopup from '@/components/defaultPopup/index.vue'
	export default{
		props:["refundInfo","submitInfo"],
		data(){
			return{
				
			}
		},
		methods:{
			openCancelPopup(){	//打开取消售后弹窗
				this.$refs.cancelPopup.open()
			},
			cancelOrderBtn(){	//关闭取消售后弹窗
				this.$refs.cancelPopup.close()
			},
			cancelTrade(){	//取消售后
				tradeApi.cancelTrade(this.$Route.query.returnOrderId).then(res=>{
					if(res.data.code==200){
						this.cancelOrderBtn()
						this.goBack(1);
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToApplyAfterSale(){	//重新申请
				this.$Router.push({
					path:"/pages/applyAfterSale/index",
					query:{
						orderId:this.refundInfo.id,
						status:1,
						orderDetailIds:this.refundInfo.orderState==20?-1:0
					}
				})
			},
			platformInvolve(){	//申诉
				tradeApi.platformInvolve(this.refundInfo.id).then(res=>{
					if(res.data.code==200){
						this.$emit("refundDetail")
					}else{
						uni.showToast({
							title:res.data.message,
							icon:none
						})
					}
				})
			},
			submitLogisticsInfo(){	//提交快递
				if(!this.submitInfo.logisticsCompanyId){
					uni.showToast({
						title:"请选择物流公司",
						icon:"none"
					})
					return
				}
				if(!this.submitInfo.logisticsNo){
					uni.showToast({
						title:"请输入运单编号",
						icon:"none"
					})
					return
				}
				tradeApi.submitLogisticsInfo(this.submitInfo).then(res=>{
					if(res.data.code==200){
						this.$emit("refundDetail")
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		components:{
			defaultPopup
		}
	}
</script>

<style scoped>
	.refundBtn{
		width: 100%;
		height: 98rpx;
		text-align: right;
		padding-right: 24rpx;
	}
	.refundBtn text{
		width: 150rpx;
		height: 52rpx;
		line-height: 52rpx;
		text-align: center;
		margin-top: 18rpx;
		margin-left: 16rpx;
		border: 1rpx solid #999;
		color: #666666;
		border-radius: 10rpx;
		display: inline-block;
	}
	.refundBtn text.active{
		color: #FF1558;
		border-color: #FF1558;
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
