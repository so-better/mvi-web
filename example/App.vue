<template>
	<div id="app">
		<div>
			<m-button @click="change">Toggle</m-button>
		</div>
		<div>
			<m-button id="btn">BUTTON</m-button>
		</div>
		<!-- <div id="anchor" style="width: 100%;height: 4rem;border: 1px solid #ddd;overflow: auto;" class="mvi-p-4">
			<div style="height: 20rem;"></div>
			<m-button id="btn" form-control>anchor元素</m-button>
			<div style="height: 20rem;"></div>
		</div> -->
	</div>
</template>
<script>
export default {
	data() {
		return {
			images: [
				'https://www.mvi-web.cn/mvi-resources/images/mvi_image_4_1624705387843.jfif','https://www.mvi-web.cn/mvi-resources/images/mvi_image_3_1624705387828.jfif','https://www.mvi-web.cn/mvi-resources/images/mvi_image_2_1624705387812.jfif','https://www.mvi-web.cn/mvi-resources/images/mvi_image_1_1624705387797.jfif','https://www.mvi-web.cn/mvi-resources/images/mvi_image_0_1624705387765.jfif'
			],
			anchor:{
				root:'#anchor',
				target:'#btn',
				time:400
			},
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
	mounted() {
		document.getElementById("btn").on('click.click1 click',function(e){
			console.log(this)
		})
	},
	methods: {
		change() {
			document.getElementById("btn").off('click.click1')
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
