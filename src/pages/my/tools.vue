<template>
	<view class="tools">
		
		<!-- 工具服务 -->
		<view class="part">
			<view class="title">工具服务</view>
			<view class="navCont">
				<view class="list" v-for="item,index in navContData" @click="goToPath(item)" :key="index">
					<image :src="'http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/'+item.icon"></image>
					<view class="navText">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!-- 我的资产 -->
		<view class="part">
			<view class="title">我的资产</view>
			<view class="navCont">
				<view class="list" v-for="item,index in myAssets" @click="goToPath(item)" :key="index">
					<image :src="'http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/'+item.icon"></image>
					<view class="navText">{{item.name}}</view>
					<view class="navNum">{{item.num?item.num:0}}</view>
				</view>
			</view>
		</view>
		<view class="part icon">
			<image :src="imgBaseUrls+'appletsImages/myKefuIcon.png'" mode=""></image>
			客服电话：<text @click="makePhoneCall">4006811688</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:['myAssets'],
		data(){
			return{
				imgBaseUrls:"",
				navContData: [{
						name: '签到',
						icon: 'signV3.png',
						path: "/pages/signIn/index"
					},
					{
						name: '收藏',
						icon: 'collectionV3.png',
						path: '/pages/collection/index'
					},
					{
						name: '关注',
						icon: 'followV3.png',
						path: "/pages/follow/index"
					},
					{
						name: '足迹',
						icon: 'footprintV3.png',
						path: "/pages/footprint/index"
					},
					{
						name: '设置',
						icon: 'settingV3.png',
						path: "/pages/setting/index"
					},
					{
						name: '发票',
						icon: 'invoiceV3.png',
						path: "/pages/invoice/index"
					},
					{
						name: '我的礼包',
						icon: 'transferV3.png',
						path: "/pages/equityCard/index"
					}
				],
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		methods:{
			goToPath(item) {
				if (item.path) {
					this.$Router.push({
						path: item.path
					})
				}
			},
			makePhoneCall(){
				uni.makePhoneCall({
					phoneNumber:"4006811688"
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.tools{
		margin: 30rpx auto 0;
		width: calc(100% - 60rpx);
	}
	.part{
		width: 100%;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		.title{
			padding: 30rpx 20rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
		}
	}
	
	.navCont {
		display: flex;
		flex-wrap: wrap;
		.list {
			min-width: 20%;
			color: #333;
			font-size: 24rpx;
			text-align: center;
			margin-bottom: 36rpx;
			image {
				width: 60rpx;
				height: 60rpx;
			}
		}
		.navText{
			font-size: 24rpx;
			color: #333333;
		}
		.navNum{
			font-size: 24rpx;
			color: #666666;
			margin-top: 4rpx;
		}
	}
	.icon{
		height: 70rpx;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		padding-left: 40rpx;
		color: #666666;
	}
	.icon image{
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}
</style>
