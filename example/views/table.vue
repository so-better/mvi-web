<template>
	<div class="mvi-p-2">
		<m-button @click="add">添加行</m-button>
		<m-table :data="data" :columns="columns" stripe out-border row-border height="4rem" ></m-table>
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
					age: 20,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动'
				},
				{
					name: '李四',
					age: 24,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动'
				},
				{
					name: '王红',
					age: 22,
					sex: '女',
					likes:'看电影，玩游戏，lol，dnf，运动'
				},
				{
					name: '赵钱',
					age: 30,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动',
					cellClassName:{
						name:'mvi-text-primary'
					},
					checkDisabled:true
				}
			],
			columns: [
				{
					key:'checkbox',
					value:'全选',
					width:'2rem'
				},
				{
					key: 'name',
					value: '姓名',
					width:'3rem',
					sortable:true,
				},
				{
					key: 'age',
					value: '年龄',
					sortable:true,
					width:'3rem'
				},
				{
					key: 'sex',
					value: '性别',
					//width:'3rem'
				},
				{
					key: 'likes',
					value: '兴趣爱好',
				}
			]
		};
	},
	methods:{
		add(){
			this.data = [
				{
					name: '张三',
					age: 24,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动'
				},
				{
					name: '李四',
					age: 20,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动'
				},
				{
					name: '王红',
					age: 22,
					sex: '女',
					likes:'看电影，玩游戏，lol，dnf，运动'
				},
				{
					name: '赵钱',
					age: 30,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动',
					cellClassName:{
						name:'mvi-text-primary'
					},
					checkDisabled:true
				},
				{
					name: '赵钱',
					age: 30,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动',
					cellClassName:{
						name:'mvi-text-primary'
					},
					checkDisabled:true
				},
				{
					name: '赵钱',
					age: 30,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动',
					cellClassName:{
						name:'mvi-text-primary'
					},
					checkDisabled:true
				},
				{
					name: '赵钱',
					age: 30,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动',
					cellClassName:{
						name:'mvi-text-primary'
					},
					checkDisabled:true
				},
				{
					name: '赵钱',
					age: 30,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动',
					cellClassName:{
						name:'mvi-text-primary'
					},
					checkDisabled:true
				},
				{
					name: '赵钱',
					age: 30,
					sex: '男',
					likes:'看电影，玩游戏，lol，dnf，运动',
					cellClassName:{
						name:'mvi-text-primary'
					},
					checkDisabled:true
				}
			]
		},
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

<style lang="less">
	
</style>
