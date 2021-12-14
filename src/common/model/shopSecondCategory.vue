<template>
	<view class="page">
		<view class="categoryList" v-for="item,index in category" :key='item.id'>
			<view class="category" @click="goToGoodsList(item)">
				<text>{{item.name}}</text>
				<text class="arrowIcon"></text>
			</view>
			<view class="categoryChildren" v-if="item.children&&item.children.length">
				<view class="categoryItem" @click="goToGoodsList(v)" v-for="v,i in item.children" :key='i'>
					{{v.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsApi from '@/api/goods/index.js'
	export default{
		data(){
			return{
				category:[]
			}
		},
		methods:{
			storeCategory(){	//获取分类列表
				goodsApi.storeCategory(this.$Route.query.storeId).then(res=>{
					if(res.data.code==200){
						this.category = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToGoodsList(item){
				this.$Router.push({
					path:"/pages/shopSearchList/index",
					query:{
						frontCategoryId:item.id,
						storeId:this.$Route.query.storeId,
						searchValue:item.name
					}
				})
			}
		},
		mounted() {
			this.storeCategory()
		}
	}
</script>

<style scoped>
	.category{
		width: 100%;
		height: 110rpx;
		line-height: 110rpx;
		padding: 0 36rpx;
		font-weight: 600;
		position: relative;
	}
	.categoryChildren{
		width: 100%;
		padding: 0 36rpx 32rpx;
	}
	.categoryItem{
		width: 325rpx;
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 36rpx;
		background: #f8f8fc;
		margin-bottom: 6rpx;
		font-size: 24rpx;
		display: inline-block;
		margin-right: 6rpx;
	}
</style>
