const vipConfig = {
	async getUserVip(type) {	//获取对应等级的会员
		 let a = await this.getUserInfo().then(res=>{
			let userInfoType = uni.getStorageSync("userInfo")?JSON.parse(uni.getStorageSync("userInfo")).plusFlag:0
			if(userInfoType || type){
				let vipInfo = res.filter(item=>item.type==(type?type:userInfoType))
				return vipInfo[0]
			}else{
				return res[0]
			}
		})
		return a?a:{} 
	},
	async getPartner(){	//获取合伙人配置
		let a = await this.partner().then(res=>{
			return res.distributorTypeList
		})
		return a
	},
	async getVipInfo(){	//获取会员配置
		let a = await this.getUserInfo().then(res=>{
			res = res.splice(1)
			return res
		})
		return a
	},
	async getUserInfo(){
		return new Promise((resolve, reject)=>{
			let inter = setInterval(()=>{
				if(uni.getStorageSync("memberConfig") && uni.getStorageSync("userInfo") && uni.getStorageSync("sessionId")){
					clearInterval(inter);
					resolve(JSON.parse(uni.getStorageSync("memberConfig")))
				}else if(uni.getStorageSync("memberConfig") && !uni.getStorageSync("sessionId")){
					clearInterval(inter);
					resolve(JSON.parse(uni.getStorageSync("memberConfig")))
				}
			},200)
		})
	},
	async partner(){	//是否存在合伙人配置
		return new Promise((resolve, reject)=>{
			let inter = setInterval(()=>{
				if(uni.getStorageSync("partnerConfig")){
					clearInterval(inter);
					resolve(JSON.parse(uni.getStorageSync("partnerConfig")))
				}
			},200)
		})
	},
	
}
export default vipConfig