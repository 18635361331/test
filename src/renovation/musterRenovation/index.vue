<template>
	<!-- 店铺首页装修 -->
	<view class="page">
		<!-- 双列商品 -->
		<view class="biserialGoods">
			<biserialGoods v-if="compData.type == 'twoColumnGoods'" :goodsList='compData.content.componentPageVO.componentVoList'></biserialGoods>
		</view>
		<!-- 双列图片 -->
		<biserialImg v-if="compData.type == 'oneRowTwoImg'" :biserialImg='compData.content'></biserialImg>
		<!-- 单列图片 -->
		<singleImg v-if="compData.type == 'singleImg'" :singleImg='compData.content'></singleImg>
		<!-- 横向滑动商品 -->
		<slideGoods v-if="compData.type == 'slidingGoods'" :information='compData'></slideGoods>
		<!-- 横向滑动图片 -->
		<slideImg v-if="compData.type == 'rowScrollImg'" :slideImg='compData.content'></slideImg>
		<!-- 水平间距 -->
		<spacing v-if="compData.type == 'styleSet'" :styleSet='compData.content'></spacing>
		<!-- 轮播图 -->
		<swiperImg v-if="compData.type == 'carousel'" :swiperImg='compData.content'></swiperImg>
		<!-- 三列图片 -->
		<threeRowsImg v-if="compData.type == 'oneRowThreeImg'" :threeRowsImg='compData.content'></threeRowsImg>
		<!-- 左一右二 -->
		<leftOneRightTwo v-if="compData.type == 'oneBigTwoLittle'" :leftOneRightTwo='compData.content'></leftOneRightTwo>
		<!-- 单列优惠券 -->
		<singleCoupon v-if="compData.type=='oneColumnCoupon'" :oneColumnCoupon='compData.content'></singleCoupon>
		<!-- 双列优惠券 -->
		<biserialCoupon v-if="compData.type=='twoColumnCoupon'" :oneColumnCoupon='compData.content'></biserialCoupon>
		<!-- 三列优惠券 -->
		<threeColumnCoupon v-if="compData.type=='threeColumnCoupon'" :oneColumnCoupon='compData.content'></threeColumnCoupon>
	</view>
</template>

<script>
	import singleImg from "@/renovation/singleImg/index.vue";
	import biserialGoods from "@/renovation/biserialGoods/index.vue";
	import biserialImg from "@/renovation/biserialImg/index.vue";
	import leftOneRightTwo from "@/renovation/leftOneRightTwo/index.vue";
	import multiLine from "@/renovation/multiLine/index.vue";
	import slideGoods from "@/renovation/slideGoods/index.vue";
	import slideImg from "@/renovation/slideImg/index.vue";
	import spacing from "@/renovation/spacing/index.vue";
	import swiperImg from "@/renovation/swiperImg/index.vue";
	import threeRowsImg from "@/renovation/threeRowsImg/index.vue";
	import singleCoupon from '@/renovation/singleCoupon/index.vue';
	import biserialCoupon from '@/renovation/biserialCoupon/index.vue'
	import threeColumnCoupon from '@/renovation/threeColumnCoupon/index.vue'
	export default {
		props:['compData'],
		data() {
			return {

			}
		},
		components: {
			biserialGoods,
			biserialImg,
			leftOneRightTwo,
			multiLine,
			singleImg,
			slideGoods,
			slideImg,
			spacing,
			swiperImg,
			threeRowsImg,
			singleCoupon,
			biserialCoupon,
			threeColumnCoupon
		}
	}
</script>

<style scoped>
	.biserialGoods{
		background:#F5F5F5;
	}
</style>
