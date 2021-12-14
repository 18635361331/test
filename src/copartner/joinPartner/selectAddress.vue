<template>
	<view class="page chooseAddress">
		<!-- 兼容h5  h5不使用不调用计算属性  只有微信小程序可以删除这一行 -->
		<view class="opacity">{{defaultAddressa}}</view>
		<view class="selectTitle">
			<view class="everyChoose" v-for="item,index in selectedItems" :class="tabIndex==index?'active':''" :key='item.id'  @click="tabChange(index)">
				{{item.fullName}}
			</view>
			<view class="chooseBtn" :class="tabIndex === selectedItems.length?'active':''" v-if="level > selectedItems.length">请选择</view>
		</view>
		<scroll-view class="addrContainer" scroll-y=true>
			<view class="addressList" v-if="tabIndex==0" @click="chooseAddr(0,item)" :class="{'active': selectedItems[tabIndex] && (selectedItems[tabIndex].fullName === item.fullName)}"  v-for="item,index in provinceList" :key='index'>
				<view>{{item.fullName}}</view>
				<view class="chooseIcon" v-if="selectedItems[tabIndex] && (selectedItems[tabIndex].fullName === item.fullName)"></view>
			</view>
			<view class="addressList" v-if="tabIndex==1" @click="chooseAddr(1,item)" :class="{'active': selectedItems[tabIndex] && (selectedItems[tabIndex].fullName === item.fullName)}"  v-for="item,index in cityList" :key='index'>
				<view>{{item.fullName}}</view>
				<view class="chooseIcon" v-if="selectedItems[tabIndex] && (selectedItems[tabIndex].fullName === item.fullName)"></view>
			</view>
			<view class="addressList" v-if="tabIndex==2" @click="chooseAddr(2,item)" :class="{'active': selectedItems[tabIndex] && (selectedItems[tabIndex].fullName === item.fullName)}"  v-for="item,index in districtList" :key='index'>
				<view>{{item.fullName}}</view>
				<view class="chooseIcon" v-if="selectedItems[tabIndex] && (selectedItems[tabIndex].fullName === item.fullName)"></view>
			</view>
			<view class="addressList" v-if="tabIndex==3" @click="chooseAddr(3,item)" :class="{'active': selectedItems[tabIndex] && (selectedItems[tabIndex].fullName === item.fullName)}"  v-for="item,index in townList" :key='index'>
				<view>{{item.fullName}}</view>
				<view class="chooseIcon" v-if="selectedItems[tabIndex] && (selectedItems[tabIndex].fullName === item.fullName)"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js';
	export default{
		props:["defaultAddress"],
		data(){
			return{
				selectedItems:[],	//选中的地址列表
				provinceList:[],	//一级地址列表
				cityList:[],	//二级地址列表
				districtList:[],	//三级地址列表
				townList:[],	//四级地址列表
				tabIndex:"",	//选中的下标
				level:3		//地址为3级还是4级
			}
		},
		methods:{
			async setDefaultData(){
				await this.chooseAddr(0,{id:this.defaultAddress.provinceId,fullName:this.defaultAddress.provinceName},true)
				await this.chooseAddr(1,{id:this.defaultAddress.cityId,fullName:this.defaultAddress.cityName},true)
				await this.chooseAddr(2,{id:this.defaultAddress.districtId,fullName:this.defaultAddress.districtName},true)
				if(this.defaultAddress.townId){
					await this.chooseAddr(3,{id:this.defaultAddress.townId,fullName:this.defaultAddress.townName},true)
				}
				this.tabIndex = this.tabIndex - 1
			},
			async provices(){	//获取一级地址列表
				await appApi.appProvices().then(res=>{
					if(res.data.code==200){
						this.provinceList = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			async cities(id){	//获取二级地址
				await appApi.appCities(id).then(res=>{
					if(res.data.code==200){
						this.cityList = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			async counties(id){	//获取三级地址
				await appApi.appCounties(id).then(res=>{
					if(res.data.code==200){
						this.districtList = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			async chooseAddr(index,item,flag){	//点击事件触发
				switch(index) {
					case 0:
						await this.cities(item.id);
					break;
					case 1:
						await this.counties(item.id);
					break;
				}
				this.selectedItems.splice(index,1,item);
				this.selectedItems.splice(index+1);
				this.tabIndex = index+1;
				if(index==this.level-1 && !flag){
					let params = {
						provinceName:this.selectedItems[0].fullName,
						provinceId:this.selectedItems[0].id,
						cityName:this.selectedItems[1].fullName,
						cityId:this.selectedItems[1].id,
						districtName:this.selectedItems[2].fullName?this.selectedItems[2].fullName:"",
						districtId:this.selectedItems[2].id?this.selectedItems[2].id:"",
					}
					this.$emit('addressChange',params)
				}
			},
			tabChange(index){	//顶部地址切换时触发
				this.tabIndex = index;
			}
		},
		computed:{
			defaultAddressa(){
				if(this.defaultAddress.provinceId){
					this.setDefaultData();
				}
				return this.defaultAddress.provinceId
			}
		},
		mounted() {
			this.provices();
		}
	}
</script>

<style scoped>
	.chooseAddress{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		padding-left: 24rpx;
	}
	.selectTitle{
		width: 100%;
		height: 98rpx;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
	}
	.everyChoose,.addressList{
		line-height: 98rpx;
		height: 98rpx;
		margin-right: 34rpx;
		overflow: hidden;
	}
	.everyChoose{
		max-width: 20%;
	}
	.addressList{
		border-bottom: 1px solid #E6E6E6;
		color: #999999;
	}
	.addressList.active{
		color: #FF1558;
		position: relative;
	}
	.chooseBtn{
		line-height: 98rpx;
		color: #FF1558;
		height: 98rpx;
		margin-right: 36rpx;
	}
	.chooseBtn.active{
		/* border-bottom: 2http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/558; */
	}
	.chooseIcon{
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/static/unfollow.png) no-repeat 50%;
		background-size: 27rpx 18rpx;
		width: 27rpx;
		height: 18rpx;
		position: absolute;
		right: 20rpx;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	.addrContainer{
		height: calc(100% - 100rpx);
	}
	.everyChoose.active{
		border-bottom: 2px solid #FF1558;
	}
	.opacity{
		width: 0;
		height: 0;
		opacity: 0;
		font-size: 0;
	}
</style>
