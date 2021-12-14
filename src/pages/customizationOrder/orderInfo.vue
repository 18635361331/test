<template>
	<view class="list" :class="type==2?'detail':''">
		<view>
			<view class="top" @click.stop="goToStore(orderInfo.storeId?orderInfo.storeId:orderInfo.storeInfo.storeId)">
				<view class="icno"></view>
				<text class="name">{{orderInfo.storeName?orderInfo.storeName:orderInfo.storeInfo.storeName}}</text>
				<text class="status" v-if="type==1">{{getOrderStatus(orderInfo.orderState)}}</text>
			</view>
			<view v-if="orderInfo.goodsList" v-for="list,i in orderInfo.goodsList" :key='i'>
				<view class="center" @click.stop="goToGoods(list.itemId)">
					<view class="img" :style="{backgroundImage:'url('+ imgBaseUrls+list.goodsImg +')'}"></view>
					<view class="right">
						<text class="title">{{list.goodsName}}</text>
						<view>
							<view class="price"><text class="tag">¥</text>{{list.goodsPrice}}</view>
							<view class="num">x {{list.goodsNum}}</view>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="title">
						<text>定制内容</text>
						<text class="count" v-if="type&&(orderInfo.orderState<60||orderParent.orderState<60)&&list.deliveryDaysMap.toString()">
							<block v-if="list.deliveryDaysMap>0">
								交期倒计时：<text class="red">{{list.deliveryDaysMap}} </text>天
							</block>
							<block v-else-if="list.deliveryDaysMap<=0">已到交期时间</block>
						</text>
					</view>
					<view class="contentBox">
						<view class="part" v-for="k,j in list.attrValueList" :key='j'>
							<view class="name">
								{{k.attrName}}：
							</view>
							<text class="val">{{k.attrValue}}</text> ；
						</view>
					</view>
				</view>
			</view>
			<view class="remarks" v-if='!type' >
				<text>备注:</text>
				<input type="text" v-model="orderInfo.remarks"  placeholder="如有特殊需求请补充填写备注说明" placeholder-class="placeholders"/>
			</view>
			<view class="money" v-if="orderInfo.goodsList">
				<view>
					<text>共{{orderInfo.goodsList.length}}个品种</text>
					<text>{{orderInfo.goodsNumTotal}}件商品</text>
					<view class="amount">预估: <text>¥{{orderInfo.payPrice}}</text></view>
				</view>
				<view class="freight" v-if="orderInfo.freightAmount">(含运费¥{{orderInfo.freightAmount}})</view>
			</view>
			
		</view>
		<!-- 详情页金额 -->
		<view class="total" v-if="type=='2'">
			<view class="line">
				<text>商品总金额</text>
				<text>¥{{orderParent.goodsTotal?orderParent.goodsTotal:0}}</text>
			</view>
			<view class="line">
				<text>运费</text>
				<text>+¥{{orderParent.freightAmount?orderParent.freightAmount:0}}</text>
			</view>
			
			<view class="detail">
				<text>优惠金额</text>
				<text>-¥{{orderParent.discountTotal?orderParent.discountTotal:0}}</text>
			</view>
			<view class="detail">
				<text>定制附加费用</text>
				<text>¥{{orderParent.customizeTotal?orderParent.customizeTotal:0}}</text>
			</view>
			<view class="detail" v-if="userInfo.plusFlag==4">
				<text>合伙人优惠</text>
				<text>¥{{orderParent.platformDiscount?orderParent.platformDiscount:0}}</text>
			</view>
			<view class="additional" v-if="orderParent.customizeDetail">
				<view v-for="item,index in orderParent.customizeDetail" :key='index'>
					<text>{{item}}</text>
				</view>
			</view>
			<view class="line main">
				<text>
					<block v-if="orderParent.orderState==30||orderParent.orderState==40||orderParent.orderState==50">付款金额</block>
					<block v-else>应付款金额</block>
				</text>
				<text>¥{{orderParent.payPrice?orderParent.payPrice:0}}</text>
			</view>
			<slot name="performance"></slot>
		</view>
		<slot name="btns"></slot>
	</view>
	
</template>

