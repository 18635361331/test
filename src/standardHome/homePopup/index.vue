<template>
	<view class="page ">
		<uni-popup ref="homeDialog" type="center">
			<view class="homePopup">
				<image :src="imgBaseUrls+homePopupData.imageUrl" @click='goAct' mode="widthFix"></image>
				<view class="closeBtn" @click="closeHomeDialog"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	import appApi from '@/api/app/index';
	export default{
		mixins: [mixin],
		data(){
			return{
				imgBaseUrls: "",
				homePopupData:{	//首页弹窗数据
					
				}
			}
		},
		methods:{
			homePopup(){
				appApi.homePopup().then(res=>{
					if(res.data.code==200){
						this.homePopupData = res.data.data;
						if(!res.data.data.id){
							return
						}
						let homeDialogMsg
						if(uni.getStorageSync("homeDialog")){
							homeDialogMsg = JSON.parse(uni.getStorageSync("homeDialog"))
						}
						if(homeDialogMsg && homeDialogMsg.id==res.data.data.id){
							switch(res.data.data.popupType){
								case 0:	//时间范围内弹一次 已经弹过 不在弹出
								break;
								case 1://每天弹出一次
									if(homeDialogMsg.lastTime != new Date().getDate()){
										this.openHomeDialog()
									}
								break;
								case 2://每次打开
									this.openHomeDialog()
								break;
							}
						}else{
							this.openHomeDialog()
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			closeHomeDialog(){	//关闭首页弹窗
				this.$refs.homeDialog.close()
			},
			
			goAct(){
				this.closeHomeDialog()
				this.zhuge.track("首页-弹窗");
				this.renovationGoTo({linkType:this.homePopupData.targetType,linkValue:this.homePopupData.targetUrl})
			},
			openHomeDialog(){	//打开首页弹窗
				uni.setStorageSync("homeDialog",JSON.stringify({id:this.homePopupData.id,lastTime:new Date().getDate()}))
				this.$refs.homeDialog.open()
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.homePopup()
		}
	}
</script>

<style scoped>
	.homePopup{
		width: 687rpx;
	}
	.closeBtn{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		bottom: -90rpx;
		left: 0;
		margin: auto;
		right: 0;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/11_close.png) no-repeat;
		background-size: 100%;
	}
</style>
