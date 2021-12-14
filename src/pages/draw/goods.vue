<template>
	<view class="page">
		<scroll-view class="homeTabGoods" scroll-x="true" v-if="labels && labels.length" >
			<view class="homecatenav" @click="getGoodsInfo(item)" :class="chooseItem==item?'active':''" v-for="item,index in labels" :key='index'>
				<text>{{item}}</text>
			</view>
		</scroll-view>
		<view class="scrollViewGoods" v-if="goodsInfo.records && goodsInfo.records.length">
			<biserialGoods :goodsList='goodsInfo.records'></biserialGoods>
		</view>
	</view>
</template>

<script>
	import boxActivityApi from '@/api/boxActivity/index.js'
	import biserialGoods from '@/renovation/biserialGoods/index.vue'
	export default {
		data() {
			return {
				labels: [],
				chooseItem: "",
				goodsInfo: {},
				pageInfo: {
					pageNo: 1,
					pageSize: 30
				},
				componentId:20000,
			}
		},
		methods: {
			searchComponent() {
				this.pageInfo.pageNo = 1
				boxActivityApi.queryUserDefinedTabs(this.componentId).then(res => {
					if (res.data.code == 200) {
						this.labels = res.data.data;
						this.chooseItem = this.labels[0]
						this.labelItems()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			labelItems(flag) {
				boxActivityApi.queryUserDefinedComponents(this.componentId,this.chooseItem, this.pageInfo).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						if(flag){
							this.goodsInfo.records = this.goodsInfo.records.concat(JSON.parse(res.data.data).records)
							this.goodsInfo.totalPage = JSON.parse(res.data.data).totalPage
						}else{
							this.goodsInfo = JSON.parse(res.data.data)
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getGoodsInfo(item) {
				if (item != this.chooseItem) {
					this.chooseItem = item;
					this.pageInfo.pageNo = 1;
					uni.showLoading({
						title:"加载中..."
					})
					this.labelItems()
				}
			},
			getNextPageGoods(){
				if(this.goodsInfo.totalPage>this.pageInfo.pageNo){
					this.pageInfo.pageNo++;
					this.labelItems(true)
				}
				
			}
		},
		mounted() {
			this.searchComponent()
		},
		components: {
			biserialGoods
		}
	}
</script>

<style scoped lang="scss">
	.homeTabGoods {
		width: 100%;
		height: 88rpx;
		display: flex;
		white-space: nowrap;
		padding-right: 36rpx;
		margin-top: 30rpx;
	}

	.homecatenav {
		display: inline-block;
		margin-left: 28rpx;
		&:not(:first-child):before{
			content: '';
			display: inline-block;
			width: 1px;
			height: 20rpx;
			background: #F89101;
			border-radius: 1px;
			margin-right: 28rpx;
		}
		text{
			font-size: 28rpx;
			font-weight: 400;
			color: #EA7919;
		}
		
		&.active {
			text{
				font-size: 32rpx;
				font-weight: 600;
				color: #EF546A;
				&:after{
					content: '';
					margin-top: 10rpx;
					margin-left: 28rpx;
					display: block;
					width: 128rpx;
					height: 20rpx;
					background: linear-gradient(270deg, rgba(240, 34, 71, 0.1) 0%, #F83D64 50%, #FD6458 100%);
					border-radius: 10rpx;
				}
			}
		}
		&:first-child{
			text::after{
				margin-left: 0;
			}
		}
	}

	.scrollViewGoods {
		padding-bottom: 20rpx;
	}
</style>
