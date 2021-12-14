<template>
	<view class="page">
		<view class="promtion">
			<view class="everyTab" @click="params.promotionType=item.promotionType;getPromotionItems()" v-for="item,index in tabList" :key='item.promotionType' :class="params.promotionType==item.promotionType?'active':''">
				{{item.promotionName}}
			</view>
		</view>
		<scroll-view class="scrollViewGoods" scroll-y="true" lower-threshold='150' @scrolltolower='scrolltolower'>
			<biserialGoods :goodsList='goodsInfo.records'></biserialGoods>
		</scroll-view>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js';
	import biserialGoods from '@/renovation/biserialGoods/index.vue';
	export default{
		data(){
			return{
				params:{
					pageNo:1,
					pageSize:8,
					promotionType:"3",
					storeId:""
				},
				tabList:[],
				goodsInfo:{
					
				}
			}
		},
		methods:{
			getPromotionType(){	//获取促销tab
				appApi.getPromotionType(this.$Route.query.storeId).then(res=>{
					if(res.data.code==200){
						this.tabList = res.data.data;
						this.params.promotionType = res.data.data[0].promotionType
						this.getPromotionItems()
					}else{
						uni.showToast({
							title:res.dara.message,
							icon:"none"
						})
					}
				})
			},
			getPromotionItems(flag){	//获取促销商品
				appApi.getPromotionItems(this.params).then(res=>{
					if(res.data.code==200){
						if (flag) {
							this.goodsInfo.records = this.goodsInfo.records.concat(res.data.data.records)
							this.goodsInfo.totalPage = res.data.data.totalPage
						} else {
							this.goodsInfo = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			scrolltolower(){
				if(this.params.pageNo<=this.goodsInfo.totalPage){
					this.params.pageNo++;
					this.getPromotionItems(true)
				}
			}
		},
		components:{
			biserialGoods
		},
		mounted() {
			this.params.storeId = this.$Route.query.storeId
			this.getPromotionType()
		}
	}
</script>

<style scoped>
	.promtion{
		width: 100%;
		padding: 0 18rpx;
		display: flex;
	}
	.everyTab{
		height: 88rpx;
		line-height: 88rpx;
		margin: 0 18rpx;
	}
	.everyTab.active{
		font-size: 40rpx;
		font-weight: 700;
		transition: all 0.2s;
	}
	.scrollViewGoods{
		background:#F5F5F5;
		height: calc(100vh - 316rpx);
		padding-top: 10rpx;
	}
</style>
