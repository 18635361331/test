<template>
	<view class="pages">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="center">
			<view class="tab">
				<view :class="tab==0?'active':''" @click="tab=0;getInvoiceDetail()">普通发票</view>
				<view :class="tab==1?'active':''" @click="tab=1;getInvoiceDetail()">专用发票</view>
			</view>
			<view class="form" v-if="tab==0">
				<view class="part">
					<view class="left">
						<text class="red">*</text>企业名称
					</view>
					<input type="text" :disabled="isDisabled" v-model="invoiceDef.title" placeholder="请填写企业名称" placeholder-style="font-weight:400;color: #c1c1c1;"/>
				</view>
				<view class="part">
					<view class="left">
						<text class="red">*</text>纳税人识别号
					</view>
					<input type="text" :disabled="isDisabled" v-model="invoiceDef.taxpayerNo" placeholder="营业执照上的（统一社会代码）" placeholder-style="font-weight:400;color: #c1c1c1;"/>
				</view>
			</view>
			<view class="form" v-else>
				<view class="part">
					<view class="left">
						<text class="red">*</text>企业名称
					</view>
					<input type="text" :disabled="isDisabled" v-model="invoice.title" placeholder="请填写企业名称" placeholder-style="font-weight:400;color: #c1c1c1;"/>
				</view>
				<view class="part">
					<view class="left">
						<text class="red">*</text>纳税人识别号
					</view>
					<input type="text" :disabled="isDisabled" v-model="invoice.taxpayerNo" placeholder="营业执照上的（统一社会代码）" placeholder-style="font-weight:400;color: #c1c1c1;"/>
				</view>
				<view class="part">
					<view class="left">
						<text class="red">*</text>开户银行
					</view>
					<input type="text" :disabled="isDisabled" v-model="invoice.openBank" placeholder="填写开户银行，- -银行- -支行" placeholder-style="font-weight:400;color: #c1c1c1;"/>
				</view>
				<view class="part">
					<view class="left">
						<text class="red">*</text>银行账户
					</view>
					<input type="text" :disabled="isDisabled" v-model="invoice.account" placeholder="开户许可证或法人的银行账户" placeholder-style="font-weight:400;color: #c1c1c1;"/>
				</view>
				<view class="part">
					<view class="left">
						<text class="red">*</text>地址
					</view>
					<input type="text" :disabled="isDisabled" v-model="invoice.address" placeholder="专票要求公司地址"  placeholder-style="font-weight:400;color: #c1c1c1;"/>
				</view>
				<view class="part">
					<view class="left">
						<text class="red">*</text>电话
					</view>
					<input type="number" :disabled="isDisabled" v-model="invoice.telephone" placeholder="专票要求公司电话" placeholder-style="font-weight:400;color: #c1c1c1;" />
				</view>
			</view>
		</view>
		<view class="savePart" v-if="!isDisabled">
			<view @click="judge">保存</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default {
		data() {
			return {
				defaultTitleDto:{
					title:'发票管理',
				},
				tab:0,//切换
				invoice:{
					invoiceType:1,
					title:"",
					taxpayerNo:"",
					address:"",
					telephone:"",
					openBank:"",
					account:""
				},
				invoiceDef:{
					invoiceType:0,
					title:"",
					taxpayerNo:"",
				},
				isDisabled:false
			}
		},
		onShow() {
			this.getInvoiceDetail()
		},
		methods: {
			judge(){	//判断发票类型
				if(this.tab==1){
					for(let i in this.invoice){
						if(!String(this.invoice[i])){
							uni.showToast({
								title:"请检查信息是否填写完整",
								icon:"none"
							})
							return 
						}
					}
					if(this.invoice.id){
						this.updateInvoice(this.invoice)
					}else{
						this.createInvoice(this.invoice)
					}
				}else{
					for(let i in this.invoiceDef){
						if(!String(this.invoiceDef[i])){
							uni.showToast({
								title:"请检查信息是否填写完整",
								icon:"none"
							})
							return 
						}
					}
					if(this.invoiceDef.id){
						this.updateInvoice(this.invoiceDef)
					}else{
						this.createInvoice(this.invoiceDef)
					}
				}
			},	
			createInvoice(params){	//创建发票
				
				memberApi.createInvoice(params).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"创建成功",
							icon:"none"
						})
						this.getInvoiceDetail()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			updateInvoice(params){	//修改发票详情
				memberApi.updateInvoice(params).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"修改成功",
							icon:"none"
						})
						this.getInvoiceDetail()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			getInvoiceDetail(){	//获取发票详情
				uni.showLoading({
					title: '加载中...'
				});
				memberApi.getInvoiceDetail(this.tab).then(res=>{
					uni.hideLoading()
					if(res.data.code==200){
						if(res.data.data){
							if(this.tab==1){
								this.invoice = res.data.data
							}else{
								this.invoiceDef = res.data.data
							}
							this.isDisabled = true
						}else{
							this.isDisabled = false
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 1px;
		/* #endif*/
		margin: 0 auto;
		min-height: 100vh;
		background: #F5F5F5;
	}
	.center{
		width: calc(100% - 38rpx);
		margin: 20rpx auto;
		background: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		.tab{
			height: 90rpx;
			text-align: center;
			&>view{
				width: 50%;
				line-height: 90rpx;
				display: inline-block;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				background: #FAF6F3;
			}
			.active{
				background: #fff;
				font-weight: bold;
			}
		}
	}
	.form{
		padding: 32rpx 30rpx;
		
		.part{
			background: #FCFCFC;
			padding: 0 16rpx;
			display: flex;
			align-items: center;
			height: 70rpx;
			margin-bottom: 16rpx;
			.left{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 36px;
				color: #333333;
				width: 188rpx;
				margin-right: 20rpx;
			}
			.red{
				color: #FF4E54;
				margin-right: 4rpx;
			}
			input{
				// 188 + 20 + 16*2
				width: calc(100% - 240rpx);
				font-size: 24rpx;
				font-weight: bold;
				color: #333;
			}
			.placeholder2 {
				font-size: 24rpx;
				font-weight: 400;
				color: #c1c1c1;
			}
			
		}
	}
	.savePart{
		position: fixed;
		height: calc(124rpx + constant(safe-area-inset-bottom));
		height: calc(124rpx + env(safe-area-inset-bottom));
		width: 100%;
		background: #FFFFFF;
		bottom: 0;
		left: 0;
		padding: 22rpx 24rpx;
		view{
			width: 100%;
			height: 80rpx;
			background: linear-gradient(219deg, #CB6EFF 0%, #7530C1 100%);
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 80rpx;
			color: #FFFFFF;
			text-align: center;
			border-radius: 40rpx;
		}
	}
</style>
