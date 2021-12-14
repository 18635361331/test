<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="giftCardTab">
			<view class="tabRow" @click="tabChange('')">
				<text :class="!orderStatus?'active':''">全部</text>
			</view>
			<view class="tabRow" @click="tabChange(10)">
				<text :class="orderStatus==10?'active':''">待付款</text>
			</view>
		</view>
		<view class="orderList">
			<view class="orderRow" v-for="item,index in cardInfo.records" :key="index">
				<view class="orderTitle">
					<text>{{$utils.formatDate(item.createdTime,"yyyy-MM-dd")}}</text>
					<text class="cancelBtn" v-if="item.orderStatus==0">已取消</text>
					<text class="cancelBtn" v-if="item.orderStatus==10">待付款</text>
					<text class="cancelBtn" v-if="item.orderStatus==20">已付款</text>
					<text class="cancelBtn" v-if="item.orderStatus==30">已发布</text>
					<text class="cancelBtn" v-if="item.orderStatus==40">已完成</text>
				</view>
				<view class="giftCardText">
					<view class="cardImage">
						<view class="cardImageBg" :style="{backgroundImage:'url('+imgBaseUrls+item.cover+'?x-oss-process=image/resize,w_134)'}"></view>
						<view class="cardPrice">
							面值￥{{item.faceValue}}
						</view>
					</view>
					<view class="cardInfo">
						<view class="cardTitle ellipsis-two">
							{{item.cardName}}
						</view>
						<view class="cardMoney">
							<view>
								<text>￥{{item.salePrice}}</text>
								<text class="faceValue">面值{{item.faceValue}}</text>
							</view>
							<view class="cardNum">
								x{{item.cardNum}}
							</view>
						</view>
					</view>
				</view>
				<view class="cardAllPrice">
					共{{item.cardNum}}件商品，合计：￥{{item.orderAmount}}
				</view>
				<view class="cardBtn">
					<view class="cardBtnText" @click="checkOrderItem(item,'del')" v-if="item.orderStatus==0||item.orderStatus==40">
						删除订单
					</view>
					<view class="cardBtnText" v-if="item.orderStatus==10" @click="goToGiftCardPay(item)">
						去付款
					</view>
					<view class="cardBtnText" @click="checkOrderItem(item,'cancel')" v-if="item.orderStatus==10">
						取消订单
					</view>
				</view>
			</view>
		</view>
		<view class="noGiftCard" v-if="!cardInfo.records || !cardInfo.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/card_order_none@2x.png" mode=""></image>
			<view class="noText">
				暂无礼卡订单
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<defaultPopup @cancel='cancel' @sure='sure'>
				<view class="hint">
					确定删除该订单吗？
				</view>
			</defaultPopup>
		</uni-popup>
		<uni-popup ref="cancelPopup" type="center">
			<defaultPopup @cancel='cancelOk' @sure='sureOk'>
				<view class="hint">
					确定取消该订单吗？
				</view>
			</defaultPopup>
		</uni-popup>
	</view>
</template>

