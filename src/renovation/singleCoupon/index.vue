<template>
	<!-- 单列优惠券 -->
	<view class="page couponParentBox" :style="{background:newUserType?'':oneColumnCoupon.backgroundColor,color:oneColumnCoupon.fontColor}">
		<view class="couponBox" v-for="item,index in couponList" :key='item.id' @click="claimCoupon(item)" >
			<image class="columnItemImage" :src="item.backgorundImg" mode="widthFix"></image>
			<view class="columnInfo" v-if="oneColumnCoupon.showWords">
				<view class="columnNum">
					<view class="symbol">￥</view>
					<view class="amount">
						{{item.discountValue}}
					</view>
				</view>
				<view class="columnUse">
					满{{item.condValue}}元使用
				</view>
			</view>
			<view v-if="oneColumnCoupon.showWords" class="columnTitle">
				{{item.name}}
			</view>
		</view>
		<uni-popup ref="caimCouponPopup" type="bottom">
			<view class="caimCouponPopup">
				<view class="caimCouponTitle">
					兑换优惠券
				</view>
				<view class="contain">
					<view class="containerCount">
						<view class="titleCanUse">
							<view class="titleColumnNum">
								<view class="symbol">￥</view>
								<view class="amount">
									{{chooseItem.discountValue}}
								</view>
							</view>
							<view class="columnUse">
								{{chooseItem.condValue==0?"无门槛":"满"+chooseItem.condValue+"元使用"}}
							</view>
						</view>
						<view class="cuoponDetail">
							<view class="firstRow">
								<text class="firstRowType">满减券</text>
								<text class="firstFont">{{chooseItem.name}}</text>
							</view>
							<view class="secondRow">
								{{chooseItem.validType==1?"领取后"+chooseItem.validDays+"天内有效":$utils.formatDate(chooseItem.validStartTime,"yyyy.MM.dd")+"-"+$utils.formatDate(chooseItem.validEndTime,"yyyy.MM.dd")}}
							</view>
							<view class="desTrigger" :class="chooseItem.flag?'active':''" @click="desTriggerChange">
								使用说明
								<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_cannotusearrow@2x.png" mode=""></image>
							</view>
						</view>
						<view class="pointBox">
							<view class="exchange">
								{{chooseItem.needPointNum}}积分
							</view>
							<view class="exchangeBtn">
								兑换
							</view>
						</view>
					</view>
					<view class="couponExplain" v-if="chooseItem.flag">
						{{chooseItem.description}}
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
	.couponParentBox{
		/* padding: 0 30rpx; */
	}
	.columnItemImage{
		display: block;
	}
	.couponBox{
		width: 100%;
		display: flex;
		position: relative;
	}
	.columnInfo{
		position: absolute;
		top: 20rpx;
		width: 190rpx;
	}
	.columnNum{
		height: 70rpx;
		padding-left: 28rpx;
		display: flex;
	}
	.symbol{
		font-size: 30rpx;
		margin-right: 4rpx;
	}
	.amount{
		font-size: 70rpx;
		font-weight: 700;
		line-height: 70rpx;
	}
	.columnUse{
		margin-top: 5rpx;
		line-height: 28rpx;
		text-align: center;
		font-size: 20rpx;
	}
	.columnTitle{
		width: 314rpx;
		position: absolute;
		left: 190rpx;
		top: 33rpx;
		font-size: 30rpx;
		height: 72rpx;
		line-height: 36rpx;
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
		width: 702rpx;
		min-height: 190rpx;
		margin: 0 auto;
		box-shadow: 0 0 36rpx rgba(0,0,0,0.2);
		margin: 30rpx auto;
	}
	.containerCount{
		display: flex;
	}
	.titleCanUse{
		flex: 0 0 220rpx;
		background-repeat: no-repeat;
		background-size: 100%;
		text-align: center;
		color: #FFFFFF;
		background-image: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_can_180820@2x.png);
	}
	.titleColumnNum{
		margin-top: 40rpx;
		font-size: 60rpx;
		display: flex;
		align-items: flex-end;
		width: 100%;
		height: 40%;
		padding-bottom: 10rpx;
		justify-content: center;
	}
	.titleColumnNum .symbol{
		font-size: 38rpx;
	}
	.cuoponDetail{
		flex: 1;
	}
	.firstRow{
		display: flex;
		margin-top: 26rpx;
		height:72rpx;
		padding:0 24rpx;
	}
	.firstRowType{
		width: 100rpx;
		height: 36rpx;
		line-height: 36rpx;
		font-size: 24rpx;
		text-align: center;
		background-color: #FF1558;
		color: #fff;
		border-radius: 100rpx;
		margin-right: 22rpx;
	}
	.firstFont{
		color: #333333;
		font-weight: 700;
	}
	.secondRow{
		margin-top: 12rpx;
		padding:0 24rpx;
		color: #929292;
		line-height: 30rpx;
		font-size: 24rpx;
	}
	.pointBox{
		padding: 52rpx 31rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.exchange{
		font-weight: 600;
		color: #333333;
		line-height: 40rpx;
		width: 100%;
		margin-bottom: 14rpx;
		text-align: center;
	}
	.exchangeBtn{
		width: 108rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 25rpx;
		color: #FF1558;
		border: 1rpx solid #FF1558;
		font-size: 24rpx;
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
	.sureExchange{
		width: calc(100% - 60rpx);
		position: absolute;
		bottom: 10rpx;
		left: 0;
		right: 0;
		margin: auto;
		height: 88rpx;
		line-height: 88rpx;
		color: #FFFFFF;
		background-color: #FF1558;
		border-radius: 8rpx;
		text-align: center;
	}
	.desTrigger{
		line-height: 25rpx;
		color: #999999;
		font-size: 22rpx;
		padding: 0 24rpx;
		margin-top: 10rpx;
	}
	.desTrigger image{
		margin-left: 20rpx;
		width: 14px;
		height: 7rpx;
	}
	.desTrigger.active image{
		transform: rotate(180deg);
	}
	.couponExplain{
		width: 702rpx;
		height: 70rpx;
		line-height: 70rpx;
		padding-left: 24rpx;
		color: #999999;
		border-top: 1rpx solid #E4E4E4;
	}
</style>
