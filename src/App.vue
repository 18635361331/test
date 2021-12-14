<script>
	import decorateApi from "@/api/decorate/index.js";
	import wechatApi from '@/api/wechat/index.js'
	import memberApi from '@/api/member/index.js'
	import promotionApi from '@/api/promotion/index.js'
	import appApi from '@/api/app/index.js'
	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
			this.checkUpdateVersion()
			// #endif
			this.getMiniRotuer();
			this.distributorTypeConfig()
			if(uni.getStorageSync("sessionId")){
				let sessionId = uni.getStorageSync("sessionId");
				let teamInfoNum =  uni.getStorageSync("teamInfoNum");
				this.clearInfo();
				uni.setStorageSync("sessionId",sessionId);
				if(teamInfoNum){
					uni.setStorageSync("teamInfoNum",teamInfoNum);
				}
				this.loginInfo()
			}else{
				this.clearInfo()
			}
			this.getTypeMemberConfig()
			// #ifdef H5
			this.wxShareH5Config()
			// #endif
			
		},
		onShow: function() {
			// setInterval(()=>{	
			// 	if(uni.getStorageSync("sessionId")){//只针对新人是否有邀请到新用户做处理
			// 		this.getInviteMemberRewardInfo();
			// 		this.couponCardData()
			// 	}
			// },60000)
			// setTimeout(()=>{
			// 	if(uni.getStorageSync("sessionId")){//获取最近一天之内过期的首单优惠券
			// 		this.getLastExpireCoupons();
			// 		this.getInviteMemberRewardInfo()
			// 	}
			// })
		},
		onHide: function() {},
		methods: {
			getMiniRotuer() { //获取小程序和h5 路径对应
				decorateApi.getMiniRotuer().then(res => {
					if (res.data.code == 200) {
						uni.setStorageSync("miniRouter", res.data.data)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			distributorTypeConfig(){	//获取合伙人配置
				appApi.distributorTypeConfig().then(res => {
					if (res.data.code == 200) {
						uni.setStorageSync("partnerConfig", JSON.stringify(res.data.data))
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			/**
			 * 检测当前的小程序
			 * 是否是最新版本，是否需要下载、更新
			 */
			checkUpdateVersion() {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function(res) {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								showCancel: false,
								success(res) {
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate();
									}
								}
							});
						});
						updateManager.onUpdateFailed(function(res) {
							// 新的版本下载失败
							uni.showModal({
								title: '更新提示',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
								showCancel: false,
								success(res) {

								}
							});
						});
					}
				});
			},
			/*
			 *微信公众号分享
			*/
			wxShareH5Config(){
				let pages = getCurrentPages()
				wechatApi.jsSdkAuth(pages[pages.length-1]).then(res=>{
					wx.config({
						debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: '', // 必填，公众号的唯一标识
						timestamp: '', // 必填，生成签名的时间戳
						nonceStr: '', // 必填，生成签名的随机串
						signature: '',// 必填，签名
						jsApiList: [] // 必填，需要使用的JS接口列表
					});
				})
			},
			loginInfo() { //获取登录信息
				memberApi.loginInfo().then(res => {
					if (res.data.code == 200) {
						uni.setStorageSync("userInfo", JSON.stringify(res.data.data))
						uni.setStorageSync("shareNumber", res.data.data.shareNumber)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getTypeMemberConfig(){	//获取会员配置集合
				memberApi.getTypeMemberConfig().then(res=>{
					if(res.data.code==200){
						uni.setStorageSync("memberConfig", JSON.stringify(res.data.data))
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			// getLastExpireCoupons(){	//获取最近一天之内过期的首单优惠券
			// 	promotionApi.getLastExpireCoupons().then(res=>{
			// 		if(res.data.code==200 && res.data.data.length){
			// 			uni.setStorageSync("newUserTimeCoupon",JSON.stringify(res.data.data))
			// 			this.getCurrentPages()
			// 		}
			// 	})
			// },
			// getInviteMemberRewardInfo(){	//只针对新人是否有邀请到新用户做处理
			// 	promotionApi.getInviteMemberRewardInfo().then(res=>{
			// 		if(res.data.code==200 && res.data.data){
			// 			uni.setStorageSync("newUserInvite",JSON.stringify(res.data.data))
			// 			this.getCurrentPages()
			// 		}
			// 	})
			// },
			// couponCardData(){	//获取用户邀请省钱卡弹窗信息
			// 	promotionApi.couponCardData().then(res=>{
			// 		if(res.data.code==200 && res.data.data){
			// 			uni.setStorageSync("newCouponCardInvite",JSON.stringify(res.data.data))
			// 			this.getCurrentPages()
			// 		}
			// 	})
			// },
			getCurrentPages(){
				if(this.$Route.path.indexOf("modal/index")=="-1"){
					this.$Router.push({
						path:"/pages/modal/index"
					})
				}
			},
			clearInfo(){
				let userInfoTelphone = uni.getStorageSync("userInfoTelphone")?uni.getStorageSync("userInfoTelphone"):""
				uni.clearStorageSync();
				uni.setStorageSync("userInfoTelphone",userInfoTelphone);
			}
		},
	}
</script>
<style lang="scss">
	$img-oss:'https://oss.beifamall.com/appletsImages/';
</style>
<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url("/static/uni.ttf");
}

/* #endif */
/*每个页面公共css */
uni-page-head {
  display: none;
}

:not(not) {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

page {
  font-size: 28rpx;
}

image {
  width: 100%;
  height: 100%;
}

uni-image {
  display: inline-block;
}

input {
  list-style: none;
  background: none;
  outline: none;
  border: none;
  resize: none;
}

.ellipsis-one {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;
}

.ellipsis-two {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  text-align: left;
}

.ellipsis-three {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: left;
}

.border_style {
  border: 1px solid #ff1558;
  /* transform: scale(48rpx, 48rpx); */
  padding: 2rpx 4rpx;
  height: 24rpx;
  line-height: 16rpx;
  border-radius: 4rpx;
}

.fixedPosition {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.collectTitle {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 88rpx;
  z-index: 21;
  display: flex;
  justify-content: space-between;
  background: #fff;
}

.collectTitle .goBackBtn {
  width: 88rpx;
  height: 88rpx;
  background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_1@2x.png)
    no-repeat 50%;
  background-size: 16rpx 30rpx;
}

.collectTitle .title {
  width: calc(100% - 180rpx);
  height: 88rpx;
  line-height: 88rpx;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  font-size: 36rpx;
}
.hasNothingMsg {
	padding-top: 180rpx;
	width: 360rpx;
	margin: 0 auto;
	text-align: center;
}
.hasNothingMsg image {
	width: 100%;
}
.hasNothingMsgText {
	color: #999999;
	font-size: 30rpx;
	margin-top: 55rpx;
}

</style>
