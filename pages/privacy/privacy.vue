<template>
	<view class="content">
		<u-navbar ></u-navbar>
		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="title">
					云梦论坛隐私政策
				</view>
				<view class="date">
					最新版本:2021年12月02日
				</view>

				<view class="tro">
					<view>
						提示条款
					</view>
					<view>
						云梦论坛是青藤工作室提供服务的产品。我们深知个人信息对您的重要性,我们将按法律法规要求,采取相应的安全保护措施,尽力保护您的个人信息安全可控。鉴此,我们制定本《云梦论坛隐私政策》(下称“本政策/本隐私政策”),并提醒您:
					</view>
					<view>
						1.在您使用云梦论坛服务时,请您勾选确认同意本政策,在您同意前我们不会收集您的任何隐私信息。您同意本政策并使用云梦论坛的我方将按照本政策收集、存储、使用、披露和保护您的个人信息。我方希望通过本政策清楚地向您介绍对您个人信息的处理方
						式</view>

					<view>
						2.根据有关法律法规要求、网络产品、服务具有收集用户信息功能的,其提供者应当向用户明示并取得同意。我方特此通过本政策向您告知收集、使用用户个人信息的目的、方式和范围,查询、更正信息的渠道以及拒绝提供信息的影响。
					</view>
					<view>
						3.本政策不适用于其他第三方向您提供的服务,例如我方平台上的第三方依托我方平台向您提供服务时(如第三方支付渠道),您向第三方提供的个人信息不适用于本政策,除非法律有明确规定,我方对任何第三方使用由您提供的信息不承担任何责任。
					</view>
					<view>
						4.在使用云梦各项产品或服务前,请您务必仔细阅读并理解本政策,在确认充分理解并同意后使用相关产品或服务。当您使用云梦论坛提供的仟一服务时,即表示您已同意我们按照本政策来合法收集、使用和保护您的个人信息。如对本政策内容有任何疑问、意见或建议您可通过电子邮箱
						123456 与我们联系</view>

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
		.tro{
			padding: 20rpx;
			font-size: 26rpx;
			view:nth-child(1){
				font-weight: bold;
				font-size: 28rpx;
			}
			view{
				padding: 20rpx 0;
			}
		}

	}
</style>


