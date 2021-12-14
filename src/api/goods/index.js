import api from './url.js';
import request from '@/utils/request.js'
export default {
	getMerchantAppFrontendCategoryList(params){	//获取分类列表
		return request.post(api.getMerchantAppFrontendCategoryList,params)
	},
	brandAll(){	//获取品牌列表
		return request.post(api.brandAll)
	},	
	getGoodsDetail(id){	//获取商品详情
		return request.post(api.getGoodsDetail+id)
	},
	getGoodsRecommendByGoodsDetail(parmas){	//商品详情店铺商品
		return request.post(api.getGoodsRecommendByGoodsDetail,parmas)
	},
	getGoodsComments(id){	//评价
		return request.post(api.getGoodsComments+id)
	},
	saveGoodsFavorite(params){	//收藏商品
		return request.post(api.saveGoodsFavorite,[params])
	},
	findGoodsFavorite(id){	//查看商品是否收藏
		return request.post(api.findGoodsFavorite+id)
	},
	cancelGoodsFavorite(id){	//取消收藏改商品
		return request.post(api.cancelGoodsFavorite+id)
	},
	saveGoodsFootprint(params){	//添加足迹
		return request.post(api.saveGoodsFootprint,params)
	},
	findAppSkuCommentById(params){	//评价详情
		return request.post(api.findAppSkuCommentById,params)
	},
	findAppGoodsPraiseById(id){	//获取订单不同类型的总个数
		return request.post(api.findAppGoodsPraiseById+id,{})
	},
	addGoodsSkuAppendComment(params){	//追评
		return request.post(api.addGoodsSkuAppendComment,params)
	},
	addGoodsSkuCommentDto(params){	//添加评论
		return request.post(api.addGoodsSkuCommentDto,params)
	},
	storeGoodsList(params){	//店铺商品列表
		return request.post(api.storeGoodsList,params)
	},
	newGoodsList(params){	//店铺上新
		return request.post(api.newGoodsList,params)
	},
	storeCategory(storeId){	//获取店铺分类
		return request.post(api.storeCategory+storeId,{})
	},
	getGoodsFavoriteList(params){	//我的收藏
		return request.post(api.getGoodsFavoriteList,params)
	},
	getGoodsFootprintList(params){	//我的足迹
		return request.post(api.getGoodsFootprintList,params)
	},
	findCartGoods(itemId){	//购物车查询sku
		return request.post(api.findCartGoods+itemId,{})
	},
	bindGoodsList(params){	//搜索店铺商品
		return request.post(api.bindGoodsList,params)
	},
	findAppSkuCommentImagesById(params){
		return request.post(api.findAppSkuCommentImagesById,params)
	},
	cusGoodsDetails(itemId){	//获取商品详情
		return request.post(api.cusGoodsDetails,{itemId})
	}
}