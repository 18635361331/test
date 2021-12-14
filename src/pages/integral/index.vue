<template>
	<view class="page intergraBox">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<!-- <view class="rule" @click="$Router.push({path:'/pages/integralRule/index'})">
			积分规则
		</view> -->
		
		<view class="integralHead">
			<view class="integralNum">
				{{pointNum}}
			</view>
			<view class="intergraBtn" @click="$Router.push({path:'/pages/integralDetailed/index'})">
				积分明细
			</view>
		</view>
		<!-- <view class="fivebtnCont">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/li1.png" mode=""></image>
			<text class="integraText">积分转换</text>
			<text class="integralBtn" @click="$Router.push({path:'/pages/transformation/index'})">去转换</text>
		</view> -->
		<view class="fivebtnCont integraTop">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/li2.png" mode=""></image>
			<text class="integraText">每日签到领积分</text>
			<text class="integralBtn" v-if="!isValidate" @click='$Router.push({path:"/pages/signIn/index"})'>去签到</text>
			<text class="integralBtn" v-if="isValidate" >已签到</text>
		</view>
		<view class="fivebtnCont">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/li3.png" mode=""></image>
			<text class="integraText">评价订单获10积分</text>
			<text class="integralBtn" @click="$Router.push({path:'/pages/order/index',query:{state:70}})">去评价</text>
		</view>
		<view class="fivebtnCont">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/li4.png" mode=""></image>
			<text class="integraText">积分换购</text>
			<text class="integralBtn" @click="goHome">去购物</text>
		</view> 
		<view class="fivebtnCont">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/li5.png" mode=""></image>
			<text class="integraText">新用户注册成功获50积分</text>
			<text class="integralBtn disabledBtn">已获取</text>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	
	export default{
		data(){
			return{
				pointNum:0,
				isValidate:false,
				defaultTitleDto:{
					title:'文器库商城积分',
					bg:'starShopBackWrite.png',
					color:'white'
				}
			}
		},
		onShow() {
			this.zhuge.track("积分落地页")
			this.memberPoint();
			this.validateCheckin()
		},
		methods:{
			memberPoint(){
				memberApi.memberPoint().then(res=>{	//获取积分总额
					if(res.data.code==200){
						this.pointNum = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			validateCheckin(){	//判断是否已签到
				memberApi.validateCheckin().then(res=>{
					if(res.data.code==200){
						this.isValidate = false
					}else{
						this.isValidate = true;
					}
				})
			},
			goHome(){
				uni.switchTab({url:'/pages/index/index'})
			}
		}
	}
</script>

<style scoped>
	.intergraBox{
		width: 100%;
		height: 100vh;
		background: #F5F5F5;
	}
	.integraTop{
		/* margin-top: 20rpx; */
	}
	.rule{
		width: 150rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		padding-right: 10px;
		color: #FFFFFF;
	}
	.integralHead{
		width: 100%;
		height: 450rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/gift_card_headerbg@2x.png) no-repeat 50%;
		background-size: 100% 450rpx;
		padding-top: 130rpx;
	}
	.integralNum{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 72rpx;
		color: #FFFFFF;
	}
	.intergraBtn{
		width: 220rpx;
		height: 60rpx;
		text-align: center;
		border-radius: 50rpx;
		margin: 50rpx auto;
		line-height: 56rpx;
		border: 1rpx solid #FFFFFF;
		font-size: 34rpx;
		color: #FFFFFF
	}
	.fivebtnCont{
		padding: 40rpx 26rpx;
		display: flex;
		width: 100%;
		background-color: #FFFFFF;
	}
	.integraText{
		flex: 1;
	}
	.integralBtn{
		width: 120rpx;
		font-size: 28rpx;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
		margin-top: 4rpx;
		border-radius: 40rpx;
		color: #e61446;
		border:1rpx solid #E61446;
	}
	.fivebtnCont image{
		width: 48rpx;
		height: 48rpx;
	}
	.integraText{
		color: #666666;
		height: 46rpx;
		line-height: 46rpx;
		padding: 0 16rpx;
		flex: 1;
		font-size: 28rpx;
	}
	.disabledBtn{
		border: none;
		color: #999999;
	}
</style>
