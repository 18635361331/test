<template>
	<view class="imgBox">
		<uni-popup ref="popup" type="bottom" >
			<view class="previewImage">
				<swiper class="swiper" :circular='false' :indicator-dots="false"  @change="swiperChange" 
			 interval="2000" duration="500" :current="imgIndex">
					<swiper-item v-for="item,index in swiperSlides" :key='index'>
						<image :src="imgBaseUrls+item.image" mode="aspectFill" /> </image>
						<view class="bottom-container" v-if="swiperSlides.length >0">
							<text class="nick-name">{{item.userName}}</text>
							<text class="spec-text">{{item.saleFieldValue}}</text> 
							<text class="user-text">
								{{item.description}}
							</text> 
						</view>
					</swiper-item>
				</swiper>				 
				<view class="indexShow" v-if="swiperSlides.length">
					<text class="nowIndex">{{swiperSlides[imgIndex].currentSize}}</text>/ {{swiperSlides[imgIndex].countSize}}
				</view>
				<view class="page-num"><text class="close-icon" @click="closeRreviewPopup"></text></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	/* 
	 * 1、向后滚动，请求数据加入list  imageReqType 第一次点击 1，滚动2  
	 * 2、向前请求插入数据  imageReqType 0
	 * 3、初始请求前后数据 前一条后一条 ，
	 * 4、翻页 前、后，依次最先、最后一个有image的数据
	 */
	import goodsApi from '@/api/goods/index.js'
	
	export default {
		props:['goodsInfoId'],
		data() {
			return {
				imgBaseUrls: this.$config.imgBaseUrl,
				imgIndex:0,
				records:[],
				swiperSlides:[],
				commentId:'',
				imageId:'',// 当前点击的图片ID
			}
		},
		methods: {
			closeRreviewPopup(){
				this.$refs.popup.close()
			},
			openRreviewPopup(commentId,imgId){ // 打开
				this.commentId = commentId
				this.imageId = imgId
				this.$refs.popup.open()
				this.getCommentList(commentId,null,imgId,1)
			},
			swiperChange(e){
				if(this.imgIndex < e.detail.current){
					//向后請求
					if(this.swiperSlides[this.imgIndex].countSize*1>this.swiperSlides.length){
						this.afterComment(this.imgIndex)
					}
				}else if(this.imgIndex > e.detail.current){
					if(this.swiperSlides[this.imgIndex].countSize*1>1){
						this.beforeComment(this.imgIndex)
					}
				}
				this.imgIndex = e.detail.current
			},
			beforeComment(index){  // 向前查询
				let currentSize = 0;
				let currentIndex = 0;
				for(var i = 0 , len = this.swiperSlides.length - 1;i <= len;i++){
					if(this.swiperSlides[i].image){
						currentSize = this.swiperSlides[i].currentSize;
						currentIndex = i;
						break;
					}
				}
				if((currentIndex == index -1 || currentIndex == index) && !this.swiperSlides[0].image){
					this.laodMorePage({
						imageReqType:0,
						currentSize:currentSize
					});
				}
			},
			afterComment(index){ // 向后查询
				let currentSize = 0;
				let currentIndex = 0;
				for(var i = this.swiperSlides.length - 1;i >=0;i--){
					if(this.swiperSlides[i].image){
						currentSize = this.swiperSlides[i].currentSize;
						currentIndex = i;
						break;
					}
				}
				if((index + 1 == currentIndex || index  == currentIndex )  && 
				 (this.swiperSlides[currentIndex].currentSize !=  this.swiperSlides[currentIndex].countSize)){
					this.laodMorePage({
						imageReqType:2,
						currentSize:this.swiperSlides[currentIndex].currentSize
					});					
				}
			},
			getCommentList(commentId,currentSize,imageId,imageReqType){//获取订单好评度 imageReqType 1 首次 0向前 2 向后
				let parmas = {
					commentId:commentId,
					currentSize:currentSize,
					imageId:imageId,
					imageReqType:imageReqType,
					itemId:this.goodsInfoId,
					type:'4'
				}
				goodsApi.findAppSkuCommentImagesById(parmas).then(res=>{
					if(res.data.code==200){
						if(res.data.data.goodsSkuDetailsCommentPictureDtos){
							let records = res.data.data.goodsSkuDetailsCommentPictureDtos;
							if(imageReqType == 0){
								this.swiperSlidesUnshif(records,res.data.data);
							}else{
								this.swiperSlidesPush(records,res.data.data,imageReqType);
							}
							/* if(this.swiperSlides[this.swiperSlides.length -1].countSize == this.swiperSlides[this.swiperSlides.length -1].currentSize){
								 this.textLoad = "没有更多了";
							} */  
						}else{
							/* if(imageReqType != 0){
								 this.textLoad = "没有更多了";
							} */
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			swiperSlidesUnshif(records,data){ //轮播顺序向前滑动
				for(var i = 0,len = records.length; i < len; i++){
					let arr = {};
					let num = parseInt(Number(records[i].currentSize) -1);
					arr.image = records[i].image;
					arr.description = data.description;
					arr.saleFieldValue = data.saleFieldValue;
					arr.userName = data.userName;
					arr.currentSize = records[i].currentSize; 
					arr.countSize = records[i].countSize;
					arr.commentId = records[i].commentId;
					arr.imageId = records[i].id;
					this.swiperSlides[num] = arr;
					// this.swiperSlides.unshift(arr)
				}
			},
			swiperSlidesPush(records,data,imageReqType){ //轮播顺序向后滑动
				for(var i = 0,len = records.length; i < len; i++){
					let arr = {};
					let num1 = Number(records[i].currentSize);
					arr.image = records[i].image;
					arr.description = data.description;
					arr.saleFieldValue = data.saleFieldValue;
					arr.userName = data.userName;
					arr.currentSize = records[i].currentSize;
					arr.countSize = records[i].countSize;
					arr.commentId = records[i].commentId;
					arr.imageId = records[i].id;
					if(this.imageId == records[i].id){ //初始化index
						this.imgIndex = num1 - 1
					}
					if(imageReqType == 1){
						this.swiperSlides.push(arr)
					}else if(!this.swiperSlides[num1]){
						this.swiperSlides.push(arr)
					}
				}
				if(imageReqType == 1){
					if(this.swiperSlides.length == 1){ // 长度为1 且 有更多 向下请求
						//向后
						if(this.swiperSlides[0].currentSize*1 < this.swiperSlides[0].countSize*1){
							this.laodMorePage({imageReqType:2,currentSize:this.swiperSlides[0].currentSize})
						}
						//向前
						if(this.swiperSlides[0].currentSize*1 > 1){
							this.laodMorePage({imageReqType:0,currentSize:this.swiperSlides[0].currentSize})
						}
					}
					let num = this.swiperSlides[0].currentSize - 1; // 前面补充
					for(var i = num; i >0; i--){
						let arr = {};
						arr.currentSize = i;
						this.swiperSlides.unshift(arr);
					}
				}
			},
			laodMorePage(val){
				let commentId  = this.commentId ;
				if(val.imageReqType == 2){
					for(var i= this.swiperSlides.length - 1;i >=0;i--){
						if(this.swiperSlides[i].image){
							commentId  = this.swiperSlides[i].commentId;
							break;
						}
					}
				}else{
					for(var i=0 , len = this.swiperSlides.length - 1;i <len;i++){
						if(this.swiperSlides[i].image){
							commentId  = this.swiperSlides[i].commentId;
							break;
						}
					}
				}
				this.getCommentList(commentId,val.currentSize,null,val.imageReqType);
			},
			
		}
	}
</script>

<style scoped>
	
	.previewImage{
		width: 100%;
		height: 100vh;
		position: relative;
		background: #000;	
	}
	.swiper{
		width: 100%;
		padding: 20% 0 0;
		height: 100%;
		overflow: auto;
	}
	.swiper image{
		position: absolute;
		top: 40rpx;
		left: 0;
		right: 0;
		bottom: 6%;
		height: auto;
	}
	.indexShow{
	      position: absolute;
	      left: 50%;
	      top: 80rpx;
	      background: rgba(105, 99, 99, 0.81);
	      color: #FFF;
	      font-size: 24rpx;
	      padding: 5rpx 30rpx;
	      border-radius: 30rpx;
	      transform: translateX(-50%);
	
	}
	.nowIndex{
		font-size: 30rpx;
		margin-right: 10rpx;
	}
	.page-num{
		width: 100%;
		height:36rpx;
		color: #fff;
		position: fixed;
		top: 40rpx;
		left: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 99999;
	}
	.close-icon{
		width:36rpx;
		height: 100%;
		display: inline-block;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/close_white.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}
	.bottom-container{
	    z-index: 99999;
	    width: 100%;
	    height: 200rpx;
	    overflow-y: scroll;
	    position: fixed;
	    bottom: 0;
	    color: #fff;
	    padding: 20rpx 24rpx;
	    display: flex;
	    align-items: flex-start;
	    flex-direction: column;	
		background: linear-gradient(180deg,transparent,#000);
	}
	.nick-name {
	    font-family: PingFangSC-Regular;
	    font-size: 26rpx;
	    margin-bottom: 12rpx;
	}
	.spec-text {
	    font-size: 24rpx;
	    margin-bottom: 12rpx;
	    opacity: .6;
	}
	.user-text{
	    font-size: 26rpx;
	    line-height: 1.4;
	}
</style>
