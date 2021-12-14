<template>
	<view class="policyBox">
		<view class="policyTitle">
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
			<view class="tableContent" v-for="item,index in policyInfo.achievementPolicyList" :key="index">
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
			<view  class="formulaText" v-for="item,index in policyInfo.achievementPolicyList" :key="index">
				<text v-if="index==0"> T{{index+1}} * P{{index+1}} </text>
				<text v-else> + (T{{index+1}} {{-policyInfo.achievementPolicyList[index-1].endAmount}}) * P{{index+1}}</text>
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
		<explain ref="explain"></explain>
	</view>
</template>

<script>
	import explain from '@/components/explain/index.vue'
	export default {
		props:["policyInfo"],
		data(){
			return{
				level:{
					1:"=",
					2:"<",
					3:"≤",
					4:">",
					5:"≥"
				},
			}
		},
		methods:{
			openExplain(title,info){
				this.$refs.explain.openPopup({title,info})
			},
			getPriceString(){
				let string = "";
				console.log(JSON.stringify(this.policyInfo.achievementPolicyList))
				let params = this.policyInfo.achievementPolicyList
				for(let i=0;i<params.length;i++){
					if(1200>params[i].beginAmount){
						if(i==0){
							string += params[i].endAmount+"*"+params[i].firstRewardRate+"% + " 
						}else if(i<params.length-1){
							string += '('+(params[i].endAmount +"-"+ params[i-1].endAmount) +')*'+ params[i].firstRewardRate+"% + "
						}else{
							string += '('+(1200 +"-"+ params[i-1].endAmount) +")*"+ params[i].firstRewardRate +"%"
						}
					}
				}
				return string + "=" + this.getPrice() + "(万元)"
			},
			getPrice(){
				let num = 0;
				let params = this.policyInfo.achievementPolicyList
				for(let i=0;i<params.length;i++){
					if(1200>params[i].beginAmount){
						if(i==0){
							num += params[i].endAmount*params[i].firstRewardRate/100 
						}else if(i<params.length-1){
							num += (params[i].endAmount - params[i-1].endAmount) * params[i].firstRewardRate / 100 
						}else{
							num += (1200 - params[i-1].endAmount) * params[i].firstRewardRate / 100
						}
					}
				}
				return num
			}
		},
		components:{
			explain
		}
	}
</script>

<style scoped>
	.policyBox{
		width: 100%;
		padding: 0 30rpx;
		background-color: #F4F5F6;
		padding-bottom: 40rpx;
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
	.exampleTips{
		font-size: 24rpx;
		font-weight: 500;
		color: #666666;
		line-height: 1.3;
		margin-top: 20rpx;
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
	.upgrade,.policyTable{
		border: 1px solid #CCCCCC;
		border-right: none;
		border-bottom: none;
	}
	.policyTable {
		font-size: 24rpx;
		margin-top: 20rpx;
	}
</style>
