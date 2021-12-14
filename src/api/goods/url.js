const goosApi = {
	getMerchantAppFrontendCategoryList:"/goods/frontendCategory/getMerchantAppFrontendCategoryList",  //获取分类列表
	brandAll:"/goods/brand/all",	//获取品牌列表
	getGoodsDetail:"/app/goods/getGoodsDetail/",	//获取商品详情
	getGoodsRecommendByGoodsDetail:"/goods/recommend/getGoodsRecommendByGoodsDetail",//商品详情店铺商品
	getGoodsComments:"/goods/skucomment/getGoodsComments/",	//评价
	saveGoodsFavorite:"/goods/favorite/saveGoodsFavorite",	//收藏商品
	findGoodsFavorite:"/goods/favorite/findGoodsFavorite/",	//查看商品是否收藏
	cancelGoodsFavorite:"/goods/favorite/cancelGoodsFavorite/",	//取消收藏该商品
	saveGoodsFootprint:"/goods/footprint/saveGoodsFootprint",	//添加足迹
	findAppSkuCommentById:"/goods/skucomment/findAppSkuCommentById",	//评价详情
	findAppGoodsPraiseById:"/goods/skucomment/findAppGoodsPraiseById/",	//获取订单不同类型的总数
	addGoodsSkuCommentDto:"/goods/skucomment/addGoodsSkuCommentDto",	//添加评论
	addGoodsSkuAppendComment:"/goods/skucomment/addGoodsSkuAppendComment",	//追评
	storeGoodsList:"/goods/item/storeGoodsList",	//店铺商品列表
	newGoodsList:"goods/item/newGoodsList",	//店铺上新
	storeCategory:"/goods/frontendCategory/store/list/",	//获取店铺分类
	getGoodsFavoriteList:"/goods/favorite/getGoodsFavoriteList",	//我的收藏
	getGoodsFootprintList:"/goods/footprint/getGoodsFootprintList",	//我的足迹
	findCartGoods:"/goods/item/findCartGoods/",	//购物车查询sku
	bindGoodsList:"/goods/item/bindGoodsList",	//搜索店铺商品
	findAppSkuCommentImagesById:'/goods/skucomment/findAppSkuCommentImagesById', //根据图片查询评论上下
	cusGoodsDetails:"/goods/custom/item/detail",	//获取商品详情
}
export default goosApi;
