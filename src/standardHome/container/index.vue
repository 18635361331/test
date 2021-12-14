<template>
	<view class="page">
		<view class="container"  v-if="memberCulling && memberCulling.items" @click="zhugeIo(memberCulling)">
			<view class="containerTitle">
				<text class="containerMain" :style="{color:memberCulling.titleColor}">{{memberCulling.title}}</text>
				<text class="containerSub" :style="{color:memberCulling.subTitleColor}">{{memberCulling.subTitle}}</text>
			</view>
			<view class="containerContent">
				<view class="everyRow" @click.stop="goToGoodsDetails(item)" v-for="item,index in memberCulling.items" :key='index'>
					<image :src="imgBaseUrls+item.pictureName" mode=""></image>
					<view class="containerPrice">
						￥<text v-if="memberType==1 && !item.singlePromotionType">{{item.minSbcPlusPrice?item.minSbcPlusPrice:""}}</text>
						<text v-else-if="memberType==2 && !item.singlePromotionType">{{item.minSbcEnterprisePrice?item.minSbcEnterprisePrice:""}}</text>
						<text v-else>{{item.minPrice?item.minPrice:""}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	import decorateApi from '@/api/decorate/index.js'
	import goodsJump from '@/renovation/mixins_goodsJump/index.js'
	export default {
		mixins:[mixin,goodsJump],
		props:['memberCulling'],
		data() {
			return {
				imgBaseUrls: "",
				memberType:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:""
			}
		},
		methods: {
			zhugeIo(params){
				this.zhuge.track("首页-主题区-1-"+params.title)
				this.renovationGoTo(params)
			},
			searchComponent() {
				decorateApi.searchComponent(90001).then(res => {
					if (res.data.code == 200) {
						res.data.data.content = JSON.parse(res.data.data.content);
						this.memberCulling = res.data.data;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.container {
		width: calc(100% - 48rpx);
		background-color: #FFFFFF;
		margin: 0 auto;
		border-radius: 8rpx;
	}

	.containerTitle {
		margin-bottom: 10rpx;
		padding: 20rpx 0 0 20rpx;
	}

	.containerMain {
		font-weight: 700;
		font-size: 32rpx;
		padding-right: 4rpx;
		color: black;
	}

	.containerSub {
		font-size: 24rpx;
		margin-left: 10rpx;
	}

	.containerContent {
		height: 198rpx;
		width: 100%;
		display: flex;
	}

	.everyRow {
		width: 25%;
		position: relative;
		height: 198rpx;
		border-radius: 8rpx;
		margin-right: 24rpx;
		text-align: center;
	}

	.everyRow image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 8px;
	}

	.containerPrice {
		font-size: 24rpx;
		padding-right: 6rpx;
	}
	
	.unpromotionMinPrice{
		color: #BBBBBB;
		font-size: 20rpx;
		text-decoration: line-through;
	}
</style>
