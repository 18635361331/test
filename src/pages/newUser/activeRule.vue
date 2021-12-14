<template>
	<view class="page">
		<view class="ruleBox">
			<view class="ruleTitle">
				<view class="ruleTitleHint"></view>
				<view class="ruleText">活动规则</view>
			</view>
			<scroll-view  class="rule" scroll-y="true" >
				{{description}}
			</scroll-view>
			<view class="understandBtn" @click="closeRulePopup">
				我已了解
			</view>
			<view class="closeBtn" @click="closeRulePopup"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['description'],
		data(){
			return{
				
			}
		},
		methods:{
			closeRulePopup(){	//关闭规则弹窗
				this.$emit("closeRulePopup")
			}
		}
	}
</script>

<style scoped>
	.ruleBox{
		width: 690rpx;
		max-height: 808rpx;
		background-color: #FFFFFF;
		border-radius: 20px;
		position: relative;
		padding: 30rpx 0 60rpx;
	}
	.ruleTitle{
		position: relative;
		text-align: center;
		color: #333333;
		width: 128rpx;
		margin: 0 auto;
		height: 40rpx;
	}
	.ruleTitleHint{
		position: absolute;
		bottom: 0rpx;
		background: linear-gradient(270deg, rgba(240, 34, 71, 0.1) 0%, #F83D64 50%, #FD6458 100%);
		border-radius: 10px;
		bottom: -6rpx;
		width: 100%;
		height: 20rpx;
	}
	.ruleText{
		position: absolute;
		font-weight: 700;
		font-size: 32rpx;
	}
	.rule{
		text-indent: 48rpx;
		max-height: 500rpx;
		color: #333333;
		padding: 0rpx 40rpx;
		width: 100%;
		word-break: break-word;
		margin-top: 40rpx;
	}
	.understandBtn{
		width: 630rpx;
		height: 88rpx;
		line-height: 88rpx;
		background-color: #fe325c;
		color: #FFFFFF;
		border-radius: 44px;
		margin: 0 auto;
		font-size: 32rpx;
		font-weight: 700;
		margin-top: 40rpx;
		text-align: center;
	}
	.closeBtn{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		bottom: -90rpx;
		left: 0;
		margin: auto;
		right: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/11_close.png) no-repeat;
		background-size: 100%;
	}
</style>
