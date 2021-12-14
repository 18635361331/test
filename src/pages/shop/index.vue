<template>
	<view class="page">
		<view class="shopTitle">
			<view class="shopBg"></view>
			<view class="shopBgColor"></view>
			<view class="searchTitle" :class="isWeiXinApplets?'active':''">
				<!-- #ifndef MP-WEIXIN -->
				<view class="goBackBtn" @click="goBack(1)"></view>
				<!-- #endif  -->
				<view class="searchInput" @click="$Router.push({path:'/pages/shopSearch/index',query:{storeId:$Route.query.storeId,categoryLevel:shopInfo.categoryLevel}})">
					搜本店
				</view>
				<view class="kefuIcon" @click="openKefu(shopInfo.qiyuKefuGroupId)"></view>
				<view class="operateBtn" @click.stop="operateFlag=!operateFlag">
					<view class="operateList" v-show="operateFlag">
						<view class="everyOperate" @click="goHome">
							<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/home_more2@2x.png" mode=""></image>首页
						</view>
						<view class="everyOperate" @click="goMyPage">
							<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/my_more2@2x.png" mode=""></image>我的
						</view>
					</view>
				</view>
			</view>
			<view class="shopInfo">
				<view class="storeImage" :style="{backgroundImage:'url('+imgBaseUrls+shopInfo.images+')'}"></view>
				<view class="shopName" @click='goToStoreImpression'>
					<view class="shopNameTitle">{{shopInfo.storeName}} <image class="arrowIcon" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/go_group@2x.png" mode=""></image></view>
					<view class="shopUserNum">{{setFocusCount(shopInfo.focusCount)}}人关注</view>
				</view>
				<view class="shopFollow" v-if="!shopInfo.hasFocus" @click="addMerchantFollow">关注</view>
				<view class="shopFollowActive" v-if="shopInfo.hasFocus" @click="cancelFollowByMemberIdAndStoreId">已关注</view>
			</view>
			<view class="shopTab">
				<view class="everyTab" @click="chooseTab='homeMain'" :class="chooseTab=='homeMain'?'active':''">首页</view>
				<view class="everyTab" @click="chooseTab='goods'" :class="chooseTab=='goods'?'active':''">商品</view>
				<view class="everyTab" @click="chooseTab='promotion'" v-if="shopInfo.hasPromotion" :class="chooseTab=='promotion'?'active':''">促销</view>
				<view class="everyTab" @click="chooseTab='shangxin'" v-if="shopInfo.hasNewGoods" :class="chooseTab=='shangxin'?'active':''">上新</view>
				<view class="everyTab" @click="chooseTab='classification'" v-if="shopInfo.hasCategory" :class="chooseTab=='classification'?'active':''">分类</view>
			</view>
		</view>
		<view class="shopHome">
			<homeMain v-if="chooseTab=='homeMain'" @goToGoods='goToGoods'></homeMain>
			<goods v-if="chooseTab=='goods'"></goods>
			<promotion v-if="chooseTab=='promotion'"></promotion>
			<shangxin v-if="chooseTab=='shangxin'"></shangxin>
			<classification v-if="chooseTab=='classification'" :categoryLevel='shopInfo.categoryLevel'></classification>
		</view>
		
	</view>
</template>

