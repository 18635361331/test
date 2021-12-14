<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<scroll-view scroll-y="true" class="afterSaleBox">
			<view class="goodsInfo" v-for="item,index in refundInfo.refundGoodsDTOS" :key='index'>
				<image :src="imgBaseUrls+item.goodsImg" class="goodsImage" mode=""></image>
				<view class="goodsRow">
					<view class="goodsTitle ellipsis-two">{{item.goodsName}}</view>
					<view class="goodsSpce">{{item.goodsFileValue}}</view>
					<view class="goodsPrice">
						<text class="price">￥{{item.goodsPayPrice}}</text>
						<text>x{{item.goodsNum}}</text> 
					</view>
				</view>
			</view>
			<view class="refundType">售后类型</view>
			<view class="refundType refundTypeClass">
				<text class="refundTypeRow" @click="params.refundType=1" :class="params.refundType==1?'active':''" v-if="refundInfo.ifSend">退货退款</text>
				<text class="refundTypeRow" @click="params.refundType=0" :class="params.refundType==0?'active':''">仅退款</text>
			</view>
			<view class="reason" @click="openRefundReason">
				<text>售后原因</text>
				<view class="arrow">
					{{params.refundReasonCode?refundReasonList[params.refundReasonCode]:"请选择"}}
				</view>
			</view>
			<view class="refundType">
				<text>退款金额</text>
				<text class="refundPrice">￥{{refundInfo.refundPrice}}</text>
			</view>
			<view class="refundFreight">
				最多可退款￥{{refundInfo.refundPrice}}（含运费￥{{refundInfo.refundFreight}}）
			</view>
			<view class="refundType">
				<text>退款说明</text>
				<input class="refundInput" type="text" v-model="params.refundDescription" />
			</view>
			<view class="refundType">
				<view>上传凭证 <text class="imageList">（最多可上传三张）</text> </view>
			</view>
			<view class="evaluateImage">
				<view class="imageList" v-for="v,i in params.refundImages" :key='i'>
					<image :src="imgBaseUrls+v" mode="aspectFill"></image>
					<view class="removeImgBtn" @click="params.refundImages.splice(i,1)"></view>
				</view>
				<view class="updateImg" v-if="params.refundImages.length<3" @click="chooseimage()">
					<text v-if="!params.refundImages.length">添加照片</text>
					<text v-if="params.refundImages.length">{{params.refundImages.length}}/3</text>
				</view>
			</view>
		</scroll-view>
		<view class="submit" @click="submitApplyFofRefund">
			提交
		</view>
		<uni-popup ref="refundPopup" type="bottom">
			<view class="refundBox">
				<view class="refundTitle">
					售后原因
				</view>
				<scroll-view scroll-y="true" class="refundList">
					<view class="everyRow" @click="params.refundReasonCode=index" v-for="item,index in refundReasonList"
					 :key='index'>
						<text>{{item}}</text>
						<text class="arrowIcon" :class="(index)==params.refundReasonCode?'active':''"></text>
					</view>
				</scroll-view>
				<view class="closeRefundPopup" @click="closeRefundPopup">
					完成
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js'
	import uniUploadImage from '@/common/js/uniUploadImage.js'
	export default {
		mixins:[uniUploadImage],
		data() {
			return {
				refundInfo: { //售后详情
				},
				imgBaseUrls: "",
				refundReasonList: [], //售后原因
				params: {
					refundReasonCode: "", //退款原因
					refundImages: [], //上传图片
					orderId: "", //订单id
					refundType: 0, //仅退款
					entryRefundPrice: 0,
					refundDescription:"",	//退款说明
				},
				defaultTitleDto:{
					title:'申请售后',
				}
			}
		},
		methods: {
			applyFofRefund(params) { //申请售后详情
				tradeApi.applyFofRefund(params).then(res => {
					if (res.data.code == 200) {
						this.refundInfo = res.data.data
						if (params.refundId) { //重新申请
							for (let i in this.params) {
								if (i == "refundImages") {
									this.$set(this.params, i, JSON.parse(res.data.data[i]))
								} else {
									this.$set(this.params, i, res.data.data[i])
								}
							}
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			refundReason(params) { //获取售后原因
				tradeApi.refundReason(params).then(res => {
					if (res.data.code == 200) {
						this.refundReasonList = res.data.data
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			openRefundReason() { //打开售后原因弹窗
				this.$refs.refundPopup.open()
			},
			closeRefundPopup(){	//关闭售后原因弹窗
				this.$refs.refundPopup.close()
			},
			chooseimage() { //上传图片
				uni.chooseImage({
					count: 3,
					success: (res) => {
						res.tempFiles = res.tempFiles.slice(0, 3 - this.params.refundImages.length);
						for (let i = 0; i < res.tempFiles.length; i++) {
							this.uploadImage(res.tempFiles[i].path)
						}
					}
				})
			},
			updateImage(uploadFileRes){
				this.params.refundImages.push(uploadFileRes.data)
			},
			submitApplyFofRefund() { //提交售后
				if (!this.params.refundReasonCode) {
					uni.showToast({
						title: "售后原因不能为空",
						icon: "none"
					})
					return
				}
				if(!this.params.refundDescription){
					this.$delete(this.params,"refundDescription")
				}
				this.$set(this.params,"entryRefundPrice",this.refundInfo.refundPrice)
				let params = JSON.parse(JSON.stringify(this.params))
				params.refundImages = JSON.stringify(params.refundImages);
				if(this.$Route.query.status){	//重新申请需要refundId  不存在orderDetailIds 和orderId
					delete params.orderDetailIds
					delete params.orderId
					params.refundId = this.$Route.query.orderId
				}else{
					params.orderDetailIds = [this.$Route.query.orderDetailIds];
				}
				tradeApi.submitApplyFofRefund(params).then(res => {
					if (res.data.code == 200) {
						this.goBack(1)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			}
		},
		onShow() {
			this.zhuge.track("申请售后")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.params.orderId = this.$Route.query.orderId; 
			if (this.$Route.query.orderDetailIds != "-1") {	//已发货申请售后  展示退货退款
				this.params.refundType = 1;
				this.refundReason(2);
			}else{		//未发货退款
				this.params.refundType = 0;
				this.refundReason(1);
			}
			if (this.$Route.query.status) { //重新申请
				this.applyFofRefund({
					refundId: this.$Route.query.orderId
				})
			} else { //第一次申请
				this.applyFofRefund({
					orderId: this.$Route.query.orderId,
					orderDetailIds: [this.$Route.query.orderDetailIds]
				})
			}
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.goodsInfo {
		width: 100%;
		height: 194rpx;
		background-color: #FAFAFA;
		display: flex;
		padding: 22rpx 0;
	}
	.goodsImage {
		width: 150rpx;
		height: 150rpx;
		margin-left: 24rpx;
		border-radius: 10rpx;
		border: 1rpx solid #eee;
	}
	.goodsRow {
		flex: 1;
		margin: 0 24rpx;
	}

	.goodsTitle {
		width: 100%;
		height: 72rpx;
		line-height: 36rpx;
		color: #666666;
	}

	.goodsSpce {
		margin-top: 5rpx;
		color: #999999;
		line-height: 27rpx;
		font-size: 24rpx;
	}

	.goodsPrice {
		display: flex;
		justify-content: space-between;
		margin-top: 5rpx;
		align-items: center;
	}

	.afterSaleBox {
		width: 100%;
		height: calc(100vh - 88rpx);
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 176rpx);
		/* #endif */
	}

	.price {
		color: #FF1558;
	}

	.refundType {
		width: 100%;
		height: 90rpx;
		padding: 0 25rpx;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.refundTypeClass {
		justify-content: flex-start;
	}

	.reason {
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24rpx;
	}

	.arrow {
		line-height: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 100%;
		background-size: 12rpx 24rpx;
		padding-right: 20rpx;
		color: #9b9b9b;
	}

	.refundPrice {
		color: #FF1558;
	}

	.refundFreight {
		width: 100%;
		height: 88rpx;
		padding: 0 24rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		background-color: #F5F5F5;
		color: #999999;
		font-size: 24rpx;
	}

	.imageList {
		color: #9b9b9b;
		font-size: 26rpx;
	}

	.refundBox {
		width: 100%;
		height: 752rpx;
		background-color: #FFFFFF;
	}

	.refundTitle {
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 34rpx;
		border-bottom: 1rpx solid #E4E4E4;
	}

	.refundList {
		width: 100%;
		height: calc(100% - 200rpx);
	}

	.everyRow {
		width: 100%;
		height: 96rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24rpx;
		border-bottom: 1rpx solid #E4E4E4;
	}

	.arrowIcon {
		width: 33rpx;
		height: 33rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;
		background-size: 34rpx 34rpx;
	}

	.arrowIcon.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;
		background-size: 34rpx 34rpx;
	}

	.evaluateImage {
		display: flex;
		flex-wrap: wrap;
	}

	.updateImg {
		width: 162rpx;
		height: 162rpx;
		margin-left: 24rpx;
		margin-bottom: 24rpx;
		border: 1px dashed #DFDFDF;
		border-radius: 8rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_pic.png) no-repeat;
		background-position: 55rpx 30rpx;
		background-size: 52rpx 46rpx;
		position: relative;
	}

	.updateImg text {
		position: absolute;
		top: 98rpx;
		width: 100%;
		text-align: center;
		color: #B2B2B2;
	}

	.imageList {
		position: relative;
		width: 162rpx;
		height: 162rpx;
		margin-left: 24rpx;
		margin-bottom: 24rpx;
		border-radius: 8rpx;
		overflow: hidden;
	}

	.removeImgBtn {
		position: absolute;
		top: 0;
		right: 0;
		width: 30rpx;
		height: 30rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_close.png) no-repeat 50%;
		background-size: 30rpx 30rpx;
	}

	.submit {
		width: 100%;
		height: 88rpx;
		background-color: #FF1558;
		text-align: center;
		line-height: 88rpx;
		color: #FFFFFF;
	}

	.refundTypeRow {
		padding-left: 40rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat;
		background-size: 34rpx 34rpx;
		background-position-y: 0rpx;
		margin-right: 60rpx;
		line-height: 34rpx;
	}

	.refundTypeRow.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat;
		background-size: 34rpx 34rpx;
		background-position-y: 0rpx;
	}
	.refundInput{
		width: 70%;
		color: #9B9B9B;
		font-size: 26rpx;
	}
	.closeRefundPopup{
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		font-size: 32rpx;
	}
</style>
