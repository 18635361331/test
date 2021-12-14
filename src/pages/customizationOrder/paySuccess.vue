<template>
	<view class="pages">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="part head">
			<image class="img" :src="imgBaseUrls+'/appletsImages/customization_success.png'" alt=""  mode="widthFix"></image>
			<view class="right">
				<text>{{type=='1'?'订单提交成功！':'订单支付成功！'}}</text>
				<view class="info" v-if="payType == '2'">请按下方银行账户进行线下打款 确认收款后将会为您进行定制生产</view>
				<view class="info" v-else-if="type=='1'">此订单需要等待卖家确认</view>
				<view class="btns">
					<view @click="goToCusOrder">查看订单</view>
					<view @click="goToKefu">联系客服</view>
				</view>
			</view>			
		</view>
		<view class="part hint">
			<view class="roll"></view>
			
			<view class="text">
				<!-- 支付成功 -->
				<block v-if="type=='2'">
					温馨提示: <text>您的定制订单已提交产线生产中请耐心等待~</text>
				</block>
				<!-- 进行支付 -->
				<block v-else-if="type=='1'">
					温馨提示: <text>卖家确认后 在订单中心找到该订单进行付款</text>
				</block>
			</view>
		</view>
		
		<!-- 线下支付 -->
		<view class="outline" v-if="payType=='2'">
			<view class="headline">
				<view class="bg bg1"></view>
				<text>转账账户信息</text>
			</view>
			<!--  -->
			<view class="bank" :style="{backgroundImage:'url('+imgBaseUrls+companyInfo.bankBanner+')'}">
				<view class="list">
					<text class="name">账号</text>
					<text class="content">{{companyInfo.bankAccount}}</text>
					<view class="copy" @click="copy(companyInfo.bankAccount)">复制</view>
				</view>
				<view class="list">
					<text class="name">账户</text>
					<text class="content">{{companyInfo.companyName}}</text>
				</view>
				<view class="list">
					<text class="name">开户行</text>
					<text class="content">{{companyInfo.openBank}}</text>
				</view>
			</view>
			
			<view class="headline">
				<view class="bg bg2"></view>
				<text>线下转账说明</text>
			</view>
			<view class="infos">
				<view>
					<text class="diamond"></text>
					<text class="info">汇款时请备注订单号，用于保证订单实时核销，订单号务必填写正确，请勿增加其他说明</text>
				</view>
				<view>
					<text class="diamond"></text>
					<text class="info">订单号填写在电汇凭证的【汇款用途】【附言】等栏内</text>
				</view>
				<view>
					<text class="diamond"></text>
					<text class="info">请按照订单实际金额转账，请勿多转或少转 </text>
				</view>
			</view>
			
			<block v-if="payLogList && payLogList.length">
				<view class="headline" >
					<view class="bg bg3"></view>
					<text>支付流水信息</text>
				</view>
				<view class="turnover">
					<view class="title">
						<text>时间</text>
						<text>收款金额</text>
						<text>剩余尾款</text>
					</view>
					<view class="list" v-for="item,index in payLogList" :key='index'>
						<view class="time">
							<text>{{$utils.formatDate(item.payTime,"yyyy-MM-dd")}}</text>
							<text>{{$utils.formatDate(item.payTime,"hh:mm:ss")}}</text>
						</view>
						<view class="money">¥{{item.amount}}</view>
						<view class="surplus">¥{{item.remainAmount}}</view>
					</view>
				</view>
			</block>
			
		</view>
	
	</view>
</template>

