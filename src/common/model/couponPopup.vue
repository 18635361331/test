<template>
	<view class="page">
		<view class="couponBox" v-if="!exchangeFlag">
			<view class="popupTitle">
				{{goodsInfo.storeName}}
			</view>
			<scroll-view class="couponMain" scroll-y="true">
				<view class="couponBoxEvery" v-for="item,index in couponInfo" :key='index'>
					<view class="couponRow">
						<view class="couponPrice">
							<view class="amountPrice"><text>￥</text>{{item.discountValue}}</view>
							<view class="couponSubPrice">满{{item.condValue}}减{{item.discountValue}}</view>
						</view>
						<view class="couponUserInfo">
							<text class="couponType">满减券</text>
							<text class="couponName">{{item.name}}</text>
							<view class="couponTime" v-if="item.validType == 1">
								领取后{{item.validDays}}天内有效
							</view>
							<view class="couponTime" v-else>
								{{$utils.formatDate(item.validStartTime,"yyyy-MM-dd")}} - {{$utils.formatDate(item.validEndTime,"yyyy-MM-dd")}}
							</view>
							<view class="descCoupon" @click="item.flag=!item.flag">
								使用说明
								<!-- <image src="" mode=""></image> -->
							</view>
						</view>
						<!-- 优惠券类型  积分兑换 手动领取 自动领取 -->
						<view class="couponBtn" v-if="item.received!=2 && item.receiveType!=2">
							<text class="receive" v-if="item.received==0" @click="receiveCoupon(item)">领取</text>
							<text class="disabledReceive" v-else>已领取</text>
						</view>
						<view class="couponBtn" v-if="item.received!=2 && item.receiveType==2">
							<view class="integral">
								{{item.needPointNum||0}}积分
							</view>
							<text class="receive" v-if="item.received==0" @click="receiveIntegral(item)">兑换</text>
							<text class="disabledReceive" v-else>已兑换</text>
						</view>
						<view class="couponNum">
							<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_almostexpired_radius_100820@2x.png" mode=""></image>
							已{{item.receiveType==2?'兑':'领'}}{{item.totalBindAmount}}/{{item.confineAmount}}
						</view>
					</view>
					<view class="decBox ellipsis-one" v-if="item.flag">
						{{item.description}}
					</view>
				</view>
			</scroll-view>
			<view class="sureBtn" @click="closeCouponPopup">
				<text>完成</text>
			</view>
		</view>
		
		<view class="couponBox" v-else>
			<view class="popupTitle">
				兑换优惠券
				<view class="gobackBtn" @click="exchangeFlag=!exchangeFlag">
					
				</view>
			</view>
			<view class="couponBoxEvery" >
				<view class="couponRow">
					<view class="couponPrice">
						<view class="amountPrice"><text>￥</text>{{chooseItem.discountValue}}</view>
						<view class="couponSubPrice">满{{chooseItem.condValue}}减{{chooseItem.discountValue}}</view>
					</view>
					<view class="couponUserInfo">
						<text class="couponType">满减券</text>
						<text class="couponName">{{chooseItem.name}}</text>
						<view class="couponTime" v-if="chooseItem.validType == 1">
							领取后{{chooseItem.validDays}}天内有效
						</view>
						<view class="couponTime" v-else>
							{{$utils.formatDate(chooseItem.validStartTime,"yyyy-MM-dd")}} - {{$utils.formatDate(chooseItem.validEndTime,"yyyy-MM-dd")}}
						</view>
						<view class="descCoupon" @click="chooseItem.flag=!chooseItem.flag">
							使用说明
							<!-- <image src="" mode=""></image> -->
						</view>
					</view>
					<!-- 优惠券类型  积分兑换 手动领取 自动领取 -->
					<view class="couponBtn" v-if="chooseItem.received!=2 && chooseItem.receiveType!=2">
						<text class="receive" v-if="chooseItem.received==0" @click="receiveCoupon(chooseItem)">领取</text>
						<text class="disabledReceive" v-else>已领取</text>
					</view>
					<view class="couponBtn" v-if="chooseItem.received!=2 && chooseItem.receiveType==2">
						<view class="integral">
							{{chooseItem.needPointNum||0}}积分
						</view>
						<text class="receive" v-if="chooseItem.received==0" @click="receiveCoupon(chooseItem)">兑换</text>
						<text class="disabledReceive" v-else>已兑换</text>
					</view>
					<view class="couponNum">
						<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_almostexpired_radius_100820@2x.png" mode=""></image>
						已{{chooseItem.receiveType==2?'兑':'领'}}{{chooseItem.totalBindAmount}}/{{chooseItem.confineAmount}}
					</view>
				</view>
				<view class="decBox ellipsis-one" v-if="chooseItem.flag">
					{{chooseItem.description}}
				</view>
			</view>
			<view class="exchangText">
				抵扣<text>{{chooseItem.needPointNum||0}}</text>积分兑换优惠券
			</view>
			<view class="integraSureBtn" @click="exchangeCouponUsePoint">
				<text>确认兑换</text>
			</view>
		</view>
	</view>
