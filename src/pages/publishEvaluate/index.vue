<template>
	<view class="page publishEvaluate">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		
		<view class="everyEvaluate" v-for="item,index in params" :key='index'>
			<view class="gooodsInfo">
				<view class="goodsImages" :style="{backgroundImage:'url('+imgBaseUrls+item.goodsImage+')'}"></view>
				<view class="goodsInfoMsg">
					<view class="goodsName ellipsis-one">{{item.name}}</view>
					<view class="goodsEvaluate">
						<text v-for="v,i in 5" :class="i<item.goodsReputation?'active':''" @click.stop="$Route.query.status?'':goodsReputation(item,i,index)" :key='index'></text>
						{{starsLevel[item.goodsReputation]}}
					</view>
				</view>
			</view>
			<view class="comment-main">
				{{item.commentText?item.commentText:""}}
			</view>
			<view class="comment-time">
				{{item.evaluateTime?item.evaluateTime:""}}
			</view>
			<view class="imageList" v-for="v,i in item.commentImageList" :key='i'>
				<image :src="imgBaseUrls+v" mode="aspectFill"></image>
			</view>
			<view class="goodsEvaluateInput">
				<textarea v-model="item.description" :placeholder="defaultTitleDto.title=='发表追评'?'评价内容超过10个字并且添加图片评价可奖励10积分':'评价内容超过10个字并且添加图片评价可奖励10积分，追加评论再奖励10积分'" />
			</view>
			<view class="evaluateImage">
				<view class="imageList" v-for="v,i in item.updateImgList" :key='i'>
					<image :src="imgBaseUrls+v" mode="aspectFill"></image>
					<view class="removeImgBtn" @click="clearImage(item.updateImgList,i)"></view>
				</view>
				<view class="updateImg" v-if="item.updateImgList.length<6" @click="chooseimage(item)">
					<text v-if="!item.updateImgList.length">添加照片</text>
					<text v-if="item.updateImgList.length">{{item.updateImgList.length}}/6</text>
				</view>
			</view>
		</view>
		
		<view class="storeEvaluate" v-if="!$Route.query.status">
			<view class="storeDetail">
				店铺评分
			</view>
			<view class="store">
				<view>
					<text class="storeTitle">描述相符</text>
					<text class="storEvaleIcon" @click='storeEvaluate.describe=index+1' v-for="item,index in 5" :key='index' :class="index<storeEvaluate.describe?'active':''"></text>
					{{starsLevel[storeEvaluate.describe]}}
				</view>
				<view>
					<text class="storeTitle">物流服务</text>
					<text class="storEvaleIcon" @click='storeEvaluate.logistics=index+1' v-for="item,index in 5" :key='index' :class="index<storeEvaluate.logistics?'active':''"></text>
					{{starsLevel[storeEvaluate.logistics]}}
				</view>
				<view>
					<text class="storeTitle">服务态度</text>
					<text class="storEvaleIcon" @click='storeEvaluate.service=index+1' v-for="item,index in 5" :class="index<storeEvaluate.service?'active':''" :key='index'></text>
					{{starsLevel[storeEvaluate.service]}}
				</view>
			</view>
		</view>
		<view class="publishBtn" @click="$Route.query.status?addGoodsSkuAppendComment():addGoodsSkuCommentDto()">发布</view>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js';
	import goodsApi from '@/api/goods/index.js';
	import uniUploadImage from '@/common/js/uniUploadImage.js'
	export default{
		mixins:[uniUploadImage],
		data(){
			return{
				params:{},
				imgBaseUrls:"",
				starsLevel:{
					"1":"愤怒",
					"2":"失望",
					"3":"一般",
					"4":"不错",
					"5":"很棒"
				},
				storeEvaluate:{
					describe:5,
					logistics:5,
					service:5
				},
				updateImgList:[],
				defaultTitleDto:{
					title:'',
					bottomColor:'#E6E6E6'
				}
			}
		},
		onShow() {
			let title = this.$Route.query.status?'发表追评':'发表评论'
			uni.setNavigationBarTitle({
				title:title
			})
			this.defaultTitleDto.title = title
			this.zhuge.track("评价-落地页");
		},
		onLoad() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			if(this.$Route.query.status){
				this.appendEvaluate()
			}else{
				this.evaluateGoods();
			}
		},
		methods:{
			evaluateGoods(){	//获取待评价商品
				tradeApi.evaluateGoods(this.$Route.query.orderId).then(res=>{
					if(res.data.code==200){
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].goodsReputation = 5;
							res.data.data[i].updateImgList = [];
							this.$set(res.data.data[i],"description",res.data.data[i].description?res.data.data[i].description:"")
						}
						this.params = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			appendEvaluate(){	//获取追评详情
				tradeApi.appendEvaluate(this.$Route.query.orderId).then(res=>{
					if(res.data.code==200){
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].updateImgList = [];
							this.$set(res.data.data[i],"description",res.data.data[i].description?res.data.data[i].description:"")
						}
						this.params = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goodsReputation(item,index,goodsIndex){	//商品单个评价
				this.$set(this.params[goodsIndex],"goodsReputation",index+1)
			},
			chooseimage(item){	//上传图片
				uni.chooseImage({
					count:6,
					success:(res)=>{
						res.tempFiles = res.tempFiles.slice(0,6-item.updateImgList.length);
						for(let i=0;i<res.tempFiles.length;i++){
							this.uploadImage(res.tempFiles[i].path,item)
						}
					}
				})
			},
			updateImage(uploadFileRes,params){	//上传图片成功后
				params.updateImgList.push(uploadFileRes.data)
				for(let i=0;i<this.params.length;i++){
					if(this.params[i].itemId == params.itemId){
						this.params[i].updateImgList = params.updateImgList
					}
				}
				// params.updateImgList.push(uploadFileRes.data);
				// this.$set(params,"updateImgList",params.updateImgList)
			},
			clearImage(item,index){
				item.splice(index,1)
			},
			addGoodsSkuAppendComment(){	//追评
				let params = {
					orderId:this.$Route.query.orderId,
					details:[]
				}
				for(let i=0;i<this.params.length;i++){
					if(!this.params[i].description){
						uni.showToast({
							title:"请填写评价内容",
							icon:"none"
						})
						return
					}
					params.details.push({
						itemId:this.params[i].itemId,
						skuId:this.params[i].skuId,
						text:this.params[i].description,
						images:this.params[i].updateImgList
					})
				}
				goodsApi.addGoodsSkuAppendComment(params).then(res=>{
					if(res.data.code==200){
						this.$Router.replace({
							path:"/pages/commentSuccess/index",
							query:{
								status:1
							}
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			addGoodsSkuCommentDto(){	//添加评论
				let submit = []
				let updateImgList = []
				for(let i=0;i<this.params.length;i++){
					updateImgList = []
					for(let j=0;j<this.params[i].updateImgList.length;j++){
						updateImgList.push({
							image:this.params[i].updateImgList[j]
						})
					}
					submit.push({
						skuId:this.params[i].skuId,
						orderId:this.$Route.query.orderId,
						goodsLevel:this.params[i].goodsReputation,
						goodsSkuCommentPictureDtos:updateImgList,
						member:1,
						isImage:this.params[i].updateImgList.length?1:0,
						serveLevel:this.storeEvaluate.service,
						logisticsLevel:this.storeEvaluate.logistics,
						goodsLevel:this.storeEvaluate.describe,
						description:this.params[i].description,
						orderDetailId:this.params[i].orderDetailId
					})
				}
				goodsApi.addGoodsSkuCommentDto(submit).then(res=>{
					if(res.data.code==200){
						this.$Router.push({
							path:"/pages/commentSuccess/index"
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.publishEvaluate{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	
	.publishBtn{
		width: calc(100% - 60rpx);
		height: 80rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		margin: 0 auto;
		border-radius: 100rpx;
	}
	
	
	.gooodsInfo{
		width: 100%;
		padding: 24rpx;
		display: flex;
		height: 176rpx;
		border-radius: 8rpx;
		overflow: hidden;
		border-bottom: 1px solid #E6E6E6;
	}
	.storeTitle{
		margin-right: 40rpx;
	}
	.goodsImages{
		width: 162rpx;
		height: 128rpx;
		background-size: cover;
		border-radius: 6rpx;
		background-position: 50%;
		background-repeat: no-repeat;
	}
	.goodsInfoMsg{
		flex: 1;
		padding: 16rpx 0 16rpx 24rpx;
	}
	.goodsName{
		
	}
	.goodsEvaluate{
		margin-top: 24rpx;
		display: flex;
		align-items: center;
	}
	.goodsEvaluate text{
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collection.png) no-repeat 50%;
		background-size: 36rpx;
		margin-right: 25rpx;
	}
	.goodsEvaluate text.active{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collectionTrue.png) no-repeat 50%;
		background-size: 36rpx;
	}
	.goodsEvaluateInput{
		width: 100%;
		height: 200rpx;
		margin-bottom: 36rpx;
		padding: 12rpx 24rpx 0;
	}
	.goodsEvaluateInput textarea{
		color: #333333;
		width: 100%;
		height: 100%;
		padding-top: 14rpx;
		line-height: 42rpx;
		font-size: 28rpx;
	}
	.storeEvaluate{
		width: 100%;
		height: 316rpx;
		padding: 24rpx;
	}
	.storeDetail{
		font-size: 32rpx;
		color: #333333;
		margin-bottom: 24rpx;
	}
	.store{
		font-size: 26rpx;
		color: #666666;
		
	}
	.store view{
		display: flex;
		align-items: center;
		margin-bottom: 32rpx;
	}
	
	.storEvaleIcon{
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collection.png) no-repeat 50%;
		background-size: 36rpx;
		margin-right: 25rpx;
	}
	.storEvaleIcon.active{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collectionTrue.png) no-repeat 50%;
		background-size: 36rpx;
	}
	.comment-main{
		padding: 12rpx 24rpx 0;
		margin-bottom: 36rpx;
	}
	.comment-time{
		font-size: 24rpx;
		color: #B2B2B2;
		margin: -12rpx 0 37rpx 24rpx;
	}
	.evaluateImage{
		display: flex;
		flex-wrap: wrap;
	}
	.updateImg{
		width: 162rpx;
		height: 162rpx;
		margin-left: 24rpx;
		margin-bottom: 24rpx;
		border: 1px dashed #DFDFDF;
		border-radius: 8rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_pic.png) no-repeat ;
		background-position: 55rpx 30rpx;
		background-size: 52rpx 46rpx ;
		position: relative;
	}
	.updateImg text{
		position: absolute;
		top: 98rpx;
		width: 100%;
		text-align: center;
		color: #B2B2B2;
	}
	.imageList{
		position: relative;
		width: 162rpx;
		height: 162rpx;
		margin-left: 24rpx;
		margin-bottom: 24rpx;
		border-radius: 8rpx;
		overflow: hidden;
	}
	.removeImgBtn{
		position: absolute;
		top: 0;
		right: 0;
		width: 30rpx;
		height: 30rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_close.png) no-repeat 50%;
		background-size: 30rpx 30rpx;
	}
</style>
