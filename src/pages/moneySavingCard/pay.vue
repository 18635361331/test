<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="payInfo" :class="{active:chooseType=='微信'}" @click="chooseChange('微信')">
			<view class="payType">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_weixin.png" mode=""></image>
				微信
			</view>
			<view>
				￥{{payPrice}}
			</view>
			<view class="selectIcon" v-if="chooseType=='微信'"></view>
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<view class="payInfo" v-if="!isWxFlag" :class="{active:chooseType=='支付宝'}" @click="chooseChange('支付宝')">
			<view class="payType">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/icon_zhi.png" mode=""></image>
				支付宝
			</view>
			<view>
				￥{{payPrice}}
			</view>
			<view class="selectIcon" v-if="chooseType=='支付宝'"></view>
		</view>
		<!-- #endif -->
		<view class="buyNow">
			<view class="buyNowBtn" v-if="payPrice" @click="buyNow">
				{{chooseType}}支付￥{{payPrice}}
			</view>
		</view>
	</view>
</template>

<script>
	import payMentApi from '@/api/payment/index.js'
	import wechatApi from '@/api/wechat/index.js'
	export default {
		data() {
			return {
				payInfo: {
					orderPayId: 1,
					orderType:"cycle",
				},
				payPrice:"",	//支付信息
				chooseType: "微信",
				isWxFlag: true, //是否在微信浏览器中
				defaultTitleDto:{
					title:'收银台',
				},
				wxCode:"",
			}
		},
		methods: {
			chooseChange(item) { //更改支付方式
				this.chooseType = item
			},
			buyNow(){
				// #ifdef MP-WEIXIN
					uni.login({
						success:(data)=>{
							this.buildMiniPrepPaySign(data.code)
						}
					})
					return
				// #endif
				// #ifdef H5
					this.getH5Code()
				// #endif
			},
			getH5Code(){	//获取公众号code
				wechatApi.wxPubAppId().then(res=>{
					if(res.data.code==200){
						let path = "?orderPayId="+this.$Route.query.orderPayId+"&payPrice="+this.$Route.query.payPrice+"&goodsId="+this.$Route.query.goodsId
						let urls = 'https://' + location.host + location.pathname+path;
						location.href=location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+res.data.data+'&redirect_uri=' + encodeURIComponent(urls) + '&response_type=code&scope=snsapi_userinfo';
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			buildPrepPaySign(){	//获取公众号支付相关信息
				payMentApi.buildPrepPaySign({code:this.wxCode,orderPayId:this.$Route.query.orderPayId,orderType:"cycle"}).then(res=>{
					if(res.data.code==200){
						this.requestH5Payment(res.data.data)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			requestH5Payment(params){	//微信公众号支付
				if (typeof WeixinJSBridge == "undefined"){
				   if( document.addEventListener ){
				       document.addEventListener('WeixinJSBridgeReady', this.WeixinJSBridgeH5, false);
				   }else if (document.attachEvent){
				       document.attachEvent('WeixinJSBridgeReady', this.WeixinJSBridgeH5); 
				       document.attachEvent('onWeixinJSBridgeReady', this.WeixinJSBridgeH5);
				   }
				}else{
				   this.WeixinJSBridgeH5(params);
				}
			},
			WeixinJSBridgeH5(params){
				let _this=this;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId":params.appId,     //公众号名称，由商户传入     
						"timeStamp":params.timeStamp,         //时间戳，自1970年以来的秒数     
						"nonceStr":params.nonceStr, //随机串     
						"package":params.package,     
						"signType":params.signType,         //微信签名方式：     
						"paySign":params.paySign //微信签名 
					},
					function(res){
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							_this.payCallBack(true)
						} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
							_this.payCallBack(false)
						} else {
							_this.payCallBack(false)
						}
					}
				); 
			},
			buildMiniPrepPaySign(code) { //获取小程序支付相关信息
				payMentApi.buildMiniPrepPaySign({
					code: code,
					orderPayId: this.$Route.query.orderPayId,
					orderType: "cycle"
				}).then(res => {
					if (res.data.code == 200) {
						this.requestpayment(res.data.data)
					} else {
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			requestpayment(params) { //小程序支付
				let _this = this;
				uni.requestPayment({
					provider: "payment",
					timeStamp: params.timeStamp,
					nonceStr: params.nonceStr,
					package: params.package,
					paySign: params.paySign,
					signType:params.signType,
					success: function(res) {
						_this.payCallBack(true)
					},
					fail: function(res) {
						_this.payCallBack(false)
					}
				})
			},
			payCallBack(flag){
				if(flag){
					uni.showToast({
						title: "支付成功",
						icon: "none"
					})
					this.$Router.replace({
						path: "/pages/payment/index",
						query: {
							source:1,
							payId:this.$Route.query.orderPayId,
						}
					})
				}else{
					uni.showToast({
						title: "用户已取消支付",
						icon: "none"
					})
				}
			},
			closeAuthorize(){	//关闭授权
				this.$refs.authorize.close()
			}
		},
		mounted() {
			// #ifdef H5
			let ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				this.isWxFlag = true //在微信浏览器中
			} else {
				this.isWxFlag = false //不在微信浏览器中
			}
			//#endif
			this.payPrice = this.$Route.query.payPrice
		},
		onLoad(option) {
			// #ifdef H5
			if(option.code){
				this.wxCode = option.code;
				this.buildPrepPaySign()
			}
			// #endif
		},
		
	}
</script>
<style scoped>
	@import url("./index.css");
</style>
