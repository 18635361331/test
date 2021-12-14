<template>
	<view class="pages" :class="orderInfoParams.orderState==20?'max':''">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<!-- 状态 -->
		<view class="statusPart">
			<view >
				<view class="icon" :class="'icon'+orderInfoParams.orderState"></view>
				<text>
					<block v-if="orderInfoParams.orderState==10">
						卖家确认中，耐心等待
					</block>	
					<block v-else-if="orderInfoParams.orderState==20">
						等待买家付款
					</block>
					<block v-else-if="orderInfoParams.orderState==30">
						生产中，等待发货
					</block>
					<block v-else-if="orderInfoParams.orderState==40">
						卖家已发货
					</block>
					<block v-else-if="orderInfoParams.orderState==50">
						买家已收货
					</block>
					<block v-else-if="orderInfoParams.orderState==60">
						订单已完成
					</block>
					<block v-else-if="orderInfoParams.orderState==0">
						订单已取消
					</block>	
				</text>
			</view>
		</view>
		<!-- 选择收货地址 -->
		<view class="address" v-if="orderInfoParams">
			<view class="local"></view>
			<view class="info">
				<view class="top">
					<text class="name">{{orderInfoParams.address.name}}</text>
					<text class="tel">{{orderInfoParams.address.telephone}}</text>
				</view>
				<view class="detail">
					{{orderInfoParams.address.provinceName}}
					{{orderInfoParams.address.cityName}}
					{{orderInfoParams.address.countyName?orderInfoParams.address.countyName:""}}
					{{orderInfoParams.address.townName?orderInfoParams.address.townName:""}}
					{{orderInfoParams.address.address}}
				</view>
			</view>
		</view>
		
		<orderInfo v-if="orderInfoParams && orderInfoParams.stores" :type="2" :orderParent="orderInfoParams" :orderInfo='item' v-for="item,index in orderInfoParams.stores" :key='index'>
		</orderInfo>
		<view class='performance' v-if="orderInfoParams.performanceAmount">
			<text>本单商品计有效业绩</text>
			<text>￥{{orderInfoParams.performanceAmount}}</text>
		</view>
		
		<view class="part" v-if="orderInfoParams">
			<view class="title">订单信息</view>
			<view class="part_info">
				<text>订单编号：</text>
				<text>{{orderInfoParams.id}}</text>
			</view>
			<view class="part_info">
				<text>下单时间：</text>
				<text>{{$utils.formatDate(orderInfoParams.orderTime?orderInfoParams.orderTime:1970,"yyyy-MM-dd hh:mm:ss")}} </text>
			</view>
		</view>
		<view class="part" v-if="orderInfoParams.orderState>20">
			<view class="title">发票信息</view>
			<view class="part_info">
				<text>发票类型：</text>
				<text>普通发票</text>
			</view>
		</view>
		<view class="part invioce" v-if="orderInfoParams.orderState==20">
			<view class="title">
				<view class="attribute">是否开具发票</view>
				<view class="select" @click="hasInvioce=false">
					<view class="radio" :class="!hasInvioce?'active':''"></view>
					不开具发票
				</view>
				<view class="select" @click="hasInvioce=true">
					<view class="radio" :class="hasInvioce?'active':''"></view>
					开具发票
				</view>
			</view>
			<!--  -->
			<view class="type" v-if="hasInvioce">
				<view class="attribute">发票类型</view>
				<view class="select" @click="invioceType=0">
					<view class="radio" :class="invioceType==0?'active':''"></view>
					普通发票
				</view>
				<view class="select" @click="invioceType=1">
					<view class="radio" :class="invioceType==1?'active':''"></view>
					专用发票
				</view>
			</view>
			
		</view>
	
		<view class="fixedBottom bottomGroup" v-if="orderInfoParams.orderState==20">
			<view class="infos">
				<text>应付:</text>
				<text class="tag">¥</text>
				<text class="money">{{orderInfoParams.payPrice?orderInfoParams.payPrice:0}}</text>
			</view>
			
			<view class="submit" @click="submitCusOrder">去付款</view>
		</view>
		
	</view>
</template>

