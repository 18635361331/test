<template>
	<view class="page intergraBox">
		<defaultTitle :dto="defaultTitleDto">
			<view class="rule" @click="$Router.push({path:'/pages/tranIntList/index'})">
				转换记录
			</view>
		</defaultTitle>

		<view class="integralHead">
			<view class="integralNum">
				{{crmPonit.crmPoint}}
			</view>
			<view class="intergraBtn">
				积分
			</view>
		</view>
		<view class="interTransform">
			<view class="transformInput">
				<input type="number" v-model="score" placeholderClass="placeholder" :placeholder="'最大可转换贝因美积分'+(crmPonit.crmPointTop?crmPonit.crmPointTop:0)" />
				<text @click='score=crmPonit.crmPointTop'>最大可转换</text>
			</view>
			<view class="sureTransform" @click="sureConvert">确认转换</view>
		</view>
		<view class="transformRule">
			<view class="transformTitle">
				转换规则说明
			</view>
			<view class="transformContent">
				规则规则
			</view>
		</view>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	export default{
		data(){
			return{
				crmPonit:{},
				score:"",
				defaultTitleDto:{
					title:'积分转换',
					bg:'starShopBackWrite.png',
					color:'white'
				}
			}
		},
		methods:{
			pointCrm(){	//获取用户积分
				memberApi.pointCrm().then(res=>{
					if(res.data.code==200){
						this.crmPonit = res.data.data;
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			sureConvert(){	//去转换
				if(this.crmPonit.crmPointTop<this.score){
					uni.showToast({
						title:"您输入的积分超过了最大兑换值",
						icon:"none"
					})
					return
				}
				if(this.score%5!=0){
					uni.showToast({
						title:"转换的积分必须为5的正整数倍",
						icon:"none"
					})
					return
				}
				if(this.score<=0){
					uni.showToast({
						title:"请输入有效的数值",
						icon:"none"
					})
					return
				}
				this.pointConvert()
			},
			pointConvert(){	//确认转换积分
				memberApi.pointConvert(this.score).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"操作成功",
							icon:"none"
						})
						this.score = "";
						this.pointCrm();
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		},
		onShow() {
			this.pointCrm()
		}
	}
</script>

<style scoped>
	.intergraBox{
		width: 100%;
		height: 100vh;
		background: #F5F5F5;
	}
	.rule{
		width: 130rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		padding-right: 10px;
		color: #FFFFFF;
	}
	.integralHead{
		width: 100%;
		height: 450rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/gift_card_headerbg@2x.png) no-repeat 50%;
		background-size: 100% 450rpx;
		padding-top: 130rpx;
	}
	.integralNum{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 72rpx;
		color: #FFFFFF;
	}
	.intergraBtn{
		width: 220rpx;
		height: 60rpx;
		text-align: center;
		margin: 50rpx auto;
		line-height: 56rpx;
		font-size: 34rpx;
		color: #FFFFFF
	}
	.interTransform{
		width: 100%;
		padding: 40rpx 24rpx;
		background-color: #FFFFFF;
		height: 260rpx;
		margin-bottom: 20rpx;
	}
	.transformInput{
		width: 100%;
		display: flex;
	}
	.transformInput input{
		flex: 1;
		background-color: #efefef;
		border-radius: 46rpx;
		height: 72rpx;
		color: #333333;
		padding: 18rpx 42rpx;
	}
	.transformInput text{
		height: 72rpx;
		line-height: 72rpx;
		margin-left: 24rpx;
		color: #FF1558;
	}
	.sureTransform{
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background-color: #FF1558;
		border-radius: 63rpx;
		font-size: 32rpx;
		margin-top: 35rpx;
		color: #FFFFFF;
	}
	.transformRule{
		width: 100%;
		padding: 0 24rpx;
		background-color: #FFFFFF;
	}
	.transformTitle{
		width: 100%;
		text-align: center;
		line-height: 88rpx;
		font-size: 30rpx;
		border-bottom: 1rpx solid #E4E4E4;
	}
	.transformContent{
		padding: 40rpx 30rpx 20rpx;
		min-height: 500rpx;
		color: #999999;
	}
</style>
