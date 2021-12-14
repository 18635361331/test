<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		
		<view class="payPswBox" @click="$Router.push({path:'/pages/setPwdForPay/index'})">
			<text>忘记支付密码</text>
			<view class="arrow"></view>
		</view>
		<view class="payPswBox" @click="$Router.push({path:'/pages/editPayPassword/index'})">
			<text>修改支付密码</text>
			<view class="arrow"></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				defaultTitleDto:{
					title:'支付密码',
					bottomColor:'#E6E6E6'
				}
			}
		},
		onShow() {
			this.zhuge.track("支付密码页")
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.payPswBox{
		width: 100%;
		border-bottom: 1rpx solid #EEEEEE;
		display: flex;
		height: 98rpx;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 30rpx;
	}
	.arrow{
		width: 48rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
		height: 24rpx;
	}
</style>
