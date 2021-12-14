<template>
	<view class="page everyPolicyImage">
		<view class="everyPolicyTab" v-for="item,index in imageList" :key='index'>
			<image :src="imgBaseUrls+item.coverImage" @click="openImagePopup(index)" :style="{width:item.width}" @load='imgHeight($event,index)' mode="widthFix"></image>
			<!-- <view class="everyTabName">
				{{item.name}}
			</view> -->
		</view>
		<uni-popup ref="imagePopup" :mask-click="false" type="center">
			<view class="imageBox">
				<view>
					<swiper class="swiperBox" previous-margin="30rpx" :vertical="false"  :current="chooseIndex" next-margin="20rpx">
						<swiper-item class="swiperItem"  v-for="item,index in imageList" :key='index'>
							<image class="policyImage" :src="imgBaseUrls+item.contentImage" mode="aspectFit"></image>
						</swiper-item>
					</swiper>
					<view class="hint">
						左右切换可了解全部内容
					</view>
					<view class="btn" @click="closeImagePopup">
						关闭
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props:["imageList","type"],
		data(){
			return{
				imgBaseUrls:this.$config.imgBaseUrl,
				chooseIndex:0,
				imageHeight:0,
				windowWidth:0
			}
		},
		methods:{
			imgHeight(e,index){
				if(this.windowWidth <=0){
					const res = uni.getSystemInfoSync();
					this.windowWidth  = res.windowWidth
				}
				let view = uni.createSelectorQuery().in(this).select(".slideImage");
				view.boundingClientRect(data=>{
					this.$set(this.imageList[index],"width",(e.detail.width/750 * this.windowWidth -1).toFixed(2) +"px")
					this.$emit("updateImage",this.type,this.imageList)
				}).exec();
			},
			imageLoad(e,index){
				let view = uni.createSelectorQuery().in(this).select(".slideImage");
				view.boundingClientRect(data=>{
					this.imageHeight = (690 /e.detail.width * e.detail.height )+"rpx"
				}).exec();
			},
			openImagePopup(index){
				this.chooseIndex = index;
				this.$refs.imagePopup.open()
			},
			closeImagePopup(){
				this.$refs.imagePopup.close()
			}
		}
		
	}
</script>

<style scoped>
	.everyPolicyImage{
		/* padding: 0 30rpx; */
		width: 100%;
		/* display: flex;
		flex-wrap: wrap; */
		margin:20rpx 0 30rpx;
	}
	.everyPolicyTab{
		display: inline-block;
		font-size: 0;
		margin: 0;
	}
	.everyTabName{
		text-align: center;
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
	} 
	.imageBox{
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		background-color: #333;
	}
	.swiperBox{
		width: 750rpx;
		min-height: calc(100vh - 152px);
	}
	.swiperItem{
		text-align: center;
		height: auto;
	}
	.policyImage{
		width: 690rpx;
	}
	.hint{
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #FFFFFF;
		margin-top: 20rpx;
	}
	.btn{
		width: 268rpx;
		height: 70rpx;
		background: linear-gradient(180deg, #FEFDF9 0%, #FFEBC2 38%, #FFEAB5 100%);
		border-radius: 35px;
		color: #8E5B17;
		margin: 0 auto;
		margin-top: 30rpx;
		text-align: center;
		line-height: 70rpx;
		font-weight: 700;
	}
</style>
