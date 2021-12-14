<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="everyRow" @click="$Router.push({path:'/pages/editLoginPassword/index'})">
			<view class="pwTitle">
				登录密码
			</view>
			<view class="passwordHint">
				建议您定期更改密码以保护账户安全
			</view>
			<view class="arrow"></view>
		</view>
		<view class="everyRow" @click="$Router.push({path:'/pages/editPayPsw/index'})">
			<view class="pwTitle">
				支付密码
			</view>
			<view class="passwordHint">
				使用账户资产时，用于验证支付
			</view>
			<view class="arrow"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultTitleDto:{
					title:'密码保护',
					bottomColor:'#E6E6E6'
				}

			}
		},
		onShow() {
			this.zhuge.track("密码保护页面")
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	

	.everyRow {
		width: calc(100% - 24rpx);
		height: 110rpx;
		border-bottom: 1rpx solid #E4E4E4;
		margin-left: 24rpx;
		padding-top: 20rpx;
		position: relative;
	}

	

	.passwordHint {
		color: #999999;
		font-size: 24rpx;
	}

	.arrow {
		position: absolute;
		right: 0;
		top: 0;
		width: 48rpx;
		height: 110rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
	}
</style>
