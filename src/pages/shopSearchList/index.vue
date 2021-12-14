<template>
	<view class="page">
		<view class="searchbox">
			<!-- #ifndef MP-WEIXIN -->
			<view class="goBack" @click="goBack(2)"></view>
			<!-- #endif  -->
			<view class="searchInput" :class="isWeiXinApplets?'active':''">
				<view class="searchIcon"></view>
				<view class="inputBox" @click="goToSearch">{{searchValue?searchValue:"搜索您喜欢的"}}</view>
				<view class="clearSearch" @click="searchValue='';goToSearch()"></view>
			</view>
			<view class="typeSwitch" @click="typeSwitch=!typeSwitch" :class="typeSwitch?'type':''"></view>
		</view>
		<view class="searchCondition">
			<view class="everySort" :class="searchParams.orderBy==''?'active':''" @click="searchParams.orderBy='';searchParams.order='desc';seachReast()">全部</view>
			<view class="everySort" :class="searchParams.orderBy=='sales'?'active':''" @click="searchParams.orderBy='sales';searchParams.order='desc';seachReast()">销量</view>
			<view class="everySort" :class="searchParams.orderBy=='newProduct'?'active':''" @click="searchParams.orderBy='newProduct';searchParams.order='desc';seachReast()">新品</view>
			<view class="everySort priceSort" :class="searchParams.orderBy=='price'?'active':''" @click="searchParams.orderBy='price';searchParams.order=(searchParams.order=='desc'?'asc':'desc');seachReast()">
				价格
				<text :class="searchParams.order=='desc'?'active':''"></text>
			</view>
			<!-- <view class="everySort screen" @click="openUniDrawer">
				筛选
				<text></text>
			</view> -->
		</view>
		<scroll-view v-if="goodsInfo.records.length" class="scrollViewGoods" @scroll="scroll" :scroll-top="scrollTop" scroll-y="true" @scrolltolower='scrolltolower' lower-threshold='150'>
			<!-- 单列商品 -->
			<singleGoods v-if='!typeSwitch' :goodsList='goodsInfo.records'></singleGoods>
			<!-- 双列商品 -->
			<biserialGoods v-if='typeSwitch' :goodsList='goodsInfo.records'></biserialGoods>
			<footNoMore v-if="goodsInfo.totalPage<=pageInfo.pageNo"></footNoMore>
			<!-- <view class="isMore">已经到底了</view> -->
		</scroll-view>
		<view class="notGoods" v-else>
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/footprint_none@2x.png" mode="widthFix"></image>
			<view>没有找到相关商品，换个搜索词试试～</view>
		</view>
		<uni-drawer ref='uniDrawer' :width=300  mode='right'> 
			<view class="drawerPrice">价格区间</view>
			<view class="drawerInput">
				<input type="number" placeholder="低价格" placeholderClass="placeholder" v-model="searchParams.priceRangeLeft" />
				<view class="drawerLine"></view>
				<input type="number" placeholder="高价格" placeholderClass="placeholder" v-model="searchParams.priceRangeRight" />
			</view>
			<view class="drawerBtn">
				<view class="resetBtn" @click="cancelPriceSearch">重置</view>
				<view class="sureBtn" @click="sureSearch">确定</view>
			</view>
		</uni-drawer> 
	</view>
</template>

