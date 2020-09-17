<template>
	<div id="app" ref="app">
		<m-button @click="change" type="info">Button</m-button>
		<m-table :data="data" :columns="columns"></m-table>
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
				value: 50,
				index: 0,
				active: 2,
				data: [{
						name: '张三',
						age: 24,
						sex: '男'
					},
					{
						name: '李四',
						age: 20,
						sex: '男'
					},
					{
						name: '王红',
						age: 22,
						sex: '女'
					},
					{
						name: '赵钱',
						age: 30,
						sex: '男'
					}
				],
				columns: [{
						key: 'name',
						value: '姓名'
					},
					{
						key: 'age',
						value: '年龄'
					},
					{
						key: 'sex',
						value: '性别'
					}
				]
			}
		},
		mounted() {

		},
		methods: {
			change(value) {

			}
		}
	}
</script>

<style lang="less">
	#app {
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
		position: relative;
	}

	.mvi-msgbox-lk-enter,
	.mvi-msgbox-lk-leave-to {
		opacity: 0 !important;
		transform: translate(-50%, -50%) scale(2) !important;
	}

	.mvi-msgbox-lk-enter-active,
	.mvi-msgbox-lk-leave-active {
		transition: all 500ms !important;
	}
</style>
