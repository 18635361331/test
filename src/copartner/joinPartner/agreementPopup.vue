<template>
	<view class="page">
		<uni-popup ref="popup" type="bottom">
			<view class="collectTitle">
				<view class="goBackBtn" @click="closePopup"></view>
				<view class="title">
					文器库平台{{partnerName}}协议
				</view>
			</view>
			<scroll-view scroll-y="true" class="agreementPopupContent">
				<view class="agreementEvery" v-for="item,index in agreementInfo" :key='index'>
					{{item}}
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props:["agreementInfo","partnerName"],
		data(){
			return{
				memberConfig:[]
			}
		},
		methods:{
			openPopup(){	//打开服务协议
				this.$refs.popup.open();
			},
			closePopup(){	//关闭会员服务协议
				this.$refs.popup.close()
			}
		},
		mounted() {
			this.memberConfig = uni.getStorageSync("memberConfig")?JSON.parse(uni.getStorageSync("memberConfig")):[];
			this.memberConfig.shift()
			
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		background-color: #F5F5F5;
		padding-top: 88rpx;
	}
	
	
	.collectTitle .goBackBtn {
		background-image: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png);
        background-size: 40rpx 40rpx;
        position: absolute;
        top: 0;
        right: 0;
	}
	
	.agreementPopupContent{
		height:100vh;
		background-color: #FFFFFF;
		padding-top: 100rpx;
		padding-bottom: 20rpx;
	}
	.agreementEvery{
		padding: 0 30rpx;
		color: #999999;
		margin-top: 20rpx;
		text-indent: 48rpx;
		font-size: 26rpx;
	}
</style>
