<template>
	<view class="page cart">
		<view class="goodsTitle">
			<view class="goBackBtn" :style="{opacity:titleTransparent}" @click="goBack(1)"></view>
			<view class="cartTitle" :style="{opacity:titleTransparent}">
				购物车
			</view>
			<view v-if="cartList.activityGoods.length || cartList.shops.length || cartList.unusefulGoods.length" class="goodsOperate"
			 @click="editClick">
				{{editFlag?"完成":"编辑"}}
			</view>
		</view>
		<scroll-view class="cartContent" scroll-y="true" :class="(memberPriceInfo.choosePrice && memberType!=4 && (memberPriceInfo.type || memberPriceInfo.arriveType))?'active':''" @scroll='scroll'>
			<view class="cartTitleDef">
				购物车
			</view>
			<view class="cartList" v-for="(item,key,index) in cartList" :key='key' v-if="key!='unusefulGoods'">
				<view v-for="list,i in item" class="everyCart" :key='list.storeId'>
					<view class="everyShop">
						<view class="chooseCartIcon" @click="shopChooseChange(list)" :class="list.chooseFlag?'active':''"></view>
						<view class="cartShopName" @click="goToShop(list)">
							{{list.storeName}}
						</view>
						<view class="couponBtn" v-if="list.hasCoupons" @click="getCartStoreCoupons(list)">
							领券
						</view>
					</view>
					<view class="shopActive" v-if="list.freightPromotion">
						<view class="shopactiveSign">
							包邮
						</view>
						<view class="shopactiveName">
							已享“{{list.freightPromotion.name}}”
						</view>
					</view>
					<view class="cartLine line"></view>
					<view class="cartGoods">
						<view>
							<view v-for="v,l in list.goodsList" :key='v.cartId'>
								<uni-swipe-action>
									<uni-swipe-action-item>
										<template v-slot:right :right-options="options">
											<view class="delGoods" @click="removeGoods(item,list,v)"><text>刪除</text></view>
										</template>
										<view class="everyGoods">
											<view class="goodsSelectBtn" :class="v.chooseFlag?'active':''" @click="goodsChooseChange(v,list)"></view>
											<view class="goodsInfoMsg">
												<view class="goodsInfoTop">
													<view class="goodsImage">
														<image @click='goToGoodsDetail(v)' :src="imgBaseUrls+v.goodsImg" mode="aspectFill"></image>
														<view class="goodsNumWarning" v-if="v.storage<=3">仅剩{{v.storage}}件</view>
													</view>
													<view class="goodInfo">
														<view class="ellipsis-two goodsName" @click='goToGoodsDetail(v)'>{{v.goodsName}}</view>
														<view class="goodsSpce">
															<text class="ellipsis-one" v-if='v.saleFieldValue.replace(/(^\s+)|(\s+$)/g,"")' @click="findCartGoods(v,key,i,l)">{{v.saleFieldValue}}</text>
														</view>
														<view class="goodsTips">
															<text v-if="v.decreasePrice">比加入时降{{v.decreasePrice}}元</text>
														</view>
														<view class="goodsPrice"><text>￥</text>{{v.price}}</view>
														<view class="goodsNum">
															<view class="jian" @click="jian(v)">-</view>
															<input type="number" v-model="v.num" @blur='goodsNumBlur(v)' />
															<view class="jia" @click="jia(v)">+</view>
														</view>
													</view>
												</view>
												<view class="activeBox" v-if="v.goodsPromotion">
													<text class="activeBtn" v-if="v.goodsPromotion.typeCode==1">折扣</text>
													<text class="activeBtn" v-if="v.goodsPromotion.typeCode==2">一口价</text>
													<text class="activeBtn" v-if="v.goodsPromotion.typeCode==6">秒杀</text>
													<text class="activeBtn" v-if="v.goodsPromotion.typeCode==24">新人价</text>
													<text class="activeBtn distributionBtn" v-if="v.goodsPromotion.typeCode==19">自省分赚</text>
													<view class="activity" v-if="v.goodsPromotion.name">{{v.goodsPromotion.name}} <text v-if="v.confineNum>0">,每人限购{{v.confineNum}}件,超出数量以结算价为准</text></view>
												</view>
												<view class="member_identification" v-if="!v.goodsPromotion && memberType">
													<image v-if="memberType==1" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/vip_identification.png" mode="heightFix"></image>
													<image v-if="memberType==2" src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/member_identification.png" mode="heightFix"></image>
												</view>
											</view>
										</view>
									</uni-swipe-action-item>
								</uni-swipe-action>
							</view>
						</view>
					</view>
					<view class="cartLine"></view>
				</view>
			</view>
			<view class="unusefulGoods" v-if="cartList.unusefulGoods && cartList.unusefulGoods.length">
				<view class="unusefulTitle">
					<text class="unusefu">失效商品</text>
					<text class="removeUnusefuList" @click="removeCarts">清空失效商品</text>
				</view>
				<view class="everyGoods" v-for="v,i in cartList.unusefulGoods" :key='v.cartId'>
					<view class="invalid"><text>失效</text></view>
					<view class="goodsImage">
						<image :src="imgBaseUrls+v.goodsImg" mode="aspectFill"></image>
					</view>
					<view class="goodInfo">
						<view class="ellipsis-two goodsName">{{v.goodsName}}</view>
						<view class="goodsStatus">
							<text v-if="v.status==1">已下架</text>
							<text v-if="v.status==2">暂时无货</text>
							<text v-if="v.status==3">已失效</text>
							<text v-if="v.status==4">不存在</text>
						</view>
						<view class="removeCollection" @click="moveToFavorite(v.cartId,i)">移入收藏夹</view>
					</view>
				</view>
			</view>
			<view class="cartNoMsg" v-if="!cartList.activityGoods.length && !cartList.shops.length && !cartList.unusefulGoods.length">
				<image src="http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/cart_empty.png" mode=""></image>
				<view class="cartNoMsgText">
					购物车里怎能不囤点好货？
				</view>
				<view class="goHomeBtn" @click="goHome">马上囤货</view>
			</view>
			<renovation url='cart/0'></renovation>
		</scroll-view>
		<view class="cartHint" v-if="memberPriceInfo.choosePrice && memberType!=4 && (memberPriceInfo.type || memberPriceInfo.arriveType)">
			<view class="cartPrice">
				<view v-if="memberPriceInfo.arriveType">
					当前结算金额已满足<text>{{memberPriceInfo.arriveType}}</text>升级条件
				</view>
				<block v-if="memberPriceInfo.price">
					还差<text class="memberGoodsPrice">{{memberPriceInfo.price}}</text>元，
				</block>
				<block v-if="!memberPriceInfo.price">下单</block>
				即可升级为{{memberPriceInfo.type}}
			</view>
			<view class="goBuyBtn" @click="gotoGoods()" v-if="memberPriceInfo.price">
				去凑单&nbsp;›
			</view>
		</view>
		<view class="cartFooterParent">
			<view class="cartFoot" v-if="cartList.activityGoods.length || cartList.shops.length || cartList.unusefulGoods.length">
				<view class="chooseCartIcon" @click="selectAll" :class="chooseCart.selectAllFlag?'active':''"></view>
				<text>全选</text>
				<view class="totalNum" v-if="!editFlag">合计
					<text>¥{{(chooseCart.price).toFixed(2)}}</text>
				</view>
				<view class="settlementBtn" @click="pageInit" v-if="!editFlag">结算({{chooseCart.submitArr.length}})</view>
				<view class="removeCollectionBtn" v-if="editFlag" @click="moveToFavorites()">移入收藏</view>
				<view class="deleteALlBtn" v-if="editFlag" @click="removeCartsBtm">删除</view>
			</view>
		</view>
		<uni-popup ref="couponPopup" type="bottom">
			<couponTemplate :goodsInfo='chooseInfo' :couponInfo='couponInfo' @getItemCoupons='getCartStoreCoupons' @closeCouponPopup='closeCouponPopup'></couponTemplate>
		</uni-popup>
		<cartSku :chooseSpec='chooseSpec' ref='cartSku' @changeCart='changeCart'></cartSku>
	</view>
