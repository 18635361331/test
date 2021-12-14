<template>
	<view class="page renovation" :class="isPaddingBtm?'active':''">
		<!-- 视频 -->
		<view v-for="item,index in compData" :key='index'>
			<view class="biserialGoods" :class="'type'+item.id" :style="{backgroundColor:item.content.backgroundColor}" v-if="item.type == 'twoColumnGoods' && updateGoodsFlag">
				<!-- 双列商品 -->
				<biserialGoods  :goodsList='item.content.componentPageVO.componentVoList'></biserialGoods>
			</view>
			<!-- 双列图片 -->
			<view :class="'type'+item.id" v-if="item.type == 'oneRowTwoImg'">
				<biserialImg :biserialImg='item.content'></biserialImg>
			</view>
			<!-- 图标导航 -->
			<view :class="'type'+item.id" v-if="item.type == 'iconNav'">
				<iconNav :iconNav='item.content'></iconNav>
			</view>
			<!-- 左一右二图片 -->
			<view :class="'type'+item.id" v-if="item.type == 'oneBigTwoLittle'">
				<leftOneRightTwo :leftOneRightTwo='item.content'></leftOneRightTwo>
			</view>
			<!-- 多行文本框 -->
			<view :class="'type'+item.id" v-if="item.type == 'multiTextTpl'">
				<multiLine :multiLine='item.content'></multiLine>
			</view>
			<!-- 单列商品 -->
			<view class="singleGoods" :class="'type'+item.id" :style="{backgroundColor:item.content.backgroundColor}" v-if="item.type == 'oneColumnGoods' && updateGoodsFlag">
				<singleGoods :goodsList='item.content.componentPageVO.componentVoList'></singleGoods>
			</view>
			<!-- 咨询头条 -->
			<view :class="'type'+item.id" v-if="item.type == 'headLine'">
				<infoLines :headLine='item.content'></infoLines>
			</view>
			<!-- 单列图片 -->
			<view :class="'type'+item.id" v-if="item.type == 'singleImg'">
				<singleImg :singleImg='item.content'></singleImg>
			</view>
			<!-- 横向滑动商品 -->
			<view class="slidingGoods" :class="'type'+item.id" :style="{backgroundColor:item.content.backgroundColor}" v-if="item.type == 'slidingGoods' && updateGoodsFlag">
				<slideGoods :information='item'></slideGoods>
			</view>
			<!-- 横向滑动图片 -->
			<view :class="'type'+item.id" v-if="item.type == 'rowScrollImg'">
				<slideImg :slideImg='item.content'></slideImg>
			</view>
			<!-- 水平间距 -->
			<view :class="'type'+item.id" v-if="item.type == 'styleSet' ">
				<spacing :styleSet='item.content'></spacing>
			</view>
			<!-- 轮播图 -->
			<view :class="'type'+item.id" v-if="item.type == 'carousel'">
				<swiperImg :swiperImg='item.content' @swiperChange='swiperChange'></swiperImg>
			</view>
			<!-- 三列商品 -->
			<view class="threeRowsGoods" :class="'type'+item.id" :style="{backgroundColor:item.content.backgroundColor}" v-if="item.type == 'threeColumnGoods' && updateGoodsFlag">
				<threeRowsGoods :goodsList='item.content.componentPageVO.componentVoList'></threeRowsGoods>
			</view>
			<!-- 三列图片 -->
			<view :class="'type'+item.id">
				<threeRowsImg v-if="item.type == 'oneRowThreeImg'" :threeRowsImg='item.content'></threeRowsImg>
			</view>
			<!-- 单行文本框 -->
			<view :class="'type'+item.id">
				<onelineText v-if="item.type == 'textTpl'" :onelineText='item.content'></onelineText>
			</view>
			<!-- 单列优惠券 -->
			<view :class="'type'+item.id">
				<singleCoupon v-if="item.type=='oneColumnCoupon'" :oneColumnCoupon='item.content'></singleCoupon>
			</view>
			<!-- 双列优惠券 -->
			<view :class="'type'+item.id">
				<biserialCoupon v-if="item.type=='twoColumnCoupon'" :oneColumnCoupon='item.content'></biserialCoupon>
			</view>
			<!-- 三列优惠券 -->
			<view :class="'type'+item.id">
				<threeColumnCoupon v-if="item.type=='threeColumnCoupon'" :oneColumnCoupon='item.content'></threeColumnCoupon>
			</view>
			<!-- 横向滑动优惠券 -->
			<view :class="'type'+item.id">
				<slideCoupon v-if="item.type=='slidingCoupon'" :oneColumnCoupon='item.content'></slideCoupon>
			</view>
			<!-- 电梯容器 -->
			<elevatorContainer ref='scrollView' v-if="item.type=='lift'" :elevatorContainer='item.content' :chooseItemId='chooseItemId' :scrollNum='scrollNum' @goToPage='goToPage' @getEveryElem="getEveryElem" @getChooseItem='getChooseItem'></elevatorContainer>
			<!-- 弹窗组件 -->
			<popup v-if="item.type=='popup'" :class="'type'+item.id" :popup='item.content'></popup>
			<!-- 搜索组件 -->
			<view :class="'type'+item.id">
				<headerSearch v-if="item.type=='headerSearch'" :headerSearch='item.content'></headerSearch>
			</view>
			<!-- 返回顶部 -->
			<view>
				<backTop :scrollNum='scrollNum' :backToTop='item.content'></backTop>
			</view>
			<!-- 导航标签 -->
			<view>
				<footerTpl v-if="item.type=='footerTpl'" :footerTpl='item.content'></footerTpl>
			</view>
			<!-- 头部导航 -->
			<view>
				<titleNav v-if="item.type=='titleNav'" :scrollNum='scrollNum' :titleNav='item.content'></titleNav>
			</view>
			<!-- 新人专享 -->
			<view>
				<newUser ref='newUser' v-if="item.type=='newUser'"></newUser>
			</view>
			<!-- 会员精选 -->
			<view>
				<memberCulling v-if="item.type=='memberCulling'" :memberCulling='item.content'></memberCulling>
			</view>
			<!-- 活动拼图 -->
			<view>
				<activityJigsaw  v-if="item.type=='activityJigsaw'" :activityJigsaw='item.content'></activityJigsaw>
			</view>
			<!-- 精品推荐 -->
			<view>
				<boutique v-if="item.type=='boutique'" :boutique='item.content'></boutique>
			</view>
			<!-- 秒杀活动 -->
			<view v-if="item.type=='seckillActivity'">
				<seckillActivity ref='seckillActivitys'></seckillActivity>
			</view>
			<!-- 视频控件 -->
			<videoMap v-if="item.type=='shortVideo'" :shortVideo='item.content'></videoMap>
			<slideVideo v-if="item.type=='slideVideo'" :slideVideo='item.content'></slideVideo>
		</view>
		
	</view>
