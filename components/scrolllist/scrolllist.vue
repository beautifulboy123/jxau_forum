<template>
	<view class="scrolllist_wrap">
		<view :class="['loadingWraper',refresherTriggered ? 'isloading' : '']">
			<u-loading :show="true" size="36" color="#5098FF"></u-loading>
		</view>
		<scroll-view class="scroll" scroll-y="true" refresher-enabled refresher-default-style="none"
			:refresher-threshold='10' @refresherrestore="refresherrestore" :refresher-triggered="refresherTriggered"
			@refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower">
			<slot></slot>
			<view class="isloading">
				<u-loading :show="true" size="36" color="#5098FF"></u-loading>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		name: "scrolllist",
		data() {
			return {
				timer: null,
				refresherTriggered: false, //下拉刷新的状态
				bottomRefresherTriggered: false, //上拉加载的状态
			};
		},
		methods: {
			refresherrefresh() {
				this.refresherTriggered = true

				setTimeout(() => {
					this.refresherTriggered = false
				}, 2000)
			},
			scrolltolower(){
				this.$emit('bottomrefersh')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scrolllist_wrap {
		height: 100%;
		width: 100%;

		.loadingWraper {
			width: 100%;
			height: 0rpx;
			opacity: 0;
			transition: all 0.5s;
			// background-color: pink;
			text-align: center;
			overflow: hidden;
		}

		.isloading {
			height: 45rpx;
			text-align: center;
			opacity: 1;
		}

		.scroll {
			height: 100%;
			box-sizing: border-box;
			
		}
	}
</style>
