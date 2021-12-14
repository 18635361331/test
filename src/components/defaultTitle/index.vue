<template>
	<!-- #ifndef MP-WEIXIN -->
	<view class="collectTitle" :class="dto.color?('collectTitle-'+dto.color):''" :style="dto.bottomColor?'border-bottom: 1px solid'+dto.bottomColor:''">
		<view class="goBackBtn" :style="dto.bg?'background-image:url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/'+dto.bg+')':''" @click="goBack(1)"></view>
		<view class="title" v-if="dto.title">{{dto.title}}</view>
		<slot></slot>
	</view>
	<!-- #endif  -->
</template>

<script>
	export default{
		props:["dto"],
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
	.collectTitle.collectTitle-white{
		color: #fff;
		background: transparent;
	}
	.collectTitle.collectTitle-black{
		color: black;
		background: transparent;
	}
	.collectTitle.collectTitle-red{
		color: #fff;
		background: #FF1457;
	}
	.collectTitle-red .goBackBtn{
		display: none;
	}
	
	
		
	
</style>
