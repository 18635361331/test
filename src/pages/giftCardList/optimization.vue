<template>
	<view class="page">
		<!-- 优选 -->
		<view class="optimiza">
			<view class="everyRow" @click="goToGiftCardDetails(item)" v-for="item,index in optimizLabelList" :key='index'>
				<view class="everyRowPic" :style="{backgroundImage:'url('+imgBaseUrls+item.cover+')'}"></view>
				<view class="everyRowTitle">{{item.labelName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['optimizLabelList'],
		data(){
			return{
				imgBaseUrls:""
			}
		},
		methods:{
			goToGiftCardDetails(item){
				this.$Router.push({
					path:"/pages/giftCardDetails/index",
					query:{
						batchId:item.batchId
					}
				})
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.optimiza{
		width: 100%;
		padding: 24rpx 36rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.everyRow{
		width: calc(50% - 20rpx);
		height: 298rpx;
		border-radius: 20rpx;
		margin-right: 34rpx;
		margin-bottom: 36rpx;
		box-shadow: 0 6px 25px 0 rgba(0,0,0,0.12);
		background-color: #FFFFFF;
	}
	.everyRow:nth-of-type(2n){
		margin-right: 0;
	}
	.everyRowPic{
		width: 100%;
		height: 208rpx;
		border-radius: 20rpx;
		background-size: 100% 100%;
	}
	.everyRowTitle{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
	}
</style>
