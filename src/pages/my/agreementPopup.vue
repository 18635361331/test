<template>
	<view class="page">
		<uni-popup ref="popup" type="bottom">
			<view class="collectTitle">
				<view class="goBackBtn" @click="closePopup"></view>
				<view class="title">
					升级规则介绍
				</view>
			</view>
			<scroll-view scroll-y="true" class="agreementPopupContent">
				<block v-for="item,index in memberConfig" :key="index">
					<view class="agreementEvery" >
						{{item.name}}
					</view>
					<view class="agreementEvery">
						1、注册并购买{{item.price}}元会员礼包产品的用户成为{{item.name}}
					</view>
					<view class="agreementEvery">
						2、平台注册后累计购物满{{item.price}}元即可成为{{item.name}}
					</view>
				</block>
				
				<view class="agreementEvery">
					特别说明：
				</view>
				<view class="agreementEvery">
					*购买不同价值的礼包商品成功后即开通对应的会员类型，生效节点为购买成功后，截止日期为购买日期往后加1个自然年
				</view><view class="agreementEvery">
					*累计消费金额已大于等于下一个会员的累计金额门槛后，自动升级为下一个会员类型，会员截止日期按升级日期往后推1个自然年
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
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
	}
	.agreementEvery{
		padding: 0 30rpx;
		color: #999999;
		margin-top: 20rpx;
		font-size: 26rpx;
	}
</style>
