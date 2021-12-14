<template>
	<view class="page skuPopup">
		<view class="parentBox">
			<view class="skuTitle">
				<view class="itemImage" :style="{backgroundImage:'url('+imgBaseUrls+goodsInfo.itemPictureDtos[0].name+')'}"></view>
				<view class="skuDetails">
					<view class="skuPrice">
						<view class="skuPriceSub">¥</view>
						<view class="skuPriceText">
							<text>{{getGoodsPrice()}}</text>
						</view>
						
					</view>
					<view class="retailPrice" v-if="goodsInfo.defaultPrice">
						<text>¥{{goodsInfo.defaultPrice}}</text>全国统一零售价
					</view>
					<view class="itemName ellipsis-one">
						{{goodsInfo.name}}
					</view>
				</view>
			</view>
			<scroll-view scroll-y=true class="spceBox">
				<view class="spceList" v-for="item,index in goodsInfo.attrSpecList" :key='item.attrId'>
					<view class="spceTitle">{{item.attrName}}</view>
					<view class="spceLabel">
						<text v-for="list,i in item.valueDTOList" :key='list.attrValueId' :class="{active:item.chooseAttrValueId == list.attrValueId,'null':list.flag}" @click='list.flag?"":setSpce(list,index,item.chooseAttrValueId==list.attrValueId)'>{{list.attrValue}}</text>
					</view>
				</view>
				<view class="spceNumOperate">
					<view class="spceNumText">
						定制数量
					</view>
					<view class="subtraction" :class="{jianNull:juageJian()}" @click="subtractionChange">-</view>
					<view class="spceNumInput">
						<input type="number"  :value="chooseSpceData.number" v-if="inputFlag" @input="inputBlur" @blur="blurInput" />
					</view>
					<view class="addition" @click="additionChange">+</view>
				</view>
			</scroll-view>
			<view class="sureBtn" @click="sureBuy">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["goodsInfo","chooseSpceData"],
		data(){
			return{
				imgBaseUrls:"",
				inputFlag:true,
				memberInfo:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{},
			}
		},
		methods:{
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
				if(this.chooseSpceData.skuId){
					if(this.chooseSpceData.number>this.chooseSpceData.minOrderNum){
						this.chooseSpceData.number--
					}
				}else{
					this.chooseSpceData.number>1?this.chooseSpceData.number--:"";
				}
				this.$emit("updataMsg",this.goodsInfo,this.chooseSpceData);
				this.$nextTick(()=>{
					this.$emit("setSkuInfo",this.chooseSpceData.checkIndex)
				})
			},
			additionChange(){	//数量增加
				this.chooseSpceData.number++;
				this.$emit("updataMsg",this.goodsInfo,this.chooseSpceData);
				this.$nextTick(()=>{
					this.$emit("setSkuInfo",this.chooseSpceData.checkIndex)
				})
			},
			juageJian(){	//是否达到最小值
				if(this.chooseSpceData.skuId){
					if(this.chooseSpceData.number<=this.chooseSpceData.minOrderNum){
						return true
					}
				}else{
					if(this.chooseSpceData.number<=1){
						return true
					}
				}
			},
			getGoodsPrice(){	//获取商品价格
				if(this.chooseSpceData.skuId){
					if(((this.memberInfo.plusFlag==4 && this.goodsInfo.distributorPriceFlag) || (this.memberInfo.plusFlag!=4 && this.memberInfo.plusFlag))){
						return this.chooseSpceData.memberPrice
					}else{
						return this.chooseSpceData.price
					}
				}else{
					if(((this.memberInfo.plusFlag==4 && this.goodsInfo.distributorPriceFlag) || (this.memberInfo.plusFlag!=4 && this.memberInfo.plusFlag))){
						if(this.goodsInfo.minTypePrice!=this.goodsInfo.maxTypePrice){
							return `${this.goodsInfo.minTypePrice}~${this.goodsInfo.maxTypePrice}`
						}else{
							return this.goodsInfo.minTypePrice
						}
					}else{
						if(this.goodsInfo.minPrice!=this.goodsInfo.maxPrice){
							return `${this.goodsInfo.minPrice}~${this.goodsInfo.maxPrice}`
						}else{
							return this.goodsInfo.minPrice
						}
					}
				}
			},
			inputBlur(event){	//输入框失去焦点判断是否小于最小起订量
				this.chooseSpceData.number = event.target.value
				if(this.chooseSpceData.skuId){
					if(this.chooseSpceData.number<this.chooseSpceData.minOrderNum){
						this.chooseSpceData.number = this.chooseSpceData.minOrderNum;
					}
				}else{
					if(!this.chooseSpceData.number){
						this.chooseSpceData.number = 1
					}
				}
				this.$emit("updataMsg",this.goodsInfo,this.chooseSpceData);
				this.$nextTick(()=>{
					this.$emit("setSkuInfo",this.chooseSpceData.checkIndex)
				})
			},
			blurInput(event){
				this.inputFlag = false;
				this.$nextTick(()=>{
					this.inputFlag = true;
				})
			},
			sureBuy(){	//确认购买
				this.$emit("goToMake")
			}
		},
		mounted() {
			this.imgBaseUrls = this.$config.imgBaseUrl
		}
	}
