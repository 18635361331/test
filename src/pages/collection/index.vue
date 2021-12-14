<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="scrollViewGoods">
			<singleGoods :goodsList='goodsInfo.records'></singleGoods>
			<view class="orderNoMsg" v-if="!goodsInfo.records || !goodsInfo.records.length">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collection_none@2x.png" mode="widthFix"></image>
				<view class="orderNoMsgText">
					暂无收藏！
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import singleGoods from '@/renovation/singleGoods/index.vue';
	import goodsApi from '@/api/goods/index.js'
	
	export default {
		data() {
			return {
				goodsInfo: {},
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				defaultTitleDto:{
					title:'我的收藏',
				}
			}
		},
		onShow() {
			this.zhuge.track("我的收藏")
			if (this.pageInfo.pageNo > 1) {
				this.pageInfo.pageNo = 1;
				uni.pageScrollTo({
					duration: 0,
					scrollTop: 0
				})
			}
			this.getGoodsFavoriteList()
		},
		methods: {
			getGoodsFavoriteList(flag) {
				goodsApi.getGoodsFavoriteList(this.pageInfo).then(res => {
					if (res.data.code == 200) {
						for (let i = 0; i < res.data.data.records.length; i++) {
							res.data.data.records[i].id = res.data.data.records[i].goodsId
						}
						if (flag) {
							this.goodsInfo.records = this.goodsInfo.records.concat(res.data.data.records);
							this.goodsInfo.totalPage = res.data.data.totalPage;
						} else {
							this.goodsInfo = res.data.data
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			}
		},
		onReachBottom() { //页面滚动到底部
			if (this.pageInfo.pageNo < this.goodsInfo.totalPage) {
				this.pageInfo.pageNo++;
				this.getGoodsFavoriteList(true)
			}
		},
		components: {
			singleGoods
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}

	.scrollViewGoods {
		padding-top: 10rpx;
		min-height: 100vh;
		/* #ifndef MP-WEIXIN */
		min-height: calc(100vh - 88rpx);
		/* #endif */
		background: #F5F5F5;
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
</style>
