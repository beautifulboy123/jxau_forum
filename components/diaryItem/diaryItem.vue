<template>
	<view class="daily_wrap">
		<view class="top_wrap">
			<view class="left">
				<view class="user_avatar" @click="touserdetail">
					<u-image :src="list.avatar" height="100%" border-radius="50%"></u-image>
				</view>
				<view class="user_name" @click="touserdetail">
					{{list.username}}
					
				</view>
				<view class="badge">
					<i v-if="list.badge" class="iconfont icon-guanliyuan_guanliyuanliebiao"></i>
				</view>
			</view>
			<view class="right">
				<view class="button_wrap">
					<view class="button" @click="togglefolow">
						<u-icon v-if="list.following" name="checkbox-mark"></u-icon>
						{{isfollow ? '已关注' : '关注'}}
					</view>
				</view>
				<view class="more_option" @click="showoptions">
					<i class="iconfont icon-xianxingtubiaozhizuomoban-25"></i>
				</view>
				
				<view :class="[list.type ? 'type type2' : 'type']" v-if="list.circle === '失物招领'">{{list.type ? '找失主' : '找拾主'}}</view>
				<view class="type" v-if="list.adudit != undefined">审核中</view>
			</view>
		</view>
		<view class="diary_content" @click="toContentDetail">
			<view class="text_area">
				<u-read-more v-if="!detailpage" :show-height="200" :toggle="true" text-indent="0"
					:shadow-style="shadowStyle">
					<rich-text :nodes="list.content"></rich-text>
				</u-read-more>
				{{detailpage ? list.content : ''}}
			</view>
			<view class="image_box">

				<!-- //部分展示 -->
				<view v-if="!detailpage && index < 5"
					:class="['outer_box',list.imgArray.length === 1 ? 'outer_box_onlyone' : '']"
					v-for="(item,index) in list.imgArray" :key="index" @click.stop="previewimg(index)">
					<u-image :src="item" height="100%"></u-image>
				</view>
				<view v-if="!detailpage && list.imgArray.length >= 6" class="outer_box_verymore">
					+{{list.imgArray.length - 5}}
				</view>

				<!-- 全部展示 -->
				<view v-if="detailpage" :class="['outer_box',list.imgArray.length === 1 ? 'outer_box_onlyone' : '']"
					v-for="(item,index) in list.imgArray" :key="index" @click.stop="previewimg(index)">
					<u-image :src="item" height="100%"></u-image>
				</view>

			</view>
		</view>
		<view class="bottom">
			<view class="tag_wrap">
				<view v-if="list.location.latitude" class="bottom_tag location" @click="looklocation">
					<i class="iconfont icon-weizhi"></i>
				</view>
				<view class="bottom_tag" @click="tocircle">
					<i class="iconfont icon-jinghao"></i>
					{{list.circle}}
				</view>
			</view>
			
			<view class="options">
				<i class="iconfont icon-fenxiang"></i>
				<i class="iconfont icon-xiaoxi midle"><span>{{list.comments}}</span></i>
				<i :class="['iconfont',islike ? 'icon-xihuan2 like' : 'icon-xihuan1']" @click="togglelike"></i>
			</view>
		</view>

		<u-popup v-model="popupshow" mode="bottom" border-radius="20">
			<view class="option" @click="togglecollect">{{list.collect ? '取消收藏' : '收藏'}}</view>
			<view class="option option_last" @click="report">举报</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "diaryItem",
		props: {
			list: {
				type: Object,
				default: {},
				required: true
			},
			detailpage: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				popupshow: false,
				shadowStyle: {
					backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
					paddingTop: "160rpx",
					marginTop: "-160rpx"
				},
				islike: false,
				isfollow: false

			};
		},
		methods: {
			previewimg(index) {
				uni.previewImage({
					current: index,
					urls: this.list.imgArray,
					indicator: "number"
				})
			},
			togglelike() {
				this.$emit('togglelike', this.list.id)

				this.islike = !this.islike
			},
			togglefolow() {
				this.$emit('togglefolow', this.list.userid)

				this.isfollow = !this.isfollow
			},
			showoptions() {
				this.popupshow = true
			},
			togglecollect() {
				this.popupshow = false
				this.$emit('togglecollect', this.list.id)
			},
			report() {
				this.popupshow = false
				this.$emit('report', this.list.id)
			},
			toContentDetail() {
				this.$emit('todetail', this.list.id)
			},
			looklocation() {
				this.$emit('checklocation', this.list.location)
			},
			tocircle() {
				let params = {
					id: this.list.circleid,
					name: this.list.circle
				}
				this.$emit('tocirclepage', params)
			},
			touserdetail() {
				this.$emit('touserdetail', this.list.userid)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.daily_wrap {
		padding: 20rpx;

		.top_wrap {
			height: 100rpx;
			display: flex;
			// background-color: pink;

			.left {
				width: 70%;
				height: 100%;
				display: flex;
				align-items: center;
				// background-color: yellow;

				.user_avatar {
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;


				}

				.user_name {
					max-width: 180rpx;
					margin-right: 20rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					/* 超出省略号 */
					white-space: nowrap;
				}

				.badge {

					i {
						padding-right: 10rpx;
						color: #5098FF;
					}
				}
			}

			.right {
				width: 30%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				.type {
				
					position: absolute;
					top: 100rpx;
					right: 0;
					transform: rotateZ(40deg);
					padding: 20rpx;
					z-index: 999;
					color: #fff;
					border-radius: 40rpx;
					background-color: orange;
				}
				
				.type2{
					background-color: #5098FF;
				}

				.button_wrap {
					width: 60%;
					height: 80%;
					display: flex;
					align-items: center;
					justify-content: center;

					.button {
						width: 95%;
						height: 70%;
						font-size: 18rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 60rpx;
						background-color: #fff;
						border: 1rpx solid rgba(0, 0, 0, 0.1);
					}
				}

				.more_option {
					width: 30%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					// background-color: green;

					i {
						font-size: 42rpx;
					}
				}

			}
		}

		.diary_content {
			// height: 40rpx;
			// background-color: pink;

			.image_box {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				// justify-content: space-between;

				.wrap_box {
					width: 100%;
				}

				.outer_box {
					width: calc(100% / 3 - 10rpx);
					height: 240rpx;
					padding: 10rpx 0;
					padding-right: 10rpx;
					// background-color: pink;
				}

				.outer_box_onlyone {
					width: 80%;
					height: 340rpx;
				}

				.outer_box_verymore {
					width: calc(100% / 3 - 10rpx);
					height: 220rpx;
					padding: 10rpx 0;
					padding-right: 10rpx;
					text-align: center;
					line-height: 220rpx;
					font-size: 62rpx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.6);
				}
			}

		}

		.bottom {
			// height: 50rpx;
			line-height: 50rpx;
			display: flex;
			flex-wrap: wrap;
			// background-color: pink;

			.tag_wrap {
				display: flex;
				flex-wrap: wrap;

				.bottom_tag {
					box-sizing: border-box;
					padding: 0 20rpx;
					// min-width: 120rpx;
					// height: 40rpx;
					display: flex;
					border-radius: 30rpx;
					font-size: 16rpx;
					margin-right: 20rpx;
					border: 1rpx solid rgba(0, 0, 0, 0.1);

					i {
						font-size: 24rpx;
						margin-right: 5rpx;
						color: #5098FF;
					}
				}

				.location {

					i {
						margin-right: 0;
					}
				}
			}



			.options {
				width: 100%;
				height: 70rpx;
				display: flex;
				line-height: 70rpx;
				justify-content: flex-end;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				// background-color: pink;

				i {
					padding: 0 30rpx;
					font-size: 42rpx;
				}

				.like {
					color: red;
				}

				.midle {
					padding-right: 15rpx;

					span {
						font-size: 24rpx;
					}
				}
			}
		}

		.option {
			height: 120rpx;
			text-align: center;
			line-height: 120rpx;
			font-weight: bold;
			background-color: #fff;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

			&:active {
				background-color: rgba(0, 0, 0, 0.1);
			}
		}

		.option_last {
			border: none;
		}
	}
</style>
