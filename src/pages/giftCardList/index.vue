<template>
	<view class="page giftCardList">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="giftCardTabFoot fixedPosition">
			<view class="everyTab" :class="tabType==0?'active':''" @click="tabType=0">
				<image v-if="tabType!=0" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/recommend_1@2x.png" mode="widthFix"></image>
				<image v-else src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/recommend_2@2x.png" mode="widthFix"></image>
				<view class='tabText'>
					推荐
				</view>
			</view>
			<view class="everyTab" :class="tabType==1?'active':''" @click="tabType=1">
				<image v-if="tabType!=1" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/preference_1@2x.png" mode="widthFix"></image>
				<image v-else src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/preference_2@2x.png" mode="widthFix"></image>
				<view class='tabText'>
					优选
				</view>
			</view>
		</view>
		<view>
			<!-- 优选 -->
			<optimization v-if="tabType==1" :optimizLabelList='optimizLabelList'></optimization>
			<!-- 推荐 -->
			<recommend v-if="tabType==0" :recommendLists='recommendLists' :carouselList='carouselList'></recommend>
		</view>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js' 
	import optimization from './optimization.vue'
	import recommend from './recommend.vue'
	export default{
		data(){
			return{
				defaultTitleDto:{
					title:'礼卡专区',
				},
				tabType:0,
				optimizLabelList:[],	//美礼卡优选列表
				recommendLists:{},	//美礼卡精心推荐列表
				pageInfo:{
					pageNo:1,
					pageSize:10
				},
				carouselList:[],	//推荐列表
				
			}
		},
		methods:{
			labelList(){	//美礼卡优选列表
				appApi.labelList().then(res=>{
					if(res.data.code==200){
						this.optimizLabelList = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			recommendList(flag){	//美礼卡精心推荐列表
				appApi.recommendList(this.pageInfo).then(res=>{
					if(res.data.code==200){
						if(flag){
							this.recommendLists.records = this.recommendLists.records.concat(res.data.data.records);
							this.recommendLists.totalPage = res.data.data.totalPage;
						}else{
							this.recommendLists = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			carousel(){	//美礼卡推荐列表
				appApi.carousel().then(res=>{
					if(res.data.code==200){
						this.carouselList = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		mounted() {
			
		},
		components:{
			optimization,
			recommend
		},
		onReachBottom(){	//页面滚动到底部
			if(this.pageInfo.pageNo<this.recommendLists.totalPage){
				this.pageInfo.pageNo++;
				this.recommendList(true)
			}
		},
		onLoad(){
			this.labelList();
			this.recommendList();
			this.carousel()
		}
	}
</script>

<style scoped>
	.giftCardList{
		width: 100%;
		padding-bottom: 98rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
		background-color: #F5F5F5;
	}
	.giftCardTabFoot{
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 1;
	}
	.everyTab{
		width: 50%;
		height: 98rpx;
		text-align: center;
	}
	.everyTab image{
		width: 60rpx;
		height: 60rpx;
	}
	.everyTab.active .tabText{
		color: #FF1558;
	}
	.tabText{
		line-height: 40rpx;
		margin-top: -16rpx;
	}
</style>
