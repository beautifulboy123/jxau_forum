<template>
	<view class="wrap">
		<view class="title">活跃度</view>
		<view class="list_item_wrap" v-for="(item,index) in list" :key="item.id">
			<view class="left">
				<u-image width="100%" height="100%" :src="item.imgUrl"
					border-radius="50%"></u-image>
			</view>
			<view class="right">
				<view class="inner_l">
					<view class="top">{{item.name}}</view>
					<view class="bottom"> 12条动态 | 358粉丝</view>
				</view>
				<view class="inner_r">
					<u-image v-if="index === 0" width="64rpx" height="64rpx"
						src="http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-11-22-08%3A24%3A33-38417334dd5cc925381047809b1be2e4.png">
					</u-image>
					<u-image v-else-if="index === 1" width="64rpx" height="64rpx"
						src="http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-11-22-08%3A24%3A33-5a45de0d8ac6304dbe5f5c8e3d2da086.png">
					</u-image>
					<u-image v-else-if="index === 2" width="64rpx" height="64rpx"
						src="http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-11-22-08%3A24%3A33-f2f1a644bb4a2770b0fc213eb8a2687f.png">
					</u-image>
					<u-image v-else-if="index === 3" width="64rpx" height="64rpx"
						src="http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-11-22-08%3A24%3A33-708a9f866b6403d9d1538054b3be915d.png">
					</u-image>
					<u-image v-else-if="index === 4" width="64rpx" height="64rpx"
						src="http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-11-22-08%3A24%3A33-6c8ca004e6014098d0bc92bd33b5bbba.png">
					</u-image>
					<view v-else class="num">{{index + 1}}</view>
				</view>
			</view>
		</view>
		<u-empty v-if="list.length === 0" mode="list" text="暂无数据"></u-empty>
		<safe-footer></safe-footer>
	</view>
</template>

<script>
	import safeFooter from "../../components/safe-footer/safe-footer.vue"
	export default {
		components:{
			safeFooter
		},
		name: "memberlist",
		props:{
			list:{
				type:Array,
				default:[],
				required:true
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 20rpx;
		height: 100%;
		
		.title{
			width: 100%;
			height: 60rpx;
			font-size: 32rpx;
			color: #5098FF;
		}

		.list_item_wrap {
			height: 120rpx;
			display: flex;
			align-items: center;
			// background-color: pink;

			.left {
				width: 100rpx;
				height: 100rpx;
				// background-color: yellow;
			}

			.right {
				width: calc(100% - 100rpx);
				height: 100%;
				display: flex;

				.inner_l {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					box-sizing: border-box;
					padding-left: 20rpx;
					width: 80%;
					height: 100%;

					.top {
						// height: 40%;
						width: 100%;
						font-size: 30rpx;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						/* 超出省略号 */
						white-space: nowrap;
					}

					.bottom {
						// height: 40%;
						width: 100%;
						font-size: 24rpx;
					}
				}

				.inner_r {
					width: 20%;
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: center;
					// background-color: pink;
					
					.num {
						font-size: 36rpx;
						font-weight: bold;
						color: #5098FF;
					}

				}
			}
		}
	}
</style>
