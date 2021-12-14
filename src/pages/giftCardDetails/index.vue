<template>
	<view class="page cardInfo">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="giftCardPic">
			<image :src="imgBaseUrls+giftCardInfo.cover"></image>
		</view>
		<view class="giftCardTitle ellipsis-one">
			{{giftCardInfo.cardName}}
		</view>
		<view class="priceTitle">
			面值选择
		</view>
		<view class="priceList">
			<view class="everyPrice" :class="batchId==item.batchId?'active':''" @click="batchIdChange(item)" v-for="item,index in giftCardInfo.itemList" :key='index'>
				<view class="price">
					{{item.faceValue}}
					<text>元</text>
				</view>
				<view>
					售价：{{item.salePrice}}元
				</view>
				<image v-if="batchId==item.batchId" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/gift_card_select@2x.png" mode=""></image>
			</view>
		</view>
		<view class="priceTitle range">
			<view>使用范围</view>
			<view class="useStore noBg" v-if="giftCardInfo.applyScope==1">全平台通用</view>
			<view class="useStore" v-if="giftCardInfo.applyScope==2" @click="goToCardStoreList"><text>查看可用店铺</text> <text class="icon"></text></view>
			<view class="useStore" v-if="giftCardInfo.applyScope==3" @click="notAllowPopupOpen"><text>查看不适用店铺</text>  <text class="icon"></text></view>
			<view class="useStore" v-if="giftCardInfo.applyScope==4" @click="goToCardGoods"><text>查看可用商品</text>  <text class="icon"></text></view>
		</view>
		<view class="priceTitle">
			<view>礼卡详情</view>
		</view>
		<view class="details">
			<rich-text :nodes="giftCardInfo.spec.replace(/\<img/gi,'<img style=max-width:100%;height:auto;display:block')"></rich-text>
		</view>
		<view class="nowBuyBtn fixedPosition" @click="buyPopupOpen">
			立即购买
		</view>
		<uni-popup ref="buyPopup" type="bottom">
			<view class="giftBuyDetails">
				<view class="gifyBuyTitle" @click="buyPopupClose"></view>
				<view class="giftBuyCover">
					<view class="giftCardImage" :style="{backgroundImage:'url('+imgBaseUrls+giftCardInfo.cover+')'}"></view>
					<view class="cardInfoPopup">
						<view class="cardInfoTitle">
							{{giftCardInfo.cardName}}
						</view>
						<view>
							面值：<text class="symbol">¥</text><text class="facePrice">{{giftCardInfo.faceValue}}</text>
						</view>
						<view>
							售价：<text>¥</text><text>{{giftCardInfo.salePrice}}</text>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="buyAllPrice">
						<text>购买总面额</text>
						<text>¥{{parseFloat(giftCardInfo.faceValue*issueNum).toFixed(2)}}</text>
					</view>
					<view class="buyAllPrice" v-if='parseFloat((giftCardInfo.faceValue - giftCardInfo.salePrice)*issueNum)>0'>
						<text>优惠金额</text>
						<text>¥{{parseFloat((giftCardInfo.faceValue - giftCardInfo.salePrice)*issueNum).toFixed(2)}}</text>
					</view>
					<view class="cardBuyNum">
						<view>数量</view>
						<view class="limitNum">
							<view class="jian"  @click="jian()">-</view>
							<input type="number" v-model="issueNum" @blur='goodsNumBlur()' />
							<view class="jia" @click="jia()">+</view>
						</view>
					</view>
				</view>
				<view class="buyFoot">
					<view class="payment">
						实付款：<text class="paymentPrice">¥{{parseFloat(giftCardInfo.salePrice*issueNum).toFixed(2)}}</text>
					</view>
					<view class="buyBtn" @click="sure">
						确认
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 不适用店铺 -->
		<uni-popup ref="notAllowShopPopup" type="center">
			<view class="notAllowShop">
				<view class="gifyBuyTitle" @click="notAllowPopupClose">
					<text>该礼卡不适用店铺</text>
				</view>
				<view class="giftCardShop">
					<text v-for="item in giftCardInfo.storeNameList" :key="item">
					  {{item}}
					</text>
				  </view>
				
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js'
	export default{
		data(){
			return{
				defaultTitleDto:{
					title:'购买礼卡',
				},
				giftCardInfo:{
					
				},
				imgBaseUrls:"",
				batchId:"",	//选中的id
				issueNum:1,	//购买的数量
			}
		},
		methods:{
			buyPopupOpen(){	//打开购买礼卡弹窗
				this.$refs.buyPopup.open();
			},
			buyPopupClose(){	//关闭购买礼卡弹窗
				this.$refs.buyPopup.close();
			},
			notAllowPopupOpen(){	//打开不适用店铺弹窗
				this.$refs.notAllowShopPopup.open();
			},
			notAllowPopupClose(){	//关闭不适用店铺弹窗
				this.$refs.notAllowShopPopup.close();
			},
			batchIdChange(item){	//面值切换
				this.batchId = item.batchId;
				this.giftCardDetail()
			},
			giftCardDetail(){	//获取详情
				appApi.giftCardDetail({batchId:this.batchId}).then(res=>{
					if(res.data.code==200){
						this.giftCardInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToCardStoreList(){
				this.$Router.push({
					path:"/pages/cardStoreList/index",
					query:{
						cardId:this.batchId
					}
				})
			},
			goToCardGoods(){	//去往礼卡商品列表
				this.$Router.push({
					path:"/pages/giftCardGoods/index",
					query:{
						batchId:this.batchId,
						cardName:this.giftCardInfo.cardName
					}
				})
			},
			jian(item) { //商品数量减
				if (this.issueNum > 1) {
					this.issueNum--;
				}
			},
			jia(item) { //商品数量加
				if (this.issueNum < this.giftCardInfo.limitNum) {
					this.issueNum++;
				}
			},
			goodsNumBlur() { //购物车商品数量变化时触发
				if (this.issueNum) {
					if (this.giftCardInfo.limitNum < this.issueNum) {
						this.issueNum = parseInt(this.giftCardInfo.limitNum)
					} else if (this.issueNum< 1) {
						this.issueNum = 1
					} else {
						this.issueNum = this.issueNum
					}
				} else {
					this.issueNum = 1
				}
			},
			sure(){
				this.buyPopupClose()
				this.$Router.push({
					path:"/pages/giftFillInOrder/index",
					query:{
						batchId:this.giftCardInfo.batchId,
						issueNum:this.issueNum,
						orderKey:this.giftCardInfo.orderKey
					}
				})
			}
		},
		mounted() {
			
		},
		onShow() {
			this.batchId = this.$Route.query.batchId
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.giftCardDetail()
		}
	}
</script>

<style scoped>
	.cardInfo{
		padding: 0rpx 36rpx 100rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.giftCardPic{
		width: 600rpx;
		height: 372rpx;
		border-radius: 18rpx;
		box-shadow: 0 6px 25px 0 rgba(0,0,0,.12);
		margin: 24rpx auto 0;
	}
	.giftCardTitle{
		font-size: 34rpx;
		line-height: 45rpx;
		font-weight: 700;
		text-align: center;
		margin-top: 36rpx;
		margin-bottom: 40rpx;
	}
	.priceTitle{
		margin-bottom: 36rpx;
		font-size: 34rpx;
		font-weight: 700;
		display: flex;
		justify-content: space-between;
	}
	.priceList{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 36rpx;
	}
	.everyPrice{
		width: 202rpx;
		height: 129rpx;
		color: #333333;
		font-size: 22rpx;
		margin-bottom: 36rpx;
		margin-right: 36rpx;
		box-shadow: 0 6px 25px 0 rgba(0,0,0,.12);
		border-radius: 18rpx;
		text-align: center;
		border: 2rpx solid rgba(0,0,0,0);
		position: relative;
	}
	.everyPrice image{
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		right: 0;
		top: 0;
	}
	.everyPrice:nth-of-type(3n){
		margin-right: 0;
	}
	.everyPrice.active{
		border: 2rpx solid #FF1558;
	}
	.everyPrice.active .price{
		color: #FF1558;
	}
	.price{
		font-size: 36rpx;
		margin-top: 18rpx;
		margin-bottom: 10rpx;
	}
	.price text{
		font-size: 28rpx;
	}
	.useStore{
		/* width: 200rpx; */
		text-align: right;
		font-weight: 400;
		font-size: 26rpx;
		color: #666666;
		padding-right: 30rpx;
	}
	.useStore text{
		display: inline-block;
		vertical-align: middle;
	}
	.useStore .icon{
		width: 12rpx;
		height: 24rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 100% 100%;
		margin-left:10rpx;
	}
	.useStore.noBg{
		background: none;
	}
	.range{
		margin-bottom: 60rpx;
	}
	.nowBuyBtn{
		width: 100%;
		min-height: 88rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		line-height: 88rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		font-weight: 600;
		font-size:32rpx;
	}
	.giftBuyDetails,.notAllowShop{
		width: 100%;
		height: 795rpx;
		background-color: #FFFFFF;
		position: relative;
	}
	.gifyBuyTitle{
		height: 40rpx;
		width: 100%;
		padding: 30rpx 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png) no-repeat 50%;
		background-size: 40rpx;
		background-position: 98% 20rpx;
	}
	.giftBuyCover{
		width: 100%;
		display: flex;
		padding: 0 60rpx;
	}
	.giftCardImage{
		width: 330rpx;
		height: 214rpx;
		border-radius: 18rpx;
		box-shadow: 0 6px 25px 0 rgba(0,0,0,.12);
		background-position: 50%;
		background-size: cover;
		background-repeat: no-repeat;
		
	}
	.cardInfoPopup{
		padding-left: 30rpx;
	}
	.cardInfoTitle{
		font-size: 34rpx;
		font-weight: 700;
		margin-bottom: 24rpx;
	}
	.symbol{
		color: #FF1558;
	}
	.facePrice{
		font-size: 32rpx;
		color: #FF1558;
	}
	.buyAllPrice{
		width: calc(100% - 20rpx);
		height: 100rpx;
		border-bottom: 1rpx solid #E4E4E4;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		margin-left: 20rpx;
	}
	.content{
		width: 100%;
		margin-top: 40rpx;
		border-top:1rpx solid #E4E4E4;
		border-bottom: 1rpx solid #E4E4E4;
	}
	.cardBuyNum{
		padding: 40rpx 30rpx;
		
	}
	.limitNum {
		background-color: #FFFFFF;
		width: 188rpx;
		height: 50rpx;
		display: flex;
		margin-top: 20rpx;
	}
	
	.limitNum .jia,
	.limitNum .jian {
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		line-height: 48rpx;
		border: 1px solid #E6E6E6;
	}
	
	.limitNum input {
		width: 88rpx;
		height: 100%;
		text-align: center;
		border-top: 1px solid #E6E6E6;
		border-bottom: 1px solid #E6E6E6;
		font-size: 24rpx;
	}
	.buyFoot{
		width: 100%;
		height: 100rpx;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: flex-end;
	}
	.buyBtn{
		width: 230rpx;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		text-align: center;
	}
	.payment{
		line-height: 100rpx;
		margin-right: 30rpx;
	}
	.paymentPrice{
		color: #FF1558;
	}
	
	.notAllowShop{
		width: 600rpx;
		border-radius: 32rpx;
		padding-bottom: 50rpx;
		height: auto;
		text-align: center;
	}
		
	.notAllowShop .gifyBuyTitle{
		font-size: 30rpx;
		background-position: 94% 30rpx;
	}
	
	.giftCardShop{
		width: 100%;
		margin-top: 24rpx;
		text-align: center;
		overflow-y: scroll;
		max-height: 380px;
		min-height: 50rpx;
	}
	.giftCardShop text{
		display: block;
		font-size: 30rpx;
		color: #e61446;
		line-height:50rpx;
		margin-top: 40rpx;
		display: block;
		height: 50rpx;
		flex: 1;
		overflow: hidden;
	}
</style>
