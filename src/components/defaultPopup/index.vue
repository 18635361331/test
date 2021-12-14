<template>
	<view class="page popupBox">
		<view class="defaultBox">
			<slot></slot>
		</view>
		<view class="defaultBtn">
			<view class="cancelBtn" @click="$emit('cancel')">
				取消
			</view>
			<view class="sureBtn" @click="$emit('sure')">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
	.popupBox{
		width: 600rpx;
		height: 360rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
		font-size: 32rpx;
	}
	.defaultBox{
		width: 100%;
		height: calc(100% - 106rpx);
	}
	.defaultBtn{
		width: 100%;
		height: 96rpx;
		display: flex;
		border-top: 1rpx solid #E4E4E4;
		padding-bottom: 10rpx;
	}
	.cancelBtn,.sureBtn{
		width: 50%;
		height: 96rpx;
		text-align: center;
		line-height: 96rpx;
		color: #999999;
	}
	.sureBtn{
		color: #FF1558;
		border-left: 1rpx solid #E4E4E4;
	}
</style>
