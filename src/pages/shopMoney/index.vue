<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="shopMoney">
			<view class="shopRemain">
				{{goldInfo.goldTotal}}
			</view>
			<view class="consumeDesc">
				下单时可以选择使用库豆抵扣
			</view>
		</view>
		<view class="shopMoneyDetailed" @click="$Router.push({path:'/pages/shopMoneyDetails/index'})">
			库豆明细
		</view>
	</view>
</template>

<script>
	import goldApi from '@/api/gold/index.js'
	export default{
		data(){
			return{
				goldInfo:{
					
				},
				defaultTitleDto:{
					title:'库豆',
				}
			}
		},
		methods:{
			getTotalAndBeExpireGoldInfo(){	//获取库豆
				goldApi.getTotalAndBeExpireGoldInfo().then(res=>{
					if(res.data.code==200){
						this.goldInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		onShow() {
			this.zhuge.track("库豆-落地页")
			this.getTotalAndBeExpireGoldInfo()
		}
	}
</script>

<style scoped>
	
	.rule{
		width: 150rpx;
		font-size: 30rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		padding-right: 10px;
	}
	.shopMoney{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/consumeMatterBack.png) no-repeat 50%;
		width: 100%;
		height: 100vh;
		padding-top: 300rpx;
	}
	.shopRemain{
		font-size: 80rpx;
		text-align: center;
		font-weight: 700;
	}
	.consumeDesc{
		font-size: 24rpx;
		color: #000000;
		text-align: center;
		line-height: 32rpx;
		margin-top: 6rpx;
	}
	.shopMoneyDetailed{
		position: fixed;
		bottom: 40rpx;
		left: 0;
		right: 0;
		margin: auto;
		width: 678rpx;
		height: 78rpx;
		text-align: center;
		border-radius: 40rpx;
		color: #333333;
		border: 1rpx solid #333333;
		line-height: 76rpx;
	}
</style>
