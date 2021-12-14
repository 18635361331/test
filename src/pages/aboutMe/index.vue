<template>
	<view class="page commonPageTitle">
		
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		
		<view class="agreementEvery">
			一、正品保障
		</view>
		<view class="agreementEvery">
			平台商品由海内外认证的供应商或品牌商直供货源，保证100%正品。
		</view>
		<view class="agreementEvery">
			二、专属客服
		</view>
		<view class="agreementEvery">
			1 、 您在售前、售后中有任何问题，都可以通过销售服务热线 400 100 8246 联系我们
		</view>
		<view class="agreementEvery">
			2 、 服务邮箱： tmall@vanchco.com
		</view>
		<view class="agreementEvery">
			三、退换货保障
		</view>
		<view class="agreementEvery">
			若您对文器库商城商品感到不满意，可在规定时间内退货，并申请全额退款。
		</view>
		<view class="agreementEvery">
			1 、 您在收到货物后7天（以物流签收时间为准）内，产品未拆封使用，不影响二次销售；（部分商品除外，详情请见各商品细则）
		</view>
		<view class="agreementEvery">
			2 、 由于产品质量问题而产生的退货。
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				defaultTitleDto:{
					title:'关于我们',
					bottomColor:'#E6E6E6'
				}
			}
		},
		onShow() {
			this.zhuge.track("关于我们")
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		padding-top: 30rpx;
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
	.agreementEvery{
		padding: 0 30rpx;
		color: #999999;
		margin-top: 20rpx;
		font-size: 26rpx;
	}
</style>
