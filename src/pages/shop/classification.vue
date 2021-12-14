<template>
	<view class="page">
		<scroll-view class="scrollViewGoods" scroll-y="true">
			<shopSecondCategory v-if="categoryLevel==2"></shopSecondCategory>
			<shopThreeCategory v-if="categoryLevel==3"></shopThreeCategory>
		</scroll-view>
	</view>
</template>

<script>
	import shopSecondCategory from '@/common/model/shopSecondCategory.vue'
	import shopThreeCategory from '@/common/model/shopThreeCategory.vue'
	export default{
		props:["categoryLevel"],	//父级传递  判断渲染二级分类还是三级分类
		data(){
			return{
			}
		},
		methods:{
			
		},
		mounted() {
		},
		components:{
			shopSecondCategory,
			shopThreeCategory
		}
	}
</script>

<style scoped>
	
	.arrowIcon{
		position: absolute;
		right: 36rpx;
		top: 0;
		bottom: 0;
		margin: auto;
		display: inline-block;
		width: 8rpx;
		height: 20rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 8rpx 20rpx;
	}
	.scrollViewGoods{
		height: calc(100vh - 316rpx);
		padding-top: 10rpx;
	}
</style>
