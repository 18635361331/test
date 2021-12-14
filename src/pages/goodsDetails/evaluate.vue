<template>
	<!-- 评价 -->
	<view class="page evaluate">
		<view class="goodsDetailsComment" @click="$emit('entryEvaluate')">
			<view>
				<text class="evaluateTitle">评价</text>
				<text class="evaluateNum">({{evaluate.commentCount?evaluate.commentCount:0}})</text>
			</view>
			<view>
				<text class="evaluatePraise" v-if="evaluate.praise">好评度{{evaluate.praise}}%</text>
				<text class="allEvaluateBtn"></text>
			</view>
		</view>
		<scroll-view scroll-x=true  class="slideGoodsBox">
			<view class="slideGoodsView">
				<view class="slideBox" @click="$emit('entryEvaluate')" v-for="item,index in evaluate.goodsDetailsComments" :key='item.id'>
					<view>
						<view class="evaluateUser">
							<view class="userInfoHead">
								<image v-if="item.smallIcon" :src="imgBaseUrls+item.smallIcon"></image>
								<image v-if="!item.smallIcon" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/default_phone.png"></image>
							</view>
							<view class="userInfo">
								<view>{{item.userName}}</view>
								<view class="evaluateImg">
									<image v-for="list,index in item.goodsReputation" :key='index' src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collectionTrue.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="evaluateText ellipsis-three" v-if="item.description">{{item.description}}</view>
						<!-- 选中sku -->
						<view class="chooseSku ellipsis-one" v-if="item.saleFieldValue">{{item.saleFieldValue}}</view>
					</view>
					<view class="evaluateImage" v-if="item.goodsSkuCommentPictureDtos">
						<view class="imageNum">
							{{item.goodsSkuCommentPictureDtos.length}}张
						</view>
						<view class="evaluateImageEvery" :key='index' :style="{backgroundImage:'url('+imgBaseUrls+item.goodsSkuCommentPictureDtos[0].image+')'}"></view>
						<!-- <image :src="imgBaseUrls+item.goodsSkuCommentPictureDtos[0].image" mode=""></image> -->
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import goodsApi from '@/api/goods/index.js'
	export default{
		props:['goodsInfo','goodsInfoId'],
		data(){
			return{
				evaluate:{},
				imgBaseUrls:""
			}
		},
		methods:{
			getGoodsComments(){
				goodsApi.getGoodsComments(this.goodsInfoId).then(res=>{
					if(res.data.code==200){
						this.evaluate = res.data.data
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
			this.imgBaseUrls = this.$config.imgBaseUrl
			this.getGoodsComments()
		}
	}
</script>

<style scoped>
	.evaluate{
		background-color: #fff;
		padding-bottom: 20rpx;
	}
	.slideGoodsBox{
		padding-right: 20rpx;
	}
	.slideGoodsView{
		display: flex;
	}
	.goodsDetailsComment{
		width: 100%;
		height:140rpx;
		line-height: 140rpx;
		font-size: 34rpx;
		padding: 0 24rpx;
		display: flex;
		justify-content: space-between;
	}
	.allEvaluateBtn{
		display: inline-block;
		width: 48rpx;
		height: 20rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 12rpx 20rpx;
	}
	.evaluateTitle{
		padding-right: 24rpx;
		font-size: 34rpx;
		font-weight: 700;
	}
	.evaluateNum{
		font-size: 28rpx;
		font-weight: 400;
	}
	.evaluatePraise{
		font-size: 26rpx;
		color: #ff1558;
	}
	.slideBox{
		height: 270rpx;
		display: flex;
		border: 1px solid #EEEEEE;
		border-radius: 12rpx;
		margin: 0 24rpx;
		padding: 0 10rpx;
	}
	.evaluateUser{
		width: 268rpx;
		padding: 32rpx 0 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.evaluateText{
		font-size: 24rpx;
		color: #333333;
		height: 99rpx;
		width: 226rpx;
		margin-top: 18rpx;
		padding-right: 24rpx;
		line-height: 34rpx;
		word-wrap: break-word;
	}
	.userInfoHead{
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.userInfo{
		width: 210rpx;
		height: 60rpx;
		padding-left: 21rpx;
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
	.chooseSku{
		font-size: 18rpx;
		color: #999999;
		line-height: 25rpx;
		margin-top: 12rpx;
		height: 25rpx;
	}
	.evaluateImage{
		width: 270rpx;
		height: 270rpx;
		position: relative;
		display: inline-block;
	}
	.evaluateImage image{
		height: 266rpx;
	}
	.imageNum{
		position: absolute;
		top: 8rpx;
		right: 8rpx;
		height: 24rpx;
		border-radius: 12rpx;
		background-color: rgba(0,0,0,0.38);
		width: 48rpx;
		text-align: center;
		line-height: 24rpx;
		z-index: 1;
		color: #FFFFFF;
		font-size: 24rpx;
	}
	.evaluateImageEvery{
		width: 266rpx;
		height: 266rpx;
		display: inline-block;
		background-size: cover;
	}
</style>
