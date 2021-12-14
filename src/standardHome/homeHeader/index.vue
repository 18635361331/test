<template>
	<view class="page">
		<view class="header" :class="{'absolute':scrollNum==0}">
			<view class="customerService">
				<view class="serviceIcon" :style="{backgroundImage:'url('+imgBaseUrls+(scrollNum>=1?titleConfig.kfCeilingImage:titleConfig.kfDefaultImage)+')'}" @click="homeOpenKf" :class="{'active':scrollNum>=1}"></view>
			</view>
			<view class="customerSearch" @click="goToSearch()">
				<text v-if="defaultWordsList.length">{{defaultWordsList[chooseIndex].value}}</text>
			</view>
			<view class="customerService signIn" @click="goToSignIn()">
				<view class="serviceIcon signInIcon" :style="{backgroundImage:'url('+imgBaseUrls+(scrollNum>=1?titleConfig.siginCeilingImage:titleConfig.siginDefaultImage)+')'}" :class="{'active':scrollNum>=1}"></view>
			</view>
			<view class="customerService" @click="goToNews()">
				<view class="unreadNum" v-if="unreadNum">
					{{unreadNum}}
				</view>
				<view class="serviceIcon newsIcon" :style="{backgroundImage:'url('+imgBaseUrls+(scrollNum>=1?titleConfig.messageCeilingImage:titleConfig.messageDefaultImage)+')'}" :class="{'active':scrollNum>=1}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchApi from '@/api/search/index.js';
	import qiyuPlug from '@/plugInUnit/qiyuPlug.js';
	import msgApi from '@/api/msg/index.js'
	export default{
		props:['scrollNum',"titleConfig"],
		mixins:[qiyuPlug],
		data(){
			return{
				imgBaseUrls: "",
				defaultWordsList:[],	//搜索词列表
				chooseIndex:0,	//选中下标
				unreadNum:"",	//标记数量
			}
		},
		methods:{
			homeOpenKf(){
				this.zhuge.track("首页-导航栏-客服按钮")
				this.openKefu()
			},
			goToSignIn(){
				this.zhuge.track("首页-导航栏-签到")
				this.$Router.push({path:'/pages/signIn/index'})
			},
			goToNews(){
				this.zhuge.track("首页-导航栏-消息")
				this.$Router.push({path:'/pages/news/index'})
			},
			unreadCount(){	//未读消息数量\
				if(uni.getStorageSync("sessionId")){
					msgApi.unreadCount().then(res=>{
						if(res.data.code==200){
							this.unreadNum = res.data.data
						}else{
							uni.showToast({
								title:res.data.message,
								icon:"none"
							})
						}
					})
				}
			},
			defaultWords(){	//首页默认搜索值
				searchApi.defaultWords().then(res=>{
					if(res.data.code==200){
						this.defaultWordsList = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToSearch(){	//去往搜索页面
				this.zhuge.track("首页-导航栏-搜索框")
				this.$Router.push({
					path:"/pages/search/index",
					query:{
						searchValue:this.defaultWordsList[this.chooseIndex].value
					}
				})
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.header {
		height: 88rpx;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding: 10rpx 36rpx;
		z-index: 2;
	}
	.absolute.header{
		position: absolute;
	}

	.customerService {
		height: auto;
		padding-top:0;
		position: relative;
	}
	.signIn {
		padding-top: 0;
		margin-right: 35rpx;
		height: auto;
	}

	.serviceIcon {
		width: 52rpx;
		height: 52rpx;
		margin: 0 auto;
		background-size: 52rpx 52rpx;
	}
	.signInIcon{
		width: 64rpx;
		height: 64rpx;
	}
	.serviceIcon.signInIcon {
		background-size: 64rpx 64rpx;
	}
	.serviceText {
		color: #FFFFFF;
		font-size: 18rpx;
		margin-top: 2rpx;
	}
	
	.serviceText.active{
		color: #000000;
	}
	.customerSearch {
		width: 500rpx;
		height: 60rpx;
		border-radius: 60rpx;
		color: #96969B;
		line-height: 60rpx;
		font-size: 26rpx;
		text-indent: 70rpx;
		background: #fff url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/searchHomeTitle.png) no-repeat;
		background-size: 28rpx 28rpx;
		margin: 0 35rpx;
		background-position: 12px 8px;
	}
	.unreadNum{
		min-width: 14px;
		height: 14px;
		background-color: #FF1558;
		color: #FFFFFF;
		font-size: 9px;
		position: absolute;
		top: 10px;
		right: -5rpx;
		text-align: center;
		line-height: 14px;
		border-radius: 50px;
		border: 1px solid #fff;
	}
	.header.active{
		position: absolute;
	}
</style>
