// #ifdef H5
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
// #endif
export default{
	methods:{
		copy(str) {
			// #ifndef H5
			uni.setClipboardData({
				data: str,
				success() {
					uni.showToast({
						title: "复制成功",
						icon: "none"
					})
				},
				fail(err) {}
			})
			// #endif
		
			// #ifdef H5
			uniCopy({
				content: str,
				success: (res) => {
					uni.showToast({
						title: res,
						icon: 'none'
					})
				},
				error: (e) => {
					uni.showToast({
						title: e,
						icon: 'none',
						duration: 3000,
					})
				}
			})
			// #endif
		},
	},
}