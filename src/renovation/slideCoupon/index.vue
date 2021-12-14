<template>
	<view class="page">
		<!-- 横向滑动 -->
		<scroll-view scroll-x="true" class="scrollCoupon" :style="{background:oneColumnCoupon.backgroundColor,color:oneColumnCoupon.fontColor}">
			<view class="columnCoupon">
				<view class="everyCoupon" @click="claimCoupon(item)" v-for="item,index in couponList" :key='index'>
					<image class="columnItemImage" :style="{width:iamgeSize.width,height:iamgeSize.height}" :src="item.backgorundImg" mode="widthFix"  @load='imgHeight'></image>
					<view class="couponInfos" v-if="oneColumnCoupon.showWords">
						<view class="columnNum">
							<view class="symbol">￥</view>
							<view class="amount">
								{{item.discountValue}}
							</view>
						</view>
						<view class="couponCondition">
							满{{item.condValue}}元使用
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="caimCouponPopup" type="bottom">
			<view class="caimCouponPopup">
				<view class="caimCouponTitle">
					兑换优惠券
				</view>
				<view class="contain">
					<view class="couponInfo">
						<view class="couponAmount">
							<view class="couponSymbol">
								￥
							</view>
							{{chooseItem.discountValue}}
						</view>
						<view class="couponUse">
							满{{chooseItem.condValue}}元使用
						</view>
						<view class="couponBtn">
							兑换
						</view>
					</view>
					<view class="couponPoint">
						{{chooseItem.needPointNum}}积分
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
		mixins:[jsCouponMixin,requestSubscribeMessage],
		data(){
			return{
				iamgeSize:{
					width:"",
					height:""
				}
			}
		},
		methods:{
			imgHeight(e){
				let view = uni.createSelectorQuery().in(this).select(".columnItemImage");
				view.boundingClientRect(data=>{
					this.iamgeSize.width = e.detail.width+"px"
					this.iamgeSize.height = e.detail.height+"px"
				}).exec();
			},
		}
	}
</script>

<style scoped>
	.scrollCoupon{
		/* padding: 0 30rpx; */
	}
	.columnCoupon{
		white-space:nowrap;
		position: relative;
	}
	.everyCoupon{
		display: inline-block;
		border-radius: 6rpx;
		position: relative;
		background-size: 100% !important;
	}
	.columnItemImage{
		display: block;
	}
	.couponInfos{
		position: absolute;
		top:37rpx;
		width: 100%;
	}
	.columnNum{
		height: 70rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.amount{
		font-size: 70rpx;
		font-weight: 700;
		line-height: 70rpx;
	}
	.couponCondition{
		font-size: 20rpx;
		text-align: center;
		margin-top: 20rpx;
		line-height: 28rpx;
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
	.contain{
		width: 220rpx;
		height: 322rpx;
		margin: 32rpx auto 96rpx;
		box-shadow: 0 0 36rpx 0 rgba(0,0,0,0.3);
	}
	.couponInfo{
		display: flex;
		flex-direction: column;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/three_coupon.png) no-repeat 50%;
		background-size: 100%;
		align-items: center;
		color: #FFFFFF;
		height: 260rpx;
		width: 220rpx;
		
	}
	.couponAmount{
		font-size: 70rpx;
		font-weight: 500;
		line-height: 98rpx;
		display: flex;
	}
	.couponSymbol{
		font-size: 30rpx;
		font-weight: 500;
	}
	.couponUse{
		font-size: 20rpx;
		margin-top: 8rpx;
		margin-bottom: 34rpx;
	}
	.couponBtn{
		width: 108rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 25rpx;
		background-color: #FFFFFF;
		color: #FF1558;
	}
	.couponPoint{
		text-align: center;
		line-height: 60rpx;
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
</style>
