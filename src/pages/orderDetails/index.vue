<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="orderStatus">
			{{orderInfo.orderStateName?orderInfo.orderStateName:""}}
			<text v-if="orderInfo.orderState==30">距离收货时间{{countDown.day}}天{{countDown.hour}}小时 </text>
		</view>
		<view class="logistics" v-if="(orderInfo.orderState==30||orderInfo.orderState==40) && expressageInfo.length" @click="goToLogisticsDetails">
			<view class="logisticsBox">
				<view class="logisticsTitle" v-if="expressageInfo.length>1">商家使用了多个包裹发货，以下是包裹1</view>
				<view class="logisticsIcon">
					{{expressageInfo[0].dataList[0]}}
				</view>
			</view>
			<view class="arrowIcon"></view>
		</view>
		<view class="orderAddress" v-if="orderInfo.orderAddressDTO">
			<view class="userInfoTitle">
				<text>{{orderInfo.orderAddressDTO.name}}</text>
				<text>{{orderInfo.orderAddressDTO.telephone}}</text>
			</view>
			<view class="userInfoAddress">
				{{orderInfo.orderAddressDTO.detailAddress}}
			</view>
		</view>
		<view class="shopTitle" :key='orderInfo.storeId' @click="$Router.push({path:'/pages/shop/index',query:{storeId:orderInfo.storeId}})">
			{{orderInfo.storeName}}
		</view>
		<view class="goodsInfoBox" v-if="orderInfo.orderGoodsDTOS" v-for="item,index in orderInfo.orderGoodsDTOS" :key='item.itemId'>
			<view class="goodsInfo" @click="goToGoods(item)">
				<image class="goodsImage" :src="imgBaseUrls+item.goodsImage" mode=""></image>
				<view class="goodInfoMsg">
					<view class="goodsTitle ellipsis-two">
						{{item.name}}
					</view>
					<view class="goodsSpce ellipsis-one">
						{{item.fieldValue}}
					</view>
					<view class="goodsPrice">
						<view class="goodsPriceText">
							<text>￥</text>
							{{item.goodsPrice}}
						</view>
						<text class="goodsNum">x{{item.goodsNum}}</text>
					</view>
				</view>
			</view>
			<view class="deliveryTime" v-if="item.presaleFlag">
				<image :src="imgBaseUrls+'appletsImages/openBookingIcon.png'" mode=""></image>
				发货时间：{{$utils.formatDate(item.itemPresaleInfo.deliveryStartTime,"yyyy年MM月dd日hh:mm")}} ~ {{$utils.formatDate(item.itemPresaleInfo.deliveryEndTime,"yyyy年MM月dd日hh:mm")}}
			</view>
			<goodsBtn :goodsInfo='item' :orderInfo='orderInfo'></goodsBtn>
		</view>
		<view class="orderSubInfo">
			<view class="everyRow">
				<text>商品总价：</text>
				<text>{{orderInfo.goodsTotal}}</text>
			</view>
			<view class="everyRow" v-if="orderInfo.taxAmount>0">
				<text>税费：</text>
				<text>{{orderInfo.taxAmount}}</text>
			</view>
			<view class="everyRow">
				<text>店铺优惠：</text>
				<text>-￥{{orderInfo.storeDiscount}}</text>
			</view>
			<view class="everyRow">
				<text>平台优惠：</text>
				<text>-￥{{orderInfo.platformDiscount}}</text>
			</view>
			<view class="everyRow">
				<text>库豆抵扣：</text>
				<text>-￥{{orderInfo.goldDiscount}}</text>
			</view>
			<view class="everyRow" v-if="orderInfo.orderPayDTO">
				<text>积分抵扣：</text>
				<text>-￥{{orderInfo.orderPayDTO.scorePrice?orderInfo.orderPayDTO.scorePrice:0}}</text>
			</view>
			<view class="everyRow">
				<text>运费：</text>
				<text>{{orderInfo.actualFreight?orderInfo.actualFreight:0}}</text>
			</view>
		</view>
		<view class="payPrice">
			<text>实付款：</text>
			<view class="orderPayPrice">
				<text class="payPriceText">￥</text>
				<text>{{orderInfo.payPrice}}</text>
			</view>
		</view>
		<view class="payDetails" v-if="orderInfo.orderPayDTO">
			<view class="payDetailsTitle">
				支付详情：
			</view>
			<view class="everyRow">
				<text>余额支付：</text>
				<text>-￥{{orderInfo.orderPayDTO.balance?orderInfo.orderPayDTO.balance:0}}</text>
			</view>
			<view class="everyRow">
				<text>礼卡支付：</text>
				<text>-￥{{orderInfo.orderPayDTO.cardPrice?orderInfo.orderPayDTO.cardPrice:0}}</text>
			</view>
		</view>
		<view class="orderDetailsInfo">
			<view class="orderRowBox">
				<text>订单编号：</text>
				<text>{{orderInfo.id}}</text>
			</view>
			<view class="orderRowBox" v-if="orderInfo.orderTime">
				<text>下单时间：</text>
				<text >{{$utils.formatDate(orderInfo.orderTime,"yyyy-MM-dd hh:mm:ss")}}</text>
			</view>
			<view class="orderRowBox" v-if="orderInfo.orderPayDTO&&orderInfo.orderPayDTO.payTime">
				<text>付款时间：</text>
				<text>{{$utils.formatDate(orderInfo.orderPayDTO.payTime,"yyyy-MM-dd hh:mm:ss")}}</text>
			</view>
			<view class="orderRowBox" v-if="orderInfo.shipmentTime">
				<text>发货时间：</text>
				<text>{{$utils.formatDate(orderInfo.shipmentTime,"yyyy-MM-dd hh:mm:ss")}}</text>
			</view>
		</view>
		<view class='performance' v-if="orderInfo.performanceAmount">
			<text>本单商品计有效业绩</text>
			<text>￥{{orderInfo.performanceAmount}}</text>
		</view>
		<orderBtn :orderInfo='orderInfo' @queryOrderDetail='queryOrderDetail'></orderBtn>
	</view>