</template>

<script>
	import biserialGoods from '@/renovation/biserialGoods/index.vue'
	import biserialImg from '@/renovation/biserialImg/index.vue'
	import iconNav from '@/renovation/iconNav/index.vue'
	import infoLines from '@/renovation/infoLines/index.vue'
	import leftOneRightTwo from '@/renovation/leftOneRightTwo/index.vue'
	import multiLine from '@/renovation/multiLine/index.vue'
	import singleGoods from '@/renovation/singleGoods/index.vue'
	import singleImg from '@/renovation/singleImg/index.vue'
	import singleLine from '@/renovation/singleLine/index.vue'
	import slideGoods from '@/renovation/slideGoods/index.vue'
	import slideImg from '@/renovation/slideImg/index.vue'
	import spacing from '@/renovation/spacing/index.vue'
	import swiperImg from '@/renovation/swiperImg/index.vue'
	import threeRowsGoods from '@/renovation/threeRowsGoods/index.vue'
	import threeRowsImg from '@/renovation/threeRowsImg/index.vue'
	import onelineText from '@/renovation/onelineText/index.vue'
	import singleCoupon from '@/renovation/singleCoupon/index.vue'
	import biserialCoupon from '@/renovation/biserialCoupon/index.vue'
	import threeColumnCoupon from '@/renovation/threeColumnCoupon/index.vue'
	import slideCoupon from '@/renovation/slideCoupon/index.vue'
	import elevatorContainer from '@/renovation/elevatorContainer/index.vue'
	import popup from '@/renovation/popup/index.vue'
	import headerSearch from '@/renovation/searchTemplate/index.vue'
	import backTop from '@/renovation/backTop/index.vue'
	import footerTpl from '@/renovation/footerTpl/index.vue'
	import slideVideo from '@/renovation/slideVideo/index.vue'
	import videoMap from '@/renovation/videoMap/index.vue'
	// 新首页
	import newUser from '@/standardHome/newUser/index.vue'
	import boutique from '@/standardHome/homeBtmTab/index.vue'
	import memberCulling from '@/standardHome/container/index.vue'
	import activityJigsaw from '@/standardHome/activityNav/index.vue'
	import titleNav from '@/standardHome/homeTitleTab/index.vue'
	import seckillActivity from '@/standardHome/seckillActivity/index.vue'
	
	
	
	export default {
		props:["compData",'scrollNum'],
		data() {
			return {
				chooseItemId:"",	//电梯组件选中id
				preliminaryId:"",	//预选中id  当循环完成后
				isPaddingBtm:false,
				updateGoodsFlag:true	//更新商品开关
			}
		},
		methods:{
			goToPage(typeId,titleHeight){
				let view = uni.createSelectorQuery().in(this).select('.type'+typeId);
				this.chooseItemId = typeId;
				this.preliminaryId = typeId
				view.boundingClientRect(data=>{
					uni.pageScrollTo({
						duration: 0,
						scrollTop: data.top + this.scrollNum - titleHeight -1
					})
				}).exec();
			},
			getEveryElem(typeId,titleHeight,flag){
				let viewTab = uni.createSelectorQuery().in(this).select('.type' + typeId);
				viewTab.boundingClientRect(data=>{
					if(data.top+this.scrollNum<=this.scrollNum + titleHeight + 1){
						this.preliminaryId = typeId;
					}
				}).exec();
				if(flag && this.preliminaryId){
					this.$nextTick(()=>{
						this.chooseItemId = this.preliminaryId
					})
				}
			},
			getChooseItem(typeId){
				this.chooseItemId = typeId
			},
			swiperChange(index,imageH){
				try{
					this.$emit("swiperChange",index,imageH)
				}catch(e){
					
				}
			},
			updateNewuser(){	//更新新人专享组件
				if(this.$refs.newUser){
					for(let i=0;i<this.$refs.newUser.length;i++){
						this.$refs.newUser[i].newPersonInfo();
					}
				}
			},
			updateActivitys(){	//更新秒杀模块
				if(this.$refs.seckillActivitys){
					for(let i=0;i<this.$refs.seckillActivitys.length;i++){
						this.$refs.seckillActivitys[i].nonDesignatedMarketing();
					}
				}
			},
			updateGoods(){	//更新商品数据
				this.updateGoodsFlag = false;
				this.$nextTick(()=>{
					this.updateGoodsFlag = true
				})
			},
			clearInters(){	//下拉更新组件  首页  当其它需要更新组件时  调用方法  用于更新某些不是传递数据的组件
				if(this.$refs.seckillActivitys){
					for(let i=0;i<this.$refs.seckillActivitys.length;i++){
						this.$refs.seckillActivitys[i].clearInters();
					}
				}
			},
		},
		mounted() {
			let len = this.compData?this.compData.length:0
			for(let i = 0;i<len;i++){
				if(this.compData[i].type=="footerTpl"){
					this.isPaddingBtm = true;
					break;
				}
			}
		},
		components:{
			biserialGoods,
			biserialImg,
			iconNav,
			infoLines,
			leftOneRightTwo,
			multiLine,
			singleGoods,
			singleImg,
			singleLine,
			slideGoods,
			slideImg,
			spacing,
			swiperImg,
			threeRowsGoods,
			threeRowsImg,
			onelineText,
			singleCoupon,
			biserialCoupon,
			threeColumnCoupon,
			slideCoupon,
			elevatorContainer,
			popup,
			backTop,
			headerSearch,
			footerTpl,
			newUser,
			boutique,
			activityJigsaw,
			memberCulling,
			titleNav,
			seckillActivity,
			videoMap,
			slideVideo
		}
	}
</script>

<style scoped>
	.renovation{
		background-color: #F5F5F5;
	}
	.page.active{
		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}
	.biserialGoods{
		background:#F5F5F5;
	}
	.leftOneRightTwo{
		padding: 0 20rpx;
	}
	.threeRowsGoods{
		padding: 10rpx 24rpx 10rpx 24rpx;
		background:#F5F5F5;
	}
	.slidingGoods{
		padding: 8rpx 0rpx;
	}
	
</style>
