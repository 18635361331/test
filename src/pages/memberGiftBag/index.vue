<template>
	<view class="page commonPageTitle">
		<!-- #ifndef MP-WEIXIN -->
		<view class="collectTitle">
			<view class="goBackBtn" @click="goBack(1)"></view>
			<view class="title">会员中心 </view>
		</view>
		<!-- #endif  -->
		<view class="banner" v-if="memberConfig.length">
			<!-- 登录 -->
			<block v-if="userInfo">	
				<!-- 是会员展示会员背景，非会员展示第一个背景  -->
				<image v-if="chooseTab.centerBg" :src="imgBaseUrls+chooseTab.centerBg" mode="widthFix"></image>
				<image v-else :src="imgBaseUrls+memberConfig[0].centerBg" mode="widthFix"></image>
				
				<!-- 是会员且tab是当前等级展示用户信息、非会员且tab是第一个 -->
				<block v-if="(userInfo.plusFlag && userInfo.plusFlag!=4 && chooseTab.type==userInfo.plusFlag)">
					<view class="userInfo">
						<view class="head">
							<headImg :head="userInfo.smallIcon"></headImg>
						</view>
						<view class="right">
							<view class="role">
								<text class="ellipsis-one">{{userInfo.nickName?userInfo.nickName:userInfo.telephone}}</text>
								<view v-if="memberInfo.icon" :style="{backgroundImage:'url('+imgBaseUrls+memberInfo.icon+')'}"></view>
							</view>
							<text v-if="endTime">{{endTime}}到期</text>
						</view>
						<view class="vipName">{{memberInfo.name}}</view>
					</view>
					
					<view class="level" v-if="memberInfo.type==chooseTab.type">当前等级</view>
				</block>
				<block v-else>
					<view class="tabName">{{chooseTab.name}}</view>
				</block>
			</block>
			
			<!-- 未登录展示普通会员背景 -->
			<block v-else>
				<image :src="imgBaseUrls+chooseTab.centerBg" mode="widthFix"></image>
				<view class="tabName">{{chooseTab.name}}</view>
			</block>
			
			
		</view>
		<!-- 会员等级列表 -->
		<!-- <scroll-view class="vipsList"> -->
		<view class="vipsList">
			<view class="vipGroup" scroll-x="true">
				<view class="list" v-for="item,index in memberConfig"  :key="index"  @click="changeTab(item,index)"   :class="chooseTab.type==item.type?'active':''">
					<view class="content">
						<image class="icon" :src="imgBaseUrls+item.icon" mode="widthFix">
						<text class="name">{{item.name}}</text>
						<view class="bg" :style="'background:linear-gradient(130deg,'+item.startColor+' 0%,'+item.color+' 100%)'"></view>
					</view>
					<text class="tag" v-if="memberInfo.type==item.type">当前</text>
				</view>
			</view>
			<view class="rights">
				<image :src="imgBaseUrls+chooseTab.mainBg" mode="widthFix"></image>
			</view>
			<!-- 权益 -->
		</view>
		<!-- </scroll-view> -->
		
			
		<view class="bag">
			<text class="title">礼包专区</text>
			<view class="remarks" @click="open=!open">
				<text v-if="open" class="opened">收起</text>
				<text v-else class="closed">展开</text>
			</view>
		</view>
		<block v-if="open">
			<view class="memberGoodsList" v-if="listInfo.records && listInfo.records.length">
				<biserialGoods :goodsList="listInfo.records"></biserialGoods>
			</view>
			<view class="hasNothingMsg" v-else>
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/memberGiftNoGoods.png" mode="widthFix"></image>
				<view class="hasNothingMsgText">暂无商品～</view>
			</view>
		</block>
		<view class="inviteShareBtn">
			<button type="default" class="inviteShareBtn" open-type="share"></button>
			<image :src="imgBaseUrls+'appletsImages/inviteShareBtn.png'" mode=""></image>
		</view>
	</view>
</template>

