<template>
	<view class="pgae">
		<view class="detailsText">
			详情
		</view>
		<view class="img" >
			<block v-for="item,index in obj">
				<block v-if="item.type=='img'">
					<image :src="item.val" mode="widthFix" @click="goUrl('img',item.url,item.val)"></image>
				</block>
				<block v-else>
					<rich-text @click="goUrl('text',item.url,item.val)" :nodes="item.val.replace(/\<img/gi,'<img style=max-width:100%;height:auto;display:block')"></rich-text>
				</block>
			</block>
		</view>
		<!-- 弹出层放大 -->
		<img-preview ref='previewPopup' :previewImageList='imgList' :previewIndex="1" :hasHttp="true"></img-preview>
	</view>
</template>

<script>
	import imgPreview from './imgPreview.vue'	//头部图片放大
	import downLoadAndPreview from '@/common/js/downloadAndPreview.js'
	
	export default {
		props: ['goodsInfo'],
		mixins:[downLoadAndPreview],
		components:{
			imgPreview
		},
		data() {
			return {
				arr: '',
				obj: [],
				imgList:[],
			}
		},
		mounted() {
			let str = this.goodsInfo.description
			if(!str){
				return
			}
			let urlList = [] // url 合集
			let imgList = [] // 图片
			let regex_img = new RegExp(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi);
			// 取出url  每个标签都有url，默认url=#
			let regex_url = new RegExp((/[^>]*url=['"]([^'"]+)[^>]*>/gi));
			let html_url = '' // 文本处理后
			if(str.indexOf('url=')>-1){
				html_url = str.replace(regex_url,  (match, capture)=>{
					urlList.push(capture)
					// 取出img
					let html_img = match.replace(regex_img, (match2, capture2) =>{
						imgList.push(capture2)
						return '</p>';
					});
					var newStr = html_img;
					return newStr;
				});
			}else{
				// 取出img
				html_url = str.replace(regex_img, (match2, capture2) =>{
					imgList.push(capture2)
					return '</p>';
				});
			}

			
			
			let arr = html_url.split(/<\/p>/); //按符号分割  /\<img>/
			if(arr.length>1){
				arr.pop()
			}
			let obj = [],
				j = -1
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].indexOf('<p') > -1) {
					obj.push({
						type: 'text',
						val: arr[i],
						url:urlList[i]
					})
				} else {
					j++
					obj.push({
						type: 'img',
						val: imgList[j].replace('http:','https:'),
						url:urlList[i]
					})
				}
			}
			this.obj = obj
		},
		methods:{
			goUrl(type,url,val){ 
				if((!url||url!='')  && type == 'img'){ // 图片预览
					this.shareImage = val
					this.previewImage()
				}else if(url&&url!=''){
					try{
						if(url.indexOf(this.$config.localhostUrl)!="-1"){	//站内页面
							let hrefLink = url.split("/")
							if(hrefLink[hrefLink.length-2]=="act"){	//装修页面
								this.$Router.push({
									path:"/pages/renovation/index",
									query:{
										url:hrefLink[hrefLink.length-1]
									}
								})
							}
						}else{
							if(url=="/pages/category/index" || url=="/pages/index/index" || url=="/pages/my/index" || url=="/pages/cart/index"){
								uni.switchTab({
									url:url
								})
							}else{
								this.$Router.push({
									path:url
								})
							}
						}
					}catch(e){
						
					}
				}
			},
		}

	}
</script>

<style>
	.goodsDetails {
		width: 100%;
		height: auto;
	}

	.img image {
		max-width: 100%;
		height: auto;
		display: block
	}

	.detailsText {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		padding-left: 24rpx;
		font-weight: 700;
		font-size: 34rpx;
		background-color: #fff;
	}

	img {
		width: 100%;
		height: auto;
	}
</style>
