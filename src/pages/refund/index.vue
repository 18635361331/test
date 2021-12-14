<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="orderNoMsg" v-if="!refundData.records || !refundData.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noRefund.png" mode="widthFix"></image>
			<view class="orderNoMsgText">
				暂无订单！
			</view>
		</view>
		<view class="refundBox" v-if="refundData.records && refundData.records.length">
			<view class="refund" v-for="item,index in refundData.records" :key='item.id'>
				<view class="refundEveryTitle">
					<text>{{item.refundTime}}</text>
					<text class="refundStatus">{{item.refundType==1?"退货退款":"仅退款"}}</text>
					<text class="refundText">{{item.refundStatusName}}</text>
				</view>
				<view class="goodsList" v-for="v,i in item.refundGoodDtos" :key='i' @click="goToGoodsDetails(v)">
					<image :src="imgBaseUrls+v.goodsImg" mode=""></image>
					<view class="goodsInfo">
						<view class="goodsName ellipsis-two">
							{{v.goodsName}}
						</view>
						<view class="goodsSpce">
							{{v.goodsFileValue}}
						</view>
						<view class="goodsPrice">
							<view>
								<text class="priceSymbol">￥</text>
								<text>{{v.goodsPayPrice}}</text>
							</view>
							<view class="goodsNum">
								<text>x</text>
								<text>{{v.goodsNum}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="allPrice">
					共{{item.refundGoodsNum}}件商品 合计：￥<text>{{item.refundPrice}}</text> （含运费￥{{item.refundFreight}}）
				</view>
				<view class="refundBtn">
					<view class="showDetails" @click="goToRefundDetails(item)">查看详情</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js';
	import status from './status.js'
	export default {
		data() {
			return {
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				refundData: {},
				imgBaseUrls: "",
				defaultTitleDto:{
					title:'退款售后',
				}
			}
		},
		onShow() {
			this.zhuge.track("退款售后-落地页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.getCustomerRefundOrderPage();
		},
		methods: {
			getCustomerRefundOrderPage(flag) { //获取售后列表
				tradeApi.getCustomerRefundOrderPage(this.pageInfo).then(res => {
					if (res.data.code == 200) {
						if (res.data.data) {
							for (let i = 0; i < res.data.data.records.length; i++) {
								res.data.data.records[i].refundStatusName = status.refundStatus(res.data.data.records[i].refundState)
							}
							if (flag) {
								this.refundData.totalPage = res.data.data.totalPage;
								this.refundData.records = this.refundData.records.concat(res.data.data.records)
							} else {
								this.refundData = res.data.data
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
			goToGoodsDetails(item) { //去往商品详情
				this.$Router.push({
					path: "/pages/goodsDetails/index",
					query: {
						goodsId: item.itemId
					}
				})
			},
			goToRefundDetails(item) { //去往售后详情
				this.$Router.push({
					path: "/pages/refundDetails/index",
					query: {
						returnOrderId: item.id
					}
				})
			}
		},
		onReachBottom() { //页面滚动到底部
			if (this.pageInfo.pageNo < this.refundData.totalPage) {
				this.pageInfo.pageNo++;
				this.getCustomerRefundOrderPage(true)
			}
		},
	}
</script>

<style>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.orderNoMsg {
		padding-top: 262rpx;
		width: 360rpx;
		margin: 0 auto;
	}

	.orderNoMsg image {
		width: 100%;
	}

	.orderNoMsgText {
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		margin-top: 55rpx;
	}
	.refund {
		width: 100%;
		background: #FFFFFF;
		margin-bottom: 20rpx;

	}

	.refundEveryTitle {
		width: 1005;
		height: 80rpx;
		line-height: 80rpx;
		position: relative;
		padding: 0 24rpx;
	}

	.goodsList {
		padding: 22rpx 0;
		display: flex;
		background: #fafafa;
		height: 194rpx;
	}

	.goodsList image {
		width: 150rpx;
		height: 150rpx;
		border: 1rpx solid #EEEEEE;
		border-radius: 10rpx;
		margin-left: 24rpx;
	}

	.goodsInfo {
		flex: 1;
		height: 150rpx;
		margin: 0 24rpx;
	}

	.goodsName {
		width: 1005;
		height: 72rpx;
		line-height: 36rpx;
		color: #666666;
	}

	.goodsSpce {
		width: 100%;
		margin-top: 5rpx;
		font-size: 24rpx;
		line-height: 27rpx;
		color: #999999;
	}

	.goodsPrice {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		color: #FF1558;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10rpx;
	}

	.priceSymbol {
		font-size: 24rpx;
	}

	.goodsNum {
		color: #666;
	}

	.allPrice {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: right;
		padding-right: 18rpx;
		font-size: 26rpx;
		color: #686868;
		border-bottom: 1rpx solid #E4E4E4;
	}

	.allPrice text {
		font-size: 28rpx;
	}

	.refundBtn {
		height: 98rpx;
		padding-right: 24rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.refundBox {
		background: #F5F5F5;
	}

	.showDetails {
		width: 150rpx;
		height: 52rpx;
		border: 1rpx solid #FF1558;
		color: #FF1558;
		border-radius: 8rpx;
		text-align: center;
		line-height: 50rpx;
	}

	.refundStatus {
		position: absolute;
		top: 0;
		right: 210rpx;
	}

	.refundText {
		position: absolute;
		top: 0;
		right: 24rpx;
		color: #FF1558;
	}
</style>
