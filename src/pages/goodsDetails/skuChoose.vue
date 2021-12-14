<template>
	<view class="page skuPopup fixedPosition" :class="goodsInfo.presaleFlag?'active':''">
		<view class="closeBtn" @click="$emit('closeSkuPopup')"></view>
		<view class="goodsInfo">
			<image class='goodsInfoImage' v-if="goodsInfo.itemPictureDtos.length" :src="imgBaseUrls+((goodsInfo.showAttrId!='-1' && goodsInfo.showAttrId && chooseSpceData.name.indexOf('已选')==0)?chooseSpceData.saleImage:goodsInfo.itemPictureDtos[0].name)" mode=""></image>
			<view class="goodsSpce">
				<!-- 非新人价 -->
				<view class="goodsPrice"  v-if="goodsInfo.singlePromotionType!=24">
					<block v-if="((memberInfo.plusFlag==4 && goodsInfo.distributorPriceFlag) || (memberInfo.plusFlag!=4 && memberInfo.plusFlag))">
						<text>￥</text>{{chooseSpceData.skuId?chooseSpceData.memberPrice:goodsInfo.minTypePrice}}
					</block>
					<block v-else>
						<text>￥</text>{{getGoodsPrice()}}
					</block>
					
				</view>
				<!-- 非新人价结束 -->
				<!-- 新人价 -->
				<view class="newUserPrice" v-if="goodsInfo.singlePromotionType==24">
					新人价
					<text class="currency"> ￥</text>
					<text class="price">{{getGoodsPrice()}}</text>
					 {{!chooseSpceData.price?'起':''}}
				</view>
				<view class="newUserDecora" v-if="getUnderline()">
					¥{{getUnderline()}}
				</view>
				<!-- 新人价结束 -->
				<view class="goodsStock" v-if="increaseFlag">库存 {{getStockNumber()}}件</view>
				<view class="goodsSpceSku" v-if="increaseFlag">{{chooseSpceData.name}}</view>
			</view>
		</view>
		<view class="deliveryTime" v-if="goodsInfo.presaleFlag">
			<image :src="imgBaseUrls+'appletsImages/openBookingIcon.png'" mode=""></image>
			发货时间：{{goodsInfo.presaleInfo.deliveryStartTime}} ~ {{goodsInfo.presaleInfo.deliveryEndTime}}
		</view>
		<scroll-view scroll-y=true class="spceBox">
			<view class="spceList" v-if="increaseFlag" v-for="item,index in goodsInfo.attrSpecList" :key='item.attrId'>
				<view class="spceTitle">{{item.attrName}}</view>
				<view class="spceLabel">
					<text v-for="list,i in item.valueDTOList" :key='list.attrValueId' :class="{active:item.chooseAttrValueId == list.attrValueId,'null':list.flag}" @click='list.flag?"":setSpce(list,index,item.chooseAttrValueId==list.attrValueId)'>{{list.attrValue}}</text>
				</view>
			</view>
			<view class="spceNum">数量</view>
			<view class="spceNumOperate">
				<view class="subtraction" :class="{jianNull:(chooseSpceData.number<=1 || (increaseReceive && increaseFlag))}" @click="subtractionChange">-</view>
				<input type="number" :disabled="increaseReceive" :value="chooseSpceData.number" @input="onKeyInput"/>
				<view class="addition" :class="{jiaNull:(chooseSpceData.number>=chooseSpceData.stockNumber || (increaseReceive && increaseFlag))}" @click="additionChange">+</view>
			</view>
		</scroll-view>
		<view v-if="!goodsInfo.frozenFlag && goodsInfo.status!=2" class="nacDisabledBtn">商品已下架</view>
		<view v-else-if="goodsInfo.status==2 && goodsInfo.stockNumber<=0 && !goodsInfo.frozenFlag && !increaseReceive" class="nacDisabledBtn">商品暂时缺货</view>
		<view v-else-if="goodsInfo.frozenFlag" class="nacDisabledBtn">商品已下架</view>
		<!-- 秒杀活动 不允许加入购物车 -->
		<view class="buyNow" @click="bugNow" v-else-if="seckillInfo.marketingId && new Date().getTime() > new Date(this.seckillInfo.marketingSessionStartTime).getTime() && goodsInfo.stockNumber">
			立即购买
		</view>
		<view class="buyNow" v-else-if="seckillInfo.marketingId && new Date(goodsInfo.singlePromotionStartTime).getTime() < new Date().getTime() && !goodsInfo.stockNumber">
			已抢完
		</view>
		<!-- 秒杀活动按钮结束 -->
		
		<!-- 会员按钮开始 -->
		<view class="buyNow memberBuyBtn" v-else-if="goodsInfo.singlePromotionType>50 && increaseFlag && !increaseReceive" @click="bugNow">
			{{memberInfo.plusFlag?"立即购买":"立即购买，即享会员权益"}}
		</view>
		<!-- 会员按钮结束 -->
		
		<!-- 转增购买 -->
		<view class="buyNow increaseBtn" v-else-if="goodsInfo.singlePromotionType>50 && increaseReceive" @click="bugNow">
			立即领取
		</view>
		
		<view class="buyNow increaseBtn" v-else-if="goodsInfo.singlePromotionType>50 && !increaseFlag && !increaseReceive" @click="increaseBuy">
			转赠购买
		</view>
		<!-- 转增购买结束 -->
		
		<!-- 预售商品按钮 -->
		<view class="buyNow" @click="bugNow" v-else-if="goodsInfo.presaleFlag">
			立即下单
		</view>
		<!-- 预售商品按钮结束 -->
		
		<view class="spceBtmBtn" v-else>
			<view class="addCart" @click="addCart">加入购物车</view>
			<view class="buy" @click="bugNow">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['goodsInfo','chooseSpceData','seckillInfo','memberInfo','singleProduct','goodsInfoId',"increaseFlag"],
		data(){
			return{
				imgBaseUrls:"",
				number:0,
				increaseReceive:false,	//是否是他人转增的商品
			}
		},
		mounted() {
			this.increaseReceive = false;
			if(this.$Route.query.transferOrderId){
				this.increaseReceive = true;
			}
			this.imgBaseUrls = this.$config.imgBaseUrl;
		},
		methods:{
			goToBuyMemberPage(){	//去往购买会员页面
				if(uni.getStorageSync("sessionId")){
					if(this.goodsInfo.singlePromotionType==23){
						if(this.memberInfo.auditStatus==0){
							uni.switchTab({
								url:"/pages/my/index"
							})
						}else{
							this.$Router.push({path:'/pages/openMemberShip/index',query:{goodsId:this.goodsInfoId,enterprise:true}})
						}
					}else{
						this.$Router.push({path:'/pages/openMemberShip/index',query:{goodsId:this.goodsInfoId}})
					}
				}else{
					this.$Router.push({
						path:"/pages/login/index"
					})
				}
			},
			getStockNumber(){	//获取库存
				if(this.increaseReceive && this.chooseSpceData.skuId){
					return this.chooseSpceData.stockNumber
				}else if(this.increaseReceive && !this.chooseSpceData.skuId){
					return this.goodsInfo.allStockNumber
				}else{
					return this.chooseSpceData.stockNumber
				}
			},
			setSpce(item,index,flag){	//规格属性发生变化时
				if(flag){
					if(this.goodsInfo.attrSpecList[index].valueDTOList.length >1){	//当只有一个时不可以取消
						this.$emit('cancelSetSpce',index)
					}
				}else{
					this.$set(this.goodsInfo.attrSpecList[index],"chooseAttrValueId",item.attrValueId);
					this.$set(this.goodsInfo.attrSpecList[index],"chooseAttrValue",item.attrValue);
					this.chooseSpceData.checkList[index] = item.attrValue;
					this.$emit("updataMsg",this.goodsInfo,this.chooseSpceData);
					this.$nextTick(()=>{
						this.$emit("setSpceName");
						this.$emit("stcokFlagSet");
						this.judgeNum();
					})
				}
			},
			skuArrNullNum(selectArr){//检索选中数组中有几个是空的；
				let num = 0
				for(let n in selectArr){
			        if(!selectArr[n]){
			          num ++
			        }
				}
				return num;
			},
			subtractionChange(){	//数量减少
				if(this.increaseReceive && this.increaseFlag){
					return
				}
				this.chooseSpceData.number>1?this.chooseSpceData.number--:"";
				this.$emit("updataMsg",this.goodsInfo,this.chooseSpceData)
			},
			additionChange(){	//数量增加
				if(this.increaseReceive && this.increaseFlag){
					return
				}
				if(Number(this.chooseSpceData.number) <this.chooseSpceData.stockNumber){
					this.chooseSpceData.number++;
					this.$emit("updataMsg",this.goodsInfo,this.chooseSpceData)
				}
				
			},
			getGoodsPrice(){	//商品价格的展示与判断
				if(this.chooseSpceData.skuId && !this.singleProduct.singlePromotion){
					return this.chooseSpceData.price
				}else if(!this.chooseSpceData.skuId && !this.singleProduct.singlePromotion){
					return this.goodsInfo.minPrice
				}else if(this.singleProduct.singlePromotion){
					return this.singleProduct.singlePromotion.promotionPrice
				}else{
					if(this.goodsInfo.minPrice && this.goodsInfo.minPrice!= this.goodsInfo.maxPrice){
						return this.goodsInfo.minPrice+'-'+this.goodsInfo.maxPrice
					}else{
						return this.goodsInfo.maxPrice
					}
				}
			},
			getUnderline(){	//获取新人划线价
				if(this.goodsInfo.marketPrice){
					return this.goodsInfo.marketPrice
				}else{
					return false
				}
			},
			onKeyInput: function(event) {
				this.chooseSpceData.number = event.target.value
				this.$emit("updataMsg",this.goodsInfo,this.chooseSpceData)
			},
			judgeNum(){	//检查数量是否超过所选项
				this.$nextTick(()=>{
					if(Number(this.chooseSpceData.number) > this.chooseSpceData.stockNumber){
						this.chooseSpceData.number = this.chooseSpceData.stockNumber;
					}else{
						this.chooseSpceData.number = 1;
					}
					this.$emit("updataMsg",this.goodsInfo,this.chooseSpceData)
				})
			},
			addCart(){
				this.$emit("addCart")
			},
			bugNow(){
				this.$emit("bugNow")
			},
			increaseBuy(){	//转增购买
				this.$Router.push({
					path:"/pages/settlement/increase",
					query:{
						goodsNum:this.chooseSpceData.number,
						goodsId:this.goodsInfoId
					}
				})
			}
		}
	}
