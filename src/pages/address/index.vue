<template>
	<view class="page address">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<scroll-view class="addressParent" scroll-y="true" >
			<view v-for="item,index in list" :key='item.id'>
				<uni-swipe-action>
					<uni-swipe-action-item >
						<template v-slot:right :right-options="options">
							<view class="delAddr" @click="delAddress(item)"><text>刪除</text></view>
						</template>
						<view class="addressInfo">
							<view class="addressCont">
								<view class="consignee">
									<text>{{item.name}}</text>
									<text>{{item.telephone}}</text>
								</view>
								<view class="consigneeAddress ellipsis-two">
									{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.townName}}{{item.address}}
								</view>
							</view>
							<view class="setDefault">
								<view @click="addressDefault(item)">
									<view class="addressRadio" :class="item.isDefault?'active':''"></view>
									<text>{{queryId?"使用该地址":"设为默认"}}</text>
								</view>
								<view @click="$Router.push({path:'/pages/createAddress/index',query:{id:item.id}})">
									<view class="editBtnIcon"></view>
									<text>编辑</text>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view class="noMsg" v-if="!list || !list.length">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/noAddress.png" mode="widthFix"></image>
				<view>暂无数据</view>
			</view>
		</scroll-view>
		<view class="createAddressBtn" @click="goCreateAddress()">新建地址</view>
		<uni-popup ref="popup" type="center">
			<defaultPopup @cancel='cancel' @sure='sure'>
				<view class="hint">
					您确定要删除该地址吗？
				</view>
			</defaultPopup>
		</uni-popup>
	</view>
</template>

<script>
	import defaultPopup from '@/components/defaultPopup/index.vue'
	import memberApi from '@/api/member/index.js'
	export default{
		data(){
			return{
				list:[],	//订单列表
				options:{	//滑动操作配置
					style:{
						width:'200rpx',
						height:'285rpx'
					}
				},
				queryId:'',
				operateItem:"",
				defaultTitleDto:{
					title:'地址管理'
				}
			}
		},
		onUnload() {
			for(let i=0;i<this.list.length;i++){
				if(this.list[i].isDefault){
					uni.setStorageSync("addressInfo",JSON.stringify(this.list[i]))
				}
			}
		},
		methods:{
			addressList(){	//获取订单列表
				memberApi.addressList().then(res=>{
					if(res.data.code==200){
						this.list = res.data.data;
						this.judegAddressFrom()
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.message
						})
					}
				})
			},
			judegAddressFrom(){	//判断地址列表来源 如果是从填写订单页面进来  需要找到下单时的地址 将其标识为使用地址
				if(this.$Route.query.id){
					for(let i=0;i<this.list.length;i++){
						this.list[i].isDefault = 0;
						if(this.list[i].id==this.$Route.query.id){
							this.list[i].isDefault = 1;
						}
					}
				}
			},
			delAddress(item){
				this.operateItem = item;
				this.$refs.popup.open();
			},
			addressDefault(item){	//设为默认地址
				if(this.$Route.query.id){	//当填写订单页面进入选择地址页面时  勾选地址 表明为下单使用地址
					for(let i=0;i<this.list.length;i++){
						this.list[i].isDefault = 0
					}
					item.isDefault = 1;
					this.goBack(1)
					return
				}
				memberApi.addressDefault(item.id).then(res=>{
					if(res.data.code==200){
						for(let i=0;i<this.list.length;i++){
							this.list[i].isDefault=0
						}
						item.isDefault = 1
					}else{
						uni.showToast({
							icon:"none",
							title:res.data.message
						})
					}
				})
			},
			sure(){	//确认事件触发
				this.$refs.popup.close();
				this.removeAddress();
			},
			cancel(){	//取消事件触发
				this.$refs.popup.close();
			},
			removeAddress(){	//删除地址
				memberApi.removeAddress(this.operateItem.id).then(res=>{
					if(res.data.code==200){
						this.addressList()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"nonex"
						})
					}
				})
			},
			goCreateAddress(){	//去往填写订单页
				this.$Router.push({path:'/pages/createAddress/index'})
			}
		},
		onShow() {
			this.zhuge.track("地址管理")
			this.queryId = this.$Route.query.id
			this.addressList()
		},
		components:{
			defaultPopup
		}
	}
</script>

<style scoped>
	.address{
		background-color: #F5F5F5;
	}

	.addressParent{
		height: calc(100vh - 132rpx - constant(safe-area-inset-bottom));
		height: calc(100vh - 132rpx - env(safe-area-inset-bottom));
		/* #ifndef MP-WEIXIN */
		height: calc(100vh - 220rpx - constant(safe-area-inset-bottom));
		height: calc(100vh - 220rpx - env(safe-area-inset-bottom));
		padding-top: 51rpx;
		/* #endif */
	}
	
	.addressInfo{
		width: 100%;
		height: 285rpx;
		background-color: #FFFFFF;
		padding: 37rpx 0 30rpx;
		margin-bottom: 24rpx;
	}
	.addressCont{
		width: 100%;
		padding: 0 40rpx 33rpx 32rpx;
		color: #686868;
		border-bottom: 1px solid #E6E6E6;
	}
	.consignee{
		padding-top: 10rpx;
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	.consigneeAddress{
		padding-top: 19rpx;
		line-height: 35rpx;
	}
	.delAddr{
		width: 200rpx;
		height: 285rpx;
		background-color: #ff1558;
		text-align: center;
		line-height: 285rpx;
		color: #fff;
	}
	.setDefault{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 40rpx 31rpx 32rpx;
	}
	.setDefault view{
		display: flex;
		align-items: center;
	}
	.addressRadio{
		width: 36rpx;
		height: 36rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
		margin-right: 11rpx;
	}
	.addressRadio.active{
		background-image: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png);
	}
	.editBtnIcon{
		width: 31rpx;
		height: 30rpx;
		margin-right: 11rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/edit@2x.png) no-repeat 50%; 
		background-size: 31rpx 30rpx;
	}
	.createAddressBtn{
		width: calc(100% - 60rpx);
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		background-color: #ff1558;
		margin: 20rpx auto;
		border-radius: 71rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		bottom: calc(20rpx + constant(safe-area-inset-bottom));
		bottom: calc(20rpx + env(safe-area-inset-bottom));
		z-index: 1;
	}
	.hint{
		display: flex;
		width: 100%;
		height: 100%;
		color: #333333;
		justify-content: center;
		align-items: center;
	}
	.noMsg{
		width: 360rpx;
		margin: 0 auto;
		text-align: center;
		padding-top: 262rpx;
	}
	.noMsg image{
		width: 360rpx;
	}
	.noMsg view{
		font-size: 30rpx;
		padding-top: 55rpx;
		color: #999999;
	}
</style>
