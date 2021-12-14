<template>
	<view class="newUser" v-if="newUserInfo" @click="goToNewUser">
		<image :src="imgBaseUrls+newUserInfo.backgroundImage" mode="widthFix"></image>
		<view class="rollBox" :style="'left:'+newUserInfo.tipsLeft+'rpx'">
			<roll v-if="list" :list='list'></roll>
		</view>
		<view class="newUserContent">
			<view class="newUserCouponTitle">
				专享优惠券
			</view>
			<view class="couponBox" @click.stop="">
				<singleCoupon v-if="oneColumnCoupon" :newUserType='true' :oneColumnCoupon='oneColumnCoupon'></singleCoupon>
			</view>
			<view class="newUserGoodsTItle">
				<text class="newsGoods">专享商品</text>
				<text class="moreGoods">更多商品</text>
			</view>
			<scroll-view scroll-x="true"  show-scrollbar="false">
				<view class="slideGoodsBox" @click.stop="">
					<view class="everyGoods" @click="goToGoodsDetails(item)" v-for="item,index in newUserInfo.itemList" :key='index'>
						<view class="goodsImage">
							<image :src="imgBaseUrls+item.imgUrl"></image>
						</view>
						<view class="newUserPrice">
							<text>¥</text>{{item.sellingPirce}}</view>
						<view class="scribingPrice">¥{{item.marketPrice}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import singleCoupon from '@/renovation/singleCoupon/index.vue'
	import roll from '@/common/model/roll/index.vue'
	import appApi from '@/api/app/index.js' 
	import decorateApi from '@/api/decorate/index.js';
	import goodsJump from '@/renovation/mixins_goodsJump/index.js'
	export default {
		mixins:[goodsJump],
		data(){
			return{
				list:[],
				newUserInfo:"",
				imgBaseUrls:"",
				oneColumnCoupon:""
			}
		},
		methods:{
			newPersonOrderTips(){	//新人专享下单提示信息
				appApi.newPersonOrderTips().then(res=>{
					if(res.data.code == 200){
						this.list = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			newPersonInfo(){	//新人专享活动信息
				appApi.newPersonInfo().then(res=>{
					if(res.data.code == 200){
						this.newUserInfo = res.data.data;
						this.getCouponInfo()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getCouponInfo(){	//获取装修中的优惠券
				decorateApi.storeList({location:"h5",url:"xinrenzhuanxiang"}).then(res=>{
					if(res.data.code==200){
						for(let i=0;i<res.data.data.componentVos.length;i++){
							if(res.data.data.componentVos[i].type=="oneColumnCoupon"){
								res.data.data.componentVos[i].content = JSON.parse(res.data.data.componentVos[i].content)
								this.oneColumnCoupon = res.data.data.componentVos[i].content
							}
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToNewUser(){
				this.zhuge.track("首页-新版-新人专享入口")
				this.$Router.push({path:'/pages/newUser/index'})
			}
		},
		mounted() {
			this.newPersonOrderTips()
			this.newPersonInfo()
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		components:{
			roll,
			singleCoupon
		}
	}
</script>

<style scoped>
	.newUser{
		width: 100%;
		position: relative;
	}
	.newUser image{
		display: block;
	}
	.rollBox{
		width: 320rpx;
		height: 60rpx;
		position: absolute;
		left: 0;
		top: 10rpx;
	}
	
	.newUserContent{
		width: 690rpx;
		height: 646rpx;
		background-color: #FFFFFF;
		border-radius: 14rpx;
		position: absolute;
		overflow: hidden;
		left: 30rpx;
		top: 154rpx;
	}
	.newUserCouponTitle{
		width: 100%;
		height: 56rpx;
		line-height: 56rpx;
		color: #333333;
		margin:  14rpx 20rpx 16rpx 20rpx;
	}
	.couponBox{
		width: 100vw;
		margin-left: -31rpx;
	}
	.newUserGoodsTItle{
		width: calc(100% - 60rpx);
		height: 56rpx;
		line-height: 56rpx;
		color: #333333;
		margin: 20rpx 20rpx 14rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #999;
	}
	.newsGoods{
		color: #333333;
	}
	.moreGoods{
		width: 120rpx;
		background: url("http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png") no-repeat 50%;
		background-size: 11rpx 18rpx;
		background-position: 110rpx 20rpx;
		font-size: 24rpx;
	}
	.slideGoodsBox {
		white-space: nowrap;
		display: flex;
		padding-left: 20rpx;
	}
	.everyGoods{
		width: 180rpx;
		height: 280rpx;
		margin-right: 20rpx;
	}
	.goodsImage{
		width: 180rpx;
		height: 200rpx;
		border-radius:16rpx;
		overflow: hidden;
	}
	.newUserPrice{
		color: #EA1C0F;
		font-size: 38rpx;
		margin-top: 6rpx;
	}
	.newUserPrice text{
		font-size: 20rpx;
	}
	.scribingPrice{
		text-decoration:line-through;
		font-size: 18rpx;
		color: #999999;
	}
</style>