<script>
	import defaultPopup from '@/components/defaultPopup/index.vue'
	import appApi from '@/api/app/index.js'
	export default {
		data() {
			return {
				orderStatus: "",
				pageInfo: {
					pageNo: 1,
					pageSize: 10
				},
				imgBaseUrls: "",
				cardInfo: {},
				chooseItem:{},	//选中数据
				defaultTitleDto:{
					title:'礼卡订单',
				}
			}
		},
		methods: {
			checkOrderItem(item,type){	//选中订单
				this.chooseItem = item;
				if(type=='del'){
					this.$refs.popup.open()
				}else{
					this.$refs.cancelPopup.open()
				}
			},
			tabChange(item) {
				if(this.orderStatus == item){
					return
				}
				this.orderStatus = item;
				this.pageInfo.pageNo = 1;
				this.cardOrderList();
			},
			cardOrderList(flag) { //礼卡订单列表
				uni.showLoading({
					title:"加载中"
				})
				appApi.cardOrderList({
					orderStatus: this.orderStatus,
					...this.pageInfo
				}).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						if (flag) {
							this.cardInfo.records = this.cardInfo.records.concat(res.data.data.records);
							this.cardInfo.totalPage = res.data.data.totalPage;
						} else {
							this.cardInfo = res.data.data
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			cancelOk(){	//取消取消订单
				this.$refs.cancelPopup.close()
			},
			sureOk(){	//确定取消订单
				appApi.cardOrderCancel(this.chooseItem.orderId).then(res=>{
					if(res.data.code==200){
						for(let i=0;i<this.cardInfo.records.length;i++){
							if(this.cardInfo.records[i].orderId == this.chooseItem.orderId){
								this.cardInfo.records[i].orderStatus = 0;
							}
						}
						this.cancelOk()
						uni.showToast({
							title:"取消成功",
							icon:"none"
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			cancel(){
				this.$refs.popup.close()
			},
			sure(){	//确认删除
				appApi.cardOrderDel(this.chooseItem.orderId).then(res=>{
					if(res.data.code==200){
						let index = this.cardInfo.records.findIndex(res=>{
							return res.orderId == this.chooseItem.orderId
						})
						this.cardInfo.records.splice(index,1);
						this.cancel()
						uni.showToast({
							title:"删除成功",
							icon:"none"
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToGiftCardPay(params){	//去支付
				this.$Router.push({
					path:"/pages/giftCardPay/index",
					query:{
						payId:params.orderId
					}
				})
			}
		},
		onReachBottom() { //页面滚动到底部
			if (this.pageInfo.pageNo < this.cardInfo.totalPage) {
				this.pageInfo.pageNo++;
				this.cardOrderList(true)
			}
		},
		onShow() {
			this.zhuge.track("礼卡订单-落地页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.cardOrderList()
		},
		components:{
			defaultPopup
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 196rpx;
		/* #endif */
		background-color: #F5F5F5;
		min-height: 100vh;
	}
	.giftCardTab {
		position: fixed;
		top: 0;
		/* #ifndef MP-WEIXIN */
		top: 88rpx;
		/* #endif */
		background-color: #FFFFFF;
		left: 0;
		display: flex;
		width: 100%;
		height: 88rpx;
	}

	.tabRow {
		width: 50%;
		text-align: center;
	}

	.tabRow text {
		display: inline-block;
		height: 100%;
		line-height: 88rpx;
		border-bottom: 4rpx solid #FFFFFF;
	}

	.tabRow text.active {
		color: #FF1558;
		border-bottom: 4rpx solid #FF1558;
	}

	.orderList {
		width: 100%;
	}

	.orderRow {
		width: 100%;
		background-color: #FFFFFF;
		margin-bottom: 16rpx;
	}

	.orderTitle {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		color: #333333;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		align-items: center;
	}

	.cancelBtn {
		color: #ff1558;
	}
	.giftCardText{
		height: 194rpx;
		background-color: #FAFAFA;
		display: flex;
		padding: 22rpx 0;
	}
	.cardImage{
		width: 150rpx;
		height: 150rpx;
		border: 1rpx solid #E5E5E5;
		padding-top: 14rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		margin-left: 24rpx;
	}
	.cardImageBg{
		width: 134rpx;
		height: 82rpx;
		background-position: 50%;
		background-size: cover;
		background-repeat: no-repeat;
		margin: 0 auto;
	}
	.cardPrice{
		font-size: 24rpx;
		color: #555555;
		padding-top: 8rpx;
		text-align: center;
	}
	.cardInfo{
		flex: 1;
		height: 150rpx;
		margin: 0 24rpx;
	}
	.cardTitle{
		width: 100%;
		height: 72rpx;
		line-height: 36rpx;
		color: #333;
	}
	.cardMoney{
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		color: #FF1558;
		margin-top: 36rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.faceValue{
		margin-left: 10rpx;
		color: #999;
		text-decoration: line-through;
	}
	.cardNum{
		color: #999999;
	}
	.cardAllPrice{
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: right;
		font-size: 24rpx;
		color: #686868;
		padding-right: 18rpx;
		border-bottom: 1rpx solid #e4e4e4;
	}
	.cardBtn{
		width: 100%;
		height: 98rpx;
		padding-right: 24rpx;
		display: flex;
		justify-content: flex-end;
	}
	.cardBtnText{
		width: 150rpx;
		height: 52rpx;
		text-align: center;
		line-height: 52rpx;
		color: #666;
		margin-top: 18rpx;
		margin-left: 24rpx;
		border-radius: 8rpx;
		border: 1rpx solid #999;
	}
	.hint{
		display: flex;
		width: 100%;
		height: 100%;
		color: #333333;
		justify-content: center;
		align-items: center;
	}
	.noGiftCard{
		width: 100%;
		background-color: #F5F5F5;
		text-align: center;
		padding-top: 300rpx;
	}
	.noGiftCard image{
		width: 360rpx;
		height: 360rpx;
	}
	.noText{
		color: #999;
		text-align: center;
		font-size: 30rpx;
		padding-top: 55rpx;
	}
</style>