</template>

<script>
	import promotionApi from '@/api/promotion/index.js'
	export default{
		props:['goodsInfo','couponInfo'],
		data(){
			return{
				exchangeFlag:false,	//积分兑换优惠券开关
				chooseItem:"",
			}
		},
		methods:{
			closeCouponPopup(){	//关闭弹窗
				this.$emit("closeCouponPopup")
			},
			receiveCoupon(item){	//领取优惠券
				promotionApi.receiveCoupon(item.id).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"领取成功",
							icon:"none"
						})
						this.$emit("getItemCoupons")
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			exchangeCouponUsePoint(){	//兑换优惠券
				promotionApi.exchangeCouponUsePoint({templateId:this.chooseItem.id}).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"兑换成功",
							icon:"none"
						})
						this.$emit("getItemCoupons");
						this.exchangeFlag = !this.exchangeFlag
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			receiveIntegral(item){	//兑换
				this.chooseItem = item;
				this.exchangeFlag = true 
			}
		}
	}
</script>

<style scoped>
	.couponBox {
		width: 100%;
		min-height: 752rpx;
		max-height: 852rpx;
		background-color: #FFFFFF;
		border-radius: 32rpx 32rpx 0 0;
		padding-bottom: 10rpx;
	}
	
	.popupTitle {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #000000;
		font-size: 34rpx;
		position: relative;
	}
	
	.couponMain {
		height: 650rpx;
		width: 100%;
	}
	.couponBoxEvery{
		box-shadow: 0 0 18px 0 rgba(0, 0, 0, .08);
		margin: 30rpx auto;
		width: 702rpx;
	}
	.gobackBtn{
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_1@2x.png) no-repeat 50%;
		background-size: 16rpx 30rpx;
		position: absolute;
		left: 0;
		top: 16rpx;
	}
	.couponRow {
		width: 100%;
		min-height: 210rpx;
		display: flex;
		position: relative;
		padding-left: 20rpx;
	}
	
	.couponPrice {
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_can_180820@2x.png") no-repeat;
		flex: 0 0 220rpx;
		color: #FFFFFF;
		text-align: center;
	}
	
	.amountPrice {
		margin-top: 40rpx;
		font-size: 60rpx;
	}
	
	.amountPrice text {
		font-size: 32rpx;
	}
	
	.couponSubPrice {
		font-size: 24rpx;
	}
	
	.couponUserInfo {
		flex: 1;
		margin-top: 26rpx;
		padding: 0 24rpx;
	}
	
	.integral{
		text-align: center;
		font-weight: 700;
		margin-bottom: 10rpx;
	}
	.couponType {
		background-color: #FF1558;
		color: #FFFFFF;
		border-radius: 100rpx;
		font-size: 30rpx;
		padding: 2rpx 10rpx;
		margin-right: 22rpx;
	}
	
	.couponName {
		color: #333333;
		font-weight: 700;
		font-size: 30rpx;
	}
	
	.couponTime {
		font-size: 22rpx;
		color: #929292;
		line-height: 30rpx;
		margin-top: 20rpx;
	}
	
	.couponBtn {
		padding: 52rpx 31rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-left: 1rpx solid #E4E4E4;
		flex-direction: column;
		/* flex-wrap:wrap; */
	}
	
	.sureBtn,.integraSureBtn {
		background-color: #FFFFFF;
		font-size: 32rpx;
		text-align: center;
		padding-top: 10rpx;
		width: 100%;
	}
	.integraSureBtn{
		position: absolute;bottom: 0;
	}
	.sureBtn text ,.integraSureBtn text{
		display: inline-block;
		width: 702rpx;
		height: 80rpx;
		background-color: #FF1558;
		border-radius: 30rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
	}
	
	.receive,
	.disabledReceive {
		width: 108rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 25rpx;
		border: 1rpx solid #FF1558;
		color: #FF1558;
	}
	
	.disabledReceive {
		border: 1rpx solid #333;
		color: #333333;
	}
	
	.couponNum {
		height: 40rpx;
		line-height: 40rpx;
		background-color: #FF1558;
		padding: 0 6rpx;
		border-radius: 6rpx 6rpx 6rpx 0;
		font-size: 22rpx;
		position: absolute;
		right: 0;
		top: 0;
		color: #FFFFFF;
	}
	.couponNum image{
		width: 12rpx;
		height: 13rpx;
		position: absolute;
		bottom: 0;
		left: -10rpx;
	}
	.descCoupon{
		width: 100%;
		color: #999999;
		margin-top: 10rpx;
		display: flex;
		align-items: center;
	}
	.decBox{
		height: 70rpx;
		line-height: 70rpx;
		padding-left: 24rpx;
		color: #999999;
	}
	.exchangText{
		width: 100%;
		text-align: center;
		margin-top: 96rpx;
	}
	.exchangText text{
		color: #FF1558;
		font-size: 40rpx;
	}
</style>
