import uniRequest from 'uni-request';
import utilsUrl from '@/config/index.js'
uniRequest.defaults.baseURL = utilsUrl.addImageUrl;
import AES from '@/utils/AES.js'
uniRequest.interceptors.request.use(config => {
	config.headers = {
		sessionId:uni.getStorageSync("sessionId"),
		client:"pc",
		"device-id":uni.getStorageSync('fmagent')||''
	}
	if(config.url.indexOf("base/file/mgmt/addOneImage")=="-1"){
		config.data = AES.encrypt(config.data);
		config.headers["Content-Type"] = "application/json;charset=UTF-8";
	}
	return config
}, error => {
})

uniRequest.interceptors.response.use(
	response => {
		response.data = JSON.parse(AES.decrypt(response.data));
		if(response.data.code=="4000001"){
			uni.showToast({
				title:'请重新登录',
				icon:"none"
			})
			uni.removeStorageSync("sessionId")
		}
		return response
	},
	err => {
		return err
	}
)

export default uniRequest;
