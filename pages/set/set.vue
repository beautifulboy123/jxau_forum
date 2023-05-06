<template>
	<view>
		<view class="content">
			<u-navbar back-text="设置"></u-navbar>
			<view class="main">

				<scroll-view scroll-y="true" style="height: 100%;" class="scroll">
					<!-- <u-cell-item icon="red-packet" title="收益"  value='致富之路'></u-cell-item> -->
					<!-- <u-cell-item icon="bag" title="订单" ></u-cell-item> -->
					<!-- <u-cell-item icon="integral" title="认证"></u-cell-item> -->
					<u-cell-item icon="moments" title="圈子" value='管理我的圈子' @click='ToManagement'></u-cell-item>

					<u-cell-item icon="order" title="我要反馈" value='提个建议叭~' @click='ToFeedback'></u-cell-item>
					<u-cell-item icon="level" title="学生认证" @click='toStudentAuth' value="已认证"></u-cell-item>
					<u-cell-item icon="list-dot" title="隐私政策" @click='ToPrivacy'></u-cell-item>
					
					<u-cell-item icon="file-text" title="用户协议" @click='ToUserAgreement'></u-cell-item>
					<!-- <u-cell-item icon="rmb-circle" title="打赏声明" ></u-cell-item> -->
					<u-cell-item icon="coupon" title="免责声明" @click='ToDisclaimer'></u-cell-item>
					<u-cell-item icon="error-circle" title="关于云梦" @click='ToAbout'></u-cell-item>
					<u-cell-item icon="trash" title="清除缓存" @click="open"></u-cell-item>
					<view class="quit">
						<u-button hair-line='false' :ripple="true" type="error" @click="on">退出登录</u-button>
					</view>
					<u-modal v-model="show" :content="content" :show-cancel-button='true'></u-modal>
					<u-modal v-model="off" :content="exit" :show-cancel-button='true'  ></u-modal>



				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				show: false,
				content: '清除缓存，需要重新登录',
				exit:'确认退出？',
				off:false
			};
		},
		methods: {
			//跳转管理我的圈子
			ToManagement() {
				uni.navigateTo({
					url: '../management-circles/management-circles'
				})
			},
			//跳转我要反馈
			ToFeedback() {
				uni.navigateTo({
					url: '../feedback/feedback'
				})
			},
			//跳转隐私政策
			ToPrivacy() {
				uni.navigateTo({
					url: '../privacy/privacy'
				})
			},
			//用户协议
			ToUserAgreement() {
				uni.navigateTo({
					url: '../user-agreement/user-agreement'
				})
			},
			toStudentAuth(){
					uni.navigateTo({
						url:"../authenticationPage/authenticationPage"
					})
			},
			//免责声明
			ToDisclaimer() {
				uni.navigateTo({
					url: '../disclaimer/disclaimer'
				})
			},
			//关于云梦
			ToAbout() {
				uni.navigateTo({
					url: '../about/about'
				})
			},
			//清除缓存
			open() {
				this.show = true;
			},
			//确认退出
			 on(){
				 this.off = true;
			 }



		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main {
		flex: 1;
		overflow: hidden;
		position: relative;

		.quit {
			padding: 10rpx;

		}

		.quit /deep/ button {

			background-color: #f3f3f3;
			color: #e62c1b;
		}
	}
</style>
