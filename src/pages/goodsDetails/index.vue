<template>
	<view class="page goodsDetailsBox" @click="operateFlag=false">
		<view class="goodsTitle">
			<view class="goBackBtn" v-if="gobackFlag || isEvaluate" @click="isEvaluate?(isEvaluate=false):goBack(1)"></view>
			<view class="goodsTitleHref" v-if="!isEvaluate" :style="{opacity:titleTransparent}">
				<view class="everyRowTitle" :class="titleChooseIndex==0?'active':''" @click="evaluateJump('goodsBanner')">商品</view>
				<view class="everyRowTitle" :class="titleChooseIndex==1?'active':''" @click="evaluateJump('evaluateTitle')">评价</view>
				<view class="everyRowTitle" :class="titleChooseIndex==2?'active':''" @click="evaluateJump('goodsDetails')">详情</view>
			</view>
			<view class="goodsTitleHref" v-if="isEvaluate">
				<view>小伙伴们说</view>
			</view>
			<view class="goodsOperate">
				<view class="collectionBtn" :class="isCollectionFlag?'active':''" @click="isCollectionFlag?cancelGoodsFavorite():saveGoodsFavorite()"></view>
				<view class="operateBtn" @click.stop="operateFlag=!operateFlag">
					<view class="operateList" v-show="operateFlag">
						<view class="everyOperate" @click="goHome">
							<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/home_more2@2x.png" mode=""></image>首页
						</view>
						<view class="everyOperate" @click="$Router.push({path:'/pages/shop/index',query:{storeId:goodsInfo.belongStore}})">
							<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/store@2x.png" mode=""></image>店铺
						</view>
						<view class="everyOperate" @click="goMyPage">
							<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/my_more2@2x.png" mode=""></image>我的
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!isEvaluate && isGetInfo">
			<view class="everyPage goodsBanner Elevator">
				<!-- 轮播图 -->
				<goodsBanner :goodsInfo='goodsInfo' :goodsInfoId='goodsInfoId' :singleProduct='singleProduct' :chooseSpceData='chooseSpceData' :seckillInfo='seckillInfo' :memberInfo='memberInfo'></goodsBanner>
			</view>
			<openBooking v-if="goodsInfo.presaleFlag" :goodsInfo='goodsInfo'></openBooking>
			<view class="everyPage">
				<!-- 优惠券信息 -->
				<coupon :goodsInfo='goodsInfo' :goodsInfoId='goodsInfoId'></coupon>
				<!-- 活动信息 -->
				<activity :goodsInfo='goodsInfo' :memberInfo='memberInfo' :chooseSpceData='chooseSpceData' :singleProduct='singleProduct' :reducePromotions='reducePromotions'></activity>
			</view>
			<!-- sku  地址 运费 -->
			<view class="everyPage">
				<container ref='container' :goodsInfo='goodsInfo' :increaseFlag='increaseFlag' :singleProduct='singleProduct' :seckillInfo='seckillInfo' :chooseSpceData='chooseSpceData' :memberInfo='memberInfo' :goodsInfoId='goodsInfoId' @addCart='addCart' @bugNow='bugNow'
				 @updateSku='updateSku' @changeIncreaseFlag='changeIncreaseFlag' @UpdateGoodsInfo='UpdateGoodsInfo'></container>
			</view>
			<view class="everyPage evaluateTitle Elevator">
				<!-- 评价 -->
				<evaluate @entryEvaluate='isEvaluate=true' :goodsInfoId='goodsInfoId'></evaluate>
			</view>
			<view class="everyPage">
				<!-- 店铺 -->
				<shop :goodsInfo='goodsInfo'></shop>
			</view>
			<!-- 商品详情 -->
			<view class="goodsDetails Elevator">
				<goodsDetails :goodsInfo='goodsInfo'></goodsDetails>
			</view>
			<footNoMore></footNoMore>
		</view>
		<view v-if="isEvaluate">
			<!-- 评价详情 -->
			<evaluateDetail ref='evaluateDetails' :goodsInfoId='goodsInfoId'></evaluateDetail>
		</view>
		<!-- 无货提示 -->
		<view class="outStock" v-if="goodsInfo.freight && !goodsInfo.freight.canBuy">所选地区暂时无货，非常抱歉！</view>
		<!-- 底部操作栏 -->
		<footOperate v-if='isGetInfo' :goodsInfo='goodsInfo' :chooseSpceData='chooseSpceData' :seckillInfo='seckillInfo' :memberInfo='memberInfo' :goodsInfoId='goodsInfoId' @addCart='addCart' @increaseBuy='increaseBuy' @bugNow='bugNow'></footOperate>
	</view>
