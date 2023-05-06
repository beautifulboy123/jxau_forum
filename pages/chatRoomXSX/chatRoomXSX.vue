<template>
	<view class="content">
		<u-navbar :is-back="true" back-icon-color="#5098FF" title="xsx写" title-color="#000"></u-navbar>

		<view class="main">
			<!-- 聊天列表 -->
			<scroll-view scroll-y="true" class="scorll-Y" :style=" 'height:'+scrollH+'px;' ">
				<view class="" v-for="i in 100">
					{{i}}
				</view>
			</scroll-view>
			<!-- 底部操作条 -->
			<view class="bottom">
				<input type="text" value="" placeholder="文明发言"  />
				<!-- <u-button type="primary" size='mini' class='sent' >发送</u-button> -->
				<view class="iconfont icon-xiaolian smile"></view>
				
				<u-icon name="plus-circle" color="#2979ff" size="70" @click='openAction'></u-icon>

			</view>
			<free-popup ref='action' >
				<view style='height:500rpx;' >
					
				</view>
				<text>123</text>
			</free-popup>
		</view>
		
		
	</view>
</template>

<script>
	import safeFooter from "../../components/safe-footer/safe-footer.vue"

	export default {
		components: {
			safeFooter
		},
		data() {
			return {
				scrollH:500
			}
		},
		onLoad(){
			uni.getSystemInfo({
				success:(res) => {
					this.scrollH = res.windowHeight - uni.upx2px(101)
				}
			})
		},
		methods:{
			openAction(){
				this.$refs.action.show()
			}
		}

	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #fff;

		.content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			.main {
				flex: 1;
				overflow: hidden;
				position: relative;
				// background-color: pink;
				.bottom{
					display: flex;
					height: 100rpx;
					position: fixed;
					right: 0;
					bottom: 0;
					left: 0;
					z-index: 1030;
					border-top: 2rpx #f4f4f4 solid;
					align-items: center;
					background-color: white;
					input{
						background-color: #f4f4f4;
						// padding: 2rpx ;
						flex: 1;
						height: 70%;
						// width: 70%;
						margin:0 20rpx;
						border-radius: 20rpx;
					}
					.smile{
						font-size:58rpx;
						color:#2979ff;
						margin-right: 8rpx;

					}
					.sent{
						margin-left: auto;
						margin-right: 14rpx;
					}
					.sent /deep/ button{
						width: 100rpx;
						height: 68rpx;
						font-size: 30rpx;
						border-radius: 20rpx;
					}
				}
				
			}
		}
	}
</style>
