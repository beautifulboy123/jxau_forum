<template>
	<view class="content">

		<u-navbar :is-back="false">
			<view class="slot-wrap">
				<u-search class="index_search" :show-action="false" disabled @click="tosearchpage"></u-search>
			</view>
		</u-navbar>

		<view class="main">
			<scroll-view scroll-y="true" class="circle_scroll">
				<view class="circle_top_recommend">
					<view class="left">
						<view class="first" @click="tocircleDetail(0)">
							<u-image :src="hotcircle[0].imgUrl" height="100%" border-radius="20rpx"></u-image>
							<view class="mask">
								<view class="inner_box">
									<i class="iconfont icon-jinghao"></i>
									<view class="text">
										{{hotcircle[0].name}}
									</view>
								</view>
							</view>
						</view>
						<view class="item_wrap">
							<view class="item" v-if="index > 0 && index < 3" v-for="(item,index) in hotcircle"
								@click="tocircleDetail(index)" :key="index">
								<view class="inner_box">
									<i class="iconfont icon-jinghao"></i>
									<view class="text">
										{{item.name}}
									</view>
								</view>
							</view>
						</view>

					</view>
					<view class="right">
						<view class="item" @click="tocircleDetail(3)">
							<view class="inner_box">
								<i class="iconfont icon-jinghao"></i>
								<view class="text">
									{{hotcircle[3].name}}
								</view>
							</view>
						</view>
						<view class="item more" @click="showmore">
							<view class="inner_box">
								<view class="text">
									全部圈子
								</view>
								<i class="iconfont icon-jiantou"></i>
							</view>
						</view>
					</view>
				</view>


				<view class="circle_tabs">
					<u-tabs bar-width="20" :list="tabs.list" :current="tabs.current" @change="Tabschange"></u-tabs>
				</view>

				<swiper class="swiper" :style="{height:circles.length * 200 +'rpx'}" :current="tabs.current"
					@change="swiperchange">
					<swiper-item>
						<view class="circle_item_wrap" v-for="(item,index) in circles" :key="item.id">
							<view class="circle_item" @click="tocircle(index)">
								<view class="left">
									<view class="top">
										<i class="iconfont icon-jinghao"></i>
										<view class="text">{{item.name}}</view>
									</view>
									<view class="bottom">
										{{item.contentCount}}条动态 | {{item.follow}}位校友关注
									</view>
								</view>
								<view class="right">
									<view class="image_wrap">
										<u-image :src="item.imgUrl" height="100%" border-radius="50%"></u-image>
									</view>
									<view class="circle_arrow">
										<i class="iconfont icon-yuanxingjiantou"></i>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="follow_box">
							<view class="outer">
								<view class="follow_item_wrap" v-for="(item,index) in folow" :key="item.id" @click="followcircle(index)">
									<view class="follow_item">
										<view class="left">
											<view class="image_wrap">
												<u-image :src="item.imgUrl" height="100%" border-radius="50%"></u-image>
											</view>
											<view class="info">
												<view class="name">{{item.name}}</view>
												<view class="hot">热度 {{item.hot}}</view>
											</view>
										</view>
										<view class="right">
											<i v-if="item.level === 0" class="iconfont icon-dengji-A"></i>
											<i v-else-if="item.level === 1" class="iconfont icon-dengji-B"></i>
											<i v-else-if="item.level === 2" class="iconfont icon-dengji-C"></i>
											<i v-else-if="item.level === 3" class="iconfont icon-dengji-D"></i>
										</view>
									</view>
								</view>
							</view>

						</view>
					</swiper-item>
				</swiper>

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
				tabs: {
					list: [{
							name: "圈子"
						},
						{
							name: '关注'
						}
					],
					current: 0
				},
				circles: [{
						id: 5216,
						name: '失物招领',
						contentCount: 64,
						follow: 267,
						imgUrl: 'https://s3.bmp.ovh/imgs/2021/12/2c322103376e6764.jpg'
					},
					{
						id: 5416,
						name: '好电影',
						contentCount: 64,
						follow: 267,
						imgUrl: 'https://s3.bmp.ovh/imgs/2021/12/b64c5f95bc207d05.jpg'
					},
					{
						id: 5716,
						name: '学习资料',
						contentCount: 64,
						follow: 267,
						imgUrl: 'http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A47%3A2-bc99b220adad26ed364b201cab5564ca.jpg'
					},
					
					
					


				],
				folow: [{
						id: 5716,
						name: '失物招领',
						hot: 5324,
						level: 0,
						imgUrl: 'https://s3.bmp.ovh/imgs/2021/12/2c322103376e6764.jpg'
					},
					{
						id: 5716,
						name: '美食',
						hot: 324,
						level: 1,
						imgUrl: 'https://s3.bmp.ovh/imgs/2021/12/2dd10543de138a80.jpg'
					},
					{
						id: 576,
						name: '好电影',
						hot: 324,
						level: 2,
						imgUrl: 'https://s3.bmp.ovh/imgs/2021/12/b64c5f95bc207d05.jpg'
					},
					{
						id: 4716,
						name: 'UI',
						hot: 5324,
						level: 3,
						imgUrl: "http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A47%3A58-6ac041ddf9f703898c1928f8f9afefc6.jpg"
					},
					{
						id: 4316,
						name: '前端',
						hot: 424,
						level: 3,
						imgUrl: 'http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A48%3A48-68c912ccb0ceff76a059a4e3a968cdf8.jpg'
					}
				],

				hotcircle: [{
						id: 1215,
						name: '失物招领',
						imgUrl: 'https://s3.bmp.ovh/imgs/2021/12/2c322103376e6764.jpg'
					},
					{
						id: 1235,
						name: 'UI',
						imgUrl: 'https://s3.bmp.ovh/imgs/2021/11/f0007619e29465d0.jpg'
					},
					{
						id: 115,
						name: '机器学习',
						imgUrl: 'https://s3.bmp.ovh/imgs/2021/11/f0007619e29465d0.jpg'
					},
					{
						id: 1285,
						name: '美食',
						imgUrl: 'https://s3.bmp.ovh/imgs/2021/11/f0007619e29465d0.jpg'
					},
					
					
					
					
					
					
					
					
					
				]
			}
		},
		onLoad() {

		},
		methods: {
			tosearchpage() {
				uni.navigateTo({
					url: "../allcirclepage/allcirclepage"
				})
			},
			tocircleDetail(index) {
				uni.navigateTo({
					url: `../circledetail/circledetail?id=${this.hotcircle[index].id}&name=${this.hotcircle[index].name}`
				})
			},
			tocircle(index) {
				//列表的跳转
				uni.navigateTo({
					url: `../circledetail/circledetail?id=${this.circles[index].id}&name=${this.circles[index].name}`
				})
			},
			followcircle(index){
				//关注的跳转
				uni.navigateTo({
					url: `../circledetail/circledetail?id=${this.folow[index].id}&name=${this.folow[index].name}`
				})
			},
			showmore() {
				uni.navigateTo({
					url: "../allcirclepage/allcirclepage"
				})
			},
			Tabschange(index) {

				//tab点击切换

				this.tabs.current = index;
				console.log("切换到：" + this.tabs.list[index].name)
			},
			swiperchange(e) {
				//swiper 滑动切换
				//同步tab 栏
				this.tabs.current = e.detail.current
			},
			...mapMutations([])
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

			.slot-wrap {
				display: flex;
				align-items: center;
				width: 100%;
				/* 如果您想让slot内容占满整个导航栏的宽度 */
				/* flex: 1; */
				/* 如果您想让slot内容与导航栏左右有空隙 */
				padding: 0 30rpx;

				.index_search {
					width: 100%;
				}
			}



			.main {
				flex: 1;
				overflow: hidden;
				position: relative;
				// background-color: pink;

				.circle_scroll {
					width: 100%;
					height: 100%;
					// background-color: pink;
				}

				.circle_top_recommend {
					height: 260rpx;
					display: flex;
					flex-wrap: wrap;
					// background-color: pink;

					.left {
						width: 100%;
						// height: 70%;
						display: flex;
						flex-wrap: wrap;
						align-items: center;
						justify-content: space-around;
						// background-color: yellow;

						.first {
							width: 45%;
							height: 160rpx;
							border-radius: 20rpx;
							overflow: hidden;
							// background-color: red;
							position: relative;


							.mask {
								position: absolute;
								height: 35%;
								width: 100%;
								bottom: 0;
								font-weight: bold;
								border-bottom-left-radius: 20rpx;
								border-bottom-right-radius: 20rpx;
								color: #fff;
								background-color: rgba(0, 89, 255, 0.5);

								.inner_box {
									width: 100%;
									height: 100%;
									display: flex;
									justify-content: center;
									align-items: center;
									// background-color: pink;

									.text {
										max-width: 80%;
										margin-left: 10rpx;
										overflow: hidden;
										text-overflow: ellipsis;
										/* 超出省略号 */
										white-space: nowrap;
									}
								}


							}
						}

						.item_wrap {
							width: 45%;
							height: 100%;
							display: flex;
							flex-wrap: wrap;
							flex-direction: column;
							align-items: center;
							justify-content: space-evenly;
							// background-color: #fff;

							.item {
								width: 100%;
								height: 65rpx;
								border-radius: 60rpx;
								background-color: rgba(0, 89, 255, 0.6);
								font-weight: bold;
								color: #fff;

								.inner_box {
									width: 100%;
									height: 100%;
									display: flex;
									justify-content: center;
									align-items: center;
									// background-color: pink;

									.text {
										max-width: 80%;
										margin-left: 10rpx;
										overflow: hidden;
										text-overflow: ellipsis;
										/* 超出省略号 */
										white-space: nowrap;
									}
								}


							}
						}
					}

					.right {
						width: 100%;
						// height: 25%;
						display: flex;
						flex-wrap: wrap;
						align-items: flex-start;
						justify-content: space-around;

						.item {
							width: 45%;
							height: 65rpx;
							display: flex;
							border-radius: 60rpx;
							background-color: rgba(0, 89, 255, 0.6);
							font-weight: bold;
							color: #fff;

							.inner_box {
								width: 100%;
								height: 100%;
								display: flex;
								justify-content: center;
								align-items: center;
								// background-color: pink;

								.text {
									max-width: 80%;
									margin-left: 10rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									/* 超出省略号 */
									white-space: nowrap;
								}
							}


						}

						.more {
							background-color: #fff;
							color: #5098FF;
							border: 1rpx solid rgba(0, 89, 255, 0.5);

							.text {
								margin-right: 20rpx;
							}

							i {
								font-size: 24rpx;
							}
						}




					}
				}

				.swiper {

					.circle_item_wrap {
						height: 200rpx;
						padding: 20rpx;
						// background-color: pink;

						.circle_item {
							width: 100%;
							height: 100%;
							display: flex;
							border-radius: 20rpx;
							background-color: rgba(207, 207, 207, 0.1);

							.left {
								width: 70%;
								height: 100%;

								// background-color: pink;

								.top {
									width: 100%;
									padding-top: 30rpx;
									padding-left: 20rpx;
									// height: 40%;
									display: flex;
									align-items: center;

									i {
										color: #5098FF;
									}

									.text {
										font-size: 32rpx;
										font-weight: bold;
										padding-left: 10rpx;
										overflow: hidden;
										text-overflow: ellipsis;
										/* 超出省略号 */
										white-space: nowrap;
									}
								}

								.bottom {
									width: 100%;
									padding-top: 10rpx;
									padding-left: 20rpx;
									font-size: 24rpx;
									// height: 40%;
									display: flex;
									align-items: center;
								}
							}

							.right {
								width: 30%;
								height: 100%;
								position: relative;
								display: flex;
								align-items: center;
								justify-content: center;

								.image_wrap {
									width: 140rpx;
									height: 140rpx;
									// background-color: pink;
								}

								.circle_arrow {
									position: absolute;
									right: 20rpx;
									bottom: 10rpx;

									i {
										color: #5098FF;
										font-size: 62rpx;
									}
								}
							}
						}
					}

					.follow_box {
						width: 100%;
						height: 100%;
						display: flex;
						flex-wrap: wrap;
						align-items: flex-start;


						.outer {
							width: 100%;
							display: flex;
							flex-wrap: wrap;

							.follow_item_wrap {
								width: 50%;
								height: 100rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								// background-color: pink;

								.follow_item {
									width: 90%;
									height: 90%;
									display: flex;
									border-radius: 20rpx;
									background-color: rgba(207, 207, 207, 0.1);

									.left {
										width: 80%;
										height: 100%;
										display: flex;
										align-items: center;
										justify-content: space-evenly;
										// background-color: pink;

										.image_wrap {
											width: 80rpx;
											height: 80rpx;
										}

										.info {
											width: calc(100% - 100rpx);
											height: 100%;
											display: flex;
											flex-wrap: wrap;
											align-items: center;
											// background-color: #fff;

											.name {
												width: 100%;
												overflow: hidden;
												text-overflow: ellipsis;
												/* 超出省略号 */
												white-space: nowrap;
												font-size: 30rpx;
											}

											.hot {
												font-size: 24rpx;
											}
										}

									}

									.right {
										width: 20%;
										height: 100%;
										display: flex;
										align-items: center;
										justify-content: center;
										color: #5098FF;
										
										i{
											font-size: 42rpx;
										}
										
										
									}

								}
							}

						}


					}
				}
			}


		}
	}
</style>
