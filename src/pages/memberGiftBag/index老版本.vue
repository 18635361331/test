<template>
	<view class="page commonPageTitle">
		<!-- #ifndef MP-WEIXIN -->
		<view class="collectTitle">
			<view class="goBackBtn" @click="goBack(1)"></view>
			<view class="title">会员中心 </view>
		</view>
		<!-- #endif  -->
		<view class="banner">
			<block  v-if="userInfo">	
				<image v-if="memberInfo.centerBg" :src="imgBaseUrls+memberInfo.centerBg" mode="widthFix"></image>
				<image v-else :src="imgBaseUrls+partner.centerBg" mode="widthFix"></image>
				<view class="userInfo" v-if="userInfo">
					<view class="head">
						<headImg :head="userInfo.smallIcon"></headImg>
					</view>
					<view class="right" :style="'color:'+memberInfo.color">
						<view class="role">
							<text class="ellipsis-one">{{userInfo.nickName?userInfo.nickName:userInfo.telephone}}</text>
							<view v-if="memberInfo.icon" :style="{backgroundImage:'url('+imgBaseUrls+memberInfo.icon+')'}"></view>
						</view>
						<text v-if="endTime">{{endTime}}到期</text>
					</view>
				</view>
			</block>
			<image v-else :src="imgBaseUrls+'/appletsImages/membrConfig/noLogin.png'" mode="widthFix"></image>
		</view>
		
		<!-- 会员权益 -->
		<view class="rights">
			<scroll-view :scroll-left="scrollLeft" scroll-x="true">
				<view class="title">
					<view class="tab" :class="chooseTab.type==item.type?'active':''" v-for="item,index in memberConfig" :key="index" @click="changeTab(item,index)" :style="{'color':chooseTab.type==item.type?item.color:''}" >
						<text>{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
			<rights :list="rights"></rights>			
		</view>
		
		<view class="bag">
			<text class="title">{{chooseTab.name}}礼包</text>
			<text class="remarks">购买以下任意一款超值礼包即享{{chooseTab.name}}权益</text>
		</view>
		<view class="memberGoodsList" v-if="listInfo.records && listInfo.records.length">
			<biserialGoods :goodsList="listInfo.records"></biserialGoods>
		</view>
		<view class="notGoods" v-else>
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/memberGiftNoGoods.png" mode="widthFix"></image>
			<view>暂无商品～</view>
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
	import rights from '@/pages/my/rights.vue'
	import headImg	from  '@/common/model/head.vue'
	
	export default {
		data() {
			return {
				pageInfo: {
					pageNo: 1,
					pageSize: 10,
				},
				scrollLeft:0,
				rights:[], //当前权益
				listInfo:'',//商品信息
				chooseTab:"",	//选中的会员信息
				memberInfo:"",	//会员对应的信息
				memberConfig:"",	//会员配置
				imgBaseUrls: "",
				endTime:'',//到期時間
				userInfo: null, //用户信息
				partner:'',//合伙人角色
			};
		},
		methods: {
			
			getPrivilege(type){	//获取会员类型对应的权益信息
				memberApi.getPrivilege(type).then(res=>{
					uni.hideLoading()
					if(res.data.code==200){
						this.rights = res.data.data.privilegeUnitList;
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
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
				this.pageInfo.pageNo = 1;
				this.chooseTab = obj;
				this.getPrivilege(obj.type)
				this.promotionGoodsList(false,obj.type);
				
				this.scrollLeft = index>=3?index*100:0			// 滚动条底部
				
			}
		},
		
		onReachBottom() {
			if (this.pageInfo.pageNo < this.listInfo.totalPage) {
				this.pageInfo.pageNo++;
				this.promotionGoodsList(true,this.memberInfo.type?this.memberInfo.type:this.memberConfig[0].type);
			}
		},
		onLoad() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		async onShow() {
			uni.showLoading({
				title:'加载中'
			})
			this.pageInfo.pageNo = 1;
			let tabChoose = 0
			this.memberInfo = await vipConfig.getUserVip();	// 会员信息
			
			this.userInfo = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):null
			this.memberConfig = uni.getStorageSync("memberConfig")?JSON.parse(uni.getStorageSync("memberConfig")):null//会员信息,
			// 如果身份是合伙人，展示粉丝的角色
			if(this.userInfo && this.userInfo.plusFlag == 4){
				this.partner = this.memberConfig[0]
			}else{
				this.endTime = this.userInfo&&this.userInfo.plusEndTime?this.$utils.formatDate(this.userInfo.plusEndTime,"yyyy-MM-dd"):''
			}
			this.memberConfig.shift()	//删除粉丝
			
			this.chooseTab = this.memberConfig[0]
			for(let i =0;i<this.memberConfig.length;i++){	// 初始化tab选中
				if(this.memberConfig[i].type == this.memberInfo.type){
					this.chooseTab = this.memberConfig[i]
					tabChoose = i
				}
			}
			let memberType = this.memberInfo.type?this.memberInfo.type:this.memberConfig[0].type
			this.getPrivilege(memberType)	//获取权益
			this.promotionGoodsList(false,memberType);	//获取商品列表
			this.scrollLeft = tabChoose>=3?tabChoose*100:0	// 滚动条底部
			
		},
		components: {
			biserialGoods,
			rights,
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
		// height: 300rpx;
		position: relative;
		.userInfo{
			position: absolute;
			bottom: 100rpx;
			width: 100%;
			display: flex;
			align-items: center;
			padding: 0 48rpx;
		}
		.head {
			width: 72rpx;
			height: 72rpx;
			border: 1px solid #F1F1F1;
			border-radius: 50%;
			overflow: hidden;
			display: inline-block;
		}
		
		.right{
			margin-left: 10rpx;
			width: 80%;
			&>text{
				font-size: 20rpx;
				font-weight: 400;
				line-height: 1.4;
				margin-top: 4rpx;
			}
		}
		.role{
			display: flex;
			align-items: center;
			text{
				font-size: 28rpx;
				font-weight: 400;
				line-height: 1.4;
				max-width: 280rpx;
				width: auto;
			}
			view{
				width: 32rpx;
				height: 32rpx;
				background-size: 100% 100%;
				margin-left: 8rpx;
			}
		}
	}
	.rights{
		$boderColor:#FFC08A;
		margin: 20rpx auto;
		width: calc(100% - 48rpx);
		background: #F0EFF2;
		border-radius: 24rpx;
		overflow: hidden;
		.title{
			display: flex;
			flex-wrap: nowrap;
			background: #F0EFF2;
			font-size: 24rpx;
			font-weight: 400;
			text-align: center;
			color: #999999;
			.tab{
				position: relative;
				min-width: 200rpx;
				height: 78rpx;
				border-radius: 24rpx 24rpx 0 0;
				display: flex;
				align-items: center;
				text{
					width: 100%;
				}
				&:not(:first-child){
					text{
						border-left: 1px solid #D8D8D8;
					}
				}
				&.active{
					font-size: 34rpx;
					z-index: 2;
					color: #333333;
					background: #fff;
					text{
						border-left:none ;
						position: relative;
						z-index: 4;
					}
					&+view{
						text{
							border-left:none ;
						}
					}
				}
			}
		}
		/deep/ .content{
			padding: 49rpx 16rpx 36rpx;
			border-radius:0 0 24rpx 24rpx;
			background: #fff;
			&>view{
				box-shadow: 0 6rpx 12rpx rgba(84, 67, 91, 0.1);
			}
		}
	}

	
	.bag {
		width: 100%;
		margin: 50rpx 0 32rpx 24rpx;
		.title{
			font-size: 34rpx;
			font-weight: bold;
			line-height: 1.3;
			color: #333333;
		}
		.remarks{
			margin-left: 22rpx;
			font-size: 20rpx;
			font-weight: 400;
			line-height: 1.3;
			color: #666666;
		}
	}
	.memberGoodsList{
		background-color: #F5F5F5;
		padding-bottom: 20rpx;
	}
	
	.notGoods{
		margin: 0 auto;
		width: 100%;
		margin-top: 100rpx;
		text-align: center;
	}
	.notGoods image{
		width: 300rpx;
	}
	.notGoods view{
		width: 80%;
		font-size: 32rpx;
		color: #999999;
		line-height: 54rpx;
		margin: 30rpx auto;
	}
	

	
</style>
