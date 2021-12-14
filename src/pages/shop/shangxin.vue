<template>
	<view class="page">
		<scroll-view class="scrollViewGoods" scroll-y="true"  @scrolltolower='scrolltolower'>
			<view v-for="item,index in shangxinData.records" :key='index'>
				<view class="shangxinTitle">
					{{item.day}} 本店上新
				</view>
				<singleGoods :goodsList='item.items'></singleGoods>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import singleGoods from '@/renovation/singleGoods/index.vue';
	import goodsApi from '@/api/goods/index.js';
	export default{
		data(){
			return{
				pageInfo:{
					pageNo:1,
					pageSize:8
				},
				shangxinData:{
					records:{
						items:[]
					}
				}
			}
		},
		methods:{
			newGoodsList(flag){	//获取店铺上新数据
				goodsApi.newGoodsList({...this.pageInfo,belongStore:this.$Route.query.storeId}).then(res=>{
					if(res.data.code==200){
						if(flag){
							let length = this.shangxinData.records.length
							this.shangxinData.totalPage = res.data.data.totalPage;
							if(this.shangxinData.records[length-1].day==res.data.data.records[0].day){
								this.shangxinData.records[length-1].items = this.shangxinData.records[length-1].items.concat(res.data.data.records[0].items);
								let arr = res.data.data.records;
								arr.splice(0,1);
								this.shangxinData.records = this.shangxinData.records.concat(arr)
							}else{
								this.shangxinData.records = this.shangxinData.records.concat(res.data.data.records)
							}
						}else{
							this.shangxinData = res.data.data
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
				if(this.pageInfo.pageNo<this.shangxinData.totalPage){
					this.pageInfo.pageNo++;
					this.newGoodsList(true)
				}
			}
		},
		mounted() {
			this.newGoodsList()
		},
		components:{
			singleGoods
		}
	}
</script>

<style scoped>
	.shangxinTitle{
		width:100%;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		color: #999999;
		font-size: 26rpx;
	}
	.scrollViewGoods{
		height: calc(100vh - 316rpx);
		background:#F5F5F5;
		padding-top: 10rpx;
	}
</style>
