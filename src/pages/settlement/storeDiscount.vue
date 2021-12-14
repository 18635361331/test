<template>
	<view class="page">
		<view class="disCount" @click="openCouponPopup">
			<view>
				<text>店铺优惠券</text>
				<text class="couponsNum">{{storeCouponsInfo[storeId].availableList.length}}张可用</text>
			</view>
			<view class="discountPrice" v-for='item,index in storeCouponsInfo[storeId].availableList' v-if="chooseStoreId==item.id" :key='index'>
				<text v-if="item.discountValue">-￥{{item.discountValue}}</text>
			</view>
			<view class="couponIcon"></view>
		</view>
		<uni-popup ref="couponPopup" type="bottom">
			<view class="couponPopup">
				<view class="popupTitle">
					{{storeName}}
				</view>
				<scroll-view scroll-y="true" class="couponMain">
					<view class="everyRow" v-for='item,index in storeCouponsInfo[storeId].availableList' :key='index'>
						<view class="couponPrice">
							<view class="price">
								<text>￥</text>
								{{item.discountValue}}
							</view>
							<view class="type">
								{{item.condType==1?"满":"每满"}}{{item.condValue}}使用
							</view>
						</view>
						<view class="couponInfo">
							<view class="couponType">
								<text class="disCountType">满减券</text>
								<text class="couponName">{{item.name}}</text>
							</view>
							<view class="couponTime">
								{{$utils.formatDate(item.startTime,"yyyy.MM.dd")}}-{{$utils.formatDate(item.endTime,"yyyy.MM.dd")}}
							</view>
						</view>
						<view class="couponBtnIcon" @click="couponChange(item)" :class="chooseStoreId==item.id?'active':''"></view>
					</view>
					<view class="availableNotUse" @click="clearCoupon">
						不使用优惠券
					</view>
					<view class="unavailable">
						不可用优惠券
					</view>
					<view class="everyRow" v-for='item,index in storeCouponsInfo[storeId].unavailableList' :key='index'>
						<view class="couponPrice unavailableActive">
							<view class="price">
								<text>￥</text>
								{{item.discountValue}}
							</view>
							<view class="type">
								{{item.condType==1?"满":"每满"}}{{item.condValue}}使用
							</view>
						</view>
						<view class="couponInfo">
							<view class="couponType">
								<text class="disCountType unavailableActive">满减券</text>
								<text class="couponName">{{item.name}}</text>
							</view>
							<view class="couponTime">
								{{$utils.formatDate(item.startTime,"yyyy.MM.dd")}}-{{$utils.formatDate(item.endTime,"yyyy.MM.dd")}}
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="sureBtn" @click="closeCouponPopup">
					完成
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: ["storeCouponsInfo", "storeId", "storeName","chooseStoreId"],
		data() {
			return {

			}
		},
		methods: {
			openCouponPopup() { //打开店铺优惠券弹窗
				this.$refs.couponPopup.open()
			},
			clearCoupon(){	//不使用优惠券
				this.$emit("couponChange",this.storeId,"")
			},
			closeCouponPopup(){	//关闭店铺优惠券弹窗
				this.$refs.couponPopup.close()
			},
			couponChange(item){	//优惠券选择发生变化时触发
				if(item.id!=this.chooseStoreId){
					this.$emit("couponChange",this.storeId,item.id)
				}
			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.disCount {
		width: calc(100% - 44rpx);
		margin: 0 auto;
		height: 88rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #E6E6E6;
		justify-content: space-between;
	}

	.couponsNum {
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		color: #FF1558;
		background-color: #ffecf1;
		padding: 0 14rpx;
		border-radius: 100rpx;
		margin-left: 10rpx;
	}

	.couponIcon {
		height: 88rpx;
		width: 32rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/moreD.png) no-repeat 50%;
		background-size: 32rpx 8rpx;
	}

	.couponPopup {
		height: 752rpx;
		width: 100%;
		background-color: #FFFFFF;
	}

	.popupTitle {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 34rpx;
		text-align: center;
	}
	
	.discountPrice{
		flex: 1;
		text-align: right;
		margin-right: 20rpx;
	}
	
	.couponMain {
		width: 100%;
		height: calc(100% - 200rpx);
	}

	.everyRow {
		width: 702rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;
		border-radius: 6rpx;
		box-shadow: 0 0 18px 0 rgba(0, 0, 0, .08);
		display: flex;
		height: 170rpx;
		align-items: center;
		padding-right: 24rpx;
	}

	.couponPrice {
		width: 220rpx;
		height: 170rpx;
		padding: 24rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/orderCoup.png) no-repeat 50%;
		background-size: 220rpx 170rpx;
		text-align: center;
		color: #FFFFFF;
	}
	.couponPrice.unavailableActive{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/orderCoupUn.png) no-repeat 50%;
	}
	.sureBtn {
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		background-color: #FF1558;
	}

	.price {
		font-size: 60rpx;
	}

	.price text {
		font-size: 38rpx;
	}

	.type {
		font-size: 24rpx;
		margin-top: 4rpx;
	}

	.couponInfo {
		flex: 1;
		height: 170rpx;
		padding: 26rpx 84rpx 26rpx 24rpx;
	}

	.couponType {
		width: 100%;
		height: 72rpx;
		line-height: 36rpx;
		color: #333333;
		font-weight: 700;
	}

	.disCountType {
		color: #FFFFFF;
		margin-right: 22rpx;
		padding: 0 10rpx;
		background-color: #FF1558;
		height: 24rpx;
		line-height: 24rpx;
		border-radius: 100rpx;
		font-size: 18rpx;
	}
	.unavailableActive{
		background-color: #DDDDDD;
	}
	.couponName {
		font-weight: 700rpx;
		color: #333333;
	}

	.couponTime {
		color: #929292;
		font-size: 22rpx;
	}

	.couponBtnIcon {
		width: 36rpx;
		height: 36rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}

	.couponBtnIcon.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}

	.availableNotUse {
		width: 702rpx;
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		background-color: #FFFFFF;
		color: #999999;
		margin: 0 auto;
		margin-bottom: 30rpx;
		border-radius: 6rpx;
		font-size: 32rpx;
		border: 1rpx solid #E4E4E4;
	}
	
	.unavailable{
		width: 100%;
		height: 94rpx;
		line-height: 94rpx;
		padding: 0 24rpx;
		font-size: 30rpx;
		color: #333333;
	}
</style>