<script>
	import orderType from '@/common/js/order.js';
	
	export default {
		props:['type','orderInfo','orderParent'],// type 1 订单列表  2 订单详情页
		data(){
			return{
				imgBaseUrls:"",
				userInfo:"",
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl
			if(uni.getStorageSync("sessionId")){
				try{
					this.userInfo = JSON.parse(uni.getStorageSync("userInfo"))
				}catch(e){
					
				}
			}
		},
		methods:{
			goToStore(storeId){
				this.$Router.push({
					path:"/pages/shop/index",
					query:{
						storeId
					}
				})
			},
			goToGoods(goodsId){	//
				this.$Router.push({
					path:"/pages/goodsCustomized/index",
					query:{
						goodsId
					}
				})
			},
			getOrderStatus(status){
				return orderType.getCustomizationOrderState(status)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		width: calc(100% - 48rpx);
		background: #FFFFFF;
		border-radius: 24rpx;
		margin: 20rpx auto 0;
		padding: 24rpx;
	}
	.top{
		display: flex;
		align-items: center;
		.icno{
			width: 30rpx;
			height: 30rpx;
			background-size: 100% 100%;
			background-image: url($img-oss+'customization_shop.png');
			margin-right: 12rpx;
		}
		.name{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-right: auto;
		}
		.status{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9B3FFF;
		}
	}
	
	// 详情
	.detail{
		.center{
			.right .title{
				color: #6E6E6E;
			}
		}
		.content .part{
			display: block;
			margin-right: 0;
			margin-bottom: 10rpx;
		}
	
		.total{
			margin-top: 36rpx;
			padding-top: 34rpx;
			border-top: 1px solid rgba(0, 0, 0, 0.1);
			.line,.detail{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 24rpx;
				
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #6E6E6E;
				text:last-child{
						color: #333333;
				}
			}
			.main{
				font-size: 28rpx;
				color: #333333;
				text:last-child{
					color: #FF1558;
				}
			}
		}
	}
	.center{
		border-radius: 12rpx;
		margin: 38rpx 0 48rpx;
		display: flex;
		
		.img{
			width: 120rpx;
			height: 120rpx;
			border: 1px solid #f5f5f5;
			background-size: cover;
			border-radius: 8rpx;
			margin-right: 14rpx;
		}
		
		.right{
			width: calc(100% - 134rpx); // 120+14
			height: 120rpx;
			position: relative;
			.title{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 1.4;
				color: #333333;
			}
			&>view{
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.price{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333;
				.tag{
					font-size: 30rpx;
				}
			}
			.num{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
		}
	}

	.content{
		margin-bottom: 16rpx;
		.title{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-bottom: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.count{
				font-size: 26rpx;
			}
			.red{
				color: #FF1558;
				margin-right: 4rpx;
			}
		}
		
		.contentBox{
			background: #F8F2FF;
			border-radius: 16rpx;
			padding: 28rpx 20rpx; 
			margin-top: 20rpx;
		}
		.part{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			display: inline;
			margin-right: 8rpx;
			
			.name,.val{
				display: inline;
				vertical-align: middle;
				word-break: break-all;
			}
			.name{
				color: #7E7E7E;
				&>text{
					display: inline-block;
					vertical-align: middle;
				}
				
			}
			.val{
				color: #323232;
			}
		}
	}
	.money{
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 1.6;
		color: #7E8385;
		text-align: right;
		margin-top: 40rpx;
		&>view{
			margin-bottom: 4rpx;
			&>text,&>view{
				display: inline-block;
				vertical-align: middle;
				margin-left: 16rpx;
			}
			
			.amount{
				color: #333333;
				font-weight: 700;
			}
			
			
		}
	}
	.remarks{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 44rpx;
		input,text{
			display: inline-block;
			vertical-align: middle;
		}
		input{
			margin-left: 18rpx;
			width: 80%;
			font-size: 24rpx;
		}
	}
	.additional{
		width: 100%;
		margin:24rpx auto 30rpx auto;
		padding: 24rpx 20rpx;
		background: #F8F2FF;
		border-radius: 8rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #6E6E6E;
		&>view{
			font-size: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&:not(:last-child){
				margin-bottom: 18rpx;
			}
			text:last-child{
				color: #3E1A66;
			}
		}
		
	}
</style>
