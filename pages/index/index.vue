<template>
	<view class="content">

		<!-- 自定义导航栏放这..-->
		<u-navbar :is-back="false">
			<view class="slot-wrap">
				<u-search class="index_search" :show-action="false" disabled @click="tosearchpage"></u-search>
			</view>
		</u-navbar>

		<!-- 内容写进main里  如果滚动区域不同，改变scroll-view的位置-->
		<view class="main">

			<view class="index_tabs">
				<view class="left_tabs">
					<u-tabs bar-width="20" :list="tabs.list" :current="tabs.current" @change="Tabschange"></u-tabs>
				</view>
				<view class="right_menu" @click="showpopup">
					<i class="iconfont icon-caidan"></i>
				</view>
			</view>



			<swiper class="swiper" :current="tabs.current" @change="swiperchange">
				<swiper-item v-for="item1 in tabsListData" :key='item1.id'>
					<scroll-list @bottomrefersh="pushData">
						<view v-for="item2 in item1.list" :key="item2.id">
							<diary-item :list="item2" @togglelike="togglelike" @togglefolow="togglefolow"
								@togglecollect="togglecollect" @report="report" @todetail="todetail"
								@checklocation="checklocation" @tocirclepage="tocirclepage" @touserdetail="userdetail">
							</diary-item>
						</view>
					</scroll-list>
				</swiper-item>
			</swiper>

			<mypopup :show="popupshow" @hide='hidepopup'>
				<view class="upper">
					<scroll-view scroll-y="true" style="height: 100%;">
						<view class="tags_wrap">
							<view class="tags" v-for="(item,index) in tabs.list" :key="index" @click="deleteTag(index)">
								<view class="txt">
									{{item.name}}
								</view>
								<i class="iconfont icon-chacha"></i>
							</view>
						</view>
						<u-empty v-if="tabs.list.length === 0" mode="list"></u-empty>
					</scroll-view>
				</view>
				<view class="lower">
					<scroll-view scroll-y="true" style="height: 100%;">
						<view class="tags_wrap">
							<view class="tags" v-for="(item,index) in tabslist" :key="index" @click="addTag(index)">
								<view class="txt">
									{{item.name}}
								</view>
								<i class="iconfont icon-jia"></i>
							</view>
						</view>
						<u-empty v-if="tabs.list.length === 0" mode="list"></u-empty>
					</scroll-view>
				</view>
			</mypopup>
			<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>

		</view>


		<u-tabbar :list="getTabBar" active-color="#5098FF"></u-tabbar>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	import scrollList from "../../components/scrolllist/scrolllist.vue"
	import diaryItem from "../../components/diaryItem/diaryItem.vue"
	import mypopup from "../../components/mypopup/mypopup.vue"


	import recommendData from "../../testData/index.js"

	export default {
		components: {
			scrollList,
			diaryItem,
			mypopup
		},
		data() {
			return {
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 44,
				popupshow: false,
				tabs: {
					list: [{
						name: '关注'
					}, {
						name: '推荐'
					}, {
						name: '热门'
					}],
					current: 1
				},
				tabslist: [{
						name: '美食'
					}, {
						name: '电影'
					}, {
						name: '音乐'
					}, {
						name: '表白'
					}, {
						name: '数码相机'
					}, {
						name: '自行车'
					}, {
						name: '很长长长长长长长的一个tag'
					}, {
						name: '更长长长长长长长长长长长的一个tag'
					},
					{
						name: '美食'
					}, {
						name: '电影'
					}, {
						name: '音乐'
					}, {
						name: '表白'
					}, {
						name: '数码相机'
					}, {
						name: '自行车'
					}, {
						name: '很长长长长长长长的一个tag'
					}, {
						name: '更长长长长长长长长长长长的一个tag'
					}
				],
				tabsListData: []
			}
		},
		onLoad() {
			this.tabsListData = recommendData
		},
		methods: {
			pushData() {
				let list = [{
						id: 2432,
						userid: 6347,
						username: "大肥猫",
						following: false,
						collect: false,
						circle: '学习资料',
						circleid: 81413,
						comments: 0,
						commentsData: [],
						location: {
							longitude: 115.8587658,
							latitude: 28.7591635,
						},
						avatar: "http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-20%3A20%3A59-06a021b5737956363f55c59d59479708.jpg",
						content: "有没有人有概率论的资料啊，期末考试了 复习一下",
						imgArray: [
							"http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-20%3A21%3A15-7dc006581ba4796ea35994156e1c2211.jpg",
						]
					},
					{
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
					}
				]

				setTimeout(() => {

					list.forEach(item => {
						this.tabsListData[1].list.push(item)
					})

					console.log(this.tabsListData)


				}, 1500)

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
			showpopup() {
				console.log("ok")
				this.popupshow = true
			},
			hidepopup() {
				console.log("close")
				this.popupshow = false
			},
			deleteTag(index) {

				//假同步，没有处理轮播图  关注，推荐，热门 不能删除没处理

				this.tabslist.push(this.tabs.list[index])
				this.tabs.list.splice(index, 1);
			},
			addTag(index) {

				this.tabs.list.push(this.tabslist[index])
				this.tabslist.splice(index, 1);
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
				uni.navigateTo({
					url: `../circledetail/circledetail?id=${params.id}&name=${params.name}`
				})
			},
			userdetail(id) {
				uni.navigateTo({
					url: `../userdetail/userdetail?id=${id}`
				})
			},
			tosearchpage() {
				uni.navigateTo({
					url: "../searchpage/searchpage"
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

				.index_tabs {
					width: 100%;
					height: 80rpx;
					display: flex;

					// background-color: pink;

					.left_tabs {
						width: calc(100% - 80rpx);
						height: 100%;
					}

					.right_menu {
						width: 80rpx;
						height: 100%;
						transform: rotateZ(90deg);
						display: flex;
						align-items: center;
						justify-content: center;
						box-shadow: rgba(0, 0, 0, 0.45) 0px 25rpx 20rpx -28rpx;

						i {
							font-size: 42rpx;
							transform: rotateZ(90deg);
						}

					}
				}

				.swiper {
					width: 100%;
					height: calc(100% - 80rpx);
					// background-color: pink;

				}

				.upper {
					width: 100%;
					height: 50%;
					padding: 10rpx;

					// background-color: pink;



					.tags_wrap {
						display: flex;
						flex-wrap: wrap;

						.tags {
							// box-sizing: border-box;
							padding: 10rpx 20rpx;
							display: flex;
							align-items: center;
							border-radius: 30rpx;
							font-size: 16rpx;
							margin-right: 10rpx;
							margin-bottom: 10rpx;
							border: 1rpx solid rgba(0, 0, 0, 0.1);

							&:active {
								background-color: #FA3534;
								color: #fff;

								i {
									color: #fff;
								}
							}

							.txt {
								max-width: 350rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								/* 超出省略号 */
								white-space: nowrap;
							}

							i {
								color: #FA3534;
								margin-left: 15rpx;
							}
						}
					}





				}

				.lower {
					width: 100%;
					height: 50%;
					padding: 10rpx;
					// background-color: yellow;

					.tags_wrap {
						display: flex;
						flex-wrap: wrap;

						.tags {
							// box-sizing: border-box;
							padding: 10rpx 20rpx;
							display: flex;
							align-items: center;
							border-radius: 30rpx;
							font-size: 16rpx;
							margin-right: 10rpx;
							margin-bottom: 10rpx;

							border: 1rpx solid rgba(0, 0, 0, 0.1);

							&:active {
								background-color: #5098FF;
								color: #fff;

								i {
									color: #fff;
								}
							}

							.txt {
								max-width: 350rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								/* 超出省略号 */
								white-space: nowrap;
							}

							i {
								color: #5098FF;
								margin-left: 15rpx;
							}
						}
					}

				}
			}


		}
	}
</style>
