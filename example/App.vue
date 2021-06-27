<template>
	<div id="app">
		<m-panel title="标题" content="内容" footer="2021-06-27"></m-panel>
	</div>
</template>
<script>
export default {
	data() {
		return {
			date:new Date(),
			data:[
				{
					id:4,
					name:'张三',
					age:12
				},
				{
					id:12,
					name:'李四',
					age:22
				},
				{
					id:11,
					name:'王婆',
					age:45
				}
			],
			columns:[
				{
					key:'id',
					value:'ID',
					sortable:true
				},
				{
					key:'name',
					value:'姓名',
					sortable:true
				},
				{
					key:'age',
					value:'年龄',
					sortable:true
				}
			]
		};
	},
	mounted() {
		//console.log(this.$util.matchingText('1799-04-09','date'))
		//console.log(this.$util.matchingText('2021/03/19','date'))
		//console.log(this.$util.matchingText('2021.03.19','date'))
		//console.log(this.$util.matchingText('2021年03月03日','date'))
	},
	methods:{
		reset(){
			this.$refs.table.resetSortActive();
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
