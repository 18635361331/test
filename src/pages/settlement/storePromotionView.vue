<template>
	<view class="page">
		<view class="disCount" @click="openPromotionPopup">
			<view>
				<text>促销</text>
			</view>
			<view class="promotionText">
				{{storePromotion[storeId][0].name}}
			</view>
			<view class="couponIcon"></view>
		</view>
		<uni-popup ref="storePromotion" type="bottom">
			<view class="couponPopup">
				<view class="popupTitle">
					{{storeName}}
				</view>
				<scroll-view scroll-y="true" class="couponMain">
					<view class="everyRow" v-for="item,index in storePromotion[storeId]" :key='index'>
						<view class="promotionView">
							{{item.name}}
						</view>
						<view class="couponBtnIcon" @click="promotionChange(item)" :class="choosePromotionId==item.id?'active':''"></view>
					</view>
				</scroll-view>
				<view class="sureBtn" @click="closePromotionPopup">
					完成
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		props:["storeName","storePromotion","storeId","choosePromotionId"],
		data(){
			return{
				
			}
		},
		methods:{
			openPromotionPopup(){	//打开促销活动弹窗
				this.$refs.storePromotion.open()
			},
			closePromotionPopup(){	//关闭促销活动弹窗
				this.$refs.storePromotion.close()
			},
			promotionChange(item){	//促销活动变化时触发
				if(item.id!=this.choosePromotionId){
					this.$emit("promotionChange",this.storeId,item.id)
				}
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.disCount {
		width: calc(100% - 44rpx);
		margin: 0 auto;
		height: 88rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #E6E6E6;
		justify-content: space-between;
	}
	.couponIcon {
		height: 88rpx;
		width: 32rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/moreD.png) no-repeat 50%;
		background-size: 32rpx 8rpx;
	}
	
	.couponPopup {
		height: 752rpx;
		width: 100%;
		background-color: #FFFFFF;
	}
	
	.popupTitle {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 34rpx;
		text-align: center;
	}
	
	.couponMain {
		width: 100%;
		height: calc(100% - 200rpx);
	}
	.promotionText{
		text-align: right;
		flex: 1;
		margin-right: 20rpx;
	}
	.sureBtn {
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		background-color: #FF1558;
	}
	.everyRow{
		width: 702rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;
		display: flex;
		height: 88rpx;
		align-items: center;
		padding-right: 24rpx;
	}
	.promotionView{
		color: #666666;
		flex: 1;
	}
	.couponBtnIcon {
		width: 36rpx;
		height: 36rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}
	
	.couponBtnIcon.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}
</style>
