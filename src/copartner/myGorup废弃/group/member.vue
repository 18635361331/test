<template>
	<view class="page">
		<view class="everyList" v-for="item,index in userInfo.records" :key='index'>
			<headImg class="userInfoHead" :head="item.smallIcon"></headImg>
			<view class="memberInfo">
				<view class="everyInfo userInfo">
					<view class="userName">{{item.nickName}}</view>
					<view v-if="plusFlag==4">拓展返利：<text>{{item.expandTotalRewardAmount}}元</text></view>
				</view>
				<view class="everyInfo time">
					发展时间：{{$utils.formatDate(item.beginTime,"yyyy-MM-dd")}}
				</view>
			</view>
		</view>
		<view class="hasNothingMsg" v-if="!userInfo.records || !userInfo.records.length">
			<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noOrder.png" mode="widthFix"></image>
			<text class="hasNothingMsgText">暂无內容</text>
		</view>
	</view>
</template>

<script>
	import headImg	from  '@/common/model/head.vue'
	import appApi from '@/api/app/index.js'
	export default {
		props:['plusFlag'],
		data(){
			return{
				userInfo:{
					
				},
				pageInfo:{
					pageNo:1,
					pageSize:10
				}
			}
		},
		methods:{
			teamMembers(){
				appApi.teamMembers(this.pageInfo).then(res=>{
					if(res.data.code==200){
						this.userInfo = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			initList(){
				this.pageInfo.pageNo = 1;
				this.teamMembers()
			},
			reachBottom(){
				this.pageInfo.pageNo++;
				this.teamMembers()
			}
		},
		mounted() {
			
		},
		components:{
			headImg
		}
	}
</script>

<style scoped> 
.everyList{
	width: 100%;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	display: flex;
	padding: 20rpx;
	margin-bottom: 20rpx;
}
.userInfoHead {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 20rpx;
}

.memberInfo{
	width: calc(100% - 120rpx);
}
.userInfo{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.everyInfo{
	color: #666666;
	line-height: 56rpx;
	font-size: 28rpx;
}

.userInfo text{
	color: #FE325C;
}
.userName{
	color: #323232;
}

</style>
