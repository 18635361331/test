<template>
	<view class="page">
		<view class="newUser" @click="zhugeIo(newUserInfo.content)" v-if="newUserInfo.content && newUserInfo.content.showBanner" :style="{'background-image':'url('+imgBaseUrls+newUserInfo.content.backgroundImage+')'}">
			<view class="goods-wrapper">
				<view class="everyGoods" @click.stop="goToGoodsDetails(item.id)" v-for="item,index in newUserInfo.content.items" :key='index'>
					<image class="img-wrapper" :src="imgBaseUrls+item.pictureName" mode=""></image>
					<view class="price">
						¥<text v-if="memberType==1 && !item.singlePromotionType">{{item.minSbcPlusPrice?item.minSbcPlusPrice:""}}</text>
						<text v-else-if="memberType==2 && !item.singlePromotionType">{{item.minSbcEnterprisePrice?item.minSbcEnterprisePrice:""}}</text>
						<text v-else>{{item.minPrice?item.minPrice:""}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/js/homeMixin.js'
	import decorateApi from '@/api/decorate/index.js'
	export default{
		mixins:[mixin],
		data(){
			return{
				imgBaseUrls:"",
				newUserInfo:{	//新人优惠券数据
					
				},
				memberType:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:""
			}
		},
		methods:{
			zhugeIo(params){
				this.zhuge.track("首页-新人优惠")
				this.renovationGoTo(params);
			},
			searchComponent(){	
				decorateApi.searchComponent(100002).then(res=>{
					if(res.data.code==200){
						if(res.data.data.content && res.data.data.content!="NaN"){
							res.data.data.content = JSON.parse(res.data.data.content);
							this.newUserInfo = res.data.data;
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			goToGoodsDetails(goodsId){
				this.$Router.push({
					path:"/pages/goodsDetails/index",
					query:{
						goodsId:goodsId
					}
				})
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.searchComponent()
		}
	}
</script>

<style scoped>
	.newUser{
		width: 100%;
		height: 290rpx;
		border-radius: 16rpx;
		background-size: 100%;
		padding-top: 72rpx;
	}
	.goods-wrapper{
		width: 100%;
		display: flex;
		height: 200rpx;
		justify-content: space-around;
		padding:  0 20rpx;
	}
	.everyGoods{
		width: 140rpx;
		height: 200rpx;
		background-color: #FFFFFF;
		border-radius: 14rpx;
		overflow: hidden;
		text-align: center;
	}
	.price{
		line-height: 30rpx;
		font-size: 24rpx;
		color: #FF1558;
		font-weight: 700;
		margin-top: 20rpx;
	}
	.img-wrapper{
		width: 140rpx;
		height: 140rpx;
		margin-bottom: 10rpx;
	}
</style>
