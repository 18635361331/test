<template>
	<text class="page">
		<text v-if="order.orderState==0||order.orderState==60" class="status">交易关闭</text>
		<text v-if="order.orderState==10" class="status">待付款</text>
		<text v-if="order.orderState==20 || order.orderState== 15" class="status">待发货</text>
		<text v-if="order.orderState==30" class="status">待收货</text>
		<text v-if="(order.orderState==40 ||order.orderState==50) && !order.commentFlag && order.refundState!=2" class="status">待评价</text>
		<text v-if="order.orderState==40 && order.commentFlag" class="status">已评价 </text>
		<text v-if="order.orderState==50 && (order.commentFlag||order.refundState==2)" class="status">交易完成 </text>
	</text>
</template>

<script>
	export default{
		props:["order"],
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
