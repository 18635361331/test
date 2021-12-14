<template>
	<view class="page">
		<view class="newUserCoupon">
			<view class="getTitle">
				恭喜获得
			</view>
			<view class="getText">
				新人专享优惠券包
			</view>
		</view>
		<view class="newUserCouponContent">
			<scroll-view scroll-y="true" class="couponScroll">
				<view class="everyCoupon" v-for="item,index in couponList" :key='index'>
					<view class="couponPrice">
						<view class="couponMonety">
							<text>¥</text>{{item.discountValue}}
						</view>
						<view class="couponReduction">
							{{item.condValue==0?"无门槛":"满"+item.condValue+"元使用"}}
						</view>
					</view>
					<view class="couponText">
						<view class="couponName">{{item.name}}</view>
						<view class="couponTime">
							{{item.validType==1?"领取后"+item.validDays+"天内有效":$utils.formatDate(item.validStartTime,"yyyy.MM.dd")+"-"+$utils.formatDate(item.validEndTime,"yyyy.MM.dd")}}
						</view>
						<view class="coupon">{{item.limitType==3?'全场通用':'部分商品可用'}}</view>
					</view>
				</view>
			</scroll-view>
			<view class="getBtn" @click="closeNewUserPopup">
				收下
			</view>
			<view class="closeBtn" @click="closeNewUserPopup"></view>
		</view>
	</view>
</template>

<script>
	import promotionApi from '@/api/promotion/index.js';
	import appApi from '@/api/app/index.js'
	export default {
		props:['newUserCouponInfo'],
		data(){
			return{
				couponList:"",
			}
		},
		methods:{
			getDecorateCoupons(){	//根据id获取优惠券信息
				promotionApi.getDecorateCoupons(this.newUserCouponInfo.couponIdList).then(res=>{
					if(res.data.code==200){
						this.couponList = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			closeNewUserPopup(){
				this.$emit("closeNewUserPopup")
			}
		},
		mounted(){
			this.getDecorateCoupons()
		}
	}
</script>

<style scoped>
	.newUserCoupon{
		width: 690rpx;
		height: 200rpx;
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/newUserTopTitle.png") no-repeat;
		background-size: 100% 100%;
		text-align: center;
	}
	.newUserCouponContent{
		width: 690rpx;
		height: 700rpx;
		background: linear-gradient(180deg, #F66A74 0%, #EC5764 100%);
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		font-size: 32rpx;
		position: relative;
	}
	.getTitle{
		padding-top: 60rpx;
		color: #E42040;
		font-weight: 700;
	}
	.getText{
		padding-top: 10rpx;
	}
	.getBtn{
		width: 650rpx;
		height: 88rpx;
		background: linear-gradient(132deg, #FFC9A8 0%, #F5CC8D 45%, #F7B45D 100%);
		border-radius: 44rpx;
		color: black;
		text-align: center;
		line-height: 88rpx;
		margin: 0 auto;
		font-weight: 700;
	}
	.closeBtn{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		bottom: -90rpx;
		left: 0;
		margin: auto;
		right: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/11_close.png) no-repeat;
		background-size: 100%;
	}
	.couponScroll{
		max-height: 596rpx;
	}
	.everyCoupon{
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/newUserCouponIcon.png") no-repeat;
		width: 650rpx;
		height: 178rpx;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-bottom: 20rpx;
		display: flex;
		padding-top: 36rpx;
	}
	.couponPrice{
		width: 250rpx;
		position: relative;
	}
	.couponMonety{
		color: #E42040;
		font-size: 80rpx;
		font-weight: 700;
		position: absolute;
		left: 60rpx;
		top: -20rpx;
	}
	.couponMonety text{
		font-size: 32rpx;
		font-weight: 600;
	}
	.couponReduction{
		font-size: 18rpx;
		color: #875C3F;
		position: absolute;
		bottom: 36rpx;
		left: 60rpx;
		font-weight: 700;
	}
	.couponName{
		color: #886956;
	}
	.couponTime{
		font-size: 18rpx;
		color: #875C3F;
	}
	.coupon{
		color: #875C3F;
		font-size: 18rpx;
		margin-top: 10rpx;
	}
</style>
