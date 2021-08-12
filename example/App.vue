<template>
	<div id="app">
		<div class="mvi-p-4">
			<m-button @click="change">Button</m-button>
		</div>
		<m-editor v-model="value"></m-editor>
	</div>
</template>
<script>
export default {
	data() {
		return {
			counts:100000,
			checked:true,
			images: [
				'https://www.mvi-web.cn/mvi-resources/images/mvi_image_4_1624705387843.jfif','https://www.mvi-web.cn/mvi-resources/images/mvi_image_3_1624705387828.jfif','https://www.mvi-web.cn/mvi-resources/images/mvi_image_2_1624705387812.jfif','https://www.mvi-web.cn/mvi-resources/images/mvi_image_1_1624705387797.jfif','https://www.mvi-web.cn/mvi-resources/images/mvi_image_0_1624705387765.jfif'
			],
			anchor:{
				root:'#anchor',
				target:'#btn',
				time:400
			},
			spyOpt:{
				el:'#app',
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
					value:0
				},
				{
					label:'CSOL',
					value:1
				}
			],
			value: '#ff3300',
			value2:'',
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
			this.$showToast({
				message:false
			})
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

.demo{
	width: 4rem;
	height: 2rem;
	margin: .2rem auto;
	position: relative;
	border: 1px solid #000000;
	
	&::before{
		content: '';
		width: 100%;
		height: 1px;
		background-color: #000000;
		position: absolute;
		bottom: -1rem;
		left: 0;
	}
}
</style>
