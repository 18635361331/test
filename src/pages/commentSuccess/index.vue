<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="successTitle">
			感谢{{$Route.query.status?'追评':'评价'}}~
		</view>
		<view class="commonFirst" v-if="queryMyUnCommentInfo && queryMyUnCommentInfo.unComment && queryMyUnCommentInfo.unComment.length">
			<view class="commonTitle">
				继续评价领积分
			</view>
			<view class="goodsItem" v-for="item,index in queryMyUnCommentInfo.unComment" :key='index'>
				<view class="goodsInfo" v-for='v,i in item.cmOrderDetailDTOS' :key='i'>
					<image :src="imgBaseUrls+v.goodsImage" mode=""></image>
					<view class="goodsDetails">
						<view class="goodsName ellipsis-two">
							{{v.name}}
						</view>
						<view class="intergrate">
							评价可获得10积分哦~
						</view>
					</view>
				</view>
				<view class="goodsBtn">
					<text @click="$Router.push({path:'/pages/orderDetails/index',query:{orderId:item.id}})">查看订单</text>
					<text class='active' @click="$Router.push({path:'/pages/publishEvaluate/index',query:{orderId:item.id}})">评价有礼</text>
				</view>
			</view>
		</view>
		<view class="commentSecond" v-if="queryMyUnCommentInfo && queryMyUnCommentInfo.unAppendComment && queryMyUnCommentInfo.unAppendComment.length">
			<view class="commonTitle">
				这些商品还有机会追评一下
			</view>
			<view class="goodsContainer">
				<view class="goodsItem" v-for="item,index in queryMyUnCommentInfo.unAppendComment" :key='index'>
					<view class="goodsInfo" v-for='v,i in item.cmOrderDetailDTOS' :key='i'>
						<image :src="imgBaseUrls+v.goodsImage" mode=""></image>
						<view class="goodsDetails">
							<view class="goodsName ellipsis-two">
								{{v.name}}
							</view>
							<view class="intergrate">
								评价可获得10积分哦~
							</view>
						</view>
					</view>
					<view class="goodsBtn">
						<text @click="$Router.push({path:'/pages/orderDetails/index',query:{orderId:item.id}})">查看订单</text>
						<text class='active' @click="$Router.push({path:'/pages/publishEvaluate/index',query:{orderId:item.id,status:1}})">评价有礼</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js'
	export default {
		data() {
			return {
				queryMyUnCommentInfo: {

				},
				imgBaseUrls: "",
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				defaultTitleDto:{
					title:'评价成功',
				}
			}
		},
		methods: {
			queryMyUnCommentOrders() {
				tradeApi.queryMyUnCommentOrders(this.pageInfo).then(res => {
					if (res.data.code == 200) {
						this.queryMyUnCommentInfo = res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			}
		},
		onShow() {
			this.zhuge.track("评价成功")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.queryMyUnCommentOrders()
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.arrow {
		width: 100rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
	}

	.successTitle {
		width: 100%;
		height: 200rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/comment_success.png) no-repeat;
		background-size: 100% 100%;
		color: #FFFFFF;
		font-size: 36rpx;
		padding-bottom: 22rpx;
		text-align: center;
		line-height: 200rpx;
	}

	.commonFirst {
		padding-top: 2rpx;
	}

	.commonTitle {
		font-size: 34rpx;
		line-height: 28rpx;
		margin: 72rpx auto 30rpx 36rpx;
	}

	.goodsItem {
		width: 100%;
		padding: 0 24rpx;
	}

	.goodsInfo {
		display: flex;
		margin-top: 24rpx;
		height: 176rpx;
	}

	.goodsInfo image {
		width: 128rpx;
		height: 128rpx;
		margin-right: 24rpx;
	}

	.goodsDetails {
		flex: 1;
	}

	.goodsName {
		line-height: 34rpx;
		color: #333333;
		padding-top: 11rpx;
	}

	.intergrate {
		line-height: 34rpx;
		color: #999999;
		margin-top: 10rpx;
	}

	.commentSecond {
		padding-top: 10rpx;
	}

	.goodsBtn {
		height: 88rpx;
		text-align: right;
		line-height: 88rpx;
	}
	.goodsBtn text{
		display: inline-block;
		width: 152rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		margin-left: 24rpx;
		font-size: 26rpx;
		color: #666;
		border: 1rpx solid #B2B2B2;
		border-radius: 10rpx;
	}
	.goodsBtn text.active{
		color: #FF1558;
		border: 1rpx solid #FF1558;
	}
</style>
