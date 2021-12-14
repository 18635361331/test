<template>
	<view class="page">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="header">
			<view class="top">
				<text class="block">可用卡数量</text>
				<text class="block num">{{det.availableQuantity?det.availableQuantity:0}}</text>
			</view>
			<view class="bottom">
				<view>
					<text class="type">已激活</text>
					<text class="num">{{det.activeQuantity?det.activeQuantity:0}}</text>
				</view>
				<view>
					<text class="type">卡总量</text>
					<text class="num">{{det.totalQuantity?det.totalQuantity:0}}</text>
				</view>
			</view>
		</view>
		<view class="btnGroup">
			<view class="btn use" v-if="det.activeState && shareCode" @click="goOther">立即享受权益</view>
			<view class="btn activation"  v-else-if="!det.activeState && shareCode" @click="goActivation">激活我的权益卡</view>
			<view class="btn send" v-if="det.availableQuantity" @click="shareCard">生成海报送卡</view>
		</view>
		<shareModel ref="shareModel" :shareImage='shareImage'></shareModel>
	</view>
</template>

<script>
	import thirdpartyApi from '@/api/thirdparty/index.js'
	import shareModel from '@/common/model/shareModel/index.vue'
	import memberApi from '@/api/member/index.js'
	export default {
		data() {
			return {
				det:{
					activeState:0,//  0-未激活  1-已激活
				},
				shareImage:'',
				defaultTitleDto:{
					title:'我的权益卡',
					color:"black"
				},
				shareCode:"",
				memberInfo:""
			}
		},
		onShow() {
			if(uni.getStorageSync("sessionId")){
				this.getPrivilegeCardSummary();
				this.loginInfo()
			}
		},
		onLoad(query) {
			try{
				if(query && query.scene){
					this.shareCode = decodeURIComponent(query.scene).split(",")[0]
					this.$Router.replace({
						path:"/pages/thirdparty/index",
						query:{
							shareCode:decodeURIComponent(query.scene).split(",")[0]
						}
					})
					return
				}
			}catch(e){
				
			}
			this.shareCode = this.$Route.query.shareCode
			if(uni.getStorageSync("sessionId")){
			}else{
				this.$Router.push({
					path:"/pages/login/index"
				})
			}
		},
		methods: {
			goOther(){ //享用
				uni.setStorageSync("webViewQuery","?bftype="+this.memberInfo.plusFlag+"&code="+this.shareCode+"&key="+this.memberInfo.id);
				uni.navigateTo({
					url:"/pages/webView/index?url="+this.$config.xiaoyaomengUrl
				})
			},
			getCode(){ //生成激活码
				thirdpartyApi.getSinglePrivilegeCardNo().then(res=>{
					if(res.data.code == 200){
						this.shareCode = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getPrivilegeCardSummary(){	//获取会员权益卡基本信息
				thirdpartyApi.getPrivilegeCardSummary().then(res=>{
					if(res.data.code == 200){
						this.det = res.data.data;
						if(!this.det.activeState){	
							this.getCode()
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			shareCard(){	//获取分享海报图片
				uni.showLoading({
					title:"加载中..."
				})
				thirdpartyApi.generatePrivilegeCardPoster().then(res=>{
					uni.hideLoading()
					if(res.data.code == 200){
						this.shareImage = res.data.data
						this.$refs.shareModel.openSharePopup()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			loginInfo(){
				memberApi.loginInfo().then(res=>{
					if(res.data.code==200){
						this.memberInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goActivation(){ 	//激活
				uni.setStorageSync("webViewQuery","?bftype="+this.memberInfo.plusFlag+"&code="+this.shareCode+"&key="+this.memberInfo.id+"&id="+11);
				uni.navigateTo({
					url:"/pages/webView/index?url="+this.$config.xiaoyaomengUrl+"#/memberdetail"
				})
			}
		},
		components:{
			shareModel
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/css/all';
	.page{
		min-height: 100vh;
		background: linear-gradient(180deg, #FFEFDB 0%, #FADFC1 100%);
		padding:110rpx 30rpx 0;
	}
	.header{
		@extend .bgSize;
		background-image: url($img-oss+'rightsCard.png');
		width: 100%;
		height: 524rpx;
		text-align: center;
		padding-top: 58rpx;
		color: #FADFC1;
		.top{
			font-size: 28rpx;
			font-weight: 400;
			.num{
				font-size: 48rpx;
				font-weight: 800;
				margin-top: 10rpx;
			}
		}
		.bottom{
			width: 66%;
			margin: 108rpx auto 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 22rpx;
			font-weight: 400;
			line-height: 30rpx;
			.num{
				font-size: 36rpx;
				font-weight: bold;
				margin-top: 20rpx;
				@extend  .block;
			}
			
		}
	}
	.btnGroup{
		width: 100%;
		position: fixed;
		padding: 0 30rpx;
		bottom: calc(0px + constant(safe-area-inset-bottom));
		bottom: calc(0px + env(safe-area-inset-bottom));
		left: 0;
		z-index: 20;
		.btn{
			width: 100%;
			height: 78rpx;
			font-size: 32rpx;
			font-weight: 400;
			line-height: 78rpx;
			border-radius: 40rpx;
			text-align: center;
			color: #FFEFDB;
			margin-bottom: 30rpx;
			&.see{
				background: #C78E57;
			}
			&.use{
				background: #804B11;
			}
			&.activation{
				background: #C78E57;
			}
			&.send{
				border: 1px solid #7F4A13;
				color: #7F4A13;
				background: trant;
			}
		}
	}

</style>
