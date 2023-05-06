<template>
	<view class="reply_Wrap">
		<view class="item" v-for="(item1,index1) in replylist" :key="item1.commentid">
			<view class="left" @click="toUserDetail(item1.userid)">
				<u-image width="100%" height="100%" :src="item1.avatar" border-radius="50%">
				</u-image>
			</view>
			<view class="right" @click="bigReply(item1,index1)">
				<span @click.stop="toUserDetail(item2.userid)">{{item1.username}}</span>回复<span
					@click.stop="toUserDetail(item1.replyuserid)">{{item1.replyusername}}：</span>
				{{item1.comment}}
			</view>
			<view class="right_like" @click="mainTogglelike(item1,index1)">
				<i :class="['iconfont' ,item1.like ? 'icon-xihuan2' : 'icon-xihuan1',item1.like ? 'like' : '',]"></i>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		name: "allReply",
		props: {
			replylist: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			};
		},
		methods: {
			mainTogglelike(item, index) {

				let params = {
					item,
					index
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
			toUserDetail(id) {
				console.log(id)

				this.$emit("touserdetail", id)


			}
		}
	}
</script>

<style lang="less">
	
	.reply_Wrap{
		padding: 30rpx;
	}
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

	}
</style>
