<template>
	<view class="content">

		<u-navbar title="搜索" back-icon-color="#5098FF"></u-navbar>
		<view class="slot-wrap">
			<u-search class="index_search" :animation="true" :clearabled="true" v-model="search" @search="startSearch" @custom="startSearch"></u-search>
		</view>

		<view class="main">
			<view class="recommend">
				<view class="hot_title">
					热门搜索
					<i class="iconfont icon-huo"></i>
				</view>
				<view class="hot">
					<view v-for="(item,index) in hot" :key="index">
						<view class="recommend_item" @click="chooseRecommend(index)">
							{{item}}
						</view>
					</view>
					<view v-if="hot.length === 0" class="listempty">
						<u-empty mode="list" text="暂无推荐数据"></u-empty>
					</view>
				</view>
			</view>
			<view class="history_title">
				<view class="title">搜索历史</view>
				<i class="iconfont icon-shanchu" @click="deleteAll"></i>
			</view>
			<view class="search_hestory">
				<scroll-view scroll-y="true" class="search_scroll">
					<view class="history_list">
						<view class="history" v-for="(item,index) in history" :key="index">
							<view class="text" @click="choosehistory(index)">{{item}}</view>
							<view class="del">
								<i class="iconfont icon-chacha" @click="deletehistory(index)"></i>
							</view>
						</view>
					</view>
					<u-empty v-if="history.length === 0" mode="list" text="搜索历史为空"></u-empty>
				</scroll-view>
			</view>
			
		</view>



	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				contentID: '',
				search:'',
				hot: [
					'UI',
					'前端',
					'资源分享',
					'美食',
					'电影分享'
				],
				history:[
					'UI',
					'前端',
					'资源分享',
					'美食',
					'电影分享'
				]
			}
		},
		onLoad(option) {
			this.contentID = option.id
		},
		methods: {
			startSearch(){
				console.log(this.search)
				
				//查重
				this.history.forEach((item,index) =>{
					if(item === this.search){
						this.history.splice(index,1)
					}
				})
				
				this.history.unshift(this.search)
			},
			chooseRecommend(index){
				this.search = this.hot[index];
				
				//跳转查询数据
				
			},
			choosehistory(index){
				this.search = this.history[index];				
				//跳转查询数据				
				uni.navigateTo({
					url:`../searchResult/searchResult?key=${this.search}`
				})
				
			},
			deletehistory(index){
				this.history.splice(index,1)
			},
			deleteAll(){
				this.history = []
			},
			...mapMutations([])
		},
		computed: {
			...mapGetters([])
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;

		.content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;

			.slot-wrap {
				display: flex;
				align-items: center;
				width: 100%;
				/* 如果您想让slot内容占满整个导航栏的宽度 */
				/* flex: 1; */
				/* 如果您想让slot内容与导航栏左右有空隙 */
				padding: 0 30rpx;
				// background-color: pink;

				.index_search {
					width: 100%;
				}
			}




			.main {
				flex: 1;
				overflow: hidden;
				// position: relative;
				// background-color: pink;

				.recommend {
			

					.hot_title {
						width: 100%;
						padding: 20rpx 20rpx;
						font-weight: bold;
						display: flex;
						align-items: center;
						// height: 60rpx;

						i {
							margin-left: 20rpx;
							color: red;
						}
					}

					.hot {
						width: 100%;
						height: 220rpx;
						box-sizing: border-box;
						padding: 10rpx 20rpx;
						display: flex;
						flex-wrap: wrap;
						.recommend_item {
							padding: 5rpx 20rpx;
							font-size: 24rpx;
							border-radius: 20rpx;
							margin-right: 20rpx;
							max-width: 350rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							/* 超出省略号 */
							white-space: nowrap;
							background-color: rgba(0, 0, 0, 0.1);
						}

						.listempty {
							width: 100%;
							height: 100%;
							text-align: center;
						}
					}
				}				
				.history_title {
					width: 100%;
					padding: 20rpx 20rpx;
					font-weight: bold;
					display: flex;
					justify-content: space-between;
					align-items: center;
					// height: 60rpx;
				
					i {
						margin-right: 20rpx;
					}
				}				
				.search_hestory{
					width: 100%;
					height: calc(100% - 377rpx);					
					.search_scroll{
						height: 100%;
						// background-color: pink;												
						.history_list{							
							.history{
								width: 100%;
								height: 80rpx;
								padding: 0 20rpx;
								display: flex;
								align-items: center;
								border-bottom: 1rpx solid rgba(188, 188, 188, 0.4);								
								.text{
									width: 80%;
									overflow: hidden;
									text-overflow: ellipsis;
									/* 超出省略号 */
									white-space: nowrap;
								}								
								.del{
									width: 20%;
									text-align: center;
								}
							}
						}
						
						
					}
				}
			}


		}
	}
</style>
