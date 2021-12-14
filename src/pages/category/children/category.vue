<template>
	<view class="categoryBox page">
		<scroll-view class="categoryMenu" scroll-y="true" show-scrollbar="false">
			<view class="mentList ellipsis-one"  @click="$emit('getMerchantList',{parentId:item.id,type:item.type,name:item.name},index)" :class="categoryIndex==index?'active':''" v-for="item,index in categoryMenu" :key='index'>{{item.name}}
				<view class="activeIcon" v-if="categoryIndex==index"></view>
			</view>
		</scroll-view>
		<scroll-view class="categoryPage" scroll-y="true">
			<view class="categoryList" v-for="item,index in categoryList" :key='item.id'>
				<view class="categoryTitle">{{item.name}}</view>
				<view class="everyContent" :class="index==categoryList.length-1?'isLast':''">
					<view class="everyList" @click="goGoodsList(list)" v-if="(list.isHadItem==null && list.bind &&  JSON.parse(list.bind)['ids'].length) || list.isHadItem" v-for="list,index in item.children" :key='index'>
						<image :src="imgBaseUrls+list.image" mode=""></image>
						<view class="ellipsis-one">
							{{list.name}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		props:["categoryMenu","categoryList","categoryIndex"],
		data(){
			return{
				imgBaseUrls: "",
			}
		},
		mounted() {
			// this.zhuge.track("分类页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		methods:{
			goGoodsList(item){
				this.$Router.push({
					path:"/pages/goodsList/index",
					query:{
						frontCategoryId:item.id,
						searchValue:item.name
					}
				})
			}
		}
	}
</script>

<style scoped>
	.categoryBox{
		width: 100%;
		height: 100%;
		display: flex;
	}
	.categoryMenu{
		width: 184rpx;
		height: 100%;
		background: #f8f8fc;
		color: #666;
	}
	.mentList{
		width: 100%;
		height: 102rpx;
		line-height: 102rpx;
		text-align: center;
		position: relative;
	}
	.mentList.active{
		background: #fff;
		font-weight: 600;
		color: #000000;
	}
	.activeIcon{
		width: 6rpx;
		height: 36rpx;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background: #ff1558;
	}
	.categoryPage{
		width: calc(100% - 184rpx);
		height: 100%;
		padding: 0 30rpx;
	}
	.categoryTitle{
		width: 100%;
		height: 120rpx;
		line-height: 37rpx;
		font-weight: 600;
		padding-left: 18rpx;
		padding-top: 36rpx;
	}
	.everyContent{
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid #e6e6e6;
		padding-bottom: 35rpx;
	}
	.isLast.everyContent{
		border: none;
	}
	.everyList{
		width: 130rpx;
		height: 200rpx;
		margin-left: 30rpx;
		text-align: center;
	}
	.everyList image{
		width: 130rpx;
		height: 130rpx;
	}
	.everyList view{
		font-size: 22rpx;
		color: #333;
		text-align: center;
	}
</style>
