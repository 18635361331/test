<template>
	<view class="page favorablePage">
		<view class="favorable">
			<image v-if="searchParams.type!=0 || (evaluate.records && evaluate.records.length)" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_8@2x.png" mode=""></image>
			<text v-if="searchParams.type!=0 || (evaluate.records && evaluate.records.length)" class="praiseRatio">{{evaluateNum.praiseRatio?evaluateNum.praiseRatio:0}}%</text>
			<text v-if="searchParams.type!=0 || (evaluate.records && evaluate.records.length)" class="praiseText">好评</text>
		</view>
		<view class="evaluateTabs">
			<view  v-if="searchParams.type!=0 || (evaluate.records && evaluate.records.length)" @click='typeChange(item)' v-for="item,index in evaluateType" :class="searchParams.type==item.type?'active':''" :key='index'>
				{{item.name}}&nbsp;&nbsp;{{evaluateNum.goodsSkuCommentCounts[index].count?evaluateNum.goodsSkuCommentCounts[index].count:0}}
			</view>
		</view>
		<view class="everyEvaluate" v-if="evaluate.records.length" v-for="item,index in evaluate.records" :key="item.id">
			<div class="evaluateTitle">
				<view class="userInfoHead">
					<image v-if="item.smallIcon" :src="imgBaseUrls+item.smallIcon" mode=""></image>
					<image v-if="!item.smallIcon" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/default_phone.png" mode=""></image>
				</view>
				<view class="userInfo">
					<view>{{item.userName}}</view>
					<view class="evaluateImg">
						<image v-for="list,index in item.goodsReputation" :key='index' src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collectionTrue.png" mode=""></image>
					</view>
				</view>
				<view class="titleTime">{{$utils.formatDate(item.createdTime,"yyyy-MM-dd")}}</view>
			</div>
			<!-- 规格属性 -->
			<view class="evaluateSku ellipsis-one">{{item.saleFieldValue?item.saleFieldValue:""}}</view>
			<!-- 评价 -->
			<view class="evaluateComment">{{item.description?item.description:""}}</view>
			<!-- 图片 -->
			<view class="imageLists" v-if="item.goodsSkuCommentPictureDtos && item.goodsSkuCommentPictureDtos.length">
				<view class="evaluateImage" v-for="value,index in item.goodsSkuCommentPictureDtos" :key='index' :style="{backgroundImage:'url('+imgBaseUrls+value.image+')'}" @click="reviewImg(item.id,value.id)"></view>
			</view>
			<view class="review" v-if="item.appendText">追评</view>
			<!-- 追评文案 -->
			<view class="evaluateComment" v-if="item.appendText">{{item.appendText}}</view>
			<!-- 追评图片 -->
			<view class="imageLists">
				<view class="evaluateImage" v-for="value,index in item.appendCommentImages" :key='index' :style="{backgroundImage:'url('+imgBaseUrls+value+')'}"></view>
			</view>
			<!-- 商家回复 -->
			<view class="evaluateReply" v-if="item.replyTexts.length">
				<view class="icon"></view>
				<view v-for="value,index in item.replyTexts" :key='index'>{{value.replyText}}</view>
			</view>
		</view>
		<!-- 评价大图预览滚动 -->
		<replay-preview ref='replayPreview' :goodsInfoId="goodsInfoId" :commentId="commentId"></replay-preview>
		
		<view class="noEvaluate" v-if="!evaluate.records || !evaluate.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/nullcomment@2x.png" mode="widthFix"></image>
			<view class="noEvaluateText">白跑一趟，该商品暂无评价</view>
		</view>
		<view class="noMore" v-if="pageInfo.pageNo>=evaluate.totalPage && evaluate.records && evaluate.records.length">
			<view class="noMoreText">
				我是有底线的
			</view>
		</view>
	</view>
</template>

