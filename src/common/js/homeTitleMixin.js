export default{
	methods:{
		renovationGoTo(params){
			let type = Number(params.linkType)
			switch(type){
				case 1:	//url跳转
					if(params.linkValue){
						if(params.linkValue.indexOf(this.$config.localhostUrl)!="-1"){	//站内页面
							let hrefLink = params.linkValue.split("/")
							if(hrefLink[hrefLink.length-2]=="act"){	//装修页面
								//更改首页渲染内容  选中tab  装修参数
								this.$emit("setWebView",params.title,hrefLink[hrefLink.length-1])
							}
						}else if(params.linkValue.indexOf("http")=="-1"){
							if(params.linkValue=="/pages/category/index" || params.linkValue=="/pages/index/index" || params.linkValue=="/pages/my/index" || params.linkValue=="/pages/cart/index"){
								uni.switchTab({
									url:params.linkValue
								})
							}else{
								this.$Router.push({
									path:params.linkValue
								})
							}
						}else{
							this.$Router.push({
								path:"/pages/webView/index",
								query:{
									url:params.linkValue
								}
							})
						}
					}
				break;
				
				case 3:	//店铺
					this.$Router.push({
						path:"/pages/shop/index",
						query:{
							storeId:params.linkValue
						}
					})
				break;
				case 4:	//商品
					this.$Router.push({
						path:"/pages/goodsDetails/index",
						query:{
							goodsId:params.linkValue
						}
					})
				break;
				case 5:	//类目
					this.$Router.push({
						path:"/pages/goodsList/index",
						query:{
							frontCategoryId:params.linkValue
						}
					})
				break;
				case 6:	//品牌
					this.$Router.push({
						path:"/pages/goodsList/index",
						query:{
							brandId:params.linkValue
						}
					})
				break;
			}
		}
	}
}