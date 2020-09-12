<template>
	<div id="app" style="padding: .4rem;" ref="app">
		<div class="mvi-mb-10">
			<m-button type="success" @click="change">Button</m-button>
		</div>
		<div>
			<m-badge class="mvi-m-2" type="success">{{value}}</m-badge>
		</div>
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
				active: -1
			};
		},
		mounted() {
			
		},
		methods: {
			change(value) {
				this.value = '999+'
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
</style>
