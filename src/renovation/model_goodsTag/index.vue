<template>
	<view>
		<view class="cusHintIcon" v-if="params.customizeFlag"></view>
		<view class="openKing" v-if="params.presaleFlag">
			预售
		</view>
	</view>
</template>

<script>
	export default{
		props:["params"],
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped> 
	.cusHintIcon{
		width: 52rpx;
		height: 52rpx;
		position: absolute;
		left: 20rpx;
		top: 20rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/cusHintIcon2.png) no-repeat;
		background-size:100% 100%;
	}
	.openKing{
		width: 100rpx;
		height: 40rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/AngleOfThe.png) no-repeat;
		background-size:100% 100%;
		position: absolute;
		right: 0rpx;
		bottom: 0rpx;
		text-align: center;
		line-height: 40rpx;
		color: #FFFFFF;
	}
</style>