</script>

<style scoped>
	.skuPopup{
		width: 100%;
		height: calc(850rpx + constant(safe-area-inset-bottom));
		height: calc(850rpx + env(safe-area-inset-bottom));
		min-height: 752rpx;
		background-color: #FFFFFF;
		position: relative;
	}
	.skuPopup.active{
		height: calc(918rpx + constant(safe-area-inset-bottom));
		height: calc(918rpx + env(safe-area-inset-bottom));
	}
	.closeBtn{
		width: 60rpx;
		height: 60rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png) no-repeat 50%;
		background-size: 40rpx;
		position: absolute;
		top: 10rpx;
		right: 10rpx;
	}
	.goodsInfo{
		padding-top: 28rpx;
	}
	.goodsInfoImage{
		width: 200rpx;
		height: 200rpx;
		border-radius: 6rpx;
		border: 1px solid #E4E4E4;
		margin-left: 28rpx;
	}
	.goodsSpce{
		width: calc(100% - 264rpx);
		margin-left: 24rpx;
		display: inline-block;
	}
	.spceList{
		padding-bottom:36rpx;
		margin-left: 25rpx;
		border-bottom: 1px solid #E4E4E4;
		margin-bottom: 30rpx;
	}
	.spceTitle{
		font-size: 30rpx;
		color: #333333;
		line-height: 32rpx;
	}
	.spceLabel{
		width: 98%;
	}
	.spceLabel text{
		min-width: 126rpx;
		border-radius: 35rpx;
		padding: 0 16rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin-right: 24rpx;
		display: inline-block;
		margin-top: 24rpx;
		font-size: 26rpx;
		background-color: #f5f5f9;
	}
	.spceLabel text.active{
		background: #ff1558;
		color: #FFFFFF;
	}
	.spceLabel text.null{
		background: #F5F5F9;
		color: #CCCCCC;
		border: none;
	}
	.goodsStock,.goodsSpceSku{
		color: #666666;
		margin-top: 7rpx;
		font-size: 24rpx;
		line-height: 31rpx;
	}
	.goodsSpceSku{
		color: #333333;
	}
	.goodsPrice{
		font-size: 32rpx;
		color: #FF1558;
		line-height: 42rpx;
		display: inline-block;
	}
	.goodsPrice text{
		font-size: 24rpx;
	}
	.spceNum{
		width: 100%;
		font-size: 30rpx;
		line-height: 32rpx;
		color: #333333;
		margin-left: 24rpx;
	}
	.spceBox{
		height: 520rpx;
		width: 100%;
		padding-top: 30rpx;
	}
	.spceNumOperate{
		margin-top: 28rpx;
		margin-left: 24rpx;
		display: flex;
		width: 188rpx;
		
	}
	.subtraction,.addition{
		border: 1rpx solid #E6E6E6;
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
	}
	.spceNumOperate input{
		border-top: 1rpx solid #E6E6E6;
		border-bottom: 1rpx solid #E6E6E6;
		height: 50rpx;
		width: 88rpx;
		text-align: center;
		font-size: 24rpx;
	}
	.subtraction.jianNull,.addition.jiaNull{
		background: #f5f4f4db;
	}
	.spceBtmBtn{
		width: 100%;
		height: 100rpx;
		display: flex;
		border-top:1px solid #E6E6E6;
	}
	.spceBtmBtn view{
		width: 50%;
		text-align: center;
		line-height: 90rpx;
	}
	.addCart{
		color: #333333;
		background-color: #FFFFFF;
	}
	.buy{
		color: #FFFFFF;
		background-color: #FF1558;
	}
	.nacDisabledBtn{
		width: 100%;
		background: #999999;
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
	}
	.buyNow{
		background-color: #FF1558;
		color: #FFFFFF;
		width: calc(100% - 40rpx);
		height: 78rpx;
		margin-top: 10rpx;
		margin-left: 16rpx;
		border-radius: 52rpx;
		text-align: center;
		line-height: 78rpx;
	}
	.increaseBtn{
		background: linear-gradient(270deg, #FFBB46 0%, #FE8F20 100%);
	}
	.disabled.buyNow{
		background-color: #DFDFDF;
	}
	.newUserPrice{
		color: #FE325C;
		font-size: 32rpx;
	}
	.newUserPrice,.newUserDecora{
		width: 100%;
		background-color: #FFFFFF;
		line-height: 60rpx;
	}
	.newUserDecora{
		line-height: 40rpx;
		text-decoration: line-through;
		color: #999999;
		font-size: 28rpx;
	}
	.newUserPrice .currency{
		font-size: 28rpx;
		font-weight: 500;
	}
	.newUserPrice .price{
		font-size: 50rpx;
	}
	.deliveryTime{
		width: calc(100% - 40rpx);
		height: 58rpx;
		background-color: #FEE5EB;
		margin: 5rpx auto;
		border-radius: 20rpx;
		color: #FE325C;
		font-size: 24rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
	}
	.deliveryTime image{
		width: 20rpx;
		height: 20rpx;
		margin-right: 12rpx;
	}
</style>