<script>
	import memberApi from "@/api/member/index.js";
	import goodsApi from "@/api/goods/index.js";
	import promotionApi from "@/api/promotion/index.js";
	import lotteryApi from "@/api/lottery/index.js";
	import biserialGoods from '@/renovation/biserialGoods/index.vue';
	import vipConfig from '@/common/js/vipConfig.js';
	import headImg	from  '@/common/model/head.vue'
	
	export default {
		data() {
			return {
				pageInfo: {
					pageNo: 1,
					pageSize: 10,
				},
				listInfo:'',//商品信息
				chooseTab:"",	//选中的会员信息
				memberInfo:"",	//会员对应的信息
				memberConfig:"",	//会员配置
				imgBaseUrls: "",
				endTime:'',//到期時間
				userInfo: null, //用户信息
				open:true,// 展开 收起
			};
		},
		methods: {
			//获取vip会员商品列表
			promotionGoodsList(flag,typeId) {
				promotionApi.promotionGoodsList(this.pageInfo,(typeId+50)).then((res) => {
					if (res.data.code == 200) {
						if (flag) {
							this.listInfo.records = this.listInfo.records.concat(res.data.data.records);
							this.listInfo.totalPage = res.data.data.totalPage;
						} else {
							this.listInfo = res.data.data;
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none",
						});
					}
				});
			},
			changeTab(obj,index){
				uni.showLoading()
				this.pageInfo.pageNo = 1;
				this.chooseTab = obj;
				this.promotionGoodsList(false,obj.type);
				setTimeout(()=>{
					uni.hideLoading()
				},500)
			}
		},
		
		onReachBottom() {
			if (this.pageInfo.pageNo < this.listInfo.totalPage) {
				this.pageInfo.pageNo++;
				this.promotionGoodsList(true,this.memberInfo.type?this.memberInfo.type:this.memberConfig[0].type);
			}
		},
		onLoad(query) {
			try{
				if(this.$Route.query.scene){
					uni.setStorageSync("routerShareNumber",decodeURIComponent(this.$Route.query.scene).split(",")[0])
				}
				if(query && query.scene){
					uni.setStorageSync("routerShareNumber",decodeURIComponent(query.scene).split(",")[0])
				}
				if(query && query.shareNumber){
					uni.setStorageSync("routerShareNumber",query.shareNumber)
				}
				if(this.$Route.query.shareNumber){
					uni.setStorageSync("routerShareNumber",this.$Route.query.shareNumber)
				}
			}catch(e){
				
			}
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		async onShow() {
			// uni.showLoading({
			// 	title:'加载中'
			// })
			this.pageInfo.pageNo = 1;
			this.memberInfo = await vipConfig.getUserVip();	// 会员信息 包含粉丝
			
			this.userInfo = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):null
			this.memberConfig = uni.getStorageSync("memberConfig")?JSON.parse(uni.getStorageSync("memberConfig")):null//会员信息,
			// 如果身份是合伙人，展示粉丝的角色
			if(this.userInfo && this.userInfo.plusFlag != 4){
				this.endTime = this.userInfo.plusEndTime?this.$utils.formatDate(this.userInfo.plusEndTime,"yyyy-MM-dd"):''
			}
			this.memberConfig.shift()	//删除粉丝
			
			this.chooseTab = this.memberConfig[0]
			for(let i =0;i<this.memberConfig.length;i++){	// 初始化tab选中
				if(this.memberConfig[i].type == this.memberInfo.type){
					this.chooseTab = this.memberConfig[i]
				}
			}
			let memberType = this.memberInfo.type?this.memberInfo.type:this.memberConfig[0].type
			this.promotionGoodsList(false,memberType);	//获取商品列表
		},
		components: {
			biserialGoods,
			headImg
		},
	};
</script>

