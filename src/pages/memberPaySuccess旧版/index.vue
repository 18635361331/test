<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="payView">
			<view class="payImage">
				<image v-if="isEnterpriseFlag" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/memberPayicon.png" mode=""></image>
				<image v-else src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/memberPayImag.png" mode=""></image>
			</view>
			<view class="payTitle">
				{{isEnterpriseFlag?"支付成功":"恭喜您开通VIP会员"}}
			</view>
			<view class="payViewContent" v-if="isEnterpriseFlag">
				<view>审核通过后可享受企业会员全部权益</view>
				<view>如果未审核通过，支付金额将原路返还</view>
			</view>
			<view class="paySubTitle" v-else>
				会员有效期一年
			</view>
			<view class="btnInfo" v-if="isEnterpriseFlag">
				<view class="lookBtn" @click="goToHome()">
					回到首页
				</view>
				<view class="receiveBtn searchProgress" @click="goToMy()">
					查询进度
				</view>
			</view>
			<view class="btnInfo" v-else-if="goodsId">
				<view class="lookBtn" @click="goToMemberGiftBag()">
					查看其它礼品
				</view>
				<view class="receiveBtn" @click="goToGoodsDetails()">
					立即领取该礼品
				</view>
			</view>
			
			<view v-else>
				<view class="hint" v-if="!goodsId">
					送你一份超值礼品，快去领取吧
				</view>
				<view class="btn" @click="goToMemberGiftBag()">
					立即领取
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from "@/api/member/index.js"
	export default{
		data(){
			return{
				defaultTitleDto:{
					title:'支付完成',
				},
				goodsId:"",
				isEnterpriseFlag:false
			}
		},
		methods:{
			goToMemberGiftBag(){
				this.$Router.replace({path:'/pages/memberGiftBag/index'})
			},
			goToGoodsDetails(){
				this.$Router.replace({
					path:'/pages/goodsDetails/index',
					query:{
						goodsId:this.goodsId,
					},
				})
			},
			goToHome(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			goToMy(){
				uni.switchTab({
					url:"/pages/my/index"
				})
			},
			loginInfo() { //获取登录信息
				memberApi.loginInfo().then(res => {
					if (res.data.code == 200) {
						uni.setStorageSync("userInfo", JSON.stringify(res.data.data))
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
		},
		onShow() {
			this.goodsId = this.$Route.query.goodsId;
			this.isEnterpriseFlag = this.$Route.query.enterprise
			this.zhuge.track("加入VIP支付成功页面");
			this.loginInfo()
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		background-color: #ffffff;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
	}

	.payView{
		width: calc(100% - 60rpx);
		margin: 0 auto;
	}
	.payImage{
		margin-top: 120rpx;
		text-align: center;
	}
	.payImage image{
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 22rpx;
	}
	.payTitle{
		width: 100%;
		text-align: center;
		font-size: 36rpx;
		color: #172047;
	}
	.payViewContent{
		width: 100%;
		text-align: center;
		color: #999999;
		font-size: 20rpx;
		padding-top: 20rpx;
	}
	.paySubTitle{
		width: 100%;
		text-align: center;
		font-size: 30rpx;
		color: #888;
		margin-top: 20rpx;
	}
	.btnInfo{
		width: calc(100% - 60rpx);
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		margin-top: 100rpx;
	}
	.lookBtn,.receiveBtn{
		width: 300rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		color: #000000;
		border-radius: 52rpx;
	}
	.lookBtn{
		border: 1rpx solid #172047;
	}
	.receiveBtn{
		background-color: #FDC900;
	}
	.searchProgress{
		background-color: #F1BD9B;
	}
	.hint{
		text-align: center;
		line-height: 60rpx;
		
	}
	.btn{
		width: 280rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		color: #000000;
		border-radius: 52rpx;
		background-color: #FDC900;
		margin: 0 auto;
		margin-top: 60rpx;
	}
</style>
