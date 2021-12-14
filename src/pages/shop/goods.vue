<template>
	<view class="page">
		<view class="searchCondition">
			<view class="everySort" :class="params.orderBy==''?'active':''" @click="params.orderBy='';params.order='desc';seachReast()">全部</view>
			<view class="everySort" :class="params.orderBy=='sales'?'active':''" @click="params.orderBy='sales';params.order='desc';seachReast()">销量</view>
			<view class="everySort" :class="params.orderBy=='newProduct'?'active':''" @click="params.orderBy='newProduct';params.order='desc';seachReast()">新品</view>
			<view class="everySort priceSort" :class="params.orderBy=='price'?'active':''" @click="params.orderBy='price';params.order=(params.order=='desc'?'asc':'desc');seachReast()">
				价格
				<text :class="params.order=='desc'?'active':''"></text>
			</view>
			<view class="everySort screen" :class="typeSwitch?'active':''" @click="typeSwitch=!typeSwitch">
				
			</view>
		</view>
		<scroll-view class="scrollViewGoods" scroll-y="true" @scrolltolower='scrolltolower' lower-threshold='150'>
			<!-- 单列商品 -->
			<singleGoods v-if='!typeSwitch' :goodsList='goodsInfo.records'></singleGoods>
			<!-- 双列商品 -->
			<biserialGoods v-if='typeSwitch' :goodsList='goodsInfo.records'></biserialGoods>
			<footNoMore v-if="goodsInfo.totalPage<=pageInfo.pageNo"></footNoMore>
			<!-- <view class="isMore">已经到底了</view> -->
		</scroll-view>
	</view>
</template>

<script>
	import goodsApi from '@/api/goods/index.js';
	import singleGoods from '@/renovation/singleGoods/index.vue';
	import biserialGoods from '@/renovation/biserialGoods/index.vue';
	import footNoMore from '@/components/footNoMore/index.vue';
	export default{
		data(){
			return{
				typeSwitch:true,
				params:{
					order: "desc",
					orderBy: "",
				},
				pageInfo:{
					pageNo:1,
					pageSize:8
				},
				goodsInfo:{
					
				}
			}
		},
		mounted() {
			this.params.storeId = this.$Route.query.storeId
			this.storeGoodsList()
		},
		methods:{
			storeGoodsList(flag){	//获取店铺tab商品列表
				goodsApi.storeGoodsList({...this.params,...this.pageInfo}).then(res=>{
					if(res.data.code==200){
						if(flag){	//分页合并数据
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
			seachReast(){	//顶部搜索栏切换时调用
				this.pageInfo.pageNo = 1;
				// this.scrollTop = this.scrollOldTop
				this.$nextTick(()=>{
					// this.scrollTop = 0;
					this.storeGoodsList()
				})
			},
			scrolltolower(){
				if(this.pageInfo.pageNo<=this.goodsInfo.totalPage){
					this.pageInfo.pageNo++;
					this.storeGoodsList(true)
				}
			}
		},
		components:{
			singleGoods,
			biserialGoods,
			footNoMore
		}
	}
</script>

<style scoped>
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
	.screen{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/class@2x.png) no-repeat 50%;
		background-size: 46rpx 46rpx;
	}
	.screen.active{
		background:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_list@2x.png) no-repeat 50%;
		background-size: 46rpx 46rpx;
	}
	.scrollViewGoods{
		height: calc(100vh - 404rpx);
		background:#F5F5F5;
		padding-top: 10rpx;
	}
</style>
