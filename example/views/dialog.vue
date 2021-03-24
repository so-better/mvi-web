<template>
	<div>
		<m-button @click="alert" class="mvi-m-2">alert</m-button>
		<m-button @click="confirm" class="mvi-m-2">confirm</m-button>
		<m-button @click="prompt" class="mvi-m-2">prompt</m-button>
		<m-button @click="Alert" class="mvi-m-2">Alert</m-button>
		<m-button @click="Confirm" class="mvi-m-2">Confirm</m-button>
		<m-button @click="Prompt" class="mvi-m-2">Prompt</m-button>
	</div>
</template>

<script>
export default {
	name: 'demo-dialog',
	methods: {
		alert(){
			this.$alert('好消息')
		},
		confirm(){
			this.$confirm('你确定要删除吗？')
		},
		prompt(){
			this.$prompt('请输入密码')
		},
		Alert() {
			this.$Alert({
				title: '提示',
				message:'此操作将永久删除该文件, 是否继续?',
				overlayColor:'rgba(0,0,0,.7)',
				btns:{
					ok:{
						type:'success',
						plain:true
					}
				},
				callback:()=>{
					console.log('点了确定')
				}
			});
		},
		Confirm() {
			this.$Confirm({
				title: '提示',
				message:'此操作将永久删除该文件, 是否继续?',
				callback:r=>{
					console.log(r)
				}
			});
		},
		Prompt() {
			this.$Prompt({
				title: '温馨提示',
				message:'请输入appleID',
				placeholder:'输入你的appleID',
				btns:{
					ok:{
						text:'好的',
						type:'error'
					}
				},
				callback:(r,value)=>{
					console.log(r,value)
				}
			});
		}
	}
};
</script>

<style scoped lang="less"></style>
