<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="digital-rolling">
			<view v-for="(item,index) in currentList" :key="index">
				<view class="digital-rolling-each-item-cur-item digital-rolling-dot" v-if="item === '.'">{{item}}
				</view>
				<swiper v-else :duration="500" :vertical="true" :circular="true" :current="item%10" class="digital-rolling-each-item">
					<swiper-item class="digital-rolling-each-item-cur-item" :class="chooseIndex>=index?'active':''" v-for="i in 10" :key="i">
						{{i - 1}}
					</swiper-item>
				</swiper>
			</view>
			<text class="hint">元</text>
			<view class="stopmove" @touchmove.stop.prevent="">
				<!-- 禁止用户手动滚动 -->
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view class="digital-rolling">
			<view v-for="(item,index) in currentList" :key="index">
				<view class="digital-rolling-each-item-cur-item digital-rolling-dot" v-if="item === '.'">
					{{item}}
				</view>
				<swiper v-else :duration="100" :vertical="true" :circular="true" :current="item%10" class="digital-rolling-each-item">
					<swiper-item class="digital-rolling-each-item-cur-item" :class="chooseIndex>=index?'active':''" v-for="i in 10" :key="i">
						<!-- {{i - 1}} -->
						{{i}}
					</swiper-item>
				</swiper>
			</view>
			<text class="hint">元</text>
			<view class="digital-rolling-stopmove" @touchmove.stop.prevent="">
				<!-- 禁止用户手动滚动 -->
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentList: [],
				count: 0,
				chooseIndex:0
			};
		},
		props:["digitFrom","digitTo","limit"],
		created() {
			this.genCurrentList();
			this.makeMove();
		},
		computed: {
			digitFromList() {
				return this.genTargetList(this.digitFrom);
			},
			digitToList() {
				return this.genTargetList(this.digitTo);
			}
		},
		methods: {
			genTargetList(target) {
				target = target?target:0;
				const arr = target.toString().split('');
				const hasDot = arr.includes('.');
				let index = 0;
				if (hasDot) {
					index = arr.indexOf('.');
				}
				if (this.limit) {
					const len = arr.length;
					if (hasDot) {
						if (len >= (index + 1 + this.limit)) {
							return arr.slice(0, index + this.limit + 1);
						}
					} else {
						arr.push('.');
					}
					const diff = Math.abs(len - index - 1 - this.limit);
					for (let i = 0; i < diff; i++) {
						arr.push(0);
					}
					return arr;
				}
				if (hasDot) {
					return arr.slice(0, index);
				}
				return arr;
			},
			genCurrentList() {
				for(let i=0;i<this.digitToList.length;i++){
					if(this.digitToList[i]==="."){
						this.chooseIndex=i-1;
					}
				}
				this.currentList = this.digitToList.map(item => item === '.' ? item : Number(item))
			},
			makeMove() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.count++;
					for (let i = 0; i < this.digitFromList.length; i++) {
						if (this.currentList[i] === '.'){
							this.chooseIndex=i-1;
							continue;
						} 
						if (this.currentList[i] % 10 != this.digitToList[i]) {
							this.$set(this.currentList, i, this.currentList[i] + 1);
						}
					}
					if (this.count === 9) {
						this.count = 0;
						clearInterval(this.timer);
					}
				}, 20)
			},
		},
		watch: {
			digitTo(newV, oldV) {
				if (newV.toString().length != oldV.toString().length) {
					this.genCurrentList();
				} else {
					this.makeMove();
				}
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
		}
	}
</script>

<style>
	.digital-rolling {
		display: flex;
		position: relative;
		align-items: center;
		height: 50rpx;
		width: 100%;

	}

	.digital-rolling-each-item {
		height: 50rpx;
		width: 20rpx;
		font-size: 32rpx;
		text-align: center;
	}

	.digital-rolling-each-item-cur-item {
		height: 100%;
		font-size: 28rpx;
		line-height: 50rpx;
	}
	.digital-rolling-each-item-cur-item.active{
		font-size: 32rpx;
		line-height: 46rpx;
	}
	.digital-rolling-stopmove {
		position: absolute;
		width: 750rpx;
		height: 50rpx;
		z-index: 101;
	}
	.none{
		display: none;
	}
	.hint{
		line-height: 46rpx;
	}
</style>
