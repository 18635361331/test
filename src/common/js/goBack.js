export default{
	methods:{
		goBack(delta){	//针对底部tabBar返回的处理
			let getCurrentPage = getCurrentPages();
			let goBackPage = getCurrentPage.length - delta - 1;
			if(goBackPage>=0){
				if(getCurrentPage[goBackPage].route.indexOf("/my/index")!="-1" || getCurrentPage[goBackPage].route.indexOf("/cart/index")!="-1" || getCurrentPage[goBackPage].route.indexOf("/category/index")!="-1" || getCurrentPage[goBackPage].route.indexOf("/index/index")!="-1"){
					uni.switchTab({
						url:"/"+getCurrentPage[goBackPage].route
					})
				}else{
					this.$Router.back(delta)
				} 
			}else{
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
		}
	}
}