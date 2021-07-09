<template>
	<div id="app">
		{{ value }}
		<m-button @click="change" form-control class="mvi-mb-4">Toggle</m-button>
		<m-transition-slide :expand="expand"><div style="height: 4rem;background-color: #000000;"></div></m-transition-slide>
	</div>
</template>
<script>
export default {
	data() {
		return {
			active: 1,
			show: false,
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
		this.expand = true;
	},
	methods: {
		change() {
			this.$showLoadingBar({
				color: '#ff3300',
				zIndex:100,
				callback: function() {
					this.$msgbox('已关闭');
				}
			});
			setTimeout(() => {
				this.$showLoadingBar('#000');
				setTimeout(()=>{
					this.$showLoadingBar(()=>{
						this.$msgbox('已关闭2');
					});
					setTimeout(()=>{
						this.$hideLoadingBar();
					},1000)
				},1000)
			}, 1000);
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
