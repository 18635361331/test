<template>
	<view class="page">
		<!-- backgroundShowWay 0为背景色   1为背景图 -->
		<view class="searchTemplate" @click='goToSearch' v-if="!headerSearch.backgroundShowWay" :style="{background:headerSearch.backgroundColor}">
			<view class="searchBox">
				<view class="arrowIcon"></view>
				<view class="searchText">
					搜索您喜欢的
				</view>
			</view>
		</view>
		<view class="searchTemplateBgImage" @click='goToSearch' v-else :style="{backgroundImage:'url('+imgBaseUrls+headerSearch.backgroundImage+')'}">
			<view class="searchBox">
				<view class="arrowIcon"></view>
				<view class="searchText">
					搜索您喜欢的
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['headerSearch'],
		data(){
			return{
				imgBaseUrls: "",
			}
		},
		methods:{
			goToSearch(){	//去往搜索页面
				this.$Router.push({
					path:"/pages/search/index"
				})
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.searchTemplate,.searchTemplateBgImage{
		width: 100%;
		height: 88rpx;
		padding: 0 20rpx;
		padding-top: 16rpx;
	}
	.searchBox{
		width: 100%;
		height: 60rpx;
		background-color: #EDEDED;
		color: #535353;
		display: flex;
		border-radius: 100px;
		align-items: center;
	}
	.arrowIcon{
		width: 60rpx;
		height: 60rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/searchTemplate.png) no-repeat;
		background-size: 24rpx 26rpx;
		margin-left: 24rpx;
		margin-top: 32rpx;
	}
	.searchText{
		width: 100%;
		line-height: 64rpx;
		font-size: 26rpx;
		color: #535353;
		text-align: left;
	}
	.searchTemplateBgImage{
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100%;
	}
</style>
