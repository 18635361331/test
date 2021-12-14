<template>
	<view class="activityJigsaw" v-if="activityJigsaw">
		<view class="every_active" v-for="(item,index) in activityJigsaw" :key='index' @click="zhugeIo(item,index+1)" v-if="activityJigsaw">
			<view class="active_title">
				<text class="maint_title" :style="{color:item.titleColor}">{{item.title}}</text>
				<text class="subTitle" :style="{color:item.subtitleColor}">{{item.subtitle}}</text>
			</view>
			<view class="activeParent">
				<view class="active_content" @click.stop="goToGoodsDetails(coloms)" v-for="coloms,i in item.items" :key='i'>
					<image :src="imgBaseUrls+coloms.pictureName" mode=""></image>
					<view class="price" v-if="index<2">
						￥<text v-if="memberType==1 && !coloms.singlePromotionType">{{coloms.minSbcPlusPrice?coloms.minSbcPlusPrice:""}}</text>
						<text v-else-if="memberType==2 && !coloms.singlePromotionType">{{coloms.minSbcEnterprisePrice?coloms.minSbcEnterprisePrice:""}}</text>
						<text v-else>{{coloms.minPrice?coloms.minPrice:""}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/homeMixin.js'
	import decorateApi from '@/api/decorate/index.js'
	import goodsJump from '@/renovation/mixins_goodsJump/index.js'
	export default{
		mixins:[mixin,goodsJump],
		props:['activityJigsaw'],
		data(){
			return{
				imgBaseUrls: "",
				memberType:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:""
			}
		},
		methods:{
			zhugeIo(params,index){
				this.renovationGoTo(params);
				this.zhuge.track("首页-主题区-"+index+"-"+params.title)
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style>
	.page {
		width: 100%;
		border-radius: 8rpx;
	}
	.activityJigsaw{
		width: 100%;
		padding: 0 24rpx;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.every_active {
		width: calc(50% - 6rpx);
		margin-bottom: 10rpx;
		background-color: #FFFFFF;
		padding: 20rpx 0;
		border-radius: 16rpx;
	}

	.every_active .active_content {
		position: relative;
		text-align: center;
		width: 139rpx;
		display: inline-block;
	}
	.activeParent{
		display: flex;
		justify-content: space-around;
		padding: 0 12rpx;
	}
	.active_content image {
		width: 139rpx;
		height: 139rpx;
		border-radius: 8rpx;
	}

	.active_title {
		padding-left: 24rpx;
		margin-bottom: 10rpx;
	}

	.price {
		position: absolute;
		bottom: -15rpx;
		left: 50%;
		transform: translateX(-50%);
		background: #fff;
		padding: 0 8rpx;
		font-size: 24rpx;
		border-radius: 4px;
	}

	.maint_title {
		font-size: 32rpx;
		font-weight: 700;
		margin-right: 10rpx;
	}

	.subTitle {
		font-size: 22rpx;
	}

	.active_line {
		width: 100%;
		height: 16rpx;
		margin: 10rpx 0 16rpx 0;
		line-height: 16rpx;
	}

	.decoration {
		text-decoration: line-through;
		margin-left: 5px;
		color: #ccc;
	}
</style>
