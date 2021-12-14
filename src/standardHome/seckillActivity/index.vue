<template>
	<view class="page seckillParent">
		<view v-if="seckillActivity.mainTitle">
			<view class="seckillTitle">
				<text class="mainTitle">{{seckillActivity.mainTitle}}</text>
				<text class="subTitle">{{seckillActivity.subtitle}}</text>
			</view>
			<scroll-view scroll-x="true" class="scrollViewGoods">
				<view class="scrollBox">
					<view class="everyRow" :class="item.marketingSessionId==chooseItem.marketingSessionId?'active':''" v-for="item,index in seckillActivity.sessionList" :key='index' @click="sessionStartChange(item)">
						<view class="top">
							{{$utils.formatDate(item.sessionStartTime,"hh:mm")}}
						</view>
						<view class="status">{{item.statusText}}</view>
						<view class="point" v-if="chooseItem.marketingSessionId==item.marketingSessionId"></view>
					</view>
				</view>
			</scroll-view>
			<view class="seckillImage">
				<view class="sessionsTitle">
					{{chooseItem.sessionMainTitle}}
				</view>
				<view class="sessionTime">
					{{new Date().getTime() < chooseItem.sessionStartTime?"距开始":"距结束"}}
					<text class="timeText"></text>
					<text class="timeBox">{{timeParams.hours}}</text>
					<text class="timeText">:</text>
					<text class="timeBox">{{timeParams.minute}}</text>
					<text class="timeText">:</text>
					<text class="timeBox">{{timeParams.seconds}}</text>
				</view>
			</view>
			<view class="goodsList">
				<view class="everyGoods" v-for="item,index in seckilGoodsList" :key="index" @click="goToGoodsDetails(item)">
					<view class="goodsItemImage">
						<image :src="imgBaseUrls+item.itemImageUrl" mode=""></image>
					</view>
					<view class="goodsItemInfo">
						<view class="goodItemTitle">
							{{item.itemName}}
						</view>
						<view class="progress" v-if='item.salesVolumePercentage'>
							<view class="progressBox">
								<view class="progressChildren" :style="{width:item.salesVolumePercentage+'%'}"></view>
							</view>
							<view class="progressText">
								已售{{item.salesVolumePercentage}}%
							</view>
						</view>
						<view class="goodsItemPrice">
							<text class="marketingPrice">￥{{item.minimumMarketingPrice}}</text>
							<text class="itemPrice">￥{{item.itemPrice}}</text>
						</view>
						
						<view class="goodsItemBuyBtn remindMe" v-if="new Date().getTime() < chooseItem.sessionStartTime">
							<text v-if="!item.notificationFlag" @click.stop="addMarketingItemNotification(item)">提醒我</text>
							<text v-else @click.stop='removeMarketingItemNotification(item)'>取消提醒</text>
						</view>
						<view class="goodsItemBuyBtn" v-else>
							<text v-if="item.salesVolumePercentage<100">去抢购</text>
							<text v-else>已抢完</text>
						</view>
					</view>
				</view>
			</view>
			<view class="moreGoods" @click="$Router.push({path:'/pages/seckillZone/index'})">
				<text>更多秒杀商品</text>
				<view class="arrowIcon"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import marketApi from '@/api/marketing/index.js'
	export default {
		data(){
			return{
				seckillActivity:{},	//秒杀活动数据
				chooseItem:{},	//选中的场次
				seckilGoodsList:[],	//秒杀商品列表
				imgBaseUrls:"",
				todayTime:new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1,	//当天的时间戳
				timeParams:{
					hours:"",
					minute:"",
					seconds:""
				},
				markInterval:""
			}
		},
		methods:{
			nonDesignatedMarketing(){	//首页秒杀活动
				marketApi.nonDesignatedMarketing().then(res=>{
					if(res.data.code==200){
						if(res.data.data){
							this.seckillActivity = res.data.data;
							this.chooseItem = this.seckillActivity.sessionList[0];
							for(let i=0;i<this.seckillActivity.sessionList.length;i++){
								let sessionStartTime= this.seckillActivity.sessionList[i].sessionStartTime
								let sessionEndTime = this.seckillActivity.sessionList[i].sessionEndTime
								if(sessionStartTime<this.todayTime){	//今天的场次
									if(sessionEndTime>new Date().getTime()){
										this.$set(this.seckillActivity.sessionList[i],"statusText","抢购中")
									}else{
										this.$set(this.seckillActivity.sessionList[i],"statusText","即将开抢")
									}
								}else if(sessionStartTime<this.todayTime+86400000){	
									this.$set(this.seckillActivity.sessionList[i],"statusText","明日开抢")
								}else{
									this.$set(this.seckillActivity.sessionList[i],"statusText","后天开抢")
								}
							}
							this.judgeTime()
							this.listSessionItems();
							this.markInterval = setInterval(()=>{
								this.judgeTime()
							},1000)
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			listSessionItems(){	//获取秒杀某场次下商品
				marketApi.listSessionItems(this.chooseItem.marketingSessionId,{pageNo:1,pageSize:5}).then(res=>{
					if(res.data.code==200){
						if(res.data.data){
							this.seckilGoodsList = res.data.data.itemPage.records;
						}else{
							this.seckilGoodsList.splice(0)
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToGoodsDetails(item){	//去往商品详情
				this.$Router.push({
					path:"/pages/goodsDetails/index",
					query:{
						goodsId:item.itemId,
						promotionId:this.seckillActivity.marketingId
					}
				})
			},
			sessionStartChange(item){	//场次发生变化
				this.chooseItem = item;
				this.judgeTime()
				this.listSessionItems()
			},
			addMarketingItemNotification(item){	//提醒我
				let params = {
					itemId:item.itemId,
					marketingId:this.seckillActivity.marketingId,
					marketingSessionId:this.chooseItem.marketingSessionId
				}
				marketApi.addMarketingItemNotification(params).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"设置成功",
							icon:"none"
						})
						item.notificationFlag = 1
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			removeMarketingItemNotification(item){	//取消提醒
				let params = {
					itemId:item.itemId,
					marketingId:this.seckillActivity.marketingId,
					marketingSessionId:this.chooseItem.marketingSessionId
				}
				marketApi.removeMarketingItemNotification(params).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"取消成功",
							icon:"none"
						})
						item.notificationFlag = 0
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			judgeTime(){	//计算时间
				if(new Date().getTime() < this.chooseItem.sessionStartTime){	//距开始
					this.judgeTimeAccurate(this.chooseItem.sessionStartTime - new Date().getTime())
				}else{
					this.judgeTimeAccurate(this.chooseItem.sessionEndTime  - new Date().getTime())
				}
			},
			judgeTimeAccurate(time){
				this.timeParams.hours = parseInt(time/3600000,10)<10?("0"+parseInt(time/3600000,10)):parseInt(time/3600000,10)
				this.timeParams.minute = parseInt(time/1000/60%60,10)<10?("0"+parseInt(time/1000/60%60,10)):parseInt(time/1000/60%60,10)
				this.timeParams.seconds = parseInt(time/1000%60)<10?("0"+parseInt(time/1000%60,10)):parseInt(time/1000%60)
			},
			clearInters(){	//清除定时器
				if(this.markInterval){
					clearInterval(this.markInterval);
				}
			}
		},
		destroyed(){
		},
		mounted() {
			this.nonDesignatedMarketing()
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.seckillParent{
		padding: 0 24rpx;
	}
	.seckillTitle{
		width: 100%;
		height: 128rpx;
		padding-top: 56rpx;
		margin: 0 auto;
	}
	.mainTitle{
		font-size: 40rpx;
		font-weight: 700;
		color: #000000;
		line-height: 56rpx;
	}
	.subTitle{
		color: #999999;
		font-size: 24rpx;
		margin-left: 20rpx;
	}
	.scrollViewGoods{
		width: 100%;
		height: 120rpx;
		white-space: nowrap;
	}
	.scrollBox{
		display: flex;
		flex-wrap: nowrap;
	}
	.everyRow{
		width: 100rpx;
		height: 100%;
		color: #333333;
		margin-right: 40rpx;
	}
	
	
	.top{
		margin-top: 11rpx;
		font-size: 40rpx;
		line-height: 56rpx;
		text-align: center;
	}
	.status{
		font-size: 22rpx;
		color: #999999;
		margin-bottom: 9rpx;
		text-align: center;
	}
	
	.point{
		width: 8rpx;
		height: 8rpx;
		border-radius: 50%;
		background-color: #FF1558;
		margin: 0 auto;
	}
	.seckillImage{
		width: 100%;
		height: 80rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/home_seckill2@.png) no-repeat 50%;
		background-size: 100% 100%;
		padding: 0 24rpx;
	}
	.sessionTime{
		font-size: 24rpx;
		display: flex;
	}
	.timeBox{
		display: inline-block;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		background-color: #333333;
		color: #FFFFFF;
		text-align: center;
		line-height: 36rpx;
		font-size: 24rpx;
	}
	.timeText{
		margin:0 10rpx
	}
	.goodsList{
		width: 100%;
		height: ;
	}
	.everyGoods{
		margin-top: 16rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		display: flex;
	}
	.goodsItemImage{
		width: 308rpx;
		height: 308rpx;
		border-radius: 16rpx;
	}
	.goodsItemImage image{
		width: 100%;
		height: 100%;
	}
	.goodsItemInfo{
		position: relative;
		padding: 24rpx;
		flex: 1;
	}
	.progress{
		display: flex;
		align-items: center;
		font-size: 20rpx;
		justify-content: space-between;
		color: #666666;
		margin-top: 6rpx;
		border-radius: 6rpx;
		overflow: hidden;
	}
	.progressBox{
		width: 222rpx;
		height: 6rpx;
		background-color: #EEEEEE;
		position: relative;
	}
	.progressChildren{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background-color: #FF1558;
	}
	.goodsItemPrice{
		position: absolute;
		bottom: 30rpx;
	}
	.marketingPrice{
		color: #FF1558;
	}
	.itemPrice{
		margin-left: 10rpx;
		color: #999;
		font-size: 22rpx;
		text-decoration:line-through;
	}
	.goodsItemBuyBtn{
		width: 112rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		background-color: #ffdf8c;
		color: #381500;
		position: absolute;
		bottom: 30rpx;
		right: 0;
		font-size: 24rpx;
		border-radius: 100rpx 0 0 100rpx;
	}
	.everyRow.active{
		color: #FF1558;
	}
	.everyRow.active .status{
		color: #FF1558;
	}
	.remindMe{
		background: linear-gradient(270deg,#04c27a,#20e076);
		color: #fff;
	}
	.moreGoods{
		margin-top: 16rpx;
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16rpx;
		margin-top: 16rpx;
		background-color: #FFFFFF;
	}
	.moreGoods text{
		font-size: 24rpx;
		margin-right: 10rpx;
	}
	.arrowIcon{
		width: 12rpx;
		height: 24rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/seckill_more.png) no-repeat;
		background-size: 100% 100%;
	}
</style>
