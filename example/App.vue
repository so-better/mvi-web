<template>
	<div id="app">
		<m-button @click="change" class="mvi-mb-4">Toggle</m-button>
		<m-roll v-if="show" autoplay>222</m-roll>
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
	mounted() {
		this.show = false;
		setTimeout(()=>{
			this.show = true;
		},50)
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
