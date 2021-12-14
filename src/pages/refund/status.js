export default{
	refundStatus(status){
		switch(status){
			case 1:
			return "申请退款";
			case 2:
			return "申请退货";
			case 3:
			return "待寄回商品";
			case 4:
			return "待签收商品";
			case 5:
			return "退款中";
			case 6:
			return "已退款";
			case 7:
			return "退款已拒绝";
			case 8:
			return "退货已拒绝";
			case 9:
			return "已关闭";
			case 10:
			return "平台已拒绝";
		}
	}
}