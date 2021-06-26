<template>
	<div id="app">
		<m-table ref="table" :sort-icon="['angle-up','angle-down']" sort-active-color="#ff3300" :data="data" :columns="columns"></m-table>
		<m-slider :value="40"></m-slider>
	</div>
</template>
<script>
export default {
	data() {
		return {
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
