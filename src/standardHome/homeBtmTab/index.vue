<template>
	<view class="page">
		<scroll-view v-if="boutique" scroll-x="true" class="homeTabGoods">
			<text class="homecatenav" @click="getGoodsInfo(item)" :class="chooseItem==item.title?'active':''" v-for="item,index in boutique.labels" :key='index'>{{item.title}}</text>
		</scroll-view>
		<view class="scrollViewGoods" v-if="goodsInfo.records && updateGoodsFlag">
			<biserialGoods :goodsList='goodsInfo.records'></biserialGoods>
		</view>
	</view>
</template>

<script>
	import decorateApi from '@/api/decorate/index.js';
	import biserialGoods from '@/renovation/biserialGoods/index.vue'
	export default {
		props:['boutique'],
		data() {
			return {
				navInfo: {},
				chooseItem: "",
				goodsInfo: {},
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				updateGoodsFlag:true
			}
		},
		methods: {
			labelItems(flag) {
				decorateApi.labelItems(this.chooseItem, this.pageInfo).then(res => {
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
				if (item.title != this.chooseItem) {
					this.chooseItem = item.title;
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
			},
			updateGoods(){	//更新商品数据
				this.updateGoodsFlag = false;
				this.$nextTick(()=>{
					this.updateGoodsFlag = true
				})
			},
			getLabelItems(){
				this.pageInfo.pageNo = 1
				this.chooseItem = this.boutique.labels[0].title;
				this.labelItems()
			}
		},
		mounted() {
		},
		components: {
			biserialGoods
		}
	}
</script>

<style scoped>
	.homeTabGoods {
		width: 100%;
		height: 88rpx;
		display: flex;
		white-space: nowrap;
		padding-right: 36rpx;
		background-color: #F5F5F5;
		padding-top: 30rpx;
	}

	.homecatenav {
		margin-left: 24rpx;
		font-size: 30rpx;
		color: #333333;
		height: 70rpx;
		width: auto;
	}

	.homecatenav.active {
		font-size: 40rpx;
		color: #FF1558;
		font-weight: 600;
	}

	.scrollViewGoods {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		background: #F5F5F5;
	}
</style>
