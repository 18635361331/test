<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="{title:'退款详情'}"></defaultTitle>
		<view class="statusHead" v-if="refundInfo.refundIntervening==1">
			请等待平台客服处理
		</view>
		<view class="statusHead" v-else>
			{{stateList[refundInfo.refundState]?stateList[refundInfo.refundState]:""}}
			{{countdown.countText?countdown.countText:""}}
		</view>
		<view class="logistics" v-if="(refundInfo.orderState==30||refundInfo.orderState==40) && logisticsDetails && logisticsDetails.dataList" @click="goToLogisticsDetails">
			<view class="logisticsBox">
				<view class="logisticsIcons">
					{{logisticsDetails.dataList?logisticsDetails.dataList[0]:""}}
				</view>
			</view>
			<view class="arrowIcon"></view>
		</view>
		<view class="orderDetails-info" v-if="refundInfo.refundState==3">
			<view class="info-title">商家信息<span style="margin-right:.1rem;margin-left:.1rem">{{refundInfo.merchantReturnDTO.consignee}}</span><span>{{refundInfo.merchantReturnDTO.contactNumber}}</span></view>
			<view class="info-text address">
				{{refundInfo.merchantReturnDTO.districtStr+refundInfo.merchantReturnDTO.contactAddress}}
			</view>
		</view>
		<view class="" v-if="refundInfo.refundState==3">
			<view class="logisticsNews">
				<view class="logisticsName">
					物流公司
				</view>
				<view class="logisticsIcon" @click="openLogisticsCompany">
					{{logisticsCompanyName?logisticsCompanyName:"请选择"}}
				</view>
			</view>
		</view>
		<view class="" v-if="refundInfo.refundState==3">
			<view class="logisticsNews">
				<view class="logisticsName">
					运单编号
				</view>
				<view class="logisticsNo">
					<input type="text" v-model="submitInfo.logisticsNo" placeholder="请填写" placeholder-style="color:#ccc" />
				</view>
			</view>
		</view>
		<view class="refundBox">
			<view class="goodsList" v-for="v,i in refundInfo.refundGoodsDTOS" :key='i' @click="goToGoodsDetails(v)">
				<image :src="imgBaseUrls+v.goodsImg" mode=""></image>
				<view class="goodsInfo">
					<view class="goodsName ellipsis-two">
						{{v.goodsName}}
					</view>
					<view class="goodsSpce">
						{{v.goodsFileValue}}
					</view>
					<view class="goodsPrice">
						<view>
							<text class="priceSymbol">￥</text>
							<text>{{v.goodsPayPrice}}</text>
						</view>
						<view class="goodsNum">
							<text>x</text>
							<text>{{v.goodsNum}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="afterSaleDetails">
			<view>退款原因：{{refundInfo.refundReason}}</view>
			<view>退款金额：￥{{refundInfo.refundPrice}}</view>
			<view>申请件数：{{refundInfo.refundGoodsNum}}件</view>
			<view>申请时间：{{$utils.formatDate(refundInfo.refundTime,"yyyy-MM-dd")}}</view>
			<view>退款编号：{{refundInfo.id}}</view>
		</view>
		<view class="refuseReason" v-if="refundInfo.refundState==7 || refundInfo.refundState==8 || refundInfo.refundState==10">
			未通过原因：{{refundInfo.auditRemark?refundInfo.auditRemark:refundInfo.refundDescription}}
		</view>
		<view class="line"></view>
		<!-- 退款详情展示按钮 -->
		<refundBtn :refundInfo='refundInfo' :submitInfo='submitInfo' @refundDetail='refundDetail'></refundBtn>

		<uni-popup ref="logisPopup" type="bottom">
			<view class="popupMain">
				<view class="logisTitle">
					快递公司
				</view>
				<scroll-view scroll-y="true" class="popupMainBox">
					<view class="everyRow" v-for="item,index in logisticsList" :key='index'>
						<view class="logisticsName">
							{{item.comName}}
						</view>
						<view class="chooseIcon" :class="item.id==submitInfo.logisticsCompanyId?'active':''" @click="setChooseLogistics(item)"></view>
					</view>
				</scroll-view>
				<view class="footerBtn" @click="closeLogisticsCompany">
					完成
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import status from '@/pages/refund/status.js';
	import tradeApi from '@/api/trade/index.js';
	import transportApi from '@/api/transport/index.js'
	import refundBtn from './refundBtn/index.vue'
	export default {
		data() {
			return {
				refundInfo: {}, //售后详情
				imgBaseUrls: "",
				stateList: [ //售后状态
					"",
					"请等待卖家处理",
					"请等待卖家处理",
					"待寄回商品",
					"待商家确认收货",
					"退款中",
					"已退款",
					"卖家拒绝退款",
					"卖家拒绝退货",
					"退款关闭",
					"平台已拒绝"
				],
				countdown: { //倒计时
					inter: "", //倒计时定时器
					timeText: "", //倒计时时间
					countText: "", //倒计时文案
				},
				submitInfo: { //寄回商品参数
					logisticsCompanyId: "",
					logisticsNo: "",
					refundOrderId: "",
				},
				logisticsCompanyName: "",	//物流公司中文名
				logisticsList:[],	//快递公司列表
				logisticsDetails:{}
			}
		},
		methods: {
			refundDetail() { //获取售后详情
				tradeApi.refundDetail(this.$Route.query.returnOrderId).then(res => {
					if (res.data.code == 200) {
						res.data.data.refundStateName = status.refundStatus(res.data.data.refundState)
						this.refundInfo = res.data.data;
						this.statusJudge();
						if(res.data.data.orderState==30 || res.data.data.orderState==40){
							this.getReturnExpressageInfo()
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getReturnExpressageInfo(){	//获取物流信息
				transportApi.getReturnExpressageInfo({returnOrderId:this.$Route.query.returnOrderId}).then(res=>{
					if(res.data.code==200){
						this.logisticsDetails = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getLogistics(){	//获取快递公司
				transportApi.getLogistics().then(res=>{
					if(res.data.code==200){
						this.logisticsList = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			statusJudge() { //状态的判断
				if (this.refundInfo.refundState == 1 && this.refundInfo.orderState == 20) {
					this.countdown.timeText = this.refundInfo.refundTime + 2 * 24 * 60 * 60 * 1000 - new Date().getTime();
				} else if (this.refundInfo.refundState == 1 && (this.refundInfo.orderState == 30 || this.refundInfo.orderState ==
						40)) {
					this.countdown.timeText = this.refundInfo.refundTime + 5 * 24 * 60 * 60 * 1000 - new Date().getTime();
				} else if (this.refundInfo.refundState == 2) {
					//   申请时间
					this.countdown.timeText = this.refundInfo.refundTime + 5 * 24 * 60 * 60 * 1000 - new Date().getTime();
				} else if (this.refundInfo.refundState == 3 || this.refundInfo.refundState == 7 || this.refundInfo.refundState == 8) {
					//   审核时间
					this.countdown.timeText = this.refundInfo.auditTime + 7 * 24 * 60 * 60 * 1000 - new Date().getTime();
				} else if (this.refundInfo.refundState == 4) {
					// 发货
					this.countdown.timeText = this.refundInfo.shipmentsTime + 7 * 24 * 60 * 60 * 1000 - new Date().getTime();
				}
				if (this.refundInfo.refundState == 1 || this.refundInfo.refundState == 2 || this.refundInfo.refundState == 3 ||
					this.refundInfo.refundState == 4 || this.refundInfo.refundState == 7 || this.refundInfo.refundState == 8) {
					this.countdown.inter = setInterval(this.interTime, 1000)
				}
			},
			interTime() {
				this.countdown.timeText = this.countdown.timeText - 1000;
				let seconds = Math.floor((this.countdown.timeText / 1000) % 60);
				let minutes = Math.floor((this.countdown.timeText / 1000 / 60) % 60);
				let hours = Math.floor((this.countdown.timeText / (1000 * 60 * 60)) % 24);
				let days = Math.floor(this.countdown.timeText / (1000 * 60 * 60 * 24));
				this.countdown.countText = days + "天" + hours + "小时" + minutes + "分";
				if (this.countdown.timeText < 0 || this.countdown.timeText == 0) {
					clearInterval(this.countdown.inter);
					this.countdown.countText = "0天0小时0分";
					return;
				}
			},
			goToGoodsDetails(item) { //去往商品详情
				this.$Router.push({
					path: "/pages/goodsDetails/index",
					query: {
						goodsId: item.itemId
					}
				})
			},
			goToLogisticsDetails(){
				this.$Router.push({path:'/pages/refundLogistics/index',query:{returnOrderId:this.$Route.query.returnOrderId}});
			},
			setChooseLogistics(item){	//设置选中的物流公司
				this.logisticsCompanyName = item.comName;
				this.submitInfo.logisticsCompanyId = item.id
			},
			openLogisticsCompany(){	//打开物流公司选择弹窗
				this.$refs.logisPopup.open();
			},
			closeLogisticsCompany(){	//关闭物流公司选择弹窗
				this.$refs.logisPopup.close();
			}
		},
		components: {
			refundBtn
		},
		onShow() {
			this.zhuge.track("退款详情-落地页")
			this.submitInfo.refundOrderId = this.$Route.query.returnOrderId
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.refundDetail();
			this.getLogistics()
		}
	}
</script>

<style scoped>
	

	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}

	.logistics{
		display: flex;
		margin-left: 24rpx;
		padding: 18rpx 24rpx 18rpx 0;
	}
	.logisticsBox{
		flex: 1;
	}
	.arrowIcon{
		width: 48rpx;
		margin-right: 10rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
	}
	.logisticsTitle{
		font-size: 30rpx;
		line-height: 40rpx;
		color: #333333;
	}
	.logisticsIcons{
		color: #999999;
		font-size: 26rpx;
		width: 100%;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/che.png) no-repeat;
		background-position-y:6rpx;
		background-size: 30rpx;
		padding-left: 40rpx;
	}
	.statusHead {
		width: 100%;
		height: 138rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/gr2@2x.png) no-repeat 50%;
		background-size: 100% 139rpx;
		text-align: center;
		padding-top: 28rpx;
		color: #FFFFFF;
	}

	.goodsInfo {
		flex: 1;
		height: 150rpx;
		margin: 0 24rpx;
	}

	.goodsList {
		padding: 22rpx 0;
		display: flex;
		background: #fafafa;
		height: 194rpx;
	}

	.goodsList image {
		width: 150rpx;
		height: 150rpx;
		border: 1rpx solid #EEEEEE;
		border-radius: 10rpx;
		margin-left: 24rpx;
	}

	.goodsName {
		width: 1005;
		height: 72rpx;
		line-height: 36rpx;
		color: #666666;
	}

	.goodsSpce {
		width: 100%;
		margin-top: 5rpx;
		font-size: 24rpx;
		line-height: 27rpx;
		color: #999999;
	}

	.goodsPrice {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		color: #FF1558;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10rpx;
	}

	.priceSymbol {
		font-size: 24rpx;
	}

	.goodsNum {
		color: #666;
	}

	.afterSaleDetails {
		padding: 20rpx 24rpx;
		color: #999999;
		font-size: 26rpx;
	}

	.afterSaleDetails view {
		margin-bottom: 10rpx;
	}

	.line {
		width: 100%;
		height: 16rpx;
		background-color: #F5F5F5;
	}

	.refuseReason {
		border-top: 1rpx solid rgb(228, 228, 228);
		padding: 20rpx 24rpx;
		color: #999999;
	}

	.orderDetails-info {
		padding: 18rpx 24rpx;
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}

	.info-title {
		font-size: 30rpx;
		line-height: 40rpx;
		color: #333333;
	}

	.info-text.address {
		padding-left: 50rpx;
		font-size: 26rpx;
		color: #999999;
		margin-top: 6rpx;
		line-height: 36rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/adress_step@2x.png) no-repeat 50%;
		background-size: 18rpx 24rpx;
		background-position: 10rpx 8rpx;
	}

	.logisticsNews {
		width: 100%;
		height: 88rpx;
		border-bottom: 1rpx solid #DBDBDB;
		font-size: 30rpx;
		color: #333333;
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
	}

	.logisticsName {
		line-height: 88rpx;
	}

	.logisticsIcon {
		flex: 1;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/fill_1copy102x.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
		text-align: right;
		background-position: right center;
		padding-right: 26rpx;
		line-height: 88rpx;
		color: #9B9B9B;
	}

	.logisticsNo {
		flex: 1;
		height: 88rpx;
		text-align: right;
		padding-right: 26rpx;
		line-height: 88rpx;
		color: #9B9B9B;
	}

	.logisticsNo input {
		height: 100%;
		line-height: 88rpx;
		padding-left: 40rpx;
		font-size: 24rpx;
	}

	.popupMain {
		height: 752rpx;
		width: 100%;
		background-color: #FFFFFF;
	}
	.logisTitle{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.popupMainBox{
		width: 100%;
		height: calc(100% - 180rpx);
	}
	.footerBtn{
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: #FFFFFF;
		background-color: #FF1558;
	}
	.everyRow{
		width: 100%;
		height: 96rpx;
		line-height: 96rpx;
		border-bottom: 1rpx solid #E5E5E5;
		padding: 0 24rpx;
		color: #333333;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.chooseIcon{
		width: 36rpx;
		height: 36rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}
	.chooseIcon.active{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}
</style>
