<template>
	<view class="content">
		<u-navbar :is-back="true" back-icon-color="#5098FF" :title="target.name" title-color="#000"></u-navbar>

		<view class="main">
			<view :class="['loadingWraper',refresherTriggered ? 'isloading' : '']">
				<u-loading :show="true" size="36" color="#5098FF"></u-loading>
			</view>
			<scroll-view scroll-y="true" class="chat_scroll" :style="{height: `calc(100% - `+ inputHeight +`)`}"
				scroll-with-animation :scroll-into-view="scrollToView" refresher-enabled refresher-default-style="none"
				:refresher-threshold='30' @refresherrestore="refresherrestore" :refresher-triggered="refresherTriggered"
				@refresherrefresh="refresherrefresh">
				<view class="system_chat_wrap" v-if="target.type == 0">
					<view class="item">
						<view class="time"><span>23:01</span></view>
						<view class="desc">
							写不完啦写不完啦~
						</view>
						<view class="arrow" v-if="target.name === '评论' || target.name === '赞和收藏'">
							<i class="iconfont icon-jiantou"></i>
						</view>
					</view>
				</view>
				
				<view class="chat_list" v-if="target.type == 1">
					<view class="item_wrap" v-for="(item,index) in messageList" :key="item.messageid"
						:id="'msg'+item.messageid">
						<view class="time" v-if="item.showtime">
							<span>{{item.showtime}}</span>
						</view>
						<view class="left_item" v-if="!item.myself">
							<view class="avatar">
								<image mode="aspectFill"
									src="https://s3.bmp.ovh/imgs/2021/12/d76321bafd236500.jpg">
								</image>
							</view>
							<view class="message">
								{{item.content}}
							</view>
						</view>
						<view class="right_item left_item" v-if="item.myself">
							<!-- <view class="time" v-if="judgeTime(item.time,index)">
								<span>{{judgeTime(item.time,index)}}</span>
							</view> -->
							<view class="message">
								{{item.content}}
							</view>
							<view class="avatar">
								<image mode="aspectFill"
									src="http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-19%3A59%3A37-deb384f94227cc5fb817d5dccf142ed0.jpg">
								</image>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>
		<view class="empty_box" :style="{height:boxheight}"></view>
		<view class="input_wrap" ref="inputRef" :style="{bottom:boxheight}">
			<textarea class="input_text" maxlength="-1" cursor-spacing="20" @confirm="confirm"
				@keyboardheightchange="keyboardheightchange" @linechange="linechange" v-model="message"
				:adjust-position="false" auto-height hold-keyboard />
			<view class="send_btn" @click="sendMessage">
				发送
			</view>
		</view>
		<safe-footer></safe-footer>
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
				target: {},
				message: '',
				scrollToView: '',
				inputHeight: "110rpx",
				boxheight: "0px",
				oldTime: new Date(),

				refresherTriggered: false, //下拉刷新的状态
				messageList: [{
						autheid: 1215,
						messageid: 66,
						myself: false,
						time: "Tue Dec 23 2021 17:51:01 GMT+0800 (中国标准时间)",
						content: '你在干嘛'
					}
					// ,
					// {
					// 	autheid: 1245,
					// 	messageid: 77,
					// 	myself: true,
					// 	time: "Tue Dec 23 2021 18:01:01 GMT+0800 (中国标准时间)",
					// 	content: '友友们88 我要睡觉了~ 😎'
					// }
				]
			};
		},
		onLoad(option) {
			this.target.id = option.id;
			this.target.name = option.name;
			this.target.type = option.type;

			console.log(option.id, option.name)

			this.handleMessage(this.messageList)


		},
		methods: {
			refresherrefresh() {
				this.refresherTriggered = true
				console.log("下拉刷新~")



				setTimeout(() => {
					this.refresherTriggered = false

					let fakeData = [{
							autheid: 1215,
							messageid: 1,
							myself: false,
							time: "Tue Nov 22 2021 17:51:01 GMT+0800 (中国标准时间)",
							content: '获取到数据啦~'
						},
						{
							autheid: 1245,
							messageid: 2,
							myself: true,
							time: "Tue Nov 22 2021 18:01:01 GMT+0800 (中国标准时间)",
							content: '睡觉了~ 😎'
						},
						{
							autheid: 1245,
							messageid: 3,
							myself: true,
							time: "Tue Nov 22 2021 18:01:04 GMT+0800 (中国标准时间)",
							content: '😎'
						}, {
							autheid: 1215,
							messageid: 4,
							myself: false,
							time: "Tue Nov 22 2021 18:21:01 GMT+0800 (中国标准时间)",
							content: 'okok'
						},
						{
							autheid: 1245,
							messageid: 5,
							myself: true,
							time: "Tue Nov 22 2021 18:23:04 GMT+0800 (中国标准时间)",
							content: '今天吃泡面😎'
						},
						{
							autheid: 1215,
							messageid: 6,
							myself: false,
							time: "Tue Nov 22 2021 18:29:01 GMT+0800 (中国标准时间)",
							content: '~~~~'
						},
						{
							autheid: 1245,
							messageid: 7,
							myself: true,
							time: "Tue Nov 22 2021 18:43:04 GMT+0800 (中国标准时间)",
							content: '差不多得了🤣😎'
						}, {
							autheid: 1215,
							messageid: 8,
							myself: false,
							time: "Tue Nov 22 2021 18:50:01 GMT+0800 (中国标准时间)",
							content: '纯真'
						}

					]

					for (let i = fakeData.length - 1; i > 0; i--) {
						this.messageList.unshift(fakeData[i])
					}

					this.oldTime = new Date()

					this.handleMessage(this.messageList)

					this.gotoView(0)


				}, 2000)


			},
			refresherrestore() {
				console.log("刷新结束~")
			},
			confirm() {
				this.boxheight = 0
			},
			keyboardheightchange(e) {
				console.log(e)
				this.boxheight = e.detail.height + "px"
				// console.log(this.boxheight)
			},
			linechange(e) {
				// console.log(e.detail)
				if (e.detail.lineCount === 1 || e.detail.lineCount === 0) {
					return
				}

				let height = e.detail.height * 2 + 55

				if (height > 200) {
					height = 200
				}

				this.inputHeight = `${height}rpx`
				// console.log(this.inputHeight)
			},
			sendMessage() {

				if (this.message === "") return

				this.inputHeight = "110rpx"

				let messageObj = {
					autheid: 1245,
					messageid: this.messageList[this.messageList.length - 1].messageid + 1,
					myself: true,
					time: new Date(),
					content: this.message
				}


				messageObj = this.handleMessage(messageObj)

				this.messageList.push(messageObj);

				//跳转到最后一条消息
				this.gotoView(1)

				this.message = ''
				
				
				
				setTimeout(()=>{
					
					let messageObj2 = {
						autheid: 1215,
						messageid: this.messageList[this.messageList.length - 1].messageid + 1,
						myself: false,
						time: new Date(),
						content: "那好吧"
					}
					
					messageObj2 = this.handleMessage(messageObj2)
					
					this.messageList.push(messageObj2);
					
					
				},3000)
				
				this.gotoView(1)


			},
			handleMessage(list) {

				if (list.length) {
					list.forEach(item => {

						let type = this.spacetime(item.time)
						if (type === 0) {
							item.showtime = null
						} else if (type === 1) {
							item.showtime = this.$u.timeFormat(item.time, 'yyy-mm-dd hh:MM')
						} else if (type === 2) {
							item.showtime = this.$u.timeFormat(item.time, 'mm-dd hh:MM')
						} else if (type === 3) {
							item.showtime = this.$u.timeFormat(item.time, 'hh:MM')
						}

						this.oldTime = item.time
					})
				} else {
					let type = this.spacetime(list.time)
					if (type === 0) {
						list.showtime = null
					} else if (type === 1) {
						list.showtime = this.$u.timeFormat(list.time, 'yyy-mm-dd hh:MM')
					} else if (type === 2) {
						list.showtime = this.$u.timeFormat(list.time, 'mm-dd hh:MM')
					} else if (type === 3) {
						list.showtime = this.$u.timeFormat(list.time, 'hh:MM')
					}

					this.oldTime = list.time

					return list
				}
			},
			gotoView(type) {
				// 0 跳最上面  1 跳最下面

				//设置跳转到哪一条消息

				if (type) {
					this.$nextTick(function() {

						this.scrollToView = 'msg' + this.messageList[this.messageList.length - 1].messageid


					})
				} else {
					this.$nextTick(function() {

						this.scrollToView = 'msg' + this.messageList[0].messageid


					})
				}



			},
			spacetime(time) {

				//time 当前消息的时间

				// 0 小于5分钟 1 大于一年 2 一年以内 3 一天以内


				// console.log(index, this.oldTime.toString(), time)


				let stime = new Date(time)
				let etime = new Date(this.oldTime)

				stime = stime.toString().length == 10 ? Math.ceil(stime * 1000) : stime // 开始时间戳
				etime = etime.toString().length == 10 ? Math.ceil(etime * 1000) : etime // 结束时间戳

				let usedTime = Math.abs(etime - stime) // 两个时间戳相隔的毫秒数
				let days = Math.floor(usedTime / (24 * 3600 * 1000)) // 计算相差的天数

				// console.log(usedTime)

				//小于五分钟
				let havefive = usedTime < 300000

				if (havefive) return 0

				if (days > 0) {

					if (days > 356) {
						return 1
						// return this.$u.timeFormat(time, 'yyy-mm-dd hh:MM')
					} else {
						return 2
						// return this.$u.timeFormat(time, 'mm-dd hh:MM')
					}

				} else {
					return 3
					// return this.$u.timeFormat(time, 'hh:MM')
				}




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
		background-color: #fff;

		.content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;

			.empty_box {
				transition: all 0.5s;
				overflow: hidden;
				background-color: #fff;
			}


			.main {
				flex: 1;
				overflow: hidden;
				position: relative;
				// background-color: pink;

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
					height: 65rpx;
					padding: 10rpx;
					opacity: 1;
				}

				.chat_scroll {
					background-color: #fff;
					transition: all 0.5s;
				}

				.system_chat_wrap {
					padding: 20rpx;
					height: 300rpx;
					// background-color: pink;

					.item {
						// width: 100%;
						position: relative;
						height: 100%;
						padding: 20rpx;
						border-radius: 20rpx;
						background-color: rgba(207, 207, 207, 0.2);

						.time {
							text-align: center;
							height: 30%;

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

						.desc {
							height: 70%;
						}

						.arrow {
							position: absolute;
							right: 40rpx;
							top: 50%;
							transform: translate(0, -50%);
							// background-color: yellow;

							i {
								font-size: 36rpx;
							}
						}
					}
				}

				.chat_list {
					height: 100%;

					.time {
						width: 100%;
						padding: 20rpx 0;
						padding-bottom: 0;
						text-align: center;

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

					.left_item {
						// background-color: pink;
						padding: 20rpx;
						display: flex;
						flex-wrap: wrap;



						.avatar {
							width: 90rpx;
							height: 90rpx;
							margin-right: 20rpx;
							// background-color: yellow;

							image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}

						.message {
							max-width: calc(100% - 110rpx);
							min-height: 90rpx;
							border-radius: 20rpx;
							padding: 10rpx;
							display: flex;
							align-items: center;
							background-color: rgba(207, 207, 207, 0.2);
						}
					}

					.right_item {
						justify-content: flex-end;

						.avatar {
							margin-right: 0;
							margin-left: 20rpx;
							// background-color: yellow;
						}
					}
				}

			}

			.input_wrap {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				min-height: 100rpx;
				box-sizing: border-box;
				padding: 12rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				transition: all 0.5s;
				border-top: 1rpx solid rgba(207, 207, 207, 0.2);
				background-color: #fff;

				.input_text {
					width: 600rpx;
					min-height: 70rpx;
					max-height: 168rpx;
					overflow-y: auto;
					border-radius: 20rpx;
					padding: 10rpx;
					box-sizing: border-box;
					transition: all 0.5s;
					background-color: rgba(207, 207, 207, 0.2);
				}

				.send_btn {
					width: 90rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 15rpx;
					background-color: #5098FF;
					color: #fff;
					// border: 1rpx solid rgba(207, 207, 207, 0.8);
				}

			}
		}
	}
</style>
