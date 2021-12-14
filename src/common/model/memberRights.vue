<template>
	<view class="page">
		<view class="interestsList" v-if="privilegeUnitDTOList">
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :interval="interval" :duration="duration" :current="swiperIndex-1"  @change="swiperChange" >
				<swiper-item v-for="v,t in list" :key='t'>
					<view class="everyRow" v-for="item,index in v" :key='item.id' >
						<view class="useHint" v-if="(useStatus == 0 || useStatus == 1) && userInfo && userInfo.plusFlag && index == 0 && t ==0 ">
							{{ useStatus ? "已使用" : "未使用" }}
						</view>
						<image :src="imgBaseUrls+item.normalIcon" mode=""></image>
						<view class="rowTitle" :style="{color:color?color:''}">
							{{item.privilegeName}}
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="transInItem" :style="'width:'+(44*Number(list.length))+'rpx'">
				<view :style="'left:'+(swiperIndex-1)/list.length*100+'%'"></view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: ["privilegeUnitDTOList", "useStatus", "userInfo",'color'],
		data() {
			return {
				imgBaseUrls: "",
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				list: [],
				swiperIndex:1
			}
		},
		mounted() {
			this.list = []
			let dem = this.privilegeUnitDTOList
			let len = Math.ceil(dem.length / 5)
			for (let i = 0; i < len; i++) {
				let arr = []
				for (let j = 0; j < dem.length; j++) {
					if (j < (i + 1) * 5 && j >= i * 5) {
						arr.push(dem[j])
					}
					if ((j + 1) / 5 == i + 1 || (i == len - 1 && j == dem.length - 1)) {
						this.list.push(arr)
					}
				}
			}
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		methods:{
			swiperChange(e){
				this.swiperIndex = e.detail.current +1
			},
		}
	}
</script>

<style scoped lang="scss">
	.interestsList {
		width: 100%;
		margin: 0 auto;
		color: #ffffff;
		padding-top: 5rpx;
		position: relative;
	}

	.swiper {
		width: 100%;
		height: 150rpx;
	}

	swiper-item {
		display: flex;
	}
	.transInItem{
		position: absolute;
		width: 44rpx;
		height: 6rpx;
		background: #707070;
		border-radius: 4px;
		left: 50%;
		transform: translateX(-50%);

		view{
			width: 44rpx;
			background: #F1BD9B;
			border-radius: 4px;
			position: absolute;
			left: 0;
			height: 100%;
		}
	}
	



	.everyRow {
		width: 20%;
		text-align: center;
		position: relative;
		image {
			width: 80rpx;
			height: 80rpx;
		}
	}


	.rowTitle {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
	}

	.useHint {
		position: absolute;
		top: 0;
		right: 0;
		background-color: #ff1558;
		color: #ffffff;
		z-index: 1;
		font-size: 20rpx;
		padding: 0 4rpx;
		border-radius: 8rpx;
		line-height: 30rpx;
	}

	
</style>
