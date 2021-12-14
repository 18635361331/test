import Vue from 'vue'
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
	encodeURI:false,
	detectBeforeLock: ()=>{ router.$lockStatus=false; }, // 配置解锁[重要]
	routes: ROUTES //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if(to.meta && to.meta.requireAuth){
		if(uni.getStorageSync("sessionId")){
			next()
		}else{
			next("/pages/login/index")
		}
	}else{
		next()
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;
