<template>
	<view class="page homeIndex">
		<homeHear ref="homeHear" :scrollNum='scrollNum' :unreadNum='unreadNum'></homeHear>
		<homeTitleTab ref="homeTitleTab" :scrollNum='scrollNum' :webViewInfo='webViewInfo' @setWebView='setWebView' @isShowTitle='isShowTitle'></homeTitleTab>
		<homeSwiper ref='homeSwiper' @swiperChange='swiperChange' :isShowTitle='isShowTitleFlag'></homeSwiper>
		<view class="homeIndexBox" :class="isShowTitleFlag?'':'noneShow'">
			<view class="homeBgColor" :style="{background:'#'+bgColor}"></view>
		</view>
		<view v-if="webViewInfo.title == '首页'">
			<view class='homeIndexTop'>
				<slideNav ref='slideNav'></slideNav>
			</view>
			<view class="newUserBox">
				<newUser ref='newUser'></newUser>
			</view>
			<view class="homeIndexTop">
				<activityImage ref='activityImage'></activityImage>
			</view>
			<view class='homeIndexTop homeThree'>
				<homeThree ref='homeThree'></homeThree>
			</view>
			<view class="homeIndexTop">
				<container ref='container'></container>
			</view>
			<view class="homeIndexTop">
				<activenav ref='activenav'></activenav>
			</view>
			<view class="homeIndexTop">
				<seckillActivity ref='seckillActivity'></seckillActivity>
			</view>
			<homeBtmTab ref='homeGoodsTab'></homeBtmTab>
		</view>
		<view v-else>
			<renovation ref='renovation' v-if="changeFlag" :url='webViewInfo.params' :isIndexHome='true'></renovation>
		</view>
		<homePopup></homePopup>
		<backTop :scrollNum='scrollNum'></backTop>
	</view>
</template>
<script>
	import homeTitleTab from '@/standardHome/homeTitleTab/index.vue'
	import homeHear from '@/standardHome/homeHeader/index.vue'
	import homeSwiper from '@/standardHome/homeSwiper/index.vue'
	import slideNav from '@/standardHome/slideNav/index.vue'
	import activityImage from '@/standardHome/activityImage/index.vue'
	import container from '@/standardHome/container/index.vue'
	import homeThree from '@/standardHome/homeThree/index.vue'
	import activenav from '@/standardHome/activityNav/index.vue'
	import homeBtmTab from '@/standardHome/homeBtmTab/index.vue'
	import homePopup from '@/standardHome/homePopup/index.vue'
	import newUser from '@/standardHome/newUser/index.vue'
	import seckillActivity from '@/standardHome/seckillActivity/index.vue'
	import backTop from '@/renovation/backTop/index.vue'
	import renovation from '@/pages/renovation/index.vue'
	
	
	export default {
		data() {
			return {
				bgColor:"",
				webViewInfo:{
					title:"首页",
					params:"",
				},
				scrollNum:"",	//滚动条
				changeFlag:false,
				unreadNum:"", 	//未读消息
				isShowTitleFlag:true
			}
		},
		onLoad() {
		},
		onShow() {
			uni.pageScrollTo({ scrollTop: 0, duration: 0 });
			this.zhuge.track("首页")
			this.$nextTick(()=>{
				this.getHomeInfo()
			})
		},
		onReachBottom(res){
			if(this.webViewInfo.title == "首页"){	//当tab在首页时
				this.scrolltolower()
			}else{
				this.$refs.renovation.judgeReachBottom()
			}
		},
		onPageScroll(res){
			this.scrollNum = res.scrollTop;
		},
		onPullDownRefresh(e){	//下拉刷新
			this.getHomeInfo()
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				uni.showToast({
					title:"更新成功",
					icon:"none"
				})
			},1000)
		},
		methods: {
			swiperChange(params){
				this.bgColor = params
			},
			scrolltolower(){
				this.$refs.homeGoodsTab.getNextPageGoods()
			},
			isShowTitle(flag){
				this.isShowTitleFlag = flag?true:false
			},
			setWebView(title,params){	//头部tab栏切换时触发
				this.changeFlag = false;
				this.webViewInfo.title = title
				this.webViewInfo.params = params;
				this.$nextTick(()=>{
					this.changeFlag = true;
					this.getHomeInfo()
				})
			},
			getHomeInfo(){	//获取首页展示数据
				if(this.webViewInfo.title == "首页"){	//当tab在首页时
					if(this.$refs.homeHear){
						this.$refs.homeHear.defaultWords()
						this.$refs.homeTitleTab.searchComponent()
						this.$refs.homeSwiper.searchComponent()
						this.$refs.slideNav.searchComponent()
						this.$refs.newUser.newPersonOrderTips()
						this.$refs.newUser.newPersonInfo()
						this.$refs.homeThree.searchComponent()
						this.$refs.activityImage.searchComponent()
						this.$refs.container.searchComponent()
						this.$refs.activenav.searchComponent()
						this.$refs.seckillActivity.nonDesignatedMarketing()
						this.$refs.homeGoodsTab.searchComponent()
					}else{
						this.getHomeInfo()
					}
				}else{
					this.$nextTick(()=>{
						this.$refs.renovation.storeList();
					})
				}
			},
		},
		onHide() {
			if(this.$refs.seckillActivity){
				this.$refs.seckillActivity.clearInter()
			}
		},
		components: {
			homeTitleTab,
			homeHear,
			homeSwiper,
			slideNav,
			activityImage,
			container,
			activenav,
			homeBtmTab,
			homePopup,
			homeThree,
			renovation,
			newUser,
			backTop,
			seckillActivity,
		}
	}
</script>

<style>
	.homeIndex {
		background: #F5F5F5;
		min-height: calc(100vh - 50px);
		position: relative;
	}

	.home {
		width: 100%;
		height: 100%;
	}


	.homeIndexTop {
		margin-top: 20rpx;
		padding: 0 30rpx;
	}
	.newUserBox{
		margin-top: 20rpx;
	}
	.homeIndexBox {
		width: 100%;
		height: 450rpx;
	}
	
	.noneShow.homeIndexBox{
		height: 360rpx;
	}

	.homeBgColor {
		width: 100%;
		height: 85%;
	}
	.homeThree{
		width: 100%;
	}
</style>
