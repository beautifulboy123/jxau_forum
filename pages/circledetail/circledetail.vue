<template>
	<view class="content">

		<u-navbar back-icon-color="#5098FF">
			<view class="tag_title">
				<i class="iconfont icon-jinghao"></i>
				{{circle}}
			</view>
		</u-navbar>

		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="top_img_wrap">
					<u-image v-if="!this.one" width="100%" height="100%"
						src="https://s3.bmp.ovh/imgs/2021/12/2c322103376e6764.jpg">
					</u-image>
					<u-image v-else width="100%" height="100%"
						src="https://s3.bmp.ovh/imgs/2021/12/2dd10543de138a80.jpg">
					</u-image>

				</view>
				<view class="info_wrap">
					<view class="top_box">
						<view class="left_img">
							<view class="image">
								<u-image v-if="!this.one" width="170rpx" height="170rpx" border-radius="50%"
									src="https://s3.bmp.ovh/imgs/2021/12/2c322103376e6764.jpg">
								</u-image>
								<u-image v-else width="170rpx" height="170rpx" border-radius="50%"
									src="https://s3.bmp.ovh/imgs/2021/12/2dd10543de138a80.jpg">
								</u-image>
								
							</view>
						</view>
						<view class="right_info">
							<view class="base_info">
								66条动态 | 324位校友关注
							</view>
							<view class="follow">关注</view>
						</view>
					</view>
					<view class="desc_box">
						<view class="title">{{circle}}</view>
						<view class="desc">
							<span>简介</span>
							{{this.one ? '美食聚集地~' : '谁的东西被我捡了'}}
						</view>
					</view>
					<view class="circle_member">
						<view class="title">成员</view>
						<view class="list">
							<view class="item_wrap" v-if="index < 5" v-for="(item,index) in listData" :key="item.id">
								<view class="item">
									<u-image width="100%" height="100%" :src="item.imgUrl" border-radius="50%">
									</u-image>
								</view>
								<view v-if="index !== 0" class="txt">{{item.name}}</view>
								<view v-if="index === 0" class="first">圈主</view>
							</view>
							<view class="item_wrap" @click="showAllmember">
								<view class="item">
									<i class="iconfont icon-xianxingtubiaozhizuomoban-25"></i>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="inner_content">
					<u-tabs :list="tabslist.list" :current="tabslist.current" @change="change"></u-tabs>
					<view v-if="tabslist.current === 0" class="hot_wrap">
						<view v-for="item1 in tabsListData[0].list" :key="item1.id">
							<diary-item :list="item1" @togglelike="togglelike" @togglefolow="togglefolow"
								@togglecollect="togglecollect" @report="report" @todetail="todetail"
								@checklocation="checklocation" @tocirclepage="tocirclepage" @touserdetail="userdetail">
							</diary-item>
						</view>
					</view>
					<view v-if="tabslist.current === 1" class="follow_wrap">
						<view v-for="item2 in tabsListData[1].list" :key="item2.id">
							<diary-item :list="item2" @togglelike="togglelike" @togglefolow="togglefolow"
								@togglecollect="togglecollect" @report="report" @todetail="todetail"
								@checklocation="checklocation" @tocirclepage="tocirclepage" @touserdetail="userdetail">
							</diary-item>
						</view>
					</view>
				</view>

			</scroll-view>
			<u-popup v-model="membershow" mode="bottom" height="60%" border-radius="20">
				<view style="height: 100%;">
					<member-list :list="listData"></member-list>
				</view>
			</u-popup>
			<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>
		</view>


		<safe-footer></safe-footer>
	</view>
</template>

