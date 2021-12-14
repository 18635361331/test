<template>
	<view class="page">
		<view class="skuPage" v-if="couponInfo && couponInfo.length" @click="openCouponPopup">
			<text class="skuChoose">领券</text>
			<view class="skuText">
				<text class="everyCoupon" v-for="item,index in couponInfo" :key='item.id'>满{{item.condValue}}减{{item.discountValue}}</text>
			</view>
			<text class="arrowIcon"></text>
		</view>
		<uni-popup ref="couponPopup" type="bottom">
			<couponTemplate :goodsInfo='goodsInfo' :couponInfo='couponInfo' @getItemCoupons='getItemCoupons' @closeCouponPopup='closeCouponPopup'></couponTemplate>
		</uni-popup>
	</view>
</template>

<script>
	import couponTemplate from '@/common/model/couponPopup.vue'
	import promotionApi from '@/api/promotion/index.js'
	export default {
		props: ['goodsInfo','goodsInfoId'],
		data() {
			return {
				couponInfo: [] //优惠券信息
			}
		},
		methods: {
			getItemCoupons() { //根据item获取优惠券
				promotionApi.getItemCoupons(this.goodsInfoId).then(res => {
					this.couponInfo.splice(0)
					if (res.data.code == 200) {
						for (let i = 0; i < res.data.data.length; i++) {
							for(let j=0;j<res.data.data[i].storeCouponTemplates.length;j++){
								if(this.judgeCoupon(res.data.data[i].storeCouponTemplates[j])){
									this.couponInfo.push(res.data.data[i].storeCouponTemplates[j])
								}
							}
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			judgeCoupon(coupon){	//优惠券去重
				for(let i=0;i<this.couponInfo.length;i++){
					if(this.couponInfo[i].id==coupon.id){
						return false
					}
				}
				return true
			},
			openCouponPopup() { //打开优惠券弹窗
				this.$refs.couponPopup.open();
			},
			closeCouponPopup() { //关闭优惠券弹窗
				this.$refs.couponPopup.close();
			}
		},
		mounted() {
			this.getItemCoupons()
		},
		components:{
			couponTemplate
		}
	}
</script>

<style scoped>
	.skuPage {
		width: 100%;
		min-height: 110rpx;
		background-color: #FFFFFF;
		display: flex;
		padding-left: 24rpx;
	}

	.skuChoose {
		margin: 0 24rpx 0 0;
		font-size: 26rpx;
		color: #999;
		line-height: 110rpx;
		display: inline-block
	}

	.skuText {
		display: inline-block;
		min-height: 110rpx;
		line-height: 26rpx;
		font-size: 26rpx;
		padding: 41rpx 30rpx 41rpx 0;
		flex: 1;
		color: #000000;
	}

	.everyCoupon {
		display: inline-block;
		height: 28rpx;
		line-height: 28rpx;
		background-color: #FF1558;
		font-size: 20rpx;
		color: #FFFFFF;
		margin: 0 11rpx 0 11rpx;
		color: #FFFFFF;
		padding: 0 5rpx;
		border-radius: 8rpx;
	}

	.arrowIcon {
		display: inline-block;
		width: 48rpx;
		margin-right: 20rpx;
		height: 110rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/more_fx2@2x.png) no-repeat 50%;
		background-size: 40rpx 40rpx;
	}

	
</style>
