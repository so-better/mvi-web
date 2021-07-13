<template>
	<div id="app">
		<m-button @click="show=!show">Toggle</m-button>
		<div style="height: 4rem;overflow: auto;border: 1px solid #FF0000;" id="spy">
			<div style="height:20rem;"></div>
			<div >
				<m-image v-if="show" v-spy="spyOpt" root="#spy" src="https://www.mvi-web.cn/mvi-resources/images/mvi_image_1_1624705387797.jfif" width="1rem" height="1rem"></m-image>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			spyOpt:{
				el:'#spy',
				beforeEnter:el=>{
					console.log('触发beforeEnter')
				},
				enter:el=>{
					console.log('触发enter')
				},
				beforeLeave:el=>{
					console.log('触发beforeLeave')
				},
				leave:el=>{
					console.log('触发leave')
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
