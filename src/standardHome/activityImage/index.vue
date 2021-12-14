<template>
	<view class="page">
		<view class="activeImage" v-if="activeImage.content && activeImage.isShow">
			<image @click="activeClick(activeImage.content)" :src="imgBaseUrls+activeImage.content.backgroundImage" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/homeMixin.js'
	import decorateApi from '@/api/decorate/index.js'
	export default{
		mixins:[mixin],
		data(){
			return{
				activeImage:{},
				imgBaseUrls:""
			}
		},
		methods:{
			activeClick(item){
				this.renovationGoTo(item);
				this.zhuge.track("首页-胶囊图")
			},
			searchComponent(){	//获取首页活动图片
				decorateApi.searchComponent(100003).then(res=>{
					if(res.data.code==200){
						if(res.data.data.content && res.data.data.content!="NaN"){
							res.data.data.content = JSON.parse(res.data.data.content);
							this.activeImage = res.data.data
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
		}
	}
</script>

<style scoped>
	.activeImage{
		width: 100%;
		padding: 0 24rpx;
		margin: 0 auto;
	}
	.activeImage image{
		width: 100%;
		height: 100%;
	}
</style>
