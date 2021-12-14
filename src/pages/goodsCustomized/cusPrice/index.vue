<template>
	<view class="page">
		<view class="procedure">
			<view class="proceTitle">
				<text>定制流程</text>
				简单4步，让您拥有专属定制的产品
			</view>
			<view class="proceContent">
				<view v-for="item,index in procedList" :key="index">
					<view class="everyProce" v-if="item.type==1">
						<image :src="imgBaseUrls+item.image" mode=""></image>
						<view>
							{{item.name}}
						</view>
					</view>
					<view class="proceImage" v-else>
						<image :src="imgBaseUrls+'cusProced.png'" mode=""></image>
					</view>
				</view>
				
			</view>
		</view>
		<view class="cusPrice" v-if="goodsInfo.deliveryCycleList && goodsInfo.deliveryCycleList.length">
			<view class="cusPriceTitle">
				定制价格
			</view>
			<view class="cusPirceBox">
				<view class="cusPriceText">
					<view class="everyTitle no">
						<text>序号</text>
						<text>NO.</text>
					</view>
					<view class="everyTitle">
						<text>起订量</text>
						<text>Qty</text>
					</view>
					<view class="everyTitle">
						<text>价格</text>
						<text>Price</text>
					</view>
					<view class="everyTitle">
						<text>交期</text>
						<text>Lead Time</text>
					</view>
					<view class="everyTitle">
						<text>{{'定制费用\n是否减免'}}</text>
						<text>{{'Free Cus-\ntomerization'}}</text>
					</view>
				</view>
				<view class="cusPriceContent" v-for="item,index in goodsInfo.deliveryCycleList" :key
				='index'>
					<view class="everyTitle no">
						{{arr[index]}}
					</view>
					<view class="everyTitle">
						{{item.quantity}}
					</view>
					<view class="everyTitle">
						{{item.standardPrice}}
					</view>
					<view class="everyTitle">
						{{item.estimatedTime}}天
					</view>
					<view class="everyTitle">
						{{item.reliefFlag?'是':'否'}}
					</view>
				</view>
			</view>
		</view>
		<view class="everyPage">
			<text class="serve">服务</text>
			<view class="guarantee">
				<text></text>
				品质保障
			</view>
			<view class="guarantee kefu">
				<text></text>
				专属客服
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['goodsInfo'],
		data(){
			return{
				arr:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
				procedList:[
					{
						name:"定制需求",
						image:"cusdEmand.png",
						type:1
					},
					{
						type:0
					},
					{
						name:"设计呈现",
						image:"cusDesign.png",
						type:1
					},
					{
						type:0
					},
					{
						name:"签订合同",
						image:"cusContract.png",
						type:1
					},
					{
						type:0
					},
					{
						name:"品检发货",
						image:"cusDeliver.png",
						type:1
					}
				],
				imgBaseUrls:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/"
			}
		},
		methods:{
			
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.procedure{
		width: 100%;
		height: 255rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 24rpx;
	}
	.proceTitle{
		display: flex;
		margin-bottom: 30rpx;
	}
	.proceTitle text{
		color: #AEB5B8;
		margin-right: 30rpx;
	}
	.proceContent{
		width: 702rpx;
		height: 135rpx;
		background-color: #F8F2FF;
		border-radius: 8rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.everyProce{
		width: 100rpx;
		font-size: 20rpx;
		text-align: center;
	}
	.proceImage{
		width: 55rpx;
		height: 10rpx;
		display: flex;
		margin-top: -20rpx;
		align-items: center;
	}
	.everyProce image{
		border-radius: 50%;
		overflow: hidden;
		width: 48rpx;
		height: 48rpx;
	}
	.cusPrice{
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		padding: 24rpx;
		margin-top: 20rpx;
	}
	.cusPriceTitle{
		color: #323232;
		font-size: 26rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}
	.cusPirceBox{
		width: 100%;
		border-radius: 12rpx;
		margin: 0 auto 20rpx;
		overflow: hidden;
	}
	.cusPriceText,.cusPriceContent{
		width: 100%;
		margin: 0 auto;
		color: #666;
		&>view{
			display: inline-block;
		}
	}
	
	.cusPriceText{
		background: #AE66FF;
		font-weight: 700;
		line-height: 1.5;
		color: #FFFFFF;
		text-align: center;
		display: flex;
		&>view {
			height: 144rpx;
			text:first-child{
				 padding-top: 16rpx; 
				 display: block;
				 font-size: 22rpx;
			}
			&:not(:last-child){
				text:first-child{
					padding-top: 44rpx;
				}
			}
			text:last-child{
				display: block;
				font-size: 20rpx;
				color: #E9D6FF;
			}
		}
	}
	.cusPriceContent{
		height: 46rpx;
		line-height: 46rpx;
		font-size: 28rpx;
		color: #666666;
		&:nth-child(2n){
			background:#F2E6FF;
		}
		&:nth-child(2n+1){
			background:#E4CCFF;
		}
	}
	
	.everyTitle{
		text-align: center;
		&:not(:last-child){
			border-right: 2rpx solid #FFFFFF;
		}
		&.no{
			width: 70rpx;
		}
		&:nth-child(2){
			width: 216rpx;
		}
		&:nth-child(3){
			width: 116rpx;
		}
		&:nth-child(4){
			width: 134rpx;
		}
		&:last-child{
			width: calc(100% - 536rpx);
		}
		
	}
	
	.everyPage{
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}
	.serve{
		color: #AEB5B8;
	}
	.guarantee{
		margin-left: 66rpx;
		display: flex;
		align-items: center;
		margin-right: 50rpx;
	}
	.guarantee text{
		display: inline-block;
		width: 6rpx;
		height: 6rpx;
		border-radius: 50%;
		background-color: #AE66FF;
		margin-right: 10rpx;
	}
	.guarantee.kefu{
		margin: 0;
	}
	
</style>
