<template>
	<view class="page addressList">
		<view class="popupTitle">配送至</view>
		<scroll-view class="addressMain" v-if="addressFlag" scroll-y=true>
			<view class="everyAddress" v-for="item,index in addressList" @click="setAddress(item)" :key='item.id'>
				<view class="addressImg" :class="item.isDefault?'active':''"></view>
				<text class="addressText" :class="item.isDefault?'active':''">{{item.provinceName+item.cityName+item.districtName+(item.townName?item.townName:"")+item.address}}</text>
				<view class="addressChoose" :class="item.isDefault?'active':''"></view>
			</view>
		</scroll-view>
		<view class="addressMain" v-if="!addressFlag">
			<selectAddress :defaultAddress='selectAddressParams' @addressChange='addressChange'></selectAddress>
		</view>
		<view class="addressBtn" v-if="addressFlag" @click="switchAddressFlag">
			选择其它地址
		</view>
	</view>
</template>

<script>
	import selectAddress from '@/common/model/selectAddress.vue'
	export default {
		props: ['addressList', 'chooseAddress'],
		data() {
			return {
				addressFlag: true, //为真显示地址列表  为false显示选择地址
				isFindAddress: false, //是否要展示手动选择地址弹窗  默认展示地址列表
				selectAddressParams: {}
			}
		},
		mounted() {
			this.selectAddressParams = JSON.parse((JSON.stringify(this.chooseAddress)))
			if (!uni.getStorageSync("sessionId")) {
				this.addressFlag = false;
				return
			}
			if (this.addressList.length) {
				this.addressFlag = true;
				for (let i = 0; i < this.addressList.length; i++) {
					if (this.addressList[i].provinceName == this.chooseAddress.provinceName && this.addressList[i].cityName == this.chooseAddress
						.cityName && this.addressList[i].districtName == this.chooseAddress.districtName && this.addressList[i].townName ==
						this.chooseAddress.townName && this.addressList[i].address == this.chooseAddress.address) {
						this.addressList[i].isDefault = true;
						this.isFindAddress = true
					} else {
						this.addressList[i].isDefault = false
					}
				}
				if (!this.isFindAddress) { //在地址列表中未找到展示的地址
					this.$nextTick(() => {
						this.addressFlag = false;
					})
				}
			} else {
				this.addressFlag = false;
			}
		},
		methods: {
			addressChange(params) {
				this.$emit("addressChange", params)
			},
			setAddress(item) { //设置已有地址
				this.$emit("addressChange", item)
			},
			switchAddressFlag() { //点击选择其它地址
				this.selectAddressParams = {};
				this.addressFlag = false;
			}
		},
		components: {
			selectAddress
		}
	}
</script>

<style scoped>
	.popupTitle {
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 34rpx;
		color: #000;
	}

	.addressList {
		min-height: 752rpx;
		max-height: 852rpx;
		background-color: #FFFFFF;
	}

	.addressMain {
		width: 100%;
		height: 554rpx;
	}

	.everyAddress {
		display: flex;
		min-height: 108rpx;
		padding: 40rpx 38rpx 35rpx 38rpx;
		margin-left: 28rpx;
		justify-content: space-between;
		border-bottom: 1px solid #E6E6E6;
	}

	.addressImg {
		width: 20rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}

	.addressImg.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/adress@2x.png) no-repeat 50%;
		background-size: 20rpx 20rpx;
		background-position: 0rpx 6rpx;
	}

	.addressText {
		width: 592rpx;
		line-height: 32rpx;
		color: #999;
		font-size: 24rpx;
	}

	.addressText.active {
		color: #FF1558;
	}

	.addressChoose {
		width: 27rpx;
		height: 18rpx;
		margin-left: 10rpx;
	}

	.addressChoose.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/unfollow.png) no-repeat 50%;
		background-size: 27rpx 18rpx;
	}

	.addressBtn {
		width: 100%;
		height: 100rpx;
		background-color: #ff1558;
		text-align: center;
		line-height: 100rpx;
		color: #FFFFFF;
		font-size: 30rpx;
	}
</style>
