<template>
	<view>
		<view class="ellipsis-two">
			<text class="customize" v-if="params.customizeFlag">礼品定制</text>{{params.name}}
		</view>
		<view class="cusTagBox">
			<!--  :style="{'color':colorArray[index>=colorArray.length?0:index].startColor,'borderColor':colorArray[index>=colorArray.length?0:index].startColor}" -->
			<view class="cusTag" :key='index' v-for="(item,index) in params.itemLabelList" v-if="params.itemLabelList">{{item.labelDesc}}</view>
		</view>
		<view class='stockNumber' v-if="params.customizeFlag!=1">
			库存:{{params.stockNumber>9999?9999:params.stockNumber}}
			<text v-if="params.stockNumber>9999">+</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:["params"],
		data(){
			return{
				// colorArray:[
				// 	{
				// 		startColor:"#E63114",
				// 		endColor:"#FF635D"
				// 	},
				// 	{
				// 		startColor:"#E6144D",
				// 		endColor:"#FF5D89"
				// 	},
				// 	{
				// 		startColor:"#13BDF2",
				// 		endColor:"#5ED3FF"
				// 	},
				// 	{
				// 		startColor:"#EB8807",
				// 		endColor:"#FEA95F"
				// 	},
				// 	{
				// 		startColor:"#EE1B03",
				// 		endColor:"#FF5439"
				// 	},
				// ],
			}
		}
	}
</script>

<style scoped>
	.cusTagBox{
		display: flex;
		flex-wrap: wrap;
	}
	
	.cusTag{
		width: auto;
		height: 28rpx;
		line-height: 24rpx;
		text-align: center;
		border-radius: 4rpx;
		font-size: 20rpx;
		padding: 0 8rpx;
		white-space: nowrap;
		font-weight: 400;
		margin-right: 8rpx;
		margin-top: 12rpx;
		color: #FA4C7B;
		border: 1rpx solid #DC416B;
	}
	.customize{
		display: inline-block;
		width: 88rpx;
		height: 28rpx;
		line-height: 28rpx;
		text-align: center;
		color: #FFFFFF;
		/* background-color: #E4CCFF; */
		/* color: #7A32CC; */
		background: linear-gradient(313deg, #A114E6 0%, #BF5DFF 100%);
		border-radius:4rpx;
		margin-right: 12rpx;
		font-size: 20rpx;
		font-weight: 400;
	}
	.stockNumber{
		font-size: 20rpx;
		color: #989898;
		margin-top: 12rpx;
	}
	.stockNumber text{
		vertical-align: super;
		font-size: 18rpx;
	}
</style>
