<template>
	<view class="page homeIndex">
		<view v-if="homeInfo" :style="{paddingTop:(titleNav?176:88)+'rpx'}">
			<view v-if="titleConfig">
				<view class="swiperConfig" v-if="titleConfig.swiper.type==0 && swiperHeight && webViewInfo.title=='首页'" :style="{top:(titleNav?176:88)+'rpx',backgroundColor:titleConfig.swiper.colorConfig[swiperIndex],height:swiperHeight+'px'}"></view>
				<view class="swiperConfig" v-else-if="swiperHeight && titleConfig.swiper.type==1 && webViewInfo.title=='首页'" :style="{top:(titleNav?176:88)+'rpx'}">
					<image :src="imgBaseUrls+titleConfig.swiper.imageConfig" mode="widthFix"></image>
				</view>
				<view class="hearderConfig" :class="{'absolute':scrollNum==0}" :style="{height:(titleNav?176:88)+'rpx',backgroundColor:titleConfig.title.defaultColorConfig[swiperIndex],opacity:(1-(scrollNum/20))}" v-if="titleConfig.title.type==0 && (scrollNum/20)<1"></view>
				<view class="hearderConfig" :class="{'absolute':scrollNum==0}" :style="{height:(titleNav?176:88)+'rpx',backgroundColor:titleConfig.title.ceilingColorConfig}" v-else-if="titleConfig.title.type==0 && (scrollNum/20)>=1"></view>
				<view class="hearderConfig" :class="{'absolute':scrollNum==0}" v-else :style="{height:(titleNav?176:88)+'rpx'}">
					<image :src="imgBaseUrls+titleConfig.title.imageConfig" mode="widthFix"></image>
				</view>
			</view>
			<homeHear ref="homeHear" :scrollNum='scrollNum/20' :titleConfig='titleConfig'></homeHear>
			<homeTitleTab v-if="titleNav" ref="homeTitleTab" :scrollNum='scrollNum/20' :titleNav='titleNav' :titleConfig='titleConfig' :isIndexHome='true' @setWebView='setWebView'></homeTitleTab>
			<renovation ref='renovation' v-show="homeInfo && webViewInfo.title=='首页'" :compData='homeInfo.componentVos' :scrollNum='scrollNum' @swiperChange='swiperChange'></renovation>
			<view v-if="webViewInfo.title!='首页'">
				<homeIndexRenova v-if="updateData" ref='renovationHome' :url='webViewInfo.linkValue' :scrollNum='scrollNum'></homeIndexRenova>
			</view>
			<homeBtmTab ref='homeBtmTab' v-if="boutique && webViewInfo.title=='首页'" :boutique='boutique'></homeBtmTab>
		</view>
		<homePopup></homePopup>
	</view>
</template>

