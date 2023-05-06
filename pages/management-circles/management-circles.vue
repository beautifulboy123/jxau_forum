<template>
	<view class="content">
		<u-navbar back-text="管理我的圈子"></u-navbar>
		<view class="main">
			<view class="empty">
				<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6867bdee-20ed-4501-aaff-ace5f5bc6ea5/9276ada8-9f24-44ef-a05c-f3d1c156790d.jpg" mode=""></image>
			</view>
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
		.empty{
			width: 100%;
			height: 80vh;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
</style>