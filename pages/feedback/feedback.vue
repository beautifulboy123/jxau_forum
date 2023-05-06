<template>
	<view class="content">
		<u-navbar back-text="我要反馈"></u-navbar>
		<view class="main">
			<u-cell-item title="反馈问题类型" :value='problemSelect' @click="show = true"></u-cell-item>
			<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
			<u-cell-item title="问题和意见" :arrow='false'></u-cell-item>
			<view class="input">
				
				<u-input v-model="value" type="textarea" :border="true" :auto-height='false' maxlength='1000' height='300' :clearable='false'/>
				<view class="issuefb">
					<u-button type="primary">提交反馈</u-button>
				</view>
			
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				problemSelect: '功能问题',
				show: false,
				list: [{
						value: '1',
						label: '功能问题'
					},
					{
						value: '2',
						label: '其他问题'
					}
				],
			};
		},
		methods: {
			confirm(e) {
				console.log(e);
				this.problemSelect = e[0].label
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
		//background-color: pink;
		padding:20rpx;
		margin-right: 26rpx;
		.input{
			margin-left: 26rpx;
			height: 30vh;
			// background-color: red;
		}
		.issuefb{
			width: 60vw;
			margin: 50rpx auto;
		}
	}

	
</style>
