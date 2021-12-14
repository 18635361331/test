export default{
	methods:{
		renovationGoTo(params){
			switch(params.linkType){
				case 0:	//站内跳转
					if(params.linkValue=="/pages/category/index" || params.linkValue=="/pages/index/index" || params.linkValue=="/pages/my/index" || params.linkValue=="/pages/cart/index"){
						uni.switchTab({
							url:params.linkValue
						})
					}else{
						let pageQuery = params.linkValue.split("?")[1];
						let queryObjectArray = pageQuery?pageQuery.split("&"):[]
						let object = {}
						for(let i=0; i < queryObjectArray.length; i++){
							object[queryObjectArray[i].split("=")[0]] = queryObjectArray[i].split("=")[1];
						}
						this.$Router.push({
							path:params.linkValue.split("?")[0],
							query:object
						})
					}
				break;
				case 1:	//url跳转
					if(params.linkValue){
						if(params.linkValue.indexOf(this.$config.localhostUrl)!="-1"){	//站内页面
							let hrefLink = params.linkValue.split("/")
							if(hrefLink[hrefLink.length-2]=="act"){	//装修页面
								this.$Router.push({
									path:"/pages/renovation/index",
									query:{
										url:hrefLink[hrefLink.length-1]
									}
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
				case 2:	//商品
				this.$Router.push({
					path:"/pages/goodsDetails/index",
					query:{
						goodsId:params.linkValue
					}
				})
				break;
				case 3:	//类目
				this.$Router.push({
					path:"/pages/goodsList/index",
					query:{
						frontCategoryId:params.linkValue
					}
				})
				break;
				case 4:	//店铺
				this.$Router.push({
					path:"/pages/shop/index",
					query:{
						storeId:params.linkValue
					}
				})
				break;
				case 5:	//品牌
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