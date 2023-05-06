<template>
	<view class="content">
		<u-navbar></u-navbar>
		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="title">
					免责声明
				</view>
				<view class="date">
					最新版本:2021年12月02日
				</view>

				<view class="tro">
					<view>
						
					</view>
					<view>
						一、云梦不对用户发表的内容的正确性进行保证。
					</view>
					<view>
						二、用户在云梦发表的内容仅表明其个人的立场和观点,并不代表云梦的立场或观点。作为内容的发表者,需自行对所发表内容负责,因所发表内容引发的一切纠纷,由该内容的发表者承担全部法律及连带责任。云梦不承担任何法律及连带责任。
					</view>

					<view>
						三、云梦不保证服务一定能满足用户的要求,也不保证服务不会中断,对服务中断的及时性、安全性和准确性也不做保证。
					</view>


				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
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

		//background-color: pink;
		.title {
			font-size: 44rpx;
			text-align: center;
			font-weight: bold;
			padding: 30rpx 0;
		}

		.date {
			font-size: 24rpx;
			font-weight: bold;
			text-align: center;
			padding: 20rpx 0;
		}

		.tro {
			padding: 20rpx;
			font-size: 26rpx;

			view:nth-child(1) {
				font-weight: bold;
				font-size: 28rpx;
			}

			view {
				padding: 20rpx 0;
			}
		}

	}
</style>
