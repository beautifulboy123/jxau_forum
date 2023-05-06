<template>
	<view class="content">
		<u-navbar></u-navbar>
		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="title">
					云梦论坛用户协议
				</view>
				<view class="date">
					最新版本:2021年12月02日
				</view>

				<view class="tro">
					<view>
						一、使用协议的接受与修改
					</view>
					<view>
						云梦论坛是青藤工作室提供服务的产品,供客户端使用人(以下简称“用户”)在线下载、安装、注册、使用、复制本软件。本协议是用户与我方之间的协议,我方依据本协议为用户提供服务。
					</view>
					<view>
						1.请用户务必审慎阅读、充分理解各条款内容,特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识,用户应重点阅读</view>

					<view>
						2.本协议服务条款构成用户(无论是个人或者单位)使用云梦论坛所提供服务之先决条件。如用户不同意本协议服务条款或其随时对其的修改,用户应不使用或主动取消云梦提供的服务。用户的使用行为将被视为其对本协议服务条款及其随时修改版本的完全接受;阅读本协议的过程中,如果用户不同意本协议或其中任何条款约定,应立即停止注册程序。
					</view>
					<view>
						3.如果用户在本协议生效前已成为云梦论坛的注册用户,则用户通过访问和/或使用云梦论坛,即视为用户表示同意接受本协议的全部内
						谷。
					</view>
					<view>
						4.我方的《云梦论坛隐私政策》以及其他相关规则均为本协议的补充协议,与本协议不可分割且具有同等法律效力。如用户不同意</view>
					《云梦论坛隐私政策》,则视为不同意本协议,用户应立即停止使用云梦论坛提供的服务。
					<view>
						5.上述条款我方可能会随时更新,我方会将更新后的用户协议、隐私政策及相关规则(统称“用户协议”)通过系统提示、信息推送和/或用户在云梦论坛留下的联系方式通知和提醒用户注意。修改后的服务条款的主要内容会在协议顶部予以展示,一旦在云梦论坛上公布即取代替原来的服务条款,并构成本条款整体之一部分。用户协议变更后,如用户继续使用醒服务,即意味着用户同意接受。
						如用户不同意变更后的用户协议,应停止使用云梦论坛的服务。
					</view>
					<view class="tro">
						<view>
							二、用户注册
						</view>

						<view>1.用户确认其具备中华人民共和国法律规定的与用户行为相适应的民事行为能力。</view>
						<view>
							若用户不具备前述与其行为相适应的民事行为能力,则应获得监护人的同意。特别地,如果用户是未成年人,应使用“青少年模式”并在监护人的同意和指导下访问和/或使用云梦论坛。用户及用户的监护人应依照法律规定承担因此而导致的相应的责任。
						</view>
						<view>
							如果用户使用云梦论坛进行内容的上载、传播服务,用户需要注册一个帐号、密码,并确保注册信息的真实性、正确性及完整性,如果上述注册信息发生变化,用户应及时更改。在安全完成本服务的登记程序并收到一个密码及帐号后,用户应维持密码及帐号的机密安全。用户应对任何人利用用户的密码及帐号所进行的活动负完全的责任,我方无法对非法或未经用户授权使用用户帐号及密码的行为做出甄别,因此我方不承担任何责任。在此,用户同意并承诺做到:
						</view>
						<view>经云梦论坛注册系统完成注册程序并获得云梦论坛帐号的用户即为云梦论坛的正式用户,即获得云梦论坛规定用户所应享有的一切权限;我方有权
							对其正式用户的权限设计进行变更。</view>
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

<style lang="scss" scoped>
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
