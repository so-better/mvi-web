<template>
	<div id="app">
		<m-button @click="show=!show">Toggle</m-button>
		<div style="width: 100%;height: 4rem;overflow: auto;border: 1px solid #DDDDDD;">
			<div style="width: 20rem;height: 100%;">
				<div v-if="show" v-spy="spyOpt" style="width: 4rem;height: 2rem;background-color: #000000;position: relative;margin-left: 10rem;"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			spyOpt:{
				beforeLeave:($el,$root)=>{
					console.log($el,$root)
				}
			},
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