<script>
	import setCopy from '@/common/js/setCopy.js'
	import tradeApi from '@/api/trade/index.js'
	import qiyuPlug from '@/plugInUnit/qiyuPlug.js'
	export default {
		mixins:[setCopy,qiyuPlug],
		data() {
			return {
				defaultTitleDto:{
					title:'支付成功',
				},
				imgBaseUrls:'',
				type:1,// 1 订单提交成功 2 订单支付成功
				payType:1,// 2 需要线下支付 
				companyInfo:{},	//公司信息
				payLogList:[],	//订单的支付记录
			}
		},
		onShow() {
			if(this.payType==2){
				this.getCompanyPaymentInfo();
				this.listPayLog()
			}
		},
		onLoad(){
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.type = this.$Route.query.type||1
			this.defaultTitleDto.title = this.type=='1'?'提交成功':'支付成功'
			this.payType = this.$Route.query.payType?this.$Route.query.payType:''
		},
		methods: {
			getCompanyPaymentInfo(){	//获取公司对公账户信息
				tradeApi.getCompanyPaymentInfo().then(res=>{
					if(res.data.code==200){
						this.companyInfo = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			listPayLog(){	//获取订单的支付记录
				tradeApi.listPayLog(this.$Route.query.orderId).then(res=>{
					if(res.data.code==200){
						this.payLogList = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToCusOrder(){	//查看订单
				this.$Router.replace({
					path:"/pages/customizationOrder/index"
				})
			},
			goToKefu(){	//去往客服
				this.openKefu(this.$Route.query.qiyuKefuGroupId)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './index.scss';
	.pages{
		/* #ifdef MP-WEIXIN */
		padding-top: 1px;
		/* #endif */
		padding-bottom: 40rpx;
	}
	.part{
		@extend .whitePart;
		&.head{
			padding: 0 18rpx 24rpx 0;
		}
		display: flex;
		
		.img{
			width: 206rpx;
		}
		.right{
			width: calc(100% - 210rpx);
			margin-top: 26rpx;
			.info{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #323232;
				margin-top: 14rpx;
			}
			&>text{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #323232;
				display: inline-block;
			}
		}
		.btns{
			margin-top: 30rpx;			
		}
	}
	
	.hint{
		padding: 14rpx;
		align-items: center;
		.roll{
			width: 55rpx;
			height: 53rpx;
			background-size: 100% 100%;
			background-image: url($img-oss+'customization_roll.png');
			margin-right: 14rpx;
		}
		.text{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 1.3;
			color: #7E8385;
			text{
				color: #7530C1;
				margin-left: 4rpx;
			}
		}
	}
	
	.outline{
		width: calc(100% - 38rpx);
		background: #E4CCFF;
		border-radius: 16rpx;
		// padding-top: 54rpx;
		padding: 10rpx 24rpx 20rpx 16rpx;
		margin: 20rpx auto;
	}
	.headline{
		width: 546rpx;
		left: -30rpx; // 16+14
		height: 60rpx;
		position: relative;
		padding-left: 112rpx;
		margin: 54rpx 0 24rpx;
		background: linear-gradient(90deg, #9B3FFF 0%, #C670FE 28%, rgba(219, 145, 255, 0) 100%);
		text{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 60rpx;
			color: #FFFFFF;
		}
		.bg{
			width: 98rpx;
			height: 98rpx;
			position: absolute;
			top: -22rpx;
			left: 0;
			background-size: 100% 100%;
			&.bg1{
				background-image: url($img-oss+'customization_hot.png');
			}
			&.bg2{
				background-image: url($img-oss+'customization_hot2.png');
			}
			&.bg3{
				background-image: url($img-oss+'customization_hot3.png');
			}
		}
	}
	
	.bank{
		height: 342rpx;
		background-size: 100% 100%;
		border-radius: 20rpx;
		padding:10rpx 24rpx;
		.list{
			margin-bottom: 10rpx;
			display: flex;
			align-items: center;
			&:first-child{
				margin-top: 110rpx;
				margin-bottom: 40rpx;
			}
		}
		
		.name{
			width: 110rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			opacity: 0.7;
		}
		.content{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.copy{
			width: 104rpx;
			height: 60rpx;
			background: linear-gradient(217deg, #BB53FF 0%, #6D0DFE 100%);
			border-radius: 34rpx;
			line-height: 60rpx;
			text-align: center;
			margin-left: 30rpx;
			color: #F2E6FF;
			font-size: 24rpx;
		}
	}
	
	.infos{
		margin-top: 28rpx;
		&>view{
			margin-bottom: 20rpx;
		}
		.diamond,.info{
			display: inline-block;
			vertical-align: text-top
		}
		.diamond{
			min-width: 8rpx;
			min-height: 8rpx;
			background: #7530C1;
			border-radius: 1px;
			transform: rotate(45deg);
			margin-right: 10rpx;
			margin-top: 12rpx;
		}
		.info{
			width: calc(100% - 18rpx);
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height:1.6 ;
			color: #3E1A66;
		}
	}

	.turnover{
		background: #F8F2FF;
		border-radius: 24rpx;
		padding:24rpx 32rpx;
		.title,.list {
			display: flex;
			align-items: center;
			justify-content: space-around;
			line-height: 1;
			&>view,&>text{
				width: 32%;
				text-align: center;
			}
		}
		.title{
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
			margin-bottom: 16rpx;
		}
		.list{
			margin-top: 12rpx;
			height: 70rpx;
			background: #F2E6FF;
			border-radius: 36rpx;
		}
		.time{
			color: #666666;			
			font-weight: 500;
			text:first-child{
				font-size: 24rpx;
				display: block;
			}
			text:nth-child(2){
				font-size: 20rpx;
			}
		}
		.money,.surplus{
			font-size: 24rpx;
			font-weight: 500;
			color: #666666;
		}
	}
	
</style>
