<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="couponTitle">
			<view class="everyTitle" @click='stateChange(0)'>
				<text :class="usageState==0?'active':''">未使用</text>（{{amount.unusedAmount?amount.unusedAmount:0}}）
			</view>
			<view class="everyTitle" @click='stateChange(1)'>
				<text :class="usageState==1?'active':''">已使用</text>（{{amount.usedAmount?amount.usedAmount:0}}）
			</view>
			<view class="everyTitle" @click='stateChange(2)'>
				<text :class="usageState==2?'active':''">已过期</text>（{{amount.expiredAmount?amount.expiredAmount:0}}）
			</view>
		</view>
		<view class="couponBox" v-if="memberCoupons.records && memberCoupons.records.length">
			<view v-for="item,index in memberCoupons.records" :key='item.id'>
				<view class="everyCoupon">
					<view class="couponCanuse" :class="usageState!=0?'active':''">
						<view class="amountNum">
							<text>￥</text>{{item.discountValue}}
						</view>
						<view class="useScope">
							{{item.lowerLimit}}
						</view>
					</view>
					<view class="couponDetails">
						<view class="couponTop">
							<view class="couponType" :class="usageState!=0?'active':''">
								满减券
							</view>
							{{item.name}}
						</view>
						<view class="couponRow">
							{{item.timeValue}}
						</view>
						<!-- coupon_used_180820@2x -->
						<view class="useHint">
							<view @click='hintChange(item)'>使用说明 <image class="openIcon" :class="item.flag?'active':''" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/combined_shape copy 2@2x.png" mode=""></image></view>
							<text v-if="usageState==0" class="canUseGoodsBtn" @click='goToCouponGoods(item)'>可用商品</text>
							<view v-if="usageState==1" class="alreadyCanUse"></view>
						</view>
					</view>
				</view>
				<view class="description" v-if="item.flag">
					{{item.description?item.description:""}}
				</view>
			</view>
		</view>
		<view class="noCoupont" v-if="!memberCoupons.records || !memberCoupons.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_none@2x.png" mode="widthFix"></image>
			<view class="noCoupontText">
				暂时没有优惠券~
			</view>
		</view>
	</view>
</template>