<script>
	import decorateApi from '@/api/decorate/index.js';
	import homeHear from '@/standardHome/homeHeader/index.vue'
	import homeTitleTab from '@/standardHome/homeTitleTab/index.vue'
	import renovation from '@/renovation/renovationMain/index.vue'
	import homeBtmTab from '@/standardHome/homeBtmTab/index.vue'
	import homeIndexRenova from '@/pages/renovation/index.vue'
	import homePopup from '@/standardHome/homePopup/index.vue'
	export default{
		data(){
			return{
				scrollNum:0,
				homeInfo:"",	//首页去除nav和首页头部配置数据
				titleNav:"",	//titleNav数据
				boutique:"",	//boutique模块数据
				webViewInfo:{
					title:"首页",
				},
				pageInfo:{
					pageNo:1,
					sortNo:""
				},
				updateData:true,	//非首页tab模块开启开关
				swiperIndex:"0",	//轮播图选中下标
				swiperHeight:0,	//轮播图高度
				imageConfig:"",
				titleConfig:"",
				titleConfigTempalte:{	//头部配置
					kfDefaultImage:"appletsImages/kefu-bai.png",
					kfCeilingImage:"appletsImages/kefu.png",
					siginDefaultImage:"appletsImages/sign.gif",
					siginCeilingImage:"appletsImages/sign.gif",
					messageDefaultImage:"appletsImages/msg-bai.png",
					messageCeilingImage:"appletsImages/msg.png",
					title:{
						type:"0",
						defaultColorConfig:["#FF1558"],
						ceilingColorConfig:"#fff",
						imageConfig:"",
					},
					swiper:{
						type:"0",
						colorConfig:["#FF1558"],
						imageConfig:"",
					}
				},
				imgBaseUrls:"",
				plusFlag:"",
			}
		},
		onShow() {
			let plusFlag = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:""
			this.imgBaseUrls = this.$config.imgBaseUrl;
			if(this.webViewInfo.title=="首页" && this.homeInfo){
				try{
					this.$refs.renovation.updateNewuser()
					this.$refs.renovation.updateActivitys()
				}catch(e){
				}
			}
			if(this.plusFlag!=plusFlag){	//更新首页商品数据
				this.plusFlag = plusFlag
				if(this.webViewInfo.title=="首页"){
					this.$nextTick(()=>{
						try{
							this.$refs.renovation.updateGoods();
							if(this.boutique){
								this.$refs.homeBtmTab.updateGoods();
							}
						}catch(e){
							
						}
					})
				}else{
					this.updateData = false;
					this.$nextTick(()=>{
						this.updateData = true;
					})
				}
			}
		},
		onLoad() {
			uni.pageScrollTo({ scrollTop: 0, duration: 0 });
			this.getHomeInfo()
		},
		onHide() {
			if(this.webViewInfo.title=="首页"){
				this.$refs.renovation.clearInters()
			}
		},
		methods:{
			getHomeInfo(){
				decorateApi.storeList({location:"h5",url:"shouyezhuangxiu"}).then(res=>{
					this.plusFlag = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:""
					if(res.data.code==200){
						if(res.data.data.componentVos){
							let isHasTitleConfig = 0
							let vos = res.data.data.componentVos
							for(let i=0;i<vos.length;i++){
								if(vos[i].content && vos[i].content!="NaN"){
									vos[i].content = JSON.parse(vos[i].content)
								}
								if(vos[i].type=="twoColumnGoods"){
									for(let j=0;j<vos[i].content.componentPageVO.componentVoList.length;j++){
										vos[i].content.componentPageVO.componentVoList[j].unpromotionMinPrice = vos[i].content.componentPageVO.componentVoList[j].marketPrice
										vos[i].content.componentPageVO.componentVoList[j].minPrice = vos[i].content.componentPageVO.componentVoList[j].sellingPrice
									}
								}
								if(vos[i].type=="titleConfig" || vos[i].type=="titleNav" || vos[i].type=="boutique" || vos[i].type=='titleTpl'){
									try{
										this.$data[vos[i].type] = vos[i].content;
									}catch(e){
										
									}
									if(vos[i].type=="titleNav"){
										this.$data[vos[i].type].labels.unshift({title:"首页"})
									}
									if(vos[i].type=="titleConfig"){
										isHasTitleConfig += 1
										this.$nextTick(()=>{
											this.titleConfigJudge()
										})
									}
									vos.splice(i,1);
									i--;
								}
							}
							if(!isHasTitleConfig){
								this.titleConfig = this.titleConfigTempalte
							}
							this.homeInfo = res.data.data;
							this.getHomeOther()
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			setWebView(params){	
				if(params.title == this.webViewInfo.title){
					return
				}else{
					this.pageInfo.pageNo = 1
					let hrefLink = ""
					if(params.linkValue){
						hrefLink = params.linkValue.split("/")
					}
					params.linkValue = params.linkValue?hrefLink[hrefLink.length-1]:""
					this.webViewInfo = params;
					if(params.title=="首页"){
						uni.setNavigationBarTitle({
							title:'首页'
						})
						this.getHomeInfo()
					}else{
						if(this.webViewInfo.title=="首页"){
							this.$refs.renovation.clearInters()
						}else{
							this.updateData = false;
							this.$nextTick(()=>{
								this.updateData = true
							})
						}
					}
				}
				uni.pageScrollTo({ scrollTop: 0, duration: 0 });
			},
			swiperChange(index,imageH){	//轮播图变化时触发
				if(this.homeInfo.componentVos[0].type=="carousel" || (this.homeInfo.componentVos[1].type=="carousel" && this.homeInfo.componentVos[0].type=="backToTop")){
					this.swiperIndex = (index>this.titleConfig.swiper.colorConfig.length-1)?this.titleConfig.swiper.colorConfig.length-1:index
					this.swiperHeight = imageH
				}else{
					this.swiperHeight = 0
				}
				
			},
			titleConfigJudge(){	//颜色变化
				if(this.titleConfig.title.type==0 && this.titleConfig.swiper.type==0){
					if(this.titleConfig.title.defaultColorConfig.length!=this.titleConfig.swiper.colorConfig.length){
						this.titleConfig.swiper.colorConfig = this.titleConfig.title.defaultColorConfig
					}
				}else if(this.titleConfig.title.type==0  && this.titleConfig.swiper.type==1){
					this.titleConfig.title.defaultColorConfig = this.titleConfig.title.defaultColorConfig[0]
				}
			},
			getHomeOther(){
				this.$nextTick(()=>{
					this.$refs.homeHear.defaultWords()
					this.$refs.homeHear.unreadCount()
					if(this.boutique && this.$refs.homeBtmTab){
						this.$refs.homeBtmTab.getLabelItems()
					}
				})
			},
			judgeReachBottom(){
				let lastData = this.homeInfo.componentVos[this.homeInfo.componentVos.length-1].content
				this.pageInfo.sortNo = this.homeInfo.componentVos[this.homeInfo.componentVos.length-1].sortNo
				if(lastData && lastData.componentPageVO && lastData.componentPageVO.totalPageNum){
					if(this.pageInfo.pageNo<lastData.componentPageVO.totalPageNum){
						this.pageInfo.pageNo++;
						this.decorateList()
					}
				}
			},
			decorateList(){	//装修分页
				decorateApi.decorateList({location:"h5",url:"shouyezhuangxiu",...this.pageInfo}).then(res=>{
					if(res.data.code==200){
						if(res.data.data.componentVoList){
							this.homeInfo.componentVos[this.homeInfo.componentVos.length-1].content.componentPageVO.componentVoList = this.homeInfo.componentVos[this.homeInfo.componentVos.length-1].content.componentPageVO.componentVoList.concat(res.data.data.componentVoList)
						}
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
		},
		onPageScroll(res){
			this.scrollNum = res.scrollTop;
		},
		onReachBottom(res){  //上啦加载
			if(this.webViewInfo.title == "首页"){	//当tab在首页时
				if(this.boutique){
					this.$refs.homeBtmTab.getNextPageGoods();
				}else{
					if(this.homeInfo){
						this.judgeReachBottom()
					}
				}
			}else{
				this.$refs.renovationHome.judgeReachBottom()
			}
		},
		onPullDownRefresh(e){	//下拉刷新
			this.pageInfo.pageNo = 1
			if(this.webViewInfo.title=="首页"){
				this.$nextTick(()=>{
					this.$refs.renovation.updateNewuser()
					this.$refs.renovation.clearInters();
					this.$refs.renovation.updateActivitys()
					this.getHomeInfo();
				})
			}else{
				this.$refs.renovationHome.storeList()
			}
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				uni.showToast({
					title:"更新成功",
					icon:"none"
				})
			},1000)
		},
		components:{
			homeHear,
			homeTitleTab,
			homeBtmTab,
			homeIndexRenova,
			renovation,
			homePopup
		}
	}
</script>

<style scoped>
	.homeIndex{
		height: 100vh;
		position: relative;
	}
	.hearderConfig{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		z-index: 1;
	}
	.hearderConfig.absolute{
		position: absolute;
	}
	.swiperConfig{
		width: 100%;
		position: absolute;
		left: 0;
	}
</style>
