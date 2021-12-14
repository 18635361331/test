const orderState = {
	getOrderState(state) {
		/**获取订单状态*/
		switch (state) {
			case 10:
				return "待支付";
			case 15:
				return "拼团中";
			case 20:
				return "待发货";
			case 30:
				return "待收货";
			case 40:
				return "已收货";
			case 50:
				return "已完成";
			case 60:
				return "已关闭";
			case 0:
				return "已取消";
		}
	},
	getRefundState(refundState) {
		switch (refundState) {
			case 1:
				return "退款申请中";
			case 2:
				return "退货申请中";
			case 3:
				return "待用户寄回";
			case 4:
				return "待商家签收";
			case 6:
				return "退款成功";
			case 7:
				return "退款已拒绝";
			case 8:
				return "退货已拒绝";
			case 9:
				return "退款关闭";
			case 10:
				return "平台已拒绝";
		}
	},
	getSellerState(sellerState){
		switch (sellerState) {
			case 0:
				return "交易关闭";
			case 10:
				return "等待买家付款";
			case 15:
				return "等待卖家发货";
			case 20:
				return "等待卖家发货";
			case 30:
				return "卖家已发货";
			case 40:
				return "已收货";
			case 50:
				return "交易完成";
			case 60:
				return "交易关闭";
			case 70:
				return "交易完成";
		}
	},
	getCustomizationOrderState(state) {
		/**获取订单状态*/
		switch (state) {
			case 10:
				return "待确认";
			case 20:
				return "待付款";
			case 30:
				return "生产中";
			case 40:
				return "待收货";
			case 50:
				return "已收货";
			case 60:
				return "已完成";
			case 70:
				return "已关闭";
			case 80:
				return "待评价";
			case 0:
				return "已取消";
		}
	},
}
export default orderState