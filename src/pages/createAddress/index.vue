<template>
	<view class="page address">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="createAddress">
			<view class="everyBox">
				<text>收货人：</text>
				<input class="whereAddress" type="text" v-model="params.name" />
			</view>
			<view class="everyBox">
				<text>联系方式：</text>
				<input class="whereAddress" type="text" v-model="params.telephone" />
			</view>
			<view class="everyBox" @click="openAddress">
				<text>所在地区：</text>
				<text class="whereAddress ellipsis-one" v-if="params.provinceName">{{params.provinceName}}{{params.cityName}}{{params.districtName}}{{params.townName}}</text>
				<text class="whereAddress" v-else>选择所在区域</text>
				<view class="arrow"></view>
			</view>
			<view class="everyBox">
				<text>详细地址：</text>
				<input class="whereAddress detailed" placeholder="请输入详细地址" placeholderClass="placeholder" type="text" v-model="params.address" />
			</view>
			<view class="everyBox defaultBtn">
				<text>设为默认地址</text>
				 <switch color="#ff1558" @change='switchChange' :checked="params.isDefault?true:false" />
			</view>
			<view class="addressHint">每次下单时会使用该地址</view>
		</view>
		<view class="saveAddress" @click="saveAddress">保存地址</view>
		<uni-popup ref="addressPopup" type="bottom">
			<view class="addressPopup">
				<view class="addressPopupTitle">
					<text>请选择所在地区</text>
					<text class="cancel" @click="closeAddPopup">取消</text>
				</view>
				<view class="createAddressBox">
					<selectAddress :defaultAddress='params' @addressChange='addressChange'></selectAddress>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js';
	import selectAddress from '@/common/model/selectAddress.vue'
	export default{
		data(){
			return{
				params:{
					
				},
				defaultTitleDto:{
					title:'收货地址',
					bottomColor:'#E6E6E6'
				}
			}
		},
		onShow() {
			this.zhuge.track("创建地址")
			uni.setNavigationBarTitle({
				title:this.$Route.query.id?'编辑收货地址':'新建收货地址'
			})
			this.defaultTitleDto.title = this.$Route.query.id?'编辑收货地址':'新建收货地址'
			if(this.$Route.query.id){
				this.addressDetails()
			}
		},
		methods:{
			addressDetails(){	//获取地址详情
				memberApi.addressDetails(this.$Route.query.id).then(res=>{
					if(res.data.code==200){
						this.params = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			saveAddress(){	//保存地址
				if(!this.params.name){
					uni.showToast({
						icon:"none",
						title:"请填写收货人姓名"
					})
					return;
				}
				if(!this.checkTextLength(this.params.name)){
					uni.showToast({
						icon:"none",
						title:"收货人姓名长度最多为50位中文，100个字符"
					})
				  return;
				}
				if(!(/^\d{11}$/.test(this.params.telephone))){
					uni.showToast({
						icon:"none",
						title:"请填写正确的手机号"
					})
				  return;
				}
				if(!this.params.address){
					uni.showToast({
						icon:"none",
						title:"请填写详细收货地址"
					})
					return;
				}
				if(this.params.address.length<5||this.params.address.length>100){
					uni.showToast({
						icon:"none",
						title:"详细地址信息需填写5-100个字符"
					})
				  return;
				}
				for(let i in this.params){
					if(!this.params[i]){
						delete this.params[i]
					}
				}
				if(this.$Route.query.id){
					this.addressUpdate()
				}else{
					this.addressCreate()
				}
			},
			addressUpdate(){	//更新地址
				memberApi.addressUpdate(this.params).then(res=>{
					if(res.data.code==200){
						this.goBack(1)
					}else{
						uni.showToast({
							icon:"none",
							title:res.data.message
						})
					}
				})
			},
			addressCreate(){	//创建地址
				memberApi.addressCreate(this.params).then(res=>{
					if(res.data.code==200){
						this.goBack(1)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			checkTextLength(val) {	//判断字符长度
				let bytes = 0
				for (let i = 0; i < val.length; i++, ++bytes) {
					if (val.charCodeAt(i) > 255) {
						++bytes
					}
				}
				return bytes
			},
			switchChange(e){	//默认地址选中状态的变更
				this.params.isDefault = e.target.value?1:0
			},
			openAddress(){	//打开地址选择弹窗	
				this.$refs.addressPopup.open();
			},
			closeAddPopup(){	//关闭地址选择弹窗
				this.$refs.addressPopup.close();
			},
			addressChange(item){	//地址更改时触发
				for(let i in item){
					this.$set(this.params,i,item[i])
				}
				this.$refs.addressPopup.close();
			}
		},
		components:{
			selectAddress
		}
	}
</script>

<style scoped>
	.address{
		background-color: #F5F5F5;
		height: 100vh;
	}
	.collectTitle{
		position: relative;
	}
	
	.createAddress{
		width: 100%;
		padding-bottom: 24rpx;
	}
	.everyBox{
		width: 100%;
		height: 115rpx;
		line-height: 115rpx;
		position: relative;
		padding-left: 28rpx;
		display: flex;
		color: #686868;
		align-items: center;
		border-bottom: 1px solid #E4E4E4;
		background-color: #FFFFFF;
	}
	.everyBox input{
		font-size: 28rpx;
	}
	.whereAddress{
		flex: 1;
		overflow: hidden;
	}
	.arrow{
		width: 76rpx;
		height: 32rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rightArrow.png) no-repeat 50%;
		background-size: 12rpx 24rpx;
	}
	.defaultBtn{
		justify-content: space-between;
		padding-right: 20rpx;
	}
	.addressHint{
		width: 100%;
		height: 24rpx;
		color: #9b9b9b;
		padding-top: 10rpx;
		padding-left: 31rpx;
	}
	.saveAddress{
		width: calc(100% - 60rpx);
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		background-color: #ff1558;
		margin: 20rpx auto;
		border-radius: 71rpx;
		margin-top: 100rpx;
		color: #FFFFFF;
		font-size: 36rpx;
	}
	.detailed{
		padding-right: 30rpx;
	}
	.addressPopup{
		width: 100%;
		height: 840rpx;
		background-color: #FFFFFF;
	}
	.addressPopupTitle{
		display: flex;
		justify-content: space-between;
		padding:  0 20rpx;
		height: 88rpx;
		align-items: center;
		border-bottom: 1px solid #E6E6E6;
	}
	.cancel{
		color: rgb(153,153,153);
	}
	.createAddressBox{
		height: calc(100% - 88rpx);
	}
</style>
