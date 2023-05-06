<template>
	<view class="content home">
		<view class="fixed-bg" :style="{backgroundImage:'url('+userInfo.bg+')'}"></view>
	
		<u-navbar title="我的" back-icon-name='scan' :background="{background:'rgba(0,0,0,0)'}" :border-bottom='false'
			back-icon-color='white' title-color='white'></u-navbar>
		<!-- 		<view class="nav-tabbar">
			<u-icon name="scan" class='scan'></u-icon>
		</view>
 -->
		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="avatar">
					<view>
						
						<u-avatar :show-level='true' :src="userInfo.avatar" size='large' @click='ToEditdata' level-icon='level'></u-avatar>
					</view>
					<view class="bbb"><text>{{'康僧'}}</text></view>
				</view>
				<view class="bottom">
					<view class="bottom-left">
						<view class="box">
							<view>1</view>
							<view>关注</view>
						</view>
						<view class="box">
							<view>0</view>
							<view>粉丝</view>
						</view>
						<view class="box">
							<view>0</view>
							<view>获赞</view>
						</view>
					</view>
					<view class="bottom-right">
						<view class="edit">
							<!-- <button type="default" size="mini" plain>编辑资料</button> -->
							<u-button shape="circle" :hair-line='true' size="mini" :plain="true" height='40rpx'
								:ripple="true" style="background:transparent ;" @click='ToEditdata()'>编辑资料</u-button>
						</view>
						<view class="menu">
							<u-button shape="circle" size="mini" plain height='40rpx' :ripple="true" @click='ToSet()'>三
							</u-button>
						</view>
					</view>
				</view>
				<view class="card">
					<view class="tabs">
						<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"
							active-color="#5098FF"></u-tabs>
					</view>


					<view class="card-main">
			
						<view class="drmaic-main" v-if="current== 0">
							<view v-if="contentList.length == 0" class="empty">
								<image
									src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6867bdee-20ed-4501-aaff-ace5f5bc6ea5/1bd64c86-1c89-431c-b23d-c3b5ff845e8e.jpg"
									mode="aspectFill"></image>
								<view class="btn-issue">
									<u-button shape="square" size="medium" :ripple="true" @click="navToPublish">立即发布</u-button>
								</view>
							</view>
							<view class="drmaic-item" v-for="(item ,i) in contentList" :key="item.id">
								
									<diary-item :list="{...item,avatar:userInfo.avatar,username:userInfo.name}" @togglelike="togglelike" @togglefolow="togglefolow"
										@togglecollect="togglecollect" @report="report" @todetail="todetail" @checklocation="checklocation" @tocirclepage="tocirclepage" @touserdetail="userdetail"></diary-item>
							</view>
							<!-- oooooo -->
						</view>
						<view class="drmaic-main" v-if="current== 1">
							<view v-if="contentList.length == 0" class="empty">
								<image
									src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6867bdee-20ed-4501-aaff-ace5f5bc6ea5/1bd64c86-1c89-431c-b23d-c3b5ff845e8e.jpg"
									mode="aspectFill"></image>
							</view>
							<view class="drmaic-item" v-for="(item ,i) in contentList" :key="item.id">

							</view>
							<!-- oooooo -->
						</view>
						<view class="drmaic-main" v-if="current== 2">
							<view v-if="contentList.length == 0" class="empty">
								<image
									src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6867bdee-20ed-4501-aaff-ace5f5bc6ea5/1bd64c86-1c89-431c-b23d-c3b5ff845e8e.jpg"
									mode="aspectFill"></image>
							</view>
							<view class="drmaic-item" v-for="(item ,i) in contentList" :key="item.id ">

							</view>
							<!-- oooooo -->
						</view>
						<view class="drmaic-main" v-if="current== 3">
							<view v-if="contentList.length == 0" class="empty">
								<image
									src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6867bdee-20ed-4501-aaff-ace5f5bc6ea5/1bd64c86-1c89-431c-b23d-c3b5ff845e8e.jpg"
									mode="aspectFill"></image>
							</view>
							<view class="drmaic-item" v-for="(item ,i) in contentList" :key="item.id">

							</view>
							<!-- oooooo -->
						</view>
					</view>
					<!-- 					<view class="" v-for="i in 100" :key="i">
						{{i}}
					</view> -->

				</view>

			</scroll-view>
		</view>


		<u-tabbar :list="getTabBar" active-color="#5098FF"></u-tabbar>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters,
		mapState,
	} from 'vuex';
