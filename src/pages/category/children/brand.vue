<template>
	<view class="brandBox">
		<view class="brandTitle">{{chooseItem=='special'?'#':chooseItem}}</view>
		<scroll-view class="brandList" :scroll-top='scroll.now' @scroll="scrollEvent" scroll-y="true">
			<view v-if="brandFlag">
				<view v-for="(item,key) in brandList" :key='key'>
					<view class="brandTitle viewTitle"  :id="key=='#'?'special':key" v-if="key!=Object.keys(brandList)[0]">{{key}}</view>
					<view class="everyBrand" :id="key=='#'?'special':key" v-for="(list,i) in brandList[key]" :key='list.id' @click='goGoodsList(list)'>
						<image :src="imgBaseUrls+list.brandImage" ></image>
						<text>{{list.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="navigation">
			<view class="every" :class="chooseItem==(key=='#'?'special':key)?'active':''" @click="getViewScrollTop(key)" v-for="(item,key,index) in brandList" :key='index'>
				{{key}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["brandList"],
		data(){
			return{
				imgBaseUrls: "",
				brandFlag:false,	//展示品牌
				chooseItem:"A",	//展示当前在那个品牌
				scroll:{
					old:0,
					now:0
				},
				titleHeight:0,	//头部的距离
			}
		},
		computed:{
		    
		},
		mounted () {
			// this.zhuge.track("品牌")
			let view = uni.createSelectorQuery().in(this).select('.brandList');
			view.boundingClientRect(data=>{
				this.titleHeight = data.top - 25
			}).exec();
			this.imgBaseUrls = this.$config.imgBaseUrl;
			setTimeout(()=>{
				this.brandFlag = true
			},100)
			this.chooseItem = Object.keys(this.brandList)[0]
		},
		methods:{
			goGoodsList(item){
				this.$Router.push({
					path:"/pages/goodsList/index",
					query:{
						brandId:item.id,
						searchValue:item.name
					}
				})
			},
			scrollEvent(e){
				this.scroll.old = e.detail.scrollTop
				let index = 0;
				for(let i in this.brandList){
					let view = uni.createSelectorQuery().in(this).select('#' + (i=='#'?'special':i));
					view.boundingClientRect(data=>{
						if(data.top+e.detail.scrollTop<=e.detail.scrollTop + this.titleHeight){
							this.$nextTick(()=>{
								this.chooseItem = i
							})
						}
					}).exec();
				}
			},
			getViewScrollTop(element){	//获取该元素的位置信息
				let view = uni.createSelectorQuery().in(this).select('#' + (element=='#'?'special':element));
				view.boundingClientRect(data=>{
					this.scroll.now = this.scroll.old;
					this.$nextTick(()=>{
						this.scroll.now = data.top + this.scroll.old - this.titleHeight +10
					})
				}).exec();
			}
		}
	}
</script>

<style>
	.brandBox{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.navigation{
		position: absolute;
		right: 0;
		bottom: 0;
		width: 32rpx;
		height: calc(100% - 26px);
		display: flex;
		justify-content: center;
		z-index: 1;
		flex-direction: column;
	}
	.navigation .every{
		width: 32rpx;
		height: 32rpx;
		font-size: 24rpx;
		line-height: 32rpx;
		text-align: center;
		position: relative;
		font-weight: 600;
		border-radius: 50%;
	}
	.navigation .every.active{
		background: #ff1558;
		color: #fff;
	}
	.brandList{
		width: 100%;
		height: calc(100% - 50rpx);
		position: relative;
	}
	.brandTitle{
		width: 100%;
		height:25px;
		line-height:25px;
		padding-left: 40rpx;
		font-weight: 600;
		font-size: 26rpx;
		color: #333;
		border-bottom: 1px solid #E6E6E6;
	}
	.viewTitle{
		border-top: 1px solid #E6E6E6;
	}
	.brandList.brandTitle{
		border-top: 1px solid #e6e6e6;
	}
	.everyBrand{
		width: 100%;
		display: flex;
		/* height: 160rpx; */
		padding: 30rpx 0 0 40rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
	}
	.everyBrand image{
		width: 120rpx;
		height: 120rpx;
		margin-right: 40rpx;
		border-radius: 4px;
		border: 1px solid #e4e4e4;
	}
	.everyBrand text{
		font-size: 26rpx;
		color: #000;
		line-height: 120rpx;
	}
</style>
