<template>
	<view class="content">

		<u-navbar title="搜索结果" back-icon-color="#5098FF"></u-navbar>

		<view class="main">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view v-for="item in testData" :key="item.id">
					<diary-item :list="item"></diary-item>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
	import foodList from "../../testData/foodList.js"
	import diaryItem from "../../components/diaryItem/diaryItem.vue"
	
	
	export default {
		components:{
			diaryItem
		},
		data() {
			return {
				testData: []
			};
		},
		onLoad(option) {
			this.testData = foodList
		}
	}
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%;

		.content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;




			.main {
				flex: 1;
				overflow: hidden;
				position: relative;
				// background-color: pink;
			}
		}
	}
</style>
