import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {

		currentSelect: '',

		tabBarlist: [{
				pagePath: "/pages/index/index",
				iconPath: "home",
				selectedIconPath: "home-fill",
				text: '首页',
				customIcon: false,
			},
			{
				pagePath: "/pages/circle/circle",
				iconPath: "https://s3.bmp.ovh/imgs/2021/12/200b9508e4833304.png",
				selectedIconPath: "https://s3.bmp.ovh/imgs/2021/12/1aa0bc6213103235.png",
				text: '圈子',
				customIcon: false,
			},
			{
				pagePath: "/pages/add/add",
				iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
				selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
				text: '发布',
				midButton: true,
				customIcon: false,
			},
			{
				pagePath: "/pages/message/message",
				iconPath: "https://s3.bmp.ovh/imgs/2021/12/0553926be89ab70d.png",
				selectedIconPath: "https://s3.bmp.ovh/imgs/2021/12/afe98756973afa48.png",
				text: '消息',
				count: 0,
				isDot: false,
				customIcon: false,
			},
			{
				pagePath: "/pages/home/home",
				iconPath: "account",
				selectedIconPath: "account-fill",
				text: '我的',

				customIcon: false,
			},
		],
		userInfo: uni.getStorageSync("__USER_INFO") || {
			name: "康僧",
			avatar: "http://ksimagebed.oss-cn-hangzhou.aliyuncs.com/imgbed/2021-12-6-22%3A35%3A7-cfb2b2b49b2ea762d6b643650f115c72.jpg",
			birthday: "2000-03-15",
			intro: "哈哈哈哈",
			bg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2018-11-06%2F5be0f564235b7.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639892174&t=95ba842e962b829ed0f19d6856a4b047"
		}
	},
	getters: {
		getTabBar(state) {
			return state.tabBarlist
		},

		getCurrentSelect(state) {
			return state.currentSelect
		}
	},
	mutations: {
		changeCurrentSelect(state, name) {

			state.currentSelect = name

		},
		GET_USER_INFO(state, payload) {
			state.userInfo = payload;

		}

	},
	actions: {
		set_userInfo({
			commit
		}, payload) {
			uni.setStorageSync("__USER_INFO", payload)
			commit('GET_USER_INFO', payload)
		}
	}

})

export default store