<script>
	import searchApi from '@/api/search/index.js';
	import goodsApi from '@/api/goods/index.js';
	import singleGoods from '@/renovation/singleGoods/index.vue';
	import biserialGoods from '@/renovation/biserialGoods/index.vue';
	import footNoMore from '@/components/footNoMore/index.vue';
	export default {
		data() {
			return {
				typeSwitch: true,	//单列双列商品列表切换开关
				searchParams: {	//搜索条件
					frontCategoryId: "",
					order: "desc",
					orderBy: "",
					storeId:"",
					param:"",
					originWord:"",
					record:true
				},
				searchValue: "",	//搜索框中的值
				pageInfo: {	//分页
					pageNo: 1,
					pageSize: 6
				},
				goodsInfo:{	//商品列表数据
					totalPage:"",
					records:[]
				},
				scrollTop:0,//	滚动条位置
				scrollOldTop:0,
				isWeiXinApplets:false,	//是否是小程序
			}
		},
		methods: {
			bindGoodsList(type) { //查询商品列表
				if(!type){
					uni.showLoading({
						title: "加载中..."
					})
				}
				goodsApi.bindGoodsList(this.searchParams, this.pageInfo).then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						for(let i = 0;i<res.data.data.records.length;i++){
							res.data.data.records[i].unpromotionMinPrice = Number(res.data.data.records[i].defaultPrice)
						}
						if(type){	//分页合并数据
							this.goodsInfo.records = this.goodsInfo.records.concat(res.data.data.records);
							this.goodsInfo.totalPage = res.data.data.totalPage;
						}else{
							this.goodsInfo = res.data.data;
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			storeGoodsList(type){	//获取店铺商品列表
				goodsApi.storeGoodsList({...this.searchParams,...this.pageInfo}).then(res=>{
					if(res.data.code==200){
						if(type){	//分页合并数据
							this.goodsInfo.records = this.goodsInfo.records.concat(res.data.data.records);
							this.goodsInfo.totalPage = res.data.data.totalPage;
						}else{
							this.goodsInfo = res.data.data;
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			openUniDrawer(){
				this.$refs.uniDrawer.open()
			},
			scrolltolower(){	//滚动到底部
				if(this.pageInfo.pageNo>=this.goodsInfo.totalPage){
					return
				}
				this.pageInfo.pageNo++;
				if(this.$Route.query.frontCategoryId){
					this.bindGoodsList(true);
				}else{
					this.storeGoodsList(true)
				}
			},
			scroll(e){	//监听滚动条位置   在重置搜索条件时将滚动条滚回到顶部
				this.scrollOldTop = e.detail.scrollTop
			},
			cancelPriceSearch(){	//清空价格搜索
				this.searchParams.priceRangeLeft = "";
				this.searchParams.priceRangeRight = "";
				this.seachReast()
			},
			sureSearch(){	//筛选条件点击确定进行搜索
				if(Number(this.searchParams.priceRangeLeft)>Number(this.searchParams.priceRangeRight)){
					let price = this.searchParams.priceRangeLeft;
					this.searchParams.priceRangeLeft = this.searchParams.priceRangeRight;
					this.searchParams.priceRangeRight = price
				}
				this.$refs.uniDrawer.close()
				this.bindGoodsList()
			},
			seachReast(){	//顶部搜索栏切换时调用
				this.pageInfo.pageNo = 1;
				this.scrollTop = this.scrollOldTop
				this.$nextTick(()=>{
					this.scrollTop = 0;
					this.bindGoodsList()
				})
			},
			goToSearch(){	//去往搜索页面
				this.goBack(1)
			}
		},
		components: {
			singleGoods,
			biserialGoods,
			footNoMore,
		},
		onShow() {
			// #ifdef MP-WEIXIN
			this.isWeiXinApplets = true;
			// #endif
			this.zhuge.track("店铺搜索结果落地页")
			for (let i in this.searchParams) {
				this.searchParams[i] = this.$Route.query[i] ? this.$Route.query[i] : ""
			}
			this.pageInfo.pageNo = 1;
			this.searchValue = this.$Route.query.searchValue?decodeURIComponent(this.$Route.query.searchValue):""
			this.searchParams.order = "desc"
			if(this.$Route.query.frontCategoryId){
				this.bindGoodsList();
			}else{
				this.storeGoodsList()
			}
		}
	}
</script>

<style scoped>
	.searchbox {
		width: 100%;
		height: 88rpx;
		background: #FFFFFF;
		display: flex;
	}

	.goBack {
		width: 80rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_1@2x.png) no-repeat 50%;
		background-size: 16rpx 28rpx;
	}

	.searchInput {
		width: calc(100% - 168rpx);
		height: 60rpx;
		margin-top: 14rpx;
		position: relative;
		border-radius: 54rpx;
		background: #f5f5f5;
		display: flex;
	}
	.searchInput.active{
		width: calc(100% - 60rpx);
		margin-left: 20rpx;
	}
	.searchInput .inputBox {
		width: calc(100% - 120rpx);
		height: 100%;
		font-size: 24rpx;
		line-height: 60rpx;
	}
	.searchIcon {
		width: 60rpx;
		height: 60rpx;
		margin-left: 24rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/search@2x.png) no-repeat 50%;
		background-size: 28rpx 30rpx;
	}

	.clearSearch {
		width: 74rpx;
		height: 60rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png) no-repeat 50%;
		background-size: 26rpx 26rpx;
	}

	.typeSwitch {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/class@2x.png) no-repeat 50%;
		background-size: 46rpx 46rpx;
	}

	.typeSwitch.type {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_list@2x.png) no-repeat 50%;
		background-size: 46rpx 46rpx;
	}

	.priceSort {
		width: 100;
	}

	.screen text {
		display: inline-block;
		width: 16rpx;
		height: 18rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/fill_1@2x.png) no-repeat 50%;
		background-size: 16rpx 18rpx;
	}

	.searchCondition {
		width: 100%;
		height: 88rpx;
		display: flex;
	}

	.everySort {
		width: 25%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.everySort text {
		margin-left: 8rpx;
	}

	.priceSort text {
		display: inline-block;
		width: 10rpx;
		height: 16rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_7copy5@2x.png) no-repeat 50%;
		background-size: 10rpx 16rpx;
	}

	.priceSort.active text {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/path@2x.png) no-repeat 50%;
		transform: rotate(180deg);
		background-size: 10rpx 16rpx;
	}

	.priceSort.active text.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/path@2x.png) no-repeat 50%;
		background-size: 10rpx 16rpx;
		transform: rotate(0deg);
	}

	.everySort.active {
		font-size: 40rpx;
		font-weight: 700;
		transition: all 0.2s;
	}
	.scrollViewGoods{
		height: calc(100vh - 176rpx);
		background:#F5F5F5;
	}
	
	.drawerPrice{
		width: 100%;
		padding: 60rpx 0 40rpx 28rpx;
		font-size: 34rpx;
		line-height: 30rpx;
		color: #000;
		font-weight: 700;
	}
	.drawerInput{
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
	}
	.drawerLine{
		width: 30rpx;
		height: 2rpx;
		background: #787878;
		margin-top: 30rpx;
	}
	.drawerInput input{
		display: inline-block;
		width: 250rpx;
		padding:  0 24rpx;
		height: 60rpx;
		border-radius: 100rpx;
		background: #F5F5F5;
		text-align: center;
		line-height: 60rpx;
	}
	.drawerBtn{
		width: 100%;
		height: 88rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		border-top: 1px solid #E6E6E6;
		display: flex;
	}
	.drawerBtn view{
		width: 50%;
		text-align: center;
		line-height: 88rpx;
	}
	.sureBtn{
		background: #ff1558;
		color: #fff;
	}
	.notGoods{
		margin: 0 auto;
		width: 100%;
		margin-top: 100rpx;
		text-align: center;
	}
	.notGoods image{
		width: 300rpx;
	}
	.notGoods view{
		width: 80%;
		font-size: 32rpx;
		color: #999999;
		line-height: 54rpx;
		margin: 30rpx auto;
	}
</style>
