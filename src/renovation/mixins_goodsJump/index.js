export default {
	data(){
		return{
			imgBaseUrls:this.$config.imgBaseUrl
		}
	},
	methods:{
		goToGoodsDetails(item){
			if(item.customizeFlag){
				this.$Router.push({
					path:'/pages/goodsCustomized/index',
					query:{
						goodsId:item.id?item.id:item.itemId
					}
				})
			}else{
				this.$Router.push({
					path:'/pages/goodsDetails/index',
					query:{
						goodsId:item.id?item.id:item.itemId
					}
				})
			}
		}
	}
}