<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="couponParent" v-if="couponInfo.name">
			<view class="couponDetails">
				<view class="couponInfo">
					<view class="useScope">
						{{couponInfo.name}}
					</view>
					<view class="useTime ellipsis-one">
						有效期：{{couponInfo.timeValue}}
					</view>
				</view>
				<view class="couponPrice">
					<view class="price">
						{{couponInfo.discountValue}}<text>元</text>
					</view>
					<view class="couponText">
						{{couponInfo.lowerLimit}}
					</view>
				</view>
			</view>
		</view>
		<biserialGoods :goodsList='goodsInfo.records'></biserialGoods>
	</view>
</template>

<script>
	import biserialGoods from '@/renovation/biserialGoods/index.vue'
	import promotionApi from '@/api/promotion/index.js'
	export default{
		data(){
			return{
				goodsInfo:{},
				pageInfo:{
					pageNo:1,
					pageSize:10
				},
				couponInfo:{},
				defaultTitleDto:{
					title:'优惠券专用',
				}
			}
		},
		methods:{
			getCouponGoodsList(flag){
				promotionApi.getCouponGoodsList({...this.pageInfo,id:this.$Route.query.id}).then(res=>{
					if(res.data.code==200){
						if(flag){
							this.goodsInfo.records = this.goodsInfo.records.concat(res.data.data.records);
							this.goodsInfo.totalPage = res.data.data.totalPage
						}else{
							this.goodsInfo = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		onReachBottom() { //页面滚动到底部
			if (this.pageInfo.pageNo < this.goodsInfo.totalPage) {
				this.pageInfo.pageNo++;
				this.getCouponGoodsList(true)
			}
		},
		onShow() {
			this.zhuge.track("优惠券专用页面")
			this.couponInfo = JSON.parse(uni.getStorageSync("couponItemInfo"))
			this.getCouponGoodsList()
		},
		components:{
			biserialGoods
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 150rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 226rpx;
		/* #endif */
		background-color: #F5F5F5;
		min-height: 100vh;
	}
	.couponParent{
		width: 100%;
		height: 150rpx;
		position: fixed;
		top: 0;
		/* #ifndef MP-WEIXIN */
		top: 88rpx;
		/* #endif */
		left: 0;
		right: 0;
		margin: auto;
		z-index: 1;
		padding-top: 16rpx;
		background-color: #F5F5F5;
	}
	.couponDetails{
		width: 620rpx;
		margin: 0 auto;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_goods@2x.png) no-repeat 50%;
		background-size: 100%;
		display: flex;
	}
	.couponInfo{
		height: 100%;
		width: 450rpx;
		padding-left: 45rpx;
	}
	.useScope{
		margin-top: 22rpx;
		font-size: 30rpx;
		color: #5d5d5d;
		line-height: 34rpx;
		height: 36rpx;
	}
	.useTime{
		margin-top: 17rpx;
		font-size: 20rpx;
		color: #979797;
	}
	.price{
		font-size: 60rpx;
		height: 58%;
	}
	.couponPrice{
		flex: 1;
		text-align: center;
		color: #FFFFFF;
		padding-right: 5rpx;
	}
	.price text{
		font-size: 28rpx;
	}
</style>
