<template>
	<view class="page">
		<scroll-view class="slideVideo" scroll-x="true" >
			<image v-if="slideVideo.imageUrl" class="slideVideoImage" :style="{width:iamgeSize.width,height:iamgeSize.height}" :src="imgBaseUrls+slideVideo.imageUrl" @load='imgWidth'  mode="widthFix"></image>
			<video class="myVideo" v-for="(item,index) in slideVideo.videoList" :key='index' v-if="item.videoSrc" object-fit='fill' :style="{height:item.height?(item.height+'rpx'):'',width:(item.width?item.width+'rpx':'')}" :src="imgBaseUrls+item.videoSrc" :poster="item.posterSrc?(imgBaseUrls+item.posterSrc):''"	@error="videoErrorCallback" controls :muted="true" :show-mute-btn="true"></video>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:['slideVideo'],
		data(){
			return{
				imgBaseUrls: "",
				iamgeSize:{
					width:"",
					height:""
				}
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl
		},
		methods:{
			imgWidth(e){
				let view = uni.createSelectorQuery().in(this).select(".slideVideoImage");
				view.boundingClientRect(data=>{
					this.iamgeSize.width = e.detail.width+"px"
					this.iamgeSize.height = e.detail.height+"px"
				}).exec();
			}
		}
	}
</script>

<style scoped>
	.content{
		min-width: 100%;
		min-height: 100rpx;
		position: relative;
	}
	.slideVideo{
		white-space: nowrap;
	}
	.myVideo{
		display: inline-block;
	}
	.slideVideoImage{
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
