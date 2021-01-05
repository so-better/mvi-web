<template>
	<div id="app">
		<m-button plain @click="change" type="primary">Button</m-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			date: new Date(),
			value: 1,
			active: 0,
			types: ['info', 'warn', 'primary', 'success', 'error', 'default']
		}
	},
	mounted() {},
	methods: {
		change() {
			this.show = true;
		}
	}
};
</script>

<style lang="less">
#app {
	height: 100%;
	overflow: auto;
}
</style>
