<template>
	<view class="page commonPageTitle">
		<view class="collectTitle" >
			<!-- #ifndef MP-WEIXIN -->
			<view class="goBackBtn" @click="goBack(1)"></view>
			<view class="title">消息中心</view>
			<!-- #endif -->
			<view class="clearBtn" @click="readAllMsg"></view>
		</view>
		
		
		<view v-for="item,index in msgModuleList" v-if="index<3 && item.flag" :key='item.name'>
			<uni-swipe-action>
				<uni-swipe-action-item >
					<template v-slot:right :right-options="options">
						<view class="delAddr" @click="removeModule(index+1)"><text>刪除</text></view>
					</template>
					<view class="everyRow" @click="goToPage(item)">
						<view class="newIcon">
							<image :src="item.image" mode=""></image>
							<view class="msgNum" v-if="item.unreadCount">
								{{item.unreadCount}}
							</view>
						</view>
						<view class="newInfo">
							<view class="infoTitle">{{item.name}}</view>
							<view class="infoSubTitle ellipsis-one">{{item.latestMsg?item.latestMsg:"暂无消息"}}</view>
						</view>
						<view class="newTime" v-if="item.lastMsgTime">
							{{$utils.formatDate(item.lastMsgTime,"yyyy-MM-dd")}}
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
	</view>
</template>

<script>
	import msgApi from '@/api/msg/index.js'
	export default {
		data() {
			return {
				msgModuleList: [{
						name: "优惠促销",
						latestMsg: "",
						image: "http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/p-icon.png",
						path: "/pages/messagePromotion/index",
						flag:false
					},
					{
						name: "系统通知",
						latestMsg: "",
						image: "http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/s-icon.png",
						path: "/pages/systemNotice/index",
						flag:false
					},
					{
						name: "交易物流",
						latestMsg: "",
						image: "http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/l-icon.png",
						path: "/pages/messageLogistics/index",
						flag:false
					},
					{
						name: "互动消息",
						latestMsg: "",
						image: "http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/n-icon.png",
						path: "/pages/systemNotice/index",
						flag:false
					}
				],
				options:{	//滑动操作配置
					style:{
						width:'200rpx',
						height:'285rpx'
					}
				},
				imgBaseUrls: "",
			}
		},
		methods: {
			allMsg() { //获取所有消息列表
				msgApi.allMsg().then(res => {
					if (res.data.code == 200) {
						for(let i=0;i<this.msgModuleList.length;i++){
							this.msgModuleList[i].flag = false
						}
						for (let i = 0; i < res.data.data.length; i++) {
							for (let j in res.data.data[i]) {
								this.$set(this.msgModuleList[res.data.data[i].msgModule-1], j, res.data.data[i][j])
								this.$set(this.msgModuleList[res.data.data[i].msgModule-1], "flag", true)
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
			readAllMsg() { //清空所有通知消息
				msgApi.readAllMsg().then(res => {
					if (res.data.code == 200) {
						this.allMsg()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			goToPage(item) { //去往消息通知详情
				this.$Router.push({
					path: item.path
				})
			},
			removeModule(index){
				msgApi.removeModule(index).then(res=>{
					if(res.data.code==200){
						this.allMsg()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		onShow() {
			this.zhuge.track("消息落地页")
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.allMsg()
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		padding-top: 88rpx;
	}
	.collectTitle {
		border-bottom: 1rpx solid #E4E4E4;
	}
	.clearBtn {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/mremove.png) no-repeat 50%;
		background-size: 36rpx;
		position: absolute;
		right: 40rpx;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	.uniSwipeAction{
		width: 100%;
	}

	.everyRow {
		display: flex;
		width: 100%;
		padding: 40rpx 28rpx;
		border-bottom: 1rpx solid #E4E4E4;
	}

	.newIcon {
		width: 88rpx;
		height: 88rpx;
		margin-right: 24rpx;
		position: relative;
	}

	.newIcon image {
		width: 1005;
		height: 100%;
	}

	.newInfo {
		flex: 1;
	}

	.newTime {
		max-width: 240rpx;
		margin-left: 20rpx;
		font-size: 26rpx;
		text-align: right;
		color: #999999;
		line-height: 40rpx;
	}

	.infoTitle {
		width: 100%;
		height: 44rpx;
		line-height: 44rpx;
	}

	.infoSubTitle {
		width: 100%;
		height: 44rpx;
		color: #999;
		line-height: 44rpx;
		font-size: 24rpx;
	}

	.msgNum {
		position: absolute;
		top: 0;
		right: 0;
		min-width: 28rpx;
		height: 28rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		font-size: 24rpx;
		padding: 0 6rpx;
		line-height: 28rpx;
		text-align: center;
		border-radius: 50%;
	}
	.delAddr{
		width: 150rpx;
		height: 100%;
		background-color: #ff1558;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
</style>
