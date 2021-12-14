<template>
	<view class="pages">
		<defaultTitle :dto="defaultTitleDto"></defaultTitle>

		<view class="head">
			<image :src="imgBaseurl+'draw_head.png'" mode="widthFix"></image>
			<view class="homeBtn" @click="goHome()"></view>
			<view class="swiperContent" v-if="winnersInfo && winnersInfo.length">
				<view v-for="(item,index) in winnersInfo" :key="index">
					<view class="swiper-item" v-if="showIndex==index">恭喜 {{item.memberName}} 抽中 {{item.awardName}}</view>
				</view>
			</view>
			<!-- 抽奖 -->
			<view class="center">
				<view class="part pen">
					<image class="goods" :src="imgBaseurl+'draw_award1.png'" mode="widthFix"></image>
					<text>G20元首笔</text>
					<view class="bg" v-show="count==0||(num!=0&&start)"></view>
				</view>
				<view class="part quan">
					<image class="goods" :src="imgBaseurl+'draw_award2.png?v1'" mode="widthFix"></image>
					<image class="role" :src="imgBaseurl+'draw_award3.png'" mode="widthFix"></image>
					<text>满399减200元</text>
					<view class="bg" v-show="count==0||(num!=1&&start)"></view>
				</view>
				<view class="part thanks">
					<image class="goods" :src="imgBaseurl+'draw_award4.png'" mode="widthFix"></image>
					<text>谢谢参与</text>
					<view class="bg" v-show="count==0||(num!=2&&start)"></view>
				</view>
			</view>
			<view class="count">当前抽奖次数：{{count}}次</view>
			<view class="awardBtn" :class="count==0?'disabled':''" @click="count>0?startDraw():''"></view>
		</view>

		<view class="bottom">
			<!-- 奖品 -->
			<view class="prize" v-if="awardRecords && awardRecords.length">
				<view class="title">
					<text>我的奖品：</text>
					<view class="head_right" @click="openKefu">
						<text>联系客服</text>
						<text class="triangle"></text>
					</view>
				</view>
				<view class="center">
					<block v-for="item in awardRecords">
						<view class="pen" v-if="item.awardType==3" @click="reservePen(item.id,item.state)">
							<image class="goods" :src="imgBaseurl+'draw_award1.png'" mode="aspectFit"></image>
							<text>G20元首笔</text>
						</view>
						<view class="quan" v-else-if="item.awardType==1">
							<image class="goods" :src="imgBaseurl+'draw_award2.png?v1'" mode="aspectFit"></image>
							<text>满399减200元</text>
						</view>
					</block>
				</view>
			</view>
			<image class="rule" :src="imgBaseurl+'draw_rulers.png'" mode="widthFix"></image>
			<!-- <image class="publicity" :src="imgBaseurl+'draw_slogin.png'" mode="widthFix" @click="goView()"></image> -->
			<renovation url='506hdy4.28'></renovation>
			<goods ref='homeGoodsTab'></goods>

		</view>
		<!-- 优惠券 -->
		<uni-popup ref="couponPopup" type="center">
			<view class="couponPopupBox">
				<view class="coupon_title">
					<text class="colour"></text> <text>恭喜中奖</text> <text class="colour"></text>
				</view>
				<image class="quan" :src="imgBaseurl+'draw_quan.png'" mode="widthFix"></image>
				<view class="remark"> <text>提醒：</text>点击【去使用】将跳转文器库小程序首页，您可以选购喜欢的商品，使用优惠券抵扣商品金额</view>
			</view>
			<view class="couponPopupBtn">
				<view @click="goHome()">去使用</view>
				<view @click="closePopup(1)">我已确认</view>
			</view>
			<view class="popupClose" @click="closePopup(1)"></view>
		</uni-popup>
		<!-- 未中奖 -->
		<uni-popup ref="nothingPopup" type="center">
			<view class="nothingPopupBox">
				<image class="cry" :src="imgBaseurl+'draw_cry.png'" mode="widthFix"></image>
				<text>一定是抽奖姿势不对</text>
				<text>没有抽中奖品</text>
			</view>
			<view class="nothingPopupText">当前抽奖机会：<text>{{count}}</text>次</view>
			<view class="nothingPopupBtn" v-if="count>0" @click="closePopup(2,true)">继续抽奖</view>
			<view class="popupClose" @click="closePopup(2)"></view>
		</uni-popup>
		<!-- 定制 -->
		<uni-popup ref="customizedPopup" type="bottom">
			<view class="customizedPopupBox">
				<view class="coupon_title">
					<text class="colour"></text> <text>恭喜中奖</text> <text class="colour"></text>
				</view>
				<view class="popupClose" @click="closePopup(0)"></view>
				<scroll-view class="customizedContent" scroll-y="true">
					<!-- goods -->
					<view class="goods">
						<view class="left">
							<view class="large" @click="preViewImg()"></view>
						</view>
						<text>G20元首笔</text>
					</view>
					<view class="info">请填写奖品寄送信息</view>
					<view class="inputGroup">
						<view class="part">
							<view class="left">
								<text class="red">*</text>收货人：
							</view>
							<input type="text" maxlength="5" v-model="customizeInfo.name" placeholder="建议填写真实姓名" placeholder-class="placeholder" />
						</view>
						<view class="part">
							<view class="left">
								<text class="red">*</text>手机号码：
							</view>
							<input type="number" maxlength="11" v-model="customizeInfo.mobile" placeholder="请输入有效联系号码" placeholder-class="placeholder" />
						</view>
						<view class="part area">
							<view class="left">
								<text class="red">*</text>所在地区：
							</view>
							<text class="rowText ellipsis-one" :class='selectAddressParams.provinceId?"active":""' @click="enterAddress()"
							 v-if="selectAddressParams">{{selectAddressParams.provinceId?(selectAddressParams.provinceName+selectAddressParams.cityName+selectAddressParams.districtName+(selectAddressParams.townName?selectAddressParams.townName:"")):"选择所在区域"}}</text>
							<text class="row"></text>
						</view>
						<view class="part">
							<view class="left">
								<text class="red">*</text>详细地址：
							</view>

							<input type="text" maxlength="30" v-model="customizeInfo.address" placeholder="请输入详细地址" placeholder-class="placeholder" />
						</view>
						<view class="part remark">
							<view class="left">
								定制信息：
							</view>
							<input type="text" v-model="customizeInfo.remark" maxlength="5" placeholder="5字以内，印于G20元首笔上" placeholder-class="placeholder" />
						</view>
					</view>
					<image class="awardInfo" :src="imgBaseurl+'draw_remark.png'" mode="widthFix"></image>
					<view class="nothingPopupBtn" @click="saveReceiver()">确认提交</view>
				</scroll-view>
			</view>
		</uni-popup>
		<img-preview ref='previewPopup' :previewImageList='imgPreview' :previewIndex="1" :hasHttp="true"></img-preview>
		<!-- 选中地址 -->
		<uni-popup ref="addressPopup" type="bottom">
			<view class="addressPopup">
				<view class="createAddressBox">
					<selectAddress :defaultAddress='selectAddressParams' @addressChange='addressChange'></selectAddress>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import qiyuPlug from '@/plugInUnit/qiyuPlug.js'
	import imgPreview from '@/pages/goodsDetails/imgPreview.vue' //头部图片放大
	import selectAddress from '@/common/model/selectAddress.vue'
	import boxActivityApi from '@/api/boxActivity/index.js'
	import goods from './goods.vue'
	import renovation from '@/pages/renovation/index.vue'

	export default {
		mixins: [qiyuPlug],
		components: {
			imgPreview,
			selectAddress,
			goods,
			renovation
		},
		data() {
			return {
				promotionId: 100021, //抽奖id
				defaultTitleDto: {
					title: '民族品牌日'
				},
				imgBaseurl: 'https://prod-acitvity.oss-cn-shanghai.aliyuncs.com/draw/img/',
				imgPreview: [{
					name: 'https://prod-acitvity.oss-cn-shanghai.aliyuncs.com/draw/img/draw_pen.jpg',
				}],
				count: 2, // 当前抽奖次数
				customizeInfo: { //定制信息
					name: '',
					mobile: '',
					address: '',
					remark: '',
					boxRecordId: ''
				},
				winnersInfo: [], //中奖人
				awardRecords: [], //中奖纪录
				selectAddressParams: { //选择的地址

				},
				end: false, //结束
				start: false, //开始抽奖
				num: -1, //当前选中
				temp: 0, // 中转选中
				btnFlag: true, //按钮点击
				showIndex:0, //当前展示的轮播
				timer:null,
			}
		},
		beforeDestroy(){
			clearInterval(this.timer);
			this.timer = null
		},
		mounted(){
			this.setTimer()
		},
		onShow() {
			this.getAwardsInfo();
			if(uni.getStorageSync("sessionId")){
				this.loadBox()
				this.getAwardRecords()
			}
		},
		onReachBottom(e) {
			this.$refs.homeGoodsTab.getNextPageGoods()
		},
		methods: {
			setTimer(){
				if(this.winnersInfo && this.winnersInfo.length&&!this.timer){
					this.timer=setInterval(()=>{
						this.showIndex=this.showIndex==(this.winnersInfo.length-1)?0:++this.showIndex;
					},2900)
				}
			},
			loadBox() { // 初始化信息
				boxActivityApi.loadBox(this.promotionId, 4).then(res => {
					if (res.data.code == 200) {
						this.getBoxCount()
					} else {
						this.hintMessage(res.data.message)
					}
				})
			},
			getBoxCount() { // 获取剩余抽奖次数
				boxActivityApi.getBoxCount(this.promotionId).then(res => {
					if (res.data.code == 200) {
						this.count = res.data.data.awardCount
					} else {
						this.hintMessage(res.data.message)
					}
				})
			},
			getAwardsInfo() { //滚屏中奖人信息
				boxActivityApi.getAwardsInfo(this.promotionId).then(res => {
					if (res.data.code == 200) {
						this.winnersInfo = res.data.data
						this.setTimer()
					} else {
						this.hintMessage(res.data.message)
					}
				})
			},
			getAwardRecords() { //获取中奖记录
				boxActivityApi.getAwardRecords(this.promotionId).then(res => {
					if (res.data.code == 200) {
						this.awardRecords = res.data.data
					} else {
						this.hintMessage(res.data.message)
					}
				})
			},
			hintMessage(message) { // 提示
				uni.showToast({
					title: message,
					icon: "none"
				})
			},
			reservePen(id, state) { //领取定制
				if (state != 1) {
					this.customizeInfo.boxRecordId = id
					this.openPopup(0)
				}
			},
			openPopup(type) {
				if (type == 1) {
					this.$refs.couponPopup.open()
				} else if (type == 2) {
					this.$refs.nothingPopup.open()
				} else if (type == 0) {
					this.$refs.customizedPopup.open()
				}
			},
			closePopup(type, flag) {
				if (type == 1) {
					this.$refs.couponPopup.close()
				} else if (type == 2) {
					this.$refs.nothingPopup.close()
					if (flag) {
						this.startDraw()
					}
				} else if (type == 0) {
					this.$refs.customizedPopup.close()
				}
			},
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			startDraw() { // 开始抽奖
				if(!uni.getStorageSync('sessionId')){
					uni.showToast({
						title: '请先登录',
						icon: "none"
					})
					uni.navigateTo({
						url: '/pages/login/index'
					})
					return false
				}
				let i = 0,
					j = 0
				if (!this.btnFlag) { //防重复操作
					return false
				}
				this.start = true
				this.btnFlag = false
				this.end = false
				this.num = -1
				let timer = setInterval(() => {
					i++;
					j++;
					let num = i
					this.num = num % 3
					if (this.end || this.count < 1) {
						clearInterval(timer)
						this.num = this.temp
						this.openPopup(this.num)
					}
				}, 100)
				this.openBox()
			},
			openBox() { //抽奖 0-未中奖、1-优惠券、2-礼卡、3-实物奖 对应顺序 2 1 - 0
				boxActivityApi.openBox(this.promotionId).then(res => {
					if (res.data.code == 200) {
						let awardType = res.data.data.awardType
						setTimeout(() => {
							this.temp = awardType == 0 ? 2 : (awardType == 3 ? 0 : awardType)
							if (res.data.data.awardType == 3) {
								this.customizeInfo.boxRecordId = res.data.data.id
							}
							this.end = true
							this.btnFlag = true
							this.getBoxCount()
							this.getAwardRecords()
						}, 3000)
					} else {
						this.end = true
						this.start = false
						this.btnFlag = true
						this.temp = -1
						this.hintMessage(res.data.message)
					}
				})
			},
			preViewImg() {
				this.$refs.previewPopup.openRreviewPopup()
			},
			enterAddress() {
				this.$refs.addressPopup.open();
			},
			addressChange(params) {
				this.selectAddressParams = params
				this.$refs.addressPopup.close()
			},
			saveReceiver() { //保存邮寄地址
				// 验证
				if (!this.customizeInfo.name) {
					uni.showToast({
						title: "请填写收货人",
						icon: "none"
					})
					return;
				}
				if (!(/^\d{11}$/.test(this.customizeInfo.mobile))) {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					})
					return;
				}
				if (!this.selectAddressParams.provinceName || !this.selectAddressParams.cityName || !this.selectAddressParams.districtName) {
					uni.showToast({
						title: "请选择所在地区",
						icon: "none"
					})
					return;
				}
				if (!this.customizeInfo.address) {
					uni.showToast({
						title: "请填写详细地址",
						icon: "none"
					})
					return;
				}
				let params = {
					provinceId: this.selectAddressParams.provinceId,
					cityId: this.selectAddressParams.cityId,
					countyId: this.selectAddressParams.districtId,
					townId: this.selectAddressParams.townId
				}
				boxActivityApi.saveReceiver({ ...this.customizeInfo,
					...params
				}).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "提交成功",
							icon: "success"
						})
						this.getAwardRecords()
						this.closePopup(0)
					} else {
						this.hintMessage(res.data.message)
					}
				})
			},
			goView() {
				this.$Router.push({
					path:"/pages/renovation/index",
					query:{
						url:'506hdy4.28'
					}
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
