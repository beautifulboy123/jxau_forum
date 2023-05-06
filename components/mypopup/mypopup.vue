<template>
	<view :class="['wrap',show ? 'wrap_move' : '']">

		<view class="popup">
			<slot></slot>
		</view>


		<view v-if="show" class="mask" @click="hide"></view>

	</view>
</template>

<script>
	export default {
		name: "mypopup",
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			hide() {
				this.$emit("hide")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		transition: all 0.5s;
		transform: translate(100%, 0);
		display: flex;
		justify-content: flex-end;
		transition: all 0.5s;

		.popup {
			width: 65%;
			height: 100%;
			z-index: 9999;
			border-top-left-radius: 20rpx;
			border-bottom-left-radius: 20rpx;
			background-color: #fff;
			transition: all 0.5s;
			transform: translate(0, 0);
		}

		.popup_move {
			transform: translate(100%, 0);
		}


		.mask {
			position: absolute;
			top: 0;
			bottom: 0;
			left: -100%;
			right: 0;
			z-index: 9998;
			background-color: #000000;
			opacity: 0.6;
			transition: all 0.8s;

		}

		.mask_move {
			opacity: 0;
		}




	}
	
	.wrap_move{
		transform: translate(0, 0);
	}


</style>
