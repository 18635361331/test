<template>
	<view class="page">
		<uni-popup ref="skuPopup" type="bottom">
			<view class="skuBox">
				<view class="closeBtn" @click="closeSkuPopup"></view>
				<view class="goodsInfo">
					<image  mode="aspectFill"  :src="imgBaseUrls+operateObj.goodsImg"></image>
					<view class="goodsSpces">
						<view class="goodsPrice"><text>￥{{operateObj.price}}</text></view>
						<view class="goodsStock">库存{{operateObj.storage}}件</view>
						<view class="goodsSpceSku" v-if="keyName">请选择：{{keyName}}</view>
						<view class="goodsSpceSku" v-else>已选：{{operateObj.saleFieldValue}}</view>
					</view>
				</view>
				<scroll-view scroll-y=true class="spceBox">
					<view class="spceList" v-for="item,index in goodsSpceSku.goodsSkuSaleKeyDtos" :key='item.id'>
						<view class="spceTitle">{{item.keyName}}</view>
						<view class="spceLabel">
							<text v-for="list,i in item.skuDtos" :key='i' :class="{'active':list.flag,'null':list.noStorage}" @click='skuChange(list,index,i)'>{{list.saleName}}</text>
						</view>
					</view>
				</scroll-view>
				<view class="newSubmit" @click="sureChange">确  定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import goodsApi from '@/api/goods/index.js';
	export default {
		props:['chooseSpec'],
		data(){
			return{
				imgBaseUrls: this.$config.imgBaseUrl,
				goodsSpceSku:{},
				operateObj:{},
				keyName:'',
			}
		},
		methods:{
			// 初始选中
			findCartGoods(){
				let chooseSpec = this.chooseSpec
				this.keyName = ''
				this.setOperate(chooseSpec.price,chooseSpec.goodsImg,chooseSpec.storage,chooseSpec.saleFieldValue)
				goodsApi.findCartGoods(chooseSpec.itemId).then(res=>{
					if(res.data.code==200){
						for(let i=0;i<res.data.data.goodsSkuSaleKeyDtos.length;i++){
							this.$set(res.data.data.goodsSkuSaleKeyDtos[i],"skuDtos",[])
							for(let j=0;j<res.data.data.goodsSkuSaleDtos.length;j++){
								if(res.data.data.goodsSkuSaleKeyDtos[i].id == res.data.data.goodsSkuSaleDtos[j].id){
										// 初始化
									if(chooseSpec.saleFieldValue.indexOf(res.data.data.goodsSkuSaleDtos[j].saleName)>-1){
										res.data.data.goodsSkuSaleDtos[j].flag = true
									}else{
										res.data.data.goodsSkuSaleDtos[j].flag = false
									}
									res.data.data.goodsSkuSaleKeyDtos[i].skuDtos.push(res.data.data.goodsSkuSaleDtos[j]);
								}
							}
						}
						this.goodsSpceSku = res.data.data
						// 初始化
						for(let i of res.data.data.goodsSkuDTOS){
							if(chooseSpec.goodsId == i.id){
								this.operateObj.saleFieldIds = i.saleFieldValue
							}
						}
						this.init()
						this.$refs.skuPopup.open()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			init(){
				let saleFieldIds = this.operateObj.saleFieldIds.split(',')
					// 判断是否多个类型都有值
					let keyName = []
					for(let j in  this.goodsSpceSku.goodsSkuSaleKeyDtos){
						keyName.push(this.goodsSpceSku.goodsSkuSaleKeyDtos[j].keyName)
						for(let k in saleFieldIds){							
							if(this.goodsSpceSku.goodsSkuSaleKeyDtos[j].id == saleFieldIds[k].split(':')[0]){
								keyName.splice(keyName.indexOf(this.goodsSpceSku.goodsSkuSaleKeyDtos[j].keyName),1)
							}
						}
					}
					this.keyName = keyName.join(' ')
					this.resetStockNumber()
					// 价格查询
					if(!this.keyName){
						let lastId = this.goodsSpceSku.goodsSkuSaleKeyDtos[this.goodsSpceSku.goodsSkuSaleKeyDtos.length-1].id

						for(let k in this.goodsSpceSku.goodsSkuSaleKeyDtos) {
							
							let temp = this.goodsSpceSku.goodsSkuSaleKeyDtos[k] // key 
								let saleFieldIds_temp = JSON.parse(JSON.stringify(saleFieldIds)) 
								
								for(let l in temp.skuDtos){ // 

									for(let i in saleFieldIds){
										if(saleFieldIds[i].split(':')[0] == lastId){
											saleFieldIds_temp[i] = temp.skuDtos[l].id+':'+temp.skuDtos[l].saleName
										} 
									}
									for(let m in this.goodsSpceSku.goodsSkuDTOS){
										let obj = this.goodsSpceSku.goodsSkuDTOS[m]
										let len = obj.saleFieldValue.split(',').length
										
										if(obj.saleFieldValue.split(',').sort().toString() == saleFieldIds_temp.sort().toString() ){ // 改库存
											if( obj.stockNumber == 0 && temp.skuDtos[l].saleName == obj.saleFieldValue.split(',')[len-1].split(':')[1]){
												this.$set(temp.skuDtos[l],'noStorage',true)
											}else{
												this.$set(temp.skuDtos[l],'noStorage',false)
											}
										}

										if(obj.saleFieldValue.split(',').sort().toString() == saleFieldIds.sort().toString()){
											let name = ''
											this.$set(this.operateObj,'goodsId',obj.id)
											this.$set(this.operateObj,'status',obj.status)
											
											for(let k in obj.goodsSkuSaleDto){
												name += obj.goodsSkuSaleDto[k].saleName+' '
											}
											this.setOperate(obj.price,obj.saleImage,obj.stockNumber,name,obj.saleFieldValue)
										}
									}
								}
						}
					}else if(keyName.length <=  1){
						// 进行库存判断	
						/* 
						 *  查询当前选中的，有且只有一项未选中，判断当前类型进行库存判断，设置storage 为 0
						*/
						for(let k in this.goodsSpceSku.goodsSkuSaleKeyDtos) {
							let temp = this.goodsSpceSku.goodsSkuSaleKeyDtos[k]
							// 当前id 不在 选中里
							if(!(saleFieldIds.join(',').indexOf(temp.id)>-1)){
								for(let l in temp.skuDtos){
									let saleFieldIds_temp = saleFieldIds[0]?JSON.parse(JSON.stringify(saleFieldIds)):[] 
									saleFieldIds_temp.push(temp.skuDtos[l].id+':'+temp.skuDtos[l].saleName)
									for(let m in this.goodsSpceSku.goodsSkuDTOS){
										let obj = this.goodsSpceSku.goodsSkuDTOS[m]
										if(obj.saleFieldValue.split(',').sort().toString() == saleFieldIds_temp.sort().toString() ){ // 改库存
											if( obj.stockNumber == 0){
												this.$set(temp.skuDtos[l],'noStorage',true)
											}else{
												this.$set(temp.skuDtos[l],'noStorage',false)
											}
										}

									}

								}
							}
						}
					}
			},
			// 类型切换
			skuChange(item,index,i){
				if(item.noStorage){ // 无库存 不能点击
					return
				}
				let saleFieldIds = this.operateObj.saleFieldIds?this.operateObj.saleFieldIds.split(','):[]

				if(item.flag){
					// 取消选中
					this.goodsSpceSku.goodsSkuSaleKeyDtos[index].skuDtos[i].flag = false
					for(let i in saleFieldIds){
						if(saleFieldIds[i].split(':')[0] == item.id){
							saleFieldIds.splice(i,1)
						} 
					}
				}else{
					// 选中
					for(let k in this.goodsSpceSku.goodsSkuSaleKeyDtos[index].skuDtos){
						this.goodsSpceSku.goodsSkuSaleKeyDtos[index].skuDtos[k].flag = false
					}
					this.goodsSpceSku.goodsSkuSaleKeyDtos[index].skuDtos[i].flag = true
					// 商品id 
					let bol = true
					if(saleFieldIds.length){
						for(let i in saleFieldIds){
							if(saleFieldIds[i].split(':')[0] == item.id){
								bol = false
								saleFieldIds[i] = item.id+':'+item.saleName
							} 
						}
						if(bol){
							saleFieldIds.push(item.id+':'+item.saleName)
						}
					}else{
						saleFieldIds.push(item.id+':'+item.saleName)
					}
				}
				this.operateObj.saleFieldIds = saleFieldIds.join(',')

				this.init()
					
			},
			resetStockNumber(){	// 重置库存
				for(let k in this.goodsSpceSku.goodsSkuSaleKeyDtos) {
					let temp = this.goodsSpceSku.goodsSkuSaleKeyDtos[k]
					for(let l in temp.skuDtos){
						this.$set(temp.skuDtos[l],'noStorage',false)
					}
				}
			},
			// 设置最终结果obj
			setOperate(price,goodsImg,storage,saleFieldValue,saleFieldIds){
				this.operateObj = { ...this.operateObj,
					price,
					goodsImg,
					storage,
					saleFieldValue,
					saleFieldIds:saleFieldIds
				}	
			},
			// 确定
			sureChange(){
				if(this.keyName){
					uni.showToast({  // 未选择
						title: '请选择：'+this.keyName,
						icon: "none"
					})
				}else if(this.operateObj.storage<=0){
					uni.showToast({
						title: '加入购物车的数量大于库存量',
						icon: "none"
					})
				}else{
					let num = this.operateObj.storage*1 >= this.chooseSpec.num*1 ?  this.chooseSpec.num*1 : 1
					this.$emit('changeCart',{...this.operateObj,
						cartId:this.chooseSpec.cartId,
						goodsPrice:this.operateObj.price,
						num:num
					})
					this.$refs.skuPopup.close()
				}	

			},
			closeSkuPopup(){
				this.$refs.skuPopup.close()
			}
		},
		
		
	}
</script>

<style scoped> 
.skuBox{
		width: 100%;
		height: 850rpx;
		min-height: 752rpx;
		/* #ifndef MP-WEIXIN  */
		bottom: 100rpx;
		/* #endif */
		background-color: #FFFFFF;
		position: relative;
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
	.goodsInfo image{
		width: 200rpx;
		height: 200rpx;
		border-radius: 6rpx;
		border: 1px solid #E4E4E4;
		margin-left: 28rpx;
	}
	.goodsSpces{
		width: calc(100% - 264rpx);
		margin-left: 24rpx;
		display: inline-block;
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
	}
	.goodsPrice text{
		font-size: 24rpx;
	}
	.spceBox{
		height: 524rpx;
		width: 100%;
	}
	
	.newSubmit{
		background: #e61446;
		width: 100%;
		font-size: 16px;
		text-align: center;
		color: #fff;
		position: absolute;
		bottom: 2px;
		z-index: 999;
		height: 44px;
		line-height: 44px;
	}
	
</style>
