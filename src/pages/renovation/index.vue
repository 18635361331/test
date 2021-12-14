<template>
	<view class="page" :class="this.$Route.query.url?'commonPageTitle':''">
		<!-- #ifndef MP-WEIXIN -->
		<view class="collectTitle" v-if="this.$Route.query.url && renovationInfo.componentVos">
			<view class="goBackBtn" @click="goBack(1)"></view>
			<view class="title">
				{{renovationInfo.componentVos[0].content.titleName}}
			</view>
		</view>
		<!-- #endif  -->
		<view  v-if="renovationInfo.componentVos">
			<renovation ref='scrollView' :compData='renovationInfo.componentVos' :scrollNum='scrollNum'></renovation>
		</view>
	</view>
</template>

<script>
	import decorateApi from '@/api/decorate/index.js';
	import renovation from '@/renovation/renovationMain/index.vue'
	export default {
		// isIndexHome  首页模块不展示电梯组件
		props:["url"],
		data() {
			return {
				renovationInfo:{	//装修数据
					
				},
				scrollNum:0,	//滚动条距离
				pageInfo:{
					pageNo:1,
					sortNo:""
				}
			}
		},
		methods:{
			storeList(){	//获取装修列表
				this.pageInfo.pageNo = 1
				uni.showLoading({
					title:"加载中..."
				})
				decorateApi.storeList({location:"h5",url:this.$Route.query.url?this.$Route.query.url:this.url}).then(res=>{
					uni.hideLoading()
					if(res.data.code==200){
						if(res.data.data.componentVos){
							for(let i=0;i<res.data.data.componentVos.length;i++){
								if(res.data.data.componentVos[i].content && res.data.data.componentVos[i].content!="NaN"){
									res.data.data.componentVos[i].content = JSON.parse(res.data.data.componentVos[i].content)
								}
								if(res.data.data.componentVos[i].type=="twoColumnGoods"){
									for(let j=0;j<res.data.data.componentVos[i].content.componentPageVO.componentVoList.length;j++){
										res.data.data.componentVos[i].content.componentPageVO.componentVoList[j].unpromotionMinPrice = res.data.data.componentVos[i].content.componentPageVO.componentVoList[j].marketPrice
										res.data.data.componentVos[i].content.componentPageVO.componentVoList[j].minPrice = res.data.data.componentVos[i].content.componentPageVO.componentVoList[j].sellingPrice
									}
								}
							}
						}
						this.renovationInfo = res.data.data;
						try{
							uni.setNavigationBarTitle({
								title:this.renovationInfo.componentVos[0].content.titleName?this.renovationInfo.componentVos[0].content.titleName:this.renovationInfo.shareSubTitle
							})
							this.zhuge.track("装修页面"+res.data.data.componentVos[0].content.titleName)
						}catch(e){
							
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			decorateList(){	//装修分页
				decorateApi.decorateList({location:"h5",url:this.$Route.query.url?this.$Route.query.url:this.url,...this.pageInfo}).then(res=>{
					if(res.data.code==200){
						if(res.data.data.componentVoList){
							this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].content.componentPageVO.componentVoList = this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].content.componentPageVO.componentVoList.concat(res.data.data.componentVoList)
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			judgeReachBottom(){
				let lastData = this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].content
				this.pageInfo.sortNo = this.renovationInfo.componentVos[this.renovationInfo.componentVos.length-1].sortNo
				if(lastData && lastData.componentPageVO && lastData.componentPageVO.totalPageNum){
					if(this.pageInfo.pageNo<lastData.componentPageVO.totalPageNum){
						this.pageInfo.pageNo++;
						this.decorateList()
					}
				}
			}
		},
		onPageScroll(res) {
			this.scrollNum = res.scrollTop
		},
		onReachBottom(){
			this.judgeReachBottom()
		},
		mounted() {
			this.storeList()
		},
		components:{
			renovation
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
	}
</style>