<script>
	import goodsApi from '@/api/goods/index.js'
	import replayPreview from './replayPreview.vue'	//头部图片放大
	
	export default{
		props:["goodsInfoId"],
		data(){
			return{
				evaluate:{},	//好评列表
				evaluateNum:[],	//评价的数量
				pageInfo:{
					pageNo:1,
					pageSize:4
				},
				searchParams:{
					type:0,
					itemId:""
				},
				evaluateType:[
					{
						type:0,
						name:"全部",
					},
					{
						type:1,
						name:"好评",
					},
					{
						type:2,
						name:"中评"
					},
					{
						type:3,
						name:"差评"
					},
					{
						type:4,
						name:"晒图"
					},
				],
				imgBaseUrls:"",
				commentId:'',//当前评价id
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl
			this.findAppGoodsPraiseById();
			this.findAppSkuCommentById()
		},
		methods:{
			findAppSkuCommentById(type){	//分页获取评价
				this.searchParams.itemId = this.goodsInfoId
				goodsApi.findAppSkuCommentById({...this.searchParams,...this.pageInfo}).then(res=>{
					if(res.data.code==200){
						if(res.data.data){
							if(type){
								this.evaluate.records = this.evaluate.records.concat(res.data.data.records)
							}else{
								this.evaluate = res.data.data
							}
						}else{
							this.evaluate.totalPage = 1;
							this.evaluate.records = []
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			typeChange(item){	//评价类型变化时
				this.pageInfo.pageNo = 1;
				this.searchParams.type = item.type;
				this.findAppSkuCommentById()
			},
			getMoreComment(){	//父集调用 滚动到底部
				if(this.pageInfo.pageNo>=this.evaluate.totalPage){
					return
				}
				this.pageInfo.pageNo++;
				this.findAppSkuCommentById(true)
			},
			findAppGoodsPraiseById(){	//获取订单好评度
				goodsApi.findAppGoodsPraiseById(this.goodsInfoId).then(res=>{
					if(res.data.code==200){
						if(res.data.data){
							this.evaluateNum = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			reviewImg(commentId,imgId){ // 评价图片预览
				this.commentId = commentId
				this.$refs.replayPreview.openRreviewPopup(commentId,imgId)
			},
			
		},
		components:{
			replayPreview
		}
	}
</script>

<style scoped>
	.favorablePage{
		background-color: #FFFFFF;
		padding-bottom: 60rpx;
		min-height: calc(100vh - 90rpx);
	}
	.favorable{
		display: flex;
		padding-top: 120rpx;
		padding-bottom: 20rpx;
		justify-content: center;
		align-items: bottom;
		background-color: #FFFFFF;
	}
	.favorable image{
		width: 60rpx;
		height: 60rpx;
	}
	.praiseRatio{
		font-weight: 700;
		font-size: 50rpx;
		padding: 0 20rpx 0 12rpx;
	}
	.praiseText{
		line-height: 80rpx;
	}
	.evaluateTabs{
		width: 100%;
		min-height: 100rpx;
		padding: 0 24rpx 24rpx;
		display: flex;
		background-color: #FFFFFF;
		flex-wrap: wrap;
	}
	.evaluateTabs view{
		width: auto;
		height: 60rpx;
		padding: 0 26.5rpx;
		line-height: 60rpx;
		border: 1px solid rgba(0,0,0,0);
		margin: 24rpx 18rpx 0 0;
		background: #F5F5F5;
		border-radius: 50rpx;
	}
	.evaluateTabs view.active{
		border: 1px solid #ff1558;
		background-color: #ffecf1;
		color: #ff1558;
	}
	.everyEvaluate{
		padding: 30rpx 24rpx 48rpx 0;
		margin-left: 24rpx;
		border-top: 1px solid #E4E4E4;
		background: #fff;
	}
	.evaluateTitle{
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
	}
	.userInfoHead{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.userInfo{
		flex: 1;
		padding: 10rpx 0 10rpx 24rpx;
	}
	.evaluateImg{
		width: 100%;
		height: 16rpx;
		
	}
	.evaluateImg image{
		width: 16rpx;
		height: 16rpx;
		margin-right: 10rpx;
	}
	.titleTime{
		width: 50%;
		padding-top: 10rpx;
		color: #999;
		text-align: right;
		font-size: 22rpx;
	}
	.evaluateSku{
		width: 100%;
		margin: 18rpx 0 24rpx;
		font-size: 22rpx;
		color: #999;
	}
	.evaluateComment{
		font-size: 26rpx;
		color: #000000;
		word-break: break-all;
		line-height: 38rpx;
	}
	.evaluateReply{
		width: 100%;
		word-wrap: break-word;
		padding: 24rpx;
		border-radius: 8rpx;
		color: #666666;
		margin-top: 40rpx;
		background-color: #F5F5F5;
		position: relative;
	}
	.evaluateReply .icon{
		width: 0;
		height: 0;
		border: 20rpx solid rgba(0,0,0,0);
		position: absolute;
		top: -36rpx;
		left: 40rpx;
		border-bottom: 20rpx solid #F5F5F5;
	}
	
	.review{
		margin: 24rpx 0;
		font-size: 24rpx;
		color: #ff1558;
	}
	.imageLists{
		width: 100%;
		margin-top: 24rpx;
	}
	.evaluateImage{
		width: 218rpx;
		height: 218rpx;
		border: 1px solid #eee;
		display: inline-block;
		background-size: cover;
	}
	.evaluateImage:nth-of-type(3n-1){
		margin: 0 24rpx;
	}
	.noMore{
		height: 1rpx;
		background-color: #e4e4e4;
		width: 252rpx;
		margin: 0 auto;
		position: relative;
	}
	.noMoreText{
		width: 184rpx;
		height: 98rpx;
		background-color: #FFFFFF;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		line-height: 96rpx;
		right: 0;
		margin: auto;
		text-align: center;
		color: #666;
		font-size: 24rpx;
	}
	.noEvaluate{
		width: 360rpx;
		height: auto;
		margin: 0 auto;
		padding-top: 100rpx;
		background-color: #fff;
	}
	.noEvaluate image{
		height: auto;
	}
	.noEvaluateText{
		font-size: 30rpx;
		text-align: center;
		padding-top: 55rpx;
		color: #999999;
	}
</style>
