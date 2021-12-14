<template>
	<view class="page goodsCus">
		<view class="goodsTitle">
			<!-- #ifndef MP-WEIXIN -->
			<view class="goBackBtn" @click="goBack(1)"></view>
			<!-- #endif -->
			<view class="goodsOperate">
				<view class="operateBtnTitle" @click.stop="operateFlag=!operateFlag">
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
		<goodsBanner v-if="isGetInfo" :goodsInfo='goodsInfo'></goodsBanner>
		<goodsPrice v-if="isGetInfo" :goodsInfo='goodsInfo' :chooseSpceData="chooseSpceData" :goodsInfoId='goodsInfoId'></goodsPrice>
		<block v-if="goodsInfo.singlePromotionType>50">
			<memberInterests :goodsInfo='goodsInfo'></memberInterests>
		</block>
		<cusAttr ref='cusAttr' v-if="isGetInfo" :goodsInfo='goodsInfo' :chooseSpceData="chooseSpceData" @goToMake='goToMake' @updateSku='updateSku' @UpdateGoodsInfo='UpdateGoodsInfo'></cusAttr>
		<cusPrice :goodsInfo='goodsInfo'></cusPrice>
		<shop v-if="isGetInfo" @setQiyuKefuGroupId='setQiyuKefuGroupId' :goodsInfo='goodsInfo'></shop>
		<view class="details" v-if="isGetInfo">
			<goodsDetails :goodsInfo='goodsInfo'></goodsDetails>
		</view>
		<view class="footOperate fixedPosition">
			<view class="operateBtn">
				<view class="collectBtn" @click="isCollectionFlag?cancelGoodsFavorite():saveGoodsFavorite()">
					<image v-if="isCollectionFlag" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/cusCollectionTrue.png" mode=""></image>
					<image v-else src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/cusCollection.png" mode=""></image>
					<view>收藏</view>
				</view>
				<view class="collectBtn" @click="openKefu(qiyuKefuGroupId)">
					<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/cusKf.png" mode=""></image>
					<view>客服</view>
				</view>
			</view>
			<view class="buyBtn" @click="goToMake()">
				
			</view>
		</view>
	</view>
</template>

<script>
	import goodsApi from '@/api/goods/index.js';
	import goodsBanner from './goodsBanner/index.vue';	//banner轮播图
	import cusAttr from './cusAttr/index.vue';	//属性
	import shop from './shop/index.vue';	//店铺
	import cusPrice from './cusPrice/index.vue';	//定制价格、定制流程、服务
	import goodsDetails from '../goodsDetails/details.vue'; // 商品详情
	import goodsPrice from './goodsPrice/index.vue';	//商品价格、商品名称
	import mixin from '../goodsDetails/mixin.js';
	import qiyuPlug from '@/plugInUnit/qiyuPlug.js'
	import memberInterests from '../goodsDetails/memberInterests.vue'
	export default {
		mixins:[mixin,qiyuPlug],
		data(){
			return{
				titleTransparent: 0, //头部透明度
				chooseSpceData: {
					name: "", //选中的名称
					checkList: [], //选中和未选中的sku列表  用来循环判断是否有未选中的
					number: 1,
					minOrderNum:1,
					price: null
				},
				operateFlag: false, //头部...操作按钮是否显示开关
				qiyuKefuGroupId:"",
			}
		},
		methods:{
			getGoodsDetail() { //获取商品详情
				uni.showLoading({
					title:"加载中..."
				})
				goodsApi.cusGoodsDetails(this.goodsInfoId).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						if(res.data.data.videoInfo){
							res.data.data.itemPictureDtos.unshift({
								isVideo:true,
								name:res.data.data.videoInfo
							})
						}
						this.goodsInfo = res.data.data;
						this.isGetInfo = true;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			goToMake(){	//去往提交订单页面
				if (!uni.getStorageSync("sessionId")) {
					this.$Router.push({
						path: "/pages/login/index"
					})
					return false;
				}
				if(!this.chooseSpceData.skuId){
					uni.showToast({
						title:"请选择商品规格",
						icon:"none"
					})
					this.$refs.cusAttr.openSkuPopup()
					return
				}
				this.$Router.push({
					path:"/pages/customizationOrder/makeSure",
					query:{
						goodsId:this.chooseSpceData.skuId,
						goodsNum:this.chooseSpceData.number,
						qiyuKefuGroupId:this.qiyuKefuGroupId?this.qiyuKefuGroupId:""
						
					}
				})
			},
			updateSku(item) { //更新sku信息
				for (let i in item) {
					this.$set(this.chooseSpceData, i, item[i])
				}
			},
			UpdateGoodsInfo(item) { //更新商品数据
				for (let i in item) {
					this.$set(this.goodsInfo, i, item[i])
				}
			},
			goHome(){
				uni.switchTab({url:'/pages/index/index'})
			},
			goMyPage(){
				uni.switchTab({
					url:"/pages/my/index"
				})
			},
			setQiyuKefuGroupId(id){
				this.qiyuKefuGroupId = id
			}
		},
		onShow() {
		},
		onPageScroll(params) {	//头部透明度变化的数值
			this.titleTransparent = params.scrollTop / 200;
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
					this.goodsInfoId = query.goodsId 
				}
				if(this.$Route.query.goodsId){
					this.goodsInfoId = this.$Route.query.goodsId
				}
				this.zhuge.track("商品详情页",{
					"商品id":this.goodsInfoId
				})
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
		onShareAppMessage(res) { //发送给朋友
			return {
				title: this.goodsInfo.name,
				path: "/pages/goodsCustomized/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")+"&goodsId="+this.goodsInfoId,
				imageUrl: this.$config.imgBaseUrl + this.goodsInfo.itemPictureDtos[0].name
			}
		},
		onShareTimeline(res) { //分享到朋友圈
			return {
				title: this.goodsInfo.name,
				path: "/pages/goodsCustomized/index?shareNumber="+(uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):"")+"&goodsId="+this.goodsInfoId,
				imageUrl: this.$config.imgBaseUrl + this.goodsInfo.itemPictureDtos[0].name
			}
		},
		components:{
			goodsDetails,
			goodsBanner,
			shop,
			cusPrice,
			cusAttr,
			goodsPrice,
			memberInterests
		}
	}
</script>

<style scoped>
	.goodsCus{
		background-color: #F5F5F5;
		padding-bottom: 120rpx;
	}
	.details{
		margin-top: 20rpx;
	}
	.footOperate {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: calc(120rpx + constant(safe-area-inset-bottom));
		height: calc(120rpx + env(safe-area-inset-bottom));
		display: flex;
		background-color: #fff;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx 0 24rpx;
		border-top: 1rpx solid #CCCCCC;
	}
	.buyBtn{
		width: 540rpx;
		height: 149rpx;
		background: url(https://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/orderNow.png);
		background-size: 100% 100%;
		margin-top: 26rpx;
		margin-right: -40rpx;
	}
	.operateBtn{
		width: 136rpx;
		display: flex;
		padding-top: 8rpx;
		justify-content: space-between;
	}
	.collectBtn{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.collectBtn image{
		width: 40rpx;
		height: 40rpx;
	}
	.collectBtn view{
		color: #7E8385;
		font-size: 22rpx;
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
	.goodsOperate {
		width: 120rpx;
		height: 88rpx;
		display: flex;
		position: absolute;
		right: 0;
		top:0
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
	.operateBtnTitle {
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
</style>
