import promotionApi from '@/api/promotion/index.js';
import subscribe from '@/common/js/subscribe.js'
export default {
	// newUserType   只有首页在使用   用于隐藏优惠券背景颜色
	props:["oneColumnCoupon","newUserType"],
	data(){
		return{
			couponList:[],	//优惠券列表
			chooseItem:"",	//点击的优惠券数据
		}
	},
	methods:{
		desTriggerChange(){
			this.$set(this.chooseItem,"flag",this.chooseItem.flag?false:true)
		},
		claimCoupon(item){	//领取优惠券 点击触发
			this.chooseItem = item
			if(uni.getStorageSync("sessionId")){
				if(item.receiveType == 2){
					this.$refs.caimCouponPopup.open();
				}else{
					this.receiveCoupon(item)
				}
			}else{
				uni.showToast({
					title:"请登录",
					icon:"none"
				})
				setTimeout(()=>{
					this.$Router.push({
						path:"/pages/login/index"
					})
				})
			}
			
		},
		couponBgStyle(item){	//处理优惠券背景图片
			let backgorundImg = "";
			switch(Number(item.received)){
				case 0:	//未领取
					backgorundImg = this.getCouponImage("notReceiveImage",item.id);
				break;
				
				case 1:	//已领取
					backgorundImg = this.getCouponImage("receivedImage",item.id);
				break;
				
				case 2:	//已领完
					if(item.totalBindAmount>0){	
						backgorundImg = this.getCouponImage("receivedImage",item.id);
					}else{
						backgorundImg = this.getCouponImage("broughtOutImage",item.id)
					}
				break;
				
				case 3:	//已失效
					if(item.totalBindAmount>0){
						backgorundImg = this.getCouponImage("receivedImage",item.id);
					}else{
						backgorundImg = this.getCouponImage("broughtOutImage",item.id)
					}
				break;
				
				case 4:
					backgorundImg = this.getCouponImage("broughtOutImage",item.id)
				break
			}
			return (this.$config.imgBaseUrl+backgorundImg)
		},
		getCouponImage(type,id){
			if(this.oneColumnCoupon.imageVOS && this.oneColumnCoupon.imageVOS.length){
				for(let i=0;i<this.oneColumnCoupon.imageVOS.length;i++){
					if(this.oneColumnCoupon.imageVOS[i].id == id){
						return this.oneColumnCoupon.imageVOS[i][type]
					}
				}
			}else{
				return this.oneColumnCoupon[type]
			}
			
		},
		getDecorateCoupons(params){	//根据id获取优惠券信息
			promotionApi.getDecorateCoupons(params).then(res=>{
				if(res.data.code==200){
					for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].backgorundImg = this.couponBgStyle(res.data.data[i])
					}
					this.couponList = res.data.data;
				}else{
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
				}
			})
		},
		exchangeCouponUsePoint(){	//积分兑换优惠券
			promotionApi.exchangeCouponUsePoint({templateId:this.chooseItem.id}).then(res=>{
				if(res.data.code==200){
					this.$refs.caimCouponPopup.close();
					uni.showToast({
						title:"领取成功",
						icon:"none"
					});
					if(this.newUserType){
						this.zhuge.track("首页-新人专享券领取")
					}
					this.requestSubscribeMessage(subscribe.couponSubscribe)
					this.getCouponId()
				}else{
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
				}
			})
		},
		receiveCoupon(item){	//领取优惠券
			promotionApi.receiveCoupon(item.id).then(res=>{
				if(res.data.code==200){
					uni.showToast({
						title:"领取成功",
						icon:"none"
					})
					this.requestSubscribeMessage(subscribe.couponSubscribe)
					this.getCouponId()
				}else{
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
				}
			})
		},
		getCouponId(){	//获取优惠券id
			let coupon = []
			for(let i=0;i<this.oneColumnCoupon.itemVOS.length;i++){
				coupon.push(this.oneColumnCoupon.itemVOS[i].id)
			}
			this.getDecorateCoupons(coupon)
		}
	},
	mounted() {
		this.getCouponId()	//拿到优惠券id  然后去获取优惠券的领取情况
	}
}