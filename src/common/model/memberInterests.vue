<template>
	<view class="page">
		<view class="interestsList" :class="{'active':colorChange}" v-if="privilegeUnitDTOList">
			<view class="everyRow" v-for="item,index in privilegeUnitDTOList" :key='item.id'>
				<view class="useHint" v-if="(useStatus == 0 || useStatus == 1) && userInfo && userInfo.plusFlag && index == 0">
					{{ useStatus ? "已使用" : "未使用" }}
				</view>
				<image :src="imgBaseUrls+item.normalIcon" mode=""></image>
				<view class="rowTitle">
					{{item.privilegeName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["privilegeUnitDTOList","useStatus","userInfo","colorChange"],
		data(){
			return{
				imgBaseUrls:""
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.interestsList {
		width: calc(100% - 60rpx);
		display: flex;
		flex-wrap: wrap;
		margin: 0 auto;
		border-radius: 8rpx;
		color: #ffffff;
		margin-top: 50rpx;
	}
	
	.everyRow {
		width: 20%;
		text-align: center;
		margin-bottom: 50rpx;
		position: relative;
	}
	
	.everyRow image {
		width: 80rpx;
		height: 80rpx;
	}
	
	.rowTitle {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		margin-top: 20rpx;
		font-size: 20rpx;
	}
	
	.useHint {
		position: absolute;
		top: -5rpx;
		right: 0;
		background-color: #ff1558;
		color: #ffffff;
		z-index: 1;
		font-size: 20rpx;
		padding: 0 4rpx;
		border-radius: 8rpx;
		line-height: 30rpx;
	}
	
	.interestsList.active {
		width: calc(100% - 60rpx);
		background-color: #FFFFFF;
		padding: 40rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		margin: 0 auto;
		border-radius: 16rpx;
		color: #000000;
	}
</style>
