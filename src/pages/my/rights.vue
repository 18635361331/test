<template>
	<scroll-view scroll-x="true" class="rightsGroup" :class="source" v-if="list&&list.length">
		<view class="content">
			<view v-for="item,index in list" :key="index" class="contentBox" @click.stop="goDet(item)">
				<image :src="item.normalIcon?(imgBaseUrl+item.normalIcon):(imgBaseUrl+item.icon)" mode=""></image>
				<view class="info">{{item.privilegeName?item.privilegeName:item.title}}</view>
				<text class="remarks">{{item.privilegeDesc?item.privilegeDesc:item.subTitle}}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default{
		props:['list','source','plusFlag','path'],// source:来源detail,	plusFlag true合伙组件
		data(){
			return{
				imgBaseUrl:'',
			}
		},
		mounted() {
			this.imgBaseUrl = this.$config.imgBaseUrl
		},
		methods:{
			goDet(item){
				if(this.path){
					this.$Router.push({path:this.path})
				}else if(this.plusFlag){
					this.$Router.push({path:'/copartner/policy/index'})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-wrap: nowrap;
		overflow: auto;
		.contentBox{
			background:#fff;
			min-width: 166rpx;
			height: 224rpx;
			text-align: center;
			border-radius: 24rpx;
			margin-right: 36rpx;
		}
		image{
			width: 60rpx;
			height: 60rpx;
			display: inline-block;
			margin: 30rpx 0 22rpx;
		}
		.info{
			font-size: 30rpx;
			font-weight: 400;
			line-height: 1.4;
			color: #666666;
		}
		.remarks{
			font-size: 22rpx;
			font-weight: 400;
			line-height: 1.3;
			color: #999999;
			display: block;
			margin-top: 10rpx;
		}
	}
	
	.detail{
		.content{
			padding:20rpx 30rpx;
		}
		image{
			width: 72rpx;
			height: 72rpx;
			margin-bottom: 15rpx;
		}
		.contentBox {
			min-width: 166rpx;
			width: 166rpx;
			height: 224rpx;
			box-shadow: 0 3px 12px rgba(84, 67, 91,.1);
			border: 1rpx solid rgba(84, 67, 91,.0);
			border-radius: 16rpx;
			margin-right: 36rpx;
		}
		.remarks{
			margin-top: 0;
		}
	}
	.vipPart{
		margin-bottom: 14rpx;
		padding: 16rpx;
		.contentBox{
			background:transparent;
			min-width: 140rpx;
			height: auto;
			text-align: center;
			margin-right: 30rpx;
		}
		image{
			width: 100rpx;
			height: 100rpx;
			margin: 0;
		}
		.info{
			font-size: 26rpx;
			font-weight: bold;
			color: #333333;
		}
		.remarks{
			font-size: 24rpx;
			color: #A8A8A8;
			margin-top: 4rpx;
		}
	}
</style>
