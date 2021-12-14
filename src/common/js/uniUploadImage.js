import AES from '@/utils/AES.js'
export default {
	methods:{
		uploadImage(res,params){	//上传图片   res为生成的临时地址   params为可选参数 
			uni.uploadFile({
				url: this.$config.addImageUrl + '/base/file/mgmt/addOneImage',
				filePath: res,
				name: 'image',
				success: (uploadFileRes) => {
					this.updateImage(JSON.parse(AES.decrypt(JSON.parse(uploadFileRes.data))),params)
				},
				fail: (params) => {
				}
			});
		}
	}
}