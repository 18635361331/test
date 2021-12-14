<template>
	<view class="footerTpl" :style="'background:'+bgStyle">
		<view class="navItem" v-for="item,index in footerTpl.iconDTOS" @click="renovationGoTo(item)" :key='index'>
			<image :src="imgBaseUrls+(chooseIndex==index?item.selectedIcon:item.defaultIcon)" mode="heightFix"></image>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/mixin.js'
	export default {
		props:['footerTpl'],
		mixins: [mixin],
		data(){
			return{
				imgBaseUrls: "",
				chooseIndex:0
			}
		},
		computed:{
			bgStyle(){
				if(this.footerTpl.backgroundShowWay){	//背景图片
					return `url(${this.imgBaseUrls}${this.footerTpl.backgroundImage}) no-repeat center;background-size: cover`;
				}else{	//背景颜色
					return this.footerTpl.backgroundColor
				}
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			for(let i=0;i<this.footerTpl.iconDTOS.length;i++){
				let hrefLink = this.footerTpl.iconDTOS[i].linkValue.split("/")
				if(hrefLink[hrefLink.length-1] == this.$Route.query.url){
					this.chooseIndex = i;
					break;
				}
			}
		}
	}
</script>

<style scoped>
	.footerTpl{
		width: 100%;
		height: 98rpx;
		position: fixed;
		bottom: calc(0rpx + constant(safe-area-inset-bottom));
		bottom: calc(0rpx + env(safe-area-inset-bottom));
		left: 0;
		z-index: 99;
		display: flex;
	}
	.navItem{
		width: 25%;
		text-align: center;
		height: 100%;
	}
	.navItem image{
		height: 100%;
	}
</style>
