<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<!-- 1 合伙人 2 会员 3粉丝 -->
		<block v-if="chooseTab==1">
			<view class="groupTitle" v-if="plusFlag==4">
				<view class="everyPrice" v-for="item,index in groupList" :key='index'>
					<text>{{item.name}}</text>{{item.price}}{{item.unit}}
				</view>
			</view>
			<view class="groupMemberTitle" v-else>
				<view class="price">合伙人返利：{{groupInfo.agencyRewardAmount?groupInfo.agencyRewardAmount:0}}元</view>
				<view class="peopleNum">
					<text>发展合伙人：</text>
					{{groupInfo.distributorNum?groupInfo.distributorNum:0}}人
				</view>
			</view>
		</block>
		
		<view class="groupMemberTitle" v-else-if="chooseTab==2">
			<view class="price" v-if="plusFlag==4">会员返利：{{groupInfo.memberReward?groupInfo.memberReward:0}}元</view>
			<view class="peopleNum" >
				<text>发展会员：</text>
				{{groupInfo.memberNum?groupInfo.memberNum:0}}人
			</view>
		</view>
		<view class="groupMemberTitle" v-else-if="chooseTab==3">
			<view class="price">发展粉丝：{{groupInfo.fansNum?groupInfo.fansNum:0}}人</view>
		</view>
		<view class="groupType">
			<view class="everyType"  @click="chooseTab=3;updateList()">
				粉丝
				<view class="typeLine" v-if="chooseTab==3"></view>
			</view>
			<view class="line"></view>
			<view class="everyType"  @click="chooseTab=2;updateList()">
				会员
				<view class="typeLine" v-if="chooseTab==2"></view>
			</view>
			<view class="line"></view>
			<view class="everyType" @click="chooseTab=1;updateList()">
				合伙人
				<view class="typeLine" v-if="chooseTab==1"></view>
			</view>
		</view>
		<view class="pink">
			<block v-if="chooseTab==3">分享小程序任意页链接给未注册用户，新用户通过分享的链接
成功注册，该用户则成为您新发展的粉丝</block>
			<block v-else-if="chooseTab==1">分享邀请合伙人链接给用户，用户通过分享的链接申请开通合伙人成功，该用户则成为您新发展的合伙人，您可获得相应金额作为居间奖励</block>
			<block v-else>分享小程序任意页链接给用户，用户通过分享的链接购买会员礼包商品或累计购物达到指定金额可成为平台新会员，该用户则成为您新发展的会员；会员在平台所购商品价格与您合伙人身份购买价格之间的差价将在订单完成后以市场拓展奖励返至您的账户</block>
		</view>
		<view class="group">
			<partner ref='partner' v-if="chooseTab==1" :plusFlag="plusFlag"></partner>
			<member ref='member' v-else-if="chooseTab==2" :plusFlag="plusFlag"></member>
			<fans ref='fans' v-else-if="chooseTab==3" :plusFlag="plusFlag"></fans>
		</view>
	</view>
</template>

<script>
	import partner from './group/partner.vue'
	import member from './group/member.vue'
	import fans from './group/fans.vue'
	
	import appApi from '@/api/app/index.js'
	export default {
		data(){
			return{
				defaultTitleDto:{
					title:'我的团队',
				},
				groupList:[
					{
						name:"累计团队业绩：",
						price:"0",
						unit:"元",
						type:"totalTeamAmount"
					},
					{
						name:"年度团队业绩：",
						price:"0",
						unit:"元",
						type:"yearTotalTeamAmount"
						
					},
					{
						name:"累计个人业绩：",
						price:"0",
						unit:"元",
						type:"totalOneselfAmount"
					},
					{
						name:"年度个人业绩：",
						price:"0",
						unit:"元",
						type:"yearTotalOneselfAmount"
					},
					{
						name:"累计发展成员：",
						price:"0",
						unit:"人",
						type:"totalTeamNum"
					},
					{
						name:"年度发展成员：",
						price:"0",
						unit:"人",
						type:"yearTeamNum"
					}
				],
				groupInfo:{},
				chooseTab:3, 
				plusFlag:0,//会员身份 4 合伙人
			}
		},
		onLoad() {
			if(uni.getStorageSync("userInfo")){
				let userInfo = JSON.parse(uni.getStorageSync("userInfo"))
				this.plusFlag = userInfo.plusFlag
			}
		},
		onShow() {
			this.teamSummary()
		},
		methods:{
			teamSummary(){
				appApi.teamSummary().then(res=>{
					if(res.data.code==200){
						if(res.data.data){
							for(let i=0;i<this.groupList.length;i++){
								this.groupList[i].price = res.data.data[this.groupList[i].type]?res.data.data[this.groupList[i].type]:0
							}
							this.groupInfo = res.data.data;
						}
						this.updateList()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			ReachUpdateList(){
				if(this.chooseTab == 1){
					this.$refs.partner.reachBottom()
				}else if(this.chooseTab == 2){
					this.$refs.member.reachBottom()
				}else {
					this.$refs.fans.reachBottom()
				}
			},
			updateList(){
				this.$nextTick(()=>{
					if(this.chooseTab == 1){
						this.$refs.partner.initList()
					}else if(this.chooseTab == 2){
						this.$refs.member.initList()
					}else {
						this.$refs.fans.initList()
					}
				})
			}
		},
		onReachBottom() { //页面滚动到底部
			this.ReachUpdateList()
		},
		components:{
			member,
			partner,
			fans
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
		background-color: #F4F5F6;
	}
	.groupTitle{
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 15rpx 0;
		height: 360rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/myGroupTitle.png);
		background-size: 100% 100%;
	}
	.groupMemberTitle{
		display: flex;
		height: 110rpx;
		background: linear-gradient(142deg, #414551 0%, #3A3D50 100%);
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
	}
	.everyPrice{
		min-width: 50%;
		padding-left: 30rpx;
		line-height: 56rpx;
		color: #FFFFFF;
	}
	.everyPrice:nth-of-type(2n-1){
		color: #E0B79A;
	}
	.price{
		color:#E0B79A ;
	}
	.peopleNum{
		color: #FFFFFF;
	}
	.peopleNum text{
		color: #999999;
	}
	.groupType{
		display: flex;
		align-items: center;
		height: 90rpx;
		background-color: #FFFFFF;
	}
	.everyType{
		width: 50%;
		position: relative;
		line-height: 90rpx;
		text-align: center;
	}
	.line{
		width: 1rpx;
		height: 30rpx;
		background: #D8D8D8;
	}
	.typeLine{
		width: 50rpx;
		height: 10rpx;
		background-color: #FE325C;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 5px;
		
	}
	.group{
		padding: 20rpx;
	}
	.pink{
		width: 100%;
		padding: 20rpx 30rpx;
		background: #FEE5EB;
		font-size: 24rpx;
		color: #FE325C;
		line-height: 1.3;
		letter-spacing: 1px;
	}
		
</style>