import diaryItem from "../../components/diaryItem/diaryItem.vue"
	
	export default {
		components:{
		diaryItem	
		},
		computed: {
			...mapGetters(['getTabBar']),
			...mapState(['userInfo'])
		},
		data() {
			return {
				avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.91ye.cn%2FFileUpload%2Fixncfkctiwn.jpg&refer=http%3A%2F%2Fwww.91ye.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639892114&t=d2dc977adbd4382ce4cb1f9d1db9c6c2',
				list: [{
						name: '动态',
						count: 1
					}, {
						name: '收藏',
						count: 0
					}, {
						name: '喜欢',
						count: 0
					},
					// {
					// 	name: '打赏',
					// 	count: 5
					// }
				],
				current: 0,
				contentList: [{
								id: 561,
								userid: 7821,
								username: "康僧",
								following: false,
								collect: false,
								circle: '美食',
								circleid:8113,
								comments: 23,
								commentsData: [],
								adudit:true,
								location: {
									longitude: 115.8587658,
									latitude: 28.7591635,
								},
								avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.91ye.cn%2FFileUpload%2Fixncfkctiwn.jpg&refer=http%3A%2F%2Fwww.91ye.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639892114&t=d2dc977adbd4382ce4cb1f9d1db9c6c2',
								badge: [],
								content: "我自己发布的哈哈哈哈",
								imgArray: [
									"https://s3.bmp.ovh/imgs/2021/11/91650c5bd05e52d2.jpg",
									"https://s3.bmp.ovh/imgs/2021/11/12628cf8aa4a62c7.jpg",
									
								]
							}

						]
					
			}
		},
		onLoad() {
			// this.avatar = uni.getStorageSync("username-avatar")
			
		
		},
		create(){
				// this.avatar = uni.getStorageSync("username-avatar")
		},
		methods: {
			...mapMutations([]),
			change(index) {
				this.current = index;
				console.log(index)
				if(index === 0){
					this.getDymaic()
				}else{
					this.contentList = []
				}

			},
			getDymaic() {
				this.contentList =  [{
								id: 561,
								userid: 7821,
								username: "康僧",
								following: false,
								collect: false,
								circle: '美食',
								circleid:8113,
								comments: 23,
								commentsData: [],
								location: {
									longitude: 115.8587658,
									latitude: 28.7591635,
								},
								avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.91ye.cn%2FFileUpload%2Fixncfkctiwn.jpg&refer=http%3A%2F%2Fwww.91ye.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639892114&t=d2dc977adbd4382ce4cb1f9d1db9c6c2',
								badge: [],
								content: "我自己发布的哈哈哈哈",
								imgArray: [
									"https://s3.bmp.ovh/imgs/2021/11/91650c5bd05e52d2.jpg",
									"https://s3.bmp.ovh/imgs/2021/11/12628cf8aa4a62c7.jpg",
									
								]
							}

						] // 调用获取 getDymaic
			},
			getCollect() {
				this.contentList = [] // 调用获取 getCollect
			},
			getLike() {
				this.contentList = [] // 调用获取 getLike
			},
			getMoney() {
				this.contentList = [] // 调用获取 getLike
			},
			navToPublish(){
					uni.switchTab({
						url: '../add/add',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
			},
			ToEditdata() {
				uni.navigateTo({
					url: '../editdata/editdata'
				})
			},
			ToSet() {
				uni.navigateTo({
					url: '../set/set'
				})
			},

		},
		
	}
</script>
<style>
	page {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
<style lang="scss" scoped>
	.main {
		flex: 1;
		overflow: hidden;
		position: relative;
		//background-color: pink;

	}

	.fixed-bg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2018-11-06%2F5be0f564235b7.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639892174&t=95ba842e962b829ed0f19d6856a4b047);
	}



	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.nav-tabbar {
			height: 100px;
			width: 100vw;
			font-size: 55rpx;
			display: flex;
			align-items: center;
		}

		.scan {
			margin-top: 50rpx;
			padding: 10rpx 30rpx;
			color: white;
		}

		.avatar {
			width: 100vh;
			height: 300rpx;
			// background-color: #007AFF;
			padding: 20px 16px;
		}

		.avatar view:nth-child(1) {
			margin-bottom: 18rpx;
		}

		.avatar view:nth-child(2) {
			color: white;
			font-size: 32rpx;
		}

		.bottom {
			display: flex;
			align-items: center;
		}

		.bottom-left {
			display: flex;
			width: 78vw;

			// margin-left: 20rpx;
			.box {
				padding: 0 20px;
				color: white;

			}

			.box view:nth-child(1) {
				font-size: 30rpx;
				font-weight: bold;
				margin-bottom: 4rpx;

			}

			.box view:nth-child(2) {
				font-size: 19rpx;
			}

		}

		.bottom-right {
			display: flex;

			.edit {
				// width: 120rpx;
				height: 40rpx;

			}

			.edit /deep/ button {
				background: rgba($color: #111111, $alpha: 0.6);
				color: white;
				height: 55rpx;
				width: 150rpx;
				border: 1px solid white;
			}

			.menu {
				width: 100rpx;
				height: 50rpx;
				margin-left: 20rpx;
			}

			.menu /deep/ button {
				background: rgba($color: #111111, $alpha: 0.6);
				color: white;
				height: 55rpx;
				width: 76rpx;
				border: 1px solid white;
			}
		}

		.card {
			margin-top: 40rpx;
			width: 100%;
			min-height: 60vh;
			background-color: white;
			border-radius: 30rpx;

			.tabs {
				padding: 10rpx 70rpx;
			}

			.card-main {
				.empty {
					width: 100vw;

					image {
						margin-top: 40rpx;
						width: 100%;
					}

					.btn-issue {
						width: 200rpx;
						margin: 0 auto;
					}
				}

				.btn-issue /deep/ button {
					color: #333333;
					width: 200rpx;
					background-color: $uni-color-primary;
					color: white;
				}
			}


		}

		// .card view:nth-child(1) {
		// 	margin-top: 130rpx;
		// }
	}
</style>
