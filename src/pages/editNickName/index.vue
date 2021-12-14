<template>
	<view class="page editNick">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="editNickName">
			<input type="text" maxlength="15" v-model.trim="nickName" placeholder="昵称" />
		</view>
		<view class="saveSure" @click="memberUpdate">
			保存
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default{
		data(){
			return{
				nickName:"",
				defaultTitleDto:{
					title:'修改昵称',
					bottomColor:'#E6E6E6'
				}
			}
		},
		onLoad() {
		},
		onShow(){
			this.zhuge.track("修改昵称页面")
			this.nickName = this.$Route.query.nickName
		},
		methods:{
			memberUpdate(){
				if(!this.nickName){
					uni.showToast({
						title:"昵称不能为空",
						icon:"none"
					})
					return
				}
				memberApi.memberUpdate({nickName:this.nickName}).then(res=>{
					if(res.data.code=='200'){
						this.goBack(1);
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.editNick{
		padding: 0 65rpx;
		/* #ifndef MP-WEIXIN */
		padding: 88rpx 65rpx 0;
		/* #endif */
	}
	
	.editNickName input{
		color: #999999;
		font-size: 28rpx;
	}
	.editNickName{
		width: 100%;
		padding-top: 90rpx;
		padding-bottom: 10rpx;
		border-bottom: 1px solid #E4E4E4;
	}
	.saveSure{
		width:100%;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 36rpx;
		color: #FFFFFF;
		background: #FF1558;
		border-radius: 71rpx;
		margin-top: 264rpx;
		text-align: center;
	}
</style>
