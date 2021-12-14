<template>
<!-- 电梯组件 -->
	<view class="page">
		<view v-if="isFixedTitle" class="elevatorScroll">
			<scroll-view scroll-x="true" :style="{background:elevatorContainer.backgroundColor}" class="elevatorScrollTop">
				<view class="elevatorContainer">
					<view class="everyRowElevator" v-for="item,index in elevatorContainer.tabDTOS" :key='index' @click="goToPage(item.componentId)" :style="{color:chooseItemId==item.componentId?elevatorContainer.selectedTabColor:elevatorContainer.defaultTabColor,'borderColor':chooseItemId==item.componentId?elevatorContainer.selectedTabColor:'rgba(0,0,0,0)'}">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="elevatorScroll" v-if="!isFixedTitle">
			<scroll-view scroll-x="true" :style="{background:elevatorContainer.backgroundColor}">
				<view class="elevatorContainer">
					<view class="everyRowElevator" v-for="item,index in elevatorContainer.tabDTOS"  @click="goToPage(item.componentId)" :key='index' :style="{color:chooseItemId==item.componentId?elevatorContainer.selectedTabColor:elevatorContainer.defaultTabColor,'borderColor':chooseItemId==item.componentId?elevatorContainer.selectedTabColor:'rgba(0,0,0,0)'}">
						{{item.name}}
						
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['elevatorContainer','scrollNum','chooseItemId'],
		data(){
			return{
				isFixedTitle:false,	//是否定位在头部
				titleHeight:""
			}
		},
		methods:{
			goToPage(type){
				this.$emit("goToPage",type,this.titleHeight)
			}
		},
		watch:{
			scrollNum(){
				let view = uni.createSelectorQuery().in(this).select('.elevatorScroll');
				view.boundingClientRect(data=>{
					if(this.scrollNum>=data.top+this.scrollNum){
						this.isFixedTitle = true
					}else{
						this.isFixedTitle = false
					}
					this.$nextTick(()=>{
						for(let i=0;i<this.elevatorContainer.tabDTOS.length;i++){
							this.$emit("getEveryElem",this.elevatorContainer.tabDTOS[i].componentId,this.titleHeight,this.elevatorContainer.tabDTOS.length-1==i)
						}
					})
				}).exec();
			}
		},
		mounted() {
			let view = uni.createSelectorQuery().in(this).select('.elevatorScroll');
			view.boundingClientRect(data=>{
				this.titleHeight = data.height
			}).exec();
			this.$emit("getChooseItem",this.elevatorContainer.tabDTOS[0].componentId)
		} 
	}
</script>

<style scoped>
	.elevatorScroll{
		width: 100%;
		height: 88rpx;
	}
	.elevatorScrollTop{
		top: 0;
		position: fixed;
		/* #ifndef MP-WEIXIN */
		top: 88rpx;
		/* #endif */
		width: 100%;
		height: 88rpx;
		left: 0;
		z-index: 1;
	}
	.elevatorContainer{
		display: flex;
		flex-wrap: nowrap;
		padding: 0 24rpx;
	}
	.everyRowElevator{
		margin-right: 62rpx;
		white-space: nowrap;
		height: 88rpx;
		line-height: 88rpx;
		word-wrap: normal;
		border-bottom: 4rpx solid #FFFFFF;
	}
	
	.aaaaa{
		position: fixed;
		bottom: 100rpx;
		right: 0;
	}
</style>
