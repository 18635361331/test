<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="integralHead">
			<view class="integralNum">
				{{pointNum}}
			</view>
			<view class="intergraBtn">
				积分规则
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				defaultTitleDto:{
					title:'文器库商城积分规则',
				}
			}
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
	}
</style>
