<template>
	<view class="pages commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="everyCard" v-for="item,index in orderInfo.records" :key='index'>
			<view class="cardTitle">
				{{item.orderState==0?"待付款":""}}
				{{item.orderState==2?"已取消":""}}
				{{(item.goodsNum==item.remainNum && item.orderState==1)?"待分享":""}}
				{{(item.receivedNum>0 && item.goodsNum!=item.receivedNum)?"分享中":""}}
				{{item.goodsNum==item.receivedNum?"已领完":""}}
			</view>
			<view class="goodsInfo">
				<view class="goodsImage">
					<image :src="imgBaseUrls+item.goodsImage" mode=""></image>
				</view>
				<view class="goodsPrice">
					<view class="goodsName ellipsis-two">
						{{item.goodsName}}
					</view>
					<view class="price">
						<view class="defPrice">
							<text class="priceArrow">¥</text>{{item.goodsPrice}}
						</view>
						<view class="unlinePrice" v-if="item.marketPrice">
							¥{{item.marketPrice}}
						</view>
					</view>
				</view>
			</view>
			<view class="cardInfo">
				<view class="everyCardInfo">
					<text class="fontNum">{{item.goodsNum}}</text>
					<text>礼包总数</text>
				</view>
				<view class="line"></view>
				<view class="everyCardInfo">
					<text class="fontNum">{{item.receivedNum}}</text>
					<text>已领取</text>
				</view>
				<view class="line"></view>
				<view class="everyCardInfo">
					<text class="fontNum">{{item.remainNum}}</text>
					<text>剩余数</text>
				</view>
			</view>
			<view class="cardInfoBtn" v-if="item.orderState!=2 && item.orderState!=0">
				<view class="detailBtn" @click="goTodetail(item.id)">
					查看领取详情
				</view>
				<view class="sendBtn" v-if="item.remainNum!=0" @click="giftBagGeneratePoster(index,item)">
					生成海报送朋友
				</view>
			</view>
			<view class="cardInfoBtn" v-if="item.orderState==0">
				<view class="detailBtn" @click="openCancenPopup(item.payId,index)">
					取消购买
				</view>
				<view class="sendBtn" v-if="item.remainNum" @click="goToPay(item.payId)">
					继续支付
				</view>
			</view>
		</view>
		<view class="orderNoMsg" v-if="!orderInfo.records || !orderInfo.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/giftBagOrderMsg.jpg" mode="widthFix"></image>
			<view class="orderNoMsgText">
				暂无礼包！
			</view>
		</view>
		<uni-popup ref="cancelPopup" type="center">
		    <defaultPopup @cancel='cancelOrderBtn' @sure='giftBagCancelOrder'>
				<view class="hint">
					确定取消该订单吗？
				</view>
			</defaultPopup>
		</uni-popup>
		<share ref='share' :shareImageList='shareImage'></share>
	</view>
</template>

