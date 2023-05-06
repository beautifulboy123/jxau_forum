<template>
	<view class="content">

		<u-navbar :is-back="false" title="发布"></u-navbar>

		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="add_message_box">
					<textarea class="message_area" maxlength="1000" v-model="content" :show-confirm-bar="false"
						:adjust-position="false" placeholder="说点什么" />
					<view class="tips">{{content.length}}/1000</view>
				</view>
				<view class="file_box">
					<view class="item" v-if="uploadimgList.length === 0" @click="chhooseImage">
						<i class="iconfont icon-tupiantianchong"></i>
					</view>
					<view class="item" v-if="uploadimgList.length === 0">
						<i class="iconfont icon-shipin"></i>
					</view>
					<view class="img_list" v-if="uploadimgList.length">
						<view class="item" v-for="(item,index) in uploadimgList" :key="index">
							<image class="pre_img" :src="item"></image>
							<view class="del_btn" @click="delimg(index)"><i class="iconfont icon-chacha"></i></view>
						</view>
						<view class="item" v-if="uploadimgList.length && uploadimgList.length < 9">
							<i class="iconfont icon-jia addmore" @click="chhooseImage"></i>
						</view>

					</view>
				</view>
				<view class="select_list">
					<view class="item" @click="chooseCircle">
						<view class="left">
							<i class="iconfont icon-jinghao"></i>
							<span>圈子</span>
						</view>
						<view class="right">
							<span>{{getCurrentSelect === '' ? '选择圈子' : getCurrentSelect}}</span>
							<i class="iconfont icon-jiantou"></i>
						</view>
					</view>
					<view class="item" @click="chooseLocation">
						<view class="left">
							<i class="iconfont icon-weizhi"></i>
							<span>位置</span>
						</view>
						<view class="right">
							<span>分享位置</span>
							<i class="iconfont icon-jiantou"></i>
						</view>
					</view>
					<view class="item" @click="choosetype">
						<view class="left">
							<i class="iconfont icon-xiaolian"></i>
							<span>类型</span>
						</view>
						<view class="right">
							<span>{{selectType === '' ? '请选择类型类型' : selectType}}</span>
							<i class="iconfont icon-jiantou"></i>
						</view>
					</view>

				</view>
			</scroll-view>

			<view class="send" @click="send">
				<i class="iconfont icon-fabusekuai"></i>
				发布
			</view>
		</view>

		<u-popup v-model="popupshow" mode="bottom" border-radius="20">
			<view class="option" @click="chooseOne(0)">找拾主</view>
			<view class="option option_last" @click="chooseOne(1)">找失主</view>
		</u-popup>

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
				content: "",
				selectType: '',
				popupshow: false,
				uploadimgList: []
			}
		},
		onLoad() {

		},
		methods: {
			send(){
				uni.showLoading({
					title:"上传中..."
				})
				
				setTimeout(()=>{
					uni.hideLoading()
					
					uni.showToast({
						title:'上传成功，等待审核~'
					})
				},1500)
			},
			chooseOne(type) {
				if (type) {
					this.selectType = '找失主'
				} else {
					this.selectType = '找拾主'
				}
				
				this.popupshow = false
			},
			choosetype() {
				this.popupshow = true
			},
			chhooseImage() {
				let self = this
				uni.chooseImage({
					success: function(res) {
						console.log(res.tempFilePaths);

						res.tempFilePaths.forEach(item => {
							if (self.uploadimgList.length < 9) {
								self.uploadimgList.push(item)
							}
						})
					}
				});
			},
			delimg(index) {
				this.uploadimgList.splice(index, 1)
			},
			chooseCircle() {
				uni.navigateTo({
					url: "../allcirclepage/allcirclepage?type=1"
				})
			},
			chooseLocation() {
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			}
		},
		computed: {
			...mapGetters(['getTabBar', 'getCurrentSelect'])
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

				.add_message_box {
					width: 100%;
					min-height: 500rpx;

					.message_area {
						box-sizing: border-box;
						width: 100%;
						height: 460rpx;
						padding: 10rpx;

					}

					.tips {
						padding: 0 20rpx;
						display: flex;
						justify-content: flex-end;
					}

				}

				.file_box {
					width: 100%;
					padding: 10rpx 20rpx;
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid rgba(191, 191, 191, 0.1);

					.item {
						height: 90rpx;
						line-height: 90rpx;
						margin-right: 40rpx;
						// background-color: pink;

						i {
							font-size: 62rpx;
						}
					}

					.img_list {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						// justify-content: space-between;
						align-items: center;

						.item {
							width: 160rpx;
							height: 160rpx;
							margin-right: 10rpx;
							margin-bottom: 20rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							position: relative;

							.pre_img {
								width: 160rpx;
								height: 160rpx;
								background-color: pink;
							}

							.del_btn {
								position: absolute;
								right: -6rpx;
								top: -34rpx;

								i {
									font-size: 36rpx;
									color: red;
								}
							}

							.addmore {
								font-size: 48rpx;
							}
						}


					}
				}

				.select_list {
					margin-top: 30rpx;

					.item {
						display: flex;
						padding: 20rpx;
						border-bottom: 1rpx solid rgba(191, 191, 191, 0.1);

						.left {
							width: 120rpx;
							display: flex;
							align-items: center;
							// background-color: pink;

							i {
								margin-right: 10rpx;
								color: #5098FF;
							}
						}

						.right {
							width: calc(100% - 110rpx);
							display: flex;
							justify-content: flex-end;
							align-items: center;

							i {
								margin-left: 20rpx;
								color: #5098FF;
								color: #5098FF;
							}
						}
					}
				}

				.send {
					padding: 20rpx 30rpx;
					position: fixed;
					bottom: 200rpx;
					right: 40rpx;
					border-radius: 40rpx;
					color: #fff;
					display: flex;
					align-items: center;

					background-color: #5098FF;

					i {
						margin-right: 10rpx;
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
	}
</style>
