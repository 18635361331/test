<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="everyRow" v-for="item,index in moduleMsgInfo.records" :key='index'>
			<view class="everyTitle">
				{{$utils.formatDate(item.pushTime,"yyyy-MM-dd hh:mm")}}
			</view>
			<uni-swipe-action>
				<uni-swipe-action-item >
					<template v-slot:right :right-options="options">
						<view class="delAddr" @click="removeMsg(index)"><text>刪除</text></view>
					</template>
					<view class="everyInfo" @click="setRead(item)">
						<view class="messageImage" v-if="item.imgUrl" :style="{backgroundImage:'url('+item.imgUrl+')'}">
						</view>
						<view class="everyInfoTitle">
							<text class="radiusBox" v-if="!item.readStatus"></text>
							{{item.title}}
						</view>
						<view class="everyInfoDesc">
							{{item.content}}
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
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
	import mixin from '@/common/js/mixin.js'
	export default{
		mixins:[mixin],
		data(){
			return{
				moduleMsgInfo:{
					
				},
				options:{	//滑动操作配置
					style:{
						width:'200rpx',
						height:'285rpx'
					}
				},
				defaultTitleDto:{
					title:'优惠促销',
				}
			}
		},
		methods:{
			moduleMessages(flag){	//获取促销通知消息
				msgApi.moduleMessages({minMsgId:this.moduleMsgInfo.lastId?this.moduleMsgInfo.lastId:0,module:1,size:10}).then(res=>{
					if(res.data.code==200){
						if(flag){
							this.moduleMsgInfo.hasMore = res.data.data.hasMore;
							this.moduleMsgInfo.lastId = res.data.data.lastId;
							this.moduleMsgInfo.records = this.moduleMsgInfo.records.concat(res.data.data.records);
						}else{
							this.moduleMsgInfo = res.data.data;
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			setRead(item){	//设为已读
				this.renovationGoTo({linkType:item.urlType,linkValue:item.url})
				if(item.readStatus){
					return
				}
				msgApi.setRead([item.msgId]).then(res=>{
					if(res.data.code==200){
						item.readStatus = true
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
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
		mounted() {
			if(this.moduleMsgInfo.lastId){
				this.moduleMsgInfo={}
			}
			this.moduleMessages()
		},
		onShow() {
			this.zhuge.track("消息-优惠促销")
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
	.everyRow{
		width: 702rpx;
		margin: 0 auto;
	}
	
	.everyTitle{
		text-align: center;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 24rpx;
		color: #999999;
	}
	
	.everyInfo{
		width: 100%;
		border-radius: 8rpx;
		background-color: #FFFFFF;
		padding-bottom: 24rpx;
	}
	.messageImage{
		height: 280rpx;
		width: 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.everyInfoTitle{
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 16px;
		padding: 0 12px;
		padding-top: 12px;
		height: 22px;
		line-height: 22px;
	}
	.radiusBox{
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #FF1558;
		margin-right: 6px;
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
	.everyInfoDesc{
		margin: 0 12px;
		margin-top: 6px;
		line-height: 18px;
		color: #999999;
		font-size: 12px;
	}
	.noMsg{
		margin: 0 auto;
		width: 360rpx;
		padding-top: 150rpx;
		text-align: center;
	}
	.noMsg image{
		width: 100%;
	}
	.noMsgText{
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		margin-top: 55rpx;
	}
</style>
