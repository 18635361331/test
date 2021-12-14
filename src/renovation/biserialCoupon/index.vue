<template>
	<view class="page biserialCoupon" :style="{background:oneColumnCoupon.backgroundColor,color:oneColumnCoupon.fontColor}">
		<view class="columnItem" @click="claimCoupon(item)" v-for="item,index in couponList" :key='index'>
			<image class="columnItemImage" :src="item.backgorundImg" mode="widthFix"></image>
			<view class="columnInfo" v-if="oneColumnCoupon.showWords">
				<view class="columnNum">
					<view class="symbol" :style="{color:oneColumnCoupon.fontColor}">￥</view>
					<view class="amount" :style="{color:oneColumnCoupon.fontColor}">
						{{item.discountValue}}
					</view>
				</view>
				<view class="columnUse" :style="{color:oneColumnCoupon.fontColor}">
					满{{item.condValue}}元使用
				</view>
			</view>
		</view>
		<uni-popup ref="caimCouponPopup" type="bottom">
			<view class="caimCouponPopup">
				<view class="caimCouponTitle">
					兑换优惠券
				</view>
				<view class="contain">
					<view class="couponInfo">
						<view class="symbol">￥</view>
						<view class="amount">
							{{chooseItem.discountValue}}
						</view>
						<view class="columnUse popupColunUse">
							满{{chooseItem.condValue}}元使用
						</view>
					</view>
					<view class="couponUse">
						<text>{{chooseItem.needPointNum}}积分</text>
						<text class="needPoint">兑换</text>
					</view>
				</view>
				<view class="exchangText">
					抵扣<text>{{chooseItem.needPointNum}}积分</text>兑换优惠券
				</view>
				<view class="sureExchange" @click="exchangeCouponUsePoint">
					确认兑换
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import jsCouponMixin from '@/renovation/jsCouponMixin/index.js'
	import requestSubscribeMessage from '@/common/js/requestSubscribeMessage.js'
	export default{
		mixins:[jsCouponMixin,requestSubscribeMessage]
	}
</script>

<style scoped>
	.biserialCoupon{
		width: 100%;
		display: flex;
	}
	.columnItem{
		width: 50%;
		border-radius: 6rpx;
		background-size: 100% !important;
		position: relative;
	}
	.columnItemImage{
		display: block;
	}
	.columnInfo{
		position: absolute;
		top: 20rpx;
	}
	.columnNum{
		height: 70rpx;
		padding-left: 28rpx;
		display: flex;
	}
	.amount{
		font-size: 70rpx;
		font-weight: 700;
		line-height: 70rpx;
	}
	.columnUse{
		font-size: 20rpx;
		padding-left: 49rpx;
		line-height: 28rpx;
		margin-top: 5rpx;
	}
	.popupColunUse{
		padding-left: 20rpx;
	}
	.sureExchange{
		width: calc(100% - 60rpx);
		position: absolute;
		bottom: 10rpx;
		left: 0;
		right: 0;
		margin: auto;
		height: 88rpx;
		line-height: 88rpx;
		background-color: #FF1558;
		border-radius: 8rpx;
		text-align: center;
		color: #FFFFFF;
	}
	.exchangText{
		color: #333333;
		font-weight: 500;
		line-height: 40rpx;
		text-align: center;
		margin-top: 96rpx;
	}
	.exchangText text{
		color: #FF1558;
	}
	.caimCouponPopup{
		width: 100%;
		height: 752rpx;
		background-color: #FFFFFF;
		border-radius: 32rpx 32rpx 0 0;
	}
	.caimCouponTitle{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		color: #000000;
		text-align: center;
		font-size: 34rpx;
	}
	.contain{
		width: 336rpx;
		height: 188rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		box-shadow: 0 0 18px 0 rgba(0,0,0,0.1);
		margin: 0 auto;
	}
	.couponInfo{
		width: 100%;
		height: 128rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/two_coupon.png) no-repeat 50%;
		background-size: 100%;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}
	.couponUse{
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
	}
	.needPoint{
		display: inline-block;
		width: 108rpx;
		height: 40rpx;
		text-align: center;
		line-height: 38rpx;
		border-radius: 25rpx;
		border: 1rpx solid #FF1558;
		color: #FF1558;
		font-size: 22rpx;
	}
</style>
