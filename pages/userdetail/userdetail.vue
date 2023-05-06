<template>
	<view class="content">

		<u-navbar title="用户" back-icon-color="#5098FF"></u-navbar>

		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">

				<view class="top_info_box">
					<view class="image_box">
						<u-image width="100%" height="100%" src="https://s3.bmp.ovh/imgs/2021/12/16d0fa882cc0e092.jpg">
						</u-image>
					</view>
					<view class="avatar_box">
						<view class="avatar">
							<u-image width="152rpx" height="152rpx"
								src="https://s3.bmp.ovh/imgs/2021/12/ba66243319169664.jpg" border-radius="50%">
							</u-image>
						</view>
					</view>
					<view class="base_info_box">
						<view class="name">哈哈聊天</view>
						<!-- <i class="iconfont icon-guanliyuan_guanliyuanliebiao"></i> -->
					</view>
					<view class="bottom_option">
						<view class="left">
							<view class="item">
								<view class="count">1</view>
								<view class="title">关注</view>
							</view>
							<view class="item">
								<view class="count">45</view>
								<view class="title">粉丝</view>
							</view>
							<view class="item">
								<view class="count">0</view>
								<view class="title">获赞</view>
							</view>
						</view>

						<view class="right">
							<view>
								<view class="follow_btn">关注</view>
							</view>
							<view>
								<view class="chat_btn">
									<i class="iconfont icon-xiaoxi1"></i>
								</view>
							</view>

						</view>
					</view>
				</view>

				<view class="user_content">
					<view class="total_num">
						共1条动态
					</view>
					<view class="content_item" v-for="(item,index) in list" :key="item.id">
						<diary-item :list="item" @togglelike="togglelike" @togglefolow="togglefolow"
							@togglecollect="togglecollect" @report="report" @todetail="todetail"
							@checklocation="checklocation" @tocirclepage="tocirclepage" @touserdetail="userdetail">
						</diary-item>
					</view>
				</view>





			</scroll-view>


		</view>


		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>
	</view>
</template>

<script>
	import diaryItem from "../../components/diaryItem/diaryItem.vue"

	export default {
		components: {
			diaryItem
		},
		data() {
			return {
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 44,
				userid: '',
				list: [{
						id: 3333,
						userid: 6347,
						username: "哈哈聊天",
						following: false,
						collect: false,
						circle: '日常',
						circleid: 81413,
						comments: 23,
						commentsData: [],
						location: {
							longitude: 115.8587658,
							latitude: 28.7591635,
						},
						avatar: "https://s3.bmp.ovh/imgs/2021/12/ba66243319169664.jpg",
						content: "天气不错",
						imgArray: [
							"https://s3.bmp.ovh/imgs/2021/12/16d0fa882cc0e092.jpg"
						]
					},

				]

			}
		},
		onLoad(option) {
			this.userid = option.id
		},
		methods: {
			togglelike(id) {

				console.log("togglelike 文章id为 " + id)

			},
			togglefolow(id) {
				console.log("togglefolow 用户id为 " + id)
				this.$refs.uTips.show({
					title: '关注/取消关注成功'
				});

			},
			togglecollect(id) {
				console.log("togglecollect 文章id为 " + id)
				this.$refs.uTips.show({
					title: '收藏/取消收藏成功'
				});
			},
			report(id) {
				console.log("report 举报 文章id为 " + id)
			},
			todetail(id) {
				console.log("todetail 跳转文章详情 文章id为 " + id)

				uni.navigateTo({
					url: `../contentdetail/contentdetail?id=${id}`
				})

			},
			checklocation(location) {
				uni.openLocation({
					longitude: location.longitude,
					latitude: location.latitude
				})
			},
			tocirclepage(params) {
				uni.navigateTo({
					url: `../circledetail/circledetail?id=${params.id}&name=${params.name}`
				})
			},
			userdetail(id) {
				// uni.navigateTo({
				// 	url: `../userdetail/userdetail?id=${id}`
				// })
			},
		},
		computed: {

		}
	}
</script>

<style lang="scss" scoped>
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
				// background-color: pink;

				.top_info_box {
					position: relative;

					.image_box {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 98;
						overflow: hidden;
						border-bottom-left-radius: 20rpx;
						border-bottom-right-radius: 20rpx;
						// background-color: pink;
					}

					.avatar_box {
						height: 280rpx;
						padding: 0 20rpx;
						display: flex;
						align-items: flex-end;
						// background-color: pink;

						.avatar {
							width: 160rpx;
							height: 160rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: #fff;
							border-radius: 50%;
							z-index: 99;
						}
					}

					.base_info_box {
						height: 120rpx;
						padding: 0 20rpx;
						display: flex;
						align-items: center;
						font-size: 32rpx;
						font-weight: bold;

						// background-color: yellow;

						.name {
							margin-right: 20rpx;
							z-index: 99;
						}

						i {
							color: #5098FF;
							z-index: 99;
						}
					}

					.bottom_option {
						height: 160rpx;
						display: flex;

						.left {
							width: 65%;
							height: 100%;
							display: flex;
							z-index: 99;
							color: #fff;

							.item {
								width: calc(100% / 3);
								height: 100%;
								display: flex;
								flex-wrap: wrap;
								flex-direction: column;
								justify-content: center;


								.count {
									width: 100%;
									font-size: 32rpx;
									font-weight: bold;
									text-align: center;

								}

								.title {
									width: 100%;
									text-align: center;

								}
							}
						}

						.right {
							width: 35%;
							height: 100%;
							display: flex;
							justify-content: space-evenly;
							align-items: center;
							z-index: 99;
							// background-color: blue;

							.follow_btn {
								padding: 10rpx 30rpx;
								color: #5098FF;
								border-radius: 30rpx;

								border: 1rpx solid rgba(0, 89, 255, 0.5);
							}

							.chat_btn {
								padding: 10rpx 16rpx;
								color: #5098FF;
								border-radius: 30rpx;

								border: 1rpx solid rgba(0, 89, 255, 0.5);


							}
						}
					}
				}

				.user_content {
					margin-top: 20rpx;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					border-top: 1rpx solid rgba(152, 157, 163, 0.3);
					background-color: #fff;
					z-index: 100;

					.total_num {
						padding: 20rpx;
						font-size: 28rpx;
						font-weight: bold;
						z-index: 100;
					}
				}
			}


		}
	}
</style>
