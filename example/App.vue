<template>
	<div id="app">
		{{ value }}
		<m-button @click="change" form-control class="mvi-mb-4">Toggle</m-button>
		<div style="height: 3rem;width: 3rem;background-color: #000000;position: absolute;z-index: 2000;left:4rem;" v-resize="{}" v-if="show"></div>
		<div style="height: 3rem;width: 3rem;background-color: #FF0000;position: absolute;z-index: 2000;" v-resize="{}" v-if="show"></div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			active: 1,
			show: true,
			expand: false,
			value: '#ff3300',
			date: new Date(),
			data: [
				{
					id: 4,
					name: '张三',
					age: 12
				},
				{
					id: 12,
					name: '李四',
					age: 22
				},
				{
					id: 11,
					name: '王婆',
					age: 45
				}
			],
			columns: [
				{
					key: 'id',
					value: 'ID',
					sortable: true
				},
				{
					key: 'name',
					value: '姓名',
					sortable: true
				},
				{
					key: 'age',
					value: '年龄',
					sortable: true
				}
			]
		};
	},
	methods: {
		change() {
			this.show = !this.show
		}
	}
};
</script>
<style lang="less">
html {
	font-size: 50px;
}
#app {
	height: 100%;
	overflow: auto;
	overflow-x: hidden;
	position: relative;
	width: 100%;
}
</style>
