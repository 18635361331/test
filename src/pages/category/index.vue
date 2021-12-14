<template>
	<view class="category">
		<view class="searchBox">
			<view class="searchIcon" @click="goToSearch"></view>
		</view>
		<view class="categoryParent">
			<view class="categoryParentTitle">
				<text class="everyTitle" :class="chooseItem=='category'?'active':''" @click="chooseItem='category'">分类</text>
				<text class="everyTitle" :class="chooseItem=='brand'?'active':''" @click="chooseItem='brand'">品牌</text>
			</view>
			<view class="categoryContent">
				<brand v-if="chooseItem=='brand'" :brandList='brandList'></brand>
				<category v-if="chooseItem=='category'" :categoryMenu='categoryMenu' :categoryList='categoryList' :categoryIndex='categoryIndex' @getMerchantList='getMerchantList'></category>
			</view>
		</view>
	</view>
</template>

<script>
	import brand from './children/brand.vue'
	import category from './children/category.vue'
	import api from '@/api/goods/index.js'
	export default{
		data(){
			return{
				chooseItem:"category",	//分类类型
				categoryMenu:[],	//分类左侧列表数据
				categoryList:[],	//分类二级三级数据
				brandList:[],
				categoryIndex:0
			}
		},
		components:{
			category,
			brand
		},
		methods:{
			getMerchantAppFrontendCategoryList(params,type){	//获取一级分类数据
				api.getMerchantAppFrontendCategoryList(params).then(res=>{
					if(res.data.code=='200'){
						if(res.data.data.length){
							this.categoryMenu = res.data.data;
							this.getMerchantList({
								parentId:this.categoryMenu[this.categoryIndex].id,
								type:this.categoryMenu[this.categoryIndex].type
							},0)
						}
					}else{
					}
				})
			},
			getMerchantList(params,index){	//获取二级分类数据
				this.zhuge.track("分类列表页-分类页-"+params.name)
				this.categoryIndex = index;
				uni.showLoading({
					title:"加载中..."
				})
				api.getMerchantAppFrontendCategoryList(params).then(res=>{
					if(res.data.code=='200'){
						uni.hideLoading()
						this.categoryList = res.data.data;
						for(let i=0;i<this.categoryList.length;i++){
							this.$set(this.categoryList[i],"children",[])
							this.getCategoryChildren({
								parentId:this.categoryList[i].id,
								type:this.categoryList[i].type
							},i)
						}
					}else{
					}
				})
			},
			getCategoryChildren(params,index){	//赋值三级数据
				api.getMerchantAppFrontendCategoryList(params).then(res=>{
					if(res.data.code=='200'){
						this.categoryList[index].children = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			brandAll(){	//获取品牌数据
				api.brandAll().then(res=>{
					if(res.data.code=='200'){
						this.brandList = res.data.data
					}else{
						
					}
				})
			},
			goToSearch(){
				// this.zhuge.track("分类页-搜索按钮")
				this.$Router.push({path:'/pages/search/index'})
			}
		},
		onShow() {
		},
		onLoad(){
			this.getMerchantAppFrontendCategoryList({parentId:0,type:"classification"});
			this.brandAll();
		}
	}
</script>

<style>
	.category{
		width: 100%;
		height: 100vh;
		/* #ifdef H5 */
			height: calc(100vh - 50px);
		/* #endif */
	}
	.searchBox{
		width: 100%;
		height:88rpx;
		display: flex;
		justify-content: flex-end;
	}
	.searchBox .searchIcon{
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_popover_search_180820@2x.png) no-repeat 50%;
		background-size: 40rpx 40rpx;
	}
	.categoryParent{
		width:100%;
		height: calc(100% - 88rpx);
	}
	.categoryParentTitle{
		height: 100rpx;
		width: 100%;
		border-bottom: 1px solid #e6e6e6;
		display: flex;
		align-items: flex-end;
		padding-left: 38rpx;
		vertical-align: middle;
	}
	.everyTitle{
		padding-bottom: 24rpx;
		margin-right: 40rpx;
		color: #333;		
		transition: font .15s;
	}
	.everyTitle.active{
		font-weight: 700;
		font-size: 60rpx;
		color: #000;
		line-height: 70rpx;
	}
	.categoryContent{
		width: 100%;
		height: calc(100% - 100rpx);
	}
</style>
