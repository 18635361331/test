<template>
	<view class="page">
		<view class="cusAttr" @click="openSkuPopup()">
			<text class="cusAttrText">定制详情</text>
			<view class="attrTxt">
				{{chooseSpceData.name}}
			</view>
			<view class="attrArrow"></view>
		</view>

		<uni-popup ref="skuPopup" type="bottom">
			<skuChoose :goodsInfo='goodsInfo' :chooseSpceData="chooseSpceData" @cancelSetSpce='cancelSetSpce' @setSpceName='setSpceName' @closeSkuPopup='closeSkuPopup' @setSkuInfo='setSkuInfo' @stcokFlagSet='stcokFlagSet' @updataMsg='updateMsg' @goToMake='goToMake'></skuChoose>
		</uni-popup>
	</view>
</template>

<script>
	import skuChoose from '../skuChoose/index.vue';	//sku选择输入框
	export default {
		props:["goodsInfo","chooseSpceData"],
		data(){
			return{
			}
		},
		methods:{
			openSkuPopup(){	//打开sku选择框
				this.$refs.skuPopup.open()
			},
			closeSkuPopup(){	//关闭sku选择框
				this.$refs.skuPopup.close();
			},
			initSpecVal(){	//选择规格属性展示内容
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
				this.updateMsg(this.goodsInfo,this.chooseSpceData)
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
				this.updateMsg(this.goodsInfo,this.chooseSpceData)
			},
			resetFlag(){	//将所有sku都变为可选状态
				for(let p in this.goodsInfo.attrSpecList){
			        for(let k in this.goodsInfo.attrSpecList[p].valueDTOList)
			          this.$set(this.goodsInfo.attrSpecList[p].valueDTOList[k],'flag',false);
				}
				this.updateMsg(this.goodsInfo,this.chooseSpceData)
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
				if(this.skuArrNullNum(this.chooseSpceData.checkList)==0){
					for(let index=0;index<this.goodsInfo.skuList.length;index++){
						if(this.goodsInfo.skuList[index].attrValueDTOList){
							let skuListValueIdArr = this.goodsInfo.skuList[index].attrValueDTOList.map((item)=>{
								return item.attrValueId;
							})
							if(activeArr.filter(v => skuListValueIdArr.indexOf(v)>-1).length  == activeArr.length){
								this.setSkuInfo(index)
							}
						}
					}
				}
				this.updateMsg(this.goodsInfo,this.chooseSpceData)
			},
			cancelSetSpce(index){	//取消选择属性
				this.goodsInfo.attrSpecList[index].chooseAttrValueId = ""
				this.goodsInfo.attrSpecList[index].chooseAttrValue = ""
				this.chooseSpceData.checkList[index] = null;
				this.chooseSpceData.price = 0;
				this.chooseSpceData.skuId = ""
				this.setSpceName();
				this.stcokFlagSet();
				this.$emit("updataMsg",this.goodsInfo,this.chooseSpceData);
			},
			setSkuInfo(index){//设置选中规格信息
				if(this.goodsInfo.skuList[index]){
					this.$set(this.chooseSpceData,'minOrderNum',this.goodsInfo.skuList[index].minOrderNum);
					if(this.chooseSpceData.number<this.goodsInfo.skuList[index].minOrderNum){
						this.$set(this.chooseSpceData,'number',this.goodsInfo.skuList[index].minOrderNum);
					}
					// this.$set(this.chooseSpceData,'distributorPrice',this.goodsInfo.skuList[index].distributorPrice);
					this.$set(this.chooseSpceData,'checkIndex',index);
					if(this.goodsInfo.skuList[index].priceLadder){
						let isMath = false
						for(let i=0;i<this.goodsInfo.skuList[index].priceLadder.length;i++){
							if(this.goodsInfo.skuList[index].priceLadder[i].number>=this.chooseSpceData.number){
								isMath = true
								if(this.goodsInfo.skuList[index].priceLadder[i].number == this.chooseSpceData.number){
									this.$set(this.chooseSpceData,'price',this.goodsInfo.skuList[index].priceLadder[i].originPrice);
									this.$set(this.chooseSpceData,'memberPrice',this.goodsInfo.skuList[index].priceLadder[i].price);
									break;
								}
								if(i>0){
									this.$set(this.chooseSpceData,'price',this.goodsInfo.skuList[index].priceLadder[i-1].originPrice);
									this.$set(this.chooseSpceData,'memberPrice',this.goodsInfo.skuList[index].priceLadder[i-1].price);
								}else{
									this.$set(this.chooseSpceData,'price',this.goodsInfo.skuList[index].priceLadder[i].originPrice);
									this.$set(this.chooseSpceData,'memberPrice',this.goodsInfo.skuList[index].priceLadder[i].price);
								}
								break;
							}
						}
						if(!isMath){
							let length = this.goodsInfo.skuList[index].priceLadder.length - 1
							this.$set(this.chooseSpceData,'price',this.goodsInfo.skuList[index].priceLadder[length].originPrice);
							this.$set(this.chooseSpceData,'memberPrice',this.goodsInfo.skuList[index].priceLadder[length].price);
						}
					}
			        this.$set(this.chooseSpceData,'skuId',this.goodsInfo.skuList[index].skuId);
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
			goToMake(){
				this.$emit("goToMake")
			},
			updateMsg(goodsInfo,chooseSpceData){	//更新数据
				this.$emit("updateSku",chooseSpceData)
				this.$emit("UpdateGoodsInfo",goodsInfo)
			},
		},
		mounted() {
			this.initSpecVal()
		},
		components:{
			skuChoose
		}
	}
</script>

<style scoped>
	.cusAttr{
		width: 100%;
		height: 100rpx;
		margin-top: 20rpx;
		padding:  0 10rpx 0 24rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
	}
	.cusAttrText {
		color: #AEB5B8;
		margin-right: 30rpx;
	}
	.attrTxt{
		width: calc(100% - 212rpx);
		color: #323232;
	}
	.attrArrow{
		width: 48rpx;
		height: 48rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat center center;
		background-size: 12rpx 28rpx;
	}
</style>