<script>
	import merchantApi from '@/api/merchant/index.js';
	import decorateApi from '@/api/decorate/index.js';
	import homeMain from './homeMain.vue';
	import goods from './goods.vue'
	import promotion from './promotion.vue'
	import shangxin from './shangxin.vue'
	import classification from './classification.vue'
	import qiyuPlug from '@/plugInUnit/qiyuPlug.js'
	export default {
		mixins:[qiyuPlug],
		data() {
			return {
				imgBaseUrls: "",
				shopInfo: {},	//店铺基本信息
				// homeMainSwiper:[],	//店铺首页轮播图
				shopHeadBg:"",	//店铺头部图片
				chooseTab:"homeMain",	//选中的tab
				operateFlag:false,	//头部更多
				isWeiXinApplets:false,	//是否是微信小程序中
			}
		},
		onLoad() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.selectMerchantFollowDetailsList() //获取店铺基本信息
			// this.storeSearchNew()	//获取首页banner 和商品
		},
		methods: {
			goToGoods(){	//去往商品tab
				this.chooseTab = "goods"
			},
			selectMerchantFollowDetailsList() { //店铺基本信息
				merchantApi.selectMerchantFollowDetailsList(this.$Route.query.storeId).then(res => {
					if (res.data.code == 200) {
						this.shopInfo = res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			cancelFollowByMemberIdAndStoreId() { //取消关注
				merchantApi.cancelFollowByMemberIdAndStoreId(this.$Route.query.storeId).then(res => {
					if (res.data.code == 200) {
						this.shopInfo.focusCount--;
						this.shopInfo.hasFocus = !this.shopInfo.hasFocus
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			addMerchantFollow(){	//关注店铺
				merchantApi.addMerchantFollow(this.$Route.query.storeId).then(res=>{
					if(res.data.code==200){
						this.shopInfo.focusCount++;
						this.shopInfo.hasFocus = !this.shopInfo.hasFocus
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			setFocusCount(num) { //关注人数单位的设置
				let n = num;
				if (n >= 10000) {
					n = Math.ceil((n / 10000) * 10) / 10;
					n = n + "万";
				}
				return n;
			},
			goToStoreImpression(){
				this.$Router.push({path:"/pages/storeImpression/index",query:{
					storeId:this.$Route.query.storeId
				}})
			},
			goHome(){
				uni.switchTab({url:'/pages/index/index'})
			},
			goMyPage(){
				uni.switchTab({url:'/pages/my/index'})
			}
			// storeSearchNew(){	//获取店铺首页banner和商品
			// 	decorateApi.storeSearchNew(this.$Route.query.storeId).then(res=>{
			// 		if(res.data.code==200){
			// 			this.homeMainInfo = res.data.data;
			// 			if(res.data.data[0].moduleInfoList[0]){
			// 				this.shopHeadBg = this.imgBaseUrls + res.data.data[0].moduleInfoList[0].image;
			// 			}else{
			// 				this.shopHeadBg = require("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/shop_bg.png");
			// 			}
			// 			if(res.data.data[1].moduleInfoList.length){
			// 				this.homeMainSwiper = res.data.data[1].moduleInfoList
			// 			}
			// 		}else{
			// 			uni.showToast({
			// 				title:res.data.message,
			// 				icon:"none"
			// 			})
			// 		}
			// 	})
			// }
		},
		onShow() {
			// #ifdef MP-WEIXIN
			this.isWeiXinApplets = true;
			// #endif
			this.zhuge.track("店铺-落地页店铺id：",{
				'店铺id':this.$Route.query.storeId
			})	
		},
		onShareAppMessage(res) { //发送给朋友
			return {
				title: this.shopInfo.storeName,
				path: "/pages/shop/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")+"&storeId="+this.shopInfo.storeId,
			}
		},
		onShareTimeline(res) { //分享到朋友圈
			return {
				title: this.shopInfo.storeName,
				path: "/pages/shop/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")+"&storeId="+this.shopInfo.storeId,
			}
		},
		components:{
			homeMain,
			goods,
			promotion,
			shangxin,
			classification
		}
	}
</script>

<style scoped>
	.shopTitle {
		width: 100%;
		position: relative;
		top: 0;
		left: 0;
		height: 316rpx;
	}
	.shopBg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-repeat: no-repeat;
		background-position: 50%;
		background-size: cover;
	}
	.shopBgColor{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		position: absolute;
		left: 0;
		top: 0;
	}
	.searchTitle {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		position: relative;
		display: flex;
	}
	.searchTitle.active{
		padding-left: 20rpx;
	}
	.goBackBtn {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_write@2x.png) no-repeat 50%;
		background-size: 16rpx 28rpx;
	}

	.searchInput {
		background: rgba(255, 255, 255, .36) url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/search-write.png") no-repeat center;
		background-size: 13px 14px;
		background-position: 15px 6px;
		text-indent: 38px;
		color: #FFFFFF;
		height: 60rpx;
		border-radius: 27rpx;
		margin-top: 18rpx;
		line-height: 60rpx;
		flex: 1;
	}

	.kefuIcon {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/kfIcon.png) no-repeat 50%;
		background-size: 40rpx 40rpx;
	}

	.shopInfo {
		width: 100%;
		height: 80rpx;
		padding: 0 26rpx 0 36rpx;
		margin-top: 20rpx;
		display: flex;
	}

	.storeImage {
		width: 80rpx;
		height: 80rpx;
		border-radius: 6rpx;
		background-position: 50%;
		background-size: cover;
		background-repeat: no-repeat;
		z-index: 10;
	}

	.shopName {
		margin: 0 36rpx;
		flex: 1;
		height: 80rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		z-index: 1;
	}

	.shopNameTitle {
		margin-top: 4rpx;
		height: 44rpx;
		line-height: 44rpx;
	}
	
	.arrowIcon{
		width: 10rpx;
		height: 20rpx;
		margin-left: 20rpx;
	}

	.shopUserNum {
		font-size: 24rpx;
	}

	.shopFollow {
		width: 120rpx;
		height: 48rpx;
		margin-top: 16rpx;
		background: #FF1558 url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/follw-11.png?123546) no-repeat 0;
		background-size: 24rpx 24rpx;
		text-indent: 50rpx;
		background-position-x: 18rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		border-radius: 24rpx;
		line-height: 48rpx;
		z-index: 1;
	}

	.shopFollowActive {
		width: 120rpx;
		text-align: center;
		margin-top: 16rpx;
		font-size: 24rpx;
		border-radius: 24rpx;
		height: 48rpx;
		line-height: 46rpx;
		color: #FFFFFF;
		border: 1rpx solid #FFFFFF;
		z-index: 1;
	}
	.shopTab{
		width: 100%;
		height: 110rpx;
		margin-top: 20rpx;
		padding: 0 36rpx;
		display: flex;
	}
	.everyTab{
		margin-right: 40rpx;
		font-size: 30rpx;
		height: 110rpx;
		color: #FFFFFF;
		line-height: 140rpx;
		transition: font 0.15s;
		z-index: 1;
	}
	.everyTab.active{
		font-weight: 600;
		font-size: 60rpx;
		line-height: 110rpx;
	}
	.operateBtn {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/more_white.png) no-repeat 50%;
		background-size: 36rpx 8rpx;
		position: relative;
		z-index: 2;
	}
	
	.operateList {
		position: absolute;
		top: 80rpx;
		right: 24rpx;
		width: 200rpx;
		border-radius: 12rpx;
		box-shadow: 0 -1px 10px 0 rgba(0, 0, 0, 0.08);
		background: #fff;
	}
	
	.operateList .everyOperate {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 36rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.everyOperate image {
		width: 40rpx;
		height: 40rpx;
	}
</style>
