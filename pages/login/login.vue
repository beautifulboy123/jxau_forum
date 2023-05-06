<template>
	<view class="wrap">
		<div class="htmleaf-container">
			<div class="wrapper">

				<view class="my_container">
					<view class="form">
						<view :class="['inp',focus1 ? 'active' : '']">
							<input class="my_input" type="text" focus="focus1" placeholder="学号" @blur="handleBlur(0)"
								@click="getfocus(0)" />
						</view>
						<view :class="['inp',focus2 ? 'active' : '']">
							<input class="my_input" type="password" focus="focus2" placeholder="密码"
								@blur="handleBlur(1)" @click="getfocus(1)" />
						</view>
						<view class="wangji">忘记密码？</view>


						<view class="btn" @click="login">登录</view>
					</view>
				</view>

				<ul class="bg-bubbles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus1: false,
				focus2: false
			};
		},
		methods: {
			getfocus(type) {
				if (type) {
					this.focus2 = true

				} else {
					this.focus1 = true
				}
			},
			handleBlur(type) {
				if (type) {
					this.focus2 = false
				} else {
					this.focus1 = false
				}
			},
			login() {
				
				console.log("登录")
				
				uni.switchTab({
					url:"../index/index"
				})

			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../static/css/styles.css";

	page {
		width: 100%;
		height: 100%;

		.wrap {
			width: 100%;
			height: 100%;
			background-color: pink;


			.my_container {
				height: 100%;


				// background-color: pink;

				.form {
					margin-top: 600rpx;
					height: 260rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					align-items: center;
					// background-color: pink;

					position: relative;

					.inp {
						width: 65%;
						height: 90rpx;
						background-color: rgba(255, 255, 255, 0.6);
						border: 2rpx solid #fff;
						border-radius: 10rpx;
						transition: all 0.3s;

						.my_input {
							height: 100%;
							width: 100%;
							box-sizing: border-box;
							padding: 10rpx;
							background-color: rgba(255, 255, 255, 0.5);
						}


					}

					.active {
						width: 85%;
					}



					.wangji {
						position: absolute;
						bottom: -40rpx;
						color: #fff;
					}

					.btn {
						position: absolute;
						bottom: -240rpx;
						width: 65%;
						height: 90rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #fff;
						color: #000000;
						font-size: 36rpx;
						border-radius: 20rpx;
						z-index: 999999;
					}

				}
			}
		}
	}
</style>