<script>
	import promotionApi from '@/api/promotion/index.js'
	
	export default {
		data() {
			return {
				amount: { //已使用 未使用 已过期优惠券的数量

				},
				usageState: 0, //选中的状态
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				memberCoupons: {},
				defaultTitleDto:{
					title:'我的优惠券',
				}
			}
		},
		onShow() {
			this.zhuge.track("我的优惠券")
			this.getCouponNums();
			this.getMemberCoupons();
		},
		onReachBottom() { //页面滚动到底部
			if (this.pageInfo.pageNo < this.memberCoupons.totalPage) {
				this.pageInfo.pageNo++;
				this.getMemberCoupons(true)
			}
		},
		methods: {
			stateChange(state){	//状态的更改
				if(this.usageState!=state){
					this.usageState = state;
					this.pageInfo.pageNo = 1;
					uni.showLoading({
						title: "加载中..."
					})
					this.getMemberCoupons();
				}
			},
			getCouponNums() { //获取已使用 未使用 已过期优惠券的数量
				promotionApi.getCouponNums().then(res => {
					if (res.data.code == 200) {
						this.amount = res.data.data;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getMemberCoupons(flag) { //我的优惠券列表
				promotionApi.getMemberCoupons({ ...this.pageInfo,
					usageState: this.usageState
				}).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						for(let i=0;i<res.data.data.records.length;i++){
							if(res.data.data.records[i].condValue==0){
								res.data.data.records[i].lowerLimit = "无门槛";
							}else if(res.data.data.records[i].condType==1){
								res.data.data.records[i].lowerLimit = "满"+res.data.data.records[i].condValue+"使用";
							}else{
								res.data.data.records[i].lowerLimit = "每满"+res.data.data.records[i].condValue+"使用";
							}
							if(res.data.data.records[i].validType==1){
								res.data.data.records[i].timeValue = "领取后"+res.data.data.records[i].validDays+"天内有效"
							}else{
								res.data.data.records[i].timeValue = this.$utils.formatDate(res.data.data.records[i].startTime,"yyyy.MM.dd")+"-"+this.$utils.formatDate(res.data.data.records[i].endTime,"yyyy.MM.dd")
							}
							res.data.data.records[i].flag = false
						}
						if (flag) {
							this.memberCoupons.records = this.memberCoupons.records.concat(res.data.data.records)
							this.memberCoupons.totalPage = res.data.data.totalPage
						} else {
							this.memberCoupons = res.data.data
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			goToCouponGoods(item){	//去往优惠券商品
				uni.setStorageSync("couponItemInfo",JSON.stringify(item))
				this.$Router.push({
					path:"/pages/couponGoods/index",
					query:{
						id:item.templateId
					}
				})
			},
			hintChange(item){	//使用说明开关
				item.flag=!item.flag
			}
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 196rpx;
		/* #endif */
	}

	.couponBox {
		width: 100%;
		min-height: calc(100vh - 88rpx);
		/* #ifndef MP-WEIXIN */
		min-height: calc(100vh - 196rpx);
		/* #endif */
		background-color: #F5F5F5;
		padding-top: 30rpx;
	}

	.couponTitle {
		width: 100%;
		height: 88rpx;
		position: fixed;
		top: 0;
		/* #ifndef MP-WEIXIN */
		top: 88rpx;
		/* #endif */
		left: 0;
		background-color: #FFFFFF;
		display: flex;
		z-index: 1;
	}

	.everyTitle {
		width: 33.33%;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
	}
	.everyTitle text.active{
		color: #000000;
		font-size: 40rpx;
	}
	.everyCoupon{
		width: 702rpx;
		height: 210rpx;
		margin: 0 auto 30rpx;
		background-color: #FFFFFF;
		display: flex;
		position: relative;
	}
	.amountNum{
		margin-top: 40rpx;
		font-size: 60rpx;
	}
	.couponCanuse{
		width: 220rpx;
		height: 210rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_can_180820@2x.png) no-repeat 50%;
		background-size: 220rpx 210rpx;
		color: #FFFFFF;
		text-align: center;
	}
	.couponCanuse.active{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_cannot_180820@2x.png) no-repeat 50%;
		background-size: 220rpx 210rpx;
	}
	.useScope{
		font-size: 24rpx;
	}
	.couponDetails{
		flex: 1;
	}
	.couponTop{
		margin-top: 24rpx;
		height: 84rpx;
		display: flex;
		align-items: center;
		padding: 0 24rpx;
	}
	.couponType{
		padding: 2rpx 10rpx;
		border-radius: 100rpx;
		font-size: 18rpx;
		color: #FFFFFF;
		background-color: #FF1558;
		margin-right: 10rpx;
	}
	.couponType.active{
		background-color: #ddd;
	}
	.couponRow{
		padding: 0 24rpx;
		color: #999999;
	}
	.useHint{
		color: #999999;
		line-height: 25rpx;
		font-size: 22rpx;
		margin-top: 20rpx;
		padding: 0 24rpx;
		display: flex;
		justify-content: space-between;
	}
	.canUseGoodsBtn{
		font-size: 24rpx;
		color: #FF1558;
		border: 1rpx solid #FF1558;
		border-radius: 65rpx;
		padding: 4rpx 8rpx;
	}
	.description{
		width: 702rpx;
		min-height: 60rpx;
		margin: 8rpx auto 30rpx;
		background-color: #FFFFFF;
		box-shadow: 0 2px 4px 0 hsla(0,0%,70%,.5);
		text-align: center;
		color: #6f6f6f;
		border-radius: 47rpx;
        padding: 10rpx 0;
	}
	.noCoupont{
		width: 360rpx;
		margin: 0 auto;
		padding-top: 262rpx;
	}
	.noCoupontText{
		text-align: center;
		padding-top: 55rpx;
		color: #999999;
		font-size: 30rpx;
	}
	.openIcon{
		width: 20rpx;
		height: 10rpx;
		margin-left: 20rpx;
		vertical-align: middle;
	}
	.openIcon.active{
		 transform: rotate(180deg);
	}
	.alreadyCanUse{
		position: absolute;
		width: 130rpx;
		height: 130rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_used_180820@2x.png) no-repeat 50%;
		background-size: 130rpx 130rpx;
		bottom: 0;
		right: 0;
	}
</style>
