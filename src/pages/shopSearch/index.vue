<template>
	<view class="page commonPageTitle">
		<view class="collectTitle">
			<!-- #ifndef MP-WEIXIN -->
			<view class="goBackBtn" @click="goBack(1)"></view>
			<!-- #endif  -->
			<view class="title" :class="isWeiXinApplets?'active':''">
				<view class="searcIcon"></view>
				<input type="text" v-model="searchValue" @input='linkWords' placeholder-style="color:#ccc" placeholder="搜本店" class="searchInput" />
				<view class="clearIcon" v-if="searchValue" @click="searchValue=''"></view>
			</view>
			<view class="searchBtn" @click="goToItemList({name:searchValue})">搜索</view>
		</view>
		<view class="wordSearch" v-for="item,index in keyWords" :key='item.id' @click="goToItemList(item)">
			<text class="searchType">商品</text>
			<text class="searchText">{{item.name}}</text>
			<text class="searchIcon"></text>
		</view>
		<shopSecondCategory v-if="!searchValue && categoryLevel==2"></shopSecondCategory>
		<shopThreeCategory v-if="!searchValue && categoryLevel==3"></shopThreeCategory?>
	</view>
</template>

<script>
	import shopSecondCategory from '@/common/model/shopSecondCategory.vue';
	import shopThreeCategory from '@/common/model/shopThreeCategory.vue'
	import searchApi from '@/api/search/index.js'
	export default {
		data() {
			return {
				searchValue: "",
				keyWords: [],
				isWeiXinApplets:false,	//是否是小程序
				categoryLevel:""
			}
		},
		methods: {
			linkWords() {
				searchApi.linkWords({
					param: this.searchValue,
					storeId: this.$Route.query.storeId
				}).then(res => {
					if (res.data.code == 200) {
						this.keyWords = res.data.data.keyWords
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			goToItemList(item) { //去往商品列表 关键字搜索
				this.$Router.replace({
					path: "/pages/shopSearchList/index",
					query: {
						storeId:this.$Route.query.storeId,
						searchValue:item.name,
						originWord:item.name,
						param:item.name
						
					}
				})
			},
		},
		onShow() {
			// #ifdef MP-WEIXIN
			this.isWeiXinApplets = true;
			// #endif
			this.zhuge.track("店铺搜索-落地页");
			this.categoryLevel = this.$Route.query.categoryLevel
		},
		components: {
			shopSecondCategory,
			shopThreeCategory
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
		height: 100vh;
	}

	.collectTitle .title {
		background-color: #F5F5F5;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 54rpx;
		margin-top: 14rpx;
		display: flex;
		align-items: center;
		/* #ifdef MP-WEIXIN */
		width: calc(100% - 130rpx);
		/* #endif */
	}
	.collectTitle .title.active{
		margin-left: 20rpx;
	}

	.searcIcon {
		width: 60rpx;
		height: 60rpx;
		margin-left: 24rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_popover_search_180820@2x.png) no-repeat 50%;
		background-size: 28rpx 30rpx;
	}

	.searchInput {
		width: 73%;
		margin-left: 2rpx;
		font-size: 26rpx;
		padding: 0;
		line-height: 60rpx;
		text-align: left;
	}

	.clearIcon {
		width: 74rpx;
		height: 60rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/search_back@2x.png) no-repeat 50%;
		background-size: 26rpx 26rpx;
	}

	.searchBtn {
		width: 108rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 26rpx;
		margin-left: 10rpx;
		color: #333333;
		position: absolute;
		right: 0;
	}

	.wordSearch {
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		padding: 0 24rpx;
	}

	.searchIcon {
		width: 64rpx;
		height: 64rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_popover_search_180820@2x.png) no-repeat 50%;
		background-size: 40rpx 40rpx;
	}

	.searchType {
		padding-left: 12rpx;
		color: #CCCCCC;
	}

	.searchText {
		flex: 1;
		color: #333;
		margin-left: 32rpx;
	}
</style>