<script>
	import defaultPopup from '@/components/defaultPopup/index.vue'
	import share from '@/pages/goodsDetails/share.vue'	//分享
	import tradeApi from '@/api/trade/index.js'
	export default {
		data(){
			return{
				defaultTitleDto:{
					title:'我的礼包',
				},
				orderInfo:"",	//礼包列表
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				imgBaseUrls:"",
				chooseInfo:{	//选中信息
					index:"",
					payId:""
				},
				wxShare:{
					title:"",
					path:"",
					imageUrl: ""
				},
				shareImage:"",	//分享商品图片
			}
		},
		onShow() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			if(this.pageInfo.pageNo>1){
				this.pageInfo.pageNo = 1;
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
			}
			this.giftBagPageOrders()
		},
		methods:{
			giftBagPageOrders(flag){	//获取列表
				tradeApi.giftBagPageOrders(this.pageInfo).then(res=>{
					if(res.data.code==200){
						if(flag){
							this.orderInfo.records = this.orderInfo.records.concat(res.data.data.records);
							this.orderInfo.totalPage = res.data.data.totalPage;
						}else{
							this.orderInfo = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			giftBagCancelOrder(){	//取消订单
				tradeApi.giftBagCancelOrder({payId:this.chooseInfo.payId}).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"取消成功",
							icon:"none"
						})
						this.orderInfo.records[this.chooseInfo.index].orderState = 2
						this.cancelOrderBtn()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			giftBagGeneratePoster(index,item){	//生成转增海报
				this.chooseInfo = {
					index,
					orderId:item.id,
					imageUrl:item.goodsImage
				}
				tradeApi.giftBagGeneratePoster(this.chooseInfo.orderId).then(res=>{
					if(res.data.code==200){
						this.shareImage = res.data.data;
						this.$refs.share.openSharePopup()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			openCancenPopup(payId,index){	//打开取消订单弹窗
				this.chooseInfo = {
					index,
					payId
				}
				this.$refs.cancelPopup.open()
			},
			goTodetail(orderId){
				this.$Router.push({
					path:"/pages/increase/index",
					query:{
						orderId
					}
				})
			},
			goToPay(payId){
				this.$Router.push({
					path:"/pages/pay/index",
					query:{
						payId,
						increase:true
					}
				})
			},
			cancelOrderBtn(){	//取消订单 点击取消
				this.$refs.cancelPopup.close();
			},
			
		},
		onReachBottom(){	//页面滚动到底部
			if(this.pageInfo.pageNo<this.orderInfo.totalPage){
				this.pageInfo.pageNo++;
				this.giftBagPageOrders(true)
			}
		},
		onShareAppMessage(res) { //发送给朋友
			let userName = JSON.parse(uni.getStorageSync('userInfo'));
			let shareNumber = uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):""
			this.wxShare.path = "/pages/giftBagReceive/index?shareNumber=" + shareNumber + "&orderId=" + this.chooseInfo.orderId;
			this.wxShare.title = "["+(userName.nickName?userName.nickName:userName.telephone)+"@你]快来成为文器库会员！！！"
			this.wxShare.imageUrl = this.imgBaseUrls + this.chooseInfo.imageUrl
			return this.wxShare
		},
		onShareTimeline(res) {//分享到朋友圈
			let userName = JSON.parse(uni.getStorageSync('userInfo'));
			let shareNumber = uni.getStorageSync("shareNumber")?uni.getStorageSync("shareNumber"):""
			this.wxShare.path = "/pages/giftBagReceive/index?shareNumber=" + shareNumber + "&orderId=" + this.chooseInfo.orderId;
			this.wxShare.title = "["+(userName.nickName?userName.nickName:userName.telephone)+"@你]快来成为文器库会员！！！"
			this.wxShare.imageUrl = this.imgBaseUrls + this.chooseInfo.imageUrl
			return this.wxShare
		},
		components:{
			defaultPopup,
			share
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		padding-top: 20rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 108rpx;
		/* #endif */
		background-color: #F4F4F4;
		min-height: 100vh;
	}
	.everyCard{
		width: calc(100% - 40rpx);
		margin: 0 auto;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		border-radius: 36rpx;
	}
	.cardTitle{
		color: #999999;
		text-align: right;
		margin: 10rpx 0;
		font-size: 24rpx;
	}
	.goodsInfo{
		width: 100%;
		display: flex;
	}
	.goodsImage{
		min-width: 154rpx;
		min-height: 154rpx;
		border-radius: 12rpx;
		margin-right: 16rpx;
		border-radius: 4rpx;
		overflow: hidden;
	}
	.goodsPrice{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.goodsName{
		min-width: 100%;
	}
	.price{
		display: flex;
		align-items: center;
	}
	.defPrice{
		color: #FF1558;
		margin-right: 24rpx;
		font-size: 36rpx;
	}
	.defPrice .priceArrow{
		font-size: 24rpx;
	}
	.unlinePrice{
		font-size: 20rpx;
		color: #999999;
	}
	.cardInfo{
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 30rpx;
	}
	.everyCardInfo{
		min-width: 200rpx;
	}
	.everyCardInfo text{
		display: block;
		text-align: center;
		font-size: 22rpx;
		color: #333333;
	}
	.everyCardInfo .fontNum{
		font-size: 28rpx;
		font-weight: 700;
		margin-bottom: 10rpx;
	}
	.line{
		width: 1rpx;
		height: 33rpx;
		background-color: #CFCFCF;
	}
	.cardInfoBtn{
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
		margin-top: 40rpx;
	}
	.cardInfoBtn view{
		width: 236rpx;
		height: 64rpx;
		text-align: center;
		line-height: 64rpx;
		font-size: 26rpx;
		border: 1rpx solid #FFFFFF;
		border-radius: 32rpx;
	}
	.cardInfoBtn .detailBtn{
		border-color: #858585;
		color: #858585;
	}
	.cardInfoBtn .sendBtn{
		border-color: #FD1858;
		color: #FD1858;
		margin-left: 24rpx;
	}
	.hint{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333333;
	}
	.orderNoMsg {
		padding-top: 262rpx;
		width: 360rpx;
		margin: 0 auto;
	}
	
	.orderNoMsg image {
		width: 100%;
	}
	
	.orderNoMsgText {
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		margin-top: 55rpx;
	}
</style>
