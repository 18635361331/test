<template>
	<!-- 商品图片轮播 -->
	<view>
		<view class="swiper-main">
			<swiper class="swiperImg" :circular='true' :indicator-dots="false"  @change="swiperChange" :autoplay="goodsInfo.videoInfo?false:true"
			 interval="2000" duration="500">
				<swiper-item v-for="item,index in goodsInfo.itemPictureDtos" :key='index' >
					<video class="goodsVideo" v-if="item.isVideo && item.name" :muted="true"  object-fit='fill' :src="imgBaseUrls+item.name" controls :show-mute-btn='true'></video>
					<image v-else :src="imgBaseUrls+item.name" mode="aspectFill" @click.stop="openRreviewPopup" > </image>
				</swiper-item>
			</swiper>
			 <view class="indexShow" >
				 {{swiperIndex}} / {{ goodsInfo.itemPictureDtos.length}}
			  </view> 
		</view>
		<!-- 弹出层放大 -->
		<img-preview ref='previewPopup' :previewImageList='goodsInfo.itemPictureDtos' :previewIndex="swiperIndex"></img-preview>
		<!-- 秒杀展示信息开始 -->
		<view class="secKillCont" v-if="seckillInfo.marketingId">
			<view class="secKillPrice">
				<view class="seckillPriceBox">
					<text>￥</text>
					<!-- 未开始  显示最低价  sku更换变化价格 -->
					<block v-if="new Date().getTime() < this.seckillInfo.marketingSessionStartTime">{{seckillInfo.minimumMarketingPrice}}</block>
					<block v-else>{{chooseSpceData.price?chooseSpceData.price:seckillInfo.minimumMarketingPrice}}</block>
				</view>
				<!-- 活动未开始 -->
				<view class="secKillNotice" v-if="new Date().getTime() < this.seckillInfo.marketingSessionStartTime">
					秒杀预告价
				</view>
				<!-- 活动已开始 -->
				<view class="secKillPro" v-else>
					<view class="secKillProChildren" :style="{width:seckillInfo.salesVolumePercentage+'%'}"></view>
					<view class="seckillInfoText">
						已抢{{seckillInfo.salesVolumePercentage}}%
					</view>
				</view>
			</view>
			<!-- 距结束  距开始 -->
			<view class="seckillTime">
				<view class="seckillTimeTitle">
					{{new Date().getTime() > Number(this.seckillInfo.marketingSessionStartTime)?"距结束":"距开始"}}
				</view>
				<view class="secKillTimeContent">
					<text class="timeText">{{timeParams.hours}}</text>
					<text class="timeSymbol">:</text>
					<text class="timeText">{{timeParams.minute}}</text>
					<text class="timeSymbol">:</text>
					<text class="timeText">{{timeParams.seconds}}</text>
				</view>
			</view>
		</view>
		<!-- 秒杀展示信息结束 -->
		
		<!-- 新人价展示 -->
		<!-- 新人价样式 -->
		<view class="newUserPrice" v-if="goodsInfo.singlePromotionType==24">
			新人价
			<text class="currency"> ￥</text>
			<text class="price">{{getGoodsPrice()}}</text>
			 {{!chooseSpceData.price?'起':''}}
		</view>
		<view class="newUserDecora" v-if="goodsInfo.singlePromotionType==24 && getUnderline()">
			售价¥{{getUnderline()}}
		</view>
		
		<!-- 会员享受价 -->
		<view class="memberPriceBox" v-if="!goodsInfo.presaleFlag">
			<view class="memberPrice" v-if="((memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))">
				¥<text class="memberPriceNum">{{chooseSpceData.skuId?chooseSpceData.memberPrice:goodsInfo.minTypePrice}}</text>
				<view class="memberName" :style="{background:memberIconConfig.color}">
					<text>{{memberInfo.memberTypeName}}价</text>
				</view>
			</view>
		</view>
		<!-- 会员享受价结束 -->
		<!-- 价格信息以及营销活动展示 -->
		<view class="goodsPrice" v-if="(goodsInfo.singlePromotionType!=24 && !seckillInfo.marketingId || new Date().getTime() < this.seckillInfo.marketingSessionStartTime) && !goodsInfo.presaleFlag">
			<text class="promotion" v-if="singleProduct.singlePromotion && singleProduct.singlePromotion.type==1">折扣</text>
			<text class="promotion" v-if="singleProduct.singlePromotion && singleProduct.singlePromotion.type==2">一口价</text>
			<text class="currency" :class="((memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))?'':'active'">￥</text>
			<text class="price" :class="((memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))?'':'active'">{{getGoodsPrice()}}</text>
			<text class="decoration" :class="((memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))?'':'active'" v-if="getUnderline()">￥{{getUnderline()}}</text>
			<text class="integralRatio" v-if="goodsInfo.integralRatio">积分抵{{goodsInfo.integralRatio}}%</text>
		</view>
		
		
		<!-- 预售价格 -->
		<view class="openKingBox" v-if="goodsInfo.presaleInfo && goodsInfo.presaleFlag">
			<view class="openBookPrice">
				<view class="openBookAngle">
					预售
				</view>
				<view class="defaultPrice">
					<text class="defPriceArrow">¥</text>
					<text class="defPrice">{{String(getGoodsPrice()).split(".")[0]}}</text>
					<text class="defPriceDian">{{String(getGoodsPrice()).split(".")[1]?'.'+String(getGoodsPrice()).split(".")[1]:''}}</text>
				</view>
				<view class="Underline" v-if="getUnderline()">
					¥{{getUnderline()}}
				</view>
			</view>
			<view class="memberTypePrice" v-if="((memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))">
				<view class="memberNumPrice">
					¥{{chooseSpceData.skuId?chooseSpceData.memberPrice:goodsInfo.minTypePrice}}
				</view>
				<view class="memberIcon" v-if="memberInfo.plusFlag&&memberInfo.plusFlag!=4" :style="'background:'+memberIconConfig.color">
					<view class="icon" :style="{backgroundImage:'url('+imgBaseUrls+memberIconConfig.icon+')'}"></view>
					<text>{{memberIconConfig.name}}</text>
				</view>
				<view class="partnerIcon" v-if="memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag" :style="{background:'linear-gradient(125deg,'+ memberIconConfig.startColor +' 0%, '+memberIconConfig.color+' 100%)'}">
					<view class="icon" :style="{backgroundImage:'url('+imgBaseUrls+memberIconConfig.icon+')'}"></view>
					<text>{{memberInfo.memberTypeName}}</text>
				</view>
			</view>
			<view class="remainingTime" v-if="goodsInfo.presaleInfo.daysTillDelivery">
				距现货出售剩<text>{{goodsInfo.presaleInfo.daysTillDelivery}}</text> 天
			</view>
		</view>
		<!-- 预售价格结束 -->
		
		<!-- 商品入口展示 -->
		<view class="goodsRecharge" v-if="entrance && entrance.entranceIcon">
			<view class="rechageBox">
				<image :src="imgBaseUrls+entrance.entranceIcon" mode=""></image>
				<view class="rechageName">{{entrance.showClientName}}</view>
				<view class="rechageArrow">
					{{entrance.btnName}}
				</view>
			</view>
		</view>
		<!-- 商品入口展示信息结束 -->
		

		<!-- 商品名称以及店铺标识 -->
		<view class="goodsName">
			<text v-if="goodsInfo.haitao && !goodsInfo.ownShop">海外购</text>
			<text v-if="!goodsInfo.haitao && goodsInfo.ownShop">自营</text>
			<text v-if="goodsInfo.haitao && goodsInfo.ownShop">自营海淘品</text>
			<view class="goodsNameTitle ellipsis-three">
				{{goodsInfo.name}}
			</view>
			<view>
				<text class="cusTag"  :key='index' v-for="(item,index) in goodsInfo.itemLabelList" v-if="goodsInfo.itemLabelList">{{item.labelDesc}}</text>
			</view>
			<view class="stockNumber">库存：{{getStockNumber()>9999?9999:getStockNumber()}} <text v-if="getStockNumber()>9999">+</text> </view>
			<view class="userNewTips" @click="goToNewUser" v-if="goodsInfo.tips">
				新人消费享 <text>¥{{goodsInfo.tips}}</text>首单礼包
			</view>
			<view class="shareBtn" @click="openSharePopup">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/goods_details_share.png" mode=""></image>
				<view>
					分享
				</view>
			</view>
		</view>
		<!-- 商品名称以及店铺标识结束 -->
		
		<!-- 会员权益展示内容 -->
		
		<block v-if="goodsInfo.singlePromotionType>50">
			<memberInterests :goodsInfo='goodsInfo'></memberInterests>
		</block>
		
		<!-- 分享弹窗 -->
		<share ref='sharePopup' :shareImageList='shareImageList'></share>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js';
	import marketApi from '@/api/marketing/index.js'
	import memberApi from '@/api/member/index.js'
	import memberConfig from '@/common/js/memberConfig.js'
	import promotionApi from '@/api/promotion/index.js'
	import share from './share.vue'	//分享
	import memberInterests from './memberInterests.vue'
	import imgPreview from './imgPreview.vue'	//头部图片放大
	import vipConfig from '@/common/js/vipConfig.js'
	export default {
		/*
			seckillInfo:   秒杀相关信息a
			singleProduct: 选中sku时若有对应的营销活动将对应展示其相关信息
			chooseSpceData:选中的信息
			goodsInfo：    商品详细数据
		*/
		props: ['goodsInfo', 'chooseSpceData', 'singleProduct', 'seckillInfo','goodsInfoId',"memberInfo"],
		data() {
			return {
				// imageH: "", //商品图片的高度
				imgBaseUrls: "",
				entrance: "", //商品价格下面入口展示数据
				timeParams: { //秒杀商品时间
					hours: "",
					minute: "",
					seconds: ""
				},
				authorizeFlag:true,	//是否已授权
				shareImageList:"",	//分享图
				setIntTime:"",	//秒杀倒计时
				swiperIndex:1, // 当前滚动到第几个 
				previewIndex:1, // 传递的当前第几张图
				memberIconConfig:{},	//会员价格样式
				increaseReceive:false,	//是否是他人转增的商品
			};
		},
		methods: {
		    openRreviewPopup () {
				this.previewIndex = this.swiperIndex
				this.$refs.previewPopup.openRreviewPopup()
		    },
			goToNewUser(){	//进入新人专享页面
				this.$Router.push({
					path:"/pages/newUser/index"
				})
			},
			//事件处理函数
			swiperChange(e){
				this.swiperIndex = e.detail.current +1
			},
			entranceShow() { //商品入口展示
				appApi.entranceShow(this.goodsInfoId).then(res => {
					if (res.data.code == 200) {
						this.entrance = res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getStockNumber(){	//获取库存
				
				if(this.increaseReceive && this.chooseSpceData.skuId){
					return this.chooseSpceData.stockNumber
				}else if(this.increaseReceive && !this.chooseSpceData.skuId){
					return this.goodsInfo.allStockNumber
				}else{
					return this.chooseSpceData.stockNumber
				}
			},
			getGoodsPrice(){	//商品价格的展示与判断
				if(this.chooseSpceData.price && !this.singleProduct.singlePromotion){
					return this.chooseSpceData.price
				}else if(!this.chooseSpceData.price && !this.singleProduct.singlePromotion){
					return this.goodsInfo.minPrice
				}else if(this.singleProduct.singlePromotion){
					return this.singleProduct.singlePromotion.promotionPrice
				}
			},
			getUnderline(){	//获取新人划线价
				if(this.goodsInfo.marketPrice){
					return this.goodsInfo.marketPrice
				}else{
					return false
				}
			},
			judgeTimeAccurate(time) { //计算秒杀的时间
				this.timeParams.hours = parseInt(time/3600000,10)<10?("0"+parseInt(time/3600000,10)):parseInt(time/3600000,10)
				this.timeParams.minute = parseInt(time/1000/60%60,10)<10?("0"+parseInt(time/1000/60%60,10)):parseInt(time/1000/60%60,10)
				this.timeParams.seconds = parseInt(time/1000%60)<10?("0"+parseInt(time/1000%60,10)):parseInt(time/1000%60)
			},
			openSharePopup(){//分享图
				if(!uni.getStorageSync("sessionId")){
					this.$Router.push({
						path:"/pages/login/index"
					})
					return
				}
				uni.showLoading({
					title:"生成中..."
				})
				let frontEndType=""
				//#ifdef MP-WEIXIN
					frontEndType = "weixinMini"
				//#endif
				// #ifdef H5
					frontEndType = "weixin"
				//#endif
				let params = {
					frontEndType:frontEndType,
					promotionType:this.goodsInfo.singlePromotionType,
					promotionId:this.goodsInfo.promotionId,
					itemId:this.goodsInfoId
				}
				promotionApi.generatePoster(params).then(res=>{
					if(res.data.code==200){
						this.shareImageList = res.data.data
						this.$refs.sharePopup.openSharePopup()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
					uni.hideLoading()
				})
			}
		},
		destroyed(){
			clearInterval(this.setIntTime)
		},
		async mounted() {
			this.increaseReceive = false;
			if(this.$Route.query.transferOrderId){
				this.increaseReceive = true;
			}
			this.imgBaseUrls = this.$config.imgBaseUrl;
			if(this.memberInfo.plusFlag==4){
				let partner = await vipConfig.getPartner();
				for(let i = 0;i<partner.length;i++){
					if(partner[i].id = this.memberInfo.distributorTypeId){
						this.memberIconConfig = partner[i]
					}
				}
			}else{
				this.memberIconConfig = await vipConfig.getUserVip()
			}
			this.entranceShow(); //商品跳转其它页面入口展示信息
			setTimeout(() => {
				if (this.seckillInfo.marketingSessionEndTime) {
					if (new Date().getTime() < this.seckillInfo.marketingSessionStartTime) { //距开始
						this.judgeTimeAccurate(this.seckillInfo.marketingSessionStartTime - new Date().getTime());
						this.setIntTime=setInterval(()=>{
							if(this.seckillInfo.marketingSessionStartTime - new Date().getTime()<=0){
								clearInterval(this.setIntTime);
								this.judgeTimeAccurate(this.seckillInfo.marketingSessionStartTime - new Date().getTime());
								return
							}
							this.judgeTimeAccurate(this.seckillInfo.marketingSessionStartTime - new Date().getTime());
						},1000)
					} else { //距结束
						this.judgeTimeAccurate(this.seckillInfo.marketingSessionEndTime - new Date().getTime());
						this.setIntTime=setInterval(()=>{
							if(this.seckillInfo.marketingSessionEndTime - new Date().getTime()<=0){
								clearInterval(this.setIntTime);
								this.judgeTimeAccurate(this.seckillInfo.marketingSessionEndTime - new Date().getTime());
								return
							}
							this.judgeTimeAccurate(this.seckillInfo.marketingSessionEndTime - new Date().getTime());
						},1000)
					}
				}
			})
		},
		components:{
			share,imgPreview,memberInterests
		}
	}
</script>

<style scoped>
	.goodsPrice {
		width: 100%;
		background-color: #FFFFFF;
		padding: 0 24rpx;
		font-size: 24rpx;
		color: #333;
	}
	.newUserPrice,.newUserDecora{
		width: 100%;
		background-color: #FFFFFF;
		padding: 0 24rpx;
		line-height: 80rpx;
	}
	.newUserDecora{
		line-height: 40rpx;
		text-decoration: line-through;
		color: #999999;
		font-size: 28rpx;
	}
	.swiperImg {
		width: 100%;
		height: 750rpx;
		background-color: #FFFFFF;
	}
	.goodsVideo{
		width: 100% !important;
		height: 100% !important;
	}
	
	.swiper-main{
		position: relative;
	}
	.indexShow{
		position: absolute;
		left: 50%;
		bottom: 20rpx;
		background: rgba(105, 99, 99, 0.31);
		color: #FFF;
		font-size: 24rpx;
		padding: 5rpx 30rpx;
		border-radius: 30rpx;
		transform: translateX(-50%);
	}
	
	.goodsName {
		width: 100%;
		min-height: 96rpx;
		padding: 12rpx 24rpx;
		font-weight: 700;
		font-size: 30rpx;
		background: #fff;
		position: relative;
		padding-right: 66rpx;
	}
	
	.goodsNameTitle{
		display: inline;
	}
	.stockNumber{
		font-size: 20rpx;
		color: #989898;
		font-weight: 400;
		margin-top: 6rpx;
	}
	.goodsName text {
		font-size: 20rpx;
		color: #FFFFFF;
		background: linear-gradient(313deg, #E6144D 0%, #FF5D89 100%);
		border-radius: 4rpx;
		display: inline-block;
		padding: 0 8rpx;
		margin-right: 12rpx;
		min-width: 70rpx;
		width: auto;
		height: 28rpx;
		white-space: nowrap;
		line-height: 28rpx;
		vertical-align: top;
		margin-top: 8rpx;
		font-size: 20rpx;
	}

	.goodsRecharge {
		width: 100%;
		padding: 12rpx 24rpx;
		background-color: #FFFFFF;
	}

	.rechageBox {
		width: 100%;
		height: 72rpx;
		background-color: #fef0e6;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
	}

	.rechageBox image {
		width: 46rpx;
		height: 46rpx;
		margin-left: 16rpx;
	}

	.rechageName {
		flex: 1;
		padding: 0 12rpx;
	}

	.rechageArrow {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 100%;
		background-size: 10rpx 20rpx;
		line-height: 66rpx;
		padding-right: 20rpx;
		margin-right: 22rpx;
		color: #FF1558;
	}

	.currency {
		font-size: 20rpx;
		font-weight: 700;
		color: #333333;
	}
	.currency.active{
		font-size: 30rpx;
		color: #ff1558;
	}
	.goodsPrice .price {
		font-size: 24rpx;
		color: #333333;
	}
	.goodsPrice .price.active {
		font-size: 60rpx;
		color: #ff1558;
	}
	.integralRatio {
		margin-left: 6rpx;
		background-color: #ffecf1;
		color: #ff1558;
		font-weight: 400;
		font-size: 20rpx;
		padding: 0 12rpx;
	}
	.newUserPrice{
		color: #FE325C;
		font-size: 32rpx;
		display: inline-block;
	}
	.newUserPrice .currency{
		font-size: 28rpx;
		font-weight: 500;
	}
	.newUserPrice .price{
		font-size: 50rpx;
	}
	.promotion {
		border: 1rpx solid #FF1558;
		height: 34rpx;
		line-height: 34rpx;
		display: inline-block;
		border-radius: 8rpx;
		font-size: 20rpx;
		padding: 0rpx 10rpx;
		margin-right: 10rpx;
	}

	.decoration {
		text-decoration: line-through;
		color: #999999;
		font-size: 20rpx;
		margin-left: 10rpx;
	}
	
	.secKillCont {
		width: 100%;
		height: 110rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/seckill_goods_details.png) no-repeat 50%;
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.secKillPrice {
		font-size: 24rpx;
		padding-left: 24rpx;
		padding-top: 6rpx;
	}

	.seckillPriceBox {
		font-size: 54rpx;
		font-weight: 700;
	}

	.seckillPriceBox text {
		font-size: 30rpx;
	}

	.secKillPro {
		width: 198rpx;
		height: 24rpx;
		position: relative;
		background-color: #d6af88;
		border-radius: 100rpx;
		overflow: hidden;
		line-height: 24rpx;
		color: #FFFFFF;
	}

	.secKillProChildren {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		line-height: 24rpx;
		background-color: #000000;
	}

	.seckillInfoText {
		position: absolute;
		left: 10rpx;
		right: 0;
		font-size: 18rpx;
	}

	.seckillTimeTitle {
		text-align: center;
	}

	.seckillTime {
		margin-right: 200rpx;
	}

	.timeText {
		display: inline-block;
		width: 36rpx;
		height: 36rpx;
		background-color: #000000;
		border-radius: 50%;
		color: #FFFFFF;
		text-align: center;
	}

	.secKillTimeContent {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}

	.timeSymbol {
		margin: 0 10rpx;
	}

	.secKillNotice {
		width: 144rpx;
		height: 36rpx;
		background-color: #242424;
		font-size: 23rpx;
		color: #ffe1c3;
		text-align: center;
		line-height: 36rpx;
		border-radius: 18rpx 18rpx 0 0;
	}

	
	.shareBtn{
		position: absolute;
		right: 20rpx;
		top: 10rpx;
		font-weight: 400;
		font-size: 20rpx;
		text-align: center;
	}
	
	.shareBtn image{
		width: 40rpx;
		height: 40rpx;
	}
	
	
	.userNewTips{
		position: absolute;
		top: -100rpx;
		right: 20rpx;
		color: #666;
		font-size: 28rpx;
		font-weight: 400;
		padding-right: 14rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-repeat: no-repeat;
		background-size: 9rpx 21rpx;
		background-position:right 10rpx ;
	}
	.goodsName .userNewTips text{
		font-size: 28rpx;
		font-weight: 700;
		background-color: #FFFFFF;
		color: #666;
		margin-right: 0;
	}
	.memberPriceBox{
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		padding-top: 30rpx;
	}
	.memberPrice{
		width: auto;
		display: inline-block;
		margin-left: 20rpx;
		border-radius: 4px;
		padding-right: 8rpx;
		color: #FF1558;
		font-size: 30rpx;
	}
	.memberName{
		width: auto;
		padding: 0 4rpx;
		height: 25rpx;
		color: #FFFFFF;
		display: inline-block;
		line-height: 25rpx;
		vertical-align: top;
		margin-right: 8rpx;
		position: relative;
		margin-left: 10rpx;
		border-radius: 4rpx;
		color: #FFFFFF;
		vertical-align: top;
		margin-top: 42rpx;
		font-size: 18rpx;
	}
	.memberName text{
		z-index: 10;
		position: relative;
	}
	.memberArrowIcon{
		width: 0;
		height: 0;
		position: absolute;
		border: 16px solid rgba(0,0,0,0);
		border-left: 26px solid transparent;
		left: -18rpx;
		z-index: 0;
	}
	.memberPriceNum{
		font-weight: 700;
		font-size: 60rpx;
	}
	.goodsName .cusTag{
		width: auto;
		height: 28rpx;
		line-height: 24rpx;
		text-align: center;
		color: #FA4C7B;
		border: 1rpx solid #DC416B;
		margin-right: 12rpx;
		font-size: 20rpx;
		padding: 0 8rpx;
		white-space: nowrap;
		font-weight: 400;
		background: none;
	}
	.goodsName .stockNumber text{
		vertical-align: super;
		font-size: 18rpx;
		background: none;
		color: #989898;
		padding: 0;
	}
	.openKingBox{
		width: 100%;
		height: 170rpx;
		background-color: #FEE9E9;
		position: relative;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/openBookingBg.png) no-repeat;
		background-size: 460rpx 100%;
		background-color: #FEE9E9;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 20rpx 0 20rpx 24rpx;
		
	}
	.remainingTime{
		position: absolute;
		right: 0;
		top: 0;
		width: 326rpx;
		height: 100%;
		text-align: right;
		padding-right: 24rpx;
		color: #F71470;
		line-height: 170rpx;
	}
	.remainingTime text{
		width: auto;
		height: 60rpx;
		display: inline-block;
		line-height: 60rpx;
		padding: 0 16rpx;
		color: #FFFFFF;
		background-color: #F71470;
		border-radius: 14rpx;
		margin:0 10rpx;
	}
	.openBookPrice{
		display: flex;
		width: 100%;
		align-items: center;
		height: 48rpx;
		min-width: 100%;
	}
	.openBookAngle{
		width: 100rpx;
		height: 48rpx;
		text-align: center;
		line-height: 48rpx;
		color: #FFFFFF;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/openBookAngle.png) no-repeat ;
		background-size: 100% 100%;
	}
	.defaultPrice{
		color: #FFFFFF;
		font-size: 32rpx;
	}
	.defPriceArrow{
		font-size:22rpx;
		margin:0 4rpx 0 16rpx;
	}
	.defPriceDian{
		font-size: 24rpx;
	}
	.Underline{
		color: rgba(255,255,255,0.5);
		font-size: 24rpx;
		text-decoration: line-through;
		margin-left: 24rpx;
	}
	.memberTypePrice{
		display: flex;
		min-width: 100%;
	}
	.memberNumPrice{
		color: rgba(255,255,255,0.7);
		margin-right: 10rpx;
		display: flex;
		align-items: center;
	}
</style>
<style scoped lang="scss">	
.memberIcon,.partnerIcon{
	height: 40rpx;
	border-radius: 20rpx;
	padding: 0 22rpx 0 14rpx;
	display: flex;
	align-items: center;

	position: relative;
	overflow: hidden;
	view{
		background-size: 100% 100%;
	}
	text{
		margin-left: 12rpx;
		font-size: 20rpx;
		line-height: 1;
		color: #333333;
	}
	.memberColor{
		animation: example 2s infinite ;
		height: 120rpx;
		width: 88rpx;
		background: linear-gradient(89deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
		transform: rotate(207deg);
		position: absolute;
		left: -84rpx;
		top: -40rpx;
		z-index: 1;
	}
}

.memberIcon{
	background-color: #FCDECE;
	color: #fff;
	display: flex;
	align-items: center;
	vertical-align: middle;
}
.memberIcon text{
	color: #FFFFFF;
}
.icon{
	width: 40rpx;
	height: 40rpx;
}
</style>