</template>

<script>
	import goodsApi from '@/api/goods/index.js';
	import appApi from '@/api/app/index.js';
	import marketApi from '@/api/marketing/index.js';
	import tradeApi from '@/api/trade/index.js';
	import achievementApi from '@/api/achievement/index.js'
	import lotteryApi from '@/api/lottery/index.js'
	import memberApi from '@/api/member/index.js'
	import goodsBanner from './goodsBanner.vue'; //轮播图
	import coupon from './coupon.vue'; //优惠券信息
	import activity from './activity.vue' //活动信息
	import container from './container.vue'; //sku 地址 运费选择
	import evaluate from './evaluate.vue'; //评价
	import shop from './shop.vue'; // 店铺
	import footNoMore from '@/components/footNoMore/index.vue'; //没有更多了
	import goodsDetails from './details.vue'; // 商品详情
	import footOperate from './footOperate.vue'; //底部操作模块
	import evaluateDetail from './evaluateDetail.vue'; //全部评价
	import openBooking from './openBooking.vue'
	import memberConfig from '@/common/js/memberConfig.js'
	import mixin from './mixin.js'
	export default {
		mixins:[mixin],
		data() {
			return {
				titleChooseIndex:0,
				titleTransparent: 0, //头部透明度
				scrollTopNum:"",	//滚动条距离
				operateFlag: false, //头部...操作按钮是否显示开关
				gobackFlag:false,	//是否展示返回按钮
				isEvaluate: false, //是否进入到评价页面
				chooseSpceData: {
					name: "", //选中的名称
					checkList: [], //选中和未选中的sku列表  用来循环判断是否有未选中的
					number: 1,
					price: null
				},
				singleProduct: { //选中sku时若有对应的营销活动将对应展示其相关信息    initSingleProduct 
				},
				reducePromotions: [], //满减列表   获取详情后进行去重 拿到列表
				seckillInfo: { //秒杀相关信息

				},
				increaseFlag:true,//是否展示sku  true展示规格  false不展示   如果转增的话  sku弹窗不展示规格
				memberInfo:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{},
			}
		},
		onShow() {
			this.increaseFlag = true;
			this.memberInfo = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{}
			if(this.goodsInfoId && Object.keys(this.goodsInfo).length){
				this.isGetInfo = false;
				// 判断商品是否是秒杀
				this.marketingSessionItemFlag()
				// 商品详情
				this.getGoodsDetail();
				if (uni.getStorageSync("sessionId")) {
					this.findGoodsFavorite(); //查看商品是否被收藏
				}
			}
			// #ifdef H5
			this.gobackFlag = true	//是否展示返回按钮  h5按钮存在  微信按钮不存在
			// #endif
		},
		onLoad(query) {	//扫码进入该页面后获取分享码
			try{
				if(this.$Route.query.scene){
					this.goodsInfoId = decodeURIComponent(this.$Route.query.scene).split(",")[0]
					if(decodeURIComponent(this.$Route.query.scene).split(",")[1]){
						uni.setStorageSync("routerShareNumber",decodeURIComponent(this.$Route.query.scene).split(",")[1])
					}
				}
				
				if(query && query.scene){
					this.goodsInfoId = decodeURIComponent(query.scene).split(",")[0]
					if(decodeURIComponent(query.scene).split(",")[1]){
						uni.setStorageSync("routerShareNumber",decodeURIComponent(query.scene).split(",")[1])
					}
				}
				if(query && query.goodsId){
					this.goodsInfoId = query.goodsId;
					if(query.shareNumber){
						uni.setStorageSync("routerShareNumber",query.shareNumber)
					}
				}
				if(this.$Route.query.goodsId){
					this.goodsInfoId = this.$Route.query.goodsId;
					if(this.$Route.query.shareNumber){
						uni.setStorageSync("routerShareNumber",this.$Route.query.shareNumber)
					}
				}
				this.zhuge.track("商品详情页",{
					"商品id":this.goodsInfoId
				})
				// 判断商品是否是秒杀
				this.marketingSessionItemFlag()
				// 商品详情
				this.getGoodsDetail();
				if (uni.getStorageSync("sessionId")) {
					this.findGoodsFavorite(); //查看商品是否被收藏
				}
				
			}catch(err){
				uni.showToast({
					title: "系统错误",
					icon: "none"
				})
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
		},
		methods: {
			getGoodsDetail() { //获取商品详情
				uni.showLoading({
					title:"加载中..."
				})
				goodsApi.getGoodsDetail(this.goodsInfoId).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						// 预售信息修改
						let params = res.data.data
						if(params.presaleInfo && params.presaleFlag){
							params.presaleInfo.deliveryStart = this.getTime(params.presaleInfo.deliveryStartTime)
							res.data.data.presaleInfo.deliveryEnd = this.getTime(params.presaleInfo.deliveryEndTime)
							res.data.data.presaleInfo.presaleStart = this.getTime(params.presaleInfo.presaleStartTime)
							res.data.data.presaleInfo.presaleEnd = this.getTime(params.presaleInfo.presaleEndTime)
							res.data.data.presaleInfo.deliveryStartTime = this.$utils.formatDate(res.data.data.presaleInfo.deliveryStartTime,"yyyy年MM月dd日hh:mm")
							res.data.data.presaleInfo.deliveryEndTime = this.$utils.formatDate(res.data.data.presaleInfo.deliveryEndTime,"yyyy年MM月dd日hh:mm")
						}
						// 预售信息修改结束
						if(res.data.data.videoInfo){
							res.data.data.itemPictureDtos.unshift({
								isVideo:true,
								name:res.data.data.videoInfo
							})
						}
						this.goodsInfo = res.data.data;
						this.isGetInfo = true;
						
						this.memberInfo = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{}
						this.initReducePromotions(); //初始化满减活动列表
						this.$nextTick(()=>{
							if(this.$Route.query.transferOrderId){
								this.$refs.container.openSkuPopup()
							}
						})
						
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getTime(time){
				return {
					year : this.$utils.formatDate(time,"yyyy"),
					month : this.$utils.formatDate(time,"MM"),
					day : this.$utils.formatDate(time,"dd"),
					hours : this.$utils.formatDate(time,"hh:mm")
				}
			},
			initReducePromotions() { //初始化满减活动列表
				this.reducePromotions = []
				if (this.goodsInfo.skuPromotionList) {
					for (let i = 0; i < this.goodsInfo.skuPromotionList.length; i++) {
						for (let j = 0; j < this.goodsInfo.skuPromotionList[i].reducePromotions.length; j++) {
							if (this.judgeReduce(this.goodsInfo.skuPromotionList[i].reducePromotions[j])) {
								this.reducePromotions.push(this.goodsInfo.skuPromotionList[i].reducePromotions[j])
							}
						}
					}
				}
			},
			judgeReduce(reduce) { //满减券去重
				for (let i = 0; i < this.reducePromotions.length; i++) {
					if (this.reducePromotions[i].id == reduce.id) {
						return false
					}
				}
				return true
			},
			initSingleProduct() { //选中规格属性后计算营销活动
				if (this.chooseSpceData.skuId) {
					if (this.goodsInfo.skuPromotionList) {
						for (let i = 0; i < this.goodsInfo.skuPromotionList.length; i++) {
							if (this.goodsInfo.skuPromotionList[i].skuId == this.chooseSpceData.skuId) {
								this.singleProduct = this.goodsInfo.skuPromotionList[i]
							}
						}
					}

				} else {
					this.singleProduct = {}
				}
			},
			marketingSessionItemFlag() { //判断商品是否是秒杀
				marketApi.marketingSessionItemFlag(this.goodsInfoId).then(res => {
					if (res.data.code == 200) {
						if (res.data.data) {
							this.seckillInfo = res.data.data;
						} else {
							this.seckillInfo = {}
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			addCart() { //加入购物车
				if (this.addCartJudge()) {
					let params = {
						goodsId: this.chooseSpceData.skuId,
						goodsPrice: this.chooseSpceData.price,
						num: this.chooseSpceData.number
					}
					tradeApi.addCart(params).then(res => {
						if (res.data.code == 200) {
							uni.showToast({
								title: "添加购物车成功",
								icon: "none"
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							})
						}
					})
				}
			},
			addCartJudge() { //加入购物车前的判断
				if (!uni.getStorageSync("sessionId")) {
					this.$Router.push({
						path: "/pages/login/index"
					})
					return false;
				}
				if (!this.chooseSpceData.skuId) {
					uni.showToast({
						title: this.chooseSpceData.name,
						icon: "none"
					})
					this.increaseFlag = true
					this.$refs.container.openSkuPopup()
					return false;
				}
				// 选择的数量大于库存数
				if (this.chooseSpceData.stockNumber <= 0 ) {
					uni.showToast({
						title: "该商品规格库存不足",
						icon: "none"
					})
					return false;
				}
				if(this.chooseSpceData.number > this.chooseSpceData.stockNumber){
					uni.showToast({
						title: "选择的数量大于库存量",
						icon: "none"
					})
					return false;
				}
				return true
			},
			bugNow() { //查看是否可以购买
				if (!this.addCartJudge()) {
					return
				}
				// singlePromotionId   结算时是否展视活动价
				let singlePromotionId = "";
				if(this.goodsInfo.singlePromotionType==22 && new Date().getTime() >= this.seckillInfo.marketingSessionStartTime){	//秒杀开始时才传递
					singlePromotionId = this.seckillInfo.marketingId
				}else{
					singlePromotionId = ""
				}
				let newtype = "";
				if(this.goodsInfo.singlePromotionType>50){
					newtype = this.goodsInfo.singlePromotionType;
					singlePromotionId = this.goodsInfo.promotionId
				}
				appApi.bugNow(this.chooseSpceData.skuId,this.chooseSpceData.number,this.$Route.query.transferOrderId?1:0).then(res => {
					if (res.data.code == 200) {
						this.$Router.push({
							path: "/pages/settlement/index",
							query: {
								cartIds: this.chooseSpceData.skuId || "",
								goodsNum: this.chooseSpceData.number || "",
								singlePromotionId:singlePromotionId || "",
								newtype:this.goodsInfo.singlePromotionType || "",
								transferOrderId:this.$Route.query.transferOrderId || "",
								stockNumber:this.chooseSpceData.stockNumber
							}
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			increaseBuy(flag){	//转增购买
				this.$set(this.$data,"increaseFlag",flag)
				this.$refs.container.openSku()
			},
			changeIncreaseFlag(flag){
				this.increaseFlag = flag;
			},
			updateSku(item) { //更新sku信息
				for (let i in item) {
					this.$set(this.chooseSpceData, i, item[i])
					this.initSingleProduct()
				}
			},
			UpdateGoodsInfo(item) { //更新商品数据
				for (let i in item) {
					this.$set(this.goodsInfo, i, item[i])
				}
			},
			evaluateJump(element){	//点击滚动位置变化
				let viewTop = uni.createSelectorQuery().select("."+element);
				let titleHeight = uni.createSelectorQuery().select(".goodsTitle");
				titleHeight.boundingClientRect((res)=>{				
					viewTop.boundingClientRect((data)=>{
						uni.pageScrollTo({
							duration:0,
							scrollTop:data.top + this.scrollTopNum - 40
						})
					}).exec()
				}).exec()
			},
			goHome(){
				uni.switchTab({url:'/pages/index/index'})
			},
			goMyPage(){
				uni.switchTab({
					url:"/pages/my/index"
				})
			}
		},
		onReachBottom() {	//滚动到底部  如果是在评价详情页的话调用子组件加载更多评价
			if (this.isEvaluate) {
				this.$refs.evaluateDetails.getMoreComment()
			}
		},
		beforeRouteLeave(to, from, next) { //监听页面卸载  关闭sku弹窗
			next()
			this.$refs.container.closeSkuPopup(); 
		},
		onPageScroll(params) {	//头部透明度变化的数值
			this.titleTransparent = params.scrollTop / 200;
			this.scrollTopNum = params.scrollTop;
			let viewTop = uni.createSelectorQuery().selectAll(".Elevator");
			let height2 = 40
			let titleHeight = uni.createSelectorQuery().select(".goodsTitle");
			titleHeight.boundingClientRect((res)=>{
				height2 = res.height
			}).exec()
			viewTop.boundingClientRect((data)=>{
				for(let i = 0;i<data.length;i++){
					if(data[i].top + params.scrollTop - height2 <= params.scrollTop){
						this.titleChooseIndex = i
					} 
				}
			}).exec()
		},
		onShareAppMessage(res) { //发送给朋友
			return {
				title: this.goodsInfo.name,
				path: "/pages/goodsDetails/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")+"&goodsId="+this.goodsInfoId,
				imageUrl: this.$config.imgBaseUrl + this.goodsInfo.itemPictureDtos[0].name
			}
		},
		onShareTimeline(res) { //分享到朋友圈
			return {
				title: this.goodsInfo.name,
				path: "/pages/goodsDetails/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")+"&goodsId="+this.goodsInfoId,
				imageUrl: this.$config.imgBaseUrl + this.goodsInfo.itemPictureDtos[0].name
			}
		},
		components: {
			goodsBanner,
			coupon,
			activity,
			goodsDetails,
			shop,
			footNoMore,
			evaluate,
			footOperate,
			evaluateDetail,
			container,
			openBooking
		}
	}
</script>

<style scoped>
	.goodsDetailsBox {
		background: #F5F5F5;
		position: relative;
		padding-bottom: calc(88rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(88rpx + env(safe-area-inset-bottom));
	}

	.goodsTitle {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		height: 88rpx;
		z-index: 1;
		display: flex;
		justify-content: space-between;
	}

	.everyPage {
		margin-bottom: 24rpx;
	}

	.goBackBtn {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_1@2x.png) no-repeat 50%;
		background-size: 16rpx 30rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.goodsTitleHref {
		width: 100%;
		height: 100%;
		line-height: 88rpx;
		display: flex;
		justify-content: center;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		background-color: #FFFFFF;
	}

	.goodsTitleHref view {
		margin: 0 20rpx;
		line-height: 88rpx;
	}

	.goodsOperate {
		width: 196rpx;
		height: 88rpx;
		display: flex;
		position: absolute;
		right: 0;
		top:0
	}

	.collectionBtn {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collection.png) no-repeat 50%;
		background-size: 40rpx 40rpx;
	}

	.collectionBtn.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/collectionTrue.png) no-repeat 50%;
		background-size: 40rpx 40rpx;
	}

	.operateBtn {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/more_fx2@2x.png) no-repeat 50%;
		background-size: 62rpx 62rpx;
		position: relative;
	}

	.operateList {
		position: absolute;
		top: 80rpx;
		right: 24rpx;
		width: 200rpx;
		border-radius: 12rpx;
		box-shadow: 0 -1px 10px 0 rgba(0, 0, 0, 0.08);
		background: #fff;
	}

	.operateList .everyOperate {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 36rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.everyOperate image {
		width: 40rpx;
		height: 40rpx;
	}

	.outStock {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		position: fixed;
		color: #FF7E18;
		background-color: #fff6e1;
		text-align: center;
		bottom: calc(98rpx + constant(safe-area-inset-bottom));
		bottom: calc(98rpx + env(safe-area-inset-bottom));
		left: 0;
	}
	.everyRowTitle.active{
		font-weight: 700;
		font-size: 20px;
	}
</style>
