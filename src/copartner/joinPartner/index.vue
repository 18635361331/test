<template>
	<view class="page commonPageTitle">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>
		<view class="joinPartner"></view>
		<view class="openProcess">
			<view class="openTitle">
				开通流程：
			</view>
			<view class="everyProcess">
				<view class="everyTip">确认合作模式</view>
				<view class="everyLine"></view>
				<view class="everyTip">签订合作协议</view>
				<view class="everyLine"></view>
				<view class="everyTip">开通合伙人</view>
			</view>
			<view class="openTitle">
				开通说明：
			</view>
			<view class="openExplain">
				提交材料务必确保其真实性，提交申请后平台将于1-2工作日内进行合作资质审理，审理通过后将以短信或商务联系形式告知
			</view>
			<view class="agreement">
				<image @click="agreementFlag=!agreementFlag" v-if="agreementFlag" :src="imgBaseUrls+'appletsImages/agreementFlag.png'" mode=""></image>
				<image @click="agreementFlag=!agreementFlag" v-else :src="imgBaseUrls+'appletsImages/agreementFlag1.png'" mode=""></image>
				我已阅读并同意<view class="agreementText" @click="openPopup">《文器库平台
				<text v-for="item,index in partnerConfig" v-if="item.applyFlag && params.distributorTypeId==item.id" :key='index'>{{item.name}}</text>
				协议》</view >
			</view>
		</view>
		<view class="partnerTab">
			<view class="everyTab" :class="{'active':params.distributorTypeId==item.id}" v-if="item.applyFlag" v-for="item,index in partnerConfig" :key='index' @click="params.distributorTypeId=item.id;partnerName=item.name;distributorAgreement()">
				{{item.name}}
			</view>
		</view>
		<view class="partnerInfo">
			<view class="everyInfo">
				<view class="fixedInfo">
					发展区域<text>*</text>
				</view>
				<view class="partnerAdd ellipsis-one" v-if="addressParams.districtId" @click="openAddress()">
					<text>{{addressParams.provinceName}}{{addressParams.cityName}}{{addressParams.districtName}}</text>
				</view>
				<view class="partnerAdd" v-else @click="openAddress()">选择所在区域</view>
			</view>
			<view class="everyInfo">
				<view class="fixedInfo">
					真实姓名<text>*</text>
				</view>
				<input type="text" class="placeType" v-model="params.realName" placeholder-class="placeholder" placeholder="输入真实姓名"/>
			</view>
			<view class="everyInfo">
				<view class="fixedInfo">
					联系方式<text>*</text>
				</view>
				<input type="number" class="placeType" v-model="params.mobile" placeholder-class="placeholder" placeholder="输入有效手机号"/>
			</view>
			<view class="everyInfo">
				<view class="fixedInfo">
					验证码<text>*</text>
				</view>
				<input type="number" v-model="params.captcha" :class="countdown.count?'countDownInput':''" class="placeType" placeholder-class="placeholder" placeholder="输入有效验证码"/>
				<text v-if="!countdown.count" class="getCode" @click="captcha">获取验证码</text>
				<text v-if="countdown.count" class="getCode countDown">{{countdown.count}}秒后重新获取</text>
			</view>
			<view class="everyInfo">
				<view class="fixedInfo">
					合伙人邀请码<text>*</text>
				</view>
				<input type="text" v-model="params.inviteCode" class="placeType" placeholder-class="placeholder" placeholder="输入有效邀请码"/>
			</view>
			<view class="everyInfo imageUpload">
				<view class="fixedInfo">
					上传营业执照<text></text>
				</view>
				<view class="evaluateImage">
					<view class="imageList" v-if="params.licenseImage">
						<image :src="imgBaseUrls+params.licenseImage" mode="aspectFill"></image>
						<view class="removeImgBtn" @click="params.licenseImage=''"></view>
					</view>
					<view class="updateImg" v-if="!params.licenseImage" @click="chooseimage()">
						<text>添加照片</text>
					</view>
				</view>
			</view>
		</view>
		<view class="submitBtn" @click="submit">
			提交申请
		</view>
		<uni-popup ref="addressPopup" type="bottom">
			<view class="addressPopup">
				<view class="addressPopupTitle">
					<text>请选择所在地区</text>
					<text class="cancel" @click="closeAddPopup">取消</text>
				</view>
				<view class="createAddressBox">
					<selectAddress :defaultAddress='addressParams' @addressChange='addressChange'></selectAddress>
				</view>
			</view>
		</uni-popup>
		<agreementPopup :agreementInfo='agreementInfo' :partnerName='partnerName' ref='openPopup'></agreementPopup>
	</view>
</template>

