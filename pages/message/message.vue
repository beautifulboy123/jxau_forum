<template>
	<view class="content">
		<u-navbar :is-back="false" title="消息"></u-navbar>

		<view class="main">
			<scroll-view class="message_scroll" scroll-y="true" style="height: 100%;">
				<view class="message_list_wrap">
					<view class="item_wrap" v-for="(item1,index1) in systemList" :key="item1.id" @click="chart(item1)">
						<view class="item">
							<view class="left">
								<view class="img_wrap">
									<i v-if="index1 === 0" class="iconfont icon-xitongtongzhi"></i>
									<i v-else-if="index1 === 1" class="iconfont icon-xihuan2"></i>
									<i v-else-if="index1 === 2" class="iconfont icon-xiaoxi2"></i>
									<u-image v-else-if="index1 === 3" width="100%" height="100%"
										src="https://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-11-21-11%3A37%3A19b3fc7646cfcfe4286d7913b7b2639d93.jpg"
										border-radius="50%">
									</u-image>
									<u-image v-else-if="index1 === 4" width="100%" height="100%"
										src="https://s3.bmp.ovh/imgs/2021/12/d76321bafd236500.jpg"
										border-radius="50%">
									</u-image>
								</view>
							</view>
							<view class="right">
								<view class="top">{{item1.name}}</view>
								<view class="bottom">{{item1.newmessage === 0 ? '暂无新消息' : item1.newmessage +'条新消息'}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<u-tabbar :list="getTabBar" active-color="#5098FF"></u-tabbar>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				systemList: [{
						id: 145,
						name: "系统通知",
						type:0,
						newmessage: 0
					},
					{
						id: 1745,
						name: "赞和收藏",
						type:0,
						newmessage: 3
					},
					{
						id: 1465,
						name: "评论",
						type:0,
						newmessage: 0
					},
					{
						id: 1485,
						name: "官方客服",
						type:1,
						newmessage: 0
					},
					{
						id: 512,
						name: "大橘猫",
						type:1,
						newmessage: 1
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			chart(item){
				
				this.systemList[4].newmessage = 0
				
				
				uni.navigateTo({
					url:`../chatRoom/chatRoom?id=${item.id}&name=${item.name}&type=${item.type}`
				})
			}
		},
		computed: {
			...mapGetters(['getTabBar'])
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;

		.content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;




			.main {
				flex: 1;
				overflow: hidden;
				position: relative;

				.message_list_wrap {
					height: 100%;

					.item_wrap {
						width: 100%;
						padding: 10rpx 20rpx;

						.item {
							width: 100%;
							height: 140rpx;
							display: flex;

							&:active {
								background-color: rgba(0, 0, 0, 0.1);
							}

							// background-color: pink;

							.left {
								width: 140rpx;
								height: 140rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								// background-color: yellow;

								.img_wrap {
									width: 120rpx;
									height: 120rpx;
									border-radius: 50%;
									text-align: center;
									line-height: 120rpx;
									color: #fff;
									background-color: rgba(0, 89, 255, 0.5);

									i {
										font-size: 62rpx;
									}
								}
							}

							.right {
								width: calc(100% - 140rpx);
								height: 100%;
								display: flex;
								flex-wrap: wrap;
								align-items: center;

								.top {
									width: 100%;
									font-size: 32rpx;
									font-weight: bold;
									padding-top: 10rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									/* 超出省略号 */
									white-space: nowrap;
								}

								.bottom {
									width: 100%;
									font-size: 26rpx;
									padding-bottom: 10rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									/* 超出省略号 */
									white-space: nowrap;
								}
							}
						}
					}

				}
			}


		}
	}
</style>
