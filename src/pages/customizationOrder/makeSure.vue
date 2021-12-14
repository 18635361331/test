<template>
	<view class="pages customiza">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<!-- 选择收货地址 -->
		<view class="address">
			<view class="local"></view>
			<view class="info">
				<view @click="$Router.push({path:'/pages/address/index',query:{id:orderInfoParams.address.id}})" v-if="orderInfoParams && orderInfoParams.address && orderInfoParams.address.id">
					<view class="top">
						<text class="name">{{orderInfoParams.address.name}}</text>
						<text class="tel">{{orderInfoParams.address.telephone}}</text>
					</view>
					<view class="detail">
						{{orderInfoParams.address.provinceName}}
						{{orderInfoParams.address.cityName}}
						{{orderInfoParams.address.countyName?orderInfoParams.address.countyName:""}}
						{{orderInfoParams.address.townName?orderInfoParams.address.townName:""}}
						{{orderInfoParams.address.address}}
					</view>
				</view>
				<view class="noAddress"  @click="$Router.push({path:'/pages/createAddress/index'})" v-else>请选择收货地址</view>
			</view>
			<view class="arrows"></view>
		</view>
		<orderInfo  v-for="(item,index) in orderInfoParams.stores" :key='index' :orderInfo='item'></orderInfo>
		
		<view class="partnerMap" v-if="memberType==4">
			<view class="integralMain" >
				<text class="partnerPref">合伙人优惠</text>
				<text class="intergalInfo partnerPrefNum">-¥{{orderInfoParams.platformDiscount}}</text>
			</view>
			<view class='performance'>
				<text>本单商品计有效业绩</text>
				<text>￥{{orderInfoParams.performanceAmount?orderInfoParams.performanceAmount:0}}</text>
			</view>
		</view>
		
		<view class="makeHint">温馨提示：定制需求及费用请联系客服！</view>
		<view class="fixedBottom">
			<view class="infos">
				<text>商品预估:</text>
				<text class="tag">¥</text>
				<text class="money">{{orderInfoParams.orderAmount}}</text>
			</view>
			<view class="submit" @click="goToPay">提交订单</view>
		</view>
		
		
	</view>
</template>

<script>
	import orderInfo from '@/pages/customizationOrder/orderInfo.vue'
	import tradeApi from '@/api/trade/index.js'
	export default {
		data() {
			return {
				defaultTitleDto:{
					title:'确认订单'
				},
				orderInfoParams:"",
				memberType:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:"",
			}
		},
		onShow() {
			this.cusPageInit()
		},
		methods: {
			cusPageInit(){	//初始化下单信息
				let addressInfo = uni.getStorageSync("addressInfo")?JSON.parse(uni.getStorageSync("addressInfo")):""
				tradeApi.cusPageInit({goodsId:this.$Route.query.goodsId,addressId:addressInfo.id,goodsNum:this.$Route.query.goodsNum}).then(res=>{
					if(res.data.code ==200){
						this.orderInfoParams = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToPay(){	//去往下单页面
				if(!this.orderInfoParams.address || !this.orderInfoParams.address.id){
					uni.showToast({
						title:"请选择下单地址",
						icon:"none"
					})
					return
				}
				let params = {
					addressId:this.orderInfoParams.address.id,
					storeOrderList:[]
				};
				for(let i=0;i<this.orderInfoParams.stores.length;i++){
					params.storeOrderList.push({remark:this.orderInfoParams.stores[i].remark,goodsList:[]});
					for(let j=0;j<this.orderInfoParams.stores[i].goodsList.length;j++){
						params.storeOrderList[i].goodsList.push({
							goodsId:this.orderInfoParams.stores[i].goodsList[j].goodsId,
							goodsNum:this.orderInfoParams.stores[i].goodsList[j].goodsNum
						})
					}
				}
				tradeApi.submitCusOrder(params).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"提交成功",
							icon:"none"
						})
						this.$Router.replace({
							path:"/pages/customizationOrder/paySuccess",
							query:{
								qiyuKefuGroupId:this.$Route.query.qiyuKefuGroupId
							}
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
				
			}
		},
		beforeRouteLeave(to, from, next){	//页面销毁时清除地址
			uni.removeStorageSync("addressInfo");
			next()
		},
		components:{
			orderInfo
		}
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
	
	.customiza{
		padding-bottom: 150rpx;
		/* #ifdef MP-WEIXIN */
		padding-top: 1px;
		/* #endif*/
	}
	.placeholder{
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 36rpx;
		color: #7E7E7E;
	}
	
	.fixedBottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.infos{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		$colors:#FF1558;
		.tag{
			color: $colors;
			margin-left:16rpx;
		}
		.money{
			color: $colors;
			font-size: 36rpx;
		}
		.submit{
			width: 334rpx;
			margin-left: 24rpx;
		}
	}
	.makeHint{
		position: fixed;
		height: 56rpx;
		text-align: center;
		line-height: 56rpx;
		font-size: 22rpx;
		color: red;
		background-color: #FFBD98;
		width: 100%;
		bottom: calc(124rpx + constant(safe-area-inset-bottom));
		bottom: calc(124rpx + env(safe-area-inset-bottom));
	}
	.partnerMap{
		border-radius: 20rpx;
		width: calc(100% - 24px);
		background: #FFFFFF;
		margin: 20rpx auto 0;
		padding: 24rpx;
		font-size: 28rpx;
	}
	.partnerMap>view{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.integralMain {
		margin-bottom: 20rpx;
	}
	.performance{
		color: #663F0A;
	}
	.intergalInfo {
		font-size: 22rpx;
		color: #999999;
		flex: 1;
		text-align: right;
	}
	.partnerPref{
		font-weight: 700;
	}
	.partnerPrefNum{
		color: #FE325C;
		font-size: 28rpx;
	}
</style>