<style scoped lang="scss">
	.commonPageTitle {
		background-color: #F5F5F5;
		min-height: 100vh;
		padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
		// padding-top: 20rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	

	.collectTitle {
		color: #333;
		background-color: #fff;
		.goBackBtn {
			background-image: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_1@2x.png);
		}
	}
	.banner{
		width: 100%;
		position: relative;
		.userInfo{
			position: absolute;
			top: 152rpx;
			width: 100%;
			display: flex;
			align-items: center;
			padding: 0 48rpx;
		}
		.vipName{
			font-size: 30rpx;
			color: #FFFFFF;
			font-weight: 700;
			position: absolute;
			top: -50rpx;
			left: 160rpx;
		}
		.head {
			min-width: 90rpx;
			width: 90rpx;
			height: 90rpx;
			border: 1px solid #FFFFFF;
			border-radius: 50%;
			overflow: hidden;
			display: inline-block;
		}
		
		.right{
			margin-left: 24rpx;
			width: 80%;
			color: #FFFFFF;
			line-height: 1.4;
			&>text{
				font-size: 20rpx;
				margin-top: 4rpx;
			}
		}
		.role{
			display: flex;
			align-items: center;
			text{
				font-size: 28rpx;
				max-width: 280rpx;
				width: auto;
			}
			view{
				width: 32rpx;
				height: 32rpx;
				background-size: 100% 100%;
				margin-left: 24rpx;
			}
		}
		.level{
			width: 168rpx;
			height: 48rpx;
			background: #EE3A3A;
			border-radius: 0 20rpx 0 20rpx;
			font-size: 28rpx;
			font-weight: 500;
			line-height: 48rpx;
			color: #fff;
			text-align: center;
			position: absolute;
			right: 24rpx;
			top: 30rpx;
		}
		.tabName{
			font-size: 68rpx;
			font-weight: 400;
			line-height: 90rpx;
			color: #FFFFFF;
			letter-spacing: 8rpx;
			position: absolute;
			left: 110rpx;
			top: 132rpx;
		}
	}
	.vipsList{
		width: 100%;
		margin-top: -180rpx;
	}
	.vipGroup{
		width: 100%;
		height: 212rpx;
		padding: 0 26rpx;
		position: relative;
		overflow-x: auto;
		display: flex;
		.list{
			display: inline-block;
			width: 50%;
			min-width: 120rpx;
			height: 148rpx;
			position: relative;
			z-index: 0;
			margin-right: 24rpx;
			.content{
				position: absolute;
				width: 100%;
				height: 100%;
				top: 26rpx;
				overflow: hidden;
				border-radius: 8rpx;
			}
			.bg{
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: 1;
			}
			.icon{
				width: 48rpx;
				height: 50rpx;
				opacity: 0.4;
				position: absolute;
				top: 16rpx;
				left: 50%;
				transform: translate(-50%);
				z-index: 2;
			}
			.name{
				font-size: 30rpx;
				font-weight: 500;
				line-height: 36rpx;
				color: #fff;
				width: 60rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				z-index: 3;
				text-align: center;
			}
			.tag{
				width: 65rpx;
				height: 26rpx;
				background: linear-gradient(312deg, #F6D09E 0%, #FFF6E9 100%);
				border-radius: 0px 8rpx 0px 16rpx;
				position: absolute;
				top: 16rpx;
				right: 0;
				z-index: 4;
				text-align: center;
				font-size: 18rpx;
				font-weight: 400;
				line-height: 26rpx;
				color: #2E2E2E;
			}
		}
		.list.active{
			z-index: 21;
			.content{
				z-index: 11;
			}
			.bg{
				z-index: 12;
			}
			.icon{
				z-index: 13;
			}
			.name{
				z-index: 14;
			}
			.tag{
				z-index: 15;
			}
		}
	}
	.rights{
		width: 100%;
		position: relative;
		margin-top: -64rpx;
		image{
			z-index: 11;
		}
	}

	
	.bag {
		margin: 50rpx 24rpx 32rpx 24rpx;
		display: flex;
		align-items: flex-end;
		.title{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		.remarks{
			margin-left: auto;
			font-size: 24rpx;
			font-weight: 400;
			color: #666666;
		}
		.closed::before, .opened::before{
			content: '';
			width:0;
			height:0;
			display: inline-block;
			margin-top: -16rpx;
			margin-right: 14rpx;
			border-right:14rpx solid transparent;
			border-left:14rpx solid transparent;
		}
		.closed::before{
			border-top:20rpx solid #666666;
		}
		.opened::before{
			border-bottom:20rpx solid #666666;
		}
	}
	.memberGoodsList{
		background-color: #F5F5F5;
		padding-bottom: 20rpx;
	}
	
	.inviteShareBtn{
		width: 126rpx;
		height: 126rpx;
		position: fixed;
		right: 10rpx;
		bottom: 284rpx;
		z-index: 12;
		background:none;
		animation: bounceIn .6s infinite alternate;
	}
	@keyframes bounceIn {
	    0% {
	        bottom: 268rpx;
	    }
		
	    to {
	        bottom: 300rpx;
	    }
	}
	.inviteShareBtn::after{
		border: none;
	}
</style>
