<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="rowList">
			<view class="everyRow" @click='setRead(item)' v-for="item,index in moduleMsgInfo.records" :key='index'>
				<view class="everyRowTime">
					{{$utils.formatDate(item.pushTime,"yyyy-MM-dd hh:mm")}}
				</view>
				<uni-swipe-action>
					<uni-swipe-action-item >
						<template v-slot:right :right-options="options">
							<view class="delAddr" @click="removeMsg(index)"><text>刪除</text></view>
						</template>
						<view class="messaeInfo">
							<view class="messageInfoTitle">
								<view class="infoRadioBox" v-if="!item.readStatus"></view>
								<view>{{item.title}}</view>
							</view>
							<view class="messaeInfoGoods">
								<image :src="item.iconUrl" mode=""></image>
								<view class="messageInfoText">
									<view class="messageGoodsTitle">
										{{item.content}}
									</view>
									<view class="messageGoodsCode">
										{{item.msgSrc}}
									</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
		<view class="noMsg" v-if="!moduleMsgInfo.records || !moduleMsgInfo.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/msg_none@2x.png" mode="widthFix"></image>
			<view class="noMsgText">
				消息列表空荡荡
			</view>
		</view>
	</view>
</template>

<script>
	import msgApi from '@/api/msg/index.js'
	export default {
		data() {
			return {
				moduleMsgInfo: {

				},
				options:{	//滑动操作配置
					style:{
						width:'200rpx',
						height:'285rpx'
					}
				},
				imgBaseUrls: "",
				defaultTitleDto:{
					title:'交易物流',
				}
			}
		},
		methods: {
			moduleMessages(flag) { //获取系统通知消息
				msgApi.moduleMessages({
					minMsgId: this.moduleMsgInfo.lastId ? this.moduleMsgInfo.lastId : 0,
					module: 3,
					size: 10
				}).then(res => {
					if (res.data.code == 200) {
						if (flag) {
							this.moduleMsgInfo.hasMore = res.data.data.hasMore;
							this.moduleMsgInfo.lastId = res.data.data.lastId;
							this.moduleMsgInfo.records = this.moduleMsgInfo.records.concat(res.data.data.records);
						} else {
							this.moduleMsgInfo = res.data.data;
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			setRead(item) { //设为已读
				if (item.readStatus) {
					return
				}
				msgApi.setRead([item.msgId]).then(res => {
					if (res.data.code == 200) {
						item.readStatus = true
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			removeMsg(index){	//移除消息
				msgApi.removeMsg([this.moduleMsgInfo.records[index].msgId]).then(res=>{
					if(res.data.code==200){
						this.moduleMsgInfo.records.splice(index,1)
					}else{
						uni.showToast({
							title:res.data.message
						})
					}
				})
			}
		},
		onReachBottom() {
			if (this.moduleMsgInfo.hasMore) {
				this.moduleMessages(true)
			}
		},
		onShow() {
			this.zhuge.track("交易物流页面")
			if (this.moduleMsgInfo.lastId) {
				this.moduleMsgInfo = {}
			}
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.moduleMessages()
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		background-color: #F5F5F5;
		min-height: 100vh;
		padding-bottom: 40rpx;
	}

	.rowList {
		width: 100%;
		padding: 0 30rpx;
	}

	.everyRowTime {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 24rpx;
		color: #999999;
	}

	.messaeInfo {
		padding: 24rpx;
		background-color: #FFFFFF;
		border-radius: 6rpx;
		width: 100%;
	}

	.messageInfoTitle {
		display: flex;
		align-items: center;
		font-size: 32rpx;
	}

	.infoRadioBox {
		width: 12rpx;
		height: 12rpx;
		background-color: #FF1558;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.messaeInfoGoods {
		margin-top: 24rpx;
		height: 180rpx;
		display: flex;
	}

	.messaeInfoGoods image {
		width: 180rpx;
		height: 180rpx;
	}

	.messageInfoText {
		margin-left: 20rpx;
		flex: 1;
	}

	.messageGoodsTitle {
		width: 100%;
	}

	.messageGoodsCode {
		color: #999999;
		margin-top: 12rpx;
	}

	.noMsg {
		margin: 0 auto;
		width: 360rpx;
		padding-top: 150rpx;
		text-align: center;
	}

	.noMsg image {
		width: 100%;
	}

	.noMsgText {
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		margin-top: 55rpx;
	}
	.delAddr{
		width: 200rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ff1558;
		text-align: center;
		line-height: 285rpx;
		color: #fff;
	}
</style>