<script>
	import memberApi from '@/api/member/index.js'
	import appApi from '@/api/app/index.js'
	import uniUploadImage from '@/common/js/uniUploadImage.js'
	import agreementPopup from './agreementPopup.vue'
	import vipConfig from '@/common/js/vipConfig.js'
	import selectAddress from './selectAddress.vue'
	export default {
		mixins:[uniUploadImage],
		data(){
			return{
				defaultTitleDto:{
					title:'加入合伙人',
				},
				countdown: {	//倒计时
					inter: "",
					count: 0
				},
				partnerName:"",
				partnerConfig:[],
				params:{
					realName:"",
					mobile:"",
					captcha:"",
					inviteCode:"",
					licenseImage:"",
					distributorTypeId:"",
					districtId:""
				},
				addressParams:{},
				agreementFlag:true,
				agreementInfo:[],	//会员协议
				imgBaseUrls:this.$config.imgBaseUrl
			}
		},
		onShow() {
		},
		methods:{
			distributorAgreement(){
				appApi.distributorAgreement(this.params.distributorTypeId).then(res=>{
					if(res.data.code){
						this.agreementInfo = res.data.data
					}
				})
			},
			openPopup(){
				this.$refs.openPopup.openPopup()
			},
			captcha() { //获取验证码
				if(!uni.getStorageSync("sessionId")){
					uni.showToast({
						title: "请登录",
						icon: "none"
					})
					setTimeout(()=>{
						this.$Router.push({
							path:"/pages/login/index"
						})
					},1000)
					return;
				}
				if (!(/^\d{11}$/.test(this.params.mobile))) {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					})
					return;
				}
				this.countDownTime();
				this.sendCaptcha()
			},
			countDownTime() {	//倒计时开始
				this.countdown.count = 60
				this.countdown.inter = setInterval(() => {
					this.countdown.count--;
					if (!this.countdown.count) {
						clearInterval(this.countdown.inter)
					}
				}, 1000)
			},
			chooseimage(){	//上传图片
				uni.chooseImage({
					count:1,
					success:(res)=>{
						this.uploadImage(res.tempFiles[0].path,this.params.licenseImage)
					}
				})
			},
			updateImage(uploadFileRes,params){	//上传图片成功后
				this.$set(this.params,"licenseImage",uploadFileRes.data)
			},
			sendCaptcha(){
				appApi.sendCaptcha(this.params.mobile).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"发送成功",
							icon:"none"
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			submit(){	//成为分销商
				if(!this.agreementFlag){
					uni.showToast({
						title:"请先同意文器库平台协议",
						icon:"none"
					})
					return
				}
				for(let i in this.params){
					if(!this.params[i] && i!="licenseImage"){
						uni.showToast({
							title:"请检查必填项是否填写完整",
							icon:"none"
						})
						return
					}
				}
				appApi.submitDistributor(this.params).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title:"提交成功，等待审核",
							icon:"none"
						})
						setTimeout(()=>{
							if(this.partnerName=="客户"){
								this.$Router.push({
									path:"/pages/giftCardList/index"
								})
							}else{
								uni.switchTab({
									url:"/pages/my/index"
								})
							}
						},1000)
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			closeAddPopup(){	//关闭地址选择弹窗
				this.$refs.addressPopup.close();
			},
			addressChange(item){	//地址更改时触发
				for(let i in item){
					this.$set(this.addressParams,i,item[i])
				}
				this.params.districtId = item.districtId
				this.$refs.addressPopup.close();
			},
			openAddress(){	//打开地址选择弹窗
				this.$refs.addressPopup.open();
			},
		},
		async onLoad(query) {
			try{
				if(this.$Route.query.scene){
					this.params.inviteCode = decodeURIComponent(this.$Route.query.scene).split(",")[0];
					uni.setStorageSync("routerShareNumber",this.params.inviteCode)
				}
				
				if(query && query.scene){
					this.params.inviteCode = decodeURIComponent(query.scene).split(",")[0]
					if(this.params.inviteCode){
						uni.setStorageSync("routerShareNumber",this.params.inviteCode)
					}
				}
				if(query && query.shareNumber){
					this.params.inviteCode = query.shareNumber;
					 uni.setStorageSync("routerShareNumber",this.params.inviteCode)
				}
				if(this.$Route.query.shareNumber){
					this.params.inviteCode = this.$Route.query.shareNumber;
					uni.setStorageSync("routerShareNumber",this.params.inviteCode)
				}
			}catch(e){
				
			}
			this.partnerConfig = await vipConfig.getPartner();
			this.params.distributorTypeId = this.partnerConfig[0].id
			this.partnerName = this.partnerConfig[0].name;
			this.distributorAgreement();
			if(!uni.getStorageSync("sessionId")){
				uni.showToast({
					title:"请登录",
					icon:"none"
				})
				setTimeout(()=>{
					this.$Router.push({
						path:"/pages/login/index"
					})
				},1000)
			}
			
		},
		components:{
			agreementPopup,
			selectAddress
		}
	}
