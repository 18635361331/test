<template>
	<view class="page memberInterests">
		<view class="title">
			{{interestsConfig.name}}{{memberInterests.length}}大权益
		</view>
		<rights :list="memberInterests" :source="'detail'" :path="'/pages/memberGiftBag/index'"></rights>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	import vipConfig from '@/common/js/vipConfig.js';
	import rights from '@/pages/my/rights.vue'
	
	export default {
		props:["goodsInfo"],
		components:{
			rights
		},
		data(){
			return{
				memberInterests:[],
				interestsConfig:"",
				imgBaseUrls:''
			}
		},
		methods:{
			getPrivilege(type){	//获取会员类型对应的权益信息
				memberApi.getPrivilege(type).then(res=>{
					if(res.data.code==200){
						this.memberInterests = res.data.data.privilegeUnitList;
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
		},
		async mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl
			this.interestsConfig = await vipConfig.getUserVip(this.goodsInfo.singlePromotionType-50)
			this.getPrivilege(this.goodsInfo.singlePromotionType-50)
		}
	}
</script>

<style scoped lang="scss">
	.memberInterests{
		background-color: #FFFFFF;
		margin-top: 24rpx;
		margin-bottom: 24rpx;
	}
	.title{
		width: 100%;
		height: 78rpx;
		color: #333333;
		font-size: 32rpx;
		font-weight: 600;
		line-height: 78rpx;
		padding-left: 30rpx;
		padding-top: 20rpx;
	}
	
	
</style>