</template>

<script>
	import tradeApi from '@/api/trade/index.js';
	import goodsApi from '@/api/goods/index.js';
	import promotionApi from '@/api/promotion/index.js';
	import renovation from '@/pages/renovation/index.vue'
	import couponTemplate from '@/common/model/couponPopup.vue'
	import cartSku from './cartSku.vue'
	export default {
		data() {
			return {
				titleTransparent: 0, //头部透明度
				cartList: {	//购物车数据
					unusefulGoods: [],
					activityGoods: [],
					shops: []
				},
				options: { //删除滑动操作配置
					style: {
						width: '200rpx',
						height: '285rpx'
					}
				},
				chooseCart: { //购物车选中的数据
					submitArr: [], //选中数据
					price: 0, //选中价格
					selectAllFlag: false, //全选开关
				},
				imgBaseUrls: "",
				editFlag: false, //编辑开关
				chooseInfo:{},	//
				couponInfo:{},	//优惠券信息
				cateDecorateList:{},	//购物车装修
				chooseSpec:"",	//选中的sku
				cartIndex:{}, // 选中的index
				memberType:uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:"",
				memberPriceInfo:{
					price:0,
					type:"",
					arriveType:"",
					choosePrice:""
				}
			}
		},
		methods: {
			getCarts() { //获取购物车列表
				uni.showLoading({
					title: "加载中..."
				})
				tradeApi.getCarts().then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						this.cartList = res.data.data;
						this.setSaleFieldValue();
						this.judgeCartId();
						this.judgeCartType()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			judgeCartId(){	//比较重新勾选
				for (let i in this.cartList) {
					if (i != "unusefulGoods") {
						for (let j = 0; j < this.cartList[i].length; j++) {
							if (this.cartList[i][j].goodsList) {
								for (let k = 0; k < this.cartList[i][j].goodsList.length; k++) {
									for(let l=0;l<this.chooseCart.submitArr.length;l++){
										if(this.chooseCart.submitArr[l]==this.cartList[i][j].goodsList[k].cartId){
											this.cartList[i][j].goodsList[k].chooseFlag
											this.$set(this.cartList[i][j].goodsList[k],"chooseFlag",true)
										}
									}
								}
							}
						}
					}
				}
			},
			setSaleFieldValue() { //重置规格属性
				for (let i in this.cartList) {
					if (i != "unusefulGoods") {
						for (let j = 0; j < this.cartList[i].length; j++) {
							if (this.cartList[i][j].goodsList) {
								for (let k = 0; k < this.cartList[i][j].goodsList.length; k++) {
									this.cartList[i][j].goodsList[k].saleFieldValue = this.compileSpec(this.cartList[i][j].goodsList[k].saleFieldValue)
								}
							}
						}
					}
				}
			},
			compileSpec(spce) { //编译默认规格例如  颜色：红色，尺码：40 -> 红色 40
				var newSpec = '';
				var specArr = spce.split(',');
				for (let i in specArr) {
					newSpec += specArr[i].split(':')[1] + ' ';
				}
				return newSpec;
			},
			goHome(){
				uni.switchTab({url:'/pages/index/index'})
			},
			scroll(e) { //监听滚动条  更改透明度
				this.titleTransparent = e.detail.scrollTop / 80;
			},
			jian(item) { //商品数量减
				if (item.num*1 > 1) {
					item.num--
					this.editCart(item)
					this.judgeCartType()
				}
			},
			jia(item) { //商品数量加
				if (item.num*1 < item.storage*1) {
					item.num++;
					this.editCart(item)
					this.judgeCartType()
				}
			},
			goodsNumBlur(item) { //购物车商品数量变化时触发
				if (item.num) {
					if (item.storage*1 < item.num*1) {
						this.$set(item, "num", parseInt(item.storage))
					} else if (item.storage < 1) {
						this.$set(item, "num", 1)
					} else {
						this.$set(item, "num", parseInt(item.num))
					}
				} else {
					this.$set(item, "num", 1)
				}
				this.editCart(item);
			},
			changeCart(item){ //修改购物车商品详情  & 重置价格
				let obj = this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k]
				// 判断是否重复
				let bol = true
				for(let i in this.cartList[this.cartIndex.key]){
					let goodList = this.cartList[this.cartIndex.key][i].goodsList
					for(let j in goodList){ 
						if(goodList[j].goodsId == item.goodsId){ //同一商品
							bol = false
							let num = goodList[j].num*1  + item.num*1
							// item.num = num
							// this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[j].num = num  >= item.storage?item.storage:num
							if(j!=this.cartIndex.k){
								this.cartList[this.cartIndex.key][i].goodsList.splice(this.cartIndex.k,1)
							}
						} 
					}				
				}
				if(bol){
					this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].goodsId = item.goodsId
					this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].num = item.num
					this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].price = item.price
					this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].saleFieldValue = item.saleFieldValue
					this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].storage = item.storage
					this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].goodsImg = item.goodsImg
					this.cartList[this.cartIndex.key][this.cartIndex.j].goodsList[this.cartIndex.k].status = item.status
				}
				
				this.editCart(item)
			},
			editCart(item) { //修改购物车数量
				let params = {
					cartId: item.cartId,
					goodsId: item.goodsId,
					goodsPrice: item.price,
					num: item.num
				}
				tradeApi.editCart(params).then(res => {
					if (res.data.code == 200) {
						this.judgeCartType()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			moveToFavorite(cartId, index) { //单个移入收藏夹
				tradeApi.moveToFavorite(cartId).then(res => {
					if (res.data.code == 200) {
						this.cartList.unusefulGoods.splice(index, 1);
						uni.showToast({
							title: "移入收藏夹成功，您可以到收藏夹查看",
							icon: "none"
						})
						this.judgeCartType()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			moveToFavorites() { //批量移入收藏夹
				tradeApi.moveToFavorites(this.chooseCart.submitArr).then(res => {
					if (res.data.code == 200) {
						this.getCarts();
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			removeCarts() { //清空失效商品
				let unusefulList = [];
				for (let i = 0; i < this.cartList.unusefulGoods.length; i++) {
					unusefulList.push(this.cartList.unusefulGoods[i].cartId)
				}
				tradeApi.removeCarts(unusefulList).then(res => {
					if (res.data.code == 200) {
						this.cartList.unusefulGoods.splice(0);
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			removeCartsBtm() { //底部删除购物车商品
				tradeApi.removeCarts(this.chooseCart.submitArr).then(res => {
					if (res.data.code == 200) {
						this.getCarts()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			removeGoods(parent, parentItem, item) { //左滑删除单个商品   item,list,index,i,v
				tradeApi.removeCarts([item.cartId]).then(res => {
					if (res.data.code == 200) {
						let index = parentItem.goodsList.findIndex(v => {
							return item.cartId == v.cartId
						})
						let parentIndex = parent.findIndex(v => {
							return v.storeId == parentItem.storeId
						})
						let chooseIndex = this.chooseCart.submitArr.findIndex(v => {
							return v == item.cartId
						})
						if (chooseIndex != "-1") {
							this.chooseCart.submitArr.splice(chooseIndex, 1)
						}
						parentItem.goodsList.splice(index, 1);
						if (!parentItem.goodsList.length) {
							parent.splice(parentIndex, 1)
						}
						this.judgeCartType()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				})
			},
			getCartStoreCoupons(item){	//根据店铺id  获取优惠券
				if(item){	//子组件点击领取 重新获取优惠券信息  item为空
					this.chooseInfo = item;
				}
				this.zhuge.track("购物车列表页-领券按钮")
				promotionApi.getCartStoreCoupons(this.chooseInfo.storeId).then(res=>{
					if(res.data.code==200){
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].flag = false;
						}
						this.couponInfo = res.data.data;
						this.$refs.couponPopup.open()
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			closeCouponPopup(){	//关闭优惠券弹窗
				this.$refs.couponPopup.close()
			},
			shopChooseChange(item) { //店铺全选
				this.$set(item, "chooseFlag", item.chooseFlag ? false : true);
				for (let i = 0; i < item.goodsList.length; i++) {
					if (item.chooseFlag != item.goodsList[i].chooseFlag) {
						this.$set(item.goodsList[i], "chooseFlag", item.goodsList[i].chooseFlag ? false : true);
					}
				}
				this.judgeCartType()
			},
			goodsChooseChange(item, parentItem) { //	单个商品选择
				this.$set(item, "chooseFlag", item.chooseFlag ? false : true);
				this.judgeCartType()
			},
			selectAll() { //	底部栏全选
				this.chooseCart.selectAllFlag = !this.chooseCart.selectAllFlag;
				for (let i in this.cartList) {
					if (i != "unusefulGoods") {
						for (let j = 0; j < this.cartList[i].length; j++) {
							if (this.cartList[i][j].chooseFlag != this.chooseCart.selectAllFlag) {
								this.$set(this.cartList[i][j], "chooseFlag", this.chooseCart.selectAllFlag)
							}
							for (let k = 0; k < this.cartList[i][j].goodsList.length; k++) {
								this.$set(this.cartList[i][j].goodsList[k], "chooseFlag", this.chooseCart.selectAllFlag)
							}
						}
					}
				}
				this.judgeCartType()
			},
			judgeCartType() { //用来对全选  价格的处理
				this.chooseCart.submitArr.splice(0);
				this.chooseCart.selectAllFlag = true;
				this.chooseCart.price = 0;
				this.memberPriceInfo.choosePrice = 0
				for (let i in this.cartList) {
					if (i != "unusefulGoods") {
						for (let j = 0; j < this.cartList[i].length; j++) {
							this.cartList[i][j].chooseFlag = true;
							if (this.cartList[i][j].goodsList) {
								for (let k = 0; k < this.cartList[i][j].goodsList.length; k++) {
									if (this.cartList[i][j].goodsList[k].chooseFlag) {
										this.chooseCart.price += (this.cartList[i][j].goodsList[k].price * this.cartList[i][j].goodsList[k].num) * 1
										if(this.cartList[i][j].goodsList[k].achievementFlag==0){
											this.memberPriceInfo.choosePrice += (this.cartList[i][j].goodsList[k].price * this.cartList[i][j].goodsList[k].num) * 1
										}
										this.chooseCart.submitArr.push(this.cartList[i][j].goodsList[k].cartId)
									} else {
										this.cartList[i][j].chooseFlag = false;
									}
								}
							}
							if (!this.cartList[i][j].chooseFlag) {
								this.chooseCart.selectAllFlag = false
							}
						}
					}
				}
				if(this.memberType!=4){
					this.getMemberPriceInfo()
				}
			},
			getMemberPriceInfo(){
				this.memberPriceInfo.arriveType = "";
				this.memberPriceInfo.type = ""
				try{
					let memberConfig = JSON.parse(uni.getStorageSync("memberConfig"));
					let userInfo = JSON.parse(uni.getStorageSync("userInfo"));
					let memberPrie = 0;
					if(userInfo.plusFlag==memberConfig[memberConfig.length-1].type){
						return false
					}
					for(let i=0;i<memberConfig.length;i++){
						if(memberConfig[i].type == userInfo.plusFlag){
							if(memberConfig[i].price>userInfo.totalAmountDuring){
								memberPrie = memberConfig[i].price - userInfo.totalAmountDuring
							}
						}
					}
					for(let i=1;i<memberConfig.length;i++){
						if((this.memberPriceInfo.choosePrice+userInfo.totalAmountDuring+memberPrie)<memberConfig[i].price){
							this.memberPriceInfo.price = (memberConfig[i].price - this.memberPriceInfo.choosePrice - userInfo.totalAmountDuring).toFixed(2)
							this.memberPriceInfo.type = memberConfig[i].name;
							return true
						}else if(i>0 && memberPrie==0){
							this.memberPriceInfo.arriveType = memberConfig[i].name;
							this.memberPriceInfo.type = memberConfig[i].name;
							this.memberPriceInfo.price = ""
						}else{
							if(memberConfig[i].price - this.memberPriceInfo.choosePrice - userInfo.totalAmountDuring<=0){
								this.memberPriceInfo.arriveType = memberConfig[i].name
								this.memberPriceInfo.price = ""
							}else{
								this.memberPriceInfo.price = (memberConfig[i].price - this.memberPriceInfo.choosePrice - userInfo.totalAmountDuring).toFixed(2)
								this.memberPriceInfo.type = memberConfig[i].name;
							}
						}
					}
					
				}catch(e){
					
				}
			},
			gotoGoods(){	//去凑单
				this.$Router.push({
					path:"/pages/goodsList/index",
					query:{
						priceRangeLeft:this.memberPriceInfo.price
					}
				})
			},
			pageInit() { //初始化结算
				if (this.chooseCart.submitArr.length) {
					// 下单前校验   新人价相关
					tradeApi.validSubmitCarts(this.chooseCart.submitArr).then(res=>{
						if(res.data.code==200){
							this.$Router.push({
								path: "/pages/settlement/index",
								query: {
									cartIds: this.chooseCart.submitArr.join(",")
								}
							})
						}else{
							uni.showToast({
								title:res.data.message,
								icon:"none"
							})
						}
					})
				}else{
					uni.showToast({
						title:"请选择商品",
						icon:"none"
					})
				}
			},
			goToShop(item){
				this.$Router.push({path:'/pages/shop/index',query:{storeId:item.storeId}})
			},
			goToGoodsDetail(v) {
				this.$Router.push({
					path: "/pages/goodsDetails/index",
					query: {
						goodsId: v.itemId,
						skuId: v.goodsId
					}
				})
			},
			editClick(){
				this.zhuge.track("购物车列表页-编辑按钮")
				this.editFlag=!this.editFlag
			},
			findCartGoods(item,key,j,k){	//打开sku弹窗
				this.chooseSpec = item;
				this.cartIndex = {key,j,k}
				this.$nextTick(()=>{
					this.$refs.cartSku.findCartGoods()
				})
			},
		},
		onShow() {
			this.zhuge.track("购物车页")
			if(!uni.getStorageSync("userInfo")){
				this.$Router.replace({
					path:"/pages/login/index"
				})
				return
			}
			this.imgBaseUrls = this.$config.imgBaseUrl;
			this.getCarts();
		},
		components: {
			couponTemplate,
			renovation,
			cartSku
		}
	}
</script>
<style scoped>
	.ellipsis-one{
		display: inline-block;
		font-size: 12px;
		color: #999;
		line-height: 19px;
		margin-top: 2px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAJCAYAAADQHRcxAAAAAXNSR0IArs4c6QAAAUpJREFUKBWVUDFLhWAUfYqWg4PS0NYQ5No/CKSgJRqKhDAQEbOhqehnFA0NqYgISWBUS7SF8GjqJxi0N4RDDpainQu9MKzoXTh897v3nOPxYzzPGw4GgzeGYbZs235GP1b5vj/dtu0ZRJMsGg5YaprmIQiC+XGciE860pMPy3HcMlLdwmSmrut7JF39jyHxiE860pMPa1nWqyRJZHAMiPjCNaIf/GVIe+IRn3SkJx+mKwJpG7FPMOOBUJblHU3T3kecJEkm8jw/xd0EKpZld/HO3mj/zYyGruuqOC4BGRgKgrBmGMZLFEVTZVleYbYA5MC64zgpzq/qmdEmDMO5qqpu8CsKrk9IsIfER+hn8T4Zz/Mrpmk+ErdbP5oRIY5juSiKC7SLHcGdKIobuq5Tsl79akbMNE25LMsOkWYTKc8VRdlXVbXuuXwOPgBwy4sBVfFiOAAAAABJRU5ErkJggg==) no-repeat 100%;
		background-size: 10px 5px;
		padding-right: 15px;
		max-width: 100%;
		height: 19px;
		overflow: hidden;
	}	
</style>
<style scoped>
	.cartContent {
		width: 100%;
		height: calc(100vh - 100rpx);
		/* #ifdef H5 */
			height: calc(100vh - 50px - 100rpx);
		/* #endif */
		padding-top: 88rpx;
		background-color: #fff;
	}

	.cartContent.active {
		height: calc(100vh - 190rpx);
		/* #ifdef H5 */
			height: calc(100vh - 50px - 190rpx);
		/* #endif */
	}

	.goBackBtn {
		width: 88rpx;
		height: 88rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/page_1@2x.png) no-repeat 50%;
		background-size: 16rpx 30rpx;
	}

	.cartShopName {
		height: 68rpx;
		color: #000000;
		font-weight: 700;
		margin: 0 18rpx;
		font-size: 34rpx;
		flex: 1;
	}

	.goodsTitle {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		height: 88rpx;
		z-index: 1;
		display: flex;
		background-color: #fff;
		justify-content: space-between;
	}

	.cartTitle {
		width: calc(100% - 180rpx);
		height: 88rpx;
		line-height: 88rpx;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
		font-size: 36rpx;
	}
	.cartList{
		background-color: #FFFFFF;
	}
	.goodsOperate {
		width: 116rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 30rpx;
		color: #666;
	}
	.unusefulGoods{
		background-color: #FFFFFF;
	}
	.cartTitleDef {
		width: 100%;
		padding: 0 36rpx 24rpx;
		font-size: 60rpx;
		font-weight: 700;
		background-color: #FFFFFF;
	}

	.everyCart {
		width: 100%;
		padding-bottom: 50rpx;
	}

	.everyShop {
		display: flex;
		width: 100%;
		line-height: 68rpx;
		padding: 0 36rpx 0 18rpx;
		height: 68rpx;
	}

	.chooseCartIcon {
		width: 68rpx;
		height: 68rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}

	.chooseCartIcon.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}

	.everyGoods {
		height: 285rpx;
		width: 100%;
		padding: 0 24rpx 0 18rpx;
		margin: 15rpx 0 28rpx;
		background-color: #FFFFFF;
		display: flex;
	}

	.everyGoods image {
		width: 200rpx;
		height: 200rpx;
	}

	.goodsImage {
		width: 200rpx;
		height: 200rpx;
		margin: 0 24rpx 0 18rpx;
		position: relative;
		border-radius: 6rpx;
		overflow: hidden;
	}

	.goodsNumWarning {
		width: 100%;
		height: 36rpx;
		text-align: center;
		line-height: 36rpx;
		background: rgba(0, 0, 0, 0.26);
		color: #FFFFFF;
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.delGoods {
		width: 200rpx;
		height: 285rpx;
		background-color: #ff1558;
		text-align: center;
		line-height: 285rpx;
		color: #fff;
	}

	.goodsSelectBtn {
		width: 68rpx;
		height: 200rpx;
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/oval_3copy4@2x.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}

	.goodsSelectBtn.active {
		background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/subr.png) no-repeat 50%;
		background-size: 36rpx 36rpx;
	}

	.goodInfo {
		flex: 1;
		height: 200rpx;
		position: relative;
	}

	.goodsName {
		font-size: 24rpx;
		color: #333333;
	}

	.goodsSpce {
		width: 100%;
		height: 40rpx;
		padding-right: 30rpx;
		margin-top: 4rpx;
		margin-top: 10rpx;
		/* background: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/coupon_cannotusearrow@2x.png) no-repeat 50%; */
		/* background-size: 20rpx 10rpx; */
	}

	.goodsSpce text {
		width: auto;
		color: #999999;
		max-width: 100%;
		font-size: 24rpx;
	}

	.goodsTips {
		width: 100%;
		height: 28rpx;
		line-height: 28rpx;
		font-size: 22rpx;
		color: #FF1558;
	}

	.goodsPrice {
		width: 100%;
		height: 46rpx;
		line-height: 46rpx;
		font-size: 32rpx;
		color: #FF1558;
		margin-top: 8rpx;
	}

	.goodsPrice text {
		font-size: 26rpx;
	}

	.goodsNum {
		position: absolute;
		top: 154rpx;
		right: 14rpx;
		background-color: #FFFFFF;
		width: 188rpx;
		height: 50rpx;
		display: flex;
	}

	.goodsNum .jia,
	.goodsNum .jian {
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		line-height: 48rpx;
		border: 1px solid #E6E6E6;
	}

	.goodsNum input {
		width: 88rpx;
		height: 100%;
		text-align: center;
		border-top: 1px solid #E6E6E6;
		border-bottom: 1px solid #E6E6E6;
		font-size: 24rpx;
	}

	.shopActive {
		width: 100%;
		padding: 0 20rpx 0 24rpx;
		height: 48rpx;
		line-height: 48rpx;
		display: flex;
		align-items: center;
	}

	.shopactiveSign {
		width: 60rpx;
		height: 24rpx;
		line-height: 24rpx;
		background-color: #FF1558;
		border-radius: 100rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;
	}

	.shopactiveName {
		font-size: 24rpx;
		color: #666666;
		margin: 0 24rpx;
	}

	.unusefulTitle {
		width: 100%;
		height: 68rpx;
		display: flex;
		padding: 0 44rpx 0 36rpx;
		line-height: 68rpx;
	}

	.unusefu {
		flex: 1;
		font-weight: 700;
		font-size: 34rpx;
		color: #000000;
	}

	.removeUnusefuList {
		font-weight: 700;
		color: #333333;
		font-size: 26rpx;
	}

	.removeCollection {
		width: 170rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 100rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		position: absolute;
		bottom: 6rpx;
		right: 0;
	}

	.goodsStatus {
		position: absolute;
		left: 10rpx;
		bottom: 6rpx;
		color: #333333;
	}

	.invalid {
		height: 200rpx;
		width: 70rpx;
		line-height: 200rpx;
	}

	.invalid text {
		width: 70rpx;
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;
		background-color: #d8d8d8;
		border-radius: 100rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		vertical-align: middle;
		display: inline-block;
	}

	.cartLine {
		width: calc(100% - 100rpx);
		border-bottom: 1rpx solid #E4E4E4;
		margin-left: 100rpx;
	}

	.cartLine.line {
		margin-top: 10rpx;
	}
	
	.cartFooterParent{
		width: 100%;
		height: 100rpx;
	}
	
	.cartFoot {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-top: 1px solid #E6E6E6;
		display: flex;
		align-items: center;
		position: relative;
	}

	.totalNum {
		position: absolute;
		right: 250rpx;
		top: 0;
		bottom: 0;
		margin: auto;
		line-height: 100rpx;
		font-size: 26rpx;
	}

	.totalNum text {
		color: #FF1558;
		font-weight: 700;
		margin-left: 10rpx;
	}

	.couponBtn {
		font-weight: 700;
	}

	.settlementBtn {
		width: 220rpx;
		height: 100rpx;
		background-color: #FF1558;
		color: #FFFFFF;
		font-size: 32rpx;
		position: absolute;
		right: 0;
		top: 0;
		text-align: center;
		line-height: 100rpx;
	}

	.removeCollectionBtn,
	.deleteALlBtn {
		position: absolute;
		right: 196rpx;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 150rpx;
		height: 52rpx;
		line-height: 52rpx;
		font-size: 28rpx;
		text-align: center;
		border: 1px solid #666666;
		color: #666666;
		border-radius: 12rpx;
	}

	.deleteALlBtn {
		position: absolute;
		right: 30rpx;
		top: 0;
		bottom: 0;
		margin: auto;
		color: #FF1558;
		border-color: #FF1558;
	}

	.cartNoMsg {
		margin-bottom: 96rpx;
		width: 100%;
		text-align: center;
		margin-top: 100rpx;
	}

	.cartNoMsg image {
		width: 270rpx;
		height: 270rpx;
	}

	.cartNoMsgText {
		font-size: 30rpx;
		color: #999999;
		line-height: 44rpx;
		margin-top: 6rpx;
	}

	.goHomeBtn {
		width: 300rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		border-radius: 100rpx;
		color: #FFFFFF;
		margin: 0 auto;
		margin-top: 30rpx;
		font-size: 32rpx;
		background-color: #FF1558;
	}

	.activeBox {
		width: 100%;
		min-height: 48rpx;
		display: flex;
		line-height: 36rpx;
		padding: 6rpx 0;
		align-items: center;
		margin-top: 30rpx;
	}

	.activeBox .activeBtn {
		display: inline-block;
		height: 28rpx;
		line-height: 26rpx;
		text-align: center;
		background-color: #ffeee1;
		border-radius: 100rpx;
		color: #ff7e18;
		padding: 0 10rpx;
		font-size: 24rpx;
		border: 1rpx solid #FF1558;
	}

	.goodsInfoMsg {
		flex: 1;
		display: flex;
		flex-wrap: wrap;
	}

	.goodsInfoTop {
		width: 100%;
		height: auto;
		display: flex;
	}

	.activeBox .distributionBtn {
		background-color: #242424;
		color: #fcc28b;
		border: none;
		text-align: center;
	}

	.activity {
		font-size: 22rpx;
		margin: 0 24rpx;
	}
	
	.everyGoods .member_identification image{
		height: 26rpx;
	}
	.cartHint{
		width: 100%;
		height: 90rpx;
		display: flex;
		font-size: 24rpx;
		color: #8E5B17;
		background-color: #fbf4ea;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		font-weight: 400;
	}
	.cartHint text{
		color: #333;
		font-weight: 500;
	}
	.goBuyBtn{
		color: #8E5B17;
		font-weight: 500;
	}
	.cartHint .memberGoodsPrice{
		color: #FF1558;
	}
</style>