</script>

<style scoped>
	.commonPageTitle{
		/* #ifndef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		min-height: 100vh;
		background-color: #F4F5F6;
		padding-bottom: 180rpx;
	}
	.joinPartner{
		width: 100%;
		height: 300rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/joinPartenrBg.png);
		background-size: 100% 100%;
	}
	.openProcess{
		width: 690rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-top: -50rpx;
	}
	.openTitle{
		width: 100%;
		height: 40rpx;
		font-weight: 700;
		padding: 20rpx 30rpx ;
	}
	.everyProcess{
		display: flex;
		padding: 0 30rpx;
		align-items: center;
		margin: 50rpx 0 10rpx;
	}
	.everyTip{
		width: 180rpx;
		height: 60rpx;
		background-color: #FFF3E0;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30rpx;
		font-size: 24rpx;
		color: #E88140;
	}
	.everyLine{
		width: 50rpx;
		height: 2rpx;
		background-color: #D8D8D8;
	}
	.openExplain{
		padding: 0 30rpx;
		color: #666666;
		margin-top: 40rpx;
		font-size: 24rpx;
	}
	.partnerInfo{
		width: 690rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		border-top-right-radius: 0;
		border-top-left-radius: 0;
		margin: 0 auto;
		padding: 0 30rpx;
		padding-bottom: 30rpx;
	}
	.partnerTab{
		width: 690rpx;
		margin: 0 auto;
		height: 80rpx;
		display: flex;
		border-radius: 30rpx;
		overflow: hidden;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		justify-content: space-between;
		margin-top: 30rpx;
	}
	.everyTab{
		width: 330rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #999999;
		background-color:#FAFAFA;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}
	.everyTab.active{
		background-color: #FFFFFF;
		font-size: 32rpx;
		color: #734C2D;
	}
	.everyInfo{
		display: flex;
		align-items: center;
		min-height: 100rpx;
		border-bottom: 1rpx solid #D8D8D8;
	}
	.imageUpload.everyInfo{
		justify-content: space-between;
		border-bottom: none;
	}
	.partnerAdd{
		color: #3478F6;
		padding-left: 24rpx;
	}
	.fixedInfo{
		vertical-align: bottom;
		min-width: 140rpx;
	}
	.imageUpload .fixedInfo{
		margin-top: -100rpx;
	}
	.fixedInfo text{
		color: red;
		margin-left: 6rpx;
	}
	.placeType{
		font-size: 28rpx;
		margin-left: 20rpx;
		line-height: 100rpx;
		width: calc(100% - 325rpx);
	}
	.countDownInput.placeType{
		width: calc(100% - 380rpx);
	}
	.getCode {
		color: rgb(51, 51, 51);
		font-size: 28rpx;
		text-align: center;
		line-height: 60rpx;
		height: 60rpx;
		text-align: right;
		background-color: #000000;
		padding:0 20rpx;
		border-radius: 20px;
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.countDown {
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.evaluateImage {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		margin-top: 20rpx;
	}
	.updateImg {
		width: 162rpx;
		height: 162rpx;
		margin-left: 24rpx;
		margin-bottom: 24rpx;
		border: 1px dashed #DFDFDF;
		border-radius: 8rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_pic.png) no-repeat;
		background-position: 55rpx 30rpx;
		background-size: 52rpx 46rpx;
		position: relative;
	}
	
	.updateImg text {
		position: absolute;
		top: 98rpx;
		width: 100%;
		text-align: center;
		color: #B2B2B2;
	}
	
	.imageList {
		position: relative;
		width: 162rpx;
		height: 162rpx;
		margin-left: 24rpx;
		margin-bottom: 24rpx;
		border-radius: 8rpx;
		overflow: hidden;
	}
	
	.removeImgBtn {
		position: absolute;
		top: 0;
		right: 0;
		width: 30rpx;
		height: 30rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/pj_icon_close.png) no-repeat 50%;
		background-size: 30rpx 30rpx;
	}
	.submitBtn{
		width: 690rpx;
		height: 88rpx;
		background-color: #333333;
		border-radius: 44rpx;
		text-align: center;
		line-height: 88rpx;
		color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 10;
		bottom: calc(60rpx + constant(safe-area-inset-bottom));
		bottom: calc(60rpx + env(safe-area-inset-bottom));
	}
	.agreement{
		width: calc(100% - 60rpx);
		height:74rpx;
		border-top: 1rpx solid #D8D8D8;
		margin: 0 auto;
		margin-top: 26rpx;
		padding-top: 20rpx;
		color: #333333;
		display: flex;
	}
	.agreement image{
		width: 30rpx;
		height: 30rpx;
		margin-top: 4rpx;
		margin-right: 10rpx;
	}
	.agreement .agreementText{
		color: #007AFF;
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
