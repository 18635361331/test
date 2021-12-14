<template>
	<view class="page footOperate fixedPosition">
		<view class="navCont">
			<view class="navContBtn goHome" @click="goHome"></view>
			<view @click="goCart" class="navContBtn goCart"></view>
			<view class="navContBtn goService" @click="openKefu"></view>
		</view>
		<!-- frozenFlag:0商品正常  1商品冻结 -->
		<view v-if="!goodsInfo.frozenFlag && goodsInfo.status!=2" class="nacDisabledBtn">商品已下架</view>
		<view v-else-if="goodsInfo.status==2 && goodsInfo.stockNumber<=0 && !goodsInfo.frozenFlag && !increaseReceive" class="nacDisabledBtn">商品暂时缺货</view>
		<view v-else-if="goodsInfo.frozenFlag" class="nacDisabledBtn">商品已下架</view>
		<!-- 秒杀活动 不允许加入购物车 -->
		<view class="buyNow" @click="bugNow" v-else-if="seckillInfo.marketingId && new Date().getTime() > new Date(this.seckillInfo.marketingSessionStartTime).getTime() && goodsInfo.stockNumber">
			立即购买
		</view>
		<view class="buyNow" v-else-if="seckillInfo.marketingId && new Date(goodsInfo.singlePromotionStartTime).getTime() < new Date().getTime() && !goodsInfo.stockNumber">
			已抢完
		</view>
		<!-- 秒杀活动按钮结束 -->
		
		<!-- 会员按钮开始 -->
		<block v-else-if="goodsInfo.singlePromotionType>50 && increaseReceive">
			<view class="buyNow receiveBtn" @click="bugNow">立即领取</view>
		</block>
		
		<block v-else-if="goodsInfo.singlePromotionType>50">
			<view class="navBtn cartBtn increaseBtn" @click="increaseBuy">转赠购买</view>
			<view class="navBtn buyBtn" :class="goodsInfo.freight && !goodsInfo.freight.canBuy?'active':''" @click="bugNow">立即购买</view>
		</block>
		<!-- 会员按钮结束 -->
		
		<!-- 预售商品按钮 -->
		<view class="buyNow memberBuyBtn" @click="bugNow" v-else-if="goodsInfo.presaleFlag">
			立即下单
		</view>
		
		<!-- 预售商品按钮结束 -->
		
		
		<view v-else>
			<view class="navBtn cartBtn" @click="addCart">加入购物车</view>
			<view class="navBtn buyBtn" :class="goodsInfo.freight && !goodsInfo.freight.canBuy?'active':''" @click="bugNow">立即购买</view>
		</view>
	</view>
</template>

<script>
	import goodsApi from '@/api/goods/index.js';
	import appApi from '@/api/app/index.js'
	import qiyuPlug from '@/plugInUnit/qiyuPlug.js'
	export default {
		props: ['goodsInfo', 'chooseSpceData','seckillInfo','memberInfo','goodsInfoId'],
		mixins:[qiyuPlug],
		data() {
			return {
				increaseReceive:false
			}
		},
		methods: {
			goToBuyMemberPage(){	//去往购买会员页面
				if(uni.getStorageSync("sessionId")){
					this.bugNow()
				}else{
					this.$Router.push({
						path:"/pages/login/index"
					})
				}
			},
			saveGoodsFootprint() { //添加足迹
				goodsApi.saveGoodsFootprint([this.goodsInfoId]).then(res => {
					if (res.data.code == 200) {

					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			goHome(){
				uni.switchTab({url:'/pages/index/index'})
			},
			goCart(){
				uni.switchTab({url:'/pages/cart/index'})
			},
			increaseBuy(){	//转增购买 
				if(!uni.getStorageSync("sessionId")){
					this.$Router.push({
						path:"/pages/login/index"
					})
				}
				this.$emit("increaseBuy",false)
			},
			bugNow() { //判断商品是否可以购买
				if(!this.goodsInfo.freight.canBuy){
					return
				}
				this.$emit("bugNow");
			},
			addCart() {
				if(!this.goodsInfo.freight.canBuy){
					return
				}
				this.$emit("addCart")
			}
		},
		mounted() {
			this.increaseReceive = false;
			if(this.$Route.query.transferOrderId){
				this.increaseReceive = true;
			}
			if(uni.getStorageSync("sessionId")){
				this.saveGoodsFootprint()
			}
		}
	}
</script>

<style scoped>
	.footOperate {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: calc(98rpx + constant(safe-area-inset-bottom));
		height: calc(98rpx + env(safe-area-inset-bottom));
		display: flex;
		background-color: #fff;
	}
	
	.navCont {
		width: 264rpx;
		display: flex;
	}

	.navContBtn {
		width: 88rpx;
		height: 98rpx;
		padding: 0 23rpx;
	}

	.goHome {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/home_more2@2x.png) no-repeat 50%;
		background-size: 42rpx 42rpx;
	}

	.goCart {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/cart_11@2x.png) no-repeat 50%;
		background-size: 42rpx 42rpx;
	}

	.goService {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/kefu.png) no-repeat 50%;
		background-size: 42rpx 42rpx;
	}

	.navBtn {
		width: 216rpx;
		height: 80rpx;
		margin-top: 10rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 44rpx;
		margin-left: 16rpx;
		display: inline-block;
	}

	.cartBtn {
		color: #333;
		border: 1px solid #333;
	}

	.buyBtn {
		background: #ff1558;
		color: #fff;
	}
	.buyBtn.active{
		background-color: #999999;
		color: #FFFFFF;
	}
	.nacDisabledBtn {
		flex: 1;
		background: #999999;
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
	}

	.buyNow {
		background-color: #FFDF8C;
		color: #000000;
		width: 456rpx;
		height: 78rpx;
		margin-top: 10rpx;
		margin-left: 16rpx;
		border-radius: 52rpx;
		text-align: center;
		line-height: 78rpx;
	}
	.receiveBtn{
		background: linear-gradient(270deg, #FFBB46 0%, #FE8F20 100%);
		color: #FFFFFF;
	}
	.memberBuyBtn{
		background-color: #FF1558;
		color: #FFFFFF;
	}
	.disabled.buyNow{
		background-color: #DFDFDF;
	}
	.increaseBtn{
		background: linear-gradient(270deg, #FFBB46 0%, #FE8F20 100%);
		border: none;
		color: #FFFFFF;
	}
</style>
