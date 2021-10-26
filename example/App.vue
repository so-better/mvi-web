<template>
	<div id="app">
		<m-button @click="change">Button</m-button>
		<div>value:{{value}}</div>
		<m-tooltip title="hello" trigger="hover">
			<m-button>按钮</m-button>
		</m-tooltip>
		<m-editor paste-text v-model="value" placeholder="请输入"></m-editor>
		<div id="root" style="position: absolute;width: 7rem;height: 10rem;border: 1px solid #ddd;overflow: hidden;">
			<!-- <div style="height: 10rem;"></div> -->
			<!-- <div style="height: 10rem;"></div> -->
			<m-modal v-model="show" animation="custom" title="Modal Title" content="模态框内容" closable></m-modal>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				pickerOpt:{
					values:['mvi','elementUI','iView','vant'],//设置选项
					defaultIndex:0//设置默认选项序列
				},
				checkes: [1, [2], 3, 4],
				tabs: [{
						value: [0],
						name: '首页'
					},
					{
						value: '1',
						name: '附近'
					},
					{
						value: 2,
						name: '关注'
					},
					{
						value: {a:3},
						name: '我的'
					}
				],
				scrollOpt: {
					top: el => {
						console.log(el);
					},
					bottom: el => {
						console.log(el);
					}
				},
				dragOpt: {
					container: '#root',
					beforedrag: e => {
						console.log(1)
					}
				},
				observe: {
					attributes: true,
					childList: true,
					subtree: true,
					attributesChange: (attributeName, oldValue, newValue) => {
						console.log(attributeName, oldValue, newValue)
					},
					childNodesChange: (addNodes, removeNodes) => {
						console.log(addNodes, removeNodes)
					}
				},
				cls: '',
				counts: 100000,
				checked: [],
				images: [
					'https://www.mvi-web.cn/mvi-resources/images/mvi_image_4_1624705387843.jfif',
					'https://www.mvi-web.cn/mvi-resources/images/mvi_image_3_1624705387828.jfif',
					'https://www.mvi-web.cn/mvi-resources/images/mvi_image_2_1624705387812.jfif',
					'https://www.mvi-web.cn/mvi-resources/images/mvi_image_1_1624705387797.jfif',
					'https://www.mvi-web.cn/mvi-resources/images/mvi_image_0_1624705387765.jfif'
				],
				anchor: {
					root: '#root',
					target: '#btn',
					time: 400
				},
				spyOpt: {
					el: '#root',
					beforeEnter: el => {
						console.log('触发beforeEnter')
					},
					enter: el => {
						console.log('触发enter')
					},
					beforeLeave: el => {
						console.log('触发beforeLeave')
					},
					leave: el => {
						console.log('触发leave')
					}
				},
				active: 1,
				show: false,
				expand: false,
				uploadOpt: {
					select: (files, extra) => {
						console.log(files, extra);
					}
				},
				options:[
					{
						label:'element-ui',
						value:['a']
					},
					{
						label:'easy-ui',
						value:1
					},
					{
						label:'mvi-web',
						value:{a:1}
					}
				],
				value: '',
				color:'#198292',
				date: new Date(),
				data: [{
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
				columns: [{
						key: 'checkbox',
						value: ''
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
				this.show = !this.show
			},
			shown(e){
				console.log(e)
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

	.demo {
		width: 4rem;
		height: 2rem;
		margin: .2rem auto;
		position: relative;
		border: 1px solid #000000;

		&::before {
			content: '';
			width: 100%;
			height: 1px;
			background-color: #000000;
			position: absolute;
			bottom: -1rem;
			left: 0;
		}
	}

	.mvi-modal-custom-enter,.mvi-modal-custom-leave-to{
		opacity: 0;
		transform: scaleY(0);
	}
</style>
