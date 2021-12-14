<template>
	<view class="page">
		<view class="skuPage" @click="openSkuPopup">
			<text class="skuChoose">选择</text>
			<text class="skuText">{{chooseSpceData.name?chooseSpceData.name:"已选："+chooseSpceData.number+"件"}}</text>
			<text class="arrowIcon"></text>
		</view>
		<view class="skuPage" @click="openAddrPopup">
			<text class="skuChoose">送至</text>
			<view class="skuText"> <image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/adress_step@2x.png" mode=""></image> 
				<text v-if="chooseAddress.provinceName">{{chooseAddress.provinceName+chooseAddress.cityName+chooseAddress.districtName+(chooseAddress.townName?chooseAddress.townName:"")+(chooseAddress.address?chooseAddress.address:"")}}</text> 
				<text v-else>请选择收货地址</text>
			</view>
			<text class="arrowIcon"></text>
		</view>
		<view class="skuPage">
			<view class="skuChoose freight">运费</view>
			<view class="skuText">
				<text v-if="goodsInfo.freight.amount>0">{{goodsInfo.freight.amount}}元</text>
				<text v-else>{{(freightString && freightString.indexOf(goodsInfoId)!=-1)?"自提":"包邮"}}</text>
			</view>
		</view>
		<view class="skuPage guarantee">
			<view class="everyContainer" v-for="item,index in guaranteeList" :key='index'>
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/guarantee.png" mode=""></image>
				{{item.name}}
			</view>
		</view>
		<!-- sku选择 -->
		<uni-popup ref="skuPopup" type="bottom">
			<skuChoose :goodsInfo='goodsInfo' :increaseFlag='increaseFlag' :chooseSpceData='chooseSpceData' :singleProduct='singleProduct' :seckillInfo='seckillInfo' :memberInfo='memberInfo' :goodsInfoId='goodsInfoId' @cancelSetSpce='cancelSetSpce' @setSpceName='setSpceName' @checkStockNumber='checkStockNumber' @closeSkuPopup='closeSkuPopup' @setSkuInfo='setSkuInfo' @stcokFlagSet='stcokFlagSet' @addCart='addCart' @bugNow='bugNow' @updataMsg='updateMsg'></skuChoose>
		</uni-popup>
		<!-- 配送地址 -->
		<uni-popup ref="addressPopup" type="bottom">
			<addressListTemp :addressList='addressList' :chooseAddress='chooseAddress' @addressChange='addressChange'></addressListTemp>
		</uni-popup>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js';
	import memberApi from '@/api/member/index.js';
	import skuChoose from './skuChoose.vue';
	import addressListTemp from './addressList.vue';
	import vipConfig from '@/common/js/vipConfig.js'
	export default{
		props:['goodsInfo','chooseSpceData','seckillInfo','memberInfo','singleProduct','goodsInfoId','increaseFlag'],
		data(){
			return{
				guaranteeList:[
					{
						name:"正品保障"
					},
					{
						name:"极速发货"
					},
					{
						name:"售后无忧"
					},
					{
						name:"闪电退款"
					}
				],
				chooseAddress:{},	//选中的地址
				addressList:[],	//地址列表
				increaseReceive:false,	//是否是他人转增的商品
				freightString:"",	//是否有显示自提的商品
			}
		},
		methods:{
			calcGoodsFreight(){	//计算运费
				let params = {
					provinceId:this.chooseAddress.provinceId,
					cityId:this.chooseAddress.cityId,
					countyId:this.chooseAddress.countyId,
					townId:this.chooseAddress.townId,
					itemId:this.goodsInfoId,
					skuId:this.chooseSpceData.skuId,
					number:this.chooseSpceData.number
				}
				appApi.calcGoodsFreight(params).then(res=>{
					if(res.data.code==200){
						this.goodsInfo.freight.amount = res.data.data.amount;
						this.goodsInfo.freight.canBuy = res.data.data.canBuy;
						this.updateMsg(this.goodsInfo,this.chooseSpceData)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getAddressList(){	//获取地址列表
				memberApi.addressList().then(res=>{
					if(res.data.code==200){
						if(res.data.data){
							this.addressList = res.data.data;
							for(let i=0;i<this.addressList.length;i++){
								if(this.addressList[i].isDefault){
									this.chooseAddress = this.addressList[i];
									return
								}
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
			openSkuPopup(){	//打开sku选择框
				this.increaseReceive = false;
				if(this.$Route.query.transferOrderId){
					this.increaseReceive = true;
				}
				if(this.goodsInfo.status==2 && this.goodsInfo.stockNumber<=0 && !this.goodsInfo.frozenFlag && !this.increaseReceive){
					uni.showToast({
						title:"商品暂时缺货",
						icon:"none"
					})
					return
				}
				this.$emit("changeIncreaseFlag",true)
				this.$refs.skuPopup.open()
			},
			openSku(){
				this.$refs.skuPopup.open()
			},
			openAddrPopup(){	//打开地址选择弹窗
				this.$refs.addressPopup.open();
			},
			closeSkuPopup(){	//关闭sku选择框
				this.$refs.skuPopup.close();
			},
			addressChange(item){	//地址变化时触发
				this.chooseAddress = item;
				this.$refs.addressPopup.close();
				this.calcGoodsFreight()
			},
			initSpecVal(){	//选择规格属性展示内容
				this.chooseSpceData.stockNumber = this.goodsInfo.stockNumber;
				if(this.goodsInfo.stockNumber != 0){
					if(this.goodsInfo.attrSpecList.length){//当有多个规格时
						for(let i=0;i<this.goodsInfo.attrSpecList.length;i++){
							if(this.goodsInfo.attrSpecList[i].valueDTOList.length==1){ //循环遍历  当只有下面只有一个属性时默认选中
								this.$set(this.goodsInfo.attrSpecList[i],"chooseAttrValueId",this.goodsInfo.attrSpecList[i].valueDTOList[0].attrValueId)
								this.$set(this.goodsInfo.attrSpecList[i],"chooseAttrValue",this.goodsInfo.attrSpecList[i].valueDTOList[0].attrValue)
								this.chooseSpceData.checkList.push(this.goodsInfo.attrSpecList[i].valueDTOList[0].attrValue)
							}else{
								this.$set(this.goodsInfo.attrSpecList[i],"chooseAttrValueId",null)
								this.$set(this.goodsInfo.attrSpecList[i],"chooseAttrValue",null)
								this.chooseSpceData.checkList.push(null)
							}
						}
						this.setSpceName()
					}else{
						this.setSkuInfo(0);
						this.chooseSpceData.skuId = this.goodsInfo.skuList[0].skuId
					}
				}
				this.$nextTick(()=>{
					this.updateMsg(this.goodsInfo,this.chooseSpceData)
				})
			},
			setSpceName(){	//用来判断 展示 已选择还是请选择
				let num = this.skuArrNullNum(this.chooseSpceData.checkList);
				if(num==0){
					this.$set(this.chooseSpceData,"name","已选：" + this.chooseSpceData.checkList.join(' '))
				}else{
					this.$set(this.chooseSpceData,"name","请选择")
					for(let i=0;i<this.goodsInfo.attrSpecList.length;i++){
						if(!this.goodsInfo.attrSpecList[i].chooseAttrValue){
							this.$set(this.chooseSpceData,"name",this.chooseSpceData.name+this.goodsInfo.attrSpecList[i].attrName)
						}
					}
				}
				if(this.goodsInfo.skuList.length){
					this.resetFlag();
					this.stcokFlagSet();
				}
				this.$nextTick(()=>{
					this.updateMsg(this.goodsInfo,this.chooseSpceData)
				})
			},
			resetFlag(){	//将所有sku都变为可选状态
				for(let p in this.goodsInfo.attrSpecList){
			        for(let k in this.goodsInfo.attrSpecList[p].valueDTOList)
			          this.$set(this.goodsInfo.attrSpecList[p].valueDTOList[k],'flag',false);
				}
			},
			stcokFlagSet(){	//规格变化时判断库存
				let activeArr = [];
				let noActiveIndex = -1;
				for(let i=0;i<this.goodsInfo.attrSpecList.length;i++){
					if(this.goodsInfo.attrSpecList[i].chooseAttrValueId){
						activeArr.push(this.goodsInfo.attrSpecList[i].chooseAttrValueId);
					}else{
						noActiveIndex = i;
					}
				}
				if(this.skuArrNullNum(this.chooseSpceData.checkList)==1){
					this.checkStockNumber(activeArr,noActiveIndex)
				}
				if(this.skuArrNullNum(this.chooseSpceData.checkList)==0){
					let newArr = JSON.parse(JSON.stringify(activeArr))
					for(let index=0;index<this.goodsInfo.skuList.length;index++){
						if(this.goodsInfo.skuList[index].attrValueDTOList){
							let skuListValueIdArr = this.goodsInfo.skuList[index].attrValueDTOList.map((item)=>{
								return item.attrValueId;
							})
							if(activeArr.filter(v => skuListValueIdArr.indexOf(v)>-1).length  == activeArr.length){
								if(parseInt(this.goodsInfo.skuList[index].stockNumber) > 0  && this.goodsInfo.skuList[index].status == 1){//库存大于零且状态为上架
									this.setSkuInfo(index)
									if(activeArr.length > 0){
										newArr.splice(noActiveIndex,1);
										this.checkStockNumber(newArr,this.goodsInfo.attrSpecList.length - 1)
									}
								}else{
									this.cancelSetSpce(this.goodsInfo.attrSpecList.length - 1)
								}
							}
						}
					}
				}
			},
			cancelSetSpce(index){	//取消选择属性
				this.goodsInfo.attrSpecList[index].chooseAttrValueId = ""
				this.goodsInfo.attrSpecList[index].chooseAttrValue = ""
				this.chooseSpceData.checkList[index] = null;
				this.chooseSpceData.stockNumber = this.goodsInfo.stockNumber;
				this.chooseSpceData.price = 0;
				this.chooseSpceData.skuId = ""
				this.setSpceName();
				this.stcokFlagSet();
				this.$nextTick(()=>{
					this.updateMsg(this.goodsInfo,this.chooseSpceData)
				})
			},
			checkStockNumber(activeArr,noActiveIndex){	//还有一个未选中时  判断是否有库存
				for(let i=0;i<this.goodsInfo.skuList.length;i++){
					if(this.goodsInfo.skuList[i].attrValueDTOList){
						let skuListValueIdArr = this.goodsInfo.skuList[i].attrValueDTOList.map((item)=>{
							return item.attrValueId;
						})
						if(activeArr.filter(v => skuListValueIdArr.indexOf(v)>-1).length == activeArr.length || activeArr.length == 0){
							for(var p in this.goodsInfo.skuList[i].attrValueDTOList){
								if(this.goodsInfo.skuList[i].attrValueDTOList[p].attrId == this.goodsInfo.attrSpecList[noActiveIndex].attrId){
									for(var k in this.goodsInfo.attrSpecList[noActiveIndex].valueDTOList){
										if(this.goodsInfo.attrSpecList[noActiveIndex].valueDTOList[k].attrValueId == this.goodsInfo.skuList[i].attrValueDTOList[p].attrValueId){
											if(this.goodsInfo.skuList[i].stockNumber <= 0 || this.goodsInfo.skuList[i].status == 0){
												this.$set(this.goodsInfo.attrSpecList[noActiveIndex].valueDTOList[k],'flag',true);
											}
										}
									}
								}
							}
						}
					}
				}
				this.updateMsg(this.goodsInfo,this.chooseSpceData)
			},
			setSkuInfo(index){//设置选中规格信息
				if(this.goodsInfo.skuList[index]){
					this.$set(this.chooseSpceData,'price',this.goodsInfo.skuList[index].price);
					if(this.memberInfo.plusFlag==4){ //分销商
						for(let i=0;i<this.goodsInfo.skuList[index].distributorPriceList.length;i++){
							if(this.goodsInfo.skuList[index].distributorPriceList[i].type == this.memberInfo.distributorType){
								this.$set(this.chooseSpceData,'memberPrice',this.goodsInfo.skuList[index].distributorPriceList[i].price);
							}
						}
					}else if(this.memberInfo.plusFlag){	//个人会员
						for(let i=0;i<this.goodsInfo.skuList[index].newtypePriceList.length;i++){
							if(this.goodsInfo.skuList[index].newtypePriceList[i].type == this.memberInfo.plusFlag){
								this.$set(this.chooseSpceData,'memberPrice',this.goodsInfo.skuList[index].newtypePriceList[i].price);
							}
						}
					}
			        this.$set(this.chooseSpceData,'marketPrice',this.goodsInfo.skuList[index].marketPrice);
			        this.$set(this.chooseSpceData,'skuId',this.goodsInfo.skuList[index].skuId);
			        this.$set(this.chooseSpceData,'stockNumber',parseInt(this.goodsInfo.skuList[index].stockNumber));
					if(this.goodsInfo.showAttrId){
						for(let i=0;i<this.goodsInfo.attrSpecList.length;i++){
							if(this.goodsInfo.attrSpecList[i].attrId == this.goodsInfo.showAttrId){
								for(let j=0;j<this.goodsInfo.attrSpecList[i].valueDTOList.length;j++){
									for(let k=0;k<this.chooseSpceData.checkList.length;k++){
										if(this.goodsInfo.attrSpecList[i].valueDTOList[j].attrValue == this.chooseSpceData.checkList[k]){
											this.$set(this.chooseSpceData,'saleImage',this.goodsInfo.attrSpecList[i].valueDTOList[j].picUrl);
										}
									}
									
								}
							}
						}
			        }
				}
				this.updateMsg(this.goodsInfo,this.chooseSpceData)
			},
			setDefaultSpec(chooseSkuId){	//设置默认选中skuId
				for(let i=0;i<this.goodsInfo.skuList.length;i++){
					if(this.goodsInfo.skuList[i].skuId == chooseSkuId){
						this.setSkuInfo(i);
						for(let j=0;j<this.goodsInfo.skuList[i].attrValueDTOList.length;j++){
							for(let k=0;k<this.goodsInfo.attrSpecList.length;k++){
								if(this.goodsInfo.attrSpecList[k].attrId == this.goodsInfo.skuList[i].attrValueDTOList[j].attrId){
									this.$set(this.goodsInfo.attrSpecList[k],"chooseAttrValueId",this.goodsInfo.skuList[i].attrValueDTOList[j].attrValueId)
									this.$set(this.goodsInfo.attrSpecList[k],"chooseAttrValue",this.goodsInfo.skuList[i].attrValueDTOList[j].attrValue)
									this.chooseSpceData.checkList[k] = this.goodsInfo.skuList[i].attrValueDTOList[j].attrValue
								}
							}
						}
					}
				}
				if(!this.goodsInfo.attrSpecList.length){
					this.setSkuInfo(0)
				}
				this.setSpceName()
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
			updateMsg(goodsInfo,chooseSpceData){	//更新数据
				this.$emit("updateSku",chooseSpceData)
				this.$emit("UpdateGoodsInfo",goodsInfo)
			},
			addCart(){
				this.$emit("addCart")
			},
			bugNow(){
				this.$emit("bugNow")
			}
		},
		async mounted() {
			this.increaseReceive = false;
			if(this.$Route.query.transferOrderId){
				this.increaseReceive = true;
			}
			if(uni.getStorageSync('sessionId')){
				this.getAddressList()	//获取默认地址
			}
			
			// this.goodsInfo.savePromotionSkuId || 
			if(this.$Route.query.skuId){
				this.setDefaultSpec(this.goodsInfo.savePromotionSkuId?this.goodsInfo.savePromotionSkuId:this.$Route.query.skuId)
			}else{
				this.initSpecVal()
			}
			await vipConfig.getUserVip();
			let freightString = JSON.parse(uni.getStorageSync("miniRouter")).freightString;
			this.freightString = freightString?freightString:""
		},
		components:{
			skuChoose,
			addressListTemp
			
		}
	}
</script>

<style scoped>
	.skuPage{
		width: 100%;
		min-height: 110rpx;
		background-color: #FFFFFF;
		display: flex;
		padding-left: 24rpx;
	}
	.skuChoose{
		margin: 0 24rpx 0 0;
		font-size: 26rpx;
		color: #999;
		line-height: 110rpx;
		display: inline-block
	}
	.skuText{
		display: inline-block;
		min-height: 110rpx;
		line-height: 26rpx;
		font-size: 26rpx;
		padding: 41rpx 30rpx 41rpx 0;
		flex: 1;
		color: #000000;
	}
	.skuText image{
		width: 20rpx;
		height: 28rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}
	.arrowIcon{
		display: inline-block;
		width: 48rpx;
		margin-right: 20rpx;
		height: 110rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/more_fx2@2x.png) no-repeat 50%; 
		background-size: 40rpx 40rpx;
	}
	.guarantee{
		height: 88rpx;
		align-items: center;
	}
	.everyContainer{
		width: 25%;
		height:100%;
		display: flex;
		align-items: center;
		color: #FF1558;
		font-size: 22rpx;
	}
	.everyContainer image{
		width: 20rpx;
		height: 20rpx;
		margin-right: 12rpx;
	}
	
</style>
