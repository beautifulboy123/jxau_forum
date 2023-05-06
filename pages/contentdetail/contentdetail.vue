<template>
	<view class="content">

		<u-navbar title="详情" back-icon-color="#5098FF"></u-navbar>

		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">
				<diary-item :list="content" :detailpage="true" @togglelike="togglelike" @togglefolow="togglefolow"
					@togglecollect="togglecollect" @report="report" @todetail="todetail" @checklocation="checklocation"
					@tocirclepage="tocirclepage" @touserdetail="userdetail">
				</diary-item>

				<view class="comment_box">
					<view class="title">评论(32)</view>
					<comment :fakedata="testData" @maintogglelike="maintogglelike" @togglelike="togglelike"
						@bigreply="bigreply" @smallreply="smallreply" @touserdetail="userdetail"
						@checkallreply="checkallreply"></comment>
				</view>
			</scroll-view>
		</view>


		<u-popup class="replyBox" v-model="popupshow" mode="bottom" border-radius="20" height="60%">


			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="item_reply">
					<view class="left" @click="toUserDetail(item1.userid)">
						<u-image width="100%" height="100%" :src="currentCheckComment.avatar" border-radius="50%">
						</u-image>
					</view>
					<view class="right" @click="bigReply(item1,index1)">
						<span
							@click.stop="toUserDetail(currentCheckComment.userid)">{{currentCheckComment.username}}：</span>{{currentCheckComment.comment}}
					</view>
					<view class="right_like" @click="mainTogglelike(item1,index1)">
						<i
							:class="['iconfont' ,currentCheckComment.like ? 'icon-xihuan2' : 'icon-xihuan1',currentCheckComment.like ? 'like' : '',]"></i>
					</view>
				</view>
				<reply-list :replylist="currentCheckComment.reply" @togglelike="replytoggleLike"></reply-list>
			</scroll-view>

		</u-popup>



		<view class="fake_inp"></view>
		<view class="bottom_input_wrap" :style="{bottom:inpPosition ? inpPosition : 0 }">
			<input class="inp" type="text" v-model="inpcontent" :placeholder="placeholder" :focus="inpfocus"
				@keyboardheightchange="keyboardheightchange" @blur="handleblur" :adjust-position="false"
				hold-keyboard />
			<view class="btn" @click="sendMessage">发送</view>
		</view>

		<!-- <safe-footer></safe-footer> -->


		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>
	</view>
</template>

