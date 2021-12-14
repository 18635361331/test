<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view>
			库豆说明
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				defaultTitleDto:{
					title:'库豆说明',
				}
			}
		},
		onShow() {
			this.zhuge.track("库豆说明-落地页")
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
	}
</style>
