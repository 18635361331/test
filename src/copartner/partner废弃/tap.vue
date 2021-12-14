<template>
	<view class='rewardIcon' @longtap="bol=true" @touchend="bol=false" :class="direction">
		<view class="content" v-if="bol"> 
			{{content}}
		</view>
	</view>
</template>

<script>
	export default{
		props:['content','direction','size'],//direction 方向 right 默认left
		data(){
			return{
				bol:false
			}
		},
		methods:{
			toggle(type){
				if(type){
					this.bol = true
				}else{
					this.bol = false
				}
			},
		}
		
	}
</script>

<style scoped lang="scss">
	.rewardIcon{
		display: inline-block;
		vertical-align: middle;
		width: 30rpx;
		height: 30rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rewardIcon.png);
		background-size: 100% 100%;
		margin-left: 8rpx;
		position: relative;
		padding: 16rpx;
	}
	.rewardIcon.big{
		width: 50rpx;
		height: 50rpx;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 30rpx 30rpx;
		padding: 0;
		margin-left: 0;
	}
	
	.content{
		position: absolute;
		bottom: 44rpx;
		left: -40rpx;
		width: 224rpx;
		background: #414551;
		padding: 20rpx;
		font-size: 20rpx;
		font-weight: 400;
		color: #FFFFFF;
		text-align: justify;
		border-radius: 20rpx;
		z-index: 4;
		line-height: 1.4;
		&::before{
			content: '';
			position: absolute;  
			width: 0;  
			height: 0;  
			line-height: 0;/*为了防止ie下出现题型*/  
			border-top: 20rpx solid #414551;  
			border-left: 20rpx solid #fff;  
			border-right: 20rpx solid #fff;  
			left: 36rpx;  
			bottom: -20rpx; 
		}
	}
	
	.right{
		.content{
			left: inherit;
			right: -40rpx;
			&::before{
				left: inherit;  
				right: 36rpx;
			}
		}
	}
</style>
