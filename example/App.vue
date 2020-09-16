<template>
	<div id="app" ref="app">
		<m-button @click="change" type="info">Button</m-button>
		<m-modal v-model="show" show-times title-class="mvi-text-center" times-color="#ff3300" content-class="mvi-text-center" title="IOS系统升级提醒系统升级提醒系统升级提醒系统升级提醒" content="你的系统需要更新,是否进行更新？" footer="2020/09/16"></m-modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				html: '',
				text: '',
				date: new Date(),
				value: '1',
				index: 0,
				active: -1,
				tabs: [{
						value: 0,
						name: '首页',
						icon:'home'
					},
					{
						value: 1,
						name: '附近'
					},
					{
						value: 2,
						name: '关注'
					},
					{
						value: 3,
						name: '我的'
					}
				]
			}
		},
		mounted() {

		},
		methods: {
			change(value) {
				this.show = !this.show
			}
		}
	}
</script>

<style lang="less">
	#app {
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
		position: relative;
	}
	
	.mvi-msgbox-lk-enter,.mvi-msgbox-lk-leave-to{
		opacity: 0 !important;
		transform: translate(-50%,-50%) scale(2) !important;
	}
	
	.mvi-msgbox-lk-enter-active,.mvi-msgbox-lk-leave-active{
		transition: all 500ms !important;
	}
	
</style>