<script>
	import diaryItem from "../../components/diaryItem/diaryItem.vue"
	import memberList from "../../components/memberlist/memberlist.vue"
	import safeFooter from "../../components/safe-footer/safe-footer.vue"
	export default {
		components: {
			diaryItem,
			memberList,
			safeFooter
		},
		data() {
			return {
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 44,
				circleID: '',
				circle: '',
				membershow: false,
				circleDate: [{
					bg: 'https://s3.bmp.ovh/imgs/2021/12/2c322103376e6764.jpg'
				}],
				one: false,
				listData: [],
				tabslist: {
					list: [{
							name: "热门"
						},
						{
							name: '关注'
						}
					],
					current: 0
				},
				tabsListData: []
			}
		},
		onLoad(option) {
			this.circleID = option.id
			this.circle = option.name

			console.log(this.circleID)

			if (this.circleID == 333) {
				this.one = true

				this.listData = [

					{
						id: 121,
						name: "test",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/12628cf8aa4a62c7.jpg"
					},
					{
						id: 12151,
						name: "只能这样",
						imgUrl: "https://ftp.bmp.ovh/imgs/2021/12/e5f689c36806676e.jpg"
					},
					{
						id: 1721,
						name: "呃呃呃",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/12/da018a3f3d1d1864.jpg"
					},
					{
						id: 1771,
						name: "哼哼",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/6deded1a6fb9c0f9.png"
					},
					{
						id: 12121,
						name: "ks",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/91650c5bd05e52d2.jpg"
					},
					{
						id: 1221,
						name: "呵呵哒",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/12628cf8aa4a62c7.jpg"
					},
					{
						id: 1211,
						name: "案说法哈佛爱上了发给你按键",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/e2598f87131a75db.png"
					},
					{
						id: 1821,
						name: "一只牛",
						imgUrl: "https://i.bmp.ovh/imgs/2021/12/8b88ef4402ca6c9a.jpg"
					},
					{
						id: 1212,
						name: "我没掉东西",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/12/2bde20cb05be511c.jpg"
					}
				]

				this.tabsListData = [{
						name: '热门',
						id: 822,
						list: [{
								id: 2707,
								userid: 6347,
								username: "小耶",
								following: false,
								collect: false,
								circle: '美食',
								circleid: 81413,
								comments: 0,
								commentsData: [],
								location: {
									longitude: 115.8587658,
									latitude: 28.7591635,
								},
								avatar: "http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-20%3A23%3A13-3d5be1e1efc0fa750b478a7f277f8118.jpg",
								content: "简简单单吃一顿",
								imgArray: [
									"http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-20%3A24%3A37-734c8c0e329f19733034894c2d1b975a.jpg",
									"http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-20%3A24%3A37-8714ff1bec9208a40d510dfdb24f605e.jpg"
								]
							},
							{
								id: 8777,
								userid: 6347,
								username: "卤味好吃",
								following: false,
								collect: false,
								circle: '美食',
								circleid: 81413,
								comments: 0,
								commentsData: [],
								location: {
									longitude: 115.8587658,
									latitude: 28.7591635,
								},
								avatar: "http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-20%3A28%3A48-679ea5b2ff5d3d4e143733f1bf392e02.jpg",
								content: "大甲鱼造一个",
								imgArray: [
									"http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-20%3A27%3A49-fc700349a369b4b9ca57f6a05279b5ed.jpg"
								]
							},
							{
								id: 333,
								userid: 6347,
								username: "一拳超人",
								following: false,
								collect: false,
								circle: '美食',
								circleid: 333,
								comments: 5,
								commentsData: [],
								location: {
									longitude: 115.8587658,
									latitude: 28.7591635,
								},
								avatar: "http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A59%3A37-deb384f94227cc5fb817d5dccf142ed0.jpg",
								content: "这个鹅味道不错",
								imgArray: [
									"http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A57%3A18-916caa22b9ed583ce2026d8dde736cfc.jpg",
									"http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A57%3A46-83437f0a8cd19167b05ceb7e29ecc351.jpg",
									"http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A58%3A19-04689e196f19ced688678607567a988b.jpg"

								]
							},
						]
					},
					{
						name: '关注',
						id: 366,
						list: [{
							id: 561,
							userid: 7821,
							username: "ksks",
							following: false,
							collect: false,
							circle: '失物招领',
							circleid: 8113,
							comments: 3,
							commentsData: [],
							location: {
								longitude: 115.8587658,
								latitude: 28.7591635,
							},
							avatar: "https://s3.bmp.ovh/imgs/2021/11/f0007619e29465d0.jpg",
							content: "今天在操场捡到10块钱",
							imgArray: [
								"https://s3.bmp.ovh/imgs/2021/12/5133088b2bf4714b.jpg"
							]
						}]
					}
				]

			} else {

				this.listData = [{
						id: 12121,
						name: "ks",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/91650c5bd05e52d2.jpg"
					},
					{
						id: 1221,
						name: "呵呵哒",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/12628cf8aa4a62c7.jpg"
					},
					{
						id: 1211,
						name: "案说法哈佛爱上了发给你按键",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/e2598f87131a75db.png"
					},
					{
						id: 1821,
						name: "一只牛",
						imgUrl: "https://i.bmp.ovh/imgs/2021/12/8b88ef4402ca6c9a.jpg"
					},
					{
						id: 1212,
						name: "我没掉东西",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/12/2bde20cb05be511c.jpg"
					},
					{
						id: 121,
						name: "test",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/12628cf8aa4a62c7.jpg"
					},
					{
						id: 12151,
						name: "只能这样",
						imgUrl: "https://ftp.bmp.ovh/imgs/2021/12/e5f689c36806676e.jpg"
					},
					{
						id: 1721,
						name: "呃呃呃",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/12/da018a3f3d1d1864.jpg"
					},
					{
						id: 1771,
						name: "哼哼",
						imgUrl: "https://s3.bmp.ovh/imgs/2021/11/6deded1a6fb9c0f9.png"
					}
				]

				this.tabsListData = [{
						name: '热门',
						id: 822,
						list: [{
								id: 561,
								userid: 7821,
								username: "ksks",
								following: false,
								collect: false,
								circle: '失物招领',
								type:0,
								circleid: 8113,
								comments: 3,
								commentsData: [],
								location: {
									longitude: 115.8587658,
									latitude: 28.7591635,
								},
								avatar: "https://s3.bmp.ovh/imgs/2021/11/f0007619e29465d0.jpg",
								content: "今天在操场掉了10块钱",
								imgArray: [
									"https://s3.bmp.ovh/imgs/2021/12/5133088b2bf4714b.jpg"
								]
							},
							{
								id: 684,
								userid: 6347,
								username: "一只牛",
								following: false,
								collect: false,
								circle: '失物招领',
								type:1,
								circleid: 81413,
								comments: 6,
								commentsData: [],
								location: {
									longitude: 115.8587658,
									latitude: 28.7591635,
								},
								avatar: "https://i.bmp.ovh/imgs/2021/12/8b88ef4402ca6c9a.jpg",
								content: "水卡两张",
								imgArray: [
									"https://s3.bmp.ovh/imgs/2021/12/4541fde96bdb8d5b.jpg",
									"https://s3.bmp.ovh/imgs/2021/12/dd4ebac573649d8b.jpg"
								]
							},
							{
								id: 6724,
								userid: 6347,
								username: "呃呃呃",
								following: false,
								collect: false,
								circle: '失物招领',
								type:0,
								circleid: 81413,
								comments: 6,
								commentsData: [],
								location: {
									longitude: 115.8587658,
									latitude: 28.7591635,
								},
								avatar: "https://s3.bmp.ovh/imgs/2021/12/da018a3f3d1d1864.jpg",
								content: "我的衣服有人看到了吗",
								imgArray: [
									"https://s3.bmp.ovh/imgs/2021/12/ba2bf9c14908f731.jpg"
								]
							}

						]
					},
					{
						name: '关注',
						id: 366,
						list: [{
							id: 561,
							userid: 7821,
							username: "ksks",
							following: false,
							collect: false,
							circle: '失物招领',
							type:0,
							circleid: 8113,
							comments: 3,
							commentsData: [],
							location: {
								longitude: 115.8587658,
								latitude: 28.7591635,
							},
							avatar: "https://s3.bmp.ovh/imgs/2021/11/f0007619e29465d0.jpg",
							content: "今天在操场捡到10块钱",
							imgArray: [
								"https://s3.bmp.ovh/imgs/2021/12/5133088b2bf4714b.jpg"
							]
						}]
					}
				]
			}
		},
		methods: {
			showAllmember() {
				this.membershow = true
			},
			change(index) {
				this.tabslist.current = index
			},
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
				// uni.navigateTo({
				// 	url:`../circledetail/circledetail?id=${params.id}&name=${params.name}`
				// })
			},
			userdetail(id) {
				uni.navigateTo({
					url: `../userdetail/userdetail?id=${id}`
				})
			},
		},
		computed: {

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

			.tag_title {
				width: 100%;
				padding-left: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				// background-color: pink;
				i {
					margin-right: 10rpx;
					color: #5098FF;
				}
			}


			.main {
				flex: 1;
				overflow: hidden;
				position: relative;
				// background-color: pink;

				.top_img_wrap {
					height: 280rpx;
					// background-color: pink;
				}

				.info_wrap {
					// padding: 20rpx;
					// height: 60rpx;
					transform: translateY(-20rpx);

					.top_box {
						height: 90rpx;
						width: 100%;
						display: flex;
						align-items: center;
						border-top-left-radius: 20rpx;
						border-top-right-radius: 20rpx;
						background-color: #fff;

						.left_img {
							width: 240rpx;
							height: 100%;
							position: relative;
							// background-color: yellow;

							.image {
								position: absolute;
								width: 180rpx;
								height: 180rpx;
								top: -120rpx;
								left: 40rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								border-radius: 50%;
								background-color: #fff;
							}
						}

						.right_info {
							width: calc(100% - 240rpx);
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.base_info {
								font-size: 24rpx;
							}

							.follow {
								width: 120rpx;
								height: 60rpx;
								line-height: 60rpx;
								text-align: center;
								margin-right: 20rpx;
								border-radius: 15rpx;
								color: #FFFFFF;
								background-color: #5098FF;
							}
						}
					}

					.desc_box {
						padding: 0 20rpx;

						.title {
							width: 100%;
							font-size: 36rpx;
							font-weight: bold;
							color: #5098FF;

						}

						.desc {
							padding-top: 10rpx;
							min-height: 90rpx;
							border-bottom: 1rpx solid rgba(207, 207, 207, 0.3);

							// display: flex;
							span {
								// display: block;
								padding: 5rpx 12rpx;
								font-size: 24rpx;
								color: #bebebe;
								border-radius: 20rpx;
								margin-right: 10rpx;
								border: 1rpx solid rgba(207, 207, 207, 0.8);
							}
						}
					}

					.circle_member {
						padding: 10rpx 0;
						margin: 0 20rpx;
						border-bottom: 1rpx solid rgba(207, 207, 207, 0.3);

						.title {
							width: 100%;
							font-size: 28rpx;
							font-weight: bold;
							color: #5098FF;
							margin-bottom: 5rpx;
						}

						.list {
							width: 100%;
							display: flex;
							justify-content: space-evenly;

							.item_wrap {

								.item {
									width: 90rpx;
									height: 90rpx;
									border-radius: 50%;
									text-align: center;
									line-height: 90rpx;
									background-color: rgba(0, 0, 0, 0.1);

									i {
										font-size: 52rpx;
										color: #5098FF;
									}
								}

								.txt {
									width: 90rpx;
									font-size: 24rpx;
									text-align: center;
									overflow: hidden;
									text-overflow: ellipsis;
									/* 超出省略号 */
									white-space: nowrap;
								}

								.first {
									width: 100%;
									font-size: 24rpx;
									text-align: center;
									overflow: hidden;
									text-overflow: ellipsis;
									/* 超出省略号 */
									white-space: nowrap;
									color: #F0AD4E;
								}
							}


						}
					}
				}

				.inner_content {
					.hot_wrap {
						// padding-bottom: 40rpx;
					}

					.follow_wrap {
						// padding-bottom: 40rpx;
					}
				}
			}


		}
	}
</style>
