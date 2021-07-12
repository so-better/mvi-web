<template>
	<div id="app">
		<m-color-picker v-model="value"></m-color-picker>
	</div>
</template>
<script>
export default {
	data() {
		return {
			active: 1,
			show: true,
			expand: false,
			options:[
				{
					label:'LOL',
					value:0,
					icon:'user'
				}
			],
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
					key:'checkbox',
					value:''
				},
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
	},
	methods: {
		change() {
			
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