<script>
	import commentData from "../../testData/comments.js"

	import DiaryItem from "../../components/diaryItem/diaryItem.vue"
	import comment from "../../components/comment/comment.vue"
	import safeFooter from "../../components/safe-footer/safe-footer.vue"

	import replyList from "../../components/allReply/allReply.vue"

	import contentData from "../../testData/contentdata.js"

	export default {
		components: {
			DiaryItem,
			comment,
			replyList,
			safeFooter
		},
		data() {
			return {
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 44,
				contentID: '',
				inpfocus: false,
				placeholder: '',
				currentReplyID: '',
				inpPosition: 0,
				inpcontent: '',

				testData: commentData,
				popupshow: false,
				replys: [],

				currentCheckComment: {},
				currentReplyItemIndex: '',

				content: {
					id: 561,
					userid: 7821,
					username: "ksks",
					following: false,
					collect: false,
					circle: '美食',
					circleid: 8113,
					comments: 23,
					commentsData: [],
					location: {
						longitude: 115.8587658,
						latitude: 28.7591635,
					},
					avatar: "https://s3.bmp.ovh/imgs/2021/11/f0007619e29465d0.jpg",
					badge: [],
					content: "范家发为范家发为比办公空间不可被概括为对的范家发为比办对的范家发为比办对的范家发为比办对的范公空间不可被概括为比办公空范家发为范家发为比办公空间不可被概括为对的范家发为比办对的范家发为比办对的范家发为比办对的范公空间不可被概括为比办公空间不可被概括为间不可被概括为",
					imgArray: [
						"https://s3.bmp.ovh/imgs/2021/11/91650c5bd05e52d2.jpg",
						"https://s3.bmp.ovh/imgs/2021/11/12628cf8aa4a62c7.jpg",
						"https://s3.bmp.ovh/imgs/2021/11/e2598f87131a75db.png",
						"https://s3.bmp.ovh/imgs/2021/11/6deded1a6fb9c0f9.png",
						"https://s3.bmp.ovh/imgs/2021/11/f0007619e29465d0.jpg",
						"https://s3.bmp.ovh/imgs/2021/11/ead26623c4006561.jpg",
						"https://s3.bmp.ovh/imgs/2021/11/bf8fffd2a4f239ef.jpg"
					]
				},
			}
		},
		onLoad(option) {
			this.contentID = option.id


			if (this.currentReplyID === '') {
				this.placeholder = "评论一下吧~"
			}


			contentData.forEach(item => {

				if (this.contentID == item.id) {
					this.content = item
				}
			})


		},
		methods: {
			replytoggleLike(params) {



				this.currentCheckComment.reply[params.index].like = !this.currentCheckComment.reply[params.index].like
			},
			checkallreply(params) {
				console.log(params)

				let {
					item,
					index
				} = params

				this.popupshow = true

				this.currentCheckComment = item

				// console.log(this.currentCheckComment)
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

				// uni.navigateTo({
				// 	url: `../contentdetail/contentdetail?id=${id}`
				// })

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

			//评论的事件
			touserdetail(id) {

			},
			maintogglelike(params) {

				this.testData[params.index].like = !this.testData[params.index].like
			},
			togglelike(params) {
				this.testData[params.index1].reply[params.index2].like = !this.testData[params.index1].reply[params.index2]
					.like
			},
			bigreply(params) {


				//切换角色了，清空内容
				this.inpcontent = ''

				//唤起键盘
				this.inpfocus = true

				//修改input提示信息
				this.placeholder = "回复 " + this.testData[params.index].username
				this.currentReplyName = this.testData[params.index].username
				this.currentReplyID = this.testData[params.index].userid



			},
			smallreply(params) {

				//切换角色了，清空内容
				this.inpcontent = ''

				//唤起键盘
				this.inpfocus = true

				//修改input提示信息
				this.placeholder = "回复 " + this.testData[params.index1].reply[params.index2].username
				this.currentReplyName = this.testData[params.index1].reply[params.index2].username
				this.currentReplyID = this.testData[params.index1].reply[params.index2].userid

				this.currentReplyItemIndex = params.index1

			},


			keyboardheightchange(e) {



				this.inpPosition = e.detail.height + 'px'
			},
			handleblur() {

				this.inpfocus = false;
				this.inpPosition = 0

			},
			sendMessage() {


				if (this.placeholder == '评论一下吧~') {


					let messageObj = {
						userid: 59121,
						username: "test123",
						avatar: "http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A59%3A37-deb384f94227cc5fb817d5dccf142ed0.jpg",
						comment: this.inpcontent,
						commentid: (new Date()).getTime(),
						like: false,
						reply: []
					}

					this.testData.unshift(messageObj)
				} else {

					console.log(this.currentReplyName)

					if (this.currentReplyItemIndex === '') {
						this.testData.forEach((item, index) => {

							if (item.username == this.currentReplyName) {


								console.log(item)


								let replyObj = {
									userid: 59121,
									username: "test123",
									avatar: "http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A59%3A37-deb384f94227cc5fb817d5dccf142ed0.jpg",
									replyusername: this.currentReplyName,
									comment: this.inpcontent,
									commentid: (new Date()).getTime(),
									like: false,
								}

								console.log(this.testData[index].reply)

								this.testData[index].reply.unshift(replyObj)
							}

						})
					} else {
						let replyObj = {
							userid: 59121,
							username: "test123",
							avatar: "http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A59%3A37-deb384f94227cc5fb817d5dccf142ed0.jpg",
							replyusername: this.currentReplyName,
							comment: this.inpcontent,
							commentid: (new Date()).getTime(),
							like: false,
						}

						this.testData[this.currentReplyItemIndex].reply.unshift(replyObj)
					}


				}



				this.clickSend = true
				this.inpfocus = true
				this.inpcontent = ''
				this.currentReplyName = ''
				this.currentReplyItemIndex = ''





			}
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
			position: relative;




			.main {
				flex: 1;
				overflow: hidden;
				position: relative;
				// background-color: pink;

				.comment_box {
					padding: 0 20rpx;

					.title {
						width: 100%;
						font-size: 32rpx;
					}
				}
			}

			.bottom_input_wrap {
				padding: 10rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// background-color: pink;
				border-top: 1rpx solid rgba(185, 185, 185, 0.1);
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				transition: all 0.5s;
				background-color: #fff;


				.inp {
					padding: 10rpx;
					width: calc(100% - 160rpx);
					border-radius: 10rpx;
					background-color: rgba(185, 185, 185, 0.1);
				}

				.btn {
					width: 100rpx;
					height: 60rpx;
					border-radius: 12rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #5098FF;
					color: #fff;
				}

			}

			.fake_inp {
				padding: 10rpx;
				height: 100rpx;
				// background-color: pink;
			}


		}
	}

	.replyBox {

		.item_reply {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30rpx;
			padding: 20rpx;
			background-color: rgba(185, 185, 185, 0.1);
			// background-color: pink;

			.left {
				width: 90rpx;
				height: 90rpx;
				// background-color: yellow;
			}

			.right {
				width: calc(100% - 160rpx);
				// background-color: green;

				span {
					font-weight: bold;
				}
			}

			.like {
				color: red;
			}
		}
	}
</style>
