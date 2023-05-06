<template>
	<view class="content">
		<u-navbar back-text="个人信息"></u-navbar>
		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="edit-head">
					<view class="head">
						<u-avatar :src="userInfo.avatar" mode="square" size='130'></u-avatar>
					</view>
					<view class="edit-icon" @tap="chooseAvatar">
						<u-icon name="edit-pen-fill"></u-icon>
					</view>

				</view>
			

				<view class="message-box">
					<u-form :model="userInfo" ref="uForm" label-position='top'>
						<u-form-item label="昵称">
							<u-input v-model="userInfo.name" />
						</u-form-item>
						<u-form-item label="签名">
							<u-input v-model="userInfo.intro" />
						</u-form-item>
						<u-form-item label="生日">
							<u-input v-model="userInfo.birthday" type="select" @click='show=true'></u-input>

						</u-form-item>
					</u-form>
					<view>
						<view class="bgd">个人背景</view>
						<u-upload  @on-success="uploadSuccess" :action="action" :max-count="1" :file-list="fileList"></u-upload>

					</view>
				</view>


			</scroll-view>
		</view>
		<view class="picker">
			<u-picker mode="time" start-year="1990" v-model="show" :params="params" @confirm='confirm'></u-picker>
		</view>

	</view>
</template>

<script>
    import {mapState,mapActions ,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.91ye.cn%2FFileUpload%2Fixncfkctiwn.jpg&refer=http%3A%2F%2Fwww.91ye.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639892114&t=d2dc977adbd4382ce4cb1f9d1db9c6c2',
				
				//这里要用后端服务器的地址，这是组件默认的演示地址，会报错

				action: 'http://ksimgbedapi.ks.jxauqt.cn/upload/uploadimg',
				fileList: [{
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}],
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},

				show: false,



			};
		},
		computed:{
				...mapState(['userInfo'])
		},
		created() {
			console.log(this.getUserInfo)
			// this.userInfo = this.getUserInfo;
			this.fileList = [ {
					url: this.userInfo.bg,
				}]
			console.log(this.fileList)
			const _this = this;
			this.avatar = uni.getStorageSync("username-avatar")
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				_this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: 'http://ksimgbedapi.ks.jxauqt.cn/upload/uploadimg',
					filePath: path,
					name: 'file',
					complete: (res) => {
						console.log(JSON.parse(res.data));
						const avatar = JSON.parse(res.data).success[0]
						_this.avatar = avatar;
						console.log(avatar)
						// uni.setStorageSync("username-avatar",avatar)
						this.set_userInfo({
							...this.userInfo,
							avatar
						})
					}
				});
			})
		},
		methods: {
			...mapActions(['set_userInfo']),
			confirm(e) {
				console.log(e);
				this.form.birthday = e.year + '年' + e.month + '月' + e.day + '日'

			},
			uploadSuccess(e){
				console.log(e)
				const bg = e.success[0]
				console.log(bg)
				this.set_userInfo({
					...this.userInfo,
					bg
				})
			},
			chooseAvatar() {
				console.log(1)
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/pages/u-avater-cropper/u-avatar-cropper?destWidth=300&rectWidth=300&fileType=png',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
		}

	}
</script>
<style>
	page {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
<style lang="scss">
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.main {
		flex: 1;
		overflow: hidden;
		position: relative;

		.message-box {
			align-items: center;
			padding: 20rpx 50rpx;
			// border: 1px red solid;
		}

		.edit-head {
			display: flex;
			// width: 100rpx;
			// height: 100rpx;
			// background-color: red;
			padding: 20rpx 50rpx;
			flex-direction: row;

			align-items: flex-end;

			.head {
				border-radius: 30rpx;
				overflow: hidden;
			}

			.edit-icon {
				font-size: 34rpx;
				margin-left: 20rpx;

			}
		}

		.bgd {
			margin-top: 30rpx;
		}

		// .picker{
		// 	width: 100vw;
		// 	height: 400rpx;
		// }
		.wrap {
				padding: 40rpx;
			}
		
			.u-avatar-wrap {
				margin-top: 80rpx;
				overflow: hidden;
				margin-bottom: 80rpx;
				text-align: center;
			}
		
			.u-avatar-demo {
				width: 150rpx;
				height: 150rpx;
				border-radius: 100rpx;
			}
	}
</style>
