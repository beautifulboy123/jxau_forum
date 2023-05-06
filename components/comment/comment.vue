<template>
	<view class="wrap">
		<view class="item_wrap">

			<view class="item" v-for="(item1,index1) in fakedata" :key="item1.commentid">
				<view class="left" @click="toUserDetail(item1.userid)">
					<u-image width="100%" height="100%" :src="item1.avatar" border-radius="50%">
					</u-image>
				</view>
				<view class="right" @click="bigReply(item1,index1)">
					<span @click.stop="toUserDetail(item1.userid)">{{item1.username}}：</span>{{item1.comment}}
				</view>
				<view class="right_like" @click="mainTogglelike(item1,index1)">
					<i
						:class="['iconfont' ,item1.like ? 'icon-xihuan2' : 'icon-xihuan1',item1.like ? 'like' : '',]"></i>
				</view>
				<view class="hot_reply" v-if="item1.reply.length">
					<view class="item" v-if="index2 < 3" v-for="(item2,index2) in item1.reply" :key="item2.commentid">
						<view class="left" @click="toUserDetail(item2.userid)">
							<u-image width="100%" height="100%" :src="item2.avatar" border-radius="50%">
							</u-image>
						</view>
						<view class="right" @click="smallReplay(item2,index1,index2)">
							<span @click.stop="toUserDetail(item2.userid)">{{item2.username}}</span>回复<span
								@click.stop="toUserDetail(item2.replyuserid)">{{item2.replyusername}}：</span>
							{{item2.comment}}
						</view>
						<view class="right_like" @click="togglelike(item2,index1,index2)">
							<i
								:class="['iconfont' ,item2.like ? 'icon-xihuan2' : 'icon-xihuan1',item2.like ? 'like' : '',]"></i>
						</view>
					</view>

					<view class="more" v-if="item1.reply.length > 2" @click="checkAll(item1,index1)">查看全部 ></view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			fakedata: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			};
		},
		methods: {
			checkAll(item, index) {
				let params = {
					item,
					index
				}
				this.$emit('checkallreply', params)
			},
			mainTogglelike(item, index) {




				let params = {
					item,
					index
				}

				this.$emit("maintogglelike", params)


			},
			togglelike(item, index1, index2) {



				let params = {
					item,
					index1,
					index2
				}

				this.$emit("togglelike", params)


			},
			bigReply(item, index) {
				console.log(item)
				let params = {
					item,
					index
				}
				this.$emit("bigreply", params)
			},
			smallReplay(item, index1, index2) {
				console.log(item)
				let params = {
					item,
					index1,
					index2
				}
				this.$emit("smallreply", params)
			},
			toUserDetail(id) {
				console.log(id)

				this.$emit("touserdetail", id)


			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 20rpx 10rpx;

		.item_wrap {

			.item {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30rpx;
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

				.hot_reply {
					width: 95%;
					padding: 10rpx;
					padding-bottom: 0;
					margin: 0 auto;
					margin-top: 10rpx;
					border-radius: 10rpx;
					background-color: rgba(185, 185, 185, 0.1);

					.item {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 10rpx;

						.left {
							width: 60rpx;
							height: 60rpx;
							// background-color: yellow;
						}

						.right {
							width: calc(100% - 120rpx);

							span {
								font-weight: bold;
							}
						}

					}


				}

				.more {
					padding: 10rpx 0;
					padding-left: 20rpx;
					color: #5098FF;
				}
			}
		}
	}
</style>