</script>

<style scoped>
	.skuPopup{
		border-radius: 28rpx 28rpx 0px 0px;
		width: 100%;
		height: calc(850rpx + constant(safe-area-inset-bottom));
		height: calc(850rpx + env(safe-area-inset-bottom));
		min-height: 752rpx;
		background-color: #FFFFFF;
		position: relative;
	}
	.parentBox{
		width: 100%;
		height: 100%;
	}
	.skuTitle{
		display: flex;
		padding: 24rpx 30rpx 24rpx 24rpx;
		justify-content: space-between;
	}
	.itemImage{
		width: 120rpx;
		height: 120rpx;
		border: 1rpx solid #eee;
		background-position: 50%;
		background-size: cover;
		background-size: 100% 100%;
	}
	.skuDetails{
		width: calc(100% - 48rpx);
		height: 120rpx;
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.itemName{
		font-size: 24rpx;
		color: #333333;
	}
	.spceBox{
		height: 524rpx;
		width: 100%;
	}
	.spceList{
		padding: 30rpx 0 36rpx;
		margin-left: 25rpx;
		border-bottom: 1px solid #E4E4E4;
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
		min-width: 128rpx;
		border-radius: 35rpx;
		padding: 0 16rpx;
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
		margin-right: 24rpx;
		display: inline-block;
		margin-top: 24rpx;
		font-size: 24rpx;
		border: 1px solid #7E8385;
		color: #7E8385;
	}
	.spceLabel text.active{
		background: #E4CCFF;
		border: none;
		color: #7A32CC;
	}
	.spceLabel text.null{
		background: #F5F5F9;
		color: #7E8385;
		border: none;
	}
	
	.spceNumOperate{
		margin-top: 28rpx;
		margin-left: 24rpx;
		display: flex;
		align-items: center;
		width: 400rpx;
		
	}
	.spceNumText{
		width: 80px;
		color: #323232;
	}
	.subtraction,.addition{
		border: 1rpx solid #E6E6E6;
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		vertical-align: middle;
	}
	.spceNumOperate .spceNumInput{
		border-top: 1rpx solid #E6E6E6;
		border-bottom: 1rpx solid #E6E6E6;
		height: 60rpx;
		width: 120rpx;
		text-align: center;
		font-size: 24rpx;
	}
	.spceNumInput input{
		font-size: 24rpx;
		height: 60rpx;
		line-height: 60rpx;
	}
	.subtraction.jianNull,.addition.jianNull{
		background: #f5f4f4db;
	}
	.skuPrice{
		font-size: 40rpx;
		color: #FF1558;
		display: flex;
		line-height: 1;
	}
	.skuPrice .skuPriceSub{
		font-size: 30rpx;
		padding-top: 20rpx;
		margin-right: 6rpx;
	}
	.skuPriceText{
		padding-top: 10rpx;
	}
	.itemName{
		font-size: 24rpx;
		color: #333333;
	}
	.sureBtn{
		width: 702rpx;
		height: 80rpx;
		background: linear-gradient(219deg, #CB6EFF 0%, #7530C1 100%);
		margin: 0 auto;
		border-radius: 20px;
		text-align: center;
		line-height: 80rpx;
		font-size: 26rpx;
		color: #FFFFFF;
		margin-top: 40rpx;
	}
	.retailPrice{
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		color: #666666;
		font-size: 24rpx;
	}
	.retailPrice text{
		margin-right: 24rpx;
	}
</style>
