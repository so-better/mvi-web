<template>
	<div id="app">
		<m-button id="btn" @click="change">Button</m-button>
		<m-icon class="mvi-text-success mvi-m-1" type="weibo"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="wx"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="apple"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="set"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="weibo-square"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="wx-square"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="qq"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="android"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="wx-pay"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="ali-pay"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="wx-o"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="windows"></m-icon>
		<m-icon class="mvi-text-success mvi-m-1" type="douyin"></m-icon>
	</div>
</template>

<script>
export default {
	data() {
		return {
			arr: [1],
			show: false,
			date: new Date(),
			value: '',
			active: 1,
			disabled: false,
			types: ['info', 'warn', 'primary', 'success', 'error', 'default'],
			placement: 'bottom',
			list: ['MVI', 'Bootstrap', 'Vue'],
			options: {
				values: ['mvi', 'elementUI', 'iView', 'vant'], //设置选项
				defaultIndex: 2 //设置默认选项序列
			}
		};
	},
	mounted() {
		
	},
	methods: {
		change() {
			this.show = !this.show;
		}
	}
};
</script>

<style lang="less">
#app {
	height: 100%;
	overflow: auto;
	overflow-x: hidden;
	position: relative;
}

.scale-enter,.scale-leave-to{
	opacity: 0;
	transform: scale(0.6) translateX(0.5rem);
}
</style>
