import goodsApi from '@/api/goods/index.js';
export default {
	data(){
		return{
			goodsInfo: {}, //商品信息
			isGetInfo: false, //商品详情是否拿到数据
			isCollectionFlag: false, //该商品是否收藏
			goodsInfoId:"",	//商品id
		}
	},
	methods:{
		saveGoodsFavorite() { //收藏该商品
			if (!uni.getStorageSync("sessionId")) {
				this.$Router.push({
					path: "/pages/login/index"
				})
				return
			}
			goodsApi.saveGoodsFavorite(this.goodsInfoId).then(res => {
				if (res.data.code == 200) {
					this.isCollectionFlag = true
				} else {
					uni.showToast({
						title: res.data.message,
						icon: "none"
					})
				}
			})
		},
		cancelGoodsFavorite() { //取消收藏该商品
			goodsApi.cancelGoodsFavorite(this.goodsInfoId).then(res => {
				if (res.data.code == 200) {
					this.isCollectionFlag = false
				} else {
					uni.showToast({
						title: res.data.message,
						icon: "none"
					})
				}
			})
		},
		findGoodsFavorite() { //查看该商品是否收藏
			goodsApi.findGoodsFavorite(this.goodsInfoId).then(res => {
				if (res.data.code == 200) {
					this.isCollectionFlag = res.data.data;
				} else {
					this.isCollectionFlag = false;
				}
			})
		},
	}
}