<script>
	import orderInfo from '@/pages/customizationOrder/orderInfo.vue'
	import tradeApi from '@/api/trade/index.js'
	export default {
		data() {
			return {
				defaultTitleDto:{
					title:'订单详情'
				},
				orderInfoParams:"",
				hasInvioce: true,// 是否开发票
				invioceType:1,// 0 普通 1 专用
			}
		},
		onLoad() {
			
		},
		methods: {
			submitCusOrder(){
				if(this.orderInfoParams.payType==2){
					this.$Router.replace({
						path:"/pages/customizationOrder/paySuccess",
						query:{
							payType:2,
							type:1,
							orderId:this.$Route.query.id,
							qiyuKefuGroupId:this.$Route.query.qiyuKefuGroupId
						}
					})
				}else{
					this.$Router.replace({
						path:"/pages/customizationOrder/cashier",
						query:{
							orderId:this.$Route.query.id,
							invoiceType:this.hasInvioce?this.invioceType:"",
							qiyuKefuGroupId:this.$Route.query.qiyuKefuGroupId
						}
					})
				}
				
			},
			getOrderInfo(){
				tradeApi.getOrderInfo(this.$Route.query.id).then(res=>{
					if(res.data.code==200){
						res.data.data.customizeDetail = res.data.data.customizeDetail?res.data.data.customizeDetail.split(','):""
						res.data.data.stores.map = res.data.data.stores.map(v=>{
								v.goodsList.map =v.goodsList.map(t=>{
									t.deliveryDaysMap=t.deliveryDays?this.$utils.getDHours(t.deliveryDays):''
									return t
								})
							return v
						})
						
						this.orderInfoParams = res.data.data;
						if(res.data.data.invoice){
							// 开发票  0 普通  1 专用
							this.hasInvioce = true;
							this.invioceType = res.data.data.invoice.invoiceType
						}else{
							// 不开发票
							this.hasInvioce = false;
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
			
		},
		onShow() {
			this.getOrderInfo();
		},
		components:{
			orderInfo
		}
	}
</script>


<style lang="scss" scoped>
	@import './index.scss';
	.pages{
		background: #F8F2FF;
		padding-bottom: 80rpx;
		/* #ifdef MP-WEIXIN */
		padding-top: 1px;
		/* #endif*/
		&.max{
			padding-bottom: 180rpx;
		}
	}
	.part,.statusPart>view{
		width: calc(100% - 48rpx);
		margin: 20rpx auto;
		background-color: #fff;
		border-radius: 24rpx;
	}
	.statusPart{
		background-size: 100% 100%;
		background-image: url($img-oss+'customization_status_bg.png');
		height: 140rpx;
		padding: 20rpx 0;
		&>view{
			height: 100rpx;
			@extend .flexCenter;
			padding: 0 20rpx;
			margin-top: 0;
		}
		.icon{
			min-width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			background-size: 100% 100%;
			background-image: url($img-oss+'customization_status1.png');
			
			&.icon20{
				background-image: url($img-oss+'customization_status2.png');
			}
			&.icon30{
				background-image: url($img-oss+'customization_status3.png');
			}
			&.icon40{
				background-image: url($img-oss+'customization_status4.png');
			}
			&.icon50{
				background-image: url($img-oss+'customization_status5.png');
			}
		}
		text{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #1F0D33;
		}
	}
	.part{
		padding: 24rpx 24rpx 36rpx;
		
		font-family: PingFang SC;
		.title{
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
		}
		.part_info{
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;
			margin-top: 24rpx;
			text:frist-child{
				color: #9B9B9B;
				margin-right: 18rpx;
			}
		}
	}
	.invioce{
		&>view{
			width: 100%;
			@extend .flexCenter;
			&>view{
				width: 30%;
				&:nth-child(2){
					margin-left: 8%;
					margin-right: 2%;
				}
			}
		}
		
		.select{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			@extend .flexCenter;
			.radio{
				width: 26rpx;
				height: 26rpx;
				border: 1px solid #1F0D33;
				border-radius: 50%;
				margin-right: 10rpx;
				
				&.active{
					border:none;
					background-image: url($img-oss+'customization_select.png');
					background-size: 100% 100%;
				}
				&.disabled{
					background: #D9D9D9;
					border-color: #D9D9D9;
				}
			}
		}
		.type{
			height: 66rpx;
			background: #F2E6FF;
			border-radius: 8rpx;
			margin-top: 30rpx;
			
			.attribute{
				padding-left: 20rpx;
			}
		}
	}

	.fixedBottom{
		font-family: PingFang SC;
		
		@extend .flexCenter;
		.infos{
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			margin-right: auto;
			margin-left: 24rpx;
		}
		.tag{
			margin-left:16rpx;
		}
		.tag,.money{
			font-weight: bold;
			color: #FF1558;
			font-size: 32rpx;
		}
		
		.submit{
			width: 160rpx;
			margin-right: 10rpx;
			border-radius: 12rpx;
			&.disabled{
				opacity: 0.4;
			}
		}
		
	}
	.performance{
		width:calc(100% - 24px);
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: 400;
		color: #663F0A;
		background-color: #fff;
		margin: -48rpx auto 0;
		border-radius: 12rpx;
		padding: 24rpx;
	}
	
</style>
