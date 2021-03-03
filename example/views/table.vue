<template>
	<div class="mvi-p-2">
		<m-table head-class="mvi-bg-success" class="mvi-mb-2" :data="[]" :columns="columns"></m-table>
		<m-table @cell-click="cellClick" class="mvi-mb-2" :data="data" :columns="columns"></m-table>
		<m-table @sort-desc="sortDesc" @sort-asc="sortAsc" class="mvi-mb-2" :data="data" :columns="columns" out-border></m-table>
		<m-table class="mvi-mb-2" :data="data" :columns="columns" out-border row-border></m-table>
		<m-table class="mvi-mb-2" :data="data" :columns="columns" stripe></m-table>
		<m-table class="mvi-mb-2" :data="data" :columns="columns" stripe out-border row-border></m-table>
		<m-table @check="check" class="mvi-mb-2" :data="data" :columns="columns" out-border row-border stripe :cell-class="cellClass"></m-table>
		<m-table class="mvi-mb-2" load-text="loading..." :data="data" loading :columns="columns" out-border row-border stripe :cell-class="cellClass"></m-table>
	</div>
</template>

<script>
export default {
	name: 'demo-table',
	data() {
		return {
			data: [
				{
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
					sex: '男',
					cellClassName:{
						name:'mvi-text-primary'
					},
					checkDisabled:true
				}
			],
			columns: [
				{
					key:'checkbox',
					value:'全选'
				},
				{
					key: 'name',
					value: '姓名',
				},
				{
					key: 'age',
					value: '年龄',
					sortable:true
				},
				{
					key: 'sex',
					value: '性别'
				}
			]
		};
	},
	methods:{
		cellClass(row,rowIndex,col,colIndex){
			if(rowIndex == 0){
				return 'mvi-text-error'
			}else if(colIndex == 1){
				return 'mvi-bg-success'
			}
		},
		cellClick(res){
			this.$msgbox(JSON.stringify(res))
		},
		check(checkRows){
			console.log(checkRows)
		},
		sortDesc(res){
			console.log(res)
		},
		sortAsc(res){
			console.log(res)
		}
	}
};
</script>

<style scoped lang="less"></style>
