<template>
	<view class="page">
		<scroll-view class="homeMainBox" scroll-y="true" >
			<view v-if="homeMainData.componentVos" v-for="item,index in homeMainData.componentVos" :key='item.id' >
				<musterRenovation :compData='item'></musterRenovation>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import decorateApi from '@/api/decorate/index.js';
	import musterRenovation from '@/renovation/musterRenovation/index.vue';
	export default{
		data(){
			return{
				homeMainData:{},	//店铺首页装修数据
			}
		},
		mounted() {
			this.storeList()
		},
		methods:{
			storeList(){	//店铺首页装修数据
				decorateApi.storeList({issuingSide:2,location:"h5",storeId:this.$Route.query.storeId}).then(res=>{
					if(res.data.code==200){
						if(res.data.data.componentVos){
							for(let i=0;i<res.data.data.componentVos.length;i++){
								res.data.data.componentVos[i].content = JSON.parse(res.data.data.componentVos[i].content);
								if(res.data.data.componentVos[i].type=="twoColumnGoods" && res.data.data.componentVos[i].content.componentPageVO.componentVoList){
									for(let j=0;j<res.data.data.componentVos[i].content.componentPageVO.componentVoList.length;j++){
										res.data.data.componentVos[i].content.componentPageVO.componentVoList[j].unpromotionMinPrice = res.data.data.componentVos[i].content.componentPageVO.componentVoList[j].marketPrice
										res.data.data.componentVos[i].content.componentPageVO.componentVoList[j].minPrice = res.data.data.componentVos[i].content.componentPageVO.componentVoList[j].sellingPrice
									}
								}
							}
						}
						this.homeMainData = res.data.data;
						if(!res.data.data.componentVos || !res.data.data.componentVos.length){
							this.$emit("goToGoods")
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		components:{
			musterRenovation
		}
	}
</script>

<style scoped>
	.homeMainBox{
		width: 100%;
		height: calc(100vh - 316rpx);
	}
</style>
