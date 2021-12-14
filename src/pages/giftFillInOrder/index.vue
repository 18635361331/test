<template>
	<view class="page giftCardList">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="tips-info">
			<text>以下礼卡为电子卡,支付成功后请在我的礼卡中查看卡号。</text>
		</view>
		<view class="realName-cont" v-if="needRealname">
			<view class="realName-tit"><text class="des" @click="togglePopup(1)">实名认证</text> <text class="info">商务厅要求购买礼卡金额超1000元需实名认证</text></view>
			<view class="realName-input"><input type="text" placeholder="真实姓名" v-model="htUserName" /><text v-if="htUserName"
				 @click="htUserName=''"></text></view>
			<view class="realName-input"><input type="text" placeholder="身份证号码" v-model="htUserCode" /><text v-if="htUserCode"
				 @click="htUserCode=''"></text></view>
		</view>
		<!-- 卡片 -->
		<view class="card-detail fn-clear" v-if="cardsOrderData">
			<view class="card-pic">
				<image class="card-img" :src="imgBaseUrls+cardsOrderData.cover" alt='图片加载失败'>
					<text>面值{{cardsOrderData.faceValue}}元</text>
			</view>
			<view class="card-info">
				<view class="info-title">{{cardsOrderData.cardName}}</view>
				<view class="remark">{{cardsOrderData.scope}}；有效期至{{detTime}}</view>
				<view class="price-info">
					<text class="price">￥{{cardsOrderData.salePrice}}</text>
					<text class="num">×{{cardsOrderData.cardNum}}</text>
				</view>
			</view>
		</view>
		<!-- 合计 -->
		<view class="scope-application public-container">
			<text class="text-left">共{{cardsOrderData.cardNum}}张礼卡</text>
			<text class="text-right" @click="dialog = true">合计 ￥{{cardsOrderData.orderAmount}}</text>
		</view>
		<!-- 底部支付 -->
		<view class="buyFoot">
			<view class="payment">
				实付款：<text class="paymentPrice">¥{{cardsOrderData.orderAmount}}</text>
			</view>
			<view class="buyBtn" @click="goPay">
				去付款
			</view>
		</view>
		<!-- 实名认证弹窗 -->
		<uni-popup ref="authenticationPopup" type="center">
			<view class="authenticationPopup">
				<!-- <text class="dialogClose"></text> -->
				<view class="title">实名认证说明</view>
				<view class="dialog-main">
					<text>为什么需要实名认证？</text>
					<text>礼卡属于电子卡，商务厅规定：购买单张电子卡金额超过1000元需要进行实名认证。</text>
					<text>你的身份证信息将加密保管，贝发集团保证信息安全，绝不对外泄露！</text>
					<view><text>任何身份认证问题可联系我们：</text><text @click="tel" class="tel">400-100-82466</text></view>
				</view>
				<view class="dialogSubmit" @click="togglePopup(2)">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js'

	export default {
		data() {
			return {
				defaultTitleDto: {
					title: '填写订单',
				},
				query:null,// 请求的参数
				needRealname: false,
				htUserName: '',
				htUserCode: '',
				imgBaseUrls: this.$config.imgBaseUrl,
				detTime: '',
				cardsOrderData: null, //详情
				goPayButton:true,//去支付


			}
		},
		methods: {
			togglePopup(type) {
				if (type == 1) {
					this.$refs.authenticationPopup.open()
				} else {
					this.$refs.authenticationPopup.close()
				}
			},
			tel() {
				uni.makePhoneCall({
					phoneNumber: '400-100-82466'
				});
			},
			place(batchId, issueNum, orderKey) { // 获取详情
				appApi.orderPlace({
					batchId: batchId,
					issueNum: parseInt(issueNum),
					orderKey: orderKey
				}).then((res) => {
					if (res.data.code = 200) {
						this.cardsOrderData = res.data.data;
						this.needRealname = res.data.data.needRealName;
						this.htUserName = res.data.data.defaultName; //实名认证名字
						this.htUserCode = res.data.data.defaultIdNum; //实名认证证件号码
						this.detTime = this.$utils.formatDate(res.data.data.deadTime, "yyyy-MM-dd")
					}
				})
			},
			goPay() { // 去支付
				if(!this.goPayButton){
					return false;
				}
				if (this.needRealname) {
					if (this.htUserName == '' || this.htUserName == null) {
						uni.showToast({
							title: '请输入真实姓名',
							icon: 'none'
						})
						return false;
					} else if (this.htUserCode == '' || this.htUserCode == null) {
						uni.showToast({
							title: '身份证信息与姓名不一致',
							icon: 'none'
						})
						return false;
					} else if (!this.$utils.IdentityCodeValid(this.htUserCode)) {
						uni.showToast({
							title: '身份证信息与姓名不一致',
							icon: 'none'
						})
						return false;
					}
				}
				this.goPayButton = false;
				appApi.orderGoPay({
					batchId:this.query.batchId,
					issueNum:parseInt(this.query.issueNum),
					orderKey:this.query.orderKey,
					realName:this.htUserName,
					realIdNum:this.htUserCode
				}).then((res) => {
					this.goPayButton = true;
					if (res.data.code == 200) {
						this.$Router.push({ path:"/pages/giftCardPay/index",query:{payId:res.data.data}});
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
			  })
			},

		},
		onLoad(query) {
			this.query = query
			this.place(query.batchId, query.issueNum, query.orderKey)
		},
	}
</script>
<style scoped lang="scss">
	page {
		background: #f5f5f5;
	}

	.tips-info {
		width: 100%;
		background: #FFF6E1;
		padding: 26rpx 32rpx;
		/* #ifndef MP-WEIXIN */
		margin-top: 88rpx;
		/* #endif */
		text {
			display: block;
			width: 100%;
			line-height: 1.4;
			padding-left: 32rpx;
			font-size: 24rpx;
			color: #FF7E18;
			background:url(#{$img-oss}warning@2x.png) no-repeat;
			background-size: 22rpx 22rpx;
			background-position-y: 6rpx;
		}
	}

	/* 实名认证 */
	$height:88rpx;

	.realName-cont {
		width: 100%;
		background: #ffffff;
	}

	.realName-tit {
		display: block;
		width: 100%;
		padding: 0 24rpx;
		font-size: 28rpx;
		color: #666666;
		position: relative;
		background: #FFFFFF;

		.des {
			display: block;
			width: 150rpx;
			color: #333333;
			background:url(#{$img-oss}wenh.png) no-repeat right center;
			background-size: 26rpx;
		}

		.info {
			position: absolute;
			right: 24rpx;
			top: 0;
			z-index: 99;
			font-size: 24rpx;
			color: #666666;
		}
	}

	.realName-tit,
	.realName-tit .des,
	.realName-tit .info,
	.realName-input {
		height: $height;
		line-height: $height;
	}

	.realName-input {
		width: 100%;
		position: relative;

		input {
			display: block;
			width: 100%;
			height: $height;
			line-height: 40rpx;
			font-size: 28rpx;
			padding: 24rpx 60rpx 24rpx 24rpx;
		}

		text {
			display: block;
			height: $height;
			width: 26rpx;
			position: absolute;
			top: 0;
			right: 24rpx;
			z-index: 99;
			background: url(#{$img-oss}search_back@2x.png) no-repeat center;
			background-size: 26rpx;
		}
	}

	/*卡片详情*/
	.card-detail {
		margin-bottom: 18rpx;
		background-color: #FFFFFF;
		padding: 0 22rpx;
		width: 100%;
		height: 204rpx;
		margin-top: 24rpx;

		.card-pic {
			border: 1px solid #DFDFDF;
			border-radius: 10rpx;
			width: 180rpx;
			height: 180rpx;
			position: relative;
			text-align: center;
			float: left;
			margin-right: 28rpx;
			margin-top: 10rpx;

			text {
				position: absolute;
				font-size: 24rpx;
				color: #353535;
				bottom: 8rpx;
				left: 0;
				right: 0;
				margin: auto;
			}

			.card-img {
				border-radius: 10rpx;
				width: 80%;
				height: 60%;
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				bottom: 16rpx;
				top: 0;
			}
		}

		.card-info {
			float: right;
			width: calc(100% - 180rpx - 28rpx);

			.info-title {
				font-size: 28rpx;
				width: 90%;
				min-height: 36rpx;
				color: #333333;
				line-height: 36rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				padding-top: 18rpx;
			}

			.remark {
				font-size: 26rpx;
				color: #999999;
				line-height: 26rpx;
				margin: 8rpx 0 26rpx;
			}

			.price-info {
				display: flex;
				justify-content: space-between;

				.price {
					font-size: 36rpx;
					line-height: 1.3;
					color: #E61446;
				}

				.num {
					font-size: 28rpx;
					color: #666666;
					line-height: 1.3;
				}
			}
		}

	}

	.scope-application {
		height: 90rpx;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		padding: 0 24rpx;
		display: flex;
		line-height: 28rpx;
		background: #fff;

		.text-left {
			font-size: 30rpx;
			color: #333;
		}

		.text-right {
			font-size: 28rpx;
			color: #686868;
		}
	}

	.buyFoot {
		width: 100%;
		height: 100rpx;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: flex-end;
		background: #fff;

		.buyBtn {
			width: 230rpx;
			height: 100rpx;
			line-height: 100rpx;
			background-color: #FF1558;
			color: #FFFFFF;
			text-align: center;
		}

		.payment {
			line-height: 100rpx;
			margin-right: 30rpx;
		}

		.paymentPrice {
			color: #FF1558;
		}
	}

	// 弹窗
	.authenticationPopup {
		width: 88%;
		height: auto;
		margin: 0 auto;

		padding: 20rpx 40rpx 80rpx;
		background-color: #FFFFFF;
		border-radius: 32rpx;

		.title {
			font-size: 32rpx;
			color: #333;
			text-align: center;
			line-height: 1.3;
			width: 100%;
			display: block;
			margin: 30rpx 0 40rpx;
		}

		.dialog-main {
			font-size: 28rpx;
			color: #999;
			margin-bottom: 70rpx;
			line-height: 1.5;
			text-align: justify;

			&>text {
				display: block;
			}

			.tel {
				color: #ff4081;
			}
		}

		.dialogSubmit {
			max-width: 520rpx;
			height: 88rpx;
			margin: 0 auto;
			line-height: 88rpx;
			text-align: center;
			display: block;
			font-size: 32rpx;
			color: #fff;
			background: #ff1558;
			border-radius: 50rpx;
			margin-top: 34rpx;
		}
	}
</style>
