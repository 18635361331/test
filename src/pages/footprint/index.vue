<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="scrollViewGoods" v-if="goodsInfo.records && goodsInfo.records.length">
			<singleGoods :goodsList='goodsInfo.records'></singleGoods>
		</view>
		<view class="noData" v-if="!goodsInfo.records || !goodsInfo.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/footprint_none@2x.png" mode="widthFix"></image>
			<view>
				暂无浏览任何商品
			</view>
		</view>
	</view>
</template>

<script>
	import goodsApi from '@/api/goods/index.js';
	import singleGoods from '@/renovation/singleGoods/index.vue';
	
	export default{
		data(){
			return{
				goodsInfo:{},
				pageInfo:{
					pageNo:1,
					pageSize:10
				},
				defaultTitleDto:{
					title:'我的足迹',
				}

			}
		},
		onShow() {
			this.zhuge.track("我的足迹页面")
			if(this.pageInfo.pageNo>1){
				this.pageInfo.pageNo = 1;
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
			}
			this.getGoodsFootprintList()	//获取我的足迹
		},
		methods:{
			getGoodsFootprintList(flag){
				goodsApi.getGoodsFootprintList(this.pageInfo).then(res=>{
					if(res.data.code==200){
						if(flag){
							this.goodsInfo.records = this.goodsInfo.records.concat(res.data.data.records);
							this.goodsInfo.totalPage = res.data.data.totalPage;
						}else{
							this.goodsInfo = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		onReachBottom(){	//页面滚动到底部
			if(this.pageInfo.pageNo<this.goodsInfo.totalPage){
				this.pageInfo.pageNo++;
				this.getGoodsFootprintList(true)
			}
		},
		components:{
			singleGoods
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
		background-color: #F5F5F5;
	}
	
	.scrollViewGoods{
		padding-top: 10rpx;
	}
	.noData{
		width: 360rpx;
		padding-top: 262rpx;
		text-align: center;
		margin: 0 auto;
	}
	.noData image{
		width: 100%;
	}
</style>