</template>

<script>
	import orderBtn from './orderBtn/index.vue';
	import goodsBtn from './goodsBtn/index.vue';
	import tradeApi from '@/api/trade/index.js';
	import orderType from '@/common/js/order.js';
	import transportApi from '@/api/transport/index.js'
	
	export default {
		data() {
			return {
				orderInfo: {

				},
				imgBaseUrls: "",
				countDown:{
					day:"0",
					hour:"0",
				},
				expressageInfo:[],
				defaultTitleDto:{
					title:'订单详情',
				}
			}
		},
		methods: {
			queryOrderDetail() {
				tradeApi.queryOrderDetail(this.$Route.query.orderId).then(res => {
					if (res.data.code == 200) {
						res.data.data.orderStateName = orderType.getSellerState(res.data.data.orderState)
						this.orderInfo = res.data.data;
						if(this.orderInfo.orderState == 30){	//距离收货时间
							this.interTime()
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getExpressageInfo(){	//获取物流信息
				transportApi.getExpressageInfo(this.$Route.query.orderId).then(res=>{
					if(res.data.code==200){
						this.expressageInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			interTime(){	//距离收货时间
				let receiveTime = 7;
				if(this.orderInfo.extendShip == 1){
					receiveTime = 10;
				}
				let deliveryTime = (this.orderInfo.shipmentTime+receiveTime*24*60*60*1000) - new Date().getTime();
				if(deliveryTime>0){
					this.countDown.day = parseInt(deliveryTime/1000/60/60/24)
					this.countDown.hour = parseInt(deliveryTime/1000/60/60%24)
				}
			},
			goToLogisticsDetails(){
				uni.setStorageSync("logisticsInfo",JSON.stringify(this.orderInfo))
				this.$Router.push({path:'/pages/logisticsDetails/index',query:{orderId:this.$Route.query.orderId}});
			},
			goToGoods(params){
				this.$Router.push({path:'/pages/goodsDetails/index',query:{goodsId:params.itemId}})
			}
			
		},
		onShow() {
			this.zhuge.track("订单详情")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			if(this.$Route.query.orderId){
				this.getExpressageInfo()
			}
			this.queryOrderDetail()
		},
		components:{
			orderBtn,
			goodsBtn,
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}

	.orderStatus {
		width: 100%;
		height: 138rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/gr2@2x.png) no-repeat 50%;
		background-size: 100% 139rpx;
		padding-top: 30rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30rpx;
	}

	.orderAddress {
		width: 100%;
		padding: 18rpx 24rpx 18rpx 0rpx;
		margin-left: 24rpx;
		border-bottom: 1rpx solid #E4E4E4;
	}

	.userInfoTitle {
		width: 100%;
		line-height: 40rpx;
		color: #333333;
	}

	.userInfoTitle text {
		margin-right: 10rpx;
		font-size: 30rpx;
	}

	.userInfoAddress {
		width: 100%;
		min-height: 36rpx;
		line-height: 36rpx;
		padding-left: 50rpx;
		font-size: 26rpx;
		color: #999999;
		margin-top: 8rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/adress@2x.png) no-repeat;
		background-size: 25rpx 30rpx;
		background-position-y: 6rpx;
	}

	.shopTitle {
		width: 100%;
		height: 88rpx;
		line-height: 75rpx;
		font-size: 26rpx;
		color: #666666;
		padding: 15rpx 24rpx 0 25rpx;
	}
	.goodsInfoBox{
		border-bottom: 1rpx solid #E4E4E4;
	}
	
	.goodsInfo {
		padding: 10rpx 24rpx;
		display: flex;
		padding-bottom: 20rpx;
	}

	.goodsImage {
		width: 220rpx;
		height: 220rpx;
	}

	.goodInfoMsg {
		padding: 20rpx 0;
		margin-left: 24rpx;
		flex: 1;
	}

	.goodsTitle {
		width: 100%;
		max-height: 80rpx;
		color: #333333;
	}

	.goodsSpce {
		width: 80%;
		height: 28rpx;
		line-height: 28rpx;
		margin-top: 12rpx;
		color: #999999;
		font-size: 24rpx;
	}

	.goodsPrice {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
	}

	.goodsPriceText {
		color: #FF1558;
		font-size: 44rpx;
	}

	.goodsPriceText text {
		font-size: 28rpx;
	}

	.goodsNum {
		font-size: 30rpx;
		color: #999999;
	}

	.orderSubInfo {
		margin-left: 24rpx;
		padding: 20rpx 10rpx;
	}

	.everyRow {
		padding-right: 24rpx;
		width: 100%;
		height: 44rpx;
		line-height: 44rpx;
		font-size: 24rpx;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.payPrice {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24rpx;
		color: #333;
		border-top: 1rpx solid #E4E4E4;
		border-bottom: 1rpx solid #E4E4E4;
	}
	.orderPayPrice{
		font-size: 32rpx;
	}
	.orderPayPrice text {
		color: #FF1558;
	}

	.payPriceText {
		font-size: 22rpx;
	}

	.payDetails {
		padding: 10rpx 0 20rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		margin-left: 24rpx;
	}

	.payDetailsTitle {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		color: #333333;
		margin-bottom: 10rpx;
	}
	.orderDetailsInfo{
		width: 100%;
		margin-top: 10rpx;
		margin-left: 24rpx;
		padding: 20rpx 0;
		border-top: 1rpx solid #E4E4E4;
		border-bottom: 1rpx solid #E4E4E4;
	}
	.orderRowBox{
		width: 100%;
		height: 44rpx;
		line-height: 44rpx;
		font-size: 24rpx;
		color: #999999;
		padding-right: 24rpx;
	}
	.orderStatus text{
		margin-left: 10rpx;
	}
	.logistics{
		display: flex;
		margin-left: 24rpx;
		padding: 18rpx 24rpx 18rpx 0;
	}
	.logisticsBox{
		flex: 1;
	}
	.arrowIcon{
		width: 48rpx;
		margin-right: 10rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
	}
	.logisticsTitle{
		font-size: 30rpx;
		line-height: 40rpx;
		color: #333333;
	}
	.logisticsIcon{
		color: #999999;
		font-size: 26rpx;
		margin-top: 8rpx;
		width: 100%;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/che.png) no-repeat;
		background-position-y:6rpx;
		background-size: 30rpx;
		padding-left: 40rpx;
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
	}
	.deliveryTime image{
		width: 20rpx;
		height: 20rpx;
		margin-right: 12rpx;
	}
	.performance{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: 400;
		color: #663F0A;
		margin: 20rpx;
		padding-bottom: 20rpx;
		line-height: 1.4;
		border-bottom: 1px solid #E4E4E4;
	}
</style>
