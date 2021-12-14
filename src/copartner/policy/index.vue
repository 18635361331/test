<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<!-- <scroll-view scroll-x="true" class="policyList headList">
			<view class="policyBox">
				<view class="policyBigImg" v-for="item,index in params.policyList" :key='index' :style="{height:imageHeight}" @click="change({detail:{current:index}})">
					<image class="policyImage" :src="imgBaseUrls+item.showBgImage" mode="widthFix" @load='imageLoad'></image>
					<view class="bg" v-if="chooseIndex!=index"></view>
				</view>
			</view>
		</scroll-view>
		
		<scroll-view class="policyList" scroll-x="true" >
			 <view class="policyBox">
				<block v-for="item,index in policyList" :key='index'>
					<view class="line" v-if="index!=0"></view>
					<view class="everyPolicy" @click="change({detail:{current:index-1}})" :class="(params.distributorStatus==0?(index==0):(chooseTypeIndex==index))?'active':''">
						<view class="ellipsis-one">
							{{item.distributorTypeName}}
						</view>
						<text v-if="(params.distributorStatus==0?(index==0):(chooseTypeIndex==index))">当前身份</text>
					</view>
				</block>
			 </view>
		</scroll-view>
		<view class="notMeet" v-if="params.distributorStatus==0 && chooseIndex<1">
			<view>
				<image class="lv" :src="imgBaseUrls+'appletsImages/policyLv.png'" mode=""></image>
				正在审理提交成为{{policyList[chooseTypeIndex-1].distributorTypeName}}的申请，请等待~
			</view>
		</view>
		<view class="notMeet" v-else-if="params.distributorStatus!=1 && chooseIndex<1" @click="openMember()">
			<view>
				<image class="lv" :src="imgBaseUrls+'appletsImages/policyLv.png'" mode=""></image>
				您还未到达此级别合伙人，努力升级吧
			</view>
			<view class="applyBtn" v-if="policyList.length">
				去申请
				<image :src="imgBaseUrls+'appletsImages/policyArrowIcon.png'" mode=""></image>
			</view>
		</view>
		<view class="notMeet" v-else-if="params.distributorStatus!=1 && chooseIndex>=1" @click="$Router.push({path:'/copartner/joinPartner/index'})">
			<view>
				<image class="lv" :src="imgBaseUrls+'appletsImages/policyLv.png'" mode=""></image>
				您还未到达此级别合伙人，需先成为区域合伙人
			</view>
		</view>
		<view class="notMeet" v-else-if="chooseTypeIndex<chooseIndex+1">
			<view>
				<image class="lv" :src="imgBaseUrls+'appletsImages/policyLv.png'" mode=""></image>
				您还未到达此级别合伙人，努力创业绩吧~
			</view>
		</view>
		<view class="elevator">
			<view v-for="v,index in elevator" :key="index" :class="index==0?'active':''" @click="getTop(v.name)">{{v.title}}</view>
		</view>
		<view class="paddingPolicy" v-if="params.policyList[chooseIndex]" :class="params.distributorStatus!=1 && chooseIndex==0?'hasBtn':''">
			<view class="policyTitle openingConditions">
				开通条件
			</view>
			<view class="openImage">
				<image :src="imgBaseUrls+params.policyList[chooseIndex].openConditionImage" mode="widthFix"></image>
			</view>
			<view class="policyTitle liftingRules">
				升降规则<text>(系统将于年度评定周期完结次日自动更新合伙人身份)</text>
			</view>
			<view class="upgrade">
				<view class="tableTitle tableHead">
					<view class="tableTd taps" @click="openExplain('考核周期','自成为合伙人日期起至下一年同日为一个“年度评定周期”，周期内对合伙人业绩进行考核升级，如果提前达到可以提前升级至更高等级合伙人。')">
						<text>考核周期</text>
						<text class="rewardIcon"></text>
					</view>
					<view class="tableTd tableTaps taps" @click="openExplain('销售业绩','合伙人以及发展的下一级合伙人在平台的所有采购金额及已付货款定金金额总和')">
						<text>销售业绩(万)</text>
						<text class="rewardIcon"></text>
					</view>
					<view class="tableTd">
						身份变更
					</view>
				</view>
				<view class="tableTitle" v-for="item,index in params.upgradeList" :key="index">
					<view class="tableTd">
						年度评定周期
					</view>
					<view class="tableTd tableTaps">
						{{(item.demotionAmount/10000).toFixed(0)}} < S ≤ {{item.upgradeAmount=="99999999"?"∞":(item.upgradeAmount/10000).toFixed(0)}}
					</view>
					<view class="tableTd">
						{{item.distributorTypeName}}
					</view>
				</view>
			</view>
			<view class="welfarePolicy">
				<view class="leftPolicy"></view>
				<text>福利政策</text>
				<view class="rightPolicy"></view>
			</view>
			<view class="pricePolicy">
				价格政策
			</view>
			<view class="pricePoliceBg">
				<view class="priceInfo">
					<text>{{params.policyList[chooseIndex].priceDiscount}}</text>
					<view>折</view>
					商品正价折扣
				</view>
			</view>
			<view class="policyTitle resultsPolicy">
				业绩政策
			</view>
			<view class="resultsPolicyText">
				年采购额数值达到不同的阶梯等级，超出该等级最低达成值的年采购将按该等级对应的返利比率返利；年采购额若未达最低达成值T1，则无法获得业绩返利
			</view>
			<view class="policyTable">
				<view class="tableContent tablesTitle">
					<view class="tableTds tableLevel">
						阶梯等级
					</view>
					<view class="tableTds tableRange taps" @click="openExplain('年采购额范围','合伙人账户在年度考核周期内在平台的所有采购金额及已付货款定金金额总和')">
						<text>年采购额范围T(万元)</text>
						<text class="rewardIcon"></text>
					</view>
					<view class="tableMerge">
						<view class="tableMergeMain taps" @click="openExplain('返利比率','根据年采购额达到不同等级范围，每个等级均按对应返利百分比进行业绩返利，首年返利更高')">
							<text>返利比率p</text>
							<text class="rewardIcon"></text>
						</view>
						<view class="tableRatio">
							首年比率P'
						</view>
						<view class="tableRatio">
							非首年比率P
						</view>
					</view>
					
				</view>
				<view class="tableContent" v-for="item,index in params.policyList[chooseIndex].achievementConfigList" :key="index">
					<view class="tableTds tableLevel">
						{{item.name}}
					</view>
					<view class="tableTds tableRange">
						{{item.beginAmount}} {{level[item.beginType]}} T {{level[item.endType]}} {{item.endAmount=="99999999"?"∞":item.endAmount}}
					</view>
					<view class="tableRatio">p' = {{item.firstRewardRate}}%</view>
					<view class="tableRatio">
						p = {{item.rewardRate}}%
					</view>
				</view>
			</view>
			<view class="formulaTitle">
				业绩返利公式
			</view>
			<view class="formula">
				S = 
				<view  class="formulaText" v-for="item,index in params.policyList[chooseIndex].achievementConfigList" :key="index">
					<text v-if="index==0"> T{{index+1}} * P{{index+1}} </text>
					<text v-else> + (T{{index+1}} {{-params.policyList[chooseIndex].achievementConfigList[index-1].endAmount}}) * P{{index+1}}</text>
				</view>
			</view>
			<view class="formulaInfo">
				(业绩政策返利比率首年为Px'，非首年为Px)
			</view>
			<view class="example">
				例：合伙人首年年采购额为1200万元，按上述返利公式及参数表，合伙人可获得返利金额为74.2万元
			</view>
			<view class="exampleTips">
				S = {{getPriceString()}}
			</view>
			<view class="tips">
				Tips:
			</view>
			<view class="dottedLine">
				<view>
					1、返利金额可以在下次下采购订单中全额抵扣；
				</view>
				<view>
					2、返利金额支持提现，但提现需提供发票并扣除提现额的5%（服务费+税点）。
				</view>
			</view>
			
			<view class="policyTitle">
				奖励政策
			</view>
			<imageList v-if="updateImageFlag" :imageList="params.policyList[chooseIndex].rewardPolicyList" type="rewardPolicyList" @updateImage="updateImage"></imageList>
			<view class="policyTitle">
				教育政策
			</view>
			<imageList v-if="updateImageFlag" :imageList='params.policyList[chooseIndex].educationPolicyList' type="educationPolicyList" @updateImage="updateImage"></imageList>
			<view class="policyTitle">
				品牌政策
			</view>
			<imageList v-if="updateImageFlag" :imageList='params.policyList[chooseIndex].brandPolicyList' type="brandPolicyList" @updateImage="updateImage"></imageList>
			<view class="policyTitle">
				退换货政策
			</view>
			<view class="openImage">
				<block v-if="params.policyList[chooseIndex].returnExchangePolicy">
					<image :src="imgBaseUrls+params.policyList[chooseIndex].returnExchangePolicy.coverImage" mode="widthFix"></image>
				</block>
			</view>
			<view class="policyTitle">
				退出政策
			</view>
			<view class="openImage">
				<block v-if="params.policyList[chooseIndex].quitPolicy">
					<image :src="imgBaseUrls+params.policyList[chooseIndex].quitPolicy.coverImage" mode="widthFix"></image>
				</block>
			</view>
		</view>
		
		<explain ref="explain"></explain> -->
		<!--  && chooseIndex==0" -->
		<view class="btmBtn"  v-if="(params==2 || params===null)">
			<view class="openBtn" @click="openMember">申请开通</view>
		</view>
		<image :src="imgBaseUrls+'appletsImages/partnerPolicyBg1.jpeg'" mode="widthFix"></image>
	</view>
</template>

<script>
	import appApi from '@/api/app/index.js'
	// import imageList from './imageList/index.vue'
	// import explain from '@/components/explain/index.vue'
	
	export default {
		data(){
			return{
				defaultTitleDto:{
					title:"合伙人政策"
				},
				userInfo:"",
				// params:{policyList:[]},
				// policyList:[],	//渠道
				// imgBaseUrls:this.$config.imgBaseUrl,
				// chooseIndex:0,	//轮播图选中下标
				// chooseTypeIndex:0,	//合伙人选中下标
				// level:{
				// 	1:"=",
				// 	2:"<",
				// 	3:"≤",
				// 	4:">",
				// 	5:"≥"
				// },
				// userInfo:{},
				// scrollTop:0,// 高度变量
				// updateImageFlag:true,
				// elevator:[//电梯组件
				// 	{
				// 		title:'开通条件',
				// 		name:'openingConditions',
				// 		top:'',
				// 	},
				// 	{
				// 		title:'升降规则',
				// 		name:'liftingRules',
				// 		top:'',
				// 	},
				// 	{
				// 		title:'价格政策',
				// 		name:'pricePolicy',
				// 		top:'',
				// 	},
				// 	{
				// 		title:'业绩政策',
				// 		name:'resultsPolicy',
				// 		top:'',
				// 	}
				// ],
				params:null,
				imgBaseUrls:""
			}
		},
		methods:{
			// imageLoad(e){
			// 	let view = uni.createSelectorQuery().in(this).select('.policyBigImg');
			// 	view.boundingClientRect(data=>{
			// 		console.log(data.width)
			// 		this.imageHeight = Number(data.width/e.detail.width*e.detail.height).toFixed(0)+"px"
			// 	}).exec();
			// },
			// change(params){	//轮播图切换时跟新头部颜色
			// 	let chooseIndex = params?params.detail.current:0
			// 	if(chooseIndex>=0){
			// 		this.chooseIndex  = chooseIndex
			// 		this.updateImageFlag = false;
			// 		this.$nextTick(()=>{
			// 			this.updateImageFlag = true;
			// 		})
			// 	}
			// },
			// getPrivileges(){
			// 	appApi.getPrivileges().then(res=>{
			// 		if(res.data.code==200){
			// 			this.params = res.data.data;
			// 			this.policyList.splice(0);
			// 			this.policyList.push({
			// 				distributorTypeName:"非合伙人"
			// 			});
			// 			this.chooseTypeIndex = 0;
			// 			this.updateImageFlag = false;
			// 			this.$nextTick(()=>{
			// 				this.updateImageFlag = true;
			// 			})
			// 			for(let i=0;i<this.params.policyList.length;i++){
			// 				if(this.params.policyList[i].distributorTypeId==res.data.data.distributorTypeId){
			// 					this.chooseTypeIndex = i+1;
			// 					this.chooseIndex = i
			// 				}
			// 				this.policyList.push({distributorTypeName:this.params.policyList[i].distributorTypeName})
			// 			}
			// 		}else{
			// 			uni.showToast({
			// 				title:res.data.message,
			// 				icon:"none"
			// 			})
			// 		}
			// 	})
			// },
			// getPriceString(){	//
			// 	let string = "";
			// 	let params = this.params.policyList[this.chooseIndex].achievementConfigList
			// 	for(let i=0;i<params.length;i++){
			// 		if(1200>params[i].beginAmount){
			// 			if(i==0){
			// 				string += params[i].endAmount+"*"+params[i].firstRewardRate+"% + " 
			// 			}else if(i<params.length-1){
			// 				string += '('+(params[i].endAmount +"-"+ params[i-1].endAmount) +')*'+ params[i].firstRewardRate+"% + "
			// 			}else{
			// 				string += '('+(1200 +"-"+ params[i-1].endAmount) +")*"+ params[i].firstRewardRate +"%"
			// 			}
			// 		}
			// 	}
			// 	return string + "=" + this.getPrice() + "(万元)"
			// },
			// getPrice(){
			// 	let num = 0;
			// 	let params = this.params.policyList[this.chooseIndex].achievementConfigList
			// 	for(let i=0;i<params.length;i++){
			// 		if(1200>params[i].beginAmount){
			// 			if(i==0){
			// 				num += params[i].endAmount*params[i].firstRewardRate/100 
			// 			}else if(i<params.length-1){
			// 				num += (params[i].endAmount - params[i-1].endAmount) * params[i].firstRewardRate / 100 
			// 			}else{
			// 				num += (1200 - params[i-1].endAmount) * params[i].firstRewardRate / 100
			// 			}
			// 		}
			// 	}
			// 	return num
			// },
			// updateImage(type,imageList){
			// 	this.params.policyList[this.chooseIndex][type] = imageList
			// },
			// getTop(name){ // 获取元素top
			// 	uni.createSelectorQuery().select('.'+name).boundingClientRect(data=>{//目标位置的节点：类或者id
			// 		uni.pageScrollTo({
			// 			duration: 0,
			// 			scrollTop: data.top  + this.scrollTop
			// 		})
			// 	}).exec();
			// },
			openMember(){
				if(uni.getStorageSync("sessionId")){
					this.$Router.push({path:'/copartner/joinPartner/index'})
				}else{
					this.$Router.push({
						path:"/pages/login/index"
					})
				}
			},
			distributorStatus(){
				appApi.distributorStatus().then(res=>{
					if(res.data.code==200){
						this.params = res.data.data
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
			// openExplain(title,info){
			// 	this.$refs.explain.openPopup({title,info})
			// },
		},
		onLoad() {
		},
		onShow() {
			this.imgBaseUrls = this.$config.imgBaseUrl;
			// this.userInfo = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")):{}
			// this.getPrivileges();
			if(uni.getStorageSync("sessionId")){
				this.distributorStatus()
			}
		},
		onPageScroll(res) {
			// this.scrollTop = res.scrollTop
		},
		mounted() {
			
		},
		components:{
			// imageList,
			// explain
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
		background: #FFFFFF;
	}
	/* .policyList{
		width: 100%;
		height: 100rpx;
	}
	.headList{
		height: 260rpx;
		margin-bottom: 30rpx;
	}
	.policyBox{
		display: flex;
		align-items: center;
		width: calc(100% - 60rpx);
		margin: 0 auto;
	}
	.policyBigImg{
		position: relative;
		width: 210rpx;
		margin-right: 20rpx;
	}
	.policyBigImg .bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		display: block;
		border-radius: 20rpx;
	}
	.policyImage{
		width: 100%;
		height: 100%;
	}
	
	
	
	.line{
		width: 30rpx;
		min-width: 30rpx;
		height: 2rpx;
		background-color: #F3F4F5;
	}
	.everyPolicy{
		min-width: 150rpx;
		width: 150rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		background-color: #F3F4F5;
		color: #999999;
		border-radius: 20px;
		font-size: 24rpx;
		position: relative;
	}
	.everyPolicy .ellipsis-one{
		text-align: center;
	}
	.everyPolicy.active{
		background: #FFC825;
		color: #FFFFFF;
	}
	.everyPolicy.active text{
		color: #999999;
	}
	.everyPolicy text{
		position: absolute;
		bottom: -50rpx;
		left: 0;
		right: 0;
		margin: auto;
	}
	.notMeet{
		width: calc(100% - 60rpx);
		height: 60rpx;
		background-color: #FFF3E0;
		border-radius: 34rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		padding: 0 20rpx;
		color: #D5902E;
	}
	.lv{
		width: 30rpx;
		height: 25rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}
	.elevator{
		width: 100%;
		border-bottom: 1px solid #F3F4F5;
		display: flex;
		font-size: 24rpx;
		font-weight: 400;
		color: #666666;
		margin: 30rpx 0;
		padding-bottom: 14rpx;
	}
	.elevator view{
		width: 25%;
		text-align: center;
		position: relative;
	}
	.elevator view:not(:last-child){
		border-right: 1px solid #F3F4F5;
	}
	.elevator .active{
		color: #FE325C;
		font-size: 30rpx;
		font-weight: 700;
	}
	.elevator .active::after{
		content:'';
		position: absolute;
		width: 112rpx;
		height: 10rpx;
		background: #FE325C;
		border-radius: 2rpx;
		bottom: -14rpx;
		left: 50%;
		border-radius: 40rpx;
		transform: translateX(-50%);
	}
	.applyBtn{
		color: #E88140;
	}
	.applyBtn image{
		width: 11rpx;
		height: 18rpx;
		margin-left: 10rpx;
	}
	.policyTitle{
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		color: #000000;
		font-size: 32rpx;
		font-weight: 700;
	}
	.paddingPolicy{
		width: calc(100% - 60rpx);
		margin: 0 auto;
		padding-bottom: 10rpx;
	}
	.paddingPolicy.hasBtn{
		padding-bottom: 150rpx;
	}
	.policyTitle text{
		color: #666666;
		font-size: 20rpx;
		margin-left: 20rpx;
	}
	.openImage{
		margin: 20rpx auto 30rpx;
	}
	.upgrade{
		margin: 20rpx auto 0;
	}
	.upgrade,.policyTable{
		border: 1px solid #CCCCCC;
		border-right: none;
		border-bottom: none;
	}
	.policyTable {
		font-size: 24rpx;
		margin-top: 20rpx;
	}
	.formulaTitle{
		font-size: 28rpx;
		color: #333333;
		margin: 20rpx 0;
	}
	.formulaInfo{
		font-size: 26rpx;
		font-weight: 500;
		color: #666666;
		margin: 20rpx 0;
	}
	.formula{
		font-size: 24rpx;
		font-weight: 600;
		color: #000000;
		margin: 8rpx 0;
	}
	.formulaText {
		display: inline-block;
	}
	.example{
		font-size: 28rpx;
		color: #333333;
		line-height: 1.3;
	}
	.exampleTips{
		font-size: 24rpx;
		font-weight: 500;
		color: #666666;
		line-height: 1.3;
		margin-top: 20rpx;
	}
	.tableTitle{
		border-bottom: 1rpx solid #CCCCCC;
		display: flex;
	}
	.tableHead{
		background: #F3F4F5;
	}
	.tableTd{
		width:33.33%;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
	}
	.tableTaps{
		width: 50%;
	}
	.policyTable .tableTd{
		color: #666666;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-color: #D8D8D8;
	}
	.welfarePolicy{
		width: 100%;
		margin-top: 20rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.leftPolicy,.rightPolicy{
		width: 170rpx;
		height: 20rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/welfarePolicy.png);
		background-size: 100% 100%;
	}
	.rightPolicy{
		transform: rotate(180deg);
	}
	.welfarePolicy text{
		margin: 0 30rpx;
		font-size: 32rpx;
		color: #BF9068;
	}
	.pricePolicy{
		color: #B29071;
		font-size: 32rpx;
		font-weight: 500;
		margin-bottom: 20rpx;
	}
	.pricePoliceBg{
		width: 100%;
		height: 100rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/discount.png);
		background-size: 100% 100%;
		margin-bottom: 30rpx;
	}
	.tips{
		font-size: 28rpx;
		color: #BF9461;
		margin: 20rpx 0;
	}
	.dottedLine{
		padding: 20rpx;
		border: 1rpx dashed #BF9461;
		background: #FAF6F3;
		border-radius: 5px;
		margin-bottom: 30rpx;
		font-size: 26rpx;
		color: #666666;
	}
	.priceInfo{
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		color: #663F0A;
		padding-left: 56rpx;
		font-size: 28rpx;
		font-weight: 600;
	}
	.priceInfo text{
		font-size: 40rpx;
		font-weight: 600;
		color: #663F0A;
	}
	.priceInfo view{
		font-size: 24rpx;
		margin: 0 10rpx;
	}
	.resultsPolicyText{
		font-size: 28rpx;
		color: #333333;
		margin-top: 20rpx;
	}
	
	.tableContent{
		width: 100%;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		display: flex;
		border-bottom: 1rpx solid #CCCCCC;
	}
	.tablesTitle{
		height: 120rpx;
		line-height: 120rpx;
		font-size: 26rpx;
		color: #333;
		font-weight: 500;
	}
	.tableLevel{
		width: 110rpx;
		min-width: 110rpx;
	}
	.tableMerge{
		display: flex;
		flex-wrap: wrap;
	}
	.tableMergeMain{
		width: 100%;
		border-bottom: 1rpx solid #CCCCCC;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
	}
	.tableTds,.tableMergeMain,.tableRatio,.tableTd{
		border-right: 1rpx solid #CCCCCC;
	}
	.tableRange{
		width: 290rpx;
		min-width: 290rpx;
	}
	.taps text,.rewardIcon{
		display: inline-block;
		vertical-align: middle;
	}
	.rewardIcon{
		width: 30rpx;
		height: 30rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/rewardIcon.png);
		background-size: 100% 100%;
		margin-left: 8rpx;
		position: relative;
		padding: 16rpx;
	}
	.tableRatio{
		width: 50%;
		line-height: 60rpx;
		height: 60rpx;
	} */
	.btmBtn{
		width: 100%;
		height: 128rpx;
		position: fixed;
		bottom: 0rpx;
		display: flex;
		align-items: center;
		z-index: 10;
		justify-content: center;
	}
	.openBtn{
		width: calc(100% - 60rpx);
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #663F0A;
		background: linear-gradient(127deg, #FFE8CA 0%, #E6BA78 100%);
		text-align: center;
	}
	image{
		display: block;
	}
</style>
