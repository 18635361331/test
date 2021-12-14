// 下载 和 预览图片
export default {
	data(){
		return{
			isScopedFlag: false, //是否第二次授权  如果再次授权不再弹出警告弹窗
			authorizeFlag: false, //是否已授权
		}	
	},
	mounted(){
		//#ifdef MP-WEIXIN
		this.uniGetSetting();
		//#endif
	},
	methods:{
		previewImage() { //预览图片 兼容base64
			if(this.shareImage.indexOf('http')>-1){
				uni.downloadFile({
					url: this.shareImage,
					success: (res) => {
						if (res.statusCode == 200) {
							uni.previewImage({
								urls: [res.tempFilePath],
								longPressActions: {
									itemList: ['发送给朋友', '保存图片', '收藏'],
									success: function(data) {},
									fail: function(err) {}
								}
							})
						}
					},
					fail: (err) => {}
				})
			}else{
				let base64 = this.shareImage.replace(/^data:image\/\w+;base64,/, ""); //去掉data:image/png;base64,
				let filePath = wx.env.USER_DATA_PATH + '/hym_pay_qrcode.png';
				uni.getFileSystemManager().writeFile({
					filePath: filePath, //创建一个临时文件名
					data: base64, //写入的文本或二进制数据
					encoding: 'base64', //写入当前文件的字符编码
					success: res => {
						uni.previewImage({
							urls: [filePath],
							longPressActions: {
								itemList: ['发送给朋友', '保存图片', '收藏'],
								success: function(data) {},
								fail: function(err) {}
							}
						})
					},
					fail:err=>{
					}
				})
			}
		},
		previewDownLoad() { //点击下载前处理
			this.isScopedFlag = false;
			this.getDownLoadScope();
		},
		getDownLoadScope() { //下载临时文件
			if (!this.authorizeFlag) {
				uni.authorize({
					scope: "scope.writePhotosAlbum",
					success: (res) => {
						this.downloadFile()
					},
					fail: (err) => {
						if (!this.isScopedFlag) {
							uni.showModal({
								title: "警告",
								content: "您点击了拒绝授权，将无法正常保存图片，点击确定重新获取授权",
								confirm: () => {
									this.getDownLoadScope()
								},
								cancel: () => {
									uni.showToast({
										title: "您点击了取消",
										icon: "none"
									})
								}
							})
						}
						this.isScopedFlag = true;
		
					}
				})
			} else {
				this.downloadFile()
			}
		},
		downloadFile() {
			if(this.shareImage.indexOf('http')>-1){
				uni.downloadFile({
					url:this.shareImage,
					success:(res)=>{
						if(res.statusCode==200){
							uni.saveImageToPhotosAlbum({
								filePath:res.tempFilePath,
								success:(data)=>{
									uni.showToast({
										title:"保存成功",
										icon:"none"
									})
								},
								fail:(err)=>{
									uni.showToast({
										title:"您取消了保存",
										icon:"none"
									})
								}
							})
						}else{
							uni.showToast({
								title:"临时文件生成失败",
								icon:"none"
							})
						}
					}
				})
			}else{
				let base64 = this.shareImage.replace(/^data:image\/\w+;base64,/, ""); //去掉data:image/png;base64,
				let filePath = wx.env.USER_DATA_PATH + '/hym_pay_qrcode.png';
				uni.getFileSystemManager().writeFile({
					filePath: filePath, //创建一个临时文件名
					data: base64, //写入的文本或二进制数据
					encoding: 'base64', //写入当前文件的字符编码
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: filePath,
							success: (data) => {
								uni.showToast({
									title: "保存成功",
									icon: "none"
								})
							},
							fail: (err) => {
								uni.showToast({
									title:"临时文件生成失败",
									icon:"none"
								})
							}
						})
					},
					fail: err => {
						uni.showToast({
							title:"临时文件生成失败",
							icon:"none"
						})
					}
				})
			}
		},
		uniGetSetting() { //是否已授权
			let _this = this;
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.writePhotosAlbum']) {
						_this.authorizeFlag = false
					} else {
						_this.authorizeFlag = false
					}
				},
				fail(err) {}
			})
		},
	}
}