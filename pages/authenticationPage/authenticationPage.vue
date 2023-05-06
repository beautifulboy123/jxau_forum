<template>
	<view class="authenticationPage">
		<view class="main">
			<scroll-view scroll-y="true" class="scroll-Y">
				<view class="header">
					<view class="title">
						认证权益
					</view>
					<view class="text">
<!-- 						<view class="textItem">1、认证后，可以自由接单、发布订单，赚取收益</view> -->
						<view class="textItem">1、认证后可以发帖</view>
						<view class="textItem">2、认证后，可以获得大V标识</view>
					</view>
					<view class="tip">
						<text class="custom-icon custom-icon-jinggao"></text>
						未认证的用户只可发布提问和回复提问
					</view>
				</view>
				<view class="body">
					<view class="studentCardFront">
						<view class=" img" @tap="upLoadImage('frontImage')">
							<image class="img-size" :src="showImg.frontImage" mode="aspectFill"></image>
						</view>
						<view class="imgTip">
							学生卡正面/学生证封面
						</view>
					</view>
					<view class="studentCardBack">
						<view class="img-size img"  @tap="upLoadImage('reverseImage')">
							<image class="img-size" :src="showImg.reverseImage" mode="aspectFill"></image>
						</view>
						<view class="imgTip">
							学生卡反面/学生证内页
						</view>
					</view>
					<view class="space-white"></view>
				</view>
			</scroll-view>
		</view>
		<view class="bottom">
			<view class="bottomBtn">
				<button @tap="submit">
					<text class="custom-icon custom-icon-fabu4"></text>
					提交
				</button>
			</view>
			<safe-footer></safe-footer>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {chooseUploadImgOss} from '../../utils/upload/index.js'
	import {
		mapState
	} from 'vuex'
	export default {
		computed: {
			...mapState(["userInfo"])
		},
		data() {
			return {
				// 图片路径正面/反面
				showImg: {
					frontImage: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ab6b8509-02a5-4383-982d-6711ff4e4e6b/bcc5a0e9-5769-4d39-b625-42d641d92fe2.png',
					reverseImage: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ab6b8509-02a5-4383-982d-6711ff4e4e6b/29e94ad7-6446-4a52-9298-45c2b83102ac.png'
				},
				upLoadImgUrl: {
					frontImage: '',
					reverseImage: ''
				}
			};
		},
		methods: {
			/* 提交认证信息 */
			async submit() {
				console.log(this.upLoadImgUrl)
				if(this.upLoadImgUrl.frontImage.length != 0 && this.upLoadImgUrl.reverseImage.length != 0) {
					uni.showLoading({
						title: '上传中'
					})
					// const {data: res} = await this.$http.insertAutoImage({
					// 	...this.upLoadImgUrl,
					// 	userId: this.userInfo.userId
					// })
					// if(this.$api.isHttpSuccess) {
						setTimeout(()=>{
							
							uni.hideLoading();
							this.$refs.uToast.show({
								title: '上传成功',
								type: 'success',
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								})
							},200)
						},500)
					
					// }else{
					// 	this.$refs.uToast.show({
					// 		title: '上传失败',
					// 		type: 'error',
					// 	})
					// }
					// console.log(res)
				}else{
					this.$refs.uToast.show({
						title: '有认证图片未上传，点击图片上传',
						type: 'error',
					})
				}
			},
			/* 图片上传 */
			async upLoadImage(type) {
				const res = await chooseUploadImgOss(1);
				console.log(res)
				if(res.result) {
					this.upLoadImgUrl[type] = res.data[0].imgUrl;
					this.showImg[type] = res.data[0].temporaryUrl;
				}else{
					this.$refs.uToast.show({
						title: '图片上传失败',
						type: 'error',
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.authenticationPage {
	height: 100%;
	display: flex;
	flex-direction: column;
	
	.main {
		flex: 1;
		display: flex;
		overflow: hidden;
		
		.scroll-Y {
			flex: 1;
			overflow: hidden;
			
			.header {
				display: flex;
				flex-direction: column;
				color: #3e83f1;
				align-items: center;
				padding: 30rpx;
				letter-spacing: 0.1rem;
				
				.title {
					width: 100%;
					font-size: 44rpx;
					font-weight: 900;
					color: #0096ec;
				}
				
				.text {
					font-size: 26rpx;
					margin-top: 36rpx;
					padding: 10rpx 40rpx;
					width: 100%;
					.textItem {
						margin-bottom: 15rpx;
					}
				}
				
				.tip {
					display: flex;
					align-items: center;
					width: 100%;
					padding: 0 40rpx;
					color: #686868;
					font-size: 26rpx;
					.custom-icon {
						color: #fcd992;
						font-size: 52rpx;
						margin-right: 10rpx;
					}
				}
			}
			
			.body {
				width: 100%;
				padding: 0 70rpx;
				
				.img{
					overflow: hidden;
					box-shadow: 1rpx 1rpx 10rpx #dedede;
					border-radius: 10rpx;
					width: 610rpx;
					height: 420rpx;
				}
				
				.imgTip {
					padding: 15rpx 0;
					text-align: center;
				}
			}
			
			.space-white {
				height: 40rpx;
				width: 100%;
			}
		}
	}
	
	.bottom {
		padding: 0 30rpx 20rpx 30rpx;
		color: #FFFFFF;
		
		button {
			background-color: #00c9f2;
			color: #FFFFFF;
			border-radius: 20rpx;
		}
	}
}
</style>
