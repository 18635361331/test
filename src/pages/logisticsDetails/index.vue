<template>
	<view class="page logisicsBox">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<scroll-view class="logisicsTab" scroll-x="true" v-if="params.length>1">
			<view class="logisicsParentBox">
				<text class="everyRow" v-for="item,index in params" :key="index" :class="chooseIndex==index?'active':''" @click="chooseIndex=index">{{item.name}}</text>
			</view>
		</scroll-view>
		<view v-for="item,index in params" :key="index" v-if="chooseIndex==index">
			<view class="logisicsGoods" >
				<view class="goodsInfo">
					<image v-if="item.packageItemType" :src="imgBaseUrls+item.goodsImage" mode=""></image>
					<image v-if="!item.packageItemType" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/order_gift.png" mode=""></image>
					<view class="goodsNum">
						共{{item.goodsTotal}}件商品
					</view>
				</view>
				<view class="logisicsInfo">
					<view class="distribution">
						配送商：{{item.comName}}
					</view>
					<view class="distribution" v-if="!item.expressType">
						快递编号：{{item.nu}}
					</view>
				</view>
			</view>
			<view class="logisicsAddress" v-if="addressInfo.orderAddressDTO">
				<view class="addressIcon"></view>
				<view class="addressInfo">
					<view class="userInfoName">
						<text>{{addressInfo.orderAddressDTO.name}}</text>
						<text class="addressTel">{{addressInfo.orderAddressDTO.telephone}}</text>
					</view>
					<view class="addrInfo">
						{{addressInfo.orderAddressDTO.address}}
					</view>
				</view>
			</view>
			<view class="logisicsList">
				<view class="line"></view>
				<view class="everyLogisics" v-for="v,i in item.dataList" :key='i'>
					<view class="everyName">
						{{v.split("#")[1]}}
					</view>
					<view class="everyTime">
						{{v.split("#")[0]}}
					</view>
					<view class="logisticsMask" v-if="i==0"></view>
					<view class="logisticsMaskBtm" v-if="i==item.dataList.length-1"></view>
					<view class="logisicsIcon" :class="i==0?'active':''"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import transportApi from '@/api/transport/index.js'
	export default{
		data(){
			return{
				params:[],
				imgBaseUrls:"",
				addressInfo:{	//收获地址信息
					
				},
				chooseIndex:0,
				defaultTitleDto:{
					title:'物流信息',
					bottomColor:'#E6E6E6'
				}
			}
		},
		mounted() {
			if(uni.getStorageSync("logisticsInfo")){
				this.addressInfo = JSON.parse(uni.getStorageSync("logisticsInfo"))
			}
			this.imgBaseUrls = this.$config.imgBaseUrl
			this.getExpressageInfo();
		},
		computed: {
		},
		onUnload(){
			uni.removeStorageSync("logisticsInfo");
		},
		methods:{
			getExpressageInfo(){	//获取物流信息
				transportApi.getExpressageInfo(this.$Route.query.orderId).then(res=>{
					if(res.data.code==200){
						this.params = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
		},
		onShow() {
			this.zhuge.track("物流信息页面")
		}
	}
</script>

<style scoped>
	.logisicsBox{
		width: 100%;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.logisicsTab{
		width: 100%;
	}
	.logisicsParentBox{
		min-width: 100%;
		height: 88rpx;
		display: flex;
		line-height: 88rpx;
		text-align: center;
		white-space: nowrap;
	}
	.logisicsGoods{
		width: 100%;
		padding: 30rpx 25rpx;
		background-color: #FFFFFF;
		display: flex;
	}
	.everyRow{
		flex:1 1 auto;
		min-width: 132rpx;
		display: block;
		white-space: nowrap;
	}
	.everyRow.active{
		font-size: 40rpx;
		font-weight: 700;
		transition: all .2s;
		white-space: nowrap
	}
	.goodsInfo{
		position: relative;
		width: 150rpx;
		height: 150rpx;
		background-color: #FFFFFF;
		border: 1rpx solid #dfdfdf;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.goodsNum{
		width: 100%;
		height: 30rpx;
		font-size: 20rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 30rpx;
		background-color: rgba(0,0,0,.4);
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.logisicsInfo{
		padding-left: 25rpx;
		flex: 1;
	}
	.logisicsStatus{
		font-size: 30rpx;
		color: #FF1558;
		line-height: 50rpx;
	}
	.distribution{
		line-height: 50rpx;
		color: #787878;
	}
	.logisicsAddress{
		padding: 24rpx;
		display: flex;
		align-items: center;
	}
	.addressIcon{
		width: 34rpx;
		height: 34rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/adress@2x.png) no-repeat 50%;
		background-size: 34rpx 34rpx;
	}
	.addressInfo{
		padding-left: 25rpx;
		flex: 1;
	}
	.userInfoName{
		font-weight: 700;
		color: #333;
		font-size: 32rpx;
	}
	.addressTel{
		margin-left: 64rpx;
	}
	.addrInfo{
		margin-top: 8rpx;
		color: #666666;
		line-height: 40rpx;
	}
	.logisicsList{
		width: 100%;
		position: relative;
		padding-top: 32rpx;
	}
	.line{
		width: 4rpx;
		height: calc(100% - 32rpx);
		position: absolute;
		top: 32rpx;
		left: 42rpx;
		background-color: #e5e5e5;
	}
	.everyLogisics{
		margin-left: 80rpx;
		margin-right: 32rpx;
		padding: 24rpx 0;
		position: relative;
		border-bottom: 1px solid #E6E6E6;
	}
	.everyName{
		color: #333333;
		line-height: 32rpx;
	}
	.everyTime{
		color: #999999;
		margin-top: 7rpx;
		font-size: 24rpx;
	}
	.logisicsIcon{
		width: 24rpx;
		height: 24rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy3@2x.png) no-repeat 50%;
		background-size: 24rpx 24rpx;
		position: absolute;
		left: -48rpx;
		top: 50%;
		margin-top: -12rpx;
	}
	.logisicsIcon.active{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/quan2@2x.png) no-repeat 50%;
		background-size: 24rpx 24rpx;
	}
	.logisticsMask{
		width: 72rpx;
		height: 50%;
		position: absolute;
		left: -72rpx;
		background-color: #FFFFFF;
		top: 0;
	}
	.logisticsMaskBtm{
		width: 72rpx;
		height: 50%;
		position: absolute;
		left: -72rpx;
		background-color: #FFFFFF;
		bottom: 0;
	}
</style>
