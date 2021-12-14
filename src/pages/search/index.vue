<template>
	<view class="page commonPageTitle">
		<view class="collectTitle">
			<!-- #ifndef MP-WEIXIN -->
			<view class="goBackBtn" @click="goBack(1)"></view>
			<!-- #endif  -->
			<view class="title" :class="isWeiXinApplets?'active':''">
				<view class="searcIcon"></view>
				<input type="text" v-model="searchValue" focus placeholderClass="placeholderValue" :placeholder="placeholderValue"
				 @input='linkWords' class="searchInput" />
				<view class="clearIcon" v-if="searchValue" @click="searchValue=''"></view>
			</view>
			<view class="searchBtn" @click="goToItemList({name:searchValue?searchValue:placeholderValue})">搜索</view>
		</view>
		<view class="historyBox" v-if="!searchValue">
			<view class="searchTitle" v-if="historyList.length">
				<text>最近搜索</text>
				<text class="delHistoryIcon" @click='delHistorySearch'></text>
			</view>
			<view class="searchLabel" v-if="historyList.length">
				<view class="everySearch" v-for="item,index in historyList" :key="index">
					<text v-if="item.searchType==0" @click='goToItemList({name:item.searchWord})'>{{item.searchWord}}</text>
					<text v-if="item.searchType==1" @click='goToShopList({name:item.searchWord})'>{{'"'+item.searchWord+'"'}}店铺</text>
					<text v-if="item.searchType==2" @click='goToGoodsListCategory({name:item.searchWord,frontCategoryId:item.searchTypeId})'>"{{item.searchWord}}"分类</text>
					<text v-if="item.searchType==3" @click='goToGoodsListBrand({name:item.searchWord,brandId:item.searchTypeId})'>"{{item.searchWord}}"品牌</text>
				</view>
			</view>
		</view>
		<view class="historyBox" v-if="!searchValue">
			<view class="searchTitle">
				<text>热门推荐</text>
			</view>
			<view class="searchLabel">
				<view class="everySearch" v-for="item,index in hostList" :key='index' @click="goToItemList({name:item.value})">
					{{item.value}}
				</view>
			</view>
		</view>
		<view class="searchList" v-if="searchValue">
			<view class="everySearchView" v-if="searchList.storeExist" @click="goToShopList({name:searchValue})">
				<text class="searchType">店铺</text>
				<text class="searchText">搜索“{{searchValue}}”相关店铺</text>
				<text class="searchIcon"></text>
			</view>
			<view class="everySearchView" @click="goToGoodsListCategory(item)" v-if="searchList.frontCategories" v-for="item,index in searchList.frontCategories"
			 :key='index'>
				<text class="searchType">分类</text>
				<text class="searchText">{{item.name}}</text>
				<text class="searchIcon"></text>
			</view>
			<view class="everySearchView" @click="goToGoodsListBrand(item)" v-if="searchList.brands" v-for="item,index in searchList.brands"
			 :key='index'>
				<text class="searchType">品牌</text>
				<text class="searchText">{{item.name}}</text>
				<text class="searchIcon"></text>
			</view>
			<view class="everySearchView" @click="goToItemList(item)" v-if="searchList.keyWords" v-for="item,index in searchList.keyWords"
			 :key='index'>
				<text class="searchType">商品</text>
				<text class="searchText">{{item.name}}</text>
				<text class="searchIcon"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import searchApi from '@/api/search/index.js'
	export default {
		data() {
			return {
				historyList: [], //搜索历史记录列表
				hostList: [], //热门搜索列表
				searchValue: "", //搜索内容
				placeholderValue: "",
				searchList: [], //搜索结果
				isWeiXinApplets: false, //是否是小程序
			}
		},
		onShow() {
			// #ifdef MP-WEIXIN
			this.isWeiXinApplets = true;
			// #endif
			this.zhuge.track("搜索-落地页")
			this.placeholderValue = this.$Route.query.searchValue
			if (uni.getStorageSync("sessionId")) {
				this.historySearch();
			}
			this.hotWords();
			if (this.searchValue) {
				this.linkWords()
			}
		},
		methods: {
			historySearch() { //历史记录搜索
				searchApi.historySearch().then(res => {
					if (res.data.code == 200) {
						this.historyList = res.data.data;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			hotWords() { //热门搜索
				searchApi.hotWords().then(res => {
					if (res.data.code == 200) {
						this.hostList = res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			linkWords() { //关键词搜索
				searchApi.linkWords({
					param: this.searchValue,
					storeId: ""
				}).then(res => {
					if (res.data.code == 200) {
						this.searchList = res.data.data;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			delHistorySearch() { //删除历史记录
				searchApi.delHistorySearch().then(res => {
					if (res.data.code == 200) {
						this.historyList.splice(0)
					} else {
						uni.showToast({
							title: res.data.data,
							icon: "none"
						})
					}
				})
			},
			goToGoodsListCategory(item) { //去往商品列表 分类筛选
				this.$Router.replace({
					path: "/pages/goodsList/index",
					query: {
						searchValue: item.name,
						frontCategoryId: item.frontCategoryId
					}
				})
			},
			goToItemList(item) { //去往商品列表 关键字搜索
				this.$Router.replace({
					path: "/pages/goodsList/index",
					query: {
						searchValue: item.name,
						param: item.name,
						originWord: item.name,
						record: true
					}
				})
			},
			goToGoodsListBrand(item) { //去往商品列表  品牌筛选-
				this.$Router.replace({
					path: "/pages/goodsList/index",
					query: {
						searchValue: item.name,
						brandId: item.brandId
					}
				})
			},
			goToShopList(item) { //去往店铺列表
				this.$Router.replace({
					path: "/pages/shopList/index",
					query: {
						name: item.name
					}
				})
			}
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
	}

	.collectTitle {
		justify-content: space-between;
	}


	.collectTitle .title {
		width: calc(100% - 60rpx);
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 14rpx;
		border-radius: 54rpx;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
		position: relative;
	}

	.collectTitle .title.active {
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
		width: 100%;
		height: 60rpx;
		margin-left: 2rpx;
		/* padding-top: 10rpx; */
		font-size: 26rpx;
		padding: 4rpx 0;
		line-height: 48rpx;
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
	}

	.historyBox {
		width: 100%;
		margin-top: 50rpx;
		position: relative;
	}

	.searchTitle {
		display: flex;
		font-size: 34rpx;
		font-weight: 700;
		align-items: center;
		justify-content: space-between;
		padding: 0 24rpx;
	}

	.delHistoryIcon {
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/remove@2x.png) no-repeat 50%;
		background-size: 40rpx 40rpx;
	}

	.searchLabel {
		width: 100%;
		padding: 0 24rpx;
		padding-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.everySearch {
		padding: 14rpx 30rpx;
		margin-right: 24rpx;
		background: #F5F5F5;
		margin-bottom: 24rpx;
		border-radius: 50rpx;
	}

	.searchList {
		width: 100%;
		height: calc(100vh - 88rpx);
		padding: 0 24rpx;
	}

	.everySearchView {
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
